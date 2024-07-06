import React from 'react'
import { Modal, View, Text, TouchableOpacity } from 'react-native'
import { BlurView } from 'expo-blur'
import PropTypes from 'prop-types'

const InfoModal = ({ visible, onClose, title, content }) => {
  InfoModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    title: PropTypes.string,
    content: PropTypes.string
  }
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <BlurView style={{ color: '#000', flex: 1, justifyContent: 'center', alignItems: 'center' }} intensity={50}>
        <View style={{ width: '80%', padding: 12 }}>
          <Text style={{ color: '#fff', padding: 7, textAlign: 'center', fontSize: 20, fontWeight: 700 }}>{title}</Text>
          <View style={{ backgroundColor: 'rgba(25,25,25,0.2)', borderRadius: 5, marginBottom: 7, padding: 5 }}>
            <Text style={{ color: '#fff' }}>{content}</Text>
          </View>
          <TouchableOpacity style={{ padding: 5, borderRadius: 5, backgroundColor: 'rgba(0,0,0,0.2)' }} onPress={onClose}>
            <Text style={{ color: '#fff', fontWeight: 800, textAlign: 'center' }}>Ok</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  )
}

export default InfoModal
