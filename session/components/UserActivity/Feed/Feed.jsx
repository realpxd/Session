import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, Form, StyleSheet, Modal } from 'react-native'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Avatar, Icon, TextInput } from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import ShowPosts from './ShowPosts';
import CreatePost from './CreatePost';
import { SERVER_URL } from '@env';

const Feed = (props) => {
  const { styles } = props
  const [errorMessage, setErrorMessage] = useState('')
  const [posts, setPosts] = useState({})
  const [modalVisible, setModalVisible] = useState(false);
  const [postData, setPostData] = useState('')
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

  return (
    <>
      <TouchableOpacity onPress={() => setCPVisible(false)} activeOpacity={1} disabled={!cpVisible}>
        <View style={[localStyles.wrapperVertical, { paddingHorizontal: 15, paddingBottom: 245 }]}>
          <View style={[localStyles.wrapperVertical, { gap: 0 }]}>
            {posts.length ? <ShowPosts styles={styles} post={posts} setPosts={setPosts} /> : <Text style={[styles.text, { color: '#fff' }]}>{errorMessage}</Text>}
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCPVisible(true)} style={[styles.btnPrimary, { position: 'absolute', bottom: 5, right: 5, zIndex: 98, width: 50, height: 50, justifyContent: 'center', alignItems: 'center', fontSize: 20, fontWeight: 'bolder' }]}>
        <Text style={styles.btnPrimaryText}>+</Text>
      </TouchableOpacity>
      {cpVisible && <CreatePost post={posts} setPosts={setPosts} setCPVisible={setCPVisible} styles={styles} />}
    </>
  );
}

const localStyles = StyleSheet.create({
  horizontalContainer: {
    gap: 10,
  },
  rounded: {
    borderRadius: 20
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