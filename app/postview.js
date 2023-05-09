import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
  

const Post = ({ post }) => {
    if (!post?.id) return;
    const fileExtension = post.file.url.split('.').pop();
    if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'gif') {
        return <Image source={{ uri: post.file.url }} style={styles.image} />;
    } else if (fileExtension === 'webm') {
        return (
        <Text>amogus</Text>
        );
    } else {
        return <Text>This file type (".{fileExtension}") is not supported.</Text>;
    }
};

const App = () => {
    const params = useSearchParams()
    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('@previous_id', value);
        } catch (e) {
          console.error(`Saving error: "${e}"`);
        }
    }
    
    const getData = async () => {
        if(params==null){
            try {
                const value = await AsyncStorage.getItem('@previous_id');
                if(value !== null) {
                  return value;
                }
            } catch(e) {
              console.warning(`Loading warning: "${e}"`)
              return value;
            }
        } else {
            return params.id;
        }

    }

    const [post, setPost] = useState();
    const [isLoading, setIsLoading] = useState(true);
    
    console.log(`params:${JSON.stringify(params)}`)
    const [postid, setPostId] = useState(getData());
    const searchTerm = params.searchterm;

    const router = useRouter();

    const goBack = () => {
        router.push('/browse')
    };

    console.log(`postid:${postid}`);

    useEffect(() => {
            fetch(`https://e621.net/posts/${postid}.json`)
            .then(response => response.json())
            .then(data => setPost(data.post))
            .catch(error => console.error(error));
            console.log(`post: ${JSON.stringify(post)}`)
    }, []);
    
    return (<View style={{backgroundColor: '#000', height: '100%', width:'100%'}}>{post && (
        <SafeAreaView style={{backgroundColor: '#222'}}>
            <StatusBar hidden={true}/>
            <TouchableOpacity style={[styles.basicContainer, {margin: 0, marginBottom: 0, padding: 5,}]} onPress={()=>{goBack()}}><Text style={styles.link}>&lt; back </Text></TouchableOpacity>
            <SafeAreaView>
            <ScrollView style={styles.generalContainer}>
                <SafeAreaView>
                <Post post={post} />
                <View style={styles.basicContainer}>
                    <Text style={styles.basicContainerText}>Score: {post.score.total} &ensp; Fav Count: {post.fav_count}</Text>
                </View>
                <View style={styles.basicContainer}>
                    <Text style={styles.basicContainerText}>{post.description}</Text>
                </View>
                <View style={styles.basicContainer}>
                    <Text style={styles.basicContainerText}>{`
Artist tags:

    ${post.tags.artist.join('\n\t')}

Character tags:

    ${post.tags.character.join('\n\t')}
    
General tags:

    ${post.tags.general.join('\n\t')}
    
Meta tags:

    ${post.tags.meta.join('\n\t')}

Rating: ${post.rating}
Approver: ${post.approver}`}</Text>
                </View>
                </SafeAreaView>
            </ScrollView>
            </SafeAreaView>
        </SafeAreaView>
    )}</View>);
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
        backgroundColor: '#222',
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

});
