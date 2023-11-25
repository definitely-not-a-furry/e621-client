import React, { useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, TouchableHighlight } from 'react-native'
import { useRouter } from 'expo-router'
import DText from '../components/DText'
import { defaultDark } from '../themes/default'
import SpoilerText from '../components/SpoilerText'
import { StatusBar } from 'expo-status-bar'
import { RequestHandler } from '../util/RequestHandler'

const App = () => {
    const router = useRouter()
    return (
        <SafeAreaView style={{ backgroundColor: '#222', flex: 1 }}>
            <StatusBar hidden={true}/>
            <TouchableOpacity style={[defaultDark.button, {margin: 7, padding: 5}]} onPress={() => { router.push('/home') }}><Text style={{ color: '#fff' }}>Back</Text></TouchableOpacity>
            {/* everything from here is a testing area */}
            <Text style={{color: '#fff'}}>
                <DText text={'"Amogus":ewjinefwij World'} style={defaultDark}></DText>
            </Text>
        </SafeAreaView>
    )
}
export default App
