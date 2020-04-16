import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './_navbar.scss';

import { logOut } from '../../actions/auth';


const Navbar = (prop) => {
  const { isLoaded, isAuthenticated } = prop.auth;

  const { userLogOut } = prop;

  const handleLogOut = () => {
    userLogOut();
  };

  return (

    <div className="container">
      <header className="header">

        {!isLoaded && !isAuthenticated
      && (
      <Link to="/registration" className="btn btn-primary header__btn">
        Sign In
      </Link>
      )}

        {!isLoaded && !isAuthenticated
      && (
        <Link to="/auth" className="btn btn-primary header__btn">
          Log in
        </Link>
      )}

        {isLoaded && isAuthenticated
      && (
        <Link to="/home" className="btn btn-primary header__btn">
          Home
        </Link>
      )}

        {isLoaded && isAuthenticated
      && (
        <Link to="/profile" className="btn btn-primary header__btn">
          Profile
        </Link>
      )}

        {isLoaded && isAuthenticated
      && (
        <Link to="/registration" className="btn btn-primary header__btn" onClick={handleLogOut}>
          Log out
        </Link>
      )}
      </header>
    </div>
  );
};
const mapStateToProps = (store) => ({
  auth: store.auth,
});

const mapDispatchToProps = (dispatch) => ({
  userLogOut() {
    dispatch(logOut());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
