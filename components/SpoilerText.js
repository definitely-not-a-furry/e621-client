import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'

const SpoilerText = (content) => {
    const [show, setShow] = useState(false)

    const handlePress = () => {
        setShow(true)
    }

    return (
        <View>
            {show
                ? (<Text style={{ backgroundColor: '#000', alignSelf: 'flex-start', color: '#fff' }}>{content.children}</Text>)
                : (
                    <TouchableHighlight style={{ alignSelf: 'flex-start' }} onPress={handlePress}>
                        <View style={{ backgroundColor: 'black' }}>
                            <Text style={{ color: 'black' }}>{content.children}</Text>
                        </View>
                    </TouchableHighlight>
                )}
        </View>
    )
}

export default SpoilerText
