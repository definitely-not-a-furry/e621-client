import AsyncStorage from '@react-native-async-storage/async-storage'

const store = async (key, content) => {
    return await AsyncStorage.setItem(key, content)
        .catch((error) => { console.log(`Error loading data from AsyncStorage: ${error}`); return null })
}

const load = async (key) => {
    return await AsyncStorage.getItem(key)
        .catch((error) => { console.log('Error loading data from AsyncStorage:', error); return null })
}

export {
    store,
    load
}
