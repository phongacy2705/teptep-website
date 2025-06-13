// src/components/Testimonials.jsx
import React from 'react';
import testimonials from '../utils/data';

export default function Testimonials() {
  return (
    <section id="danh-gia" style={{ padding: '80px 0', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700 }}>Khách Hàng <span style={{ color: 'var(--mau-cam)' }}>Nói Gì?</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {testimonials.map((item, index) => (
            <div key={index} style={{ backgroundColor: 'var(--mau-nen)', padding: '32px', borderRadius: '16px' }}>
              <p style={{ color: 'var(--mau-text-phu)', fontStyle: 'italic', marginBottom: '24px' }}>“{item.quote}”</p>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: 'bold' }}>{item.author}</p>
                <p style={{ fontSize: '14px', color: 'var(--mau-cam)' }}>{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
