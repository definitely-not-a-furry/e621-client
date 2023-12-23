import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import SpoilerText from './SpoilerText'

// const DText = (content) => {
//     const style = content.style

//     const parseMarkup = (text) => {
//         const regex = /\[(\/?[a-z]+)(?:=([a-z0-9#]+))?]([\S\s]*?)\[\/\1]/g
//         const headerRegex = /h([1-6])\.(.*)/g
//         let matches
//         let headerMatches
//         const parsedText = []
//         let currentIndex = 0

//         while ((matches = regex.exec(text)) !== null || (headerMatches = headerRegex.exec(text)) !== null) {
//             const [fullMatch, tag, color, innerContent] = ( matches ? matches : [null, null, null, null] )
//             if (matches) {
//                 var plainText = text.substring(currentIndex, matches.index)
//             }
//             const [headerMatch, size, headerContent] = ( headerMatches ? headerMatches : [null, null, null, null] )

//             parsedText.push(
//                 <Text key={`plain_${currentIndex}`} style={{ color: '#fff' }}>
//                     {plainText}
//                 </Text>
//             )

//             if (tagHandlers[tag]) {
//                 const TagComponent = tagHandlers[tag]
//                 const recursed = parseMarkup(innerContent) // Recursive call for nested content
//                 parsedText.push(
//                     <TagComponent key={`${tag}_${currentIndex}`} color={color} content={recursed}/>
//                 )
//             }

//             if (headerMatch) {
//                 const fontSize = 12 - size
//                 parsedText.push(
//                     <Text key={`header_${size}_${currentIndex}`} style={{ fontSize, color: '#fff' }}>{headerContent}</Text>
//                 )
//             }
//             if (matches) {
//                 currentIndex = matches.index + fullMatch.length
//             } else if (headerMatches) {
//                 currentIndex = headerMatches.index + headerMatch.length
//             }
//         }

//         const remainingText = text.substring(currentIndex)
//         parsedText.push(
//             <Text key={`plain_${currentIndex}`} style={{ color: '#fff' }}>
//                 {remainingText}
//             </Text>
//         )
//         return parsedText
//     }

//     const tagHandlers = {
//         b: ({ content }) => <Text style={{ fontWeight: 'bold' }}>{content}</Text>,
//         s: ({ content }) => <Text style={{ textDecorationLine: 'line-through' }}>{content}</Text>,
//         u: ({ content }) => <Text style={{ textDecorationLine: 'underline' }}>{content}</Text>,
//         i: ({ content }) => <Text style={{ fontStyle: 'italic' }}>{content}</Text>,
//         sup: ({ content }) => <Text style={{ fontSize: 10, lineHeight: 10 }}>{content}</Text>,
//         sub: ({ content }) => <Text style={{ fontSize: 10, lineHeight: 10 }}>{content}</Text>,
//         spoiler: ({ content }) => (
//             <SpoilerText>
//                 <Text style={{ color: '#fff' }}>{content}</Text>
//             </SpoilerText>
//         ),
//         color: ({ content, color }) => <Text style={{ color }}>{content}</Text>,
//         quote: ({ content }) => (
//             <View style={style.quote}>
//                 <Text style={{ color: '#fff' }}>{content}</Text>
//             </View>
//         )
//     }

//     const text = content.children.replace(/"(\S*)":(\S*)/g, '$1')
//     const parsedText = parseMarkup(text)

//     return <Text>{parsedText}</Text>
// }

const DText = (props) => {
    const style = props.style
    const innerContent = props.children

    const parseText = (text) => {
        const unparsed = text
        const tagRegex = /\[(\/?[a-z]+)(?:=([a-z0-9#]+))?]([\S\s]*?)\[\/\1]/g
        const headerRegex = /h([1-6])\.(.*)/g
        const regexes = [tagRegex, headerRegex]

        let lastIndex = 0
        const resultArray = []

        regexes.forEach(regex => {
            const matches = unparsed.match(regex)
            if (matches) {
                const matchIndex = unparsed.indexOf(matches[0], lastIndex)
                if (matchIndex > lastIndex) {
                    const unmatched = unparsed.slice(lastIndex, matchIndex)
                    resultArray.push(unmatched)
                }
                resultArray.push(matches[0])
                lastIndex = matchIndex + matches[0].length
            }
        })
        // Include any remaining unmatched portion at the end of the string
        if (lastIndex < unparsed.length) {
            resultArray.push(unparsed.slice(lastIndex))
        }

        resultArray.forEach((fullMatch, index) => {
            if (tagRegex.test(fullMatch)) {
                console.log(tagRegex.exec(fullMatch))
                const [_, tag, color, content] = tagRegex.exec(fullMatch)
                console.log([_, tag, color, content])
                if (tag in tagHandlers) {
                    const TagComponent = tagHandlers[tag]
                    resultArray[index] = <TagComponent key={index} content={content} color={color} />
                } else {
                    resultArray[index] = fullMatch
                }
            } else if (headerRegex.test(fullMatch)) {
                console.log(headerRegex.exec(fullMatch))
                const [_, fontSize, content] = headerRegex.exec(fullMatch)
                resultArray[index] = <Text key={index} style={{ fontSize: 21 - Number(fontSize) }}>{content}</Text>
            } else {
                resultArray[index] = <Text key={index}>{fullMatch}</Text>
            }
        })

        console.log(resultArray)
        return resultArray
    }

    const tagHandlers = {
        b: ({ content }) => <Text style={{ fontWeight: 'bold' }}>{content}</Text>,
        s: ({ content }) => <Text style={{ textDecorationLine: 'line-through' }}>{content}</Text>,
        u: ({ content }) => <Text style={{ textDecorationLine: 'underline' }}>{content}</Text>,
        i: ({ content }) => <Text style={{ fontStyle: 'italic' }}>{content}</Text>,
        sup: ({ content }) => <Text style={{ fontSize: 10, lineHeight: 10 }}>{content}</Text>,
        sub: ({ content }) => <Text style={{ fontSize: 10, lineHeight: 10 }}>{content}</Text>,
        spoiler: ({ content }) => (
            <SpoilerText>
                <Text style={{ color: '#fff' }}>{content}</Text>
            </SpoilerText>
        ),
        color: ({ content, color }) => <Text style={{ color }}>{content}</Text>,
        quote: ({ content }) => (
            <View style={style.quote}>
                <Text style={{ color: '#fff' }}>{content}</Text>
            </View>
        )
    }

    return (parseText(innerContent))
}

export default DText
