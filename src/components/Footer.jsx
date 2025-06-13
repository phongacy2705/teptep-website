import React from 'react';
import { Facebook, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '40px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '24px' }}>
          <a href="https://facebook.com/banhtrangteptep" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8' }}>
            <Facebook size={24} />
          </a>
          <a href="mailto:banhtrangteptep@gmail.com" style={{ color: '#94a3b8' }}>
            <Mail size={24} />
          </a>
          <a href="tel:0849029092" style={{ color: '#94a3b8' }}>
            <Phone size={24} />
          </a>
        </div>
        <div style={{ fontSize: '14px' }}>
          <p>&copy; {new Date().getFullYear()} TÉP TÉP. All Rights Reserved.</p>
          <p style={{ marginTop: '4px' }}>Thiết kế với ❤️ dành cho ẩm thực Việt.</p>
        </div>
      </div>
    </footer>
  );
}
