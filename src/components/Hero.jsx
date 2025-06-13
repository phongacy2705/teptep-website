import React from 'react';

export default function Hero() {
  const scrollToMenu = (e) => {
    e.preventDefault();
    const menuSection = document.querySelector('#thuc-don');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section style={{ paddingTop: '128px', paddingBottom: '64px', backgroundColor: 'var(--mau-nen)', textAlign: 'center' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
          fontWeight: 800,
          color: 'var(--mau-text-chinh)',
          marginBottom: '16px',
          lineHeight: 1.2
        }}>
          Bánh Tráng Trộn <span style={{ color: 'var(--mau-cam)' }}>Thế Hệ Mới</span>
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: 'var(--mau-text-phu)',
          maxWidth: '600px',
          margin: '0 auto 2rem'
        }}>
          TÉP TÉP mang đến hương vị bánh tráng trộn truyền thống,
          kết hợp với quy trình đóng gói hiện đại, đảm bảo vệ sinh và trải nghiệm <span style={{ whiteSpace: 'nowrap' }}>tuyệt vời.</span>
        </p>
        <a href="#thuc-don"
          onClick={scrollToMenu}
          style={{
            display: 'inline-block',
            backgroundColor: 'var(--mau-cam)',
            color: 'white',
            fontWeight: 'bold',
            padding: '12px 32px',
            borderRadius: '9999px',
            textDecoration: 'none'
          }}>
          Khám Phá Thực Đơn
        </a>
      </div>
    </section>
  );
}
