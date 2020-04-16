import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './_form.scss';
import alert from '../../actions/alert';
import reg from '../../actions/registration';

const Reg = (prop) => {
  const { setAlert } = prop;
  const { registration } = prop;
  const history = useHistory();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    password2: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.password1 !== formData.password2) {
      setAlert(
        'You entered two different passwords. Please try again.',
        'danger',
      );
    }

    const { name } = formData;
    const password = formData.password1;
    const { email } = formData;

    registration(name, email, password);
    setTimeout(() => {
      history.push('/auth');
    }, 6000);
  };
  
  return (
    <form className="form col-8" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="input-name">
          Username
          <input
            type="text"
            className="form-control"
            id="input-name"
            aria-describedby="emailHelp"
            name="name"
            onChange={handleChange}
          />
          <small id="nameHelp" className="form-text text-muted">
            Enter your name
          </small>
        </label>
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
        <label htmlFor="input-password1">
          Password
          <input
            type="password"
            className="form-control"
            id="input-password1"
            aria-describedby="password1Help"
            name="password1"
            onChange={handleChange}
          />
          <small id="password1Help" className="form-text text-muted">
            Enter your password
          </small>
        </label>
        <label htmlFor="input-password2">
          Confirm Password
          <input
            type="password"
            className="form-control"
            id="input-password2"
            aria-describedby="password2Help"
            name="password2"
            onChange={handleChange}
          />
          <small id="password2Help" className="form-text text-muted">
            Enter your password
          </small>
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

const mapStateToProps = (store) => ({
  store,
});

const mapDispatchToProps = (dispatch) => ({
  setAlert(msg, alertType) {
    dispatch(alert(msg, alertType));
  },

  registration(name, email, password) {
    dispatch(reg(name, email, password));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(Reg);
