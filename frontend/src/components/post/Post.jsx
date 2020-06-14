import React, { useState, useEffect, Fragment } from 'react';
import { Prompt } from 'react-router-dom';
import './Post.scss';

import { connect } from 'react-redux';
import { getPost, likeUnlikePost } from '../../store/actions/post-action';
import { GET_POST_RESET } from '../../store/types';
import store from '../../store/store';

import { imageOrientation } from '../../utils/imageOrientation';

import Moment from 'react-moment';

import CommentsList from './CommentsList';
import Button from '../common/Button';
import Spinner from '../common/Spinner';


const Post = ({ 
  post, 
  match, 
  single, 
  userId, 
  getPost,
  loading,
  likeUnlikePost, 
}) => {
  const [toggle, setToggle] = useState(false);
  console.log(match)
  
  useEffect(() => {
    getPost(match.params.postId);
  }, [getPost, match.params.postId]);
  
  const commentsToggle = () => {
    setToggle(!toggle);
  }

  const likePost = () => {
    likeUnlikePost(match.params.postId);
  }

  return (
    <Fragment>
      {loading && <Spinner />}
      <article className={`post ${single && 'single-post'}`}>
        <Prompt 
          message={(location) => {
            if(location.pathname !== match.url) {
              store.dispatch({ type: GET_POST_RESET });
            }
          }}
        />
        <div className="post-header">
          <img src="https://m2bob-forum.net/wcf/images/avatars/3e/2720-3e546be0b0701e0cb670fa2f4fcb053d4f7e1ba5.jpg" alt="" />
          {post && post.creator && <p>{post.creator.name}</p>}
        </div>
        <div className={`post-contents img-${post && post.image && imageOrientation(post.image)}`}>
          <Button
            type='button'
            primary animation
            style={{marginTop: '-4rem', width: '16rem'}}
            >
            <i className="fas fa-edit" /> Edit Post
          </Button>
          {post && <p>{post.text}</p>}
          {post && post.image && <img src={post.image} alt=""/>}
          <div className='post-contents_footer'>
            <span>
              <i className="fas fa-thumbs-up" />{'    '}
              {post && post.likes && post.likes.length} likes
            </span>
            <span className="posted-on">
              Posted on <Moment format='YYYY/MM/DD'>{post && post.date}</Moment>
            </span>
          </div>
        </div>
    
        <div className='post-buttons'>
          <Button 
            type='button'
            light animation
            style={{ flex: '1 1 33%', marginRight: '1px'}}
            clickHandler={likePost}
            >
            <i className="fas fa-thumbs-up" /> Like
          </Button>
          {!single && (
            <Button
              type='button'
              info animation
              style={{ flex: '1 1 33%', marginRight: '1px'}}
            >
              <i className="fas fa-external-link-alt" /> View Post
            </Button>
          )}
          <Button
            type='button'
            primary animation
            clickHandler={commentsToggle}
            style={{ flex: '1 1 33%', marginRight: '1px'}}
          >
            <i className="fas fa-comment-dots" /> Comment
          </Button>

          {post && post.creator && post.creator._id === userId && (
            <Button
              type='button'
              danger animation
              style={{ flex: '1 1 33%', marginRight: '1px'}}
            >
              <i className="fas fa-trash-alt" /> Delete Post
            </Button>
          )}
        </div>

        {toggle && <CommentsList />}
      </article>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  post: state.post.post,
  loading: state.post.loading,
  userId: state.auth.userId
}); 

export default connect(mapStateToProps, { getPost, likeUnlikePost })(Post);