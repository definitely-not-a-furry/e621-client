import { StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const defaultDark = StyleSheet.create({
    parentContainer: {
        flex: 1,
        backgroundColor: '#111',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10
    },
    container: {
        flexDirection: 'column',
        margin: 5,
        marginHorizontal: 10,
        backgroundColor: '#444',
        borderRadius: 5
    },
    themeColor: {
        mid: { backgroundColor: '#222' },
        dark: { backgroundColor: '#111' }

    },
    childContainer: {
        backgroundColor: '#666',
        flexDirection: 'row',
        borderRadius: 5,
        marginTop: 6,
        alignItems: 'space-between'
    },
    scrollContainer: {
        backgroundColor: '#222',
        marginBottom: 7
    },
    containerText: {
        color: '#fff',
        padding: 7
    },
    button: {
        backgroundColor: '#444',
        borderRadius: 5,
        padding: 12,
        marginBottom: 0
    },
    image: {
        backgroundColor: '#111',
        contentFit: 'contain',
        aspectRatio: 1,
        width: '100%',
        marginVertical: 5
    },
    tagHeader: {
        fontWeight: 500,
        padding: 5,
        paddingBottom: 3
    },
    link: {
        backgroundColor: '#444'
    },
    searchInput: {
        color: '#fff',
        borderColor: '#444'
    },
    searchContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#222',
        justifyContent: 'center'
    },
    quote: {
        padding: 5,
        backgroundColor: '#404040',
        borderColor: '#404040',
        borderLeftColor: '#67717b',
        paddingVertical: 5,
        borderRadius: 3,
        borderWidth: 3
    },
    positive: { color: '#3e9e49' },
    negative: { color: '#dd3127' },
    questionable: { color: '#ffe666' },
    explicit: { color: '#e45f5f' },
    tagsGeneral: { color: '#b4c7d9' },
    tagsCharacter: { color: '#0a0' },
    tagsArtist: { color: '#f2ac08' },
    tagsMeta: { color: '#fff' },
    tagsInvalid: { color: '#ff3d3d' },
    tagsSpecies: { color: '#ff3d3d' },
    tagsCopyright: { color: '#d0d' },
    tagsLore: { color: '#282' },
    transparent: {
        button: {
            backgroundColor: 'rgba(10,10,10,0.5)',
            padding: 7,
            margin: 5,
            borderRadius: 5
        }
    }
})

export const classic = StyleSheet.create({
    parentContainer: {
        flex: 1,
        backgroundColor: '#020f23',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10
    },
    container: {
        backgroundColor: '#152f56'
    },
    themeColor: {
        mid: { backgroundColor: '#152f56' },
        dark: { backgroundColor: '#020f23' }
    },
    childContainer: {
        backgroundColor: '#1e437c',
        flexDirection: 'row',
        borderRadius: 5,
        marginTop: 6,
        alignItems: 'space-between'
    },
    scrollContainer: {
        backgroundColor: '#002',
        marginBottom: 7
    },
    containerText: {
        color: '#fff',
        padding: 7
    },
    button: {
        backgroundColor: '#1e437c',
        borderRadius: 5,
        padding: 12,
        marginBottom: 0
    },
    image: {
        backgroundColor: '#020f23',
        contentFit: 'contain',
        aspectRatio: 1,
        width: '100%',
        marginVertical: 5
    },
    tagHeader: {
        fontWeight: 500,
        padding: 5,
        paddingBottom: 3
    },
    link: {
        backgroundColor: '#1e437c'
    },
    searchInput: {
        color: '#fff',
        borderColor: '#1e437c'
    },
    searchContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#152f56',
        justifyContent: 'center'
    },
    quote: {
        backgroundColor: '#3668b3',
        borderColor: '#3668b3',
        paddingHorizontal: 5,
        borderLeftColor: '#b4c7d9',
        borderRadius: 3,
        borderWidth: 3
    },
    positive: { color: '#3e9e49' },
    negative: { color: '#dd3127' },
    questionable: { color: '#ffe666' },
    explicit: { color: '#e45f5f' },
    tagsGeneral: { color: '#b4c7d9' },
    tagsCharacter: { color: '#0a0' },
    tagsArtist: { color: '#f2ac08' },
    tagsMeta: { color: '#fff' },
    tagsInvalid: { color: '#ff3d3d' },
    tagsSpecies: { color: '#ff3d3d' },
    tagsCopyright: { color: '#d0d' },
    tagsLore: { color: '#282' },
    transparent: {
        button: {
            backgroundColor: 'rgba(10,10,10,0.5)',
            padding: 7,
            margin: 5,
            borderRadius: 5
        }
    }
})

export const getTheme = async () => {
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
