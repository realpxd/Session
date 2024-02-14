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
    const { setPosts, post, styles, setErrorMessage, hasMorePosts, setHasMorePosts, postPageNum, setPostPageNum, userData, isProfileSection } = props;
    const [isLiked, setIsLiked] = useState(0);
    const [copying, setCopying] = useState(false);
    const [copyiedPostId, setCopyiedPostId] = useState('');
    const [isLikePressed, setIsLikePressed] = useState(false);

    const [currUserData, setUserData] = useState({})
    useEffect(() => {
        AsyncStorage.getItem('user').then((data) => {
            if (data) {
                setUserData(JSON.parse(data))
            }
        })
        return () => {
            console.log('ShowUserPosts Component unmounted');
        };
    }, [])
    console.log(currUserData)

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
                setPosts(prev => [...prev, ...data.reverse()]);
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

    return (
        <GestureHandlerRootView>
            <FlatList
                style={[{ height: Dimensions.get('window').height - 30 }]}
                renderItem={({ item }) => (
                    <View style={[styles.verticalContainer, localStyles.postWrapper]}>
                        <View style={[localStyles.horizontalContainer, { flexDirection: 'row' }]}>
                            <TouchableOpacity onPress={() => props.extras.navigation.navigate('Profile')}>
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
                ListHeaderComponent={isProfileSection ? <HeaderComponent styles={styles} userData={userData} /> : <Text style={[styles.heading3, { color: '#fff' }]}>Feed</Text>}
            />
        </GestureHandlerRootView>
    );
};

const HeaderComponent = (props) => {
    const { styles, userData } = props
    const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };
    return (
        <>
            <View style={[{}]}>
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                    <View style={[{ height: 200, backgroundColor: 'red' }]}>

                    </View>
                </ImageBackground>
            </View>
            <View style={[{ position: 'absolute', top: 130, left: 10, zIndex: 2, }]}>

                <Image
                    style={[{
                        width: 150,
                        height: 150,
                        borderRadius: 100,
                        backgroundColor: 'blue',
                    }]}
                    resizeMode='cover'
                    source={image}
                />
            </View>
            <View style={[{ marginVertical: 20, marginTop: 90, paddingHorizontal: 10 }]}>
                <View style={[{ flexDirection: 'row', gap: 15, alignItems: 'center' }]}>
                    <Text style={[{ color: 'white', fontWeight: 'bold', fontSize: 25 }]}>{userData.fullname}</Text>
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
