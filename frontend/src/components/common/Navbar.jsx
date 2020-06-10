import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavBar.scss';

import { connect } from 'react-redux';

import { logout } from '../../store/actions/auth-action';


const NavBar = ({ isAuth, userName, logout }) => {
  const [toggle, setToggle] = useState(false);

  const toggleBar = () => {
    setToggle(!toggle);
  }

  const closeMenu = () => {
    setToggle(false);
  }

  return (
    <nav>
      <Link to='' className='logo' />
      <ul className={toggle ? 'show' : null}>
        {!toggle && <i className='fas fa-bars' onClick={toggleBar} />}
        {toggle && <i className='fas fa-times' onClick={toggleBar} />}
        
        {isAuth && <li><NavLink exact to='/' activeClassName='active' onClick={closeMenu}>Home</NavLink></li>}
        <li><NavLink to='/users' onClick={closeMenu}>Users</NavLink></li>
        {isAuth && <li><NavLink to='/posts' onClick={closeMenu}>Posts</NavLink></li>}
        {isAuth && <li><NavLink to='/create-post' onClick={closeMenu}>Create Post</NavLink></li>}
        {!isAuth && <li><NavLink to='/register' onClick={closeMenu}>Register</NavLink></li>}
        {!isAuth && <li><NavLink to='/login' onClick={closeMenu}>Login</NavLink></li>}
        {isAuth && <li>
          <Link to='' onClick={logout}>Logout</Link>
        </li>}
      </ul>

      {isAuth && <p className='user'>
        <span>Hello {userName}</span>
        <Link to='' className='user-image' />
      </p>}
    </nav>
  );
}

const mapStateToProps = state => ({
  isAuth: state.auth.userId,
  userName: state.auth.name
});

export default connect(mapStateToProps, { logout })(NavBar);
