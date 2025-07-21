export default function Sidebar({ pins }) {
  return (
    <div style={{
      width: '300px',
      padding: '15px',
      borderRight: '1px solid #ccc',
      overflowY: 'auto',
      height: '100vh',
      background: '#f9f9f9'
    }}>
      <h2>📍 Saved Pins</h2>
      
      {pins.length === 0 ? (
        <p>No pins saved yet. Click somewhere on the map to add your first pin!</p>
      ) : (
        pins.map((pin, i) => (
          <div 
            key={i} 
            style={{
              marginBottom: '20px',
              padding: '10px',
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <strong>Remarks:</strong>
            <p>{pin.remark || '(no description)'}</p>
            
            <strong>Location:</strong>
            <p style={{ fontSize: '0.9em', color: '#555' }}>
              {pin.address}
            </p>
          </div>
        ))
      )}
    </div>
  )
}