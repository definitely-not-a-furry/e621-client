import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

async function goToPost(postid) {
    router = useRouter()
    console.log(postid)
    router.push({ pathname: '/postview', params: { id: postid } })
};

const Relations = ({ post, style }) => {
    return (
        <View>
            {post.relationships.parent_id && <View style={[style.container, { marginBottom: 7 }]}><Text style={[style.containerText, { fontWeight: 800 }]}>Parent:</Text><TouchableOpacity onPress={() => goToPost(post.relationships.parent_id)}><Text style={style.containerText}>post #{post.relationships.parent_id}</Text></TouchableOpacity></View>}
            {post.relationships.has_children && <View style={[style.container, { marginBottom: 7 }]}><Text style={[style.containerText, { fontWeight: 800 }]}>Children:</Text>{post.relationships.children.map(postId => (<TouchableOpacity key={postId} onPress={() => goToPost(post.relationships.parent_id)}><Text style={style.containerText}>post #{postId}</Text></TouchableOpacity>))}</View>}
        </View>
    )
}

export { Relations }
