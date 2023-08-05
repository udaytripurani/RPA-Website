import React from 'react';
import event1 from './images/event1.jpg';
const RpaBlog = () => {
  const blogStyle = {
    backgroundColor: '#f2f2f2',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    padding: '20px',
    margin: '0',
  };

  const headerStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    textAlign: 'center',
    padding: '2rem 0',
  };

  const mainStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
  };

  const cardStyle = {
    width: '800px',
    height:'650px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    overflow: 'hidden',
    marginBottom: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
  };

  const cardImgStyle = {
    width: '100%', /* The image will take the full width of its container */
    height: '400px', /* Set the fixed height for the image */
    objectFit: 'contain', /* Maintain aspect ratio and fit the image inside the container */
  };
  

  const cardContentStyle = {
    padding: '1rem',
    flex: '1',
  };

  const handjetFontStyle = {
    fontFamily: "'Handjet', sans-serif",
    fontWeight: 'bold',
  };

  const robotoMonoFontStyle = {
    fontFamily: "'Roboto Mono', monospace",
    marginBottom: '0.5rem',
  };

  const montserratFontStyle = {
    fontFamily: "'Montserrat', sans-serif",
  };

  const dateFontStyle = {
    fontFamily: "'Edu SA Beginner', sans-serif",
  };

  const readMoreStyle = {
    display: 'inline-block',
    backgroundColor: 'transparent',
    color: '#007bff',
    padding: '0.3rem 0',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: "'Roboto Mono', monospace",
  };

  const readMoreHoverStyle = {
    color: '#0056b3',
  };

   // Blog data for the new blog card
   const blogData1 = {
    title: 'Automation in Healthcare',
    date: 'September 20, 2023',
    author: 'Edu SA Beginner',
    imageUrl: 'https://via.placeholder.com/800x400',
    content:
      'Discover how automation is revolutionizing the healthcare industry by enhancing patient care and streamlining administrative processes...',
    readMoreLink: '#',
  };

  const blogData2 = {
    title: 'The Future of Robotics in Manufacturing',
    date: 'October 5, 2023',
    author: 'Edu SA Beginner',
    imageUrl: 'https://via.placeholder.com/800x400',
    content:
      'Explore the latest advancements in robotics and how they are reshaping the manufacturing sector with increased productivity and efficiency...',
    readMoreLink: '#',
  };

  return (
    <div style={blogStyle}>
      {/* Header */}
      <header style={headerStyle}>
        <h1 style={handjetFontStyle}>RPA Technical Club</h1>
        <p style={montserratFontStyle}>Explore the World of Robotic Process Automation</p>
      </header>

      {/* Main content */}
      <main style={mainStyle}>
        <div style={cardStyle}>
          <img
            style={cardImgStyle}
            src={event1}
            alt="Sample Image"
          />
          <div style={cardContentStyle}>
            <h2 style={robotoMonoFontStyle}>{blogData1.title}</h2>
            <p style={dateFontStyle}>
              Posted by <span style={dateFontStyle}>{blogData1.author}</span> | {blogData1.date}
            </p>
            <p style={montserratFontStyle}>
              {blogData1.content}
            </p>
            <a style={readMoreStyle} href={blogData1.readMoreLink}>
              Read more -→
            </a>
          </div>
        </div>

        <div style={cardStyle}>
          <img
            style={cardImgStyle}
            src={blogData2.imageUrl}
            alt="Sample Image"
          />
          <div style={cardContentStyle}>
            <h2 style={robotoMonoFontStyle}>{blogData2.title}</h2>
            <p style={dateFontStyle}>
              Posted by <span style={dateFontStyle}>{blogData2.author}</span> | {blogData2.date}
            </p>
            <p style={montserratFontStyle}>
              {blogData2.content}
            </p>
            <a style={readMoreStyle} href={blogData2.readMoreLink}>
              Read more -→
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};


export default RpaBlog;
