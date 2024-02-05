/**
 * @format
 */

import React, { useState } from "react";
import { AppRegistry , Button } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { PaperProvider } from 'react-native-paper';
import { RootContext } from './RootContext'

export default function Main() {
    // const [text, setText] = useState("sda");
    // setText("sdae");

    return (
        // <RootContext.Provider value={{ text, setText }}>
            <PaperProvider>
                <App />
                {/* <Button title="Update text" onPress={() => setText("New text")} /> */}
            </PaperProvider>
        // </RootContext.Provider>
    );
}

AppRegistry.registerComponent(appName, () => App);
