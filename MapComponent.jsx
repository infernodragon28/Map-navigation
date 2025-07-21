import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';
import './fixLeafletIcon'; // this for icon fixess

function MapComponent({ onAddPin, pins = [] }) {
  const [map, setMap] = useState(null); // store the map instance

  // Handle map click events
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        const remark = prompt('What should we call this location?');
        
        // Only add if user didn't cancel
        if (remark !== null) {
          const newMarker = {
            lat,
            lng,
            remark,
            address: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`
          };
          onAddPin(newMarker);
        }
      }
    });
    
    return null; // no DOM to render
  }

  return (
    <div style={{ flex: 1, height: '100vh' }}>
      <MapContainer
        center={[20.5937, 78.9629]}  // center on India
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        whenCreated={setMap}  // capture map instance
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        
        <MapClickHandler />
        
        {pins.map((pin, i) => (
          <Marker 
            position={[pin.lat, pin.lng]} 
            key={`marker-${i}-${Date.now()}`}  // unique enough key
          >
            <Popup>
              <div>
                <b>Remark:</b> {pin.remark || 'No description'}<br />
                <b>Address:</b> {pin.address || 'Unknown'}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapComponent;