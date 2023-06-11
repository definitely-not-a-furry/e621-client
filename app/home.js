import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import { defaultDark, classic } from '../themes/default'
import AsyncStorage from '@react-native-async-storage/async-storage'
import haptic from '../components/haptic'

function App () {
    const router = useRouter()
    const [style, setStyle] = useState()

    async function setTheme () {
        setStyle(await getTheme())
    }

    const getTheme = async () => {
        try {
            const theme = await AsyncStorage.getItem('@theme')
            switch (theme) {
            case 'defaultDark':
                return defaultDark
            case 'classic':
                return classic
            default:
                return defaultDark
            }
        } catch (e) {
            console.log(e)
            return defaultDark
        }
    }

    useEffect(() => {
        setTheme()
    }, [])

    if (!style) {
        return (<View style={{ height: '100%', width: '100%', backgroundColor: '#000' }}></View>)
    }

    return (
        <SafeAreaView style={styles.background}>
            <StatusBar hidden={true}></StatusBar>
            <LinearGradient style={{ height: '100%', width: '100%' }} colors={['#000', '##1e437c']} end={{ x: 1, y: 1 }}>
                <ImageBackground style={styles.backgroundImage} src={'https://static1.e621.net/data/mascots/913a8fd0240b14bfbb63d6a9cfc3faf2.jpg'}>
                    <View style={{ flexGrow: 4 }}></View>
                    <View style={[styles.blurContainer, { flex: 1 }]}>
                        <BlurView style={styles.blur} intensity={25}>
                            <View style={styles.mascotBox}>
                                <Text style={styles.title}>e621</Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={style.transparent.button} onPress={() => { haptic(1); router.push('/browse') }}><Text style={styles.buttonText}>Browse</Text></TouchableOpacity>
                                    <TouchableOpacity style={style.transparent.button} onPress={() => { haptic(1); router.push('/testingarea') }}><Text style={styles.buttonText}>debug</Text></TouchableOpacity>
                                    <TouchableOpacity style={style.transparent.button} onPress={() => { haptic(1); router.push('/users') }}><Text style={styles.buttonText}>Users</Text></TouchableOpacity>
                                    <TouchableOpacity style={style.transparent.button} onPress={() => { haptic(1); router.push('/settings') }}><Text style={styles.buttonText}>Settings</Text></TouchableOpacity>
                                </View>
                            </View>
                        </BlurView>
                    </View>
                </ImageBackground>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    blur: {
        borderRadius: 5,
        padding: 5,
        flexGrow: 1
    },
    blurContainer: {
        overflow: 'hidden',
        borderRadius: 5,
        flexGrow: 1,
        alignSelf: 'stretch',
        margin: 10
    },
    title: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'Verdana'
    },
    mascotBox: {
        borderRadius: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        verticalAlign: 'middle',
        flexWrap: 'wrap'
    },
    button: {
        backgroundColor: 'rgba(10,10,10,0.5)',
        padding: 7,
        margin: 5,
        width: '40%',
        alignContent: 'center',
        borderRadius: 5

    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        paddingHorizontal: 10
    }

})

export default App
