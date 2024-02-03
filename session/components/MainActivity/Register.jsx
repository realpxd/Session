import React , {useState} from 'react'
import { View, Text, TouchableOpacity, Image, Form , ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native-paper';

const Register = (props) => {
    const {styles} = props
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [cpass, setCpass] = useState('');
    const [isRegisterBtnClicked, setIsRegisterBtnClicked] = useState(false);

    const handleRegister = () => {
        setIsRegisterBtnClicked(true);
        setTimeout(() => {
            setIsRegisterBtnClicked(false);
            props.navigation.navigate('Home')
        }, 5000);
    }
    return (
        <View style={[styles.wrapperVertical, { justifyContent: 'center', gap: 50 }]}>

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
                    value={pass}
                    style={styles.input}
                    theme={{ colors: { onSurface: "white" } }}
                    secureTextEntry
                    onChangeText={pass => setPass(pass)}
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
            </View>
            <TouchableOpacity onPress={()=> handleRegister()} style={[styles.btnSecondary]}>
                {isRegisterBtnClicked ? <ActivityIndicator size="30" color="#fff" /> : 
                <Text style={styles.btnSecondaryText}>Continue</Text>}
            </TouchableOpacity>
        </View>
    )
}

export default Register