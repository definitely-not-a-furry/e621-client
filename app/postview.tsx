import React, { useEffect, useState } from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import DraggableFlatList from 'react-native-draggable-flatlist'
import { SafeAreaView, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { defaultDark, classic } from '../themes/default'
import TagsView from '../components/PostTags'
import { Description, PostImage, PostComments, Symbol } from '../components/Components'
import { ScoreBar } from '../components/ScoreBar'
import { InfoView } from '../components/InfoView'
import { Relations } from '../components/Relations'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import haptic from '../components/haptic'
import RequestHandler, { FetchType } from '../util/RequestHandler'
import type { StyleSheet } from 'react-native'
import { load, store } from '../components/AsyncStore'

const Post = (): JSX.Element => {
    const [style, setStyle] = useState<StyleSheet.NamedStyles<any>>()
    const router = useRouter()
    const params = useLocalSearchParams()
    const [post, setPost] = useState()
    const postId = params.id.toString()
    const [arrangementData, setArrangementData] = useState([
        { key: 'PostImage' },
        { key: 'ScoreBar' },
        { key: 'Description' },
        { key: 'PostComments' },
        { key: 'TagsView' },
        { key: 'InfoView' },
        { key: 'Relations' }
    ])
    const R = new RequestHandler()
    R.auth = null
    R.name = null

    const setTheme = async (): Promise<void> => {
        setStyle(await getTheme())
    }

    const getTheme = async (): Promise<StyleSheet.NamedStyles<any>> => {
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

    const renderComponent = ({ item, drag }): JSX.Element => {
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

    const onDragEnd = ({ data }): void => {
        setArrangementData(data)
        haptic(1)
    }

    useEffect(() => {
        setTheme()
        load('@arrangement')
            .then(data => {
                if (data != null) {
                    setArrangementData(JSON.parse(data))
                }
            })
            .catch(e => {
                console.log('Error loading data from AsyncStorage:', e)
            })
        R.get(FetchType.Get_post, postId).then(data => { setPost(data.post) }).catch(e => { console.error('error while fetching post') })
    }, [])

    const saveArrangement = (): void => {
        store('@arrangement', JSON.stringify(arrangementData)).catch(e => { console.error('error while saving arrangement data') })
        haptic(1)
        setTimeout(() => { haptic(2) }, 100)
    }

    if (style === undefined) {
        return <SafeAreaView style={{ height: '100%', backgroundColor: '#000' }}></SafeAreaView>
    }

    return (
        <View style={{ backgroundColor: '#000', height: '100%', width: '100%' }}>
            <SafeAreaView style={[style.themeColor.dark, { flex: 1 }]}>
                <StatusBar hidden={true}/>
                <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }, style.themeColor.mid]}>
                    <TouchableOpacity style={[style.link, { padding: 7, borderRadius: 5, margin: 7, marginBottom: 7 }]} onPress={() => { router.push('/browse') }}><Symbol name={'chevron.backward'} size={15} /></TouchableOpacity>
                    <TouchableOpacity style={[style.link, { padding: 7, borderRadius: 5, margin: 7, marginBottom: 7 }]} onPress={() => { saveArrangement() }}><Text style={{ color: '#fff', fontWeight: 800 }}> save arrangement </Text></TouchableOpacity>
                </View>
                <SafeAreaView style={{ flex: 1, marginTop: 5 }}>
                    {post != null && (
                        <GestureHandlerRootView>
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
                        </GestureHandlerRootView>
                    )}
                </SafeAreaView>
            </SafeAreaView>
        </View>
    )
}

export default Post
