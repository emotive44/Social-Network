import React from 'react';
import './ProfileAside.scss';

import Button from '../common/Button';


const ProfileAside = () => {
  return (
    <aside className="profile-aside">
      <div className="bio">
        <i className="far fa-comment-alt" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, ab. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, alias.</p>
      </div>

      <section className='info-section'>
        <div className='personal-info'>
          <i className="fas fa-graduation-cap" />
          <span>Study at</span>
          <p>Technical University Plovdiv</p>
        </div>
        <div className='personal-info'>
          <i className="fas fa-briefcase" />
          <span>Work at</span>
          <p>IT Firm</p>
        </div>
        <div className='personal-info'>
          <i className="fas fa-map-marker-alt" />
          <span>From</span>
          <p>Panagyurishte</p>
        </div>
        <div className='personal-info'>
          <i className="fas fa-birthday-cake" />
          <span>Birthday</span>
          <p>21/08/2020</p>
        </div>
        <div className='personal-info'>
          <i className="fas fa-heart" />
          <span></span>
          <p>In relationship</p>
        </div>
      </section>

      <div className="profile-buttons">
        <Button 
          type='button' 
          info animation
          style={{ flex: '1 0 55%', marginRight: '1rem' }}
        >
          <i className="fas fa-user-edit" />   
          Edit Your Personal Information
        </Button>
        <Button
          type='button'
          danger animation
          style={{ marginRight: '1rem' }}
        >
          <i className="fas fa-trash-alt" />
          Delete Your Information
        </Button>
      </div>
    </aside>
  );
}

export default ProfileAside;
