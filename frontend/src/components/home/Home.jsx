import React, { useEffect, Fragment, useState } from 'react';
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
  match, 
  posts,
  following,
  getRecentPosts, 
  getUserFollowing, 
}) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    getRecentPosts();
    getUserFollowing(localStorage.getItem('userId'), searchValue);
  }, [getRecentPosts, getUserFollowing, searchValue]);

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  }

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
            {following.length > 1 ? 
              following.map(user => <HomeUserItem {...user} key={user._id}/>) :
              <p className='no-following'>No users found</p>
            }
          </div>
        </aside>
        <div className='home-aside-search'>
          <i className='fas fa-search' />
          <input 
            type='search'
            value={searchValue} 
            placeholder='Search' 
            className='search-input' 
            onChange={searchHandler}
          />
        </div>
      </section>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  posts: state.post.posts,
  following: state.user.following,
});

const mapDispatchToProps = {
  getRecentPosts,
  getUserFollowing,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
