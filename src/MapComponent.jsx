import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';
import './fixLeafletIcon'; // For Leaflet icon fix

function MapComponent({ onAddPin, pins = [] }) {
  const [map, setMap] = useState(null);

  async function fetchAddress(lat, lng) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      {
        headers: {
          "User-Agent": "MapPinDropper/1.0 (your@email.com)", 
          "Accept-Language": "en" 
        }
      }
    );

    const data = await response.json();
    return data.display_name || `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
  } catch (error) {
    console.error('Reverse geocoding failed:', error);
    return `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
  }
}

  function MapClickHandler() {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        const remark = prompt('What should we call this location?');

        if (remark !== null) {
          const address = await fetchAddress(lat, lng);
          const newMarker = { lat, lng, remark, address };
          onAddPin(newMarker);
        }
      }
    });
    return null;
  }

  return (
    <div style={{ flex: 1, height: '100vh' }}>
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        whenCreated={setMap}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <MapClickHandler />
        {pins.map((pin, i) => (
          <Marker position={[pin.lat, pin.lng]} key={`marker-${i}`}>
            <Popup>
              <b>Remark:</b> {pin.remark}<br />
              <b>Address:</b> {pin.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
