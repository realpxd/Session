import { useContext } from 'react';
import { RootContext } from '../../RootContext';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Form, ActivityIndicator } from 'react-native'
import { HelperText, TextInput } from 'react-native-paper';
import { SERVER_URL } from '@env';
import { getGlobalStyles } from '../../globalStyles'
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
        try {
            const response = await fetch(`${SERVER_URL}/client/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, pass }),
            });
            const data = await response.json();
            setIsLoginBtnClicked(false);
            props.navigation.navigate('NavActivity')
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
                        <Text style={[styles.text, { color: '#6B9AC4', textAlign: 'right' }]}>reset password</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {errorMessage && <HelperText style={{ fontSize: 15}} type="error">
                {errorMessage}
            </HelperText>}
            <TouchableOpacity onPress={() => handleLogin()} style={[styles.btnPrimary, { marginTop: 50 }]}>
                {isLoginBtnClicked ? <ActivityIndicator size="30" color="#000" /> :
                    <Text style={styles.btnSecondaryText}>Continue</Text>}
            </TouchableOpacity>
        </View>
    )
}

export default Login