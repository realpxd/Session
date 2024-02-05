import React, { useState, createContext } from 'react';
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
import RootContext  from './RootContext';
import { getGlobalStyles } from './globalStyles';
import MainActivity from './components/MainActivity/MainActivity';
import NavActivity from './components/UserActivity/NavActivity';

const styles = getGlobalStyles();
const appContext = createContext(1)

const App = () => {
  // const text = useContext(RootContext);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [globalState, setGlobalState] = useState(1)

  return (
      <appContext.Provider value={[globalState, setGlobalState]}>
      {!isUserLoggedIn ?
          <MainActivity styles={styles} />
        :
          <NavActivity styles={styles} />
      }
    </appContext.Provider>
  );
}


export default App;
export { AppContext }
