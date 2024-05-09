import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PropTypes from 'prop-types'

const SignInModal = ({ visible, onClose }) => {
    SignInModal.propTypes = {
        visible: PropTypes.bool,
        onClose: PropTypes.func
    }
    const [username, setUsername] = useState('')
    const [apiKey, setApiKey] = useState('')

    const handleLogin = async () => {
        try {
            await AsyncStorage.setItem('username', username)
            await AsyncStorage.setItem('apiKey', apiKey)
            onClose()
        } catch (error) {
            console.error('Error saving credentials:', error)
        }
    }

    const cancel = async () => {
        try {
            await AsyncStorage.setItem('username', '')
            await AsyncStorage.setItem('apiKey', '')
            onClose()
        } catch (error) {
            console.error('Error saving credentials:', error)
        }
    }

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <BlurView style={[styles.container, { color: '#fff' }]} intensity={20}>
                <View style={[{ width: '80%', padding: 12, borderRadius: 5, backgroundColor: 'rgba(0,0,0,0.4)' }]}>
                    <Text style={styles.title}>Sign in</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="API Key"
                        value={apiKey}
                        onChangeText={setApiKey}
                    />
                    <TouchableOpacity style={{ padding: 10, borderRadius: 5, backgroundColor: 'rgba(0,0,0,0.2)' }} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ pdding: 10, marginTop: 12 }} onPress={() => { cancel() }}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </BlurView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    popup: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%'
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10
    },
    input: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    }
})

export default SignInModal
