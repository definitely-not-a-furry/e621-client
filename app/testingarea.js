import React, { useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { useRouter } from 'expo-router'
import { defaultDark } from '../themes/default'
import { StatusBar } from 'expo-status-bar'
import DText from '../components/DText'

const App = () => {
    const router = useRouter()
    return (
        <SafeAreaView style={{ backgroundColor: '#222', flex: 1 }}>
            <StatusBar hidden={true}/>
            <TouchableOpacity style={[defaultDark.button, { margin: 7, padding: 5 }]} onPress={() => { router.push('/home') }}><Text style={{ color: '#fff' }}>Back</Text></TouchableOpacity>
            {/* everything from here is a testing area */}
            <View style={{ margin: 7 }}>
            </View>
        </SafeAreaView>
    )
}

export default App
