import React, { useRef } from 'react'
import type { JSX } from 'react'
import type { DimensionValue } from 'react-native'
import { View, TextInput, TouchableOpacity, FlatList } from 'react-native'
import { useRouter } from 'expo-router'
import { SymbolView } from 'expo-symbols'
import { ThemeProvider, useTheme } from '../context/ThemeContext'
import Skeleton from '../components/Skeleton'

const SearchBar = ({ text, onChange, onChangeText, onSubmit, onFocus, onBlur, placeHolder, backLocation }:
{ text?: string
  onChange?: ((value: string) => void)
  onChangeText?: ((value: string) => void)
  onSubmit?: ((value: string) => void)
  onFocus?: () => void
  onBlur?: () => void
  placeHolder?: string
  backLocation: string
}): JSX.Element => {
  const { theme } = useTheme()
  const router = useRouter()

  const textInputRef = useRef<TextInput>(null)

  const submitInput = (value: string): void => {
    if (onSubmit !== undefined) {
      onSubmit(value)
    }
    if (textInputRef.current !== null) {
      textInputRef.current.blur()
    }
  }

  return (
    <View style={{ flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center', backgroundColor: theme.foreground, justifyContent: 'center' }}>
      <View>
        <TouchableOpacity style={{ paddingVertical: 13, paddingHorizontal: 10 }} onPress={() => { router.push(backLocation) }}>
          <SymbolView resizeMode='scaleAspectFit' size={17} tintColor={'#fff'} weight='semibold' type='monochrome' name='chevron.backward'/>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, marginVertical: 5 }}>
        <TextInput
          ref={textInputRef}
          style={{ color: theme.text.text, borderColor: theme.sectionLighten, flex: 1, height: 'auto', borderWidth: 2, borderRadius: 5, width: '100%', marginHorizontal: 2, padding: 2, paddingLeft: 10 }}
          placeholder={placeHolder ?? ''}
          placeholderTextColor={theme.text.general}
          value={text}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          onSubmitEditing={(e) => {
            submitInput(e.nativeEvent.text)
          }}
        />
      </View>
      <View>
        <TouchableOpacity style={{ paddingVertical: 10, paddingHorizontal: 10 }} onPress={() => { submitInput(text ?? '') }}>
          <SymbolView resizeMode='scaleAspectFit' size={20} tintColor={'#fff'} weight='semibold' type='monochrome' name='magnifyingglass'/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

interface BrowseProps<T> {
  itemLayout: (key: number, item: T) => JSX.Element
  loadingLayout: (key: number, item) => JSX.Element
  data?: T[] | null
  columnCount?: number
}
const Browser = <T extends object>({ itemLayout, loadingLayout, data, columnCount }: BrowseProps<T>): JSX.Element => {
  const { theme } = useTheme()

  if (columnCount === undefined) {
    columnCount = 1
  }

  if (data !== undefined) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background, padding: 5 }}>
        <FlatList
          key={`browser-${columnCount}`}
          style={{ flex: 1 }}
          data={data}
          renderItem={(item) => { return itemLayout(item.index, item.item) }}
          numColumns={columnCount ?? 1}
        />
      </View>
    )
  } else {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          key={`loading-${columnCount}`}
          data={Array.from({ length: 10 * (columnCount ?? 1) })} // Placeholder for loading state
          numColumns={columnCount ?? 1}
          renderItem={(item) => { return loadingLayout(item.index, item.item) }}
        />
      </View>
    )
  }
}

export { SearchBar, Browser }
