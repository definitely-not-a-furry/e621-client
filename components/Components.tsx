import React, { useEffect, useState } from 'react'
import { useEvent } from 'expo'
import { Text, View, Button } from 'react-native'
import { Image } from 'expo-image'
import { useVideoPlayer, VideoView } from 'expo-video'
import { SymbolView } from 'expo-symbols'
import DText from './DText'

import type { StyleSheet } from 'react-native'
import type { SFSymbol, SymbolType, SymbolWeight } from 'expo-symbols'

interface FileInformation {

}

const Rating = ({ rating, style }: { rating: string, style: StyleSheet.NamedStyles<any> }): JSX.Element => {
  if (rating === 's') {
    return (<Text style={[style.positive, { fontWeight: 800 }]}>Safe</Text>)
  } else if (rating === 'e') {
    return (<Text style={[style.explicit, { fontWeight: 800 }]}>Explicit</Text>)
  } else if (rating === 'q') {
    return (<Text style={[style.questionable, { fontWeight: 800 }]}>Questionable</Text>)
  } else return (<Text>error</Text>)
}

const Score = ({ score, style }: { score: number, style: StyleSheet.NamedStyles<any> }): JSX.Element => {
  if (score > 0) {
    return (<Text style={[style.positive, { fontWeight: 800 }]}>↑{score}</Text>)
  } else if (score === 0) {
    return (<Text style={[style.neutral, { fontWeight: 800 }]}>{score}</Text>)
  } else {
    return (<Text style={[style.negative, { fontWeight: 800 }]}>↓{score}</Text>)
  }
}

const FavCount = ({ favCount, style }: { favCount: number, style: StyleSheet.NamedStyles<any> }): JSX.Element => {
  return (
    <Text style={[style.negative, { fontWeight: 800 }]}>{favCount}♥</Text>
  )
}

const Description = ({ description, style }: { description: string, style: StyleSheet.NamedStyles<any> }): JSX.Element => {
  return (
    <View>
      {description != null && (
        <View style={[style.container, { flexDirection: 'column', margin: 5, marginHorizontal: 10, borderRadius: 5 }]}>
          <Text style={[style.containerText, { fontWeight: 700, paddingBottom: 1 }]}>Description:</Text>
          <View style={{ margin: 7 }}>
            <DText style={style}>{description}</DText>
          </View>
        </View>
      )}
    </View>
  )
}

const PostImage = ({ post, style }: { post: object, style: StyleSheet.NamedStyles<any> }): JSX.Element => {
  if (post?.file == null) return <Text style={{ color: '#fff' }}>Loading...</Text>
  const fileExtension = post.file.ext
  console.log(fileExtension)
  if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'gif') {
    return <Image transition={{ effect: 'cross-dissolve', duration: 250 }} source={{ uri: post.file.url }} style={[style.image, { marginVertical: 5 }]} />
  } else if (fileExtension === 'webm' || fileExtension === 'mp4') {

    const player = useVideoPlayer(post.file.url, player => {
      player.loop = true;
      player.play();
    })
  
    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing })
  
    return <View>
      <VideoView player={player} style={[style.image, { marginVertical: 5 }]} allowsFullscreen allowsPictureInPicture/>
      <Button
        title={isPlaying ? 'Pause' : 'Play'}
        onPress={() => {
          if (isPlaying) {
            player.pause();
          } else {
            player.play();
          }
        }}
      />
      </View>
  
  } else {
    return <Text>{`This file type (".${fileExtension}") is not supported (yet).`}</Text>
  }
}

const PostComments = ({ postId, style }: { postId: number | string, style: StyleSheet.NamedStyles<any> }): JSX.Element => {
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
      {!(comments === undefined || comments === null || comments?.comments) && (<View style={[style.container, { flexDirection: 'column', margin: 5, marginHorizontal: 10, borderRadius: 5 }]}><Text style={[style.tagHeader, { color: '#fff', fontWeight: 800 }]}>Comments: </Text>{comments.map(comment => (
        <View key={comment.id} style={[style.childContainer, { margin: 7, marginVertical: 5, flexDirection: 'column', alignItems: 'flex-start', padding: 5 }]}>
          <Text style={[style.containerText, { fontWeight: 800 }]}>{comment.creator_name}</Text>
          <DText style={style}>{comment.body}</DText>
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
