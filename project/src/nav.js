import React from 'react';
import './nav.css';

const Nav = () => {
  const redirectToUrl = (url) => {
    window.location.href = url;
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => redirectToUrl("/")}>
        <img src={"./logo.png"} alt="Logo" />
      </div>
      <ul className="navbar-components">
        <li>
          <a href="events">EVENTS</a>
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
