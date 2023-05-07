import {Text,View,Button,Image,SafeAreaView,ScrollView,StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import React, {useEffect,useState} from 'react';
import {Link, useNavigation,useRouter,useSearchParams} from 'expo-router';
import { StatusBar } from 'expo-status-bar';


export default function Browse() {
    const [posts, setPosts] = useState([]);
    const [text, setText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const updateSearchTerm = () => {
        console.log(text);
        setSearchTerm(text);
    };

    useEffect(() => {
        console.log('(re)fetching posts');
        apiUrl = `https://e621.net/posts.json?tags=rating:safe+${searchTerm.split(' ').join('+')}`
        fetch(`${apiUrl}`,{headers:{'Accept': 'application/json'}})
        .then(response => response.json())
        .then(data => setPosts(data.posts))
        .catch(error => console.log(error));
    }, [searchTerm]);

    async function goToPost(postid) {

        console.log(postid)

        await router.setParams({id: postid})

        router.push(`/postview`)
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.searchButton}>
                    <Link href="/home" style={styles.searchButtonText}>&lt;</Link>
                </View>
                <Text>&ensp; </Text>
                <TextInput
                    style={styles.searchInput}
                    value={text}
                    onChangeText={setText}
                    placeholder="Enter tags..."
                    onSubmitEditing={updateSearchTerm}
                />
                <TouchableOpacity style={styles.searchButton} onPress={updateSearchTerm}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.postContainer}>
                {posts.map(post => (
                    <View style={styles.postCard} key={post.id}>
                        {<Image source={{ uri: post.preview.url }} style={styles.postImage} resizeMode="cover"/>}
                        <View style={styles.postScoreContainer}><Text style={[styles.postScore, styles.postScoreUp]}>↑{post.score.up} </Text><Text style={[styles.postScore, styles.postScoreDown]}>↓{post.score.down}</Text></View>
                        <Text style={styles.postFaves}>♥{post.fav_count}</Text>
                        <TouchableOpacity style={styles.postButton} onPress={()=>goToPost(post.id)}><Text style={styles.postButtonText}>Open</Text></TouchableOpacity>
                    </View>
                ))}
                </View>
                <StatusBar hidden={true}></StatusBar>
            </ScrollView>
        </SafeAreaView>
    );
}

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
        alignItems: 'center',
        backgroundColor: '#000',
        justifyContent: 'center',
        padding: 10,
    },
    searchInput: {
        color: '#fff',
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#fff',
        marginRight: 10,
        paddingLeft: 10,
    },
    searchButton: {
        backgroundColor: '#545454',
        borderRadius: 5,
        padding: 13,
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
        margin: 5,
        padding: 10,
        width: '45%',
    },
    postImage: {
        height: 150,
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
        flex: 2,
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
        backgroundColor: '#1f3c67',
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
