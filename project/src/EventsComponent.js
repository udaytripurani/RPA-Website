import React from 'react';
// Import CSS module
import './EventsComponent.css';
import event1 from './images/event1.jpg';
import event2 from './images/event2.png';

const EventsComponent = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Event 1 Title',
      description: 'Description of Event 1 goes here.',
      venue: 'Event 1 Venue',
      date: 'Event 1 Date',
      image: event1,
    },
    // Add more upcoming events here
  ];

  const completedEvents = [
    {
      id: 2,
      title: 'Event 2 Title',
      description: 'Description of Event 2 goes here.',
      venue: 'Event 2 Venue',
      date: 'Event 2 Date',
      image: event2,
    },
    // Add more completed events here
  ];

  return (
    <div className="eventsComponent">
      <div className="container">
        <h1 className="text-center mt-5">
          <strong>Upcoming Events</strong>
        </h1>
        <div className="events-container">
          {/* Display upcoming events */}
          {upcomingEvents.map((event) => (
            <div key={event.id} className="event-box">
              <img src={event.image} alt={event.title} />
              <div className="event-details">
                <h2>
                  <strong>{event.title}</strong>
                </h2>
                <p>{event.description}</p>
                <p>
                  <strong>Venue:</strong> {event.venue}
                </p>
                <p>
                  <strong>Date:</strong> {event.date}
                </p>
                <div className="event-status ml-auto">
                  <a href="#" className="btn btn-primary">
                    Register
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h1 className="text-center mt-5">
          <strong>Completed Events</strong>
        </h1>
        <div className="events-container">
          {/* Display completed events */}
          {completedEvents.map((event) => (
            <div key={event.id} className="event-box completed">
              <img src={event.image} alt={event.title} />
              <div className="event-details">
                <h2>
                  <strong>{event.title}</strong>
                </h2>
                <p>{event.description}</p>
                <p>
                  <strong>Venue:</strong> {event.venue}
                </p>
                <p>
                  <strong>Date:</strong> {event.date}
                </p>
                <div className="event-status ml-auto">
                  <span className="btn btn-success">Completed</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsComponent;
