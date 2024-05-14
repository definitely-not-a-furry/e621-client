import * as React from 'react'
import { useEffect } from 'react'
import { Text, View } from 'react-native'
import type { StyleSheet } from 'react-native'
import { classic, defaultDark } from '../themes/default'
import { Rating } from './Components'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Post {
  id: number
  rating: string
  uploader_id: number
  file: {
    width: number
    height: number
  }
  score: {
    up: number
    down: number
  }
}

const InfoView = ({ post, style }: { post: Post, style: StyleSheet.NamedStyles<any> }): JSX.Element => {
  async function setTheme (): Promise<void> {
    style = await getTheme()
  }

  const getTheme = async (): Promise<StyleSheet.NamedStyles<any>> => {
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
    setTheme().catch(() => {})
  }, [])

  return (
    <View style={[style.container, { flexDirection: 'row', margin: 5, marginHorizontal: 10, borderRadius: 5 }]}>
      <Text style={style.containerText}>
        <Text style={{ fontWeight: 500 }}>{'ID: '}<Text style={{ fontWeight: 400 }}>{post.id}</Text></Text>{'\n'}
        <Text style={{ fontWeight: 500 }}>{'Rating: '}<Text>{Rating({ style, rating: post.rating })}</Text></Text>{'\n'}
        <Text style={{ fontWeight: 500 }}>{'Dimensions: '}<Text style={{ fontWeight: 400 }}>{`${post.file.width}x${post.file.height} pixels`}</Text></Text>{'\n'}
        <Text style={{ fontWeight: 500 }}>{'Uploader : '}<Text style={{ fontWeight: 400 }}>{post.uploader_id}</Text></Text>{'\n'}
        <Text style={{ fontWeight: 500 }}>{'Votes: \n'}
          <Text style={[{ fontWeight: 500 }, style.positive]}>{'\tUp: '}<Text style={{ fontWeight: 400, color: '#fff' }}>{post.score.up}</Text></Text>{'\n'}
          <Text style={[{ fontWeight: 500 }, style.negative]}>{'\tDown: '}<Text style={{ fontWeight: 400, color: '#fff' }}>{post.score.down}</Text></Text>
        </Text>
      </Text>
    </View>
  )
}

export { InfoView }
