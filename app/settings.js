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

const SettingsScreen = () => {
    const [safeMode, setSafeMode] = useState(false)
    const [maxPageLength, setMaxPageLength] = useState('')
    const [theme, setTheme] = useState('defaultDark')
    const router = useRouter()

    // Load settings from AsyncStorage on component mount
    useEffect(() => {
        loadSettings()
    }, [])

    // Load settings from AsyncStorage
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

    // Save settings to AsyncStorage
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
        <View style = { styles.container }>
            <RootSiblingParent>
                <TouchableOpacity onPress={() => router.push('/home')}><Text>Back</Text></TouchableOpacity>
                <Text style = { styles.label }>Safe Mode</Text>
                <Switch value = { safeMode } onValueChange = {(value) => setSafeMode(value)}/>

                <Text style={styles.label}>Max Page Length</Text>
                <TextInput style={styles.input} value={maxPageLength} onChangeText={(value) => setMaxPageLength(value)} keyboardType="numeric"/>

                <Text style={styles.label}>Theme</Text>
                <Picker style={styles.picker} selectedValue={theme} onValueChange = {(value) => setTheme(value)}>
                    <Picker.Item label = "Dark (default)" value = "defaultDark" />
                    <Picker.Item label = "Classic" value = "classic" />
                </Picker>
                <TouchableOpacity onPress={() => { saveSettings(); Toast.show('Saved!') }}><Text>Save</Text></TouchableOpacity>
            </RootSiblingParent>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8
    },
    picker: {
        marginBottom: 16
    }
})

export default SettingsScreen
