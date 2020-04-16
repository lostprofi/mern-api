import axios from 'axios';
import { PROFILE_LOADED, PROFILE_ERROR } from './actyonTypes';
import alert from './alert';

const loadProfile = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    if (token) {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      const res = await axios.get('/api/profile', config);

      dispatch({
        type: PROFILE_LOADED,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
    });

    const { errors } = err.respopnse.data;

    errors.forEach((error) => {
      dispatch(error.msg, 'danger');
    });
  }
};

export default loadProfile;
