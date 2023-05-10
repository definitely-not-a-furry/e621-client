import { Image } from 'expo-image';
import { useRouter, useSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
  

const Post = ({ post }) => {
    if (!post?.id) return <Text style={{color:'#fff'}}>Loading...</Text>;
    const fileExtension = post.file.url.split('.').pop();
    if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'gif') {
        return <Image source={{ uri: post.file.url }} style={styles.image} />;
    } else if (fileExtension === 'webm') {
        return (
        <Text>Videos are not supported yet</Text>
        );
    } else {
        return <Text>{`This file type (".${fileExtension}") is not supported.`}</Text>;
    }
};

const App = () => {
    const params = useSearchParams()

    const [post, setPost] = useState();
    const [isLoading, setIsLoading] = useState(true);
    
    console.log(`params:${JSON.stringify(params)}`)
    const [postid, setPostId] = useState(params.id);
    const searchTerm = params.searchterm;
    const [uploader, setUploader] = useState();
    const router = useRouter();

    const goBack = () => {
        router.push('/browse')
    };
    const isEmpty = (array) => {
        if(array === undefined || array.length == 0){
            return true;
        } else return false;
    }
    const Score = (score) => {
        if(score >= 0){
            return(<Text style={{padding: 5, color: '#3e9e49'}}>{score}</Text>);
        }else{
            return(<Text style={{padding: 5, color: '#dd3127'}}>{score}</Text>);
        }
    }
    const Rating = (rating) => {
        if(rating == 's'){
            return(<Text style={{padding: 5, color: '#3e9e49'}}>safe</Text>);
        }else if(rating == 'e'){
            return(<Text style={{padding: 5, color: '#e45f5f'}}>explicit</Text>);
        }else if(rating == 'q'){
            return(<Text style={{padding: 5, color: '#ffe666'}}>questionable</Text>)
        } else return(<Text>error</Text>)
    }

    console.log(`postid:${postid}`);
    
    const regex = /_/g

    useEffect(() => {
            fetch(`https://e621.net/posts/${postid}.json`)
            .then(response => response.json())
            .then(data => setPost(data.post))
            .catch(error => console.error(error));
    }, []);    

    return (<View style={{backgroundColor: '#000', height: '100%', width:'100%'}}>
        <SafeAreaView style={{backgroundColor: '#222'}}>
            <StatusBar hidden={true}/>
            <TouchableOpacity style={[styles.basicContainer, {margin: 0, marginBottom: 0, padding: 5, borderRadius: 0, borderColor: '#222', borderBottomWidth: 2}]} onPress={()=>{goBack()}}><Text style={styles.link}>&lt; back </Text></TouchableOpacity>
            <SafeAreaView>
            {post && (
            <ScrollView style={styles.generalContainer}>
                <SafeAreaView>
                <Post post={post} />
                <View style={styles.basicContainer}>
                    <Text style={styles.basicContainerText}>Score: {Score(post.score.total)} &ensp; Fav Count: {post.fav_count}</Text>
                </View>
                {post.description && <View style={styles.basicContainer}>
                    <Text style={styles.basicContainerText}>{post.description}</Text>
                </View>}
                <View style={styles.basicContainer}>
                    <Text style={styles.basicContainerText}><Text style={styles.tagsArtist}>{!isEmpty(post.tags.artist) && `Artist tags:

        ${post.tags.artist.join('\n\t').replace("_"," ")|| 'None'}
`}</Text>
<Text style={styles.tagsCopyright}>{!isEmpty(post.tags.copyright) && `
Copyright:

        ${post.tags.copyright.join('\n\t').replace(regex," ")|| 'None'}
`}</Text>
<Text style={styles.tagsCharacter}>{!isEmpty(post.tags.character) && `
Character tags:

        ${post.tags.character.join('\n\t').replace(regex," ")|| 'None'}
`}</Text>
<Text style={styles.tagsSpecies}>{!isEmpty(post.tags.species) && `
Species:

        ${post.tags.species.join('\n\t').replace(regex," ")|| 'None'}
`}</Text>
<Text style={styles.tagsGeneral}>{!isEmpty(post.tags.general) && `
General tags:

        ${post.tags.general.join('\n\t').replace(regex," ")|| 'None'}
`}</Text>
<Text style={styles.tagsLore}>{!isEmpty(post.tags.lore) && `
Lore tags:

        ${post.tags.lore.join('\n\t').replace(regex," ")|| 'None'}
`}</Text>
<Text style={styles.tagsMeta}>{!isEmpty(post.tags.meta) && `
Meta tags:

        ${post.tags.meta.join('\n\t').replace(regex," ")|| 'None'}
`}</Text>
<Text style={styles.tagsInvalid}>{!isEmpty(post.tags.invalid) && `
Invalid tags:

        ${post.tags.invalid.join('\n\t').replace(regex," ")|| 'None'}
`}</Text>{`
Rating: `}{Rating(post.rating)}{`
Uploader id: ${post.uploader_id}`}</Text>
                </View>
                </SafeAreaView>
            </ScrollView>
            )}
            </SafeAreaView>
        </SafeAreaView>
    </View>);
};

export default App;

const styles = StyleSheet.create({
    generalContainer:{
        backgroundColor: '#222',
        color: '#fff',
        
    },
    basicContainer:{
        margin: 10,
        marginBottom: 0,
        backgroundColor: '#444',
        borderRadius: 5,
    },
    basicContainerText:{
        color: '#fff',
        padding: 5,
    },
    link: {
        fontSize: 18,
        color: '#fff',
    },
    image: {
        backgroundColor: '#000',
        resizeMode: 'contain',
        aspectRatio: 1,
        width: '100%',
    },
    video: {
        width: "100%",
        aspectRatio: 1,
    },
    tagsGeneral: {
        color: '#b4c7d9',
    },
    tagsCharacter: {
        color: '#0a0',
    },
    tagsArtist: {
        color: '#f2ac08'
    },
    tagsMeta: {
        color: '#fff'
    },
    tagsInvalid: {
        color: '#ff3d3d',
    },
    tagsSpecies: {
        color: '#ff3d3d',
    },
    tagsCopyright: {
        color: '#d0d',
    },
    tagsLore: {
        color: '#282',
    },
});
