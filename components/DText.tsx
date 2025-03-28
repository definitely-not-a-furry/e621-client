import React from 'react'
import type { ReactNode } from 'react'
import { Text, View } from 'react-native'
import SpoilerText from './SpoilerText'
import { ThemeProvider, useTheme, type Theme } from '../context/ThemeContext'

interface DTextProps {
  theme: Theme
  children: ReactNode
}

const DText = (props: DTextProps): JSX.Element => {
  const { theme, setTheme } = useTheme()
  const innerContent = props.children as string

  const parseText = (text: string): string[] => {
    const unparsed = text
    const tagRegex = /\[(\/?[a-z]+)(?:=([a-z0-9#]+))?]([\S\s]*?)\[\/\1]/
    const headerRegex = /h([1-6])\.(.+)/
    const regexes = [tagRegex, headerRegex]

    let lastIndex = 0
    const resultArray: string[] = []

    regexes.forEach(regex => {
      const matches = unparsed.match(regex)
      if (matches != null) {
        const matchIndex = unparsed.indexOf(matches[0], lastIndex)
        if (matchIndex > lastIndex) {
          const unmatched = unparsed.slice(lastIndex, matchIndex)
          resultArray.push(unmatched)
        }
        resultArray.push(matches[0])
        lastIndex = matchIndex + matches[0].length
      }
    })

    if (lastIndex < unparsed.length) {
      resultArray.push(unparsed.slice(lastIndex))
    }

    resultArray.forEach((fullMatch, index) => {
      if (tagRegex.test(fullMatch)) {
        const [_, tag, color, content] = tagRegex.exec(fullMatch)
        if (tag in tagHandlers) {
          const TagComponent = tagHandlers[tag]
          resultArray[index] = <TagComponent key={index} content={parseText(content)} color={color} />
        } else {
          resultArray[index] = fullMatch
        }
      } else if (headerRegex.test(fullMatch)) {
        const [_, fontSize, content] = headerRegex.exec(fullMatch)
        resultArray[index] = <Text key={index} style={{ fontSize: 21 - Number(fontSize) }}>{parseText(content)}</Text>
      } else {
        resultArray[index] = <Text key={index}>{fullMatch}</Text>
      }
    })

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
      <View>
        <Text style={{ color: '#fff' }}>{content}</Text>
      </View>
    )
  }

  return (
    <ThemeProvider>
      <Text style={{ color: theme.text.text }}>{parseText(innerContent)}</Text>
    </ThemeProvider>)
}

export default DText
