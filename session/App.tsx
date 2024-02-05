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
import { useContext } from 'react';
import { RootContext } from './RootContext';
import { getGlobalStyles } from './globalStyles';
import MainActivity from './components/MainActivity/MainActivity';
import NavActivity from './components/UserActivity/NavActivity';

const styles = getGlobalStyles();

const App = () => {
  // const text = useContext(RootContext);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

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
