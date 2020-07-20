import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, Link } from 'react-router-dom';
import './Login.scss';

import emailValidate from '../../utils/emailValidate';
// import customRecaptcha from '../../utils/customRecaptcha';

import { connect } from 'react-redux';
import { login } from '../../store/actions/auth-action';

import useRecaptcha from '../hooks/useRecaptcha';

import Recaptcha from './Recaptcha';
import LoginWithGoogle from './LoginWithGoogle';
import LoginWithFacebook from './LoginWithFacebook';
import { Input, Button, FormWrapper } from '../common';


const Login = ({ isAuth, login }) => {
  const {register, handleSubmit, errors, watch} = useForm();
  const { verify, verifyMsg, setVerify, setVerifyMsg } = useRecaptcha();

  const submit = (data) => {
    const { email, password } = data;

    if(verify) {
      login(email, password);
    }
  }

  if(isAuth) {
    return <Redirect to='/' />
  }

  return (
    <FormWrapper submitHandler={handleSubmit(submit)} title='Login Form'>
      <Input 
        label='Email'
        name='email'
        type='email' 
        ref={register({
          required: 'Email is required.',
          validate: value => emailValidate(value) ?  undefined : 'Email address is not valid.'
        })}
        err={errors.email && errors.email.message}
      />
      <Input 
        label='Password' 
        name='password'
        type='password' 
        ref={register({
          required: 'Password is required.',
          minLength: {value: 6, message: 'Password must be at least 6 characters long.' }
        })}
        err={errors.password && errors.password.message}
      />
      <Input 
        label='Repeat Password' 
        name='rePassword'
        type='password' 
        ref={register({
          required: 'Password verification is required.',
          validate: value => value !== watch('password') ? "The password fields don't match" : undefined
        })}
        err={errors.rePassword && errors.rePassword.message}
      />
      {/* Custom reCAPTCHA */}
      {/* <Input 
        label='What day is today?'
        name='recaptcha'
        type='text'
        ref={register({
          required: 'Answer is required!',
          validate: value => customRecaptcha(value) ? undefined : 'Please write a correct answer!'
        })}
        err={errors.recaptcha && errors.recaptcha.message}
      /> */}
      <div className='social-login'>
        <LoginWithGoogle />
        <span><LoginWithFacebook /></span>
      </div>

      <Recaptcha 
        setVerify={setVerify} 
        verify={verify}
        verifyMsg={verifyMsg}
      />

      <div className='login-wrapper-btns'>
        <Button 
          type='submit' 
          light animation 
          clickHandler={() => setVerifyMsg(true)}
        >
          Login
        </Button>
        <span>
          <Link to='/forgot-password'>Forgot your password?</Link>
        </span>
      </div>
    </FormWrapper>
  );
}

const mapStateToProps = state => ({
  isAuth: state.auth.userId
});

export default connect(mapStateToProps, { login })(Login);
