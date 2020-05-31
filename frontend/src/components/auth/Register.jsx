import React from 'react';
import { useForm } from 'react-hook-form';
import './Register.scss';

import emailValidate from '../../utils/emailValidate';

import FormWrapper from '../common/FormWrapper';
import Input from '../common/Input';


const Register = () => {
  const {register, handleSubmit, errors, watch} = useForm();
 
  const submit = (data) => {
    console.log(data);
  }

  return (
    <FormWrapper submitHandler={handleSubmit(submit)} title='Register Form'>
      <Input 
        type='text'
        name='name'
        label='Your Name'
        ref={register({
          required: 'Name is required.',
          minLength: { value: 3, message: 'Name must be at least 3 characters long.'}
        })}
        err={errors.name && errors.name.message}
      />
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
      <button type='submit'>Submit</button>
    </FormWrapper>
  );
}

export default Register;
