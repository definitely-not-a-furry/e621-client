import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import DraggableFlatList from 'react-native-draggable-flatlist'
import { SafeAreaView, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-root-toast'
import { RootSiblingParent } from 'react-native-root-siblings'
import { defaultDark, classic } from '../themes/default'
import TagsView from '../components/PostTags'
import { Description, PostImage, PostComments } from '../components/Components'
import { ScoreBar } from '../components/ScoreBar'
import { InfoView } from '../components/InfoView'
import { Relations } from '../components/Relations'
import haptic from '../components/haptic'
import RequestHandler from '../util/RequestHandler'

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
        { key: 'PostComments' },
        { key: 'TagsView' },
        { key: 'InfoView' },
        { key: 'Relations' }
    ])
    R = new RequestHandler()
    R.auth = null
    R.name = null

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
        case 'PostComments':
            return (<TouchableWithoutFeedback onLongPress={drag}><View><PostComments style={style} postId={postId}/></View></TouchableWithoutFeedback>)
        default:
            return null
        }
    }

    const onDragEnd = ({ data }) => {
        setArrangementData(data)
        haptic(1)
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
        R.get('GET_POST', postId).then(data => setPost(data.post))
        return () => {
            isMounted = false
        }
    }, [params])

    const saveArrangement = () => {
        AsyncStorage.setItem('@arrangement', JSON.stringify(arrangementData))
        haptic(1)
        Toast.show('Arrangement saved!')
        setTimeout(() => { haptic(2) }, 125)
    }

    if (style === undefined) {
        return <SafeAreaView style={{ height: '100%', backgroundColor: '#000' }}></SafeAreaView>
    }

    return (
        <RootSiblingParent>
            <View style={{ backgroundColor: '#000', height: '100%', width: '100%' }}>
                <SafeAreaView style={[style.themeColor.dark, { flex: 1 }]}>
                    <StatusBar hidden={true}/>
                    <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }, style.themeColor.mid]}>
                        <TouchableOpacity style={[style.link, { padding: 5, borderRadius: 5, margin: 7, marginBottom: 7 }]} onPress={() => { router.push('/browse') }}><Text style={{ color: '#fff', fontWeight: 800 }}> back </Text></TouchableOpacity>
                        <TouchableOpacity style={[style.link, { padding: 5, borderRadius: 5, margin: 7, marginBottom: 7 }]} onPress={() => { saveArrangement() }}><Text style={{ color: '#fff', fontWeight: 800 }}> save arrangement </Text></TouchableOpacity>
                    </View>
                    <SafeAreaView style={{ flex: 1, marginTop: 5 }}>
                        {post && (
                            <DraggableFlatList
                                style={{ marginBottom: 5 }}
                                contentContainerStyle={{ flexGrow: 1 }}
                                onDragBegin={() => { haptic(3) }}
                                data={arrangementData}
                                showsVerticalScrollIndicator={false}
                                renderItem={renderComponent}
                                keyExtractor={(item) => item.key}
                                onRelease={() => { haptic(1) }}
                                onDragEnd={onDragEnd}
                            />
                        )}
                    </SafeAreaView>
                </SafeAreaView>
            </View>
        </RootSiblingParent>
    )
}

export default App
