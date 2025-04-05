import React, { useEffect, useState } from 'react'
import { useEvent } from 'expo'
import { Text, View, Button } from 'react-native'
import { Image } from 'expo-image'
import { useVideoPlayer, VideoView } from 'expo-video'
import { SymbolView } from 'expo-symbols'
import type { Theme } from '../context/ThemeContext'
import DText from './DText'

import type { SFSymbol, SymbolType, SymbolWeight } from 'expo-symbols'
import type { Post } from '../api/posts'

const Rating = ({ rating, theme }: { rating: string, theme: Theme }): JSX.Element => {
  if (rating === 's') {
    return (<Text style={{ color: theme.text.rating.safe, fontFamily: theme.font, fontWeight: 800 }}>Safe</Text>)
  } else if (rating === 'e') {
    return (<Text style={{ color: theme.text.rating.explicit, fontFamily: theme.font, fontWeight: 800 }}>Explicit</Text>)
  } else if (rating === 'q') {
    return (<Text style={{ color: theme.text.rating.questionable, fontFamily: theme.font, fontWeight: 800 }}>Questionable</Text>)
  } else return (<Text>error</Text>)
}

const Score = ({ score, theme }: { score: number, theme: Theme }): JSX.Element => {
  if (score > 0) {
    return (<Text style={{ color: theme.text.positive, fontFamily: theme.font, fontWeight: 800 }}>↑{score}</Text>)
  } else if (score === 0) {
    return (<Text style={{ fontWeight: 800 }}>{score}</Text>)
  } else {
    return (<Text style={{ color: theme.text.neutral, fontFamily: theme.font, fontWeight: 800 }}>↓{score}</Text>)
  }
}

const FavCount = ({ favCount, theme }: { favCount: number, theme: Theme }): JSX.Element => {
  return (
    <Text style={{ color: theme.text.positive, fontFamily: theme.font, fontWeight: 800 }}>{favCount}♥</Text>
  )
}

const Description = ({ description, theme }: { description: string, theme: Theme }): JSX.Element => {
  return (
    <View>
      {description != null && (
        <View style={{ backgroundColor: theme.sectionLightenHalf, flexDirection: 'column', margin: 5, marginHorizontal: 10, borderRadius: 5 }}>
          <Text style={{ color: theme.text.text, fontFamily: theme.font, fontWeight: 700, padding: 7, paddingBottom: 1 }}>Description:</Text>
          <View style={{ margin: 7 }}>
            <DText style={theme}>{description}</DText>
          </View>
        </View>
      )}
    </View>
  )
}

const PostImage = ({ post, theme }: { post: Post, theme: Theme }): JSX.Element => {
  if (post?.file == null) return <Text style={{ color: '#fff' }}>Loading...</Text>
  const fileExtension = post.file.ext
  if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'gif') {
    console.log(post.file.url)
    return <Image
      transition={{ effect: 'cross-dissolve', duration: 250 }}
      source={{ uri: post.file.url }}
      style={{ backgroundColor: theme.background, aspectRatio: 1, width: '100%', marginVertical: 5 }}
    />
  } else if (fileExtension === 'webm' || fileExtension === 'mp4') {
    const player = useVideoPlayer(post.file.url, player => {
      player.loop = true
      player.play()
    })

    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing })

    return <View>
      <VideoView player={player} style={{ backgroundColor: theme.background, aspectRatio: 1, width: '100%', marginVertical: 5 }} allowsFullscreen allowsPictureInPicture />
      <Button
        title={isPlaying ? 'Pause' : 'Play'}
        onPress={() => {
          if (isPlaying) {
            player.pause()
          } else {
            player.play()
          }
        }}
      />
    </View>
  } else {
    return <Text>{`This file type (".${fileExtension}") is not supported (yet).`}</Text>
  }
}

const PostComments = ({ postId, theme }: { postId: number | string, theme: Theme }): JSX.Element => {
  const [comments, setComments] = useState(null)

  useEffect(() => {
    let isMounted = false
    fetch(`https://e621.net/comments.json?group_by=comment&search[post_id]=${postId}`)
      .then(async response => await response.json())
      .then(data => {
        if (!isMounted) {
          setComments(data)
        }
      })
      .catch(error => { console.error(error) })
    return () => {
      isMounted = true
    }
  }, [])
  return (
    <View>
      {!(comments === undefined || comments === null || comments?.comments) && (
        <View style={{ backgroundColor: theme.sectionLightenHalf, flexDirection: 'column', margin: 5, marginHorizontal: 10, borderRadius: 5 }}>
          <Text style={{ padding: 5, paddingBottom: 3, color: '#fff', fontWeight: 800 }}>Comments: </Text>
          {comments.map(comment => (
            <View key={comment.id} style={{ backgroundColor: theme.sectionLighten, margin: 7, marginVertical: 5, flexDirection: 'column', alignItems: 'flex-start', padding: 5 }}>
              <Text style={{ color: theme.text.text, padding: 7, fontWeight: 800 }}>{comment.creator_name}</Text>
              <DText style={theme}>{comment.body}</DText>
            </View>))}
        </View>)}
    </View>
  )
}

const Symbol = ({ name, size, color = '#fff', type = 'monochrome', weight = 'semibold' }: { name: SFSymbol, size: number, color?: string, type?: SymbolType, weight?: SymbolWeight }): JSX.Element => {
  return (
    <SymbolView resizeMode='scaleAspectFit' type={type} weight={weight} name={name} size={size} tintColor={color}></SymbolView>
  )
}

export {
  Rating,
  Score,
  FavCount,
  Description,
  PostImage,
  PostComments,
  Symbol
}
