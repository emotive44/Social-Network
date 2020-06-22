import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './CommentsList.scss';

import Comment from './Comment';
import Button from '../common/Button';

import { connect } from 'react-redux';
import { createComment, getPostComments } from '../../store/actions/post-action';


const CommentsList = ({ comments, createComment, postId, currComments, getPostComments }) => {
  const { register, handleSubmit, errors } = useForm();
  const [countOfComments, setCountOfComments] = useState(6);

  const showComments = () => {
    if(countOfComments - 3 > comments) { 
      return;
    }

    setCountOfComments(countOfComments + 3);
    getPostComments(postId, countOfComments);
  }

  const submit = (data, e) => {
    createComment(postId, data.text);
    e.target.reset()
  }

  const allComments = currComments && currComments.map(comment => (
    <Comment key={comment._id} comment={comment} postId={postId}/>
  ));

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

      {countOfComments - 3 > comments ? (
          comments > 1 && <span className='no-more-items'>Does not have more comments</span>
        ) : (
          <span onClick={showComments} className='more-items'>show more comments</span>
        )
      }

      {comments < 1 && <p className='no-more-items'>
        Not comments yet. Write first comment here.
      </p>}
    </div>
  );
}

const mapStateToProps = state => ({
  currComments: state.post.post.currComments
});

export default connect(mapStateToProps, { createComment, getPostComments })(CommentsList);
