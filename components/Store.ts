import AsyncStorage from "@react-native-async-storage/async-storage"
const Storage = AsyncStorage

const store = async (key: string, content: string): Promise<any> => {
  return await Storage.setItem(key, content)
    .catch(e => { console.log(`Error loading data from AsyncStorage: ${e}`); return null })
}

const load = async (key: string): Promise<any> => {
  return await Storage.getItem(key)
    .catch(e => { console.log(`Error loading data from AsyncStorage: ${e}`); return null })
}

export {
  store,
  load
}
