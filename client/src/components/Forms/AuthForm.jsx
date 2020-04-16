import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authn } from '../../actions/auth';
import './_form.scss';

const Auth = (prop) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { userAuthn } = prop;
  const { isLoaded, isAuthenticated } = prop.auth;


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email } = formData;
    const { password } = formData;
    userAuthn(email, password);
  };

  if (isAuthenticated && isLoaded) {
    return <Redirect to="/home" />;
  }

  return (
    <form className="form col-8" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="input-email">
          Email
          <input
            type="email"
            className="form-control"
            id="input-email"
            aria-describedby="emailHelp"
            name="email"
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Enter your email
          </small>
        </label>
        <label htmlFor="input-password">
          Password
          <input
            type="password"
            className="form-control"
            id="input-password1"
            aria-describedby="password1Help"
            name="password"
            onChange={handleChange}
          />
          <small id="password1Help" className="form-text text-muted">
            Enter your password
          </small>
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Sign In
      </button>
    </form>
  );
};

const mapStateToProps = (store) => ({

  auth: store.auth,

});

const mapDispatchToProps = (dispatch) => ({
  userAuthn(email, password) {
    dispatch(authn(email, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
