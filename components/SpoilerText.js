import React, { useState } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'

const SpoilerText = (content) => {
  const [show, setShow] = useState(false)

  return (
    <View>
      {show
        ? (<Text style={{ backgroundColor: '#000', alignSelf: 'flex-start', color: '#fff' }}>{content.children}</Text>)
        : (
          <TouchableHighlight style={{ alignSelf: 'flex-start' }} onPress={() => { setShow(true) }}>
            <View style={{ backgroundColor: 'black' }}>
              <Text style={{ color: 'black' }}>{content.children}</Text>
            </View>
          </TouchableHighlight>
        )}
    </View>
  )
}

export default SpoilerText
