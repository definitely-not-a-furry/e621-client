import { useRouter, useSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultDark } from '../themes/default';
import TagsView from '../components/PostTags';
import { Description, PostImage } from '../components/Components';
import { ScoreBar } from '../components/ScoreBar';
import { InfoView } from '../components/InfoView';
import { Relations } from '../components/Relations';

const App = () => {
    const style = defaultDark
    const router = useRouter()
    const params = useSearchParams()
    const [post, setPost] = useState()
    
    const [arrangementData, setArrangementData] = useState([
        { key: 'PostImage' },
        { key: 'ScoreBar' },
        { key: 'Description' },
        { key: 'TagsView' },
        { key: 'InfoView' },
        { key: 'Relations' },
    ])

    const postId = params.id

    const renderComponent = ({ item, drag }) => {
        switch (item.key) {
            case 'PostImage':
                return (<TouchableWithoutFeedback onLongPress={drag}><View><PostImage post={post} /></View></TouchableWithoutFeedback>)
            case 'ScoreBar':
                return (<TouchableWithoutFeedback onLongPress={drag}><View><ScoreBar post={post} /></View></TouchableWithoutFeedback>)
            case 'Description':
                return (<TouchableWithoutFeedback onLongPress={drag}><View><Description description={post.description} /></View></TouchableWithoutFeedback>)
            case 'TagsView':
                return (<TouchableWithoutFeedback onLongPress={drag}><View><TagsView post={post} /></View></TouchableWithoutFeedback>)
            case 'InfoView':
                return (<TouchableWithoutFeedback onLongPress={drag}><View><InfoView post={post} /></View></TouchableWithoutFeedback>)
            case 'Relations':
                return (<TouchableWithoutFeedback onLongPress={drag}><View><Relations post={post} /></View></TouchableWithoutFeedback>)
            default:
                return null
        }
    }

    useEffect(() => {
        AsyncStorage.getItem('@arrangement')
            .then((data) => {
                if (data) {
                    setArrangementData(JSON.parse(data))
                }
            })
            .catch((error) => {
                console.log('Error loading data from AsyncStorage:', error)
            })
        fetch(`https://e621.net/posts/${postId}.json`)
            .then(response => response.json())
            .then(data => setPost(data.post))
            .catch(error => console.error(error))
    }, [params])

    return(
    <View style={{backgroundColor: '#000', height: '100%', width:'100%'}}>
        <SafeAreaView style={{backgroundColor: '#222'}}>
            <ScrollView style={style.scrollContainer}>
                <StatusBar hidden={true}/>
                <TouchableOpacity style={[style.button, {margin:7,marginBottom: 10}]} onPress={()=>{router.push('/browse')}}><Text style={style.link}> back </Text></TouchableOpacity>
                {post && (
                <SafeAreaView>
                    <DraggableFlatList
                        data={arrangementData}
                        renderItem={renderComponent}
                        keyExtractor={(item) => item.key}
                        onDragEnd={({ data }) => {
                            setArrangementData(data)
                            AsyncStorage.setItem('@arrangement',JSON.stringify(arrangementData))
                    }}/>
                </SafeAreaView>)}
            </ScrollView>
        </SafeAreaView>
    </View>
)}

export default App