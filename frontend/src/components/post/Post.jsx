import React from 'react';
import './Post.scss';

import CommentsList from './CommentsList';
import PostButtons from './PostButtons';
import Button from '../common/Button';


const Post = ({ single }) => {
  return (
    <article className={`post ${single && 'single-post'}`}>
    <div className="post-header">
      <img src="https://m2bob-forum.net/wcf/images/avatars/3e/2720-3e546be0b0701e0cb670fa2f4fcb053d4f7e1ba5.jpg" alt="" />
      <p>Marko Streleshki</p>
    </div>
    <div className="post-content">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui amet veritatis aperiam magni dolores blanditiis!</p>
      <img src="https://www.programers.in/assets/images/short_term/fornsic.jpg" alt="" />
      <span>
        <i className="fas fa-thumbs-up" />{'    '}
        9 likes
      </span>
      <span className="posted-on">Posted on 26/05/2020</span>
    </div>
  
    <PostButtons>
      <Button 
        type='button'
        light animation
        style={{ flex: '1 1 33%', marginRight: '1px'}}
      >
        <i className="fas fa-thumbs-up" /> Like
      </Button>
      <Button
        type='button'
        info animation
        style={{ flex: '1 1 33%', marginRight: '1px'}}
      >
        <i className="fas fa-external-link-alt" /> View Post
      </Button>
      <Button
        type='button'
        primary animation
        style={{ flex: '1 1 33%', marginRight: '1px'}}
      >
        <i className="fas fa-comment-dots" /> Comment
      </Button>

      <Button
        type='button'
        danger animation
        style={{ flex: '1 1 33%', marginRight: '1px'}}
      >
        <i class="fas fa-trash-alt" /> Delete Post
      </Button>
    </PostButtons>
    
    <CommentsList />
  </article>
  );
}

export default Post;