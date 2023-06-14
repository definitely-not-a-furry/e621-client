import {
    Text,
    View,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    FlatList
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { defaultDark, classic } from '../themes/default'
import { Rating, Score } from '../components/Components'
import { Image } from 'expo-image'
import { StatusBar } from 'expo-status-bar'
import { RootSiblingParent } from 'react-native-root-siblings'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Browse () {
    const [style, setStyle] = useState()
    const [posts, setPosts] = useState([])
    const [text, setText] = useState('fiddleafox')
    const [searchTerm, setSearchTerm] = useState('fiddleafox') // Temporarily using this as default tag, just because their art is cute :3 (and because needed to test searching) (yes, I know she's transphobic, but her art isn't, so frankly I don't care)
    const router = useRouter()

    const updateSearchTerm = () => {
        setSearchTerm(text)
    }

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

    useEffect(() => {
        setTheme()
        fetch(`https://e621.net/posts.json?tags=rating:safe+${searchTerm.split(' ').join('+')}`)
            .then(response => response.json())
            .then(data => setPosts(data.posts))
            .catch(error => console.log(`Error while fetching posts: "${error}"`))
    }, [searchTerm])

    const goToPost = (postId) => {
        console.log(`Navigating to post with id: ${postId}`)
        router.push({ pathname: '/postview', params: { id: postId } })
    }

    if (!style) {
        return <SafeAreaView style={{ height: '100%', backgroundColor: '#000' }}></SafeAreaView>
    }

    return (
        <RootSiblingParent>
            <SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
                <View style={style.searchContainer}>
                    <View>
                        <TouchableOpacity style={[style.link, { padding: 7, borderRadius: 5, margin: 7, marginBottom: 7 }]} onPress={() => { router.back() }}><Text style={{ color: '#fff', fontWeight: 800 }}> back </Text></TouchableOpacity>
                    </View>
                    <TextInput
                        style={[style.searchInput, { flex: 1, height: 'auto', borderWidth: 2, borderRadius: 5, width: '100%', marginHorizontal: 2, padding: 5, paddingLeft: 10 }]}
                        value={text}
                        onChangeText={setText}
                        placeholder="Enter tags..."
                        onSubmitEditing={updateSearchTerm}
                    />
                    <TouchableOpacity style={[style.link, { padding: 7, borderRadius: 5, margin: 7, marginBottom: 7 }]} onPress={() => { updateSearchTerm() }}><Text style={{ color: '#fff', fontWeight: 800 }}> search </Text></TouchableOpacity>
                </View>
                <View style={style.parentContainer}>
                    <FlatList
                        style={{ height: '100%' }}
                        showsVerticalScrollIndicator={false}
                        data={posts}
                        numColumns={2}
                        renderItem={(post) => {
                            post = post.item
                            return (
                                <TouchableOpacity onPress={() => { goToPost(post.id) }} key={post.id} style={{ width: '50%' }} >
                                    <View style={[[style.container, { flexDirection: 'column', margin: 5, marginHorizontal: 10, borderRadius: 5 }], { padding: 10 }]}>
                                        {<Image
                                            source={{ uri: post.preview.url }}
                                            contentFit='contain'
                                            transition={{ effect: 'cross-dissolve', duration: 250 }}
                                            style={style.image}
                                        />}
                                        <View style={[style.childContainer, { justifyContent: 'space-between', flexWrap: 'wrap' }]}><View style={{ paddingBottom: 4 }}><Score style={style} score={post.score.total}/></View><Text style={[style.negative, { paddingVertical: 10 }]}>♥{post.fav_count}</Text><Rating style={style} rating={post.rating}/></View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
                <StatusBar hidden={true}></StatusBar>
            </SafeAreaView>
        </RootSiblingParent>
    )
}

// TODO: add page control
