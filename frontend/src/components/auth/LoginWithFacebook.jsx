import React from 'react';
import FacebookLogin from 'react-facebook-login';

import { connect } from 'react-redux';
import { socialLogin } from '../../store/actions/auth-action';

const LoginWithFacebook = ({ socialLogin }) => {
  const responseFacebook = (response) => {
    const { email, id, name, picture } = response;
    const user = {
      name,
      email,
      password: id,
      avatar: picture && picture.data && picture.data.url,
    };

    socialLogin(user);
  };

  return (
    <FacebookLogin
      icon="fa-facebook"
      appId="617903875531791"
      callback={responseFacebook}
      fields="name,email,picture"
    />
  );
};

export default connect(null, { socialLogin })(LoginWithFacebook);
