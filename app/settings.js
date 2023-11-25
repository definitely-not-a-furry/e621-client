import React, {
    useState,
    useEffect
} from 'react'
import {
    View,
    Text,
    Switch,
    TextInput,
    StyleSheet
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Toast from 'react-native-root-toast'
import { RootSiblingParent } from 'react-native-root-siblings'
import { useRouter } from 'expo-router'
import { Picker } from '@react-native-picker/picker'
import RNPickerSelect from 'react-native-picker-select'
import { StatusBar } from "expo-status-bar";

const SettingsScreen = () => {
    const [safeMode, setSafeMode] = useState(false)
    const [maxPageLength, setMaxPageLength] = useState('')
    const [textSelected, setTextSelected] = useState(false)
    const [theme, setTheme] = useState('defaultDark')
    const router = useRouter()


    useEffect(() => {
        loadSettings()
    }, [])

    useEffect(()=> {
        saveSettings()
    }, [safeMode, maxPageLength, theme])
    const loadSettings = async () => {
        try {
            const settings = await AsyncStorage.getItem('@settings')
            setTheme(await AsyncStorage.getItem('@theme'))
            if (settings) {
                const parsedSettings = JSON.parse(settings)
                setSafeMode(parsedSettings.safeMode)
                setMaxPageLength(parsedSettings.maxPageLength)
            }
        } catch (error) {
            console.log('Error loading settings:', error)
        }
    }
    const saveSettings = async () => {
        try {
            const settings = {
                safeMode,
                maxPageLength
            }
            await AsyncStorage.setItem('@settings', JSON.stringify(settings))
            await AsyncStorage.setItem('@theme', theme)
            console.log('Settings saved successfully!')
        } catch (error) {
            console.log('Error saving settings:', error)
        }
    }

    return (
        <View style={{padding: 12, backgroundColor: '#000', flexGrow: 1}}>
            <StatusBar hidden={true}/>
            <TouchableOpacity style={{backgroundColor: '#444', padding: 7, borderRadius: 5}} onPress={() => router.push('/home')}><Text style={{color: '#fff'}}>Back</Text></TouchableOpacity>
            <View style={{marginTop: 7, backgroundColor: '#444', padding: 7, borderRadius: 5}}>
                <Text style={{color: '#fff'}}>Safe mode</Text>
                <View>
                    <TouchableOpacity
                        style={[{padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555'}, (safeMode && {backgroundColor: '#666'})]}
                        onPress={() => setSafeMode(true)}>
                        <Text style={{color: '#fff'}}>On</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[{padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555'}, (!safeMode && {backgroundColor: '#666'})]}
                        onPress={() => setSafeMode(false)}>
                        <Text style={{color: '#fff'}}>Off</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{marginTop: 7, backgroundColor: '#444', padding: 7, borderRadius: 5}}>
                <Text style={{color: '#fff'}}>Max Page Length</Text>
                <View style={{ justifyContent: 'space-between'}}>

                    <TouchableOpacity
                        style={[{padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555'}, (maxPageLength == 25 && {backgroundColor: '#666'})]}
                        onPress={() => setMaxPageLength(25)}>
                        <Text style={{color: '#fff'}}>25</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[{padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555'}, (maxPageLength == 50 && {backgroundColor: '#666'})]}
                        onPress={() => setMaxPageLength(50)}>
                        <Text style={{color: '#fff'}}>50</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[{padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555'}, (maxPageLength == 75 && {backgroundColor: '#666'})]}
                        onPress={() => setMaxPageLength(75)}>
                        <Text style={{color: '#fff'}}>75</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[{padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555'}, (maxPageLength == 100 && {backgroundColor: '#666'})]}
                        onPress={() => setMaxPageLength(100)}>
                        <Text style={{color: '#fff'}}>100</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={{marginTop: 7, backgroundColor: '#444', padding: 7, borderRadius: 5}}>
                <Text style={{color: '#fff'}}>Theme</Text>
                <View>
                    <TouchableOpacity
                        style={[{padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555'}, (theme == 'classic' && {backgroundColor: '#666'})]}
                        onPress={() => setTheme('classic')}>
                        <Text style={{color: '#fff'}}>Hexagon</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[{padding: 5, borderRadius: 5, margin: 2, backgroundColor: '#555'}, (theme == 'defaultdark' && {backgroundColor: '#666'})]}
                        onPress={() => setTheme('defaultdark')}>
                        <Text style={{color: '#fff'}}>Dark</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default SettingsScreen
