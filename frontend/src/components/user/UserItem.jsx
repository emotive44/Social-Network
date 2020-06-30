import React from 'react';
import { Link } from 'react-router-dom';
import './UserItem.scss';

import { connect } from 'react-redux';
import { followUser } from '../../store/actions/user-action';

import Button from '../common/Button';


const UserItem = ({
  _id,
  meId, 
  name, 
  avatar, 
  followers, 
  followUser,
  toggleFollowers,
  toggleFollowing,
}) => {
  return (
    <article className='user-article'>
      <Link 
        onClick={() => {toggleFollowers(false); toggleFollowing(false)}}
        to={`/users/${_id}`}
      >
        <img src={avatar ? `http://localhost:5000/${avatar}` : '/avatar.jpg'} alt=''/>
      </Link>
      <div className={`user-name ${_id === meId && 'user-name-me'}`}>
        <p>{name}</p>
        <span>{followers.length} Followers</span>
      </div>

      {followers.includes(meId) ? (_id !== meId &&
        <Button 
          type='button'
          danger animation 
          clickHandler={() => followUser(_id, true)}
        >
          Unfollow
        </Button>) : ( _id !== meId &&
        <Button 
          type='button'
          info animation 
          clickHandler={() => followUser(_id, true)}
        >
          Follow
        </Button>)
      }
    </article>
  );
}

const mapStateToProps = state => ({
  meId: state.auth.userId
});

export default connect(mapStateToProps, { followUser })(UserItem);
