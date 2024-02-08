import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Form, ActivityIndicator } from 'react-native'
import { TextInput, HelperText } from 'react-native-paper';
import { SERVER_URL } from '@env';

const Register = (props) => {
    const { styles } = props
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPass] = useState('');
    const [cpass, setCpass] = useState('');
    const [isRegisterBtnClicked, setIsRegisterBtnClicked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = () => {
        handleSubmit();
        setIsRegisterBtnClicked(true);
    }

    const hasErrors = () => {
        if (email.length == 0 || email.includes('@')) return setErrorMessage('');
        setErrorMessage('Email address is invalid!')
        return !email.includes('@');
    };
    useEffect(() => {
        hasErrors()
    }, [email])


    const handleSubmit = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/client/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            setErrorMessage(data.message)
            setIsRegisterBtnClicked(false);
            props.navigation.navigate('NavActivity')
        } catch (e) {
            setErrorMessage(e.message)
        }
    }

    return (
        <View style={[styles.wrapperVertical, { justifyContent: 'center', gap: 25, padding: 20 }]}>

            {/* <Image style={[styles.img, { marginTop: 15, marginBottom: -20 }]} source={require('../../public/img/register.png')} /> */}
            <View style={[{ gap: 20 }]}>
                <Text style={[styles.heading1, { color: "#fff" }]}>Sign up</Text>
                <TextInput
                    mode="outlined"
                    label="Email"
                    value={email}
                    style={styles.input}
                    theme={{ colors: { onSurface: "white" } }}
                    onChangeText={email => setEmail(email)}
                    left={<TextInput.Icon icon="email" />}
                />
                <TextInput
                    mode="outlined"
                    label="Name"
                    value={name}
                    style={styles.input}
                    theme={{ colors: { onSurface: "white" } }}
                    onChangeText={name => setName(name)}
                    left={<TextInput.Icon icon="account" />}
                />
                <TextInput
                    mode="outlined"
                    label="Password"
                    value={password}
                    style={styles.input}
                    theme={{ colors: { onSurface: "white" } }}
                    secureTextEntry
                    onChangeText={password => setPass(password)}
                    left={<TextInput.Icon icon="key" />}
                />
                <TextInput
                    mode="outlined"
                    label="Confirm Password"
                    value={cpass}
                    style={styles.input}
                    theme={{ colors: { onSurface: "white" } }}
                    secureTextEntry
                    onChangeText={cpass => setCpass(cpass)}
                    left={<TextInput.Icon icon="key" />}
                />
                <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                    <Text style={[styles.text, { color: '#6B9AC4', textAlign: 'left' }]}>already have an account?</Text>
                </TouchableOpacity>
                {errorMessage && <HelperText style={{ fontSize: 15, textAlign: 'center' }} type="error">
                    {errorMessage}
                </HelperText>}
            </View>
            <TouchableOpacity onPress={() => handleRegister()} style={[styles.btnSecondary]}>
                {isRegisterBtnClicked ? <ActivityIndicator size="30" color="#fff" /> :
                    <Text style={styles.btnSecondaryText}>Continue</Text>}
            </TouchableOpacity>
        </View>
    )
}

export default Register