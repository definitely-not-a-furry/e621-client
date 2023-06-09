import React from 'react'
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { useRouter } from 'expo-router'
import DText from '../components/DText'
import { defaultDark } from '../themes/default'

const App = () => {
    const router = useRouter()
    return (
        <SafeAreaView>
            <TouchableOpacity style={defaultDark.button} onPress={() => { router.push('/home') }}><Text>Back</Text></TouchableOpacity>
            <View style={{ height: '100%', backgroundColor: '#222' }}>
                <Text style={defaultDark.containerText}>
                    <DText style={defaultDark} text={'[quote]test quote\nline2[/quote] test comment [b]bold[/b]'}/>
                </Text>
            </View>
        </SafeAreaView>
    )
}
export default App
