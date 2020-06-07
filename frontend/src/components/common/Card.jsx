import React from 'react';
import { Link } from 'react-router-dom';
import './Card.scss';

import Button from './Button';


const Card = ({ name, email, _id}) => {
  return (
    <article className="card">
      <img src="https://m2bob-forum.net/wcf/images/avatars/3e/2720-3e546be0b0701e0cb670fa2f4fcb053d4f7e1ba5.jpg" alt=""/>
      <span>Name: {name}</span>
      <span>Email: {email}</span>

      <Link to={`/users/${_id}`}>
        <Button 
          type='button'
          primary animation
          style={{ 'borderRadius': '1.3rem', 'width': '100%', 'marginBottom': '0'}}
        >
          View Profile
        </Button>
      </Link>
    </article>
  );
}

export default Card; 
