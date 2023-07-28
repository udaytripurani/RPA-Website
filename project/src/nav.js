import React from 'react';
import './nav.css';
const Nav = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={"./logo.png"} />
      </div>
      <ul className="navbar-components">
        <li>
          <a href="#">EVENTS</a>
        </li>
        <li>
          <a href="#">BLOGS</a>
        </li>
        <li>
          <a href="#">GALLERY</a>
        </li>
        <li>
          <a href="#">OUR TEAM</a>
        </li>
      </ul>
      <button className="button-50 login-button" role="button">
        LOGIN
      </button>
    </nav>
  );
};

export default Nav;
