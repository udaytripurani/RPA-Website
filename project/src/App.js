import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './nav';
import Home from './home';
import EventsComponent from './EventsComponent';
import RpaBlog from './RpaBlog'; // Import the RpaBlog component
import Login from './login';
import SignUp from './SignUp';
function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsComponent />} />
          <Route path="/blog" element={<RpaBlog />} /> {/* New route for RpaBlog component */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
