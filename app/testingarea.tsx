import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Symbol } from '../components/Components'

const App = (): JSX.Element => {
  const router = useRouter()

  useEffect(() => {
  },
  [])

  return (
    <SafeAreaView style={{ backgroundColor: '#222', display: 'flex', flex: 1 }}>
      <StatusBar hidden={true} />
      <TouchableOpacity style={{ margin: 7, padding: 5, borderRadius: 5 }} onPress={() => { router.push('/home') }}><Text style={{ color: '#fff' }}>Back</Text></TouchableOpacity>
      {/* everything from here is a testing area */}
      <View style={{ margin: 7, flex: 1 }}>
        <Text style={{ color: '#fff' }}>Testing Area</Text>
        <Symbol name='2h' size={35} />
        <Text style={{ color: '#fff' }}>amogus
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default App
