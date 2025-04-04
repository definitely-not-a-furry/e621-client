import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Symbol } from '../components/Components'
import { ButtonList } from '../components/Sorting'
import { ThemeProvider, useTheme } from '../context/ThemeContext'

const Test = (): JSX.Element => {
  const { theme } = useTheme()
  const router = useRouter()
  const [option, setOption] = useState<{ name: string, option: string }>({ name: '', option: '' })
  useEffect(() => {
  },
  [])

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, display: 'flex', flex: 1 }}>
      <StatusBar hidden={true} />
      <TouchableOpacity style={{ margin: 7, padding: 5, borderRadius: 5 }} onPress={() => { router.push('/home') }}><Text style={{ color: '#fff' }}>Back</Text></TouchableOpacity>
      {/* everything from here is a testing area */}
      <View style={{ margin: 7, flex: 1, backgroundColor: theme.foreground }}>
        <ButtonList l={[{ name: 'hello', options: ['asc', 'dsc'] }, { name: 'hello2', options: ['asc', 'dsc'] }]} hook={setOption} theme={theme} defaultSelection={[0, 0]} />
        <Text>{option.name + '_' + option.option}</Text>
      </View>
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
