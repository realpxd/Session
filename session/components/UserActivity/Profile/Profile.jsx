import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Image, Form, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import { Avatar, Icon, TextInput } from 'react-native-paper';
import { Divider } from 'react-native-paper'
import ShowUserPosts from './ShowUserPosts'
import CreatePost from '../Feed/CreatePost'
import { SERVER_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = (props) => {
  const { styles } = props
  const [errorMessage, setErrorMessage] = useState('')
  const [posts, setPosts] = useState({})
  const [cpVisible, setCPVisible] = useState(false)

  const [userData, setUserData] = useState({})
  AsyncStorage.getItem('user').then((data) => {
    if (data) {
      setUserData(JSON.parse(data))
    }
  })
  console.log(userData)

  const getPosts = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/client/getPosts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: userData.username })
      });
      const data = await response.json();
      console.log(data)
      setPosts(data.reverse())
    } catch (e) {
      setErrorMessage(e.message)
    }
  }

  useEffect(() => {
    getPosts()
  }
    , [])

  const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };

  return (
    <>
      <TouchableOpacity onPress={() => setCPVisible(false)} activeOpacity={1} disabled={!cpVisible}>
        {/* <View style={[{ position: 'relative' }]}>
          <ShowUserPosts setErrorMessage={setErrorMessage} styles={styles} post={posts} setPosts={setPosts} userData={userData} />
        </View> */}

        {posts.length ? <View style={[{ position: 'relative' }]}>
          <ShowUserPosts setErrorMessage={setErrorMessage} styles={styles} post={posts} setPosts={setPosts} userData={userData} />
        </View> : <Text style={[styles.text, { color: '#fff' }]}>{errorMessage ? errorMessage : <View style={[{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 'auto', width: Dimensions.get('window').width - 30 }]} >
          <Text style={[styles.heading3, { color: '#fff' }]}>Profile</Text>
          <ActivityIndicator size={'large'} color='#F4B942' />
        </View>}</Text>}


      </TouchableOpacity>

      <TouchableOpacity onPress={() => setCPVisible(true)} style={[styles.btnPrimary, { position: 'absolute', bottom: 15, right: 15, zIndex: 98, width: 60, height: 60, justifyContent: 'center', alignItems: 'center', fontSize: 20, fontWeight: 'bolder', backgroundColor: '#111' }]}>
        <Icon
          source="feather"
          size={30}
          color='#F4B942'
        />
      </TouchableOpacity>

      {cpVisible && <CreatePost post={posts} setPosts={setPosts} setCPVisible={setCPVisible} styles={styles} />}
    </>
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