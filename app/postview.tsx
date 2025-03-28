import React, { useEffect, useState } from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, View, TouchableOpacity, ScrollView } from 'react-native'
import TagsView from '../components/PostTags'
import { Description, PostImage, PostComments, Symbol } from '../components/Components'
import { ScoreBar } from '../components/ScoreBar'
import { InfoView } from '../components/InfoView'
import { Relations } from '../components/Relations'
import RequestHandler from '../util/RequestHandler'
import type { SinglePost, Post } from '../api/posts'
import { ThemeProvider, useTheme } from '../context/ThemeContext'

const PostView = (): JSX.Element => {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const params = useLocalSearchParams()
  const [post, setPost] = useState<Post>()
  const postId = params.id.toString()

  const R = new RequestHandler()

  useEffect(() => {
    R.get<SinglePost>(`posts/${postId}.json`).then(result => {
      if (result != null) setPost(result.post)
    }, reject => {
      console.log(reject.cause)
    })
  }, [])

  return (
    <View style={{ backgroundColor: '#000', height: '100%', width: '100%' }}>
      <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
        <StatusBar hidden={true} />
        <View style={{ backgroundColor: theme.foreground, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ backgroundColor: theme.sectionLighten, padding: 7, borderRadius: 5, margin: 7, marginBottom: 7 }} onPress={() => { router.push('/browse') }}><Symbol name={'chevron.backward'} size={15} /></TouchableOpacity>
        </View>
        <View style={{ flex: 1, marginTop: 5 }}>
          {post != null && (
            <ScrollView>
              <PostImage theme={theme} post={post} />
              <ScoreBar theme={theme} post={post} />
              <Description theme={theme} description={post.description} />
              <TagsView theme={theme} post={post} />
              <InfoView theme={theme} post={post} />
              <Relations theme={theme} post={post} />
              <PostComments theme={theme} postId={postId} />
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </View>
  )
}

const App = (): JSX.Element => {
  return (
    <ThemeProvider>
      <PostView />
    </ThemeProvider>
  )
}

export default App
