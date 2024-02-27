import React, { useState } from 'react'
import { Avatar, Icon, Text, TextInput } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity } from 'react-native'

const ChatBuilder = (props) => {
    console.log("props: ", props.route.params.styles)
    const { styles } = props.route.params

    const [text, setText] = useState('')

    return (
        <View style={[{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }]}>
            <View style={[{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingTop: 5, borderBottomWidth: 1, borderBottomColor: '#444', alignItems: 'center' }]}>
                <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 15 }]}>
                    <Avatar.Icon size={34} icon="folder" />
                    <Text style={[styles.heading2, { color: '#fff', fontSize: 30 }]}>Global Chat</Text>
                </View>
                <Icon
                    source={'dots-vertical'}
                    size={34}
                    color={'white'}
                />
            </View>
            <View>
                <View style={[{ paddingHorizontal: 15 }]}>
                    <View style={[styles.msgFactory, { alignSelf: 'flex-start', backgroundColor: '#444', padding: 15, borderRadius: 10, position: 'relative' }]}>
                        <Text style={[styles.text, { position: 'absolute', fontSize: 10, top: 2, left: 7, color: '#999' }]}>username</Text>
                        <Text style={styles.text}>Their Message</Text>
                    </View>
                    <View style={[styles.msgFactory, { alignSelf: 'flex-end', backgroundColor: '#F4B942', padding: 15, borderRadius: 10, position: 'relative' }]}>
                        {/* <Text style={[styles.text, { position: 'absolute', fontSize: 10, top: 2, left: 7, color: '#111' }]}>username</Text> */}
                        <Text style={[styles.text, { color: '#000' }]}>My Message</Text>
                    </View>
                </View>
                <View style={[{ position: 'relative' }]}>
                    <TextInput
                        placeholder='Type a message...'
                        value={text}
                        onChangeText={text => setText(text)}
                        style={[{ marginTop: 20, backgroundColor: 'transparent', color: '#fff', borderTopWidth: 1, borderTopColor: '#444' }]}
                        theme={{ colors: { onSurface: "white", primary: "white" } }}
                        right={<TextInput.Icon icon="send" color="white" onPress={() => console.log("hey")} />}

                    />
                </View>
            </View>
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

export default ChatBuilder