import { Image } from 'expo-image';
import { useRouter, useSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { defaultDark, classic } from '../themes/default';
import UserName from './UserName'

const App = () => {
    const style = classic;
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
        if(score>0){
            return(<Text style={style.positive}>{score}</Text>);
        }else if(score==0){
            return(<Text style={style.neutral}>{score}</Text>);
        }else{
            return(<Text style={style.negative}>{score}</Text>);
        }
    }
    const Rating = ({rating}) => {
        if(rating == 's'){
            return(<Text style={[style.positive,{padding:10,fontWeight:700}]}>Safe</Text>);
        }else if(rating == 'e'){
            return(<Text style={[style.explicit,{padding:10,fontWeight:700}]}>Explicit</Text>);
        }else if(rating == 'q'){
            return(<Text style={[style.questionable,{padding:10,fontWeight:700}]}>Questionable</Text>)
        } else return(<Text>error</Text>)
    }

    const Post = ({ post }) => {
        if (!post?.id) return <Text style={{color:'#fff'}}>Loading...</Text>;
        const fileExtension = post.file.ext;
        if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'gif') {
            return <Image source={{ uri: post.file.url }} style={style.image} />;
        } else if (fileExtension === 'webm') {
            return (
                <View>            
            <Text style={{color: '#fff', padding: 10}}>Videos are not supported yet.</Text>
            </View>
            );
        } else {
            return <Text>{`This file type (".${fileExtension}") is not supported.`}</Text>;
        }
    };

    async function goToPost(postid) {
        console.log(postid)
        router.push({pathname:'/postview',params:{id:postid}})
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
            <ScrollView style={style.scrollContainer}>
                <StatusBar hidden={true}/>
                <TouchableOpacity style={[style.button, {marginBottom: 10}]} onPress={()=>{goBack()}}><Text style={style.link}> back </Text></TouchableOpacity>
                <SafeAreaView>
                    {post && (
                    <SafeAreaView>
                        <Post post={post} />
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={[style.container,{flexDirection: 'row'}]}>
                                <Text style={style.containerText}>Score: <Score score={post.score.total}/> &ensp; Fav Count: {post.fav_count}♥</Text> 
                                <Rating rating={post.rating}/>
                            </View>
                        </View>
                        {post.description && 
                        <View style={style.container}>
                            <Text style={[style.containerText,{fontWeight: 700, paddingBottom: 1}]}>Description:</Text>
                            <Text style={[style.containerText,{paddingTop: 2}]}>{post.description}</Text>
                        </View>}
                        {/* {!isEmpty(comments) && <View>
                             <Text style={style.containerText}>Comments:</Text>
                           {comments.map(comment=>(
                            <View key={comment.id} style={style.container}>
                                <Text style={[style.containerText,{fontWeight:800}]}>{comment.creator_name}</Text>
                                <Text style={style.containerText}>{comment.body}</Text>
                            </View>
                        ))}</View>} */}
                        <View style={style.container}>
                            <Text style={style.containerText}> Tags: {'\n\n'}
                                <Text style={style.tagHeader}>{!isEmpty(post.tags.artist) && `Artists:\n`}</Text>
                                {post.tags.artist.map(tag => <Text style={style.tagsArtist} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                                <Text style={style.tagHeader}>{!isEmpty(post.tags.copyright) && `Copyright:\n`}</Text>
                                {post.tags.copyright.map(tag => <Text style={style.tagsCopyright} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                                <Text style={style.tagHeader}>{!isEmpty(post.tags.character) && `Character:\n`}</Text>
                                {post.tags.character.map(tag => <Text style={style.tagsCharacter} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                                <Text style={style.tagHeader}>{!isEmpty(post.tags.species) && `Species:\n`}</Text>
                                {post.tags.species.map(tag => <Text style={style.tagsSpecies} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                                <Text style={style.tagHeader}>{!isEmpty(post.tags.general) && `General:\n`}</Text>
                                {post.tags.general.map(tag => <Text style={style.tagsGeneral} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                                <Text style={style.tagHeader}>{!isEmpty(post.tags.lore) && `Lore:\n`}</Text>
                                {post.tags.lore.map(tag => <Text style={style.tagsLore} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                                <Text style={style.tagHeader}>{!isEmpty(post.tags.meta) && `Meta:\n`}</Text>
                                {post.tags.meta.map(tag => <Text style={style.tagsMeta} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                                <Text style={style.tagHeader}>{!isEmpty(post.tags.invalid) && `Invalid:\n`}</Text>
                                {post.tags.invalid.map(tag => <Text style={style.tagsInvalid} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                            </Text>
                        </View>
                        <View style={[style.container]}>
                            <Text style={style.containerText}>
                                <Text style={{fontWeight: 500}}>{`ID: `}<Text style={{fontWeight: 200}}>{post.id}</Text></Text>{'\n'}
                                <Text style={{fontWeight: 500}}>{`Rating: `}<Text>{Rating({rating:post.rating})}</Text></Text>{'\n'}
                                <Text style={{fontWeight: 500}}>{`Dimensions: `}<Text style={{fontWeight: 200}}>{`${post.file.width}x${post.file.height} pixels`}</Text></Text>{'\n'}
                                <Text style={{fontWeight: 500}}>{`Uploader : `}<Text style={{fontWeight: 200}}>{post.uploader_id}</Text></Text>{'\n'}
                                <Text style={{fontWeight: 500}}>{`Votes: \n`}
                                <Text style={[{fontWeight: 500},style.positive]}>{`\tUp: `}<Text style={{fontWeight: 200, color: '#fff'}}>{post.score.up}</Text></Text>{`\n`}
                                <Text style={[{fontWeight: 500},style.negative]}>{`\tDown: `}<Text style={{fontWeight: 200, color: '#fff'}}>{post.score.down}</Text></Text>
                                </Text>
                            </Text>
                        </View>
                        {post.relationships.parent_id && <View style={[style.container,{marginBottom:7}]}><Text style={[style.containerText,{fontWeight:800}]}>Parent:</Text><TouchableOpacity onPress={()=>goToPost(post.relationships.parent_id)}><Text style={style.containerText}>post #{post.relationships.parent_id}</Text></TouchableOpacity></View>}
                        {post.relationships.has_children && <View style={[style.container,{marginBottom:7}]}><Text style={[style.containerText,{fontWeight:800}]}>Children:</Text>{post.relationships.children.map(postid=>(<TouchableOpacity key={postid} onPress={()=>goToPost(post.relationships.parent_id)}><Text style={style.containerText}>post #{postid}</Text></TouchableOpacity>))}</View>}
                    </SafeAreaView>)}
                </SafeAreaView>
            </ScrollView>
        </SafeAreaView>
    </View>);
};

export default App;