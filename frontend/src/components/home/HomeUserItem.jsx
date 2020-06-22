import React from 'react';
import { Link } from 'react-router-dom';
import './HomeUserItem.scss';


const HomeUserItem = () => {
  return  (
    <div className='home-aside-user'>
      <Link to=''>
        <img src='https://m2bob-forum.net/wcf/images/avatars/3e/2720-3e546be0b0701e0cb670fa2f4fcb053d4f7e1ba5.jpg' alt=''/>
      </Link>
      <p className='firstName'>Marko</p>
      <p>Strelehski</p>
    </div>
  );
}

export default HomeUserItem;
