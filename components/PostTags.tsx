import React from 'react'
import { Text, View } from 'react-native'
import type { Post } from '../api/posts'
import type { Theme } from '../context/ThemeContext'

const TagsView = ({ post, theme }: { post: Post, theme: Theme }): JSX.Element => {
  return (
    <View style={{ backgroundColor: theme.sectionLightenHalf, flexDirection: 'row', margin: 5, marginHorizontal: 10, borderRadius: 5 }}>
      <Text style={{ color: theme.text.text, padding: 7 }}> Tags: {'\n\n'}

        <Text style={{ fontWeight: 500, padding: 5, paddingBottom: 3 }}>{Boolean(post.tags.artist?.length) && 'Artists:\n'}</Text>
        {post.tags.artist.map(tag => <Text style={{ color: theme.text.artist }} key={tag}>{`\t${tag.replace(/_/g, ' ')}\n`}</Text>)}

        <Text style={{ fontWeight: 500, padding: 5, paddingBottom: 3 }}>{Boolean(post.tags.copyright?.length) && 'Copyright:\n'}</Text>
        {post.tags.copyright.map(tag => <Text style={{ color: theme.text.copyright }} key={tag}>{`\t${tag.replace(/_/g, ' ')}\n`}</Text>)}

        <Text style={{ fontWeight: 500, padding: 5, paddingBottom: 3 }}>{Boolean(post.tags.character?.length) && 'Character:\n'}</Text>
        {post.tags.character.map(tag => <Text style={{ color: theme.text.character }} key={tag}>{`\t${tag.replace(/_/g, ' ')}\n`}</Text>)}

        <Text style={{ fontWeight: 500, padding: 5, paddingBottom: 3 }}>{Boolean(post.tags.species?.length) && 'Species:\n'}</Text>
        {post.tags.species.map(tag => <Text style={{ color: theme.text.species }} key={tag}>{`\t${tag.replace(/_/g, ' ')}\n`}</Text>)}

        <Text style={{ fontWeight: 500, padding: 5, paddingBottom: 3 }}>{Boolean(post.tags.general?.length) && 'General:\n'}</Text>
        {post.tags.general.map(tag => <Text style={{ color: theme.text.general }} key={tag}>{`\t${tag.replace(/_/g, ' ')}\n`}</Text>)}

        <Text style={{ fontWeight: 500, padding: 5, paddingBottom: 3 }}>{Boolean(post.tags.lore?.length) && 'Lore:\n'}</Text>
        {post.tags.lore.map(tag => <Text style={{ color: theme.text.lore }} key={tag}>{`\t${tag.replace(/_/g, ' ')}\n`}</Text>)}

        <Text style={{ fontWeight: 500, padding: 5, paddingBottom: 3 }}>{Boolean(post.tags.meta?.length) && 'Meta:\n'}</Text>
        {post.tags.meta.map(tag => <Text style={{ color: theme.text.meta }} key={tag}>{`\t${tag.replace(/_/g, ' ')}\n`}</Text>)}

        <Text style={{ fontWeight: 500, padding: 5, paddingBottom: 3 }}>{Boolean(post.tags.invalid?.length) && 'Invalid:\n'}</Text>
        {post.tags.invalid.map(tag => <Text style={{ color: theme.text.invalid }} key={tag}>{`\t${tag.replace(/_/g, ' ')}\n`}</Text>)}

      </Text>
    </View>
  )
}

export default TagsView
