import React from 'react';
import './ProfileAside.scss';

import Moment from 'react-moment';

import Button from '../common/Button';

const ProfileAside = ({
  personalInfo,
  userId,
  meId,
  showModal,
  deletePersonalInfo,
}) => {
  const isAdmin = localStorage.role === 'admin' ? true : false;

  return (
    <aside className="profile-aside">
      <div className="bio">
        <i className="far fa-comment-alt" />
        {personalInfo && personalInfo.bio ? (
          <p>{personalInfo.bio}</p>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            User does not have bio yet.
          </p>
        )}
      </div>

      <section className="info-section">
        {personalInfo && personalInfo.university && (
          <div className="personal-info">
            <i className="fas fa-graduation-cap" />
            <span>Study at</span>
            <p>{personalInfo.university}</p>
          </div>
        )}
        {personalInfo && personalInfo.job && (
          <div className="personal-info">
            <i className="fas fa-briefcase" />
            <span>Work at</span>
            <p>{personalInfo.job}</p>
          </div>
        )}
        {personalInfo && personalInfo.city && (
          <div className="personal-info">
            <i className="fas fa-map-marker-alt" />
            <span>From</span>
            <p>{personalInfo.city}</p>
          </div>
        )}
        {personalInfo && personalInfo.bDay && (
          <div className="personal-info">
            <i className="fas fa-birthday-cake" />
            <span>Birthday</span>
            <p>
              <Moment format="DD/MM/YYYY">{personalInfo.bDay}</Moment>
            </p>
          </div>
        )}
        {personalInfo && personalInfo.relShip && (
          <div className="personal-info">
            <i className="fas fa-heart" />
            <p>{personalInfo.relShip}</p>
          </div>
        )}
      </section>

      <div className="profile-buttons">
        {(userId === meId || isAdmin) && (
          <Button
            light
            type="button"
            clickHandler={showModal}
            style={{ flex: '1 0 55%', marginRight: '1rem' }}
          >
            <i className="fas fa-user-edit" />
            {isAdmin
              ? 'Edit User Information'
              : 'Edit Your Personal Information'}
          </Button>
        )}
        {(userId === meId || isAdmin) &&
          personalInfo &&
          Object.keys(personalInfo).length > 1 && (
            <Button
              type="button"
              danger
              style={{ marginRight: '1rem' }}
              clickHandler={() =>
                deletePersonalInfo(localStorage.role === 'admin' && userId)
              }
            >
              <i className="fas fa-trash-alt" />
              {isAdmin ? 'Delete User Information' : 'Delete Your Information'}
            </Button>
          )}
      </div>
    </aside>
  );
};

export default ProfileAside;
