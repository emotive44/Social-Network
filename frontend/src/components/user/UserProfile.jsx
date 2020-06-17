import React, { useEffect } from 'react';
import { Prompt } from 'react-router-dom';
import './UserProfile.scss';

import { connect } from 'react-redux';
import { getUser, followUser } from '../../store/actions/user-action';
import { getPosts } from '../../store/actions/post-action';
import { GET_POST_RESET } from '../../store/types'
import store from '../../store/store';

import ProfileHeader from './ProfileHeader';
import ProfileAside from './ProfileAside';
import Spinner from '../common/Spinner';
import Post from '../post/Post';


const UserProfile = ({ 
  meId, 
  user, 
  match,
  posts,
  loading, 
  getUser, 
  getPosts,
  followUser, 
}) => {
  const userId = match.params.userId;

  useEffect(() => {
    getUser(userId);
    getPosts(userId);
  }, [getUser, getPosts, userId]);

  return (
    <section className='user-profile'>
      {loading && <Spinner style={{ width: '13rem' }} />}
      <Prompt 
        message={(location) => {
          if(location.pathname !== match.url) {
            store.dispatch({ type: GET_POST_RESET });
          }
        }}
      />
      <ProfileHeader  
        user={user}
        meId={meId}
        followUser={followUser}
      />
      <ProfileAside />
      <main>
        {posts.map(post => {
          return <Post postD={post} key={post._id}/>
        })}
      </main>
    </section>
  );
}

const mapStateToProps = state => ({
  user: state.user.user,
  meId: state.auth.userId,
  posts: state.post.posts,
  loading: state.user.loading,
});

export default connect(mapStateToProps, { getUser, followUser, getPosts })(UserProfile);
