import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './nav';
import Home from './home';
import EventsComponent from './EventsComponent';
import RpaBlog from './RpaBlog';
import Login from './login';
import SignUp from './SignUp';
import UserDetails from './UserDetails';

function App() {
  const isLoggedIn = window.localStorage.getItem('loggedIn');

  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsComponent />} />
          <Route path="/blog" element={<RpaBlog />} />
          <Route
            path="/login1"
            element={
              isLoggedIn === 'true' ? (
                <UserDetails />
              ) : (
                <Login key={Math.random()} />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="/logged-out" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
