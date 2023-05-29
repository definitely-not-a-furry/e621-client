import {Text,View,SafeAreaView,ScrollView,StyleSheet,TextInput,TouchableOpacity,ActivityIndicator} from 'react-native';
import React, {useEffect,useState} from 'react';
import {Link, useNavigation,useRouter,useSearchParams} from 'expo-router';
import { defaultDark, classic } from '../themes/default';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';


export default function Browse() {
    const style = defaultDark;
    const [posts, setPosts] = useState([]);
    const [text, setText] = useState('fiddleafox');
    const [searchTerm, setSearchTerm] = useState('fiddleafox'); //Temporarly using this as default tag, just because their art is cute :3
    const router = useRouter();

    const updateSearchTerm = () => {
        console.log(text);
        setSearchTerm(text);
    };

    useEffect(() => {
        console.log('(Re)fetching posts');
        apiUrl = `https://e621.net/posts.json?tags=rating:safe+${searchTerm.split(' ').join('+')}`
        fetch(`${apiUrl}`,{headers:{'Accept': 'application/json'}})
        .then(response => response.json())
        .then(data => setPosts(data.posts))
        .catch(error => console.log(`Error while fetching posts: "${error}"`));
    }, [searchTerm]);

    async function goToPost(postid) {
        console.log(postid)
        router.push({pathname:'/postview',params:{id:postid}})
    };

    return (
        <SafeAreaView style={{backgroundColor: "#000",flex:1}}>
            <View style={style.searchContainer}>
                <View style={style.button}>
                    <Link href="/home" style={styles.searchButtonText}>˂ Back</Link>
                </View>
                <TextInput
                    style={style.searchInput}
                    value={text}
                    onChangeText={setText}
                    placeholder="Enter tags..."
                    onSubmitEditing={updateSearchTerm}
                />
                <TouchableOpacity style={style.button} onPress={updateSearchTerm}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={style.parentContainer}>
                {posts.map(post => (
                    <TouchableOpacity onPress={()=>goToPost(post.id)} key={post.id} style={{width:'50%'}} >
                        <View style={[style.container,{padding:10}]}>
                            {<Image 
                            source={{ uri: post.preview.url }} 
                            contentFit='contain' 
                            transition={{effect:'cross-dissolve', duration: 250}} 
                            style={style.image} 
                            />}
                            <View style={style.childContainer}><Text style={[style.positive]}>↑{post.score.up} </Text><Text style={style.negative}> ↓{post.score.down}</Text><Text style={style.negative}>♥{post.fav_count}</Text></View>
                        </View>
                    </TouchableOpacity>
                ))}
                </View>
                <StatusBar hidden={true}></StatusBar>
            </ScrollView>
        </SafeAreaView>
    );
}

//TODO: add page control

const styles = StyleSheet.create({

    container: {
        flex: 1,
        color: '#fff',
        backgroundColor: '#020f23',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#152f56',
        justifyContent: 'center',
        padding: 10,
    },
    searchInput: {
        color: '#fff',
        flex: 1,
        width: '100%',
        height: 'auto',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#25477b',
        marginHorizontal: 10,
        padding: 10,
        paddingLeft: 10,
    
    },
    searchButton: {
        backgroundColor: '#25477b',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#25477b',
        padding: 10,
    },
    searchButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    postContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
    },
    postCard: {
        backgroundColor: '#152f56',
        borderRadius: 5,
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        padding: 10,
    },
    postImage: {
        height: 200,
        width: '100%',
        borderRadius: 5,
        marginBottom: 5,
    },
    postScore: {
        fontSize: 14,
        marginBottom: 5,
    },
    postScoreContainer: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
    },
    postScoreUp:{
        color: '#006400',
        flex: 1,
    },
    postScoreDown: {
        color: '#800000',
        flex: 1,
    },
    postFaves: {
        color: '#cf0404',
        fontSize: 14,
        marginBottom: 5,
    },
    postBody: {
        fontSize: 16,
        marginBottom: 5,
    },
    postButton: {
        backgroundColor: '#25477b',
        borderRadius: 5,
        padding: 5,
        alignContent: 'left',
        alignSelf: 'left',
        fontSize: 20,
        width: 'auto',
    },
    postButtonText: {
        color: '#fff',
        textAlign: 'left',
        fontSize: 18,
    },
});
