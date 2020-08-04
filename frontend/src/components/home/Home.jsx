import React, { useEffect, useState } from 'react';
import './Home.scss';

import { connect } from 'react-redux';
import store from '../../store/store';
import { POST_RESET, USER_RESET } from '../../store/types';
import { getRecentPosts } from '../../store/actions/post-action';
import { getUserFollowing } from '../../store/actions/user-action';

import HomeUserItem from './HomeUserItem';
import Spinner from '../common/Spinner';
import Post from '../post/Post';

const Home = ({
  posts,
  loading,
  following,
  getRecentPosts,
  getUserFollowing,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [countOfPosts, setCountOfPosts] = useState(2);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    getRecentPosts(1);

    return () => {
      store.dispatch({ type: POST_RESET });
      store.dispatch({ type: USER_RESET });
    };
  }, [getRecentPosts]);

  useEffect(() => {
    getUserFollowing(userId, searchValue);
  }, [getUserFollowing, userId, searchValue]);

  const showPosts = () => {
    if (countOfPosts - 1 > posts.length) {
      return;
    }

    setCountOfPosts(countOfPosts + 1);
    getRecentPosts(countOfPosts);
  };

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  if (loading) {
    return <Spinner style={{ left: '35%', width: '200px' }} />;
  }

  return (
    <>
      <section className="home">
        <div className="home-container">
          {posts.map((post) => {
            return <Post postD={post} key={post._id} />;
          })}

          {countOfPosts - 1 > posts.length ? (
            <span className="no-more-items">Does not have more posts.</span>
          ) : (
            <span onClick={showPosts} className="more-items">
              Show more posts
            </span>
          )}
        </div>
        <aside className="home-aside">
          <div className="home-aside-container">
            {following.length >= 1 ? (
              following.map((user) => <HomeUserItem {...user} key={user._id} />)
            ) : (
              <p className="no-following">No users found</p>
            )}
          </div>
        </aside>
        <div className="home-aside-search">
          <i className="fas fa-search" />
          <input
            type="search"
            value={searchValue}
            placeholder="Search"
            className="search-input"
            onChange={searchHandler}
          />
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.post.posts,
  loading: state.post.loading,
  following: state.user.following,
});

const mapDispatchToProps = {
  getRecentPosts,
  getUserFollowing,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
