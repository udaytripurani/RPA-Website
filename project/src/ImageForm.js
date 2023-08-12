import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
const ImageForm = () => {
  const [file, setFile] = useState(null);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setSelectedImage(URL.createObjectURL(selectedFile));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    // Append other event details to the form data
    for (const key in eventDetails) {
      formData.append(key, eventDetails[key]);
    }

    axios
      .post("http://localhost:5000/upload-event", formData)
      .then((res) => {
        console.log(res.data.Status);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const styles = {
    form: {
      maxWidth: "500px",
      margin: "0 auto",
      padding: "30px",
      backgroundColor: "#ffffff",
      border: "1px solid #e0e0e0",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      fontWeight: "bold",
      marginBottom: "6px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
      resize: "vertical",
    },
    fileInput: {
      display: "block",
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    previewImage: {
      display: "block",
      maxWidth: "100%",
      marginTop: "10px",
    },
    button: {
      backgroundColor: "#3498db",
      color: "white",
      padding: "12px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "18px",
      transition: "background-color 0.2s",
    },
  };

  return (
    <div>
      {isLoggedIn === "true" ? (
        <form style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="title" style={styles.label}>
              Event Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={eventDetails.title}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="description" style={styles.label}>
              Event Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={eventDetails.description}
              onChange={handleInputChange}
              style={styles.textarea}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="venue" style={styles.label}>
              Event Venue:
            </label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={eventDetails.venue}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="date" style={styles.label}>
              Event Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={eventDetails.date}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="file" style={styles.label}>
              Upload Poster Image:
            </label>
            <input
              type="file"
              id="file"
              accept=".jpg"
              onChange={handleFileChange}
              style={styles.fileInput}
            />
            {selectedImage && (
              <img src={selectedImage} alt="Selected" style={styles.previewImage} />
            )}
          </div>
          <button style={styles.button} onClick={handleSubmit}>
            Create Event
          </button>
        </form>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
  
};

export default ImageForm;
