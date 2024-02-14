// index.js
import React, { useState, createContext } from 'react';
import { AppRegistry, Button } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { PaperProvider } from 'react-native-paper';

// Create and export AppContext using createContext
export const AppContext = createContext();

export default function Main() {
    const [warehouse, setWarehouse] = useState({
        isUserLoggedIn: false,
        // other properties if needed
      });

  return (
    <AppContext.Provider value={{ warehouse, setWarehouse }}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </AppContext.Provider>
  );
}

AppRegistry.registerComponent(appName, () => App);
