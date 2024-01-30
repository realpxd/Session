import React from 'react'
import { View, Text, TouchableOpacity, Image, Form } from 'react-native'
import { getGlobalStyles } from '../../globalStyles'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';

import Home from './Home'
import Register from './Register'
import Login from './Login'

const Stack = createStackNavigator();
const styles = getGlobalStyles()

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent'
  },
};

const MainActivity = (props) => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4059AD',
            borderRadius: 30,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: {
              height: 10,
            },
          },
          headerTitleStyle: {
            fontSize: 25,
          },
          headerTintColor: '#fff',
        }}>
        <Stack.Screen name="Home" component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login}
          options={
            {
              headerStyle: {
                backgroundColor: '#F4B942',
                borderRadius: 30,
                elevation: 5,
                shadowColor: '#000',
                shadowOffset: {
                  height: 10,
                },
              }
            }
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}



export default MainActivity