import React from 'react'
import { View, Text } from 'react-native'
import { Score, FavCount, Rating } from './Components'
import type { Post } from '../api/posts'
import type { Theme } from '../context/ThemeContext'

export const ScoreBar = ({ post, theme }: { post: Post, theme: Theme }): JSX.Element => {
  return (
    <View>
      <View style={{ backgroundColor: theme.sectionLightenHalf, flexDirection: 'row', margin: 5, marginHorizontal: 10, borderRadius: 5, justifyContent: 'flex-start' }}>
        <Text style={{ color: theme.text.text, padding: 7 }}>Up:<Score theme={theme} score={post.score.up} /></Text>
        <Text style={{ color: theme.text.text, padding: 7 }}>Down:<Score theme={theme} score={post.score.down} /></Text>
        <Text style={{ color: theme.text.text, padding: 7 }}><FavCount theme={theme} favCount={post.fav_count} /></Text>
        <Text style={{ color: theme.text.text, padding: 7 }}>Rating: <Rating theme={theme} rating={post.rating} /></Text>
      </View>
    </View>
  )
}
