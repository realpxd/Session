
import * as React from 'react';
import { View, Text, TouchableOpacity, Image, Form } from 'react-native'
import { HelperText, TextInput } from 'react-native-paper';
import { Icon, MD3Colors } from 'react-native-paper';
import { getGlobalStyles } from '../../globalStyles'
const styles = getGlobalStyles()

const Login = (props) => {
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');


    const hasErrors = () => {
        if (email.length == 0) return false;
        return !email.includes('@');
    };

    return (
        <View style={[styles.wrapperVertical, { justifyContent: 'center' }]}>
            {/* <Image style={[styles.img, { marginTop: 15, marginBottom: -20 }]} source={require('../../public/img/login.png')} /> */}
            <View style={[{ gap: 20 }]}>
                <Text style={[styles.heading1, { color: "#fff" }]}>Sign In</Text>
                <TextInput
                    mode="outlined"
                    label="Email"
                    value={email}
                    style={styles.input}
                    theme={{ colors: { onSurface: "white" } }}
                    placeholderTextColor="#FFF"
                    onChangeText={email => setEmail(email)}
                    right={<TextInput.Affix text="" />}
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
                    right={<TextInput.Icon icon="eye" />}
                />

                <Text style={[styles.text, { color: '#6B9AC4', textAlign: 'right' }]}>Forgot Password?</Text>
            </View>
            <HelperText type="error" visible={hasErrors()}>
                Email address is invalid!
            </HelperText>
            <TouchableOpacity style={[styles.btnPrimary, { marginTop: 50 }]}>
                <Text style={styles.btnPrimaryText}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login