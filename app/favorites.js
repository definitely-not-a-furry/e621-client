import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {useState, useEffect} from 'react';
import { useRouter, useSearchParams } from 'expo-router';

const App = () => {
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    const params = useSearchParams();
    userId = params.uid
    useEffect(() => {
        console.log('(Re)fetching posts');
        apiUrl = `https://e621.net/favorites.json?user_id=${userId}`
        fetch(`${apiUrl}`,{headers:{'Accept': 'application/json'}})
        .then(response => response.json())
        .then(data => setPosts(data.posts))
        .catch(error => console.log(`Error while fetching posts: "${error}"`));
    }, [searchTerm]);

    return(
        <View style={styles.postContainer}>
        {posts.map(post => (
            <TouchableOpacity onPress={()=>goToPost(post.id)} key={post.id} style={{width: '45%', margin: 5}}>
                <View style={styles.postCard}>
                    {<Image 
                    source={{ uri: post.preview.url }} 
                    contentFit='contain' 
                    transition={{effect:'cross-dissolve', duration: 250}} 
                    style={styles.postImage} 
                    resizeMode="cover"
                    />}
                    <View style={styles.postScoreContainer}><Text style={[styles.postScore, styles.postScoreUp]}>↑{post.score.up} </Text><Text style={[styles.postScore, styles.postScoreDown]}> ↓{post.score.down}</Text><Text style={styles.postFaves}>♥{post.fav_count}</Text></View>
                </View>
            </TouchableOpacity>
        ))}
        </View>
    )
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

export default App;