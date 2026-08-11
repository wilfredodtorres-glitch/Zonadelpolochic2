export default function LoadingPublic() {
  return (
    <main style={{ minHeight: '80vh', backgroundColor: '#f9fafb', padding: '3rem 0' }}>
      <div className="contenedor">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ height: '24px', width: '150px', background: '#e2e8f0', margin: '0 auto 1rem auto', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
          <div style={{ height: '40px', width: '300px', background: '#e2e8f0', margin: '0 auto', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
        </div>
        
        <div className="rejilla rejilla-3">
          {[1, 2, 3].map(i => (
            <div key={i} style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb', height: '350px', animation: 'pulse 1.5s infinite' }}>
              <div style={{ height: '200px', background: '#e2e8f0' }}></div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ height: '24px', width: '80%', background: '#e2e8f0', marginBottom: '1rem', borderRadius: '4px' }}></div>
                <div style={{ height: '16px', width: '100%', background: '#e2e8f0', marginBottom: '0.5rem', borderRadius: '4px' }}></div>
                <div style={{ height: '16px', width: '90%', background: '#e2e8f0', borderRadius: '4px' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}</style>
    </main>
  );
}
