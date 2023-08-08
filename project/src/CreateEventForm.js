import React, { useState } from "react";
import axios from "axios";

const CreateEventForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [posterImage, setPosterImage] = useState(null);

  const handleDescriptionChange = (event) => {
    const content = event.target.value.trim();
    setDescription(content);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("venue", venue);
      formData.append("date", date);
      formData.append("posterImage", posterImage);
  
      const response = await fetch("http://localhost:5000/upload-event", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        // Clear form fields after successful submission
        setTitle("");
        setDescription("");
        setVenue("");
        setDate("");
        setPosterImage(null);
      } else {
        console.error("Error creating event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="create-event-container">
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
          <p>{description.split(/\s+/).length}/75 words</p>
        </div>
        <div className="form-group">
          <label>Venue:</label>
          <input
            type="text"
            name="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="text"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Poster Image:</label>
          <input
            type="file"
            name="posterImage"
            accept="image/*"
            onChange={(e) => setPosterImage(e.target.files[0])}
          />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEventForm;
