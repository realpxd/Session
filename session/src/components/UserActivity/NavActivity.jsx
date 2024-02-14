import React, { useState } from 'react'
import { View, TouchableOpacity, Image, Form } from 'react-native'
import { BottomNavigation, Text } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Feed from './Feed/Feed';
import Inbox from './Inbox/Inbox';
import Profile from './Profile/Profile';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

const NavActivity = (props) => {
  const { styles } = props
  var extras = props
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Feed', title: 'Feed', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'Inbox', title: 'Inbox', focusedIcon: 'chat', unfocusedIcon: 'chat-outline' },
    { key: 'Profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon: 'account-outline' }
  ]);
  const renderScene = BottomNavigation.SceneMap({
    Feed: (props) => <Feed {...props} extras={extras} styles={styles} />,
    Inbox: (props) => <Inbox {...props} extras={extras} styles={styles} />,
    Profile: (props) => <Profile {...props} extras={extras} styles={styles} />,
  });


  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
      color: '#fff'
    },
  };
  return (
    <>
      <View style={[styles.container, { padding: 0 }]}>
        <SafeAreaProvider>


          <BottomNavigation
            navigationState={{ index, routes }}
            barStyle={{ backgroundColor: '#111' }}
            activeColor="#fff"
            inactiveColor='#888'
            activeIndicatorStyle={{ backgroundColor: '#333' }}
            onIndexChange={setIndex}
            theme={MyTheme}
            renderScene={renderScene}
          />


          {/* <NavigationContainer theme={MyTheme}>
          <Tab.Navigator barStyle={{ backgroundColor: '#111' }}>
            <Tab.Screen name="Feed"
              options={{
                tabBarLabel: 'Feed',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" focusedIcon='home' unfocusedIcon='home-outline' activeColor="#fff" color={color} inactiveColor="#fff" size={26} />
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
        </NavigationContainer > */}
        </SafeAreaProvider>
      </View>
    </>
  );
};

export default NavActivity