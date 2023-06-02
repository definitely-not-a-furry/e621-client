import React, { useState } from 'react'
import { SafeAreaView, View, Text, ImageBackground, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'
import SelectedTheme from '../themes/default'

function App () {
    const [moreExpanded, setExpanded] = useState(false)
    const router = useRouter()
    const style = SelectedTheme
    const handleMore = () => {
        setExpanded(!moreExpanded)
    }

    const buttonHaptic = (strength) => {
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
            switch (strength) {
            case 1:
                impactAsync(ImpactFeedbackStyle.Light)
                break
            case 2:
                impactAsync(ImpactFeedbackStyle.Medium)
                break
            case 3:
                impactAsync(ImpactFeedbackStyle.Heavy)
                break
            default:
                impactAsync()
            }
        }
    }

    return (
        <SafeAreaView style={styles.background}>

            <StatusBar hidden={true}></StatusBar>
            {/* <LinearGradient colors={['#000', '##1e437c']} end={{ x: 1, y: 1 }}> */}
                <ImageBackground style={styles.backgroundImage} src={'https://static1.e621.net/data/mascots/913a8fd0240b14bfbb63d6a9cfc3faf2.jpg'}>
                    <View style={{ flex: 3 }}></View>
                    <View style={[styles.blurContainer, { flex: 1 }]}>
                        <BlurView style={styles.blur} intensity={25}>
                            <View style={styles.mascotBox}>
                                <Text style={styles.title}>e621</Text>
                                <View>
                                    <TouchableOpacity style={styles.button} onPress={() => { buttonHaptic(1); router.push('/browse') }}><Text style={styles.buttonText}>Browse</Text></TouchableOpacity>
                                    {!moreExpanded &&
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity style={styles.button} onPress={() => { buttonHaptic(1); handleMore() }}><Text style={styles.buttonText}>More</Text></TouchableOpacity>
                                    </View>}
                                    {moreExpanded &&
                                    <View>
                                        <TouchableOpacity style={styles.button} onPress={() => handleMore()}><Text style={styles.buttonText}>Less</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.button} onPress={() => router.push('/testingarea')}><Text style={styles.buttonText}>debug</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.button} onPress={() => { buttonHaptic(1); router.push('/users') }}><Text style={styles.buttonText}>Users</Text></TouchableOpacity>
                                    </View>}
                                </View>
                            </View>
                        </BlurView>
                    </View>
                </ImageBackground>
            {/* </LinearGradient> */}
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
        borderRadius: 5
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
        justifyContent: 'space-around'
    },
    button: {
        backgroundColor: 'rgba(10,10,10,0.5)',
        padding: 7,
        margin: 5,
        borderRadius: 5

    },
    buttonText: {
        color: '#fff',
        paddingHorizontal: 10
    }

})

export default App
