import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import DText from './DText'
import { Image } from 'expo-image'
import PropTypes from 'prop-types'

const Rating = ({ rating, style }) => {
    Rating.propTypes = {
        rating: PropTypes.string,
        style: PropTypes.object
    }
    if (rating === 's') {
        return (<Text style={[style.positive, { padding: 10, fontWeight: 700 }]}>Safe</Text>)
    } else if (rating === 'e') {
        return (<Text style={[style.explicit, { padding: 10, fontWeight: 700 }]}>Explicit</Text>)
    } else if (rating === 'q') {
        return (<Text style={[style.questionable, { padding: 10, fontWeight: 700 }]}>Questionable</Text>)
    } else return (<Text>error</Text>)
}

const Score = ({ score, style }) => {
    Score.propTypes = {
        score: PropTypes.number,
        style: PropTypes.object
    }
    if (score > 0) {
        return (<Text style={style.positive}>↑{score}</Text>)
    } else if (score === 0) {
        return (<Text style={style.neutral}>↕{score}</Text>)
    } else {
        return (<Text style={style.negative}>↓{score}</Text>)
    }
}

const FavCount = ({ favCount, style }) => {
    FavCount.propTypes = {
        favCount: PropTypes.number,
        style: PropTypes.object
    }
    return (
        <Text style={style.containerText}>{favCount}♥</Text>
    )
}

const Description = ({ description, style }) => {
    Description.propTypes = {
        description: PropTypes.string,
        style: PropTypes.object
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

const PostImage = ({ post, style }) => {
    PostImage.propTypes = {
        post: PropTypes.object,
        style: PropTypes.object
    }
    if (!post?.file) return <Text style={{ color: '#fff' }}>Loading...</Text>
    const fileExtension = post.file.ext
    if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'gif') {
        return <Image source={{ uri: post.file.url }} style={[style.image, { marginVertical: 5 }]} />
    } else {
        return <Text>{`This file type (".${fileExtension}") is not supported (yet).`}</Text>
    }
}

const PostComments = ({ postId, style }) => {
    PostComments.propTypes = {
        postId: PropTypes.number,
        style: PropTypes.object
    }
    const [comments, setComments] = useState([])

    useEffect(() => {
        let isMounted = false
        fetch(`https://e621.net/comments.json?group_by=comment&search[post_id]=${postId}`)
            .then(response => response.json())
            .then(data => {
                if (!isMounted) {
                    setComments(data.comments)
                }
            })
            .then(() => console.log('Comments:', comments))
            .catch(error => console.error(error))
        return () => {
            isMounted = true
        }
    }, [])

    return (
        <View style={style.container}>{!(comments === undefined || comments === null) && <View>{comments.map((comment) => (
            <View key={comment.id} style={style.childContainer}>
                <Text style={[style.containerText, { fontWeight: 800 }]}>{comment.creator}</Text>
                <DText text={comment.body}/>
            </View>))}</View>}
        </View>
    )
}

export {
    Rating,
    Score,
    FavCount,
    Description,
    PostImage,
    PostComments
}
