import React from 'react';
import './nav.css';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  const handleLogout = () => {
    window.localStorage.clear();
    navigate('/'); // Redirect to the home page after logout
  };

  return (
    <div className="nav">
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src="./logo.png" alt="Logo" />
          </Link>
        </div>
        <ul className="navbar-components">
          <li>
            <Link to="/events">EVENTS</Link>
          </li>
          <li>
            <Link to="/blog">BLOGS</Link>
          </li>
          <li>
            <a href="#">GALLERY</a>
          </li>
          <li>
            <a href="#">OUR TEAM</a>
          </li>
          {isLoggedIn === "true" && (
            <li>
              <Link to="/userDetails" className="navbar-link">PROFILE</Link>
            </li>
          )}
        </ul>
        {isLoggedIn === "true" ? (
          <button className="button-50 login-button" onClick={handleLogout}>
            LOGOUT
          </button>
        ) : (
          <button
            className="button-50 login-button"
            onClick={() => navigate('/login')}
          >
            LOGIN
          </button>
        )}
      </nav>
    </div>
  );
};

export default Nav;
