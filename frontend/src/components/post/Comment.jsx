import React from 'react';
import './Comment.scss';

import { connect } from 'react-redux';


const Comment = ({ comment, isAuth }) => {
  return (
    <div className="post-comment">
      <img src="https://m2bob-forum.net/wcf/images/avatars/3e/2720-3e546be0b0701e0cb670fa2f4fcb053d4f7e1ba5.jpg" alt="" />
      <div className="comment">
        <p>
          <span>{comment.creator.name}</span>
          {comment.text}
        </p>
        {comment.creator._id === isAuth && (
          <small className="delete-comment">Delete Comment</small>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuth: state.auth.userId
});

export default connect(mapStateToProps)(Comment);
