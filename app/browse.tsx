import * as React from 'react'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SymbolView } from 'expo-symbols'
import { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, TextInput, TouchableOpacity, View } from 'react-native'
import type { Post, Posts } from '../api/posts'
import { FavCount, Rating, Score } from '../components/Components'
import TagSearch from '../components/TagSearch'
import RequestHandler from '../util/RequestHandler'
import { ThemeProvider, useTheme } from '../context/ThemeContext'
import { store } from '../components/Store'

const Browse = (): JSX.Element => {
  const R = new RequestHandler()
  const { theme, setTheme } = useTheme()
  const [posts, setPosts] = useState<Post[]>()
  const [text, setText] = useState('tom_fischbach')
  const [searchTerm, setSearchTerm] = useState('tom_fischbach') // Temporarily using this as default tag
  const [showSuggestion, setShowSuggestion] = useState(false)
  const router = useRouter()

  const updateSearchTerm = (): void => {
    setSearchTerm(text)
    store('previoussearch', searchTerm).catch((reason) => { console.log('Could not save search term') })
  }

  useEffect(() => {
    setPosts([])
    R.get<Posts>('posts.json', [{ key: 'tags', value: searchTerm.split(' ') }, { key: 'limit', value: '25' }]).then((result) => {
      if (result != null) setPosts(result.posts)
      else setPosts([])
    }, (reject) => {
      console.log(reject.cause)
    })
  }, [searchTerm])

  const goToPost = (postId: number): void => {
    router.push({ pathname: './posts/[id]', params: { id: postId } })
  }

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      <StatusBar hidden={true}></StatusBar>
      <View style={{ flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center', backgroundColor: theme.foreground, justifyContent: 'center' }}>
        <View>
          <TouchableOpacity style={[{ padding: 7, borderRadius: 5, margin: 7, marginBottom: 7 }]} onPress={() => { router.push('./home') }}><SymbolView resizeMode='scaleAspectFit' size={15} tintColor={'#fff'} weight='semibold' type='monochrome' name='chevron.backward'></SymbolView></TouchableOpacity>
        </View>
        <TextInput
          style={[{ color: theme.text.general, borderColor: theme.sectionLighten, flex: 1, height: 'auto', borderWidth: 2, borderRadius: 5, width: '100%', marginHorizontal: 2, padding: 5, paddingLeft: 10 }]}
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
        <TouchableOpacity style={{ padding: 7, borderRadius: 5, margin: 7, marginBottom: 7 }} onPress={() => { updateSearchTerm() }}><SymbolView resizeMode='scaleAspectFit' size={15} tintColor={'#fff'} weight='semibold' type='monochrome' name='magnifyingglass'></SymbolView></TouchableOpacity>
      </View>
      {showSuggestion && (<View style={{ margin: 7, marginTop: 0 }}><TagSearch input={text} style={style} /></View>)}
      <View style={{ flex: 1, backgroundColor: theme.sectionDarken, flexDirection: 'row', flexWrap: 'wrap', padding: 0 }}>
        <FlatList
          style={{ height: '100%', padding: 5, margin: 0 }}
          data={posts}
          numColumns={2}
          renderItem={(post) => {
            const postinfo = post.item
            return (
              <TouchableOpacity onPress={() => { goToPost(postinfo.id) }} key={postinfo.id} style={{ width: '50%' }} >
                <View style={{ margin: 5, marginHorizontal: 10, backgroundColor: theme.sectionLightenHalf, borderRadius: 5, flexDirection: 'column', padding: 10 }}>
                  {<Image
                    source={{ uri: postinfo.preview.url }}
                    contentFit='contain'
                    transition={{ effect: 'cross-dissolve', duration: 250 }}
                    style={{ backgroundColor: '#111', contentFit: 'contain', aspectRatio: 1, width: '100%' }}
                  />}
                  <View style={{ flexDirection: 'row', borderRadius: 5, marginTop: 6, backgroundColor: theme.sectionLighten, justifyContent: 'space-between' }}>
                    <View style={{ padding: 4 }}><Score theme={theme} score={postinfo.score.total} /></View>
                    <View style={{ padding: 4 }}><FavCount theme={theme} favCount={postinfo.fav_count} /></View>
                    <View style={{ padding: 4 }}><Rating theme={theme} rating={postinfo.rating} /></View>
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

const App = (): JSX.Element => {
  return (
    <ThemeProvider>
      <Browse />
    </ThemeProvider>
  )
}

// TODO: add page control

export default App
