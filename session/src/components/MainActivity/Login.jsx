import { useContext } from 'react';
import { RootContext } from '../../../RootContext';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Form, ActivityIndicator } from 'react-native'
import { HelperText, TextInput } from 'react-native-paper';
import Config from 'react-native-config';
import { getGlobalStyles } from '../../../globalStyles'
import AsyncStorage from '@react-native-async-storage/async-storage';
const styles = getGlobalStyles()

const Login = (props) => {
    const { text, setText } = useContext(RootContext);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [isLoginBtnClicked, setIsLoginBtnClicked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const hasErrors = () => {
        if (email.length == 0 || email.includes('@')) return setErrorMessage('');
        setErrorMessage('Email address is invalid!')
        return !email.includes('@');
    };
    useEffect(() => {
        hasErrors()
    }, [email])

    const handleLogin = () => {
        handleSubmit();
        setIsLoginBtnClicked(true);
    }

    const handleSubmit = async () => {

        if (pass.length < 8) {
            setErrorMessage('Password must be at least 8 characters long!')
            return;
        } else if (email.length < 3) {
            setErrorMessage('Email must be at least 3 characters long!')
            return;
        } else {
            setErrorMessage('')
        }
        var passEmail = email.toLowerCase()

        try {
            const response = await fetch(`${Config.SERVER_URL}/client/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: passEmail, pass }),
            });
            const data = await response.json();
            if (data.message == "Login successful.") {
                setIsLoginBtnClicked(false);
                props.navigation.navigate('NavActivity')
                AsyncStorage.setItem('user', JSON.stringify(data.userData));
            } else {
                setIsLoginBtnClicked(false);
                setErrorMessage(data.message)
            }
        } catch (e) {
            setErrorMessage(e.message)
        }
    }


    return (
        <View style={[styles.wrapperVertical, { justifyContent: 'center', padding: 20 }]}>
            {/* <Image style={[styles.img, { marginTop: 15, marginBottom: -20 }]} source={require('../../public/img/login.png')} /> */}
            <View style={[{ gap: 20 }]}>
                <Text style={[styles.heading1, { color: "#fff" }]}>Sign In {text}</Text>
                <TextInput
                    mode="outlined"
                    label="Email"
                    value={email}
                    style={styles.input}
                    theme={{ colors: { onSurface: "white" } }}
                    placeholderTextColor="#FFF"
                    onChangeText={email => setEmail(email)}
                    left={<TextInput.Icon icon="email" />}
                />
                <TextInput
                    mode="outlined"
                    label="Password"
                    value={pass}
                    style={styles.input}
                    ripple
                    secureTextEntry
                    theme={{ colors: { onSurface: "white" } }}
                    onChangeText={pass => setPass(pass)}
                    left={<TextInput.Icon icon="key" />}
                />

                <View style={[{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }]}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
                        <Text style={[styles.text, { color: '#6B9AC4', textAlign: 'left' }]}>new to session?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Text style={[styles.text, { color: '#6B9AC4', textAlign: 'right' }]}>{
                            //reset password
                        }
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {errorMessage && <HelperText style={{ fontSize: 15 }} type="error">
                {errorMessage}
            </HelperText>}
            <TouchableOpacity onPress={() => handleLogin()} style={[styles.btnPrimary, { marginTop: 50 }]}>
                {isLoginBtnClicked ? <ActivityIndicator size="30" color="#000" /> :
                    <Text style={[styles.btnSecondaryText, { color: '#000', fontWeight: 'bold' }]}>Continue</Text>}
            </TouchableOpacity>
        </View>
    )
}

export default Login