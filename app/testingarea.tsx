import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Symbol } from '../components/Components'
import { ButtonList } from '../components/Sorting'
import { ThemeProvider, useTheme } from '../context/ThemeContext'
import Skeleton from '../components/Skeleton'
import { Browser, SearchBar } from '../layouts/ItemBrowser'

const Test = (): JSX.Element => {
  const { theme } = useTheme()
  const router = useRouter()
  const [option, setOption] = useState<{ name: string, option: string }>({ name: '', option: '' })
  useEffect(() => {
  },
  [])

  const onSubmit = (e): void => {
    console.log('value:', e)
  }

  const item = (key: number, item): JSX.Element => {
    return (
      <TouchableOpacity key={String(key)} style={{ padding: 10, backgroundColor: theme.sectionLighten, borderRadius: 5, marginVertical: 5 }}>
        <Text style={{ color: theme.text.general }}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  const loadingItem = (key: number, item): JSX.Element => {
    return (
      <TouchableOpacity key={String(key)} style={{ flex: 1, padding: 10, backgroundColor: theme.sectionLightenHalf, borderRadius: 5, margin: 5, gap: 5 }}>
        <Skeleton width={'100%'} height={150} />
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme.sectionLighten, padding: 5, borderRadius: 5 }}>
          <Skeleton width={'30%'} height={20} />
          <Skeleton width={'30%'} height={20} />
          <Skeleton width={'30%'} height={20} />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, display: 'flex', flex: 1 }}>
      <StatusBar hidden={true} />
      <TouchableOpacity style={{ margin: 7, padding: 5, borderRadius: 5 }} onPress={() => { router.push('/home') }}><Text style={{ color: '#fff' }}>Back</Text></TouchableOpacity>
      {/* everything from here is a testing area */}
      <Browser itemLayout={item} loadingLayout={loadingItem} columnCount={2} />
    </SafeAreaView>
  )
}

const App = (): JSX.Element => {
  return (
    <ThemeProvider>
      <Test />
    </ThemeProvider>
  )
}

export default App
