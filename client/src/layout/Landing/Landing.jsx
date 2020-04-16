import React from 'react';
import './_landing.scss';
import { Route } from 'react-router-dom';
import Reg from '../../components/Forms/RegForm';
import Auth from '../../components/Forms/AuthForm';
import Home from '../../components/Home/Home';
import Profile from '../../components/Profile/Profile';

const Landing = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <Route path="/registration">
          <Reg />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </div>
    </div>
  );
};
export default Landing;
