import React from 'react';
import './ProfileHeader.scss';

import Button from '../common/Button';


const ProfileHeader = ({ user, meId, followUser }) => {
  const followUnfollowUser = () => followUser(user._id);

  return (
    <div className='profile-header'>
      <div className='profile-image'>
        <img src='https://m2bob-forum.net/wcf/images/avatars/3e/2720-3e546be0b0701e0cb670fa2f4fcb053d4f7e1ba5.jpg' alt='' />
        <p>{user.name && user.name.toUpperCase()}</p>
        <p>{user.email}</p>
        {user._id !== meId && (
          <div>
            {user.followers && user.followers.includes(meId) ? (
              <Button 
                type='button' 
                danger animation
                clickHandler={followUnfollowUser}
              >
                Unfollow
              </Button>
              ) : (
              <Button 
                type='button' 
                info animation
                clickHandler={followUnfollowUser}
              >
                Follow
              </Button>
            )}
          </div>
        )}
      </div>
      <div className='profile-nav'>
        <ul>
          <li>Information</li>
          <li>{user.followers && user.followers.length} Followers</li>
          <li>{user.following && user.following.length} Following</li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileHeader;
