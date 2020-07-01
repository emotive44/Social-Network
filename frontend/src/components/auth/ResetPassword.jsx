import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { connect } from 'react-redux';
import { setAlert } from '../../store/actions/alert-action';

import FormWrapper from '../common/FormWrapper';
import Button from '../common/Button';
import Input from '../common/Input';


const ResetPassword = ({ setAlert, match }) => {
  const history = useHistory();
  const { register, handleSubmit, errors, watch } = useForm();

  const resetPassword = async (password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ password });
    const baseUrl = 'http://localhost:5000/api/v1/';

    try {
      await axios.patch(`${baseUrl}users/reset-password/${match.params.token}`, body, config);
      setAlert('Great! Now you can login with your new password.', 'success');
      history.push('/login');
    } catch (err) {
      setAlert(err.response.data.message, 'danger');
    }
  }

  const submit = (data) => {
    resetPassword(data.password);
  }

  return (
    <FormWrapper submitHandler={handleSubmit(submit)} title='Reset Your Password'>
      <Input 
        label='New Password' 
        name='password'
        type='password' 
        ref={register({
          required: 'Password is required.',
          minLength: {value: 6, message: 'Password must be at least 6 characters long.' }
        })}
        err={errors.password && errors.password.message}
      />
       <Input 
        label='Repeat New Password' 
        name='rePassword'
        type='password' 
        ref={register({
          required: 'Password verification is required.',
          validate: value => value !== watch('password') ? "The password fields don't match" : undefined
        })}
        err={errors.rePassword && errors.rePassword.message}
      />
      <Button type='submit' light animation>Reset Password</Button>
    </FormWrapper>
  );
}

export default connect(null, { setAlert })(ResetPassword);
