import React from 'react';
import { Link } from 'react-router-dom';
import './Card.scss';

import { imageOrientation } from '../../utils/imageOrientation';

import Button from './Button';

const Card = ({ avatar, name, email, _id, text, image, creator }) => {
  const assetUrl = process.env.REACT_APP_ASSET_URL;

  return (
    <article
      className={`card 
        ${!avatar && !image && 'no-image'} 
        ${image && imageOrientation(image)}
        ${avatar && imageOrientation(avatar)}
      `}
    >
      {!email ? (
        image ? (
          <img src={`${assetUrl}${image}`} alt="" />
        ) : null
      ) : (
        <img
          className={`${!avatar ? 'no-avatar' : 'avatar'}`}
          src={
            avatar
              ? avatar.startsWith('http')
                ? avatar
                : `${assetUrl}${avatar}`
              : '/avatar.jpg'
          }
          alt=""
        />
      )}

      {name && email ? (
        <>
          <span className="name">Name: {name}</span>
          <span className="email">Email: {email}</span>
        </>
      ) : (
        <>
          <p className="text">{text}</p>
          <span className="posted-by">
            Posted by <small>{creator && creator.name}</small>
          </span>
        </>
      )}

      <Link to={`/${email ? 'users' : 'posts'}/${_id}`}>
        <Button
          type="button"
          primary
          animation
          style={{ borderRadius: '1.3rem', width: '100%', marginBottom: '0' }}
        >
          View {email ? 'Profile' : 'Post'}
        </Button>
      </Link>
    </article>
  );
};

export default Card;
