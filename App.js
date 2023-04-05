import React, { useEffect } from 'react';

import { Provider } from 'react-redux';
import store from './redux/store';


// import LoginScreen from './screens/LoginScreen';
import MainContainer from './navigation/MainContainer/MainContainer';

export default function App() {

  return (
    <Provider store={store}>
      < MainContainer />
    </Provider>


  );
}

