import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.scss';

import { connect } from 'react-redux';

import Button from '../common/Button';
import ParticleBackground from './ParticleBackground';

const LandingPage = ({ isAuth }) => {
  return (
    <section className="landing">
      {!isAuth && (
        <div className="buttons">
          <Link to="/login">
            <Button type="button" primary animation>
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button
              type="button"
              info
              animation
              style={{ marginLeft: '2.2rem' }}
            >
              Register
            </Button>
          </Link>
        </div>
      )}
      <ParticleBackground />
    </section>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.userId,
});

export default connect(mapStateToProps)(LandingPage);
