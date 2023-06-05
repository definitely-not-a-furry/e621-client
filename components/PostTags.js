import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { classic, defaultDark } from '../themes/default'
import AsyncStorage from '@react-native-async-storage/async-storage'

const isEmpty = (array) => {
    if (array === undefined || array.length === 0) {
        return true
    } else return false
}

const TagsView = ({post, style}) => {
    const regex = /_/g
    return (
        <View style={style.container}>
            <Text style={style.containerText}> Tags: {'\n\n'}
                <Text style={style.tagHeader}>{!isEmpty(post.tags.artist) && 'Artists:\n'}</Text>
                {post.tags.artist.map(tag => <Text style={style.tagsArtist} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                <Text style={style.tagHeader}>{!isEmpty(post.tags.copyright) && `Copyright:\n`}</Text>
                {post.tags.copyright.map(tag => <Text style={style.tagsCopyright} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                <Text style={style.tagHeader}>{!isEmpty(post.tags.character) && `Character:\n`}</Text>
                {post.tags.character.map(tag => <Text style={style.tagsCharacter} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                <Text style={style.tagHeader}>{!isEmpty(post.tags.species) && `Species:\n`}</Text>
                {post.tags.species.map(tag => <Text style={style.tagsSpecies} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                <Text style={style.tagHeader}>{!isEmpty(post.tags.general) && `General:\n`}</Text>
                {post.tags.general.map(tag => <Text style={style.tagsGeneral} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                <Text style={style.tagHeader}>{!isEmpty(post.tags.lore) && `Lore:\n`}</Text>
                {post.tags.lore.map(tag => <Text style={style.tagsLore} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                <Text style={style.tagHeader}>{!isEmpty(post.tags.meta) && `Meta:\n`}</Text>
                {post.tags.meta.map(tag => <Text style={style.tagsMeta} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
                <Text style={style.tagHeader}>{!isEmpty(post.tags.invalid) && `Invalid:\n`}</Text>
                {post.tags.invalid.map(tag => <Text style={style.tagsInvalid} key={tag}>{`\t${tag.replace(regex, ' ')}\n`}</Text>)}
            </Text>
        </View>
    )
}

export default TagsView;