import React from 'react';
import './Comment.scss';


const Comment = () => {
  return (
    <div className="post-comment">
      <img src="https://m2bob-forum.net/wcf/images/avatars/3e/2720-3e546be0b0701e0cb670fa2f4fcb053d4f7e1ba5.jpg" alt="" />
      <div className="comment">
        <p>
          <span>Marko Streleshki:</span>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias, temporibus?
          <small className="delete-comment">Delete</small>
        </p>
      </div>
    </div>
  );
}

export default Comment;
