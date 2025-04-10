import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { BlurView } from 'expo-blur'
import { router } from 'expo-router'
import haptic from '../components/haptic'
import SignInModal from '../components/SignIn'
import { SymbolView } from 'expo-symbols'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = (): JSX.Element => {
  const [loginvisible, setLoginvisible] = useState(false)

  return (
    <SafeAreaProvider>
      <View style={{ backgroundColor: '#10b730', flex: 1 }}>
        <SafeAreaView style={styles.background}>
          <StatusBar hidden={true}></StatusBar>
          <ImageBackground style={styles.backgroundImage} source={{ uri: 'https://static1.e926.net/data/mascots/913a8fd0240b14bfbb63d6a9cfc3faf2.jpg' }}>
            <SignInModal visible={loginvisible} onClose={() => { setLoginvisible(false) }} />
            <View style={[styles.blurContainer, { flex: 1 }]}>
              <BlurView style={[styles.blur, { flexDirection: 'row' }]} intensity={25}>
                <TouchableOpacity style={[styles.button_transparent, { alignSelf: 'flex-start' }]} onPress={() => { setLoginvisible(true) }}><SymbolView resizeMode='scaleAspectFit' size={15} tintColor={'#fff'} weight='semibold' type='monochrome' name='person.crop.circle.fill'></SymbolView></TouchableOpacity>
                <TouchableOpacity style={[styles.button_transparent, { alignSelf: 'flex-start' }]} onPress={() => { haptic(1); router.push('/settings') }}><SymbolView resizeMode='scaleAspectFit' size={15} tintColor={'#fff'} weight='semibold' type='monochrome' name='gear'></SymbolView></TouchableOpacity>
              </BlurView>
            </View>
            <View style={{ flexGrow: 9 }}></View>
            <View style={[styles.blurContainer, { flexGrow: 1 }]}>
              <BlurView style={styles.blur} intensity={25}>
                <View style={styles.mascotBox}>
                  <Text style={styles.title}>e621</Text>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button_transparent} onPress={() => { haptic(1); router.push('/browse') }}><Text style={styles.buttonText}>Browse</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button_transparent} onPress={() => { haptic(1); router.push('/pools') }}><Text style={styles.buttonText}>Pools</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button_transparent} onPress={() => { haptic(1); router.push('/testingarea') }}><Text style={styles.buttonText}>DText Debug</Text></TouchableOpacity>
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
  button_transparent: {
    backgroundColor: 'rgba(10,10,10,0.5)',
    padding: 7,
    margin: 5,
    borderRadius: 5
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
