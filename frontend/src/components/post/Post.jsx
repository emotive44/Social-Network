import React, { useState, useEffect, Fragment } from 'react';
import { Prompt, useHistory, Link } from 'react-router-dom';
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
import { POST_RESET } from '../../store/types';
import store from '../../store/store';

import { imageOrientation } from '../../utils/imageOrientation';

import Moment from 'react-moment';

import CommentsList from './CommentsList';
import Button from '../common/Button';
import Spinner from '../common/Spinner';


const Post = ({ 
  post, 
  postD,
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
    getPost((match && match.params && match.params.postId) || postD._id );
  }, [getPost, match, postD]);

  const submit = (data) => {
    updatePost((match && match.params && match.params.postId) || postD._id, data.text);
    setEdit(!edit);
  }
  
  const commentsToggle = () => setToggle(!toggle);

  const likePost = () => {
    likeUnlikePost((match && match.params && match.params.postId) || postD._id);
  }

  const editPost = () => setEdit(!edit);

  const deleteCurrentPost = () => {
    deletePost((match && match.params && match.params.postId) || postD._id);
    if(single) {
      history.push('/');
    }
  }

  return (
    <Fragment>
      {single && loading && <Spinner />}
      <article className={`post ${single && 'single-post'}`}>
        {single && (
          <Prompt 
            message={(location) => {
              if(location.pathname !== match.url) {
                store.dispatch({ type: POST_RESET });
              }
            }}
          />
        )}

        <div className="post-header">
          <Link to={`/users/${
            postD ?
              postD.creator && postD.creator._id :
              post && post.creator && post.creator._id}`
          }>
          <img src="https://m2bob-forum.net/wcf/images/avatars/3e/2720-3e546be0b0701e0cb670fa2f4fcb053d4f7e1ba5.jpg" alt="" />
          </Link>
          {postD ? 
            postD.creator && <p>{postD.creator.name.toUpperCase()}</p> :
            post && post.creator && <p>{post.creator.name.toUpperCase()}</p>
          }
        </div>
        <div className={`post-contents img-${single ? 
          post && post.image && imageOrientation(post.image) : 
          imageOrientation(postD.image)}`
        }>
          {post && post.creator && post.creator._id === userId && (
            <Button
              type='button'
              primary animation
              clickHandler={editPost}
              style={{marginTop: '-2rem', width: '16rem'}}
              >
              <i className="fas fa-edit" /> Edit Post
            </Button>
          )}

          {single ? post && !edit && <p>{post.text}</p> : postD && !edit && <p>{postD.text}</p>}

          {post && edit && (
            <form className='post-edit' onSubmit={handleSubmit(submit)}>
              <textarea 
                name='text'
                defaultValue={single ? post.text : postD.text}
                ref={register({ 
                  required: 'Description is required.',
                  validate: value => value === (single ? post.text : postD.text) ? 
                    'You have to make changes first.' : undefined
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

          {single && post && post.image && <img src={post.image} alt=""/>}
          {!single && postD && <img src={postD.image} alt=""/>}

          <div className='post-contents_footer'>
            <span>
              <i className="fas fa-thumbs-up" />{'    '}
              {single ? post && post.likes && post.likes.length : postD.likes.length} likes
            </span>
            <span className="posted-on">
              Posted on <Moment format='YYYY/MM/DD'>{single ? post && post.date : postD.date}</Moment>
            </span>
          </div>
        </div>
    
        <div className='post-buttons'>
          <Button 
            type='button'
            light animation
            clickHandler={likePost}
          >
            <i className="fas fa-thumbs-up" /> Like
          </Button>
          {!single && (
            <Button
              type='button'
              info animation
            >
              <Link to={`/posts/${postD._id}`}><i className="fas fa-external-link-alt" /> View Post</Link>
            </Button>
          )}
          <Button
            type='button'
            primary animation
            clickHandler={single ? () => {
                commentsToggle(); 
                getPostComments((match && match.params && match.params.postId));
              } : () => {}
            }
            style={single ? {pointerEvents: 'stroke'} : {pointerEvents: 'none'}}
          >
            <i className="fas fa-comment-dots" /> Comments ({
              single ? post && post.comments && post.comments : postD.comments.length
            })
          </Button>

          {single ? post && post.creator && post.creator._id === userId : 
            postD.creator._id === userId && (
              <Button
                type='button'
                danger animation
                clickHandler={deleteCurrentPost}
              >
                <i className="fas fa-trash-alt" /> Delete Post
              </Button>
            )
          }
        </div>

        {toggle && <CommentsList 
          comments={single ? post.comments : postD.comments} 
          postId={(match && match.params && match.params.postId) || postD._id} 
        />}
      </article>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  post: state.post.post,
  loading: state.post.loading,
  userId: state.auth.userId
}); 

const mapDispatchToProps = {
  getPost,
  updatePost,
  deletePost,
  likeUnlikePost,
  getPostComments,
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);