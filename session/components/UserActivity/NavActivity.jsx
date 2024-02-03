import React, { useState } from 'react'
import { View, TouchableOpacity, Image, Form } from 'react-native'
import { BottomNavigation, Text } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Inbox from './Inbox/Inbox';
import Feed from './Feed/Feed';
import Profile from './Profile/Profile';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();



const NavActivity = (props) => {
  const { styles } = props

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };
  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer theme={MyTheme}>
          <Tab.Navigator>
            <Tab.Screen name="Feed"
              options={{
                tabBarLabel: 'Feed',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
              }} >
              {props => <Feed {...props} styles={styles} />}
            </Tab.Screen>
            <Tab.Screen name="Inbox"
              options={{
                tabBarLabel: 'Inbox',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="message-outline" color={color} size={26} />
                ),
              }} >
              {props => <Inbox {...props} styles={styles} />}
            </Tab.Screen>
            <Tab.Screen name="Profile"
              options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="account-outline" color={color} size={26} />
                ),
              }} >
              {props => <Profile {...props} styles={styles} />}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer >
      </SafeAreaProvider>
    </>
  );
};

export default NavActivity