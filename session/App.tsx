import React from 'react';
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

const App = () => {
  const styles = getGlobalStyles();
  return (
    <View style={styles.container}>
      <MainActivity />
    </View>
  );
}


export default App;
