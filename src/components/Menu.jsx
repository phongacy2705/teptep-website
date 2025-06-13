import React from 'react';
import { useCart } from '../contexts/CartContext'; // Import useCart hook

const menuItems = [
  { name: 'Bánh tráng trộn Tép Tép', description: 'Phiên bản đặc trưng với tép sấy giòn tan, xoài xanh, trứng cút và sốt bơ độc quyền.', price: '25.000đ', image: 'https://placehold.co/400x400/f97316/ffffff?text=Tép+Tép', tag: 'Bán Chạy' },
  { name: 'Bánh tráng cuộn sốt me', description: 'Bánh tráng dẻo cuộn với hành phi, đậu phộng, và chấm cùng sốt me chua ngọt đậm đà.', price: '20.000đ', image: 'https://placehold.co/400x400/fb923c/ffffff?text=Cuộn+Me' },
  { name: 'Bánh tráng phơi sương', description: 'Đặc sản Tây Ninh với bánh tráng dẻo, muối nhuyễn, hành phi và tép sấy.', price: '30.000đ', image: 'https://placehold.co/400x400/fdba74/ffffff?text=Phơi+Sương' },
  { name: 'Bánh tráng bơ tỏi cay', description: 'Sự kết hợp bùng nổ của bơ béo ngậy, tỏi phi thơm lừng và vị cay nồng của ớt bột.', price: '25.000đ', image: 'https://placehold.co/400x400/fed7aa/ffffff?text=Bơ+Tỏi+Cay', tag: 'Món Mới' }
];

const Menu = () => {
    // Lấy hàm addToCart từ "bộ não" giỏ hàng
    const { addToCart } = useCart();

    return (
        <section id="thuc-don" style={{ padding: '80px 0', backgroundColor: '#fff7ed' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#1e293b' }}>
                        Thực Đơn <span style={{ color: '#f97316' }}>TÉP TÉP</span>
                    </h2>
                    <p style={{ color: '#475569', marginTop: '8px' }}>Những hương vị độc đáo đang chờ bạn khám phá.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
                    {menuItems.map((item, index) => (
                        <div key={index} style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                            <div style={{ position: 'relative' }}>
                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                 {item.tag && (
                                    <span style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: '#f97316', color: 'white', fontSize: '12px', fontWeight: 'bold', padding: '4px 12px', borderRadius: '9999px' }}>{item.tag}</span>
                                )}
                            </div>
                            <div style={{ padding: '24px' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>{item.name}</h3>
                                <p style={{ color: '#475569', fontSize: '14px', marginBottom: '16px', minHeight: '60px' }}>{item.description}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#f97316' }}>{item.price}</span>
                                    {/* Thêm sự kiện onClick cho nút bấm */}
                                    <button onClick={() => addToCart(item)} style={{ backgroundColor: '#1e293b', color: 'white', fontSize: '14px', fontWeight: 'bold', padding: '8px 16px', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}>
                                        Thêm vào giỏ
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Menu;
