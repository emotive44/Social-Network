import React from 'react';
import { Link } from 'react-router-dom';
import './HomeUserItem.scss';


const HomeUserItem = ({ avatar, _id, name }) => {
  return  (
    <div className='home-aside-user'>
      <Link to={`/users/${_id}`}>
        <img src={avatar ? `http://localhost:5000/${avatar}` : '/avatar.jpg'} alt=''/>
      </Link>
      <p className='follower-name'>{name}</p>
    </div>
  );
}

export default HomeUserItem;
