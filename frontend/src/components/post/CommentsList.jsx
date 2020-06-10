import React from 'react';
import './CommentsList.scss';

import Comment from './Comment';


const CommentsList = ({toggle}) => {
  return (
    <div className='post-comments'>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
}

export default CommentsList;
