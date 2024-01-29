import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { getGlobalStyles } from '../../globalStyles'

const MainActivity = () => {
  const styles = getGlobalStyles()
  return (
    <View style={styles.wrapperVertical}>
      <View>
        <Text style={[styles.heading1, { textAlign: 'center' }]}>Session!</Text>
        <Image style={[styles.img, { marginTop: 15 }]} source={require('../../public/img/mainActivity.png')} />
        <Text style={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis accusantium quasi dolores totam inventore temporibus quidem commodi rerum est laborum dolore maiores veritatis quibusdam doloremque sapiente veniam, eius dignissimos repudiandae?</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnPrimaryText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.btnSecondaryText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MainActivity