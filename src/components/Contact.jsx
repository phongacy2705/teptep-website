import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import useWindowWidth from '../hooks/useWindowWidth';

export default function Contact() {
  const width = useWindowWidth();
  const isMobile = width < 768;

  return (
    <section id="lien-he" style={{ padding: '80px 0', backgroundColor: 'var(--mau-nen-toi)', color: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700 }}>
            Liên Hệ <span style={{ color: '#fb923c' }}>TÉP TÉP</span>
          </h2>
          <p style={{ color: '#94a3b8', marginTop: '8px' }}>Luôn sẵn sàng lắng nghe bạn!</p>
        </div>
        <div style={{
          maxWidth: '896px',
          margin: '0 auto',
          backgroundColor: 'rgba(255,255,255,0.1)',
          padding: '32px',
          borderRadius: '16px'
        }}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '48px', alignItems: 'stretch' }}>
            <form style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="text" placeholder="Tên của bạn" style={inputStyle} />
              <input type="email" placeholder="Email" style={inputStyle} />
              <textarea rows="5" placeholder="Lời nhắn của bạn..." style={{ ...inputStyle, flexGrow: 1 }}></textarea>
              <button type="submit" style={buttonStyle}>Gửi Tin Nhắn</button>
            </form>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}>
              <ContactInfo icon={<MapPin size={20} />} text="229 Đ. Hoàng Văn Thụ, P.8, Phú Nhuận, TP.HCM" />
              <ContactInfo icon={<Phone size={20} />} text="0849.029.092" />
              <ContactInfo icon={<Mail size={20} />} text="banhtrangteptep@gmail.com" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '8px',
  padding: '12px 16px',
  color: 'white'
};

const buttonStyle = {
  backgroundColor: 'var(--mau-cam)',
  fontWeight: 'bold',
  padding: '12px 24px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  color: 'white'
};

function ContactInfo({ icon, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{ color: '#fb923c', flexShrink: 0 }}>{icon}</div>
      <p style={{ color: '#d1d5db' }}>{text}</p>
    </div>
  );
}
