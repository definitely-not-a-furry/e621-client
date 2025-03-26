import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, Button } from 'react-native'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'
import { defaultDark } from '../themes/default'
import { StatusBar } from 'expo-status-bar'

import FileManager from '../util/FileManager'

const App = () => {
  const router = useRouter()
  const [uri, setUri] = useState('')
  const fileManager = new FileManager()

  useEffect(() => {
    fileManager.downloadAndStoreFile('https://picsum.photos/seed/696/3000/2000.jpg', 'test.jpg').then((imageUri) => {
      setUri(imageUri)
    })
  },
  [])

  return (
    <SafeAreaView style={{ backgroundColor: '#222', display: 'flex', flex: 1 }}>
      <StatusBar hidden={true} />
      <TouchableOpacity style={[defaultDark.button, { margin: 7, padding: 5 }]} onPress={() => { router.push('/home') }}><Text style={{ color: '#fff' }}>Back</Text></TouchableOpacity>
      {/* everything from here is a testing area */}
      <View style={{ margin: 7, flex: 1 }}>
        <Text style={{ color: '#fff' }}>Testing Area</Text>
        { uri && <Image source={{uri}} style={{flex: 1, backgroundColor:'#000'}}></Image> }
      </View>
    </SafeAreaView>
  )
}

export default App
