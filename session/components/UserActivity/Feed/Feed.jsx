import React from 'react'
import { View,Text, TouchableOpacity, Image, Form } from 'react-native'

const Feed = (props) => {
  const { styles } = props

  return (
    <>
      <View style={[styles.wrapperVertical , {}]}>
        <Text style={styles.text}>Feed</Text>
      </View>
    
    </>
  );
}

export default Feed