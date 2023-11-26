import React from 'react'
import { Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { useRouter } from 'expo-router'
import { defaultDark } from '../themes/default'
import { StatusBar } from 'expo-status-bar'

const App = () => {
    const router = useRouter()
    return (
        <SafeAreaView style={{ backgroundColor: '#222', flex: 1 }}>
            <StatusBar hidden={true}/>
            <TouchableOpacity style={[defaultDark.button, { margin: 7, padding: 5 }]} onPress={() => { router.push('/home') }}><Text style={{ color: '#fff' }}>Back</Text></TouchableOpacity>
            {/* everything from here is a testing area */}
        </SafeAreaView>
    )
}
export default App
