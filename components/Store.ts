import * as SecureStore from 'expo-secure-store'
const Storage = SecureStore

const store = async (key: string, content: string): Promise<void> => {
  await Storage.setItemAsync(key, content)
    .catch(e => { console.log(`Error loading data from AsyncStorage: ${e}`); return null })
}

const load = async (key: string): Promise<string | null> => {
  return await Storage.getItemAsync(key)
    .catch(e => { console.log(`Error loading data from AsyncStorage: ${e}`); return null })
}

export {
  store,
  load
}
