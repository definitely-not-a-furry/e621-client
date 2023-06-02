import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { themeStr, classic, defaultDark } from '../themes/default'
import DText from './DText'
import { Image } from 'expo-image'
import PropTypes from 'prop-types'

const toTheme = (string) => {
    switch (string) {
    case 'defaultDark':
        return defaultDark
    case 'classic':
        return classic
    default:
        return defaultDark
    }
}

const style = toTheme(themeStr)

const Rating = ({ rating }) => {
    Rating.propTypes = {
        rating: PropTypes.string
    }
    if (rating === 's') {
        return (<Text style={[style.positive, { padding: 10, fontWeight: 700 }]}>Safe</Text>)
    } else if (rating === 'e') {
        return (<Text style={[style.explicit, { padding: 10, fontWeight: 700 }]}>Explicit</Text>)
    } else if (rating === 'q') {
        return (<Text style={[style.questionable, { padding: 10, fontWeight: 700 }]}>Questionable</Text>)
    } else return (<Text>error</Text>)
}

const Score = ({ score }) => {
    Score.propTypes = {
        score: PropTypes.number
    }
    if (score > 0) {
        return (<Text style={style.positive}>↑{score}</Text>)
    } else if (score === 0) {
        return (<Text style={style.neutral}>↕{score}</Text>)
    } else {
        return (<Text style={style.negative}>↓{score}</Text>)
    }
}

const FavCount = ({ favCount }) => {
    FavCount.propTypes = {
        favCount: PropTypes.number
    }
    return (
        <Text style={style.containerText}>{favCount}♥</Text>
    )
}

const Description = ({ description }) => {
    Description.propTypes = {
        description: PropTypes.string
    }
    return (
        <View>
            {description && (
                <View style={style.container}>
                    <Text style={[style.containerText, { fontWeight: 700, paddingBottom: 1 }]}>Description:</Text>
                    <DText text={description}/>
                </View>
            )}
        </View>
    )
}

const PostImage = ({ post }) => {
    PostImage.propTypes = {
        post: PropTypes.object
    }
    if (!post?.file) return <Text style={{ color: '#fff' }}>Loading...</Text>
    const fileExtension = post.file.ext
    if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'gif') {
        return <Image source={{ uri: post.file.url }} style={[style.image, { marginVertical: 5 }]} />
    } else {
        return <Text>{`This file type (".${fileExtension}") is not supported (yet).`}</Text>
    }
}

const PostComments = ({ postId }) => {
    PostComments.propTypes = {
        postId: PropTypes.number
    }
    const [comments, setComments] = useState([])

    const fetchComments = () => {
        fetch(`https://e621.net/comments.json?group_by=comment&search[post_id]=${postId}`)
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.error(error))
    }

    useEffect(() => {
        fetchComments()
    }, [])

    return (
        <View style={style.container}>{comments.map((comment) => (
            <View key={comment.id} style={style.childContainer}>
                <Text style={[style.containerText, { fontWeight: 800 }]}>{comment.creator}</Text>
                <DText text={comment.body}/>
            </View>))}
        </View>
    )
}

export {
    Rating,
    Score,
    FavCount,
    Description,
    PostImage,
    PostComments,
    toTheme
}
