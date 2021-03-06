import React from 'react';
import './UsersList.scss';

import UserItem from './UserItem';

const UsersList = ({ users, toggleFollowers, toggleFollowing, followers }) => {
  return (
    <section className="users-section">
      <div className="users-container">
        {users && users.length >= 1 ? (
          users.map((user) => (
            <UserItem
              {...user}
              key={user._id}
              toggleFollowers={toggleFollowers}
              toggleFollowing={toggleFollowing}
            />
          ))
        ) : (
          <p className="no-more-items">
            User does not {followers ? 'have followers yet' : 'follow anyone'}
          </p>
        )}
      </div>
    </section>
  );
};

export default UsersList;
