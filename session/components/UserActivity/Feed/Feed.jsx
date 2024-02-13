// Feed.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Form, StyleSheet, Modal, ActivityIndicator, Dimensions } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Avatar, Icon, TextInput } from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import CommonShowPosts from '../CommonShowPosts';
import CreatePost from './CreatePost';
import { SERVER_URL } from '@env';

const Feed = (props) => {
  const { styles } = props;
  const [errorMessage, setErrorMessage] = useState('');
  const [posts, setPosts] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [postData, setPostData] = useState('');
  const [cpVisible, setCPVisible] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [postPageNum, setPostPageNum] = useState(1);

  const getPosts = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/client/getPosts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setPosts(data.reverse());
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  useEffect(() => {
    getPosts();
    return () => {
      console.log('Feed Component unmounted');
    };
  }, []);

  return (
    <>
      <TouchableOpacity onPress={() => setCPVisible(false)} activeOpacity={1} disabled={!cpVisible}>
        <View style={[localStyles.wrapperVertical, { paddingHorizontal: 15, paddingBottom: 245 }]}>
          <View style={[localStyles.wrapperVertical, { gap: 0 }]}>
            {posts.length ? (
              <CommonShowPosts
                {...props}
                postPageNum={postPageNum}
                setPostPageNum={setPostPageNum}
                hasMorePosts={hasMorePosts}
                setHasMorePosts={setHasMorePosts}
                setErrorMessage={setErrorMessage}
                styles={styles}
                post={posts}
                setPosts={setPosts}
              />
            ) : (
              <Text style={[styles.text, { color: '#fff' }]}>
                {errorMessage ? (
                  errorMessage
                ) : (
                  <View
                    style={[
                      {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 'auto',
                        width: Dimensions.get('window').width - 30,
                      },
                    ]}>
                    <Text style={[styles.heading3, { color: '#fff' }]}>Feed</Text>
                    <ActivityIndicator size={'large'} color="#F4B942" />
                  </View>
                )}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setCPVisible(true)}
        style={[
          styles.btnPrimary,
          {
            position: 'absolute',
            bottom: 15,
            right: 15,
            zIndex: 98,
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 20,
            fontWeight: 'bolder',
            backgroundColor: '#111',
          },
        ]}>
        <Icon source="feather" size={30} color="#F4B942" />
      </TouchableOpacity>
      {cpVisible && <CreatePost post={posts} setPosts={setPosts} setCPVisible={setCPVisible} styles={styles} />}
    </>
  );
};

const localStyles = StyleSheet.create({
  // ... your local styles
});

export default Feed;
