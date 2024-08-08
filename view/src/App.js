import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import InvitationPage from './screens/InvitationPage';
import PageNotFound from './screens//PageNotFound';
import { store } from './redux/store';
import { Provider } from 'react-redux';



const theme = extendTheme({
  colors: {
    primary: {
      50: '#e9f5ff',
      100: '#d4e9ff',
      200: '#a8d3ff',
      300: '#7cbcff',
      400: '#4fa6ff',
      500: '#238fff',
      600: '#1a6cc4',
      700: '#134f8a',
      800: '#0d3350',
      900: '#06151c',
    },
  },

});

function App() {
  return (
    <NativeBaseProvider theme={theme} >
      <Provider store={store} >
        <Router >
          <Routes  >
            <Route exact path="/" element={<LoginScreen />} />
            <Route path="/invitation" element={<InvitationPage />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="*" element={<PageNotFound to="/" />} />
          </Routes>
        </Router>
      </Provider>
    </NativeBaseProvider>
  );
}

export default App;
