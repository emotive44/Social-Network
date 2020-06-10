import React from 'react';
import './PostButtons.scss';


const PostButtons = ({ children }) => {
  return (
    <div className='post-buttons'>{children}</div>
  );
}

export default PostButtons;
