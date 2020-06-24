import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Card.scss';

import { imageOrientation } from '../../utils/imageOrientation';

import Button from './Button';


const Card = ({ avatar, name, email, _id, text, image, creator }) => {
  return (
    <article className={`card ${!avatar && !image && 'no-image'} ${image && imageOrientation(image)}`}>
      {!email ? <img src={`http://localhost:5000/${image}`} alt=""/> :
        <img 
          className={`${!avatar && 'no-avatar'}`}
          src={avatar ? `http://localhost:5000/${avatar}` : '/avatar.jpg'} alt=""
        />
      }

      {name && email ? (<Fragment>
        <span className='name'>Name: {name}</span>
        <span className='email'>Email: {email}</span>
      </Fragment>) : (<Fragment>
        <p className='text'>{text}</p>
        <span className='posted-by'>Posted by <small>{creator && creator.name}</small></span>
      </Fragment>)}

      <Link to={`/${email ? 'users' : 'posts'}/${_id}`}>
        <Button 
          type='button'
          primary animation
          style={{ 'borderRadius': '1.3rem', 'width': '100%', 'marginBottom': '0'}}
        >
          View {email ? 'Profile' : 'Post'}
        </Button>
      </Link>
    </article>
  );
}

export default Card; 
