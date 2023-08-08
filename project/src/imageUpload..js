import React, { useEffect, useState } from 'react';

function EventCreate() {
    const [image, setImage] = useState('');
    const [allImage, setAllImage] = useState([]);
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        venue: '',
        date: '',
    });

    function convertToBase64(e) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = error => {
            console.log('Error: ', error);
        };
    }

    useEffect(() => {
        getImage();
    }, []);

    function uploadImageAndEvent() {
        fetch('http://localhost:5000/upload-image', {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                title: eventData.title,
                description: eventData.description,
                venue: eventData.venue,
                date: eventData.date,
                base64: image,
            }),
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }

    function getImage() {
        fetch('http://localhost:5000/get-image', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                setAllImage(data.data);
            });
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setEventData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f4' }}>
                {image === '' || image === null ? null : <img style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px', borderRadius: '8px' }} src={image} alt="Uploaded Event" />}
                <div className="create-event-container" style={{ marginTop: '20px', width: '100%', maxWidth: '600px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                    <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Create Event</h1>
                    <form>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label>Title:</label>
                            <input type="text" name="title" value={eventData.title} onChange={handleInputChange} style={{ width: '100%', padding: '8px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label>Description:</label>
                            <textarea
                                name="description"
                                id="description"
                                value={eventData.description}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '8px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical', minHeight: '100px', overflow: 'hidden' }}
                            ></textarea>
                            <p id="word-count" style={{ fontSize: '14px', color: '#888', marginTop: '5px' }}>{eventData.description.length}/75 words</p>
                        </div>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label>Venue:</label>
                            <input type="text" name="venue" value={eventData.venue} onChange={handleInputChange} style={{ width: '100%', padding: '8px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label>Date:</label>
                            <input type="text" name="date" value={eventData.date} onChange={handleInputChange} style={{ width: '100%', padding: '8px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                        <input accept="image/*" type="file" onChange={convertToBase64} />
                        <button onClick={uploadImageAndEvent} style={{ display: 'block', width: '100%', padding: '10px', fontSize: '16px', fontWeight: 'bold', color: '#fff', backgroundColor: '#007bff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Create Event</button>
                    </form>
                </div>
                <div className="image-gallery" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                    {allImage.map(data => (
                        <img key={data.id} className="gallery-image" src={data.image} alt={data.title} style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px', marginBottom: '10px', borderRadius: '8px' }} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EventCreate;
