import React from 'react';
 // Import CSS module
import './EventsComponent.css';
import event1 from './images/event1.jpg';
import event2 from './images/event2.png';
const EventsComponent = () => {
  return (
    <div className="eventsComponent">
      <div className="container">
      <h1 className="text-center mt-5"><strong>Upcoming Events</strong></h1>
      <div className="events-container">
        {/* Replace the following section with your upcoming events data */}
        <div className="event-box">
        <img src={event1} alt="Example" />
          <div className="event-details">
            <h2><strong>Event 1 Title</strong></h2>
            <p>Description of Event 1 goes here.</p>
            <div className="event-status ml-auto">
              <a href="#" className="btn btn-primary">Register</a>
            </div>
          </div>
        </div>
        {/* Add more upcoming events here */}
      </div>

      <h1 className="text-center mt-5"><strong>Completed Events</strong></h1>
      <div className="events-container">
        {/* Replace the following section with your completed events data */}
        <div className="event-box completed">
          <img src={event2} alt="Event 2" />
          <div className="event-details">
            <h2><strong>Event 2 Title</strong></h2>
            <p>Description of Event 2 goes here.</p>
            <div className="event-status ml-auto">
              <span className="btn btn-success">Completed</span>
            </div>
          </div>
        </div>
        {/* Add more completed events here */}
      </div>
    </div>
    </div>
  );
};

export default EventsComponent;
