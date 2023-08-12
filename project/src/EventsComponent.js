import React, { useState, useEffect } from 'react';
import './EventsComponent.css';
import { useNavigate } from 'react-router-dom';
import  eventIcon  from 'C:/Users/Uday/Desktop/RPA/TESTS/project/src/images/icons8-event-48.png';
const EventsComponent = () => {
  const [events, setEvents] = useState({ upcoming: [], completed: [] });
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:5000/get-events')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const currentDate = new Date();
        const upcomingEvents = [];
        const completedEvents = [];
  
        data.forEach((event) => {
          const eventDate = new Date(event.date);
  
          if (eventDate > currentDate) {
            upcomingEvents.push(event);
          } else {
            completedEvents.push(event);
          }
        });
  
        setEvents({ upcoming: upcomingEvents, completed: completedEvents });
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);
  

  return (
    <div className="eventsComponent">
      
      <div className="container">
        <h1 className="text-center mt-5">
          <strong>Upcoming Events</strong>
          {isLoggedIn === "true" && (
            <button
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '8px 16px',
                cursor: 'pointer',
                marginLeft:'1000px',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                fontFamily: 'Gotham Bold, sans-serif',
                padding: '12px 24px',
                fontSize: '16px',
              }}
              onClick={() => navigate('/eventcreate')}
            >
              <img
                src={eventIcon}
                alt="Event Icon"
                style={{ marginRight: '8px', height: '20px', width: '20px', filter: 'invert(1)' }}
              />{' '}
              <span style={{ marginBottom: '3px' }}>Create Events</span>
            </button>
          )}
  
        </h1>
        <div className="events-container">
          {events.upcoming.map((event) => (
            <div key={event.id} className="event-box">
              <img src={require(`C:/Users/Uday/Desktop/RPA/TESTS/server/public/images/${event.image}`)} alt={event.title} />
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
          {events.completed.map((event) => (
            <div key={event.id} className="event-box completed">
              <img src={require(`C:/Users/Uday/Desktop/RPA/TESTS/server/public/images/${event.image}`)} alt={event.title} />
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
