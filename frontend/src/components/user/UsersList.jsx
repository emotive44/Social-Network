import React from 'react';
import './UsersList.scss';

import UserItem from './UserItem';


const UsersList = ({ users }) => {
  return (
    <section className='users-section'>
      <div className='users-container'>
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
      </div>
    </section>
  );
}

export default UsersList;
