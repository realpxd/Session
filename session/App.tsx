import React , {useState} from 'react';
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
import Feed from './components/UserActivity/Feed';

const styles = getGlobalStyles();

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <View style={styles.container}>
      {!isUserLoggedIn ? <MainActivity styles={styles} /> : <Feed styles={styles} />}
    </View>
  );
}


export default App;
