import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './CreatePost.scss';

import axios from 'axios';

import { connect } from 'react-redux';
import { setAlert } from '../../store/actions/alert-action';

import { Button, ImageUpload, FormWrapper } from '../common';

const CreatePost = ({ setAlert, userId }) => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const createPost = async (body) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      await axios.post('http://localhost:5000/api/v1/posts', body, config);
      setAlert('Creat post successfully.', 'success');
      history.push(`/users/${userId}`);
    } catch (err) {
      setAlert(err.response.data.message, 'danger');
    }
  };

  const submit = (data) => {
    const { text, image } = data;
    const formData = new FormData();

    formData.append('text', text);
    formData.append('image', image[0]);

    createPost(formData);
  };

  return (
    <FormWrapper submitHandler={handleSubmit(submit)} title="Create Post">
      <textarea
        rows="10"
        name="text"
        type="text"
        className="post-content"
        placeholder="Share what are you think with your friends."
        ref={register({
          required: 'Can not create post without any content.',
          minLength: {
            value: 9,
            message: 'Post must be at least 9 characters long.',
          },
        })}
      />
      {errors.text && <p className="post-err">{errors.text.message}</p>}

      <ImageUpload ref={register} name="image" />
      <Button type="submit" light animation style={{ marginBottom: '-1rem' }}>
        Create Post
      </Button>
    </FormWrapper>
  );
};

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
});

export default connect(mapStateToProps, { setAlert })(CreatePost);
