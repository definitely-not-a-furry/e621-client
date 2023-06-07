import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { classic, defaultDark } from '../themes/default'
import { Rating } from './Components'
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-async-storage/async-storage'

const InfoView = ({ post, style }) => {
    InfoView.propTypes = {
        post: PropTypes.object,
        style: PropTypes.object
    }
    async function setTheme () {
        style = await getTheme()
    }

    const getTheme = async () => {
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
        setTheme()
    }, [])

    return (
        <View style={style.container}>
            <Text style={style.containerText}>
                <Text style={{ fontWeight: 500 }}>{'ID: '}<Text style={{ fontWeight: 200 }}>{post.id}</Text></Text>{'\n'}
                <Text style={{ fontWeight: 500 }}>{'Rating: '}<Text>{Rating({ style, rating: post.rating })}</Text></Text>{'\n'}
                <Text style={{ fontWeight: 500 }}>{'Dimensions: '}<Text style={{ fontWeight: 200 }}>{`${post.file.width}x${post.file.height} pixels`}</Text></Text>{'\n'}
                <Text style={{ fontWeight: 500 }}>{'Uploader : '}<Text style={{ fontWeight: 200 }}>{post.uploader_id}</Text></Text>{'\n'}
                <Text style={{ fontWeight: 500 }}>{'Votes: \n'}
                    <Text style={[{ fontWeight: 500 }, style.positive]}>{'\tUp: '}<Text style={{ fontWeight: 200, color: '#fff' }}>{post.score.up}</Text></Text>{'\n'}
                    <Text style={[{ fontWeight: 500 }, style.negative]}>{'\tDown: '}<Text style={{ fontWeight: 200, color: '#fff' }}>{post.score.down}</Text></Text>
                </Text>
            </Text>
        </View>
    )
}

export { InfoView }
