import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { load, store } from '../components/Store'
import { ThemeProvider, useTheme } from '../context/ThemeContext'
import haptic from '../components/haptic'
import { darkTheme, hexagonTheme } from '../themes/themes'

const SettingsScreen = (): JSX.Element => {
  const { theme, setTheme } = useTheme()
  const [safeMode, setSafeMode] = useState(false)
  const [maxPageLength, setMaxPageLength] = useState(25)
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    void loadSettings()
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) {
      void saveSettings()
    }
  }, [safeMode, maxPageLength, theme])

  const loadSettings = async (): Promise<void> => {
    setMaxPageLength(Number(await load('pagelength')))
    setSafeMode(Boolean(await load('safemode')))
  }

  const saveSettings = async (): Promise<void> => {
    haptic(2)
    await store('safemode', safeMode ? 'true' : 'false')
    await store('pagelength', '' + maxPageLength)
  }

  return (
    <View style={{ display: 'flex', backgroundColor: '#fff', flex: 1, height: '100%', width: '100%', padding: 7 }}>
      <StatusBar translucent={true}/>
      <SafeAreaView style={{ flex: 1, padding: 12 }}>
        <View style={{ backgroundColor: theme.foreground, flex: 1, padding: 7, borderRadius: 5 }}>
          <StatusBar hidden={true} />
          <TouchableOpacity style={{ backgroundColor: theme.section, padding: 7, borderRadius: 5 }} onPress={() => { router.push('/home') }}><Text style={{ color: '#fff' }}>Back</Text></TouchableOpacity>
          <View style={{ marginTop: 7, backgroundColor: '#444', padding: 7, borderRadius: 5 }}>
            <Text style={{ color: '#fff' }}>Safe mode</Text>
            <View>
              <TouchableOpacity
                style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555' }, (safeMode && { backgroundColor: '#666' })]}
                onPress={() => { setSafeMode(true) }}>
                <Text style={{ color: '#fff' }}>On</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555' }, (!safeMode && { backgroundColor: '#666' })]}
                onPress={() => { setSafeMode(false) }}>
                <Text style={{ color: '#fff' }}>Off</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 7, backgroundColor: '#444', padding: 7, borderRadius: 5 }}>
            <Text style={{ color: '#fff' }}>Max Page Length</Text>
            <View style={{ justifyContent: 'space-between' }}>

              <TouchableOpacity
                style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555' }, (maxPageLength === 25 && { backgroundColor: '#666' })]}
                onPress={() => { setMaxPageLength(25) }}>
                <Text style={{ color: '#fff' }}>25</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555' }, (maxPageLength === 50 && { backgroundColor: '#666' })]}
                onPress={() => { setMaxPageLength(50) }}>
                <Text style={{ color: '#fff' }}>50</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555' }, (maxPageLength === 75 && { backgroundColor: '#666' })]}
                onPress={() => { setMaxPageLength(75) }}>
                <Text style={{ color: '#fff' }}>75</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555' }, (maxPageLength === 100 && { backgroundColor: '#666' })]}
                onPress={() => { setMaxPageLength(100) }}>
                <Text style={{ color: '#fff' }}>100</Text>
              </TouchableOpacity>

            </View>
          </View>

          <View style={{ marginTop: 7, backgroundColor: '#444', padding: 7, borderRadius: 5 }}>
            <Text style={{ color: '#fff' }}>Theme</Text>
            <View>
              <TouchableOpacity
                style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555' }, (theme === hexagonTheme && { backgroundColor: '#666' })]}
                onPress={() => { setTheme('hexagon') }}>
                <Text style={{ color: '#fff' }}>Hexagon</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555' }, (theme === darkTheme && { backgroundColor: '#666' })]}
                onPress={() => { setTheme('dark') }}>
                <Text style={{ color: '#fff' }}>Dark</Text>
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
