import React from 'react'
import { View, Text, TouchableOpacity, Image, Form } from 'react-native'
import { getGlobalStyles } from '../../globalStyles'
import {  IconButton } from 'react-native-paper'
const styles = getGlobalStyles()

const Home = (props) => {
    return (
        <View style={[styles.wrapperVertical, { justifyContent: 'center', gap: 100 }]}>
            <View>
                <Image style={[styles.img, { marginTop: 15 }]} source={require('../../public/img/logo.png')} />
                {/* <Text style={[styles.heading2, { textAlign: 'center', color:"#fff" }]}>Look around!</Text> */}
                {/* <Text style={[styles.text, { fontWeight: '500' }]}>An original app built by Naman Saini, A Passionate Software Developer. Source code is published on github. If you are also a developer and want to contribute then go ahead, contributions are appreciated!</Text> */}
            </View>
            <View>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                    <TouchableOpacity style={[styles.btnPrimary, { backgroundColor: "#4059AD", width: 340, display: 'flex', flexDirection: 'row', alignItems: 'center', }]} onPress={() => props.navigation.navigate('Login')}>

                        <IconButton
                            icon="google"
                            iconColor={"white"}
                            size={20}
                            onPress={() => console.log('Pressed')}
                        />

                        <Text style={[styles.btnPrimaryText, { textAlign: 'left', paddingLeft:0 }]}>Sign up with Google</Text>
                    </TouchableOpacity>

                    <Text style={styles.text}>or</Text>

                    <TouchableOpacity style={[styles.btnPrimary, { width: 340 }]} onPress={() => props.navigation.navigate('Login')}>
                        <Text style={styles.btnPrimaryText}>Sign in</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <Text style={[styles.text, { textAlign: 'center', marginTop: 15, color: '#ccc' }]}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
                        <Text style={[styles.text, { textAlign: 'center', marginTop: 15, fontWeight: 'bold' }]}> Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Home