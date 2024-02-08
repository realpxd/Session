// App.tsx
import React, { useState, useContext } from 'react';
import { getGlobalStyles } from './globalStyles';
import MainActivity from './components/MainActivity/MainActivity';
import NavActivity from './components/UserActivity/NavActivity';
import { AppContext } from './index'; // Import AppContext directly

const styles = getGlobalStyles();

const App = () => {
  // const { warehouse, setWarehouse } = useContext(AppContext);

  // console.log('App.tsx: warehouse: ', warehouse);
  let isUserLoggedIn = true;

  return (
    <>
      {!isUserLoggedIn ?
        <MainActivity styles={styles}  />
        :
        <NavActivity styles={styles} />
      }
    </>
  );
}

export default App;
