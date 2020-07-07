import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './ForgotPassword.scss';

import { connect } from 'react-redux';
import { setAlert } from '../../store/actions/alert-action';

import emailValidate from '../../utils/emailValidate';

import { Input, Button, Spinner, FormWrapper } from '../common';


const ForgotPassword = ({ setAlert }) => {
  const {register, handleSubmit, errors } = useForm();
  const [spinner, setSpinner] = useState(false);

  const forgotPassword = async (email) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ email });
    const baseUrl = 'http://localhost:5000/api/v1/';

    try {
      setSpinner(true);
      await axios.post(`${baseUrl}users/forgot-password`, body, config);
      setSpinner(false);
      setAlert(`Email has been send to ${email} successfully.`, 'success');
    } catch (err) {
      setSpinner(false);
      setAlert(err.response.data.message, 'danger');
    }
  }

  const submit = (data) => {
    forgotPassword(data.email);
  }

  return (
    <FormWrapper submitHandler={handleSubmit(submit)} title='Forgot Password'>
      <h3 className='forgot-password-header'>
        Please enter the email address with which you are registered,
        so that we can send you the password reset link.
      </h3>
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
      <Button 
        type='submit'
        light animation
        style={{marginTop: '3rem'}}
      >
        Send Password Reset Link
        {spinner && <Spinner styleBtn />}
      </Button>
    </FormWrapper>
  );
}

export default connect(null, { setAlert })(ForgotPassword);
