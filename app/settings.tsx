import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { load, store } from '../components/Store'
import { ThemeProvider, useTheme } from '../context/ThemeContext'
import haptic from '../components/haptic'
import { darkTheme, hexagonTheme } from '../themes/themes'

const SettingsScreen = (): JSX.Element => {
  const { theme, setTheme } = useTheme()
  const [domain, setDomain] = useState<string>('e926.net')
  const [maxPageLength, setMaxPageLength] = useState<number>(25)
  const [loaded, setLoaded] = useState<boolean>(false)
  const router = useRouter()

  const [text, setText] = useState<string>('')

  useEffect(() => {
    void loadSettings()
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) {
      void saveSettings()
    }
  }, [domain, maxPageLength, theme])

  const loadSettings = async (): Promise<void> => {
    setMaxPageLength(Number(await load('pagelength')))
    setDomain((await load('domain')) ?? 'e926.net')
  }

  const saveSettings = async (): Promise<void> => {
    haptic(2)
    await store('domain', domain)
    await store('pagelength', '' + maxPageLength)
  }

  return (
    <View style={{ display: 'flex', backgroundColor: theme.background, flex: 1, height: '100%', width: '100%', padding: 7 }}>
      <StatusBar translucent={true}/>
      <SafeAreaView style={{ flex: 1, padding: 12 }}>
        <View style={{ backgroundColor: theme.foreground, flex: 1, padding: 7, borderRadius: 5 }}>
          <StatusBar hidden={true} />
          <TouchableOpacity style={{ backgroundColor: theme.section, padding: 7, borderRadius: 5 }} onPress={() => { router.push('/home') }}><Text style={{ color: theme.text.text }}>Back</Text></TouchableOpacity>
          <View style={{ marginTop: 7, backgroundColor: theme.section, padding: 7, borderRadius: 5 }}>
            <Text style={{ color: theme.text.text }}>Domain</Text>
            <View>
              <TouchableOpacity
                style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: theme.sectionLightenHalf }, (domain === 'e926.net' && { backgroundColor: theme.sectionLighten })]}
                onPress={() => { setDomain('e926.net') }}>
                <Text style={{ color: theme.text.text }}>e926.net</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: theme.sectionLightenHalf }, (domain === 'e621.net' && { backgroundColor: theme.sectionLighten })]}
                onPress={() => { setDomain('e621.net') }}>
                <Text style={{ color: theme.text.text }}>e621.net</Text>
              </TouchableOpacity>
              <View>
                <Text style={{ color: theme.text.text, padding: 5, margin: 2 }}>Custom: </Text>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <TextInput
                    style={{ color: theme.text.text, padding: 5, borderRadius: 5, margin: 2, backgroundColor: theme.sectionLightenHalf, flexGrow: 1 }}
                    onChangeText={(currenttext) => { setText(currenttext); console.log(currenttext) }}
                    value={domain}
                  />
                  <TouchableOpacity style={{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: theme.sectionLightenHalf }} onPress={() => { setDomain(text); void saveSettings() }}><Text style={{ color: theme.text.text }}>Apply</Text></TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 7, backgroundColor: theme.section, padding: 7, borderRadius: 5 }}>
            <Text style={{ color: theme.text.text }}>Max Page Length</Text>
            <View style={{ justifyContent: 'space-between' }}>

              <TouchableOpacity
                style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: theme.sectionLightenHalf }, (maxPageLength === 25 && { backgroundColor: theme.sectionLighten })]}
                onPress={() => { setMaxPageLength(25) }}>
                <Text style={{ color: theme.text.text }}>25</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: theme.sectionLightenHalf }, (maxPageLength === 50 && { backgroundColor: theme.sectionLighten })]}
                onPress={() => { setMaxPageLength(50) }}>
                <Text style={{ color: theme.text.text }}>50</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: theme.sectionLightenHalf }, (maxPageLength === 75 && { backgroundColor: theme.sectionLighten })]}
                onPress={() => { setMaxPageLength(75) }}>
                <Text style={{ color: theme.text.text }}>75</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: theme.sectionLightenHalf }, (maxPageLength === 100 && { backgroundColor: theme.sectionLighten })]}
                onPress={() => { setMaxPageLength(100) }}>
                <Text style={{ color: theme.text.text }}>100</Text>
              </TouchableOpacity>

            </View>
          </View>

          <View style={{ marginTop: 7, backgroundColor: theme.section, padding: 7, borderRadius: 5 }}>
            <Text style={{ color: theme.text.text }}>Theme</Text>
            <View>
              <TouchableOpacity
                style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: theme.sectionLightenHalf }, (theme === hexagonTheme && { backgroundColor: theme.sectionLighten })]}
                onPress={() => { setTheme('hexagon') }}>
                <Text style={{ color: theme.text.text }}>Hexagon</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: theme.sectionLightenHalf }, (theme === darkTheme && { backgroundColor: theme.sectionLighten })]}
                onPress={() => { setTheme('dark') }}>
                <Text style={{ color: theme.text.text }}>Dark</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

const App = (): JSX.Element => {
  return (
    <ThemeProvider>
      <SettingsScreen />
    </ThemeProvider>
  )
}

export default App
