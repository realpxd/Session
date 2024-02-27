import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, Form, StyleSheet } from 'react-native'
import { Avatar, Icon } from 'react-native-paper';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';

const AllChats = (props) => {
    const { styles } = props
    const [chats, setChats] = useState({})

    const fetchChats = () => {
        // fetch all chats
    }

    return (
        <View style={[localStyles.wrapperVertical, { paddingHorizontal: 15 }]}>

            <GestureHandlerRootView style={[{}]}>
                <FlatList
                    data={chats}
                    renderItem={({ item }) => (
                        <View style={localStyles.chatWrapper}>
                            <View style={localStyles.chatContainer}>
                                <Avatar.Icon size={24} icon="folder" />
                                <View style={localStyles.chatData}>
                                    <Text style={localStyles.chatFrom}>{item.fullname}</Text>
                                    <Text style={localStyles.chatMsg}>{item.message}</Text>
                                </View>
                            </View>
                        </View>
                    )}

                    keyExtractor={item => item._id + Math.random() * 1000}
                    key={item => item._id}
                    // onEndReached={handleFetchMore}
                    onEndReachedThreshold={0}
                    ListFooterComponent={<Text style={[{ alignSelf: 'center', fontSize:32, fontWeight:'bold' }]}>.</Text>}
                    ListHeaderComponent={
                        <View style={[localStyles.wrapperVertical, { gap: 0 }]}>
                            <Text style={[styles.heading3, { color: '#fff' }]}>Inbox</Text>
                            <TouchableOpacity onPress={() => props.extras.navigation.navigate('ChatBuilder', {styles: styles})} style={localStyles.chatWrapper}>
                                <View style={localStyles.chatContainer}>
                                    <Avatar.Icon size={24} icon="folder" />
                                    <View style={localStyles.chatData}>
                                        <Text style={localStyles.chatFrom}>Global Chat</Text>
                                        <Text style={localStyles.chatMsg}>open for all users, chat now!</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>}
                />

            </GestureHandlerRootView>
        </View>
    )
}

const localStyles = StyleSheet.create({
    wrapperVertical: {
        flexDirection: 'column',
        backgroundColor: '#222',
        gap: 10

    },
    chatWrapper: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 20,
        marginVertical: 10
    },
    chatContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    chatData: {
        gap: 5
    },
    chatFrom: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    chatMsg: {
        color: '#888'
    }
})

export default AllChats