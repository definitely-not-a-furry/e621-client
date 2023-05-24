import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    RefreshControl,
    Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import UserName from './UserName';

import {impactAsync, ImpactFeedbackStyle} from 'expo-haptics';

const App = () => {
    const [refresh,callRefresh] = useState(0)
    const [searchTerm,setSearchTerm] = useState('')
    const [users, setUsers] = useState([])
    const [text, setText] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();

    const goToUser = async(id) => {
        if(Platform.OS=='ios'||Platform.OS=='android'){
            impactAsync(ImpactFeedbackStyle.Light)
        }
        await router.setParams({id:id})
        router.push('/userview')
    }
    
    const goTo = (path) => {
        if(Platform.OS=='ios'||Platform.OS=='android'){
            impactAsync(ImpactFeedbackStyle.Light)
        }
        router.push(path);
    }

    const onRefresh = useCallback(() => {
        console.log('refreshing');
        callRefresh(refresh+1)
        setRefreshing(true);
        console.log(refresh)
        setRefreshing(false)
    },[])

    const updateSearchTerm = () => {
        console.log(text);
        setSearchTerm(text)
        console.log(searchTerm);
    };
    
    useEffect(()=>{
        setRefreshing(true)
        fetch(`https://e621.net/users.json?search[name_matches]=*${searchTerm}*`)
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.log(`Error while fetching users: "${error}"`));
        console.log(users)
        setRefreshing(false);
    },[searchTerm,refresh])


    return(
        <SafeAreaView style={styles.baseContainer}>
            <StatusBar hidden={true}></StatusBar>
            <View style={styles.searchContainer}>
                <TouchableOpacity style={styles.searchButton} onPress={()=>goTo('/home')}>
                        <Text style={styles.searchButtonText}>Back</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.searchInput}
                        value={text}
                        onChangeText={setText}
                        placeholder="Enter username..."
                        onSubmitEditing={updateSearchTerm}
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={updateSearchTerm}>
                        <Text style={styles.searchButtonText}>Search</Text>
                    </TouchableOpacity>
                </View>
            <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing}/>}>
                
                <View style={styles.userContainer}>
                    {users.map(user => (
                        <TouchableOpacity key={user.id} onPress={()=>goToUser(user.id)}>
                            <View  style={styles.userCard}>
                                <UserName userData={user}/>
                                {/* <Text style={styles.userText}>{user.name}</Text>
                                <Text style={styles.userText}>{user.level_string}</Text> */}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{alignSelf:'center'}}><Text>Lorem Ipsum</Text></View>
            </ScrollView>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    baseContainer: {
        backgroundColor: '#020f23',
        flexDirection: 'column',
        height: '100%'
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
})

export default App;