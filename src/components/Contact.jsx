import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Send, Mail } from 'lucide-react';

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
};


const Contact = () => {
    const width = useWindowWidth();
    const isMobile = width < 768;

    return (
     <section id="lien-he" style={{ padding: '80px 0', backgroundColor: '#1e293b', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                 <h2 style={{ fontSize: '2.25rem', fontWeight: 700 }}>
                    Liên Hệ <span style={{ color: '#fb923c' }}>TÉP TÉP</span>
                </h2>
                <p style={{ color: '#94a3b8', marginTop: '8px' }}>Luôn sẵn sàng lắng nghe bạn!</p>
            </div>
             <div style={{ maxWidth: '896px', margin: '0 auto', backgroundColor: 'rgba(255,255,255,0.1)', padding: '32px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '48px', alignItems: 'stretch' }}>
                    <form style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <input type="text" placeholder="Tên của bạn" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '12px 16px', color: 'white' }} />
                        <input type="email" placeholder="Email" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '12px 16px', color: 'white' }} />
                        <textarea rows="5" placeholder="Lời nhắn của bạn..." style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '12px 16px', color: 'white', flexGrow: 1 }}></textarea>
                        <button type="submit" style={{ backgroundColor: '#f97316', fontWeight: 'bold', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <Send size={18} /> Gửi Tin Nhắn
                        </button>
                    </form>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <MapPin size={20} style={{ color: '#fb923c', flexShrink: 0 }} />
                            <p style={{ color: '#d1d5db' }}>229 Đ. Hoàng Văn Thụ, Phường 8, Phú Nhuận, Hồ Chí Minh</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <Phone size={20} style={{ color: '#fb923c', flexShrink: 0 }} />
                            <p style={{ color: '#d1d5db' }}>0849.029.092</p>
                        </div>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <Mail size={20} style={{ color: '#fb923c', flexShrink: 0 }} />
                            <p style={{ color: '#d1d5db' }}>banhtrangteptep@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
}

// Dòng này rất quan trọng, đảm bảo component được xuất mặc định
export default Contact;
