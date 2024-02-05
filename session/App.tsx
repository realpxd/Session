import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';
import { getGlobalStyles } from './globalStyles';
import MainActivity from './components/MainActivity/MainActivity';
import NavActivity from './components/UserActivity/NavActivity';

const styles = getGlobalStyles();

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  return (
    <>
      {!isUserLoggedIn ?
        <View style={styles.container}>
          <MainActivity styles={styles} />
        </View>
        :
        <View style={[styles.container , {padding:0}]}>
          <NavActivity styles={styles} />
        </View>
      }
    </>
  );
}


export default App;
