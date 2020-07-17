import React from 'react';
import GoogleLogin from 'react-google-login';

import { connect } from 'react-redux';
import { googleLogin } from '../../store/actions/auth-action';


const LoginWithGoogle = ({ googleLogin }) => {
  const responseGoogle = response => {
    const { googleId, name, email, imageUrl } = response.profileObj;
    const user = {
      name,
      email,
      avatar: imageUrl,
      password: googleId
    }

    googleLogin(user);
  }


  return (
    <GoogleLogin
      clientId='909923509075-brlokkvcohqbf26sqm5166ahidi66bkq.apps.googleusercontent.com'
      buttonText='Login with Google'
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
    />
  );
}

export default connect(null, { googleLogin })(LoginWithGoogle);
