import { Image } from 'expo-image';
import { useRouter, useSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { defaultDark, classic } from '../themes/default';
import UserName from '../components/UserName'
import TagsView from '../components/PostTags';
import {Description, PostImage } from '../components/Components';
import DText from '../components/DText';
import {ScoreBar} from '../components/ScoreBar';
import {InfoView} from '../components/InfoView';
import { Relations } from '../components/Relations';

const App = () => {
    const style = defaultDark;
    const router = useRouter();
    const params = useSearchParams()
    const [post, setPost] = useState();
    
    
    const postId = params.id;
    const searchTerm = params.searchterm;
    
    const goBack = () => {
        router.push('/browse')
    };

    async function goToPost(postid) {
        console.log(postid)
        router.push({pathname:'/postview',params:{id:postid}})
    };

    

    useEffect(() => {
        fetch(`https://e621.net/posts/${postId}.json`)
            .then(response => response.json())
            .then(data => setPost(data.post))
            .catch(error => console.error(error));
    }, [params]);

    return (<View style={{backgroundColor: '#000', height: '100%', width:'100%'}}>
        <SafeAreaView style={{backgroundColor: '#222'}}>
            <ScrollView style={style.scrollContainer}>
                <StatusBar hidden={true}/>
                <TouchableOpacity style={[style.button, {margin:7,marginBottom: 10}]} onPress={()=>{goBack()}}><Text style={style.link}> back </Text></TouchableOpacity>
                <SafeAreaView>
                    {post && (
                    <SafeAreaView>
                        <PostImage post={post} />
                        <ScoreBar post={post}/>
                        <Description description={post.description}/>
                        <TagsView post={post}/>
                        <InfoView post={post}/>
                        <Relations post={post}/>
                    </SafeAreaView>)}
                </SafeAreaView>
            </ScrollView>
        </SafeAreaView>
    </View>);
};

export default App;