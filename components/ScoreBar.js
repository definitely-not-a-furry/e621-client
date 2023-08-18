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
            <View style={[style.container, { flexDirection: 'row', margin: 5, marginHorizontal: 10, borderRadius: 5, justifyContent: 'flex-start' }]}>
                <Text style={style.containerText}>Up:<Score style={style} score={post.score.up}/></Text>
                <Text style={style.containerText}>Down:<Score style={style} score={post.score.down}/></Text>
                <Text style={[style.containerText, { fontFamily: null }]}><FavCount style={style} favCount={post.fav_count}/></Text>
                <Text style={style.containerText}>Rating: <Rating style={style} rating={post.rating}/></Text>
            </View>
        </View>
    )
}
