import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, Form } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme, useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';

import Home from './Home'
import Register from './Register'
import Login from './Login'
import NavActivity from '../UserActivity/NavActivity';
import Profile from '../UserActivity/Profile/Profile';
import Settings from '../UserActivity/Profile/Settings';
import AllChats from '../UserActivity/Inbox/AllChats';
import ChatBuilder from '../UserActivity/Inbox/ChatBuilder';

const Stack = createStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const MainActivity = (props) => {
  const { styles } = props
  return (
    <View style={[styles.container, { padding: 0 }]}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Home"
          >
            {props => <Home {...props} styles={styles} />}
          </Stack.Screen>
          <Stack.Screen name="Register"
          >
            {props => <Register {...props} styles={styles} />}
          </Stack.Screen>
          <Stack.Screen name="Login"
          >
            {props => <Login {...props} styles={styles} />}
          </Stack.Screen>
          <Stack.Screen name="NavActivity"
            options={
              {
                headerShown: false,
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
          >
            {props => <NavActivity {...props} styles={styles} />}
          </Stack.Screen>
          <Stack.Screen name="Profile"
            options={
              {
                headerShown: false,
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
          >
            {props => <Profile {...props} styles={styles} />}
          </Stack.Screen>
          <Stack.Screen name="Settings"
            options={
              {
                headerShown: false,
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
          >
            {props => <Settings {...props} styles={styles} />}
          </Stack.Screen>
          <Stack.Screen name="ChatBuilder"
            options={
              {
                headerShown: false,
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
          >
            {props => <ChatBuilder {...props} styles={styles} />}
          </Stack.Screen>
          <Stack.Screen name="AllChats"
            options={
              {
                headerShown: false,
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
          >
            {props => <AllChats {...props} styles={styles} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}



export default MainActivity