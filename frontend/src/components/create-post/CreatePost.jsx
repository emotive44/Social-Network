import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './CreatePost.scss';

import axios from 'axios';

import { connect } from 'react-redux';
import { setAlert } from '../../store/actions/alert-action';

import FormWrapper from '../common/FormWrapper';
import Button from '../common/Button';
import Input from '../common/Input';


const CreatePost = ({ setAlert }) => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const createPost = async (text, image) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ text, image });
  
    try {
      await axios.post('http://localhost:5000/api/v1/posts', body, config);
      setAlert('Creat post successfully.', 'success');
      history.push('/posts');
    } catch (err) {
      setAlert(err.response.data.message, 'danger');
    }
  }
  
  const submit = (data) => {
    const { text, image } = data;
    createPost(text, image)
  }

  return (
    <FormWrapper submitHandler={handleSubmit(submit)} title='Create Post'>
      <textarea
        rows='10'
        name='text'
        type='text' 
        className='post-content'
        placeholder='Share what are you think with your friends.'
        ref={register({
          required: 'Can not create post without any content.',
          minLength: {value: 9, message: 'Post must be at least 9 characters long.' }
        })}
      />
      {errors.text && <p className='post-err'>{errors.text.message}</p>}
      <Input 
        label='Upload your image'
        name='image'
        type='text' 
        ref={register}
      />
      <Button type='submit' light animation>Create Post</Button>
    </FormWrapper>
  );
}

export default connect(null, { setAlert })(CreatePost);
