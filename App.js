import React, { useEffect } from 'react';

; // import your Redux actions
import { Provider } from 'react-redux';
import store from './redux/store';

// import LoginScreen from './screens/LoginScreen';
import Launcher from './Launcher';

export default function App() {

  return (
    <Provider store={store}>
      < Launcher />
    </Provider>


  );
}

