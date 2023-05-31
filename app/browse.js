import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import SelectedTheme from '../themes/default'
import { Image } from 'expo-image'
import { StatusBar } from 'expo-status-bar'

export default function Browse () {
    const style = SelectedTheme
    const [posts, setPosts] = useState([])
    const [text, setText] = useState('fiddleafox')
    const [searchTerm, setSearchTerm] = useState('fiddleafox') // Temporarily using this as default tag, just because their art is cute :3 (and because needed to test searching) (yes, I know she's transphobic, but her art isn't, so frankly I don't care)
    const router = useRouter()

    const updateSearchTerm = () => {
        console.log(text)
        setSearchTerm(text)
    }

    useEffect(() => {
        console.log('(Re)fetching posts')
        fetch(`https://e621.net/posts.json?tags=rating:safe+${searchTerm.split(' ').join('+')}`)
            .then(response => response.json())
            .then(data => setPosts(data.posts))
            .catch(error => console.log(`Error while fetching posts: "${error}"`))
    }, [searchTerm])

    const goToPost = (postId) => {
        console.log(`Navigating to post with id: ${postId}`)
        router.push({ pathname: '/postview', params: { id: postId } })
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
            <View style={style.searchContainer}>
                <View style={style.button}>
                    <Link href="/home" style={[style.containerText, { textAlign: 'center', fontWeight: 'bold' }]}>Back</Link>
                </View>
                <TextInput
                    style={style.searchInput}
                    value={text}
                    onChangeText={setText}
                    placeholder="Enter tags..."
                    onSubmitEditing={updateSearchTerm}
                />
                <TouchableOpacity style={style.button} onPress={updateSearchTerm}>
                    <Text style={[style.containerText, { textAlign: 'center', fontWeight: 'bold' }]}>Search</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={style.parentContainer}>
                    {posts.map(post => (
                        <TouchableOpacity onPress={() => goToPost(post.id)} key={post.id} style={{ width: '50%' }} >
                            <View style={[style.container, { padding: 10 }]}>
                                {<Image
                                    source={{ uri: post.preview.url }}
                                    contentFit='contain'
                                    transition={{ effect: 'cross-dissolve', duration: 250 }}
                                    style={style.image}
                                />}
                                <View style={style.childContainer}><Text style={[style.positive]}>↑{post.score.up} </Text><Text style={style.negative}> ↓{post.score.down}</Text><Text style={style.negative}>♥{post.fav_count}</Text></View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                <StatusBar hidden={true}></StatusBar>
            </ScrollView>
        </SafeAreaView>
    )
}

// TODO: add page control
