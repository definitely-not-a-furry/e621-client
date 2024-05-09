import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { load, store } from '../components/AsyncStore'
import haptic from '../components/haptic'

const SettingsScreen = () => {
  const [safeMode, setSafeMode] = useState(false)
  const [maxPageLength, setMaxPageLength] = useState(25)
  const [theme, setTheme] = useState('defaultDark')
  let loaded = false
  const router = useRouter()

  useEffect(() => {
    loadSettings()
    loaded = true
  }, [])

  useEffect(() => {
    if (loaded) {
      saveSettings()
    }
  }, [safeMode, maxPageLength, theme])

  const loadSettings = async () => {
    setMaxPageLength(Number(await load('@pagelength')))
    setSafeMode(await load('@safemode'))
    setTheme(await load('@theme'))
  }

  const saveSettings = async () => {
    haptic(2)
    await store('@safemode', safeMode ? 'true' : 'false')
    await store('@pagelength', '' + maxPageLength)
    await store('@theme', theme)
  }

  return (
    <View style={{ padding: 12, backgroundColor: '#000', flexGrow: 1 }}>
      <StatusBar hidden={true} />
      <TouchableOpacity style={{ backgroundColor: '#444', padding: 7, borderRadius: 5 }} onPress={() => router.push('/home')}><Text style={{ color: '#fff' }}>Back</Text></TouchableOpacity>
      <View style={{ marginTop: 7, backgroundColor: '#444', padding: 7, borderRadius: 5 }}>
        <Text style={{ color: '#fff' }}>Safe mode</Text>
        <View>
          <TouchableOpacity
            style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555' }, (safeMode && { backgroundColor: '#666' })]}
            onPress={() => setSafeMode(true)}>
            <Text style={{ color: '#fff' }}>On</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555' }, (!safeMode && { backgroundColor: '#666' })]}
            onPress={() => setSafeMode(false)}>
            <Text style={{ color: '#fff' }}>Off</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 7, backgroundColor: '#444', padding: 7, borderRadius: 5 }}>
        <Text style={{ color: '#fff' }}>Max Page Length</Text>
        <View style={{ justifyContent: 'space-between' }}>

          <TouchableOpacity
            style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555' }, (maxPageLength === 25 && { backgroundColor: '#666' })]}
            onPress={() => setMaxPageLength(25)}>
            <Text style={{ color: '#fff' }}>25</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555' }, (maxPageLength === 50 && { backgroundColor: '#666' })]}
            onPress={() => setMaxPageLength(50)}>
            <Text style={{ color: '#fff' }}>50</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555' }, (maxPageLength === 75 && { backgroundColor: '#666' })]}
            onPress={() => setMaxPageLength(75)}>
            <Text style={{ color: '#fff' }}>75</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555' }, (maxPageLength === 100 && { backgroundColor: '#666' })]}
            onPress={() => setMaxPageLength(100)}>
            <Text style={{ color: '#fff' }}>100</Text>
          </TouchableOpacity>

        </View>
      </View>

      <View style={{ marginTop: 7, backgroundColor: '#444', padding: 7, borderRadius: 5 }}>
        <Text style={{ color: '#fff' }}>Theme</Text>
        <View>
          <TouchableOpacity
            style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555' }, (theme === 'classic' && { backgroundColor: '#666' })]}
            onPress={() => setTheme('classic')}>
            <Text style={{ color: '#fff' }}>Hexagon</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{ padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555' }, (theme === 'defaultDark' && { backgroundColor: '#666' })]}
            onPress={() => setTheme('defaultDark')}>
            <Text style={{ color: '#fff' }}>Dark</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default SettingsScreen
