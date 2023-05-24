import { Image } from 'expo-image';
import { useRouter, useSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import UserName from './UserName'

const App = () => {
    const router = useRouter();
    const params = useSearchParams()
    const regex = /_/g

    const [post, setPost] = useState();
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    
    const postid = params.id;
    const searchTerm = params.searchterm;
    
    console.log(`params: ${JSON.stringify(params)}`);
    const goBack = () => {
        router.push('/browse')
    };
    const isEmpty = (array) => {
        if(array === undefined || array.length == 0){
            return true;
        } else return false;
    }
    const Score = ({score}) => {
        if(score >= 0){
            return(<Text style={{padding: 5, color: '#3e9e49'}}>{score}</Text>);
        }else{
            return(<Text style={{padding: 5, color: '#dd3127'}}>{score}</Text>);
        }
    }
    const Rating = (rating) => {
        if(rating == 's'){
            return(<Text style={{padding: 5, color: '#3e9e49'}}>Safe</Text>);
        }else if(rating == 'e'){
            return(<Text style={{padding: 5, color: '#e45f5f'}}>Explicit</Text>);
        }else if(rating == 'q'){
            return(<Text style={{padding: 5, color: '#ffe666'}}>Questionable</Text>)
        } else return(<Text>error</Text>)
    }

    const Post = ({ post }) => {
        if (!post?.id) return <Text style={{color:'#fff'}}>Loading...</Text>;
        const fileExtension = post.file.ext;
        if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'gif') {
            return <Image source={{ uri: post.file.url }} style={styles.image} />;
        } else if (fileExtension === 'webm') {
            return (
                <View>            
            <Text style={{color: '#fff', padding: 10}}>Videos are not supported yet, but you can save the file locally (by pressing "save file") to play it with a media player.</Text>
            </View>
            );
        } else {
            return <Text>{`This file type (".${fileExtension}") is not supported.`}</Text>;
        }
    };

    const fetchComments = () => {
        fetch(`https://e621.net/comments.json?group_by=comment&search[post_id]=${postid}`)
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.error(error));
    }

    useEffect(() => {
        fetch(`https://e621.net/posts/${postid}.json`)
            .then(response => response.json())
            .then(data => setPost(data.post))
            .catch(error => console.error(error));
            fetchComments()
    }, [params]);

    return (<View style={{backgroundColor: '#000', height: '100%', width:'100%'}}>
        <SafeAreaView style={{backgroundColor: '#222'}}>
            <ScrollView style={styles.scrollContainer}>
                <StatusBar hidden={true}/>
                <TouchableOpacity style={[styles.basicContainer, {margin: 0, marginBottom: 0, padding: 5, borderRadius: 0, borderColor: '#222', borderBottomWidth: 2}]} onPress={()=>{goBack()}}><Text style={styles.link}> back </Text></TouchableOpacity>
                <SafeAreaView>
                    {post && (
                    <SafeAreaView>
                        <Post post={post} />
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={[styles.basicContainer,{flexDirection: 'row'}]}>
                                <Text style={styles.basicContainerText}>Score: <Score score={post.score.total}/> &ensp; Fav Count: {post.fav_count}</Text> 
                            </View>
                            <TouchableOpacity style={styles.shareButton}><Text style={styles.basicContainerText}>Save file</Text></TouchableOpacity>
                        </View>
                        {post.description && 
                        <View style={styles.basicContainer}>
                            <Text style={[styles.basicContainerText,{fontWeight: 700, paddingBottom: 1}]}>Description:</Text>
                            <Text style={[styles.basicContainerText,{paddingTop: 2}]}>{post.description}</Text>
                        </View>}
                        {!isEmpty(comments) && <View>
                             <Text style={styles.basicContainerText}>Comments:</Text>
                           {comments.map(comment=>(
                            <View key={comment.id} style={styles.basicContainer}>
                                <Text style={[styles.basicContainerText,{fontWeight:800}]}>{comment.creator_name}</Text>
                                <Text style={styles.basicContainerText}>{comment.body}</Text>
                            </View>
                        ))}</View>}
                        <View style={styles.basicContainer}>
                            <Text style={styles.basicContainerText}> Tags: {'\n\n'}
                                <Text style={styles.tagsHeader}>{!isEmpty(post.tags.artist) && `Artists:\n`}</Text>
                                {post.tags.artist.map(tag => <Text style={styles.tagsArtist} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                                <Text style={styles.tagsHeader}>{!isEmpty(post.tags.copyright) && `Copyright:\n`}</Text>
                                {post.tags.copyright.map(tag => <Text style={styles.tagsCopyright} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                                <Text style={styles.tagsHeader}>{!isEmpty(post.tags.character) && `Character:\n`}</Text>
                                {post.tags.character.map(tag => <Text style={styles.tagsCharacter} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                                <Text style={styles.tagsHeader}>{!isEmpty(post.tags.species) && `Species:\n`}</Text>
                                {post.tags.species.map(tag => <Text style={styles.tagsSpecies} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                                <Text style={styles.tagsHeader}>{!isEmpty(post.tags.general) && `General:\n`}</Text>
                                {post.tags.general.map(tag => <Text style={styles.tagsGeneral} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                                <Text style={styles.tagsHeader}>{!isEmpty(post.tags.lore) && `Lore:\n`}</Text>
                                {post.tags.lore.map(tag => <Text style={styles.tagsLore} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                                <Text style={styles.tagsHeader}>{!isEmpty(post.tags.meta) && `Meta:\n`}</Text>
                                {post.tags.meta.map(tag => <Text style={styles.tagsMeta} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                                <Text style={styles.tagsHeader}>{!isEmpty(post.tags.invalid) && `Invalid:\n`}</Text>
                                {post.tags.invalid.map(tag => <Text style={styles.tagsInvalid} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                            </Text>
                        </View>
                        <View style={styles.basicContainer}>
                            <Text style={styles.basicContainerText}>
                                <Text style={{fontWeight: 500}}>{`ID: `}<Text style={{fontWeight: 200}}>{post.id}</Text></Text>{'\n'}
                                <Text style={{fontWeight: 500}}>{`Rating: `}<Text>{Rating(post.rating)}</Text></Text>{'\n'}
                                <Text style={{fontWeight: 500}}>{`Dimensions: `}<Text style={{fontWeight: 200}}>{`${post.file.width}x${post.file.height} pixels`}</Text></Text>{'\n'}
                                <Text style={{fontWeight: 500}}>{`Uploader : `}<Text style={{fontWeight: 200}}>{post.uploader_id}</Text></Text>{'\n'}
                                <Text style={{fontWeight: 500}}>{`Votes: \n`}
                                <Text style={{fontWeight: 500, color: '#3e9e49'}}>{`\tUp: `}<Text style={{fontWeight: 200, color: '#fff'}}>{post.score.up}</Text></Text>{`\n`}
                                <Text style={{fontWeight: 500, color: '#e45f5f'}}>{`\tDown: `}<Text style={{fontWeight: 200, color: '#fff'}}>{post.score.down}</Text></Text>
                                </Text>
                            </Text>
                        </View>

                    </SafeAreaView>)}
                </SafeAreaView>
            </ScrollView>
        </SafeAreaView>
    </View>);
};

export default App;

const styles = StyleSheet.create({
    scrollContainer:{
        backgroundColor: '#222',
        color: '#fff',
        marginBottom: 7,
    },
    basicContainer:{
        margin: 10,
        marginBottom: 0,
        backgroundColor: '#444',
        borderRadius: 5,
    },
    basicContainerText:{
        color: '#fff',
        padding: 7,
        fontFamily: 'Verdana',
    },
    shareButton: {
        backgroundColor: '#444',
        borderRadius: 5,
        margin: 10,
        marginBottom: 0,
    },
    link: {
        fontSize: 18,
        color: '#fff',

        borderRadius: 5,
    },
    image: {
        backgroundColor: '#000',
        contentFit: 'contain',
        aspectRatio: 1,
        width: '100%',
    },
    video: {
        width: "100%",
        aspectRatio: 1,
    },
    tagsHeader: {
        fontWeight: 500,
        padding:5,
        paddingBottom: 3,
    },
    tagsGeneral: {color: '#b4c7d9'},
    tagsCharacter: {color: '#0a0'},
    tagsArtist: {color: '#f2ac08'},
    tagsMeta: {color: '#fff'},
    tagsInvalid: {color: '#ff3d3d'},
    tagsSpecies: {color: '#ff3d3d'},
    tagsCopyright: {color: '#d0d'},
    tagsLore: {color: '#282'},
});
