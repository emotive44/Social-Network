import React, { Fragment } from 'react';
import './Comment.scss';

import Moment from 'react-moment';

import { connect } from 'react-redux';
import { deleteComment } from '../../store/actions/post-action';


const Comment = ({ comment, isAuth, deleteComment, postId }) => {
  const deleteCurrComment = () => {
    deleteComment(postId, comment._id)
  }
  
  return (
    <div className="post-comment">
      <img src="https://m2bob-forum.net/wcf/images/avatars/3e/2720-3e546be0b0701e0cb670fa2f4fcb053d4f7e1ba5.jpg" alt="" />
      <div className="comment">
        <p>
          <span>{comment.creator.name}</span>
          {comment.text}
        </p>
        {comment.creator._id === isAuth && (
          <Fragment>
            <small className="delete-comment" onClick={deleteCurrComment}>
              Delete Comment
            </small>
          </Fragment>
        )}
        <small className='comment-date'>
          Commented {'    '}
          <Moment fromNow>
            {comment.date}
          </Moment>
        </small>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuth: state.auth.userId
});

export default connect(mapStateToProps, { deleteComment })(Comment);
