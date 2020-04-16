import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import profile from '../../actions/profile';

const Profile = (prop) => {
  const { loadProfile } = prop;
  const profileIsLoaded = prop.userProfile.isLoaded;
  const { userProfile } = prop.userProfile;


  useEffect(() => {
    loadProfile();
  }, []);

  if (profileIsLoaded) {
    return (
      <>
        <h1 className="col-12">
          userName:
          {userProfile.name}
        </h1>
        {' '}
        <h1 className="col-12">
          email:
          {userProfile.email}
        </h1>
      </>
    );
  }

  return !localStorage.getItem('token') && <Redirect to="/registration" />;

  
};


const mapDispatchToProps = (dispatch) => ({
  loadProfile() {
    dispatch(profile());
  },
});

const mapStateToProps = (store) => ({
  userProfile: store.userProfile,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
