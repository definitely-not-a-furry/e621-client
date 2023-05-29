import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import UserName from '../components/UserName';
import { useSearchParams } from 'expo-router';



const App = () => {
    const [userData, setUserData] = useState([])
    const router = useRouter()
    const [userId, setUserId] = useState(useSearchParams().id)
    console.log(userId)
    useEffect(()=>{
        fetch(`https://e621.net/users/${userId}.json`)
        .then(response => response.json())
        .then(data => setUserData(data))
        .catch(error => console.log(`Error while fetching user data: "${error}"`));
        console.log(userData)
    },[])
    const fetchAvatarUrl = async (postId) => {
        fetch(`https://e621.net/posts/${postId}.json`)
        .then(response => response.json())
        .then(data => {return(data.file.url)})
        .catch(error => console.log(`Error while fetching user data: "${error}"`));
    }

    return(
        <SafeAreaView style={styles.background}>
            <TouchableOpacity onPress={()=>router.back()}><Text>back</Text></TouchableOpacity>
            <View style={styles.userContainer}>
                <View style={styles.userCard}>
                    {userData.avatar_id == null ? <View></View> : <Image source={{uri:()=>{fetchAvatarUrl(userData.avatar_id)}}}/>}
                    <UserName userData={userData}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = {
    background: {
        backgroundColor: '#020f23'
    },
    userContainer: {
        padding: 10,
    },
    userCard: {
        backgroundColor: '#152f56',
        borderRadius: 5,
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        padding: 10,
        margin: 5,
    },
    userText: {
        color: '#fff'
    },
}

export default App;