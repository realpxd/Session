import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Form, StyleSheet } from 'react-native'
import { Avatar, Icon } from 'react-native-paper';

const Feed = (props) => {
  const { styles } = props

  const getPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/client/getPosts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.warn(data);
    } catch (e) {
      console.warn(e);
    }
  }

  useEffect(() => {
    getPosts()
  }
    , [])

  return (
    <>
      <View style={[localStyles.wrapperVertical, { paddingHorizontal: 5 }]}>
        <View style={[localStyles.wrapperVertical, { gap: 0 }]}>
          <Text style={[styles.heading3, { color: '#fff' }]}>Feed</Text>
          <View style={[styles.verticalContainer, localStyles.postWrapper]}>
            <View style={[localStyles.horizontalContainer, { flexDirection: 'row' }]}>
              <Avatar.Icon size={24} icon="folder" />
              {/* <Avatar.Image size={24} source={require('../assets/avatar.png')} /> */}
              <Text style={styles.text}>username</Text>
            </View>
            <View style={localStyles.postDataContainer}>
              <Text style={[styles.text, { color: '#fff' }]}>post</Text>
            </View>
            <View style={[localStyles.horizontalContainer, localStyles.postIconsContainer]}>


              <Icon
                source="heart-outline"
                size={20}
                color='white'
              />
              <Icon
                source="message-outline"
                size={20}
                color='white'
              />
              <Icon
                source="content-copy"
                size={20}
                color='white'
              />
            </View>

          </View>
        </View>
      </View>


    </>
  );
}

const localStyles = StyleSheet.create({
  horizontalContainer: {
    gap: 10,
  },
  wrapperVertical: {
    flexDirection: 'column',
    backgroundColor: '#222',
    gap: 10

  },
  postWrapper: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 20,
    marginVertical: 20

  },
  postDataContainer: {
    marginVertical: 5,
    backgroundColor: '#444',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10
  },
  postIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
})

export default Feed