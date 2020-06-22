import React, { useEffect, Fragment } from 'react';
import { Prompt } from 'react-router-dom';
import './Home.scss';

import HomeUserItem from './HomeUserItem';
import Post from '../post/Post';

import { connect } from 'react-redux';
import store from '../../store/store';
import { POST_RESET } from '../../store/types'
import { getRecentPosts } from '../../store/actions/post-action';


const Home = ({ posts, getRecentPosts, match }) => {
  useEffect(() => {
    getRecentPosts();
  }, [getRecentPosts]);

  return (
    <Fragment>
      <Prompt 
        message={(location) => {
          if(location.pathname !== match.url) {
            store.dispatch({ type: POST_RESET });
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
            {[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map(x => <HomeUserItem />)}
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
  posts: state.post.posts
});

export default connect(mapStateToProps, { getRecentPosts })(Home);
