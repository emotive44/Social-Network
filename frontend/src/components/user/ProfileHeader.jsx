import React from 'react';
import './ProfileHeader.scss';

import Button from '../common/Button';


const ProfileHeader = ({ user }) => {
  return (
    <div className='profile-header'>
      <div className='profile-image'>
        <img src='https://m2bob-forum.net/wcf/images/avatars/3e/2720-3e546be0b0701e0cb670fa2f4fcb053d4f7e1ba5.jpg' alt='' />
        <p>{user.name && user.name.toUpperCase()}</p>
        <p>{user.email}</p>
        <ul>
          <li>
            <Button type='button' info animation>Follow</Button>
          </li>
          <li>
            <Button type='button' danger animation>Unfollow</Button>
          </li>
        </ul>
      </div>
      <div className='profile-nav'>
        <ul>
          <li>Information</li>
          <li>{user.followers} Followers</li>
          <li>{user.following} Following</li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileHeader;
