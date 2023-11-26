import React from 'react'
import { Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { useRouter } from 'expo-router'
import DText from '../components/DText'
import { defaultDark } from '../themes/default'
import { StatusBar } from 'expo-status-bar'
import UserName from '../components/UserName'
import SpoilerText from '../components/SpoilerText'

const App = () => {
    const router = useRouter()
    return (
        <SafeAreaView style={{ backgroundColor: '#222', flex: 1 }}>
            <StatusBar hidden={true}/>
            <TouchableOpacity style={[defaultDark.button, { margin: 7, padding: 5 }]} onPress={() => { router.push('/home') }}><Text style={{ color: '#fff' }}>Back</Text></TouchableOpacity>
            {/* everything from here is a testing area */}
            <Text style={{ color: '#fff' }}>
                <DText style={defaultDark}>"Hello":world</DText>
            </Text>
            <UserName userData={{ name: 'Amogus', level_string: 'Admin' }}/>
            <SpoilerText>Hello!</SpoilerText>
        </SafeAreaView>
    )
}
export default App
