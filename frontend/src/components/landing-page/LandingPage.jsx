import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.scss';

import Button from '../common/Button';


const LandingPage = () => {
  return (
    <section className="landing">
      <div className="buttons">
        <Link to='/login'>
          <Button 
            type='button' 
            primary animation
            style={{display: 'inline-block', fontSize: '1.6rem', padding: '1.5rem'}}
          >
            Login
          </Button>
        </Link>

        <Link to='/register'>
          <Button 
            type='button' 
            info animation
            style={{display: 'inline-block', marginLeft: '2.2rem', fontSize: '1.6rem', padding: '1.5rem'}}
          >
            Register
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default LandingPage;
