import React from 'react';
import './nav.css';
import { Link, useNavigate } from 'react-router-dom';
const Nav = () => {
  const redirectToUrl = (url) => {
    window.location.href = url;
  };
  const navigate = useNavigate();
  return (
    <div className="nav">
    <nav className="navbar">
      <div className="logo" onClick={() => redirectToUrl("/")}>
        <img src={"./logo.png"} alt="Logo" />
      </div>
      <ul className="navbar-components">
        <li>
          <a href="events">EVENTS</a>
        </li>
        <li>
          <a href="/blog">BLOGS</a>
        </li>
        <li>
          <a href="#">GALLERY</a>
        </li>
        <li>
          <a href="#">OUR TEAM</a>
        </li>
      </ul>
      <button
          className="button-50 login-button"
          role="button"
          onClick={() => navigate('/login')}
        >
          LOGIN
        </button>

    </nav>
    </div>
  );
};

export default Nav;
