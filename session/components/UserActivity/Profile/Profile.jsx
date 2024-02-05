import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Image, Form, StyleSheet } from 'react-native'

const Profile = (props) => {
  const { styles } = props

  const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };

  return (
    <View>
      <View>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Text style={styles.text}>Inside</Text>
        </ImageBackground>
      </View>
      <Text>Name</Text>
      <Text>Username</Text>
      <Text>Bio</Text>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

export default Profile