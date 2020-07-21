import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavBar.scss';

import { connect } from 'react-redux';

import { logout } from '../../store/actions/auth-action';


const NavBar = ({ isAuth, userName, avatar, logout }) => {
  const [toggle, setToggle] = useState(false);
  const isAdmin = localStorage.getItem('role') === 'admin';
  
  let avatarUrl;
  if(avatar && avatar.startsWith('http')) {
    avatarUrl = avatar;
  } else {
    avatarUrl = avatar && avatar.split('images\\users').join('');
  }

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
        
        {isAuth && <li>
          <NavLink exact to='/' activeClassName='active' onClick={closeMenu}>
            {isAdmin ? 'Dashboard' : 'Home'}
          </NavLink>
        </li>}
        <li><NavLink to='/users' onClick={closeMenu}>Users</NavLink></li>
        {isAuth && <li><NavLink to='/posts' onClick={closeMenu}>Posts</NavLink></li>}
        {isAuth && !isAdmin && <li><NavLink to='/create-post' onClick={closeMenu}>Create Post</NavLink></li>}
        {!isAuth && <li><NavLink to='/register' onClick={closeMenu}>Register</NavLink></li>}
        {!isAuth && <li><NavLink to='/login' onClick={closeMenu}>Login</NavLink></li>}
        {isAuth && <li>
          <Link to='/' onClick={() => logout(false)}>Logout</Link>
        </li>}
      </ul>

      {isAuth && <p className='user'>
        <span>
          Hello
          <small>,</small>{'    '}
          {userName.split(' ')[0]}
        </span>
        <Link 
          to={`/users/${isAuth}`} 
          className='user-image' 
          style={{
            backgroundImage: `url(${
              avatar ? 
                avatarUrl.startsWith('http') ? avatarUrl :`http://localhost:5000/images/users/${avatarUrl}` : 
                '/avatar.jpg'})`
          }}
        />
      </p>}
    </nav>
  );
}

const mapStateToProps = state => ({
  isAuth: state.auth.userId,
  userName: state.auth.name,
  avatar: state.auth.avatar,
});

export default connect(mapStateToProps, { logout })(NavBar);
