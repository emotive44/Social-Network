import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavBar.scss';


const NavBar = () => {
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
        <li><NavLink exact to='/' activeClassName='active'>Home</NavLink></li>
        <li><NavLink to=''>Users</NavLink></li>
        <li><NavLink to=''>Posts</NavLink></li>
        <li><NavLink to=''>Create Post</NavLink></li>
        <li><NavLink to='/register'>Register</NavLink></li>
        <li><NavLink to=''>Login</NavLink></li>
        <li><Link to=''>Logout</Link></li>
      </ul>

      <p className='user'>
        <span>Hello User</span>
        <Link to='' className='user-image' />
      </p>
    </nav>
  );
}

export default NavBar;
