import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import PropTypes from 'prop-types'

const Relations = ({ post, style }) => {
    Relations.propTypes = {
        post: PropTypes.object,
        style: PropTypes.object
    }
    const router = useRouter()

    function goToPost (postid) {
        console.log(postid)
        router.push({ pathname: '/postview', params: { id: postid } })
    }

    return (
        <View>
            {post.relationships.parent_id && <View style={[[style.container, { flexDirection: 'row', margin: 5, marginHorizontal: 10, borderRadius: 5 }], { marginBottom: 7 }]}><Text style={[style.containerText, { fontWeight: 800 }]}>Parent:</Text><TouchableOpacity onPress={() => { goToPost(post.relationships.parent_id) }}><Text style={style.containerText}>post #{post.relationships.parent_id}</Text></TouchableOpacity></View>}
            {post.relationships.has_children && <View style={[[style.container, { flexDirection: 'row', margin: 5, marginHorizontal: 10, borderRadius: 5 }], { marginBottom: 7 }]}><Text style={[style.containerText, { fontWeight: 800 }]}>Children:</Text>{post.relationships.children.map(postId => (<TouchableOpacity key={postId} onPress={() => { goToPost(post.relationships.parent_id) }}><Text style={style.containerText}>post #{postId}</Text></TouchableOpacity>))}</View>}
        </View>
    )
}

export { Relations }
