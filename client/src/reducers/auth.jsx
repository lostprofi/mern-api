import {
  AUTHN_SUCCESS, AUTHN_ERROR, USER_LOADED, AUTHR_ERROR, LOG_OUT,
} from '../actions/actyonTypes';
import { logOut } from '../actions/auth';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoaded: null,
  user: null,
};


const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTHN_SUCCESS:
      localStorage.setItem('token', action.payload.token);

      return {
        ...state,
        isAuthenticated: true,
      };
    case (AUTHN_ERROR,
    AUTHR_ERROR, LOG_OUT):
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        isLoaded: false,
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoaded: true,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default auth;
