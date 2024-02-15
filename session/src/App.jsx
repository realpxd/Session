// App.tsx
import React, { useState, useContext } from 'react';
import { getGlobalStyles } from '../globalStyles';
import { Text } from 'react-native';
import MainActivity from './components/MainActivity/MainActivity';
import NavActivity from './components/UserActivity/NavActivity';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../index'; // Import AppContext directly
import Config from 'react-native-config';


const styles = getGlobalStyles();

const App = () => {
  // const { warehouse, setWarehouse } = useContext(AppContext);

  // console.log('App.tsx: warehouse: ', warehouse);

  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  // AsyncStorage.setItem('user', JSON.stringify({
  //   "username": "nmn",
  //   fullname: "Naman Saini",
  //   "email": "thisisnamansaini@gmail.com",
  //   "password": "1234",
  //   "profilePic": " ",
  //   "bio": "this is my bio....",
  //   "followers": [],
  //   "following": [],
  //   "posts": []
  // }));

  // AsyncStorage.getItem('user').then((value) => {
  //   if (value) {
  //     setIsUserLoggedIn(true)
  //   }else{
  //     setIsUserLoggedIn(false)
  //   }
  // }
  // );
  // console.log(isUserLoggedIn)

  return (
    <>
      {/* <Text>{Config.SERVER_PORT} {Config.SERVER_URL}</Text> */}
      {/* {!isUserLoggedIn ? */}
        <MainActivity styles={styles} />
        {/* :
        <NavActivity styles={styles} />
      } */}
    </>
  );
}

export default App;
