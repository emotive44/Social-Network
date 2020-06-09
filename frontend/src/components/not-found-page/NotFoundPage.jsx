import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.scss';


const NotFoundPage = () => {
  return (
    <section className='not-found'>
      <Link to='/users'> {'<< Go Back To Home Page'} </Link>
    </section>
  );
}

export default NotFoundPage;
