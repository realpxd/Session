import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, Form, StyleSheet, Modal, Dimensions, ActivityIndicator } from 'react-native'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Avatar, Icon, TextInput } from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import Config from 'react-native-config';

const username = "nmn"

const ShowPosts = (props) => {
    const { setPosts, post, styles, setErrorMessage } = props;
    console.log(props)
    const [isLiked, setIsLiked] = useState(0)
    const [copying, setCopying] = useState(false)
    const [copyiedPostId, setCopyiedPostId] = useState('')
    const [scrolled, setScrolled] = useState(false)
    const [isLikePressed, setIsLikePressed] = useState(false)

    const handleLikePost = async (postId, currentLikes) => {
        setIsLikePressed(true)
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

            // Find the index of the post with the given id
            // const index = post.findIndex(item => item._id === postId);

            // // Create a new post array
            // const newPosts = [...post];

            // // Replace the post at the found index with the updated post
            // newPosts[index] = updatedPost;

            // // Update the state
            // setPosts(newPosts);

            setPosts(post.map(item => item._id === postId ? updatedPost : item))
            setIsLikePressed(false)
        } catch (e) {
            console.warn(e);
            setIsLikePressed(false)
        }
    };

    const handleFetchMore = async () => {
        try {
            const response = await fetch(`${Config.SERVER_URL}/client/getPosts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log(data)
            setPosts(prev => [...prev, ...data.reverse()])
        } catch (e) {
            setErrorMessage(e.message)
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
            setCopyiedPostId('')
        }, 1000);
        // Optionally, you can show a message or perform any other actions after copying.
    };

    return (
        <GestureHandlerRootView>
            <FlatList style={[{ height: Dimensions.get('window').height - 30, }]}
                renderItem={({ item }) => (
                    <View style={[styles.verticalContainer, localStyles.postWrapper]}>
                        <View style={[localStyles.horizontalContainer, { flexDirection: 'row' }]}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>

                                <Avatar.Icon size={24} icon="account" />
                            </TouchableOpacity>
                            {/* <Avatar.Image size={24} source={require('../assets/avatar.png')} /> */}
                            <Text style={styles.text}>{item.username}</Text>
                        </View>
                        <View style={localStyles.postDataContainer}>
                            <Text style={[styles.text, { color: '#fff' }]}>{item.postData ? item.postData : "..."}</Text>
                        </View>
                        <View style={[localStyles.horizontalContainer, localStyles.postIconsContainer]}>
                            <TouchableOpacity style={{ flexDirection: 'row', gap: 3 }} onPress={() => handleLikePost(item._id, item.likes)}>
                                <Icon
                                    source={item.likedBy && item.likedBy.includes(username) ? "heart" : "heart-outline"}
                                    size={20}
                                    color={item.likedBy && item.likedBy.includes(username) ? "red" : "white"}
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
                            <TouchableOpacity onPress={() => handleCopy(item.postData, item._id)}>
                                <Icon
                                    source={copying && copyiedPostId == item._id ? 'blur' : 'content-copy'}
                                    size={20}
                                    color='white'
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
                ListFooterComponent={<ActivityIndicator size={'large'} />}
                ListHeaderComponent={<Text style={[styles.heading3, { color: '#fff' }]}>Feed</Text>}
            // refreshing={refreshing}
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
        marginVertical: 10
    },
    postIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})

export default ShowPosts