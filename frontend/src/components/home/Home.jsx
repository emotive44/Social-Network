import React, { useEffect, Fragment } from 'react';
import { Prompt } from 'react-router-dom';
import './Home.scss';

import HomeUserItem from './HomeUserItem';
import Post from '../post/Post';

import { connect } from 'react-redux';
import store from '../../store/store';
import { POST_RESET } from '../../store/types'
import { USER_RESET } from '../../store/types';
import { getRecentPosts } from '../../store/actions/post-action';
import { getUserFollowing } from '../../store/actions/user-action';


const Home = ({ 
  meId, 
  match, 
  posts,
  following,
  getRecentPosts, 
  getUserFollowing, 
}) => {
  useEffect(() => {
    getRecentPosts();
    getUserFollowing(meId);
  }, [getRecentPosts, getUserFollowing, meId]);

  return (
    <Fragment>
      <Prompt 
        message={(location) => {
          if(location.pathname !== match.url) {
            store.dispatch({ type: POST_RESET });
            store.dispatch({ type: USER_RESET });
          }
        }}
      />
      <section className='home'>
        <div className='home-container'>
          {posts.map(post => {
            return <Post postD={post} key={post._id}/>
          })}
        </div>
        <aside className='home-aside'>
          <div className='home-aside-container'>
            {following.map(user => <HomeUserItem {...user}/>)}
          </div>
        </aside>
        <div className='home-aside-search'>
          <i className='fas fa-search' />
          <input type='search' className='search-input' placeholder='Search' defaultValue='dsadsdadadasd'/>
        </div>
      </section>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  posts: state.post.posts,
  meId: state.auth.userId,
  following: state.user.following,
});

const mapDispatchToProps = {
  getRecentPosts,
  getUserFollowing,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
