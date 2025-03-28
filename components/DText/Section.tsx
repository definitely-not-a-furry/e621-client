import React, { ReactNode, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Theme, useTheme } from '../../context/ThemeContext'

interface SectionProps {
  children: ReactNode
  theme: Theme
  title: string
}

const SectionMain = (props: SectionProps) => {
  const [opened, setOpen] = useState(true)
  const children = props.children
  const theme = props.theme
  const title = props.title

  return (
    <View style={{ backgroundColor: theme.sectionLighten, flex: 1, padding: 5 }}>
      <TouchableOpacity><Text></Text></TouchableOpacity>
      {opened &&
        <View>
        </View>
      }
    </View>
  )
}

const Section = (props)

export default Section