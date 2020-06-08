import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import './Card.scss';

import { imageOrientation } from '../../utils/imageOrientation';

import Button from './Button';


const Card = ({ avatar, name, email, _id, text, image, creator }) => {
  const [longInfo, setLongInfo] = useState(false);

  if((email && email.length > 26) || (name && name.length > 30)) {
    setLongInfo(true);
  }

  return (
    <article className={`card ${!avatar && !image && 'no-image'} ${image && imageOrientation(image)} ${!longInfo && 'longwords'}`}>
      {avatar && <img src="https://m2bob-forum.net/wcf/images/avatars/3e/2720-3e546be0b0701e0cb670fa2f4fcb053d4f7e1ba5.jpg" alt=""/>}
      {image && <img src={image} alt=""/>}

      {name && email ? (<Fragment>
        <span className='name'>Name: {name}</span>
        <span className='email'>Email: {email}</span>
      </Fragment>) : (<Fragment>
        <p className='text'>{text}</p>
        <span className='posted-by'>Posted by <small>{creator.name}</small></span>
      </Fragment>)}

      <Link to={`/${avatar ? 'users' : 'posts'}/${_id}`}>
        <Button 
          type='button'
          primary animation
          style={{ 'borderRadius': '1.3rem', 'width': '100%', 'marginBottom': '0'}}
        >
          View {avatar ? 'Profile' : 'Post'}
        </Button>
      </Link>
    </article>
  );
}

export default Card; 
