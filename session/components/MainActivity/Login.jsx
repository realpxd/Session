
import React , {useState} from 'react';
import { View, Text, TouchableOpacity, Image, Form , ActivityIndicator } from 'react-native'
import { HelperText, TextInput } from 'react-native-paper';
import { getGlobalStyles } from '../../globalStyles'
const styles = getGlobalStyles()

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [isLoginBtnClicked, setIsLoginBtnClicked] = useState(false);


    const hasErrors = () => {
        if (email.length == 0) return false;
        return !email.includes('@');
    };

    const handleLogin = () => {
        setIsLoginBtnClicked(true);
        setTimeout(() => {
            setIsLoginBtnClicked(false);
            props.navigation.navigate('Home')
        }, 5000);
    }

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
            <HelperText type="error" visible={hasErrors()}>
                Email address is invalid!
            </HelperText>
            <TouchableOpacity onPress={()=>handleLogin()} style={[styles.btnPrimary, { marginTop: 50 }]}>
                {isLoginBtnClicked ? <ActivityIndicator size="30" color="#fff" /> : 
                <Text style={styles.btnSecondaryText}>Continue</Text>}
            </TouchableOpacity>
        </View>
    )
}

export default Login