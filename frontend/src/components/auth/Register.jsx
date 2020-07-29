import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';

import emailValidate from '../../utils/emailValidate';

import { connect } from 'react-redux';
import { registerUser } from '../../store/actions/auth-action';

import useRecaptcha from '../hooks/useRecaptcha';

import Recaptcha from './Recaptcha';
import { Input, Button, FormWrapper } from '../common';

const Register = ({ isAuth, registerUser }) => {
  const { register, handleSubmit, errors, watch } = useForm();
  const { verify, verifyMsg, setVerify, setVerifyMsg } = useRecaptcha();

  const submit = (data) => {
    const { name, email, password } = data;

    if (verify) {
      registerUser(name, email, password);
    }
  };

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <FormWrapper submitHandler={handleSubmit(submit)} title="Register Form">
      <Input
        type="text"
        name="name"
        label="Full Name"
        ref={register({
          required: 'Name is required.',
          minLength: {
            value: 3,
            message: 'Name must be at least 3 characters long.',
          },
          validate: (value) =>
            value.split(' ').length > 1
              ? undefined
              : 'Please write your full name.',
        })}
        err={errors.name && errors.name.message}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        ref={register({
          required: 'Email is required.',
          validate: (value) =>
            emailValidate(value) ? undefined : 'Email address is not valid.',
        })}
        err={errors.email && errors.email.message}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        ref={register({
          required: 'Password is required.',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters long.',
          },
        })}
        err={errors.password && errors.password.message}
      />
      <Input
        label="Repeat Password"
        name="rePassword"
        type="password"
        ref={register({
          required: 'Password verification is required.',
          validate: (value) =>
            value !== watch('password')
              ? "The password fields don't match"
              : undefined,
        })}
        err={errors.rePassword && errors.rePassword.message}
      />

      <Recaptcha setVerify={setVerify} verify={verify} verifyMsg={verifyMsg} />

      <Button
        type="submit"
        light
        animation
        clickHandler={() => setVerifyMsg(true)}
      >
        Register
      </Button>
    </FormWrapper>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.userId,
});

export default connect(mapStateToProps, { registerUser })(Register);
