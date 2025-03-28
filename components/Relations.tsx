import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import type { Post } from '../api/posts'
import type { Theme } from '../context/ThemeContext'

const Relations = ({ post, theme }: { post: Post, theme: Theme }): JSX.Element => {
  const router = useRouter()

  const goToPost = (postid): void => {
    router.push({ pathname: '/postview', params: { id: postid } })
  }

  return (
    <View>
      {post.relationships.parent_id != null &&
      <View style={{ backgroundColor: theme.sectionLightenHalf, flexDirection: 'row', margin: 5, marginHorizontal: 10, borderRadius: 5, marginBottom: 7 }}>
        <Text style={{ color: theme.text.general, fontWeight: 800 }}>Parent:</Text>
        <TouchableOpacity onPress={() => { goToPost(post.relationships.parent_id) }}>
          <Text style={{ color: theme.text.general, padding: 7 }}>post #{post.relationships.parent_id}</Text>
        </TouchableOpacity>
      </View>}
      {post.relationships.has_children &&
      <View style={{ backgroundColor: theme.sectionLightenHalf, flexDirection: 'row', margin: 5, marginHorizontal: 10, borderRadius: 5, marginBottom: 7 }}>
        <Text style={{ color: theme.text.general, fontWeight: 800 }}>Children:</Text>
        {post.relationships.children.map(postId => (
          <TouchableOpacity key={postId} onPress={() => { goToPost(post.relationships.parent_id) }}>
            <Text style={{ color: theme.text.general, padding: 7 }}>post #{postId}</Text>
          </TouchableOpacity>))}
      </View>}
    </View>
  )
}

export { Relations }
