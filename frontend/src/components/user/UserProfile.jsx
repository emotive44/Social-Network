import React, { useEffect, useState, Fragment } from 'react';
import { Prompt } from 'react-router-dom';
import './UserProfile.scss';

import useModal from '../hooks/useModal';

import { connect } from 'react-redux';
import { 
  getUser, 
  followUser, 
  addPersonalInfo,
  getUserFollowing,
  getUserFollowers,
  deletePersonalInfo,
} from '../../store/actions/user-action';
import { getPosts } from '../../store/actions/post-action';
import { POST_RESET, USER_RESET } from '../../store/types'
import store from '../../store/store';

import PersonalInfoForm from './PersonalInfoForm';
import ProfileHeader from './ProfileHeader';
import UsersList from './UsersList';
import ProfileAside from './ProfileAside';
import Spinner from '../common/Spinner';
import Modal from '../common/Modal';
import Post from '../post/Post';



const UserProfile = ({ 
  meId, 
  user, 
  match,
  posts,
  loading, 
  getUser, 
  getPosts,
  following,
  followers,
  followUser, 
  addPersonalInfo,
  getUserFollowing,
  getUserFollowers,
  deletePersonalInfo,
}) => {
  const [countOfPosts, setCountOfPosts] = useState(8);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const { toggleModal, closeModal, showModal } = useModal();
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

  const toggleFollowers = (toggle) => {
    getUserFollowers(userId);
    setShowFollowers(toggle);
  }

  const toggleFollowing = (toggle) => {
    getUserFollowing(userId, '');
    setShowFollowing(toggle);
  }

  return (
    <section className='user-profile'>
      {loading && <Spinner style={{ width: '13rem' }} />}
      <Prompt 
        message={(location) => {
          if(location.pathname !== match.url) {
            store.dispatch({ type: POST_RESET });
            store.dispatch({ type: USER_RESET });
          }
        }}
      />

      {toggleModal && (
        <Modal closeModal={closeModal} title='Edit Your Personal Information'>
          <PersonalInfoForm info={user.personalInfo} addPersonalInfo={addPersonalInfo}/>
        </Modal>
      )}

      <ProfileHeader  
        user={user}
        meId={meId}
        followUser={followUser}
        toggleFollowers={toggleFollowers}
        toggleFollowing={toggleFollowing}
      />
      {!showFollowers &&  !showFollowing &&(
        <Fragment>
          <ProfileAside 
            meId={meId} 
            userId={userId}
            showModal={showModal}
            deletePersonalInfo={deletePersonalInfo}
            personalInfo={user.personalInfo}
          />
          <main>
            {posts.map(post => {
              return <Post postD={post} key={post._id}/>
            })}

            {countOfPosts - 4 > posts.length ? 
              posts.length < 1 ? 
                <span className='no-more-items'>User does not have posts yet.</span> : 
                <span className='no-more-items'>Does not have more posts.</span> : 
              <span onClick={showPosts} className='more-items'>show more posts</span>
            }
          </main>
        </Fragment> 
      )}

      {showFollowers && !showFollowing && 
        <UsersList 
          followers
          users={followers}
          toggleFollowers={toggleFollowers}
          toggleFollowing={toggleFollowing} 
        />
      }
      {showFollowing && !showFollowers && 
        <UsersList 
          users={following} 
          toggleFollowers={toggleFollowers}
          toggleFollowing={toggleFollowing}
        />
      }
    </section>
  );
}

const mapStateToProps = state => ({
  user: state.user.user,
  following: state.user.following,
  followers: state.user.followers,
  meId: state.auth.userId,
  posts: state.post.posts,
  loading: state.user.loading,
});

const mapDispatchToProps = {
  getUser,
  getPosts,
  followUser,
  addPersonalInfo,
  getUserFollowing,
  getUserFollowers,
  deletePersonalInfo,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
