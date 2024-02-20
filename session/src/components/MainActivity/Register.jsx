import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Form, ActivityIndicator } from 'react-native'
import { TextInput, HelperText } from 'react-native-paper';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = (props) => {
    const { styles } = props
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
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

        if (password !== cpass) {
            setErrorMessage('Passwords do not match!')
            return;
        } else if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long!')
            return;
        } else if (name.length < 3) {
            setErrorMessage('Name must be at least 3 characters long!')
            return;
        } else if (username.length < 3) {
            setErrorMessage('Username must be at least 3 characters long!')
            return;
        } else if (email.length < 3) {
            setErrorMessage('Email must be at least 3 characters long!')
            return;
        } else {
            setErrorMessage('')
        }

        var passEmail = email.toLowerCase()

        try {
            const response = await fetch(`${Config.SERVER_URL}/client/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email: passEmail, password, username }),
            });
            const data = await response.json();
            if (data.message === "Account created successfully :)") {
                setErrorMessage(data.message)
                setIsRegisterBtnClicked(false);
                props.navigation.navigate('NavActivity')
                AsyncStorage.setItem('user', JSON.stringify(data.userData));
                // console.log("AsyncStorage.getItem('user')")
                // console.log(AsyncStorage.getItem('user'))
                // console.log(data.userData)
            } else {
                setIsRegisterBtnClicked(false);
                setErrorMessage(data.message)
            }
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
                    label="Name"
                    value={name}
                    style={styles.input}
                    theme={{ colors: { onSurface: "white" } }}
                    onChangeText={name => setName(name)}
                    left={<TextInput.Icon icon="account" />}
                />
                <TextInput
                    mode="outlined"
                    label="Username"
                    value={username}
                    style={styles.input}
                    theme={{ colors: { onSurface: "white" } }}
                    onChangeText={username => setUsername(username)}
                    left={<TextInput.Icon icon="wizard-hat" />}
                />
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