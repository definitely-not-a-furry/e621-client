import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import type { Theme } from '../context/ThemeContext'
import { Symbol } from './Components'

interface SortingOption {
  name: string
  options: string[]
}

const ButtonList = ({ l, hook, theme, defaultSelection }: { l: SortingOption[], hook: ({ name, option }: { name: string, option: string }) => void, theme: Theme, defaultSelection?: [number, number] }): JSX.Element => {
  const [selected, setSelected] = useState<[number, number]>(defaultSelection ?? [-1, -1])

  return (
    <View style={{ backgroundColor: theme.section, margin: 7, borderRadius: 5 }}>
      {l.map((item, columnIndex) => (
        <View key={columnIndex} style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
          <Text style={{ color: theme.text.text, alignSelf: 'center' }}>{item.name}</Text>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            {item.options.map((option, rowIndex) => (
              <TouchableOpacity
                key={rowIndex}
                style={{ backgroundColor: (selected[0] === columnIndex && selected[1] === rowIndex) ? theme.sectionLighten : theme.sectionLightenHalf, borderRadius: 5 }}
                onPress={() => {
                  setSelected([columnIndex, rowIndex])
                  hook({ name: item.name, option })
                }}
              >
                <Text style={{ color: theme.text.text, padding: 5 }}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  )
}

const PostSorting = ({ setOption }: { setOption: (a: string[]) => void }): JSX.Element => {
  const { theme } = useTheme()
  return (
    <View style={{ display: 'flex', backgroundColor: theme.sectionLighten, borderRadius: 10, padding: 10, margin: 10 }}>
    </View>
  )
}

export default PostSorting
export { ButtonList }
