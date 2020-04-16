import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './layout/Navbar/Navbar';
import Landing from './layout/Landing/Landing';
import Alert from './components/Alert/Alert';
import store from './store';
import { loadUser } from './actions/auth';

import './App.scss';


const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Alert />
          <Landing />
        </>
      </Router>
    </Provider>
  );
};

export default App;
