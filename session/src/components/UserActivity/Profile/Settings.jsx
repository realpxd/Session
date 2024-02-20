import React from 'react'
import { TouchableOpacity, View, Text, Linking, Image } from 'react-native'
import { Icon } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = (props) => {
    const { styles } = props
    // const { handleLogout } = props.route.params

    console.log(props);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            props.navigation.navigate('Home');
        } catch (e) {
            console.warn(e);
        }
    };

    const image = require('../../../../public/img/settings.jpg');
    return (

        <>
            <View style={[{ paddingHorizontal: 10, flex: 1, flexDirection: 'column', justifyContent: 'space-between', paddingVertical: 10, paddingBottom: 25 }]}>
                <Text style={styles.heading2}>Settings</Text>

                <View style={[{gap:10}]}>
                    <View
                        style={[{
                            width: 350,
                            height: 200,
                            borderRadius: 20,
                            backgroundColor: '#333',
                            alignSelf: 'center',
                            elevation:5
                        }]} />
                    {/* <Image
                        style={[{
                            width: 350,
                            height: 200,
                            borderRadius: 10,
                            alignSelf:'center'
                        }]}
                        resizeMode='cover'
                        source={image}
                    /> */}
                    <Text style={[styles.heading3, { fontSize: 20, alignSelf: 'center', color: '#fff' }]}>Developed By Naman Saini with ❤</Text>
                    <TouchableOpacity
                        onPress={() => Linking.openURL("https://github.com/realpxd/Session").catch(err => console.error('An error occurred', err))}

                        style={[styles.btnPrimary,
                        {
                            backgroundColor: 'skyblue'
                        },
                        ]}>
                        <Text style={[styles.btnPrimaryText, { color: '#000' }]}>Source Code</Text>

                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => handleLogout()}

                    style={[styles.btnPrimary,
                    {
                        backgroundColor: 'red'
                    },
                    ]}>
                    <Text style={[styles.btnPrimaryText, { color: '#fff' }]}>Logout</Text>

                </TouchableOpacity>
            </View>

        </>
    )
}

export default Settings