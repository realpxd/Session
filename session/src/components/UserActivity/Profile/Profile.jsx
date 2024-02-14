// Profile.js
import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, Form, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { Avatar, Icon, TextInput } from 'react-native-paper';
import { Divider } from 'react-native-paper';
import CommonShowPosts from '../CommonShowPosts';
import CreatePost from '../Feed/CreatePost';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = (props) => {
  const { styles } = props;
  const [errorMessage, setErrorMessage] = useState('');
  const [posts, setPosts] = useState({});
  const [cpVisible, setCPVisible] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [postPageNum, setPostPageNum] = useState(1);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    AsyncStorage.getItem('user').then((data) => {
      if (data) {
        setUserData(JSON.parse(data));
      } else {
        // Handle if no user data is found
      }
    });
    return () => {
      console.log('Profile Component unmounted');
    };
  }, []);

  const getPosts = async () => {
    try {
      const response = await fetch(`${Config.SERVER_URL}/client/getPosts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userData.username }),
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
      console.log('Profile Component unmounted');
    };
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      props.extras.navigation.navigate('Login');
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => setCPVisible(false)} activeOpacity={1} disabled={!cpVisible}>
        {posts.length ? (
          <View style={[{ position: 'relative' }]}>
            <CommonShowPosts
              postPageNum={postPageNum}
              setPostPageNum={setPostPageNum}
              hasMorePosts={hasMorePosts}
              setHasMorePosts={setHasMorePosts}
              setErrorMessage={setErrorMessage}
              styles={styles}
              post={posts}
              setPosts={setPosts}
              userData={userData}
              isProfileSection={true}
            />
          </View>
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
                <Text style={[styles.heading3, { color: '#fff' }]}>Profile</Text>
                <ActivityIndicator size={'large'} color="#F4B942" />
              </View>
            )}
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleLogout()}

        style={[
          styles.btnPrimary,
          {
            position: 'absolute',
            top: 15,
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
        <Icon source="spider" size={30} color="#F4B942" />

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

export default Profile;
