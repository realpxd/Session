import React from 'react'
import { View, Text, TouchableOpacity, Image, Form, StyleSheet } from 'react-native'
import { Avatar, Icon } from 'react-native-paper';
import AllChats from './AllChats';

const Inbox = (props) => {
  const { styles } = props
  return (
    <AllChats {...props} styles={styles} />
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