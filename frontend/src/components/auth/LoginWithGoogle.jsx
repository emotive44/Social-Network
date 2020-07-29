import React from 'react';
import GoogleLogin from 'react-google-login';

import { connect } from 'react-redux';
import { socialLogin } from '../../store/actions/auth-action';

const LoginWithGoogle = ({ socialLogin }) => {
  const responseGoogle = (response) => {
    const { googleId, name, email, imageUrl } = response.profileObj;
    const user = {
      name,
      email,
      avatar: imageUrl,
      password: googleId,
    };

    socialLogin(user);
  };

  return (
    <GoogleLogin
      clientId="909923509075-7otdb7e55tablj3qi3f3n1i84qcmjqis.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
    />
  );
};

export default connect(null, { socialLogin })(LoginWithGoogle);
