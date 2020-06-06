import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';

import emailValidate from '../../utils/emailValidate';

import { connect } from 'react-redux';

import { login } from '../../store/actions/auth-action';

import FormWrapper from '../common/FormWrapper';
import Input from '../common/Input';
import Button from '../common/Button';


const Login = ({ isAuth, login }) => {
  const {register, handleSubmit, errors, watch} = useForm();
 
  const submit = (data) => {
    const { email, password } = data;

    login(email, password);
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
      <Button type='submit' light animation>Login</Button>
    </FormWrapper>
  );
}

const mapStateToProps = state => ({
  isAuth: state.auth.userId
});

export default connect(mapStateToProps, { login })(Login);
