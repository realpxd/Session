import React from 'react'
import { View, Text, TouchableOpacity, Image, Form } from 'react-native'
import { TextInput } from 'react-native-paper';
import { getGlobalStyles } from '../../globalStyles'
const styles = getGlobalStyles()

const Login = (props) => {
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');
    return (
        <View style={styles.wrapperVertical}>

            <Image style={[styles.img, { marginTop: 15, marginBottom: -20 }]} source={require('../../public/img/login.png')} />
            <View style={[{ gap: 20 }]}>
                <TextInput
                    mode="outlined"
                    label="Email"
                    value={email}
                    onChangeText={email => setEmail(email)}
                    right={<TextInput.Affix text="" />}
                />
                <TextInput
                    mode="outlined"
                    label="Password"
                    value={pass}
                    secureTextEntry
                    onChangeText={pass => setPass(pass)}
                    right={<TextInput.Affix text="" />}
                />
                <Text style={[styles.text, { color: '#4059AD', textAlign: 'right' }]}>Forgot Password?</Text>
            </View>
            <TouchableOpacity style={[styles.btnPrimary, { marginBottom: 20 }]}>
                <Text style={styles.btnPrimaryText}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login