// CommonShowPosts.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions, StyleSheet, ImageBackground, Image } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Avatar, Icon, Divider } from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

const username = "nmn"

const CommonShowPosts = (props) => {
    const { setPosts, post, styles, setErrorMessage, hasMorePosts, setHasMorePosts, postPageNum, setPostPageNum, isProfileSection, passedUserData } = props;
    // const { profileOpen } = props.route.params;
    const [isLiked, setIsLiked] = useState(0);
    const [copying, setCopying] = useState(false);
    const [copyiedPostId, setCopyiedPostId] = useState('');
    const [isLikePressed, setIsLikePressed] = useState(false);
    const { recUserData, profileOpen } = props.route.params || {};
    const [userData, setUserData] = useState({});
    const [currUserData, setCurrUserData] = useState({ username: '' })


    useEffect(() => {
        AsyncStorage.getItem('user').then((data) => {
            if (data) {
                setCurrUserData(JSON.parse(data))
            }
        }).catch(error => console.error("Error fetching user data:", error));


        return () => {
            console.log('ShowUserPosts Component unmounted');
        };
    }, [])
    useEffect(() => {
        console.log('recUserData:', recUserData);
        console.log('currUserData:', currUserData);
        console.log('passedUserData from props:', passedUserData);

        if (recUserData) {
            if (currUserData.username === recUserData.username) {
                console.log('Setting userData from recUserData');
                setUserData(recUserData);
            } else {
                console.log('Setting userData from currUserData');
                setUserData(currUserData);
            }
        } else if (passedUserData) {
            if (currUserData.username === passedUserData.username) {
                console.log('Setting userData from passedUserData');
                setUserData(passedUserData);
            } else {
                console.log('no data found');
                // setUserData(currUserData);
            }
        } else {
            console.log('Setting userData from currUserData');
            setUserData(currUserData);
        }


        // recUserData ? currUserData.username == recUserData.username ? setUserData(currUserData) : setUserData(recUserData) : passedUserData ? currUserData.username == passedUserData.username ? setUserData(currUserData) : setUserData(passedUserData) : setUserData(currUserData)

        // if (currUserData.username == recUserData.username) {
        //     setUserData(currUserData)
        // } else {
        //     setUserData(currUserData)
        // }
    }), [recUserData, currUserData]
    // console.log('recUserData', recUserData)
    // console.log('userData', userData)
    // console.log('currUserData', currUserData)
    // console.log('passedUserData', passedUserData)

    const handleLikePost = async (postId, currentLikes) => {
        setIsLikePressed(true);
        try {
            const response = await fetch(`${Config.SERVER_URL}/client/updatePost`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ likedBy: username, postId, curLikes: currentLikes, like: !isLiked, comment: '' }),
            });
            const updatedPost = await response.json();
            setIsLiked(updatedPost.likedBy.includes(username));

            setPosts(post.map(item => item._id === postId ? updatedPost : item));
            setIsLikePressed(false);
        } catch (e) {
            console.warn(e);
            setIsLikePressed(false);
        }
    };

    const handleFetchMore = async () => {
        console.log('Fetching more posts ');
        console.log('hasMorePosts', hasMorePosts + ' postPageNum', postPageNum);
        if (!hasMorePosts) {
            setPosts(prev => [...prev, ...prev.slice(-8)]);
            return;
        }
        try {
            const response = await fetch(`${Config.SERVER_URL}/client/getPosts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postPageNum, limit: 8, username: isProfileSection ? username : '' }),
            });
            const data = await response.json();
            if (data.length < 2) {
                setHasMorePosts(false);
                console.log('No more posts');
                // slice only the first 8 posts
                setPosts
                setPosts(prev => [...prev, ...prev.slice(8)]);
            } else {
                setPosts(prev => [...prev, ...data]);
                setPostPageNum(postPageNum + 1);
                console.log('Fetched more posts');
            }
        } catch (e) {
            setErrorMessage(e.message);
        }
    };

    const handleCommentPost = async (postId) => {
        // Implement the logic to handle comments here
    };

    const handleCopy = (content, id) => {
        Clipboard.setString(content);
        setCopying(true);
        setCopyiedPostId(id);
        setTimeout(() => {
            setCopying(false);
            setCopyiedPostId('');
        }, 100);
    };

    // console.log('ProfileOpen: ' + props)
    // console.log(props.route)
    // useEffect(() => {
    //     console.log('ProfileOpen: ' + props)
    //     console.log(props.route); // Log the params to check their values
    //   }, [props.route]);
    return (
        <GestureHandlerRootView style={[{ height: profileOpen ? Dimensions.get('window').height + 40 : 'auto' }]}>
            <FlatList
                style={[{ height: Dimensions.get('window').height - 30 }]}
                renderItem={({ item }) => (
                    <View style={[styles.verticalContainer, localStyles.postWrapper, { marginHorizontal: 10 }]}>
                        <View style={[localStyles.horizontalContainer, { flexDirection: 'row' }]}>
                            <TouchableOpacity onPress={() => props.extras.navigation.navigate('Profile', { profileOpen: 'true', recUserData: userData })}>
                                <Avatar.Icon size={24} icon="account" />
                            </TouchableOpacity>
                            <Text style={styles.text}>{item.username}</Text>
                        </View>
                        <View style={localStyles.postDataContainer}>
                            <Text style={[styles.text, { color: '#fff' }]}>{item.postData ? item.postData : '...'}</Text>
                        </View>
                        <View style={[localStyles.horizontalContainer, localStyles.postIconsContainer]}>
                            <TouchableOpacity style={{ flexDirection: 'row', gap: 3 }} onPress={() => handleLikePost(item._id, item.likes)}>
                                <Icon
                                    source={item.likedBy && item.likedBy.includes(username) ? 'heart' : 'heart-outline'}
                                    size={20}
                                    color={item.likedBy && item.likedBy.includes(username) ? 'red' : 'white'}
                                />
                                <Text style={[styles.text, { color: '#999' }]}>{item.likes ? item.likes : 0}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleCommentPost(item._id)}>
                                <Icon source="message-outline" size={20} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleCopy(item.postData, item._id)}>
                                <Icon
                                    source={copying && copyiedPostId === item._id ? 'blur' : 'content-copy'}
                                    size={20}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                data={post}
                keyExtractor={item => item._id + Math.random() * 1000}
                key={item => item._id}
                onEndReached={handleFetchMore}
                onEndReachedThreshold={0}
                ListFooterComponent={<ActivityIndicator size="large" />}
                ListHeaderComponent={isProfileSection ? <HeaderComponent {...props} styles={styles} userData={userData} /> : <Text style={[styles.heading3, { color: '#fff', marginHorizontal: 10 }]}>Feed</Text>}
            />
        </GestureHandlerRootView>
    );
};

const HeaderComponent = (props) => {
    const { styles, userData } = props
    // the image exists in public local folder
    const image = require('../../../public/img/pfp.jpg');

    // const image = require('@expo/snack-static/img/pfp.jpg')
    // const image = require('./img/pfp.jpg');
    // const image = require('@expo/snack-static/react-native-logo.png');
    // const image = {uri: 'https://reactnative.dev/img/tiny_logo.png',}
    // const image = { uri: '' };
    return (
        <>
        <TouchableOpacity
          onPress={() => props.extras.navigation.navigate('Settings' , {...props})}
  
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
            <View style={[{}]}>
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                    <View style={[{ height: 200, backgroundColor: 'gray' }]}>

                    </View>
                </ImageBackground>
            </View>
            <View style={[{ position: 'absolute', top: 130, left: 10, zIndex: 2, height: 150, width: 150, borderRadius: 100, backgroundColor: 'black' }]}>

                <Image
                    style={[{
                        width: 150,
                        height: 150,
                        borderRadius: 100,
                    }]}
                    resizeMode='cover'
                    source={image}
                />
            </View>
            <View style={[{ marginVertical: 20, marginTop: 90, paddingHorizontal: 10 }]}>
                <View style={[{ flexDirection: 'row', gap: 15, alignItems: 'center' }]}>
                    <Text style={[{ color: 'white', fontWeight: 'bold', fontSize: 25 }]}>{userData.name}</Text>
                    <Text style={[{ color: '#999', fontWeight: 'bold', fontSize: 20 }]}>@{userData.username}</Text>
                </View>
                <Text style={[{ color: '#e0e0e0', fontSize: 15, textAlign: 'justify' }]}>{userData.bio}</Text>
            </View>
            <Divider />
        </>
    )
}

const localStyles = StyleSheet.create({
    horizontalContainer: {
        gap: 10,
    },
    wrapperVertical: {
        flexDirection: 'column',
        backgroundColor: '#222',
        gap: 10,
    },
    postWrapper: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 20,
        marginVertical: 20,
    },
    postDataContainer: {
        marginVertical: 5,
        backgroundColor: '#444',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 10,
    },
    postIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});

export default CommonShowPosts;
