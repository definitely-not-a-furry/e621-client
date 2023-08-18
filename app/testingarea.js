import React, { useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, TouchableHighlight, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import DText from '../components/DText'
import { defaultDark } from '../themes/default'
import SpoilerText from '../components/SpoilerText'
import { StatusBar } from 'expo-status-bar'

const App = () => {
    const router = useRouter()

    return (
        <SafeAreaView style={{ backgroundColor: '#222', flex: 1 }}>
            <StatusBar hidden={true}/>
            <TouchableOpacity style={defaultDark.button} onPress={() => { router.push('/home') }}><Text style={{ color: '#fff' }}>Back</Text></TouchableOpacity>
            {/* everything from here is a testing area */}
            <SpoilerText>hello spoiler!</SpoilerText>
        </SafeAreaView>
    )
}
export default App
