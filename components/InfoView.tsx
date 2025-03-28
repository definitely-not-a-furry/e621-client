import * as React from 'react'
import { Text, View } from 'react-native'
import { Rating } from './Components'
import type { Theme } from '../context/ThemeContext'
import type { Post } from '../api/posts'

const InfoView = ({ post, theme }: { post: Post, theme: Theme }): JSX.Element => {
  return (
    <View style={{ backgroundColor: theme.sectionLightenHalf, flexDirection: 'row', margin: 5, marginHorizontal: 10, borderRadius: 5 }}>
      <Text style={{ color: theme.text.text, padding: 7 }}>
        <Text style={{ fontWeight: 800 }}>{'Post Information\n'}</Text>
        <Text style={{ fontWeight: 500 }}>{'ID: '}<Text style={{ fontWeight: 400 }}>{post.id}</Text></Text>{'\n'}
        <Text style={{ fontWeight: 500 }}>{'Rating: '}<Text>{Rating({ theme, rating: post.rating })}</Text></Text>{'\n'}
        <Text style={{ fontWeight: 500 }}>{'Dimensions: '}<Text style={{ fontWeight: 400 }}>{`${post.file.width}x${post.file.height} pixels`}</Text></Text>{'\n'}
        <Text style={{ fontWeight: 500 }}>{'Uploader : '}<Text style={{ fontWeight: 400 }}>{post.uploader_id}</Text></Text>{'\n'}
        <Text style={{ fontWeight: 500 }}>{'Votes: \n'}
          <Text style={{ color: theme.text.positive, fontWeight: 500 }}>{'\tUp: '}<Text style={{ fontWeight: 400, color: '#fff' }}>{post.score.up}</Text></Text>{'\n'}
          <Text style={{ color: theme.text.negative, fontWeight: 500 }}>{'\tDown: '}<Text style={{ fontWeight: 400, color: '#fff' }}>{post.score.down}</Text></Text>
        </Text>
      </Text>
    </View>
  )
}

export { InfoView }
