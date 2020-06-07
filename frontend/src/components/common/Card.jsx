import React from 'react';
import './Card.scss';

import Button from './Button';


const Card = () => {
  return (
    <article className="card">
      <img src="https://m2bob-forum.net/wcf/images/avatars/3e/2720-3e546be0b0701e0cb670fa2f4fcb053d4f7e1ba5.jpg" alt=""/>
      <span>Name: Marko Streleshki</span>
      <span>Email: marko_streleshki@abv.bg</span>

      <Button 
        type='button'
        primary animation
        style={{ 'border-radius': '1.3rem', 'width': '100%', 'margin-bottom': '0'}}
      >
        View Profile
      </Button>
    </article>
  );
}

export default Card; 
