import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, Form, StyleSheet, Modal } from 'react-native'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Avatar, Icon, TextInput } from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import ShowPosts from './ShowPosts';
import Config from 'react-native-config';

const username = "nmn"

const CreatePost = (props) => {
    const { styles, post, setPosts, setCPVisible } = props;
    const [postData, setPostData] = useState('');
    const handleCreatePost = async () => {
        try {
            const response = await fetch(`${Config.SERVER_URL}/client/createPost`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postData, username: username }),
            });
            const data = await response.json();
            setPosts(prev => [data.post, ...prev])
            setPostData('');
            setCPVisible(false);
        } catch (e) {
            console.warn(e);
        }
    }

    return (
        <>
            <View style={[localStyles.wrapperVertical, { position: 'absolute', right: 20, left: 20, marginVertical: 250, gap: 0, backgroundColor: '#111', paddingHorizontal: 30, paddingVertical: 30, paddingBottom: 50, borderRadius: 20, elevation: 20, zIndex: 99 }]}>
                <Text style={[styles.heading3, { color: '#fff' }]}>Create Post</Text>
                <TextInput
                    mode="outlined"
                    label="What's on your mind?"
                    value={postData}
                    multiline={true}
                    editable={true}
                    style={styles.input}
                    theme={{ colors: { onSurface: "white" } }}
                    onChangeText={postData => setPostData(postData)}
                    left={<TextInput.Icon icon="dog" color={"#999"} />}
                />
                <TouchableOpacity onPress={() => handleCreatePost()} style={[styles.btnSecondary]}>
                    <Text style={styles.btnSecondaryText}>Create Post</Text>
                </TouchableOpacity>
            </View>
        </>
    )
};


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

export default CreatePost