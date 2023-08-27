import React from 'react';
import { Link } from 'react-router-dom'; 
import './header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-text">
          BloggerSpot
        </Link>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <Link to="/my-blogs">My Blogs</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
