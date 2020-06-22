import React from 'react';
import { Link } from 'react-router-dom';
import './HomeUserItem.scss';


const HomeUserItem = ({ avatar, _id, name }) => {
  return  (
    <div className='home-aside-user'>
      <Link to={`/users/${_id}`}>
        <img src='https://m2bob-forum.net/wcf/images/avatars/3e/2720-3e546be0b0701e0cb670fa2f4fcb053d4f7e1ba5.jpg' alt=''/>
      </Link>
      <p className='follower-name'>{name}</p>
    </div>
  );
}

export default HomeUserItem;
