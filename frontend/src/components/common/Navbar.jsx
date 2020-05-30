import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';


const NavBar = () => {
  return (
    <nav>
      <Link to='' className='logo' />
      <ul>
        <li>Home</li>
        <li>Users</li>
        <li>Create Post</li>
        <li>Login</li>
        <li>Register</li>
      </ul>

      <p className="user">
        <span>Hello User</span>
        <Link to='' className="user-image" />
      </p>
    </nav>
  );
}

export default NavBar;
