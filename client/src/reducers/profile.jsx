import { PROFILE_LOADED, PROFILE_ERROR } from '../actions/actyonTypes';

const initialState = {
  userProfile: null,
  isLoaded: false,
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADED: {
      return {
        ...state,
        userProfile: action.payload,
        isLoaded: true,
      };
    }

    case PROFILE_ERROR: {
      return {
        ...state,
        userProfile: false,
        isLoaded: false,
      };
    }

    default:
      return state;
  }
};

export default profile;
