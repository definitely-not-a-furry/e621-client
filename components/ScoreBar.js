import React from 'react'
import { View, Text } from 'react-native'
import { Score, FavCount, Rating } from './Components'
import PropTypes from 'prop-types'

export const ScoreBar = ({ post, style }) => {
    ScoreBar.propTypes = {
        post: PropTypes.object,
        style: PropTypes.object
    }
    return (
        <View>
            <View style={[style.container, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
                <Text style={style.containerText}><Score style={style} score={post.score.total}/></Text>
                <Text style={[style.containerText, { padding: 5 }]}><FavCount style={style} favCount={post.fav_count}/></Text>
                <Text style={style.containerText}>Rating: <Rating style={style} rating={post.rating}/></Text>
            </View>
        </View>
    )
}
