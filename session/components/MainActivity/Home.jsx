import React from 'react'
import { View, Text, TouchableOpacity, Image, Form } from 'react-native'
import { getGlobalStyles } from '../../globalStyles'
const styles = getGlobalStyles()

const Home = (props) => {
    return (
        <View style={styles.wrapperVertical}>
            <View>
                <Image style={[styles.img, { marginTop: 15 }]} source={require('../../public/img/mainActivity.png')} />
                <Text style={[styles.heading1, { textAlign: 'left' }]}>Session!</Text>
                <Text style={[styles.text, { fontWeight: '500' }]}>An original app built by Naman Saini, A Passionate Software Developer. Source code is published on github. If you are also a developer and want to contribute then go ahead, contributions are appreciated!</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.btnPrimary} onPress={() => props.navigation.navigate('Login')}>
                    <Text style={styles.btnPrimaryText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btnSecondary, { marginBottom: 20 }]} onPress={() => props.navigation.navigate('Register')}>
                    <Text style={styles.btnSecondaryText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Home