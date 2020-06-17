import React, { useEffect } from 'react';
import './UserProfile.scss';

import { connect } from 'react-redux';
import { getUser } from '../../store/actions/user-action';

import ProfileHeader from './ProfileHeader';
import ProfileAside from './ProfileAside';
import Spinner from '../common/Spinner';


const UserProfile = ({ getUser, loading, user, match }) => {
  const userId = match.params.userId;

  useEffect(() => {
    getUser(userId);
  }, [getUser, userId]);

  return (
    <section className='user-profile'>
      {loading && <Spinner style={{ width: '13rem' }} />}
      <ProfileHeader user={user} />
      <ProfileAside />
      <main>
        posts
      </main>
    </section>
  );
}

const mapStateToProps = state => ({
  user: state.user.user,
  loading: state.user.loading,
});

export default connect(mapStateToProps, { getUser })(UserProfile);
