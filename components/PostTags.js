import React from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'

const TagsView = ({ post, style }) => {
  TagsView.propTypes = {
    post: PropTypes.object,
    style: PropTypes.object
  }
  return (
    <View style={[style.container, { flexDirection: 'row', margin: 5, marginHorizontal: 10, borderRadius: 5 }]}>
      <Text style={style.containerText}> Tags: {'\n\n'}

        <Text style={style.tagHeader}>{Boolean(post.tags.artist?.length) && 'Artists:\n'}</Text>
        {post.tags.artist.map(tag => <Text style={style.tagsArtist} key={tag}>{`\t${tag.replace(/_/g, ' ')}\n`}</Text>)}

        <Text style={style.tagHeader}>{Boolean(post.tags.copyright?.length) && 'Copyright:\n'}</Text>
        {post.tags.copyright.map(tag => <Text style={style.tagsCopyright} key={tag}>{`\t${tag.replace(/_/g, ' ')}\n`}</Text>)}

        <Text style={style.tagHeader}>{Boolean(post.tags.character?.length) && 'Character:\n'}</Text>
        {post.tags.character.map(tag => <Text style={style.tagsCharacter} key={tag}>{`\t${tag.replace(/_/g, ' ')}\n`}</Text>)}

        <Text style={style.tagHeader}>{Boolean(post.tags.species?.length) && 'Species:\n'}</Text>
        {post.tags.species.map(tag => <Text style={style.tagsSpecies} key={tag}>{`\t${tag.replace(/_/g, ' ')}\n`}</Text>)}

        <Text style={style.tagHeader}>{Boolean(post.tags.general?.length) && 'General:\n'}</Text>
        {post.tags.general.map(tag => <Text style={style.tagsGeneral} key={tag}>{`\t${tag.replace(/_/g, ' ')}\n`}</Text>)}

        <Text style={style.tagHeader}>{Boolean(post.tags.lore?.length) && 'Lore:\n'}</Text>
        {post.tags.lore.map(tag => <Text style={style.tagsLore} key={tag}>{`\t${tag.replace(/_/g, ' ')}\n`}</Text>)}

        <Text style={style.tagHeader}>{Boolean(post.tags.meta?.length) && 'Meta:\n'}</Text>
        {post.tags.meta.map(tag => <Text style={style.tagsMeta} key={tag}>{`\t${tag.replace(/_/g, ' ')}\n`}</Text>)}

        <Text style={style.tagHeader}>{Boolean(post.tags.invalid?.length) && 'Invalid:\n'}</Text>
        {post.tags.invalid.map(tag => <Text style={style.tagsInvalid} key={tag}>{`\t${tag.replace(/_/g, ' ')}\n`}</Text>)}

      </Text>
    </View>
  )
}

export default TagsView
