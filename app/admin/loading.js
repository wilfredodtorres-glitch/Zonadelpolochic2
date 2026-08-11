export default function LoadingAdmin() {
  return (
    <div style={{ padding: '2rem', animation: 'pulse 1.5s infinite' }}>
      <div style={{ height: '32px', width: '250px', background: '#e2e8f0', marginBottom: '2rem', borderRadius: '4px' }}></div>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', height: '400px', background: '#e2e8f0', borderRadius: '8px' }}></div>
        <div style={{ flex: '2 1 500px', height: '600px', background: '#e2e8f0', borderRadius: '8px' }}></div>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}</style>
    </div>
  );
}
