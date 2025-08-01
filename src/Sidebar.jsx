export default function Sidebar({ pins }) {
  return (
    <div style={{
      width: '300px',
      padding: '15px',
      borderRight: '1px solid #ccc',
      overflowY: 'auto',
      height: '100vh',
      background: '#f3e8ff'
    }}>
      <h2>📍 Saved Pins</h2>

      {pins.length === 0 ? (
        <p>No pins saved yet. Click on the map to add one!</p>
      ) : (
        pins.map((pin, i) => (
          <div key={i} style={{
            marginBottom: '20px',
            padding: '10px',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <strong>Remarks:</strong>
            <p>{pin.remark || "(no description)"}</p>

            <strong>Location:</strong>
            <p>Lat: {pin.lat.toFixed(4)}, Lng: {pin.lng.toFixed(4)}</p>

            <strong>Address:</strong>
            <p style={{ fontSize: '0.9em', color: '#555' }}>
              {pin.address || "Not available"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
