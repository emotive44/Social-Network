import React from 'react';
import { useForm } from 'react-hook-form';
import './CommentsList.scss';

import Comment from './Comment';
import Button from '../common/Button';

import { connect } from 'react-redux';
import { createComment } from '../../store/actions/post-action';


const CommentsList = ({ comments, createComment, postId }) => {
  const { register, handleSubmit, errors } = useForm();

  const submit = (data, e) => {
    createComment(postId, data.text);
    e.target.reset()
  }
  
  const allComments = comments.map(comment => <Comment key={comment._id} comment={comment} />);

  return (
    <div className='post-comments'>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <div className='create-comment'>
            <input 
              type="text"
              name='text'
              placeholder="Create Your Comment"
              ref={register({ 
                required: 'Can not create comment without content.',
                minLength: { value: 5, message: 'Comment must be at least 5 characters long.' },
                maxLength: { value: 30, message: 'Comment must be smaller than 30 characters long.' },
              })}
            />
            <Button 
              type='submit'
              light animation
              style={{ margin: '0', marginRight: '0.5em', borderRadius: '0.9em' }}
              >
              Create
            </Button>
          </div>
          {errors.text && <p className='comment-error'>{errors.text.message}</p>}
        </div>
      </form>

      {allComments}

      {comments.length < 1 && <p className='no-comments'>
        Not comments yet. Write first comment here.
      </p>}
    </div>
  );
}

export default connect(null, { createComment })(CommentsList);
