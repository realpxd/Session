import React from 'react'
import { View, Text, TouchableOpacity, Image, Form } from 'react-native'
import { TextInput } from 'react-native-paper';
import { getGlobalStyles } from '../../globalStyles'
const styles = getGlobalStyles()

const Register = (props) => {
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [cpass, setCpass] = React.useState('');
    return (
        <View style={styles.wrapperVertical}>

            <Image style={[styles.img, { marginTop: 15, marginBottom: -20 }]} source={require('../../public/img/register.png')} />
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
                    label="Name"
                    value={name}
                    onChangeText={name => setName(name)}
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
                <TextInput
                    mode="outlined"
                    label="Confirm Password"
                    value={cpass}
                    secureTextEntry
                    onChangeText={cpass => setCpass(cpass)}
                    right={<TextInput.Affix text="" />}
                />
            </View>
            <TouchableOpacity style={[styles.btnSecondary, { marginBottom: 20 }]}>
                <Text style={styles.btnSecondaryText}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Register