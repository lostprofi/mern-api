import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Home = (prop) => {
  const { user } = prop;

  if (user) {
    return (
      <h1>
        Hello,
        {user.name}
      </h1>
    );
  }

  return !localStorage.getItem('token') && <Redirect to="/registration" />;
};


const mapStateToProps = (store) => ({
  user: store.auth.user,

});

export default connect(mapStateToProps, null)(Home);
