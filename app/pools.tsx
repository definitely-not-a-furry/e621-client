import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import { useTheme, ThemeProvider } from '../context/ThemeContext'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import { Symbol } from '../components/Components'
import RequestHandler from '../util/RequestHandler'
import type { Pool } from '../api/pools'

const Pools = (): JSX.Element => {
  const R = new RequestHandler()
  const { theme } = useTheme()
  const router = useRouter()
  const [pools, setPools] = React.useState<Pool[]>()
  const [text, setText] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const updateSearchTerm = (): void => {
    setSearchTerm(text)
    // store('previoussearch', searchTerm).catch((reason) => { console.log('Could not save search term') })
  }

  const goToPool = (poolId: number): void => {
    router.push({ pathname: './pools/[id]', params: { id: poolId } })
  }

  const truncate = (str: string, n: number): string => {
    return (str.length > n) ? str.slice(0, n - 1) + '...' : str
  }

  useEffect(() => {
    setPools([])
    R.get<Pool[]>('pools.json', [{ key: 'search[name_matches]', value: searchTerm }, { key: 'limit', value: '25' }]).then((result) => {
      if (result != null) setPools(result)
      else setPools([])
    }, (reject) => {
      console.log(reject.cause)
    })
  }, [searchTerm])
  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      <StatusBar hidden={true} />
      <View style={{ flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center', backgroundColor: theme.foreground, justifyContent: 'center' }}>
        <TouchableOpacity style={[{ padding: 7, borderRadius: 5, margin: 7, marginBottom: 7 }]} onPress={() => { router.push('./home') }}>
          <Symbol name='chevron.backward' size={15} color={theme.text.text} weight='semibold' type='monochrome' />
        </TouchableOpacity>
        <TextInput
          style={{ color: theme.text.text, borderColor: theme.sectionLighten, flex: 1, height: 'auto', borderWidth: 2, borderRadius: 5, width: '100%', marginHorizontal: 2, padding: 5, paddingLeft: 10 }}
          value={text}
          onChangeText={setText}
          autoCapitalize={'none'}
          autoCorrect={false}
          enterKeyHint={'search'}
          placeholder="Enter name..."
          onSubmitEditing={updateSearchTerm}
        />
      </View>
      <View style={{ flex: 1, backgroundColor: theme.sectionDarken, flexDirection: 'row', flexWrap: 'wrap', padding: 0 }}>
        <FlatList
          style={{ height: '100%', padding: 5, margin: 0 }}
          data={pools}
          numColumns={1}
          renderItem={(pool) => {
            const poolinfo = pool.item
            return (
              <TouchableOpacity style={{ backgroundColor: theme.sectionLighten, padding: 10, borderRadius: 5, margin: 5 }} onPress={() => { goToPool(poolinfo.id) }}>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ color: theme.text.text }}>{poolinfo.name.replace(/_/g, ' ')}</Text>
                  { poolinfo.description !== '' ? <Text style={{ color: theme.text.neutral }}>{truncate(poolinfo.description.replace(/\n/g, ' '), 25)}</Text> : null}
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const App = (): JSX.Element => {
  return (
    <ThemeProvider>
      <Pools />
    </ThemeProvider>
  )
}

export default App
