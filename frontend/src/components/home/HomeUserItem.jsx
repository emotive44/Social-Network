import React from 'react';
import { Link } from 'react-router-dom';
import './HomeUserItem.scss';

const HomeUserItem = ({ avatar, _id, name }) => {
  let avatarUrl;
  if (avatar && avatar.startsWith('http')) {
    avatarUrl = avatar;
  } else {
    avatarUrl = avatar && avatar.split('images\\users').join('');
  }

  return (
    <div className="home-aside-user">
      <Link to={`/users/${_id}`}>
        <img
          src={
            avatar
              ? avatarUrl.startsWith('http')
                ? avatarUrl
                : `${process.env.REACT_APP_ASSET_URL}images/users/${avatarUrl}`
              : '/avatar.jpg'
          }
          alt=""
        />
      </Link>
      <p className="follower-name">{name}</p>
    </div>
  );
};

export default HomeUserItem;
