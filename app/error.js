'use client';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => { console.error('App error:', error); }, [error]);
  return (
    <main style={{ textAlign: 'center', padding: '60px 20px', fontFamily: 'Courier New, monospace', background: '#0a0a12', minHeight: '100vh', color: '#fff' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>📻</div>
      <h2 style={{ color: '#e53e3e', letterSpacing: 4, marginBottom: 12 }}>SIGNAL LOST</h2>
      <p style={{ color: '#666', fontSize: 13, marginBottom: 24 }}>{error?.message || 'Something went wrong'}</p>
      <button
        onClick={reset}
        style={{ background: 'transparent', border: '2px solid #f5a623', color: '#f5a623', fontFamily: 'Courier New, monospace', fontSize: 14, letterSpacing: 3, padding: '10px 30px', cursor: 'pointer', borderRadius: 4 }}
      >
        ↩ RETRY
      </button>
    </main>
  );
}
