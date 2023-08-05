import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './nav';
import Home from './home';
import EventsComponent from './EventsComponent'; // Import the EventsComponent

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
