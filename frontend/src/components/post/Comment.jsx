import React from 'react';
import './Comment.scss';

import Moment from 'react-moment';

import { connect } from 'react-redux';
import { deleteComment } from '../../store/actions/post-action';

const Comment = ({ comment, isAuth, deleteComment, postId }) => {
  const isAdmin = localStorage.role === 'admin' ? true : false;
  const avatar = comment.creator.avatar;

  let avatarUrl;
  if (avatar && avatar.startsWith('http')) {
    avatarUrl = avatar;
  } else {
    avatarUrl = avatar && avatar.split('images\\users').join('');
  }

  const deleteCurrComment = () => {
    deleteComment(postId, comment._id);
  };

  return (
    <div className="post-comment">
      <img
        src={`${
          avatar
            ? avatarUrl.startsWith('http')
              ? avatarUrl
              : `${process.env.REACT_APP_ASSET_URL}${comment.creator.avatar}`
            : '/avatar.jpg'
        }`}
        alt=""
      />
      <div className="comment">
        <p>
          <span>{comment.creator.name}</span>
          {comment.text}
        </p>
        {(comment.creator._id === isAuth || isAdmin) && (
          <>
            <small className="delete-comment" onClick={deleteCurrComment}>
              Delete Comment
            </small>
          </>
        )}
        <small className="comment-date">
          Commented {'    '}
          <Moment fromNow>{comment.date}</Moment>
        </small>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.userId,
});

export default connect(mapStateToProps, { deleteComment })(Comment);
