import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import DText from '../../components/DText'
import { defaultDark, classic } from '../../themes/default'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter, useLocalSearchParams } from 'expo-router'
import RequestHandler from '../../util/RequestHandler'

const app = () => {
    const [style, setStyle] = useState()
    const router = useRouter()
    const params = useLocalSearchParams()
    const wikiId = params.id
    const R = new RequestHandler()

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
        R.get('GET_WIKI', wikiId)
    }, [])

    return (
        <SafeAreaView>
            <View>
                <TouchableOpacity style={[style.link, { padding: 7, borderRadius: 5, margin: 7, marginBottom: 7 }]} onPress={() => { router.back() }}><Text style={{ color: '#fff', fontWeight: 800 }}> back </Text></TouchableOpacity>
            </View>
            <View>
                <DText>

                </DText>
            </View>
        </SafeAreaView>
    )
}

export default app
