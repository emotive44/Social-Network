import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavBar.scss';

import { connect } from 'react-redux';


const NavBar = ({ isAuth }) => {
  const [toggle, setToggle] = useState(false);

  const toggleBar = () => {
    setToggle(!toggle);
  }

  return (
    <nav>
      <Link to='' className='logo' />
      <ul className={toggle ? 'show' : null}>
        {!toggle && <i className='fas fa-bars' onClick={toggleBar} />}
        {toggle && <i className='fas fa-times' onClick={toggleBar} />}
        
        {isAuth && <li><NavLink exact to='/' activeClassName='active'>Home</NavLink></li>}
        <li><NavLink to=''>Users</NavLink></li>
        {isAuth && <li><NavLink to=''>Posts</NavLink></li>}
        {isAuth && <li><NavLink to=''>Create Post</NavLink></li>}
        {!isAuth && <li><NavLink to='/register'>Register</NavLink></li>}
        {!isAuth && <li><NavLink to=''>Login</NavLink></li>}
        {isAuth && <li><Link to=''>Logout</Link></li>}
      </ul>

      <p className='user'>
        <span>Hello User</span>
        <Link to='' className='user-image' />
      </p>
    </nav>
  );
}

const mapStateToProps = state => ({
  isAuth: state.auth.userId
});

export default connect(mapStateToProps, null)(NavBar);
