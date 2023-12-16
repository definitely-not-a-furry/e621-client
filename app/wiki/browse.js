import { Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { defaultDark, classic } from '../../themes/default'
import { FavCount, Rating, Score } from '../../components/Components'
import { Image } from 'expo-image'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RequestHandler from '../../util/RequestHandler'
import TagSearch from '../../components/TagSearch'
import { load } from '../../components/AsyncStore'

function Browse () {
    const R = new RequestHandler()
    R.auth = null
    R.name = null
    const [style, setStyle] = useState()
    const [posts, setPosts] = useState([])
    const [text, setText] = useState('fiddleafox')
    const [searchTerm, setSearchTerm] = useState('fiddleafox') // Temporarily using this as default tag
    const [showSuggestion, setShowSuggestion] = useState(false)
    const router = useRouter()

    const updateSearchTerm = () => {
        setSearchTerm(text)
    }

    async function setTheme () {
        R.limit = await load('@pagelength')
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
        setPosts([])
        setTheme()
        R.get('SEARCH_WIKI', searchTerm).then(data => setPosts(data.posts))
    }, [searchTerm])

    const goToPost = (postId) => {
        router.push({ pathname: './view', params: { id: postId } })
    }

    if (!style) {
        return <SafeAreaView style={{ height: '100%', backgroundColor: '#000' }}></SafeAreaView>
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
            <View style={style.searchContainer}>
                <View>
                    <TouchableOpacity style={[style.link, { padding: 7, borderRadius: 5, margin: 7, marginBottom: 7 }]} onPress={() => { router.back() }}><Text style={{ color: '#fff', fontWeight: 800 }}> back </Text></TouchableOpacity>
                </View>
                <TextInput
                    style={[style.searchInput, { flex: 1, height: 'auto', borderWidth: 2, borderRadius: 5, width: '100%', marginHorizontal: 2, padding: 5, paddingLeft: 10 }]}
                    value={text}
                    onChangeText={setText}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    enterKeyHint={'search'}
                    placeholder="Enter search term..."
                    onSubmitEditing={updateSearchTerm}
                />
                <TouchableOpacity style={[style.link, { padding: 7, borderRadius: 5, margin: 7, marginBottom: 7 }]} onPress={() => { updateSearchTerm() }}><Text style={{ color: '#fff', fontWeight: 800 }}> search </Text></TouchableOpacity>
            </View>
            <View style={[style.parentContainer, { padding: 0, flex: 1 }]}>
                <FlatList
                    style={{ height: '100%', padding: 5, margin: 0 }}
                    showsVerticalScrollIndicator={false}
                    data={posts}
                    numColumns={2}
                    renderItem={(post) => {
                        post = post.item
                        return (
                            <TouchableOpacity onPress={() => { goToPost(post.id) }} key={post.id} style={{ width: '50%' }} >
                                <View style={[[style.container, { flexDirection: 'column', margin: 5, borderRadius: 5 }], { padding: 10 }]}>
                                    {<Image
                                        source={{ uri: post.preview.url }}
                                        contentFit='contain'
                                        transition={{ effect: 'cross-dissolve', duration: 250 }}
                                        style={style.image}
                                    />}
                                    <View style={[style.childContainer, { justifyContent: 'space-between', flexWrap: 'wrap' }]}>
                                        <View style={{ padding: 4 }}><Score style={style} score={post.score.total}/></View>
                                        <View style={{ padding: 4 }}><FavCount style={style} favCount={post.fav_count}/></View>
                                        <View style={{ padding: 4 }}><Rating style={style} rating={post.rating}/></View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
            <StatusBar hidden={true}></StatusBar>
        </SafeAreaView>
    )
}

// TODO: add page control

export default Browse
