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
import { load } from '../../components/Store'
import DText from '../../components/DText'

function Browse () {
    const R = new RequestHandler()
    R.authenticationToken = null
    R.name = null
    const [style, setStyle] = useState()
    const [wikiEntries, setEntries] = useState([])
    const [text, setText] = useState('DText')
    const [searchTerm, setSearchTerm] = useState('DText') // Temporarily using this as default search term
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
        setEntries([])
        setTheme()
        R.get('SEARCH_WIKI', searchTerm).then(data => { setEntries(data) })
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
                    data={wikiEntries}
                    renderItem={(post) => {
                        post = post.item
                        return (
                            <TouchableOpacity onPress={() => { goToPost(post.id) }} key={post.id} style={{ width: '100%' }} >
                                <View style={[[style.container, { flexDirection: 'column', margin: 5, borderRadius: 5 }], { padding: 10 }]}>
                                    <Text style={style.containerText}><DText style={style}>{(post.body).replace(/\[\[([\S\s]*?)\]\]/g, '$1')}</DText></Text>
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
