import React, { useEffect, useState } from 'react';
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
  const [countOfPosts, setCountOfPosts] = useState(8);
  const userId = match.params.userId;

  const showPosts = () => {
    if(countOfPosts - 4 > posts.length) { 
      return;
    }

    setCountOfPosts(countOfPosts + 4);
    getPosts(userId, countOfPosts);
  }

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


        {countOfPosts - 4 > posts.length ? 
          posts.length < 1 ? 
            <span className='no-more-posts'>User does not have posts yet.</span> : 
            <span className='no-more-posts'>Does not have more posts.</span> : 
          <span onClick={showPosts} className='more-posts'>show more posts</span>
        }
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
