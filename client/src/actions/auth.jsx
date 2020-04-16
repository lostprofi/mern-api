import axios from 'axios';
import alert from './alert';
import {
  AUTHN_SUCCESS, AUTHN_ERROR, USER_LOADED, AUTHR_ERROR, LOG_OUT
} from './actyonTypes';


// authorisation action or loadUser action - return users data from server
// and already have it while user isn't logout
// @GET request to auth return user data

export const loadUser = () => async (dispatch) => {
  try {
    const { token } = localStorage;

    if (token) {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      const res = await axios.get('/api/auth', config);


      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTHR_ERROR,
    });
  }
};
// Authentification action
// @POST to auth
// get res = {token}

export const authn = (email, password) => async (dispatch) => {
  try {
    const user = {
      email,
      password,
    };

    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    const body = JSON.stringify(user);

    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: AUTHN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: AUTHN_ERROR,
    });

    const { errors } = err.response.data;
    
    errors.forEach((error) => {
      dispatch(alert(error.msg, 'danger'));
    });
  }
};

// log out action

export const logOut = () => {

  return {
    type: LOG_OUT,
  };
}