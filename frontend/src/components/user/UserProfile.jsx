import React from 'react';
import './UserProfile.scss';

import ProfileHeader from './ProfileHeader';
import ProfileAside from './ProfileAside';


const UserProfile = () => {
  return (
    <section className='user-profile'>
      <ProfileHeader />
      <ProfileAside />
    </section>
  );
}

export default UserProfile;
