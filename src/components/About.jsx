import React from 'react';
import useWindowWidth from '../hooks/useWindowWidth';

export default function About() {
  const width = useWindowWidth();
  const isMobile = width < 768;

  return (
    <section id="gioi-thieu" style={{ padding: '80px 0', backgroundColor: 'white' }}>
      <div style={{
        maxWidth: '1024px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        gap: '48px'
      }}>
        <div style={{ flex: 1 }}>
          <img
            src="/logoteptep.png"
            alt="Logo Tép Tép"
            style={{
              borderRadius: '16px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              width: '100%',
              maxWidth: '450px',
              margin: '0 auto'
            }}
          />
        </div>
        <div style={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 700,
            color: 'var(--mau-text-chinh)',
            marginBottom: '16px'
          }}>
            Câu Chuyện Của <span style={{ color: 'var(--mau-cam)' }}>TÉP TÉP</span>
          </h2>
          <p style={{ color: 'var(--mau-text-phu)', marginBottom: '16px' }}>
            Ra đời từ niềm đam mê với ẩm thực đường phố Việt Nam, TÉP TÉP mong muốn nâng tầm món bánh tráng trộn quen thuộc.
            Chúng tôi kết hợp công thức gia truyền với quy trình chế biến và đóng gói theo tiêu chuẩn công nghệ,
            đảm bảo mỗi sản phẩm đến tay bạn đều thơm ngon, sạch sẽ và <span style={{ whiteSpace: 'nowrap' }}>tiện lợi.</span>
          </p>
          <p style={{ color: 'var(--mau-text-phu)' }}>
            Linh vật của chúng tôi - chú tép robot, đại diện cho sự giao thoa giữa hương vị truyền thống và tinh thần hiện đại, <span style={{ whiteSpace: 'nowrap' }}>sáng tạo.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
