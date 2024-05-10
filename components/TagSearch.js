import React, { useState, useEffect } from 'react'
import RequestHandler from '../util/RequestHandler'
import { View, Text, FlatList } from 'react-native'

const AutoCorrect = ({ input, style }) => {
    const [completions, setCompletions] = useState([])
    const R = new RequestHandler()
    R.auth = null
    R.name = null
    R.domain = 'e926.net'

    useEffect(() => {
        R.get('AUTOCOMPLETE_TAG', input).then(data => { setCompletions(data) })
    }, [input])

    const Item = ({ name, count, type }) => {
        let color = style.tagsGeneral
        switch (type) {
            case 0:
                color = style.tagsGeneral
                break
            case 1:
                color = style.tagsArtist
                break
            case 2: // I don't know why, but there is no catagory with number 2 ¯\_(ツ)_/¯
                break
            case 3:
                color = style.tagsCopyright
                break
            case 4:
                color = style.tagsCharacter
                break
            case 5:
                color = style.tagsSpecies
                break
            case 6:
                color = style.tagsInvalid
                break
            case 7:
                color = style.tagsMeta
                break
            case 8:
                color = style.tagsLore
            default:
                break
        }
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7 }}>
                <Text style={color}>{name.replace(/_/g, ' ')}</Text>
                <Text style={{ color: '#bbb' }}>{count}</Text>
            </View>
        )
    }

    return (
        <View style={[style.container, { borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: 'argb(0,0,0,0)', borderBottomWidth: 2 }}>
                <Text style={{ color: '#fff', padding: 7 }}>Suggestions</Text>
                <Text style={{ color: '#fff', padding: 7 }}>Count</Text>
            </View>

            <FlatList
                data={completions}
                renderItem={({ item }) => <Item name={item.name} count={item.post_count} type={item.category}/>}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default AutoCorrect
