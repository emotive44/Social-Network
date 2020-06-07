import React from 'react';
import './Users.scss';

import Card from '../common/Card';


const Users = () => {
  return (
    <section className="users">
      <div className="users-wrapper">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
}

export default Users;
