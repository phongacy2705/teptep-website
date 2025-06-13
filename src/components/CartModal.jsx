// src/components/CartModal.jsx
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function CartModal() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    updateQuantity,
    removeFromCart,
    totalPrice,
    clearCart
  } = useCart();
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });
  const [status, setStatus] = useState('idle');

  if (!isCartOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('Vui lòng điền đầy đủ thông tin giao hàng!');
      return;
    }
    setStatus('sending');

    const templateParams = {
      customer_name: customerInfo.name,
      customer_phone: customerInfo.phone,
      customer_address: customerInfo.address,
      order_items: cartItems.map(item => `${item.name} (x${item.quantity}) - ${item.price}`).join('\n'),
      total_price: totalPrice.toLocaleString('vi-VN') + 'đ',
    };

    emailjs.send('service_su95piv', 'template_mpf951e', templateParams, 'kLgDb5KQHKShA0Tpb')
      .then(() => {
        setStatus('success');
        clearCart();
      })
      .catch(() => {
        setStatus('error');
      });
  };

  return (
    <div className="cart-overlay">
      <div className="cart-modal">
        <button className="cart-close" onClick={closeCart}><X size={24} /></button>
        <h2>Giỏ Hàng Của Bạn</h2>

        {status === 'success' ? (
          <div className="cart-success">
            <h3>Đặt Hàng Thành Công!</h3>
            <p>Chúng tôi sẽ liên hệ xác nhận đơn hàng sớm nhất.</p>
            <button onClick={closeCart}>Đóng</button>
          </div>
        ) : cartItems.length === 0 ? (
          <p className="cart-empty">Giỏ hàng của bạn đang trống.</p>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map(item => (
                <div className="cart-item" key={item.name}>
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                  </div>
                  <div className="item-qty">
                    <button onClick={() => updateQuantity(item.name, item.quantity - 1)}><Minus size={14} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.name, item.quantity + 1)}><Plus size={14} /></button>
                  </div>
                  <button className="remove-item" onClick={() => removeFromCart(item.name)}><Trash2 size={16} /></button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <p><strong>Tổng cộng:</strong> <span>{totalPrice.toLocaleString('vi-VN')}đ</span></p>
              <form onSubmit={handleSubmitOrder} className="cart-form">
                <input name="name" placeholder="Họ và tên" onChange={handleInputChange} required />
                <input name="phone" placeholder="Số điện thoại" onChange={handleInputChange} required />
                <textarea name="address" placeholder="Địa chỉ giao hàng" onChange={handleInputChange} required />
                <div className="cart-form-buttons">
                  <button type="button" onClick={closeCart}>Tiếp tục mua</button>
                  <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Đang gửi...' : 'Xác nhận đơn hàng'}</button>
                </div>
                {status === 'error' && <p className="error-msg">Có lỗi xảy ra. Vui lòng thử lại.</p>}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
