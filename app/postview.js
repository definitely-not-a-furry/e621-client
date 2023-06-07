import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import DraggableFlatList from 'react-native-draggable-flatlist'
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { defaultDark, classic } from '../themes/default'
import TagsView from '../components/PostTags'
import { Description, PostImage } from '../components/Components'
import { ScoreBar } from '../components/ScoreBar'
import { InfoView } from '../components/InfoView'
import { Relations } from '../components/Relations'

const App = () => {
    const [style, setStyle] = useState()
    const router = useRouter()
    const params = useSearchParams()
    const [post, setPost] = useState()
    const postId = params.id
    const [arrangementData, setArrangementData] = useState([
        { key: 'PostImage' },
        { key: 'ScoreBar' },
        { key: 'Description' },
        { key: 'TagsView' },
        { key: 'InfoView' },
        { key: 'Relations' }
    ])

    async function setTheme () {
        setStyle(await getTheme())
    }

    const getTheme = async () => {
        try {
            const theme = await AsyncStorage.getItem('@theme')
            switch (theme) {
            case 'defaultDark':
                return defaultDark
            case 'classic':
                return classic
            default:
                return defaultDark
            }
        } catch (e) {
            console.log(e)
            return defaultDark
        }
    }

    const renderComponent = ({ item, drag }) => {
        switch (item.key) {
        case 'PostImage':
            return (<TouchableWithoutFeedback onLongPress={drag}><View><PostImage style={style} post={post} /></View></TouchableWithoutFeedback>)
        case 'ScoreBar':
            return (<TouchableWithoutFeedback onLongPress={drag}><View><ScoreBar style={style} post={post} /></View></TouchableWithoutFeedback>)
        case 'Description':
            return (<TouchableWithoutFeedback onLongPress={drag}><View><Description style={style} description={post.description} /></View></TouchableWithoutFeedback>)
        case 'TagsView':
            return (<TouchableWithoutFeedback onLongPress={drag}><View><TagsView style={style} post={post} /></View></TouchableWithoutFeedback>)
        case 'InfoView':
            return (<TouchableWithoutFeedback onLongPress={drag}><View><InfoView style={style} post={post} /></View></TouchableWithoutFeedback>)
        case 'Relations':
            return (<TouchableWithoutFeedback onLongPress={drag}><View><Relations style={style} post={post} /></View></TouchableWithoutFeedback>)
        default:
            return null
        }
    }

    useEffect(() => {
        let isMounted = true
        setTheme()
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
            .then(data => { if (isMounted) { setPost(data.post) } })
            .catch(error => console.error(error))
        return () => {
            isMounted = false
        }
    }, [params])

    if (style === undefined) {
        return <Text>Loading...</Text>
    }

    return (
        <View style={{ backgroundColor: '#000', height: '100%', width: '100%' }}>
            <SafeAreaView style={{ backgroundColor: '#222' }}>
                <StatusBar hidden={true}/>
                <TouchableOpacity style={[style.button, { margin: 7, marginBottom: 10 }]} onPress={() => { router.push('/browse') }}><Text style={style.link}> back </Text></TouchableOpacity>
                {post && (
                    <SafeAreaView style={{ flexShrink: 1 }}>
                        <DraggableFlatList
                            style={{ flexShrink: 1 }}
                            data={arrangementData}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderComponent}
                            keyExtractor={(item) => item.key}
                            onDragEnd={({ data }) => {
                                setArrangementData(data)
                                AsyncStorage.setItem('@arrangement', JSON.stringify(arrangementData))
                            }}/>
                    </SafeAreaView>)}
            </SafeAreaView>
        </View>
    )
}

export default App
