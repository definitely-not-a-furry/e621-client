import * as React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SymbolView } from 'expo-symbols'
import { useEffect, useState } from 'react'
import type { StyleSheet } from 'react-native'
import { FlatList, SafeAreaView, TextInput, TouchableOpacity, View } from 'react-native'
import type { Post, Posts } from '../api/posts'
import { FavCount, Rating, Score } from '../components/Components'
import { load } from '../components/Store'
import TagSearch from '../components/TagSearch'
import { classic, defaultDark } from '../themes/default'
import { hexagonTheme, darkTheme } from '../themes/themes'
import RequestHandler from '../util/RequestHandler'

const Browse = (): JSX.Element => {
  const R = new RequestHandler()
  const [style, setStyle] = useState<StyleSheet.NamedStyles<any>>(defaultDark)
  const [posts, setPosts] = useState<Post[]>()
  const [text, setText] = useState('tom_fischbach')
  const [searchTerm, setSearchTerm] = useState('tom_fischbach') // Temporarily using this as default tag
  const [showSuggestion, setShowSuggestion] = useState(false)
  const router = useRouter()

  const updateSearchTerm = (): void => {
    setSearchTerm(text)
  }

  const setTheme = async (): Promise<void> => {
    R.useSSL = Boolean(await load('usessl'))
    setStyle(await getTheme())
  }

  const getTheme = async (): Promise<StyleSheet.NamedStyles<any>> => {
    try {
      const theme = await AsyncStorage.getItem('theme')
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
    setTheme().catch(e => { console.error('error while loading theme: ', e) })
    R.get<Posts>('posts.json', [{ key: 'tags', value: searchTerm.split(' ') }, { key: 'limit', value: '25' }]).then((result) => {
      if (result != null) setPosts(result.posts)
      else setPosts([])
    }, (reject) => {
      console.log(reject.cause)
    })
  }, [searchTerm])

  const goToPost = (postId: number): void => {
    router.push({ pathname: './postview', params: { id: postId } })
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
      <StatusBar hidden={true}></StatusBar>
      <View style={style.searchContainer}>
        <View>
          <TouchableOpacity style={[style.link, { padding: 7, borderRadius: 5, margin: 7, marginBottom: 7 }]} onPress={() => { router.push('./home') }}><SymbolView resizeMode='scaleAspectFit' size={15} tintColor={'#fff'} weight='semibold' type='monochrome' name='chevron.backward'></SymbolView></TouchableOpacity>
        </View>
        <TextInput
          style={[style.searchInput, { flex: 1, height: 'auto', borderWidth: 2, borderRadius: 5, width: '100%', marginHorizontal: 2, padding: 5, paddingLeft: 10 }]}
          value={text}
          onChangeText={setText}
          autoCapitalize={'none'}
          autoCorrect={false}
          enterKeyHint={'search'}
          placeholder="Enter tags..."
          onFocus={() => { setShowSuggestion(true) }}
          onBlur={() => { setShowSuggestion(false) }}
          onSubmitEditing={updateSearchTerm}
        />
        <TouchableOpacity style={[style.link, { padding: 7, borderRadius: 5, margin: 7, marginBottom: 7 }]} onPress={() => { updateSearchTerm() }}><SymbolView resizeMode='scaleAspectFit' size={15} tintColor={'#fff'} weight='semibold' type='monochrome' name='magnifyingglass'></SymbolView></TouchableOpacity>
      </View>
      {showSuggestion && (<View style={{ margin: 7, marginTop: 0 }}><TagSearch input={text} style={style} /></View>)}
      <View style={[style.parentContainer, { padding: 0, flex: 1 }]}>
        <FlatList
          style={{ height: '100%', padding: 5, margin: 0 }}
          data={posts}
          numColumns={2}
          renderItem={(post) => {
            const postinfo = post.item
            return (
              <TouchableOpacity onPress={() => { goToPost(postinfo.id) }} key={postinfo.id} style={{ width: '50%' }} >
                <View style={[[style.container, { flexDirection: 'column', margin: 5, borderRadius: 5 }], { padding: 10 }]}>
                  {<Image
                    source={{ uri: postinfo.preview.url }}
                    contentFit='contain'
                    transition={{ effect: 'cross-dissolve', duration: 250 }}
                    style={style.image}
                  />}
                  <View style={[style.childContainer, { justifyContent: 'space-between' }]}>
                    <View style={{ padding: 4 }}><Score style={style} score={postinfo.score.total} /></View>
                    <View style={{ padding: 4 }}><FavCount style={style} favCount={postinfo.fav_count} /></View>
                    <View style={{ padding: 4 }}><Rating style={style} rating={postinfo.rating} /></View>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </SafeAreaView>
  )
}

// TODO: add page control

export default Browse
