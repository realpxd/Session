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
          <MainActivity styles={styles} />
        :
          <NavActivity styles={styles} />
      }
    </>
  );
}


export default App;
