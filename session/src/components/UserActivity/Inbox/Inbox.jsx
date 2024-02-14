import React from 'react'
import { View, Text, TouchableOpacity, Image, Form, StyleSheet } from 'react-native'
import { Avatar, Icon } from 'react-native-paper';

const Inbox = (props) => {
  const { styles } = props
  return (
    <View style={[localStyles.wrapperVertical, { paddingHorizontal: 15 }]}>
      <View style={[localStyles.wrapperVertical , {gap:0}]}>
        <Text style={[styles.heading3, { color: '#fff' }]}>Inbox</Text>
        <View style={localStyles.chatWrapper}>
          <View style={localStyles.chatContainer}>
            <Avatar.Icon size={24} icon="folder" />
            <View style={localStyles.chatData}>
              <Text style={localStyles.chatFrom}>username</Text>
              <Text style={localStyles.chatMsg}>message</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const localStyles = StyleSheet.create({
  wrapperVertical: {
    flexDirection: 'column',
    backgroundColor: '#222',
    gap: 10

  },
  chatWrapper: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 20,
    marginVertical: 20
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  chatData: {
    gap: 5
  },
  chatFrom: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  chatMsg: {
    color: '#888'
  }
})

export default Inbox