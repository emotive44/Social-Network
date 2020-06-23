import React from 'react';
import { Link } from 'react-router-dom';
import './UserItem.scss';

import Button from '../common/Button';


const UserItem = () => {
  return (
    <article className='user-article'>
      <Link to=''>
        <img src='https://m2bob-forum.net/wcf/images/avatars/3e/2720-3e546be0b0701e0cb670fa2f4fcb053d4f7e1ba5.jpg' alt=''/>
      </Link>
      <div className='user-name'>
        <p>Marko Streleshki</p>
        <span>21 Followers</span>
      </div>
      <Button 
        type='button'
        info animation 
      >
        Follow
      </Button>
    </article>
  );
}

export default UserItem;
