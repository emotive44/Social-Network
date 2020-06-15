import React, { useState, useEffect, Fragment } from 'react';
import { Prompt, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Post.scss';

import { connect } from 'react-redux';
import { 
  getPost, 
  deletePost, 
  updatePost, 
  likeUnlikePost, 
  getPostComments,
} from '../../store/actions/post-action';
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
  updatePost, 
  deletePost,
  likeUnlikePost,
  getPostComments,
}) => {
  const [toggle, setToggle] = useState(false);
  const [edit, setEdit] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  
  useEffect(() => {
    getPost(match.params.postId);
  }, [getPost, match.params.postId]);

  const submit = (data) => {
    updatePost(match.params.postId, data.text);
    setEdit(!edit);
  }
  
  const commentsToggle = () => setToggle(!toggle);

  const likePost = () => likeUnlikePost(match.params.postId);

  const editPost = () => setEdit(!edit);

  const deleteCurrentPost = () => {
    deletePost(match.params.postId);
    history.push('/');
  }

  return (
    <Fragment>
      {loading && <Spinner style={{width: '50px'}} />}
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
          {post && post.creator && post.creator._id === userId && (
            <Button
              type='button'
              primary animation
              clickHandler={editPost}
              style={{marginTop: '-4rem', width: '16rem'}}
              >
              <i className="fas fa-edit" /> Edit Post
            </Button>
          )}

          {post && !edit && <p>{post.text}</p>}
          {post && edit && (
            <form className='post-edit' onSubmit={handleSubmit(submit)}>
              <textarea 
                name='text'
                defaultValue={post.text}
                ref={register({ 
                  required: 'Description is required.',
                  validate: value => value === post.text ? 'You have to make changes first.' : undefined
                })}
              />
             {errors && errors.text && <span>{errors.text.message}</span>}
              <Button 
                type='submit'
                light animation
              >
                Send
              </Button> 
            </form>
          )}

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
            clickHandler={likePost}
            style={{ flex: '1 1 33%', marginRight: '1px'}}
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
            clickHandler={()=>{commentsToggle(); getPostComments(match.params.postId)}}
            style={{ flex: '1 1 33%', marginRight: '1px'}}
          >
            <i className="fas fa-comment-dots" /> Comments ({
              post && post.comments && post.comments
            })
          </Button>

          {post && post.creator && post.creator._id === userId && (
            <Button
              type='button'
              danger animation
              clickHandler={deleteCurrentPost}
              style={{ flex: '1 1 33%', marginRight: '1px'}}
            >
              <i className="fas fa-trash-alt" /> Delete Post
            </Button>
          )}
        </div>

        {toggle && <CommentsList comments={post.comments} postId={match.params.postId} />}
      </article>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  post: state.post.post,
  loading: state.post.loading,
  userId: state.auth.userId
}); 

export default connect(mapStateToProps, { getPost, likeUnlikePost, updatePost, deletePost, getPostComments })(Post);