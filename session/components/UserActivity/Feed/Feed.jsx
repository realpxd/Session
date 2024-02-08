import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, Form, StyleSheet, Modal } from 'react-native'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Avatar, Icon, TextInput } from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import { SERVER_URL } from '@env';

const Feed = (props) => {
  const { styles } = props
  const [errorMessage, setErrorMessage] = useState('')
  const [posts, setPosts] = useState({})
  const [modalVisible, setModalVisible] = useState(false);
  const [postData, setPostData] = useState('')

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
      setPosts(data)
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
      <View style={[localStyles.wrapperVertical, { paddingHorizontal: 5 }]}>
        <View style={[localStyles.wrapperVertical, { gap: 0 }]}>
          <Text style={[styles.heading3, { color: '#fff' }]}>Feed</Text>
          {posts.length ? <ShowPosts styles={styles} post={posts} setPosts={setPosts} /> : <Text style={[styles.text, { color: '#fff' }]}>{errorMessage}</Text>}
        </View>
      </View>
    </>
  );
}

const ShowPosts = (props) => {
  const { setPosts, post, styles } = props;
  const [isLiked, setIsLiked] = useState(0)

  const handleLikePost = async (postId, currentLikes) => {
    try {
      const response = await fetch(`${SERVER_URL}/client/updatePost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likedBy: 'nmn', postId, curLikes: currentLikes, like: !isLiked, comment: '' }),
      });
      const updatedPost = await response.json();

      setIsLiked(updatedPost.likedBy.includes('nmn'));

      // Find the index of the post with the given id
      const index = post.findIndex(item => item._id === postId);

      // Create a new post array
      const newPosts = [...post];

      // Replace the post at the found index with the updated post
      newPosts[index] = updatedPost;

      // Update the state
      setPosts(newPosts);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleCommentPost = async (postId) => {
    // Implement the logic to handle comments here
  };  
  
  const handleCopy = (content) => {
    Clipboard.setString(content);
    // Optionally, you can show a message or perform any other actions after copying.
  };

  return (
    <GestureHandlerRootView>
      <FlatList
        renderItem={({ item }) => (
          <View style={[styles.verticalContainer, localStyles.postWrapper]}>
            <View style={[localStyles.horizontalContainer, { flexDirection: 'row' }]}>
              <Avatar.Icon size={24} icon="account" />
              {/* <Avatar.Image size={24} source={require('../assets/avatar.png')} /> */}
              <Text style={styles.text}>{item.username}</Text>
            </View>
            <View style={localStyles.postDataContainer}>
              <Text style={[styles.text, { color: '#fff' }]}>{item.postData}</Text>
            </View>
            <View style={[localStyles.horizontalContainer, localStyles.postIconsContainer]}>
              <TouchableOpacity style={{ flexDirection: 'row', gap: 3 }} onPress={() => handleLikePost(item._id, item.likes)}>
                <Icon
                  source={item.likedBy.includes('nmn') ? "heart" : "heart-outline"}
                  size={20}
                  color={item.likedBy.includes('nmn') ? "red" : "white"}
                />
                <Text style={[styles.text, { color: '#999' }]}>{item.likes ? item.likes : 0}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCommentPost(item._id)}>
                <Icon
                  source="message-outline"
                  size={20}
                  color='white'
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCopy(item.postData)}>
                <Icon
                  source="content-copy"
                  size={20}
                  color='white'
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        data={post}
        keyExtractor={item => item._id}
      />
    </GestureHandlerRootView>
  );
};


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