import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileHeader.scss';

import Button from '../common/Button';


const ProfileHeader = () => {
  return (
    <div className='profile-header'>
      <div className='profile-image'>
        <img src='https://m2bob-forum.net/wcf/images/avatars/3e/2720-3e546be0b0701e0cb670fa2f4fcb053d4f7e1ba5.jpg' alt='' />
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
          <li><Link to=''> Information </Link></li>
          <li><Link to=''> 10 Followers </Link></li>
          <li><Link to=''> 4 Following </Link></li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileHeader;
