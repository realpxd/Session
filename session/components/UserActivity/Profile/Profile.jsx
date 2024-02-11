import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Image, Form, StyleSheet, } from 'react-native'
import { Avatar, Icon, TextInput } from 'react-native-paper';
import { Divider } from 'react-native-paper'
import ShowUserPosts from './ShowUserPosts'
import CreatePost from '../Feed/CreatePost'

const userData = {
  username: 'nmn',
  fullname: 'Naman Saini',
  email: 'thisisnamansaini@gmail.com',
  password: '',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore illum provident asperiores facere. Asperiores sequi beatae temporibus. '

}
const Profile = (props) => {
  const { styles } = props
  const [errorMessage, setErrorMessage] = useState('')
  const [posts, setPosts] = useState({})
  const [cpVisible, setCPVisible] = useState(false)

  const getPosts = async () => {
    try {
      const response = await fetch('http://192.168.29.35:8080/client/getPosts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
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
        <View style={[{ position: 'relative' }]}>
          <ShowUserPosts setErrorMessage={setErrorMessage} styles={styles} post={posts} setPosts={setPosts} userData={userData} />
        </View>
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