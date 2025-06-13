import React from 'react';

const testimonials = [
  {
    quote: 'Bánh tráng ở đây đỉnh thật sự, sốt bơ béo ngậy mà không ngán. Sẽ ủng hộ Tép Tép dài dài!',
    author: 'Chị Minh Anh',
    location: 'Quận 1, TP.HCM'
  },
  {
    quote: 'Logo quán siêu cưng, đồ ăn thì chất lượng. Mình đặc biệt thích món bánh tráng trộn Tép Tép.',
    author: 'Anh Quốc Bảo',
    location: 'TP. Thủ Đức'
  },
  {
    quote: 'Giao hàng nhanh, đóng gói sạch sẽ. Vị bánh tráng rất vừa miệng, không quá mặn hay quá ngọt.',
    author: 'Bạn Thu Trang',
    location: 'Quận Bình Thạnh'
  }
];

export default function Testimonials() {
  return (
    <section id="danh-gia" style={{ padding: '80px 0', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700 }}>
            Khách Hàng <span style={{ color: 'var(--mau-cam)' }}>Nói Gì?</span>
          </h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          {testimonials.map((item, index) => (
            <div key={index} style={{
              backgroundColor: 'var(--mau-nen)',
              padding: '32px',
              borderRadius: '16px'
            }}>
              <p style={{
                color: 'var(--mau-text-phu)',
                fontStyle: 'italic',
                marginBottom: '24px'
              }}>
                "{item.quote}"
              </p>
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
