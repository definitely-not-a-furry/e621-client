import React from 'react'
import { Text, View, TouchableOpacity, Linking } from 'react-native'
import SpoilerText from './SpoilerText'
import PropTypes from 'prop-types'

const DText = ({ text, style }) => {
    DText.propTypes = {
        text: PropTypes.string,
        style: PropTypes.object
    }
    const parseMarkup = (text) => {
        const regex = /\[(\/?[a-z]+)(?:=([a-z0-9#]+))?\]([\S\s]*)\[\/\1\]/g
        let matches
        const parsedText = []
        let currentIndex = 0

        while ((matches = regex.exec(text)) !== null) {
            const [fullMatch, tag, color, content] = matches

            const plainText = text.substring(currentIndex, matches.index)
            parsedText.push(
                <Text key={`plain_${currentIndex}`} style={{ color: '#fff' }}>
                    {plainText}
                </Text>
            )

            if (tag === 'b') {
                parsedText.push(
                    <Text key={`bold_${currentIndex}`} style={{ fontWeight: 'bold' }}>
                        {content}
                    </Text>
                )
            } else if (tag === 's') {
                parsedText.push(
                    <Text key={`strikethrough_${currentIndex}`} style={{ textDecorationLine: 'line-through' }}>
                        {content}
                    </Text>
                )
            } else if (tag === 'u') {
                parsedText.push(
                    <Text key={`underline_${currentIndex}`} style={{ textDecorationLine: 'underline' }}>
                        {content}
                    </Text>
                )
            } else if (tag === 'i') {
                parsedText.push(
                    <Text key={`italic_${currentIndex}`} style={{ fontStyle: 'italic' }}>
                        {content}
                    </Text>
                )
            } else if (tag === 'sup') {
                parsedText.push(
                    <Text key={`superscript_${currentIndex}`} style={{ fontSize: 10, lineHeight: 10 }}>
                        {content}
                    </Text>
                )
            } else if (tag === 'sub') {
                parsedText.push(
                    <Text key={`subscript_${currentIndex}`} style={{ fontSize: 10, lineHeight: 10 }}>
                        {content}
                    </Text>
                )
            } else if (tag === 'spoiler') {
                parsedText.push(
                    <TouchableOpacity>
                        <View
                            key={`spoiler_${currentIndex}`}
                            style={{
                                backgroundColor: 'black',
                                alignSelf: 'flex-start',
                                paddingHorizontal: 4
                            }}
                        >
                            <Text style={{ color: '#fff' }}>Spoiler</Text>
                        </View>
                    </TouchableOpacity>
                )
            } else if (tag === 'color' && color) {
                parsedText.push(
                    <Text key={`color_${currentIndex}`} style={{ color }}>
                        {content}
                    </Text>
                )
            } else if (tag === 'quote') {
                parsedText.push(
                    <View key={`quote_${currentIndex}`} style={style.quote}>
                        <Text style={{ color: '#fff' }}>
                            {content}
                        </Text>
                    </View>
                )
            }

            currentIndex = matches.index + fullMatch.length
        }

        const remainingText = text.substring(currentIndex)
        parsedText.push(
            <Text key={`plain_${currentIndex}`} style={{ color: '#fff' }}>
                {remainingText}
            </Text>
        )

        return parsedText
    }

    const parsedText = parseMarkup(text)

    return <Text>{parsedText}</Text>
}

export default DText
