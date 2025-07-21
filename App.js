import React, { useEffect, useState } from 'react';
import MapComponent from './MapComponent';
import Sidebar from './Sidebar';
import './fixLeafletIcon'; // Need this for Leaflet icon fix

function App() {
  // State for storing map pins
  const [savedPins, setSavedPins] = useState([]);

  // Load pins from localStorage on component mount
  useEffect(() => {
    const pins = localStorage.getItem("savedPins");
    if (pins) {
      try {
        setSavedPins(JSON.parse(pins));
      } catch (e) {
        console.error("Error parsing saved pins", e);
      }
    }
  }, []);

  // Save pins to localStorage when they change
  useEffect(() => {
    if (savedPins?.length) {
      localStorage.setItem("savedPins", JSON.stringify(savedPins));
    }
  }, [savedPins]);

  // Function to add new pin
  const addNewPin = (data) => {
    setSavedPins(prev => [...prev, data]);
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Sidebar pins={savedPins} />
      <MapComponent 
        onAddPin={addNewPin} 
        pins={savedPins} 
      />
    </div>
  )
}

export default App;