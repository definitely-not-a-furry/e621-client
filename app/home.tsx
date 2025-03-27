import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { BlurView } from 'expo-blur'
import { router } from 'expo-router'
import { defaultDark, classic } from '../themes/default'
import AsyncStorage from '@react-native-async-storage/async-storage'
import haptic from '../components/haptic'
import SignInModal from '../components/SignIn'
import { SymbolView } from 'expo-symbols'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { setBackgroundColorAsync } from 'expo-system-ui'

const App = (): JSX.Element => {
  const [style, setStyle] = useState<StyleSheet.NamedStyles<any>>()
  const [loginvisible, setLoginvisible] = useState(false)

  const setTheme = async (): Promise<void> => {
    setStyle(await getTheme())
  }

  const getTheme = async (): Promise<StyleSheet.NamedStyles<any>> => {
    try {
      const theme = await AsyncStorage.getItem('theme')
      switch (theme) {
        case 'defaultDark':
          setBackgroundColorAsync('#000')
          return defaultDark
        case 'classic':
          setBackgroundColorAsync('#020f23')
          return classic
        default:
          setBackgroundColorAsync('#000')
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
    return (<View style={{ flex: 1, backgroundColor: '#000' }}></View>)
  }

  return (
    <SafeAreaProvider>
      <View style={{ backgroundColor: '#10b730', flex: 1 }}>
        <SafeAreaView style={styles.background}>
          <StatusBar hidden={true}></StatusBar>
          <ImageBackground style={styles.backgroundImage} source={{ uri: 'https://static1.e926.net/data/mascots/913a8fd0240b14bfbb63d6a9cfc3faf2.jpg' }}>
            <SignInModal visible={loginvisible} onClose={() => { setLoginvisible(false) }} />
            <View style={[styles.blurContainer, { flex: 1 }]}>
              <BlurView style={[styles.blur, { flexDirection: 'row' }]} intensity={25}>
                <TouchableOpacity style={[style.transparent.button, { alignSelf: 'flex-start' }]} onPress={() => { setLoginvisible(true) }}><SymbolView resizeMode='scaleAspectFit' size={15} tintColor={'#fff'} weight='semibold' type='monochrome' name='person.crop.circle.fill'></SymbolView></TouchableOpacity>
                <TouchableOpacity style={[style.transparent.button, { alignSelf: 'flex-start' }]} onPress={() => { haptic(1); router.push('/settings') }}><SymbolView resizeMode='scaleAspectFit' size={15} tintColor={'#fff'} weight='semibold' type='monochrome' name='gear'></SymbolView></TouchableOpacity>
              </BlurView>
            </View>
            <View style={{ flexGrow: 9 }}></View>
            <View style={[styles.blurContainer, { flexGrow: 1 }]}>
              <BlurView style={styles.blur} intensity={25}>
                <View style={styles.mascotBox}>
                  <Text style={styles.title}>e621</Text>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={style.transparent.button} onPress={() => { haptic(1); router.push('/browse') }}><Text style={styles.buttonText}>Browse</Text></TouchableOpacity>
                    <TouchableOpacity style={style.transparent.button} onPress={() => { haptic(1); router.push('/testingarea') }}><Text style={styles.buttonText}>DText Debug</Text></TouchableOpacity>
                  </View>
                </View>
              </BlurView>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#000'
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
