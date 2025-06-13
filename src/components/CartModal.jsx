import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
// We need to install emailjs-com: npm install @emailjs/browser
import emailjs from '@emailjs/browser';


const CartModal = () => {
    const { isCartOpen, closeCart, cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
    const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    if (!isCartOpen) return null;
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitOrder = (e) => {
        e.preventDefault();
        if(!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
            alert('Vui lòng điền đầy đủ thông tin giao hàng!');
            return;
        }

        setStatus('sending');

        const templateParams = {
            customer_name: customerInfo.name,
            customer_phone: customerInfo.phone,
            customer_address: customerInfo.address,
            order_items: cartItems.map(item => `${item.name} (x${item.quantity})`).join('\n'),
            total_price: totalPrice.toLocaleString('vi-VN') + 'đ',
        };
        
        // IMPORTANT: Replace with your actual EmailJS Service ID, Template ID, and Public Key
        const SERVICE_ID = 'YOUR_SERVICE_ID';
        const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
        const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            .then((response) => {
               console.log('SUCCESS!', response.status, response.text);
               setStatus('success');
               clearCart(); // Clear the cart after successful order
            }, (err) => {
               console.log('FAILED...', err);
               setStatus('error');
            });
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <button onClick={closeCart} style={styles.closeButton}><X size={24} /></button>
                <h2 style={styles.title}>Giỏ Hàng Của Bạn</h2>

                {status === 'success' ? (
                    <div style={styles.successMessage}>
                        <h3>Đặt Hàng Thành Công!</h3>
                        <p>Cảm ơn bạn đã tin tưởng TÉP TÉP. Chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng trong thời gian sớm nhất.</p>
                        <button onClick={closeCart} style={styles.successButton}>Đóng</button>
                    </div>
                ) : cartItems.length === 0 ? (
                    <p style={styles.emptyText}>Giỏ hàng của bạn đang trống.</p>
                ) : (
                    <div style={styles.contentWrapper}>
                        <div style={styles.itemList}>
                            {cartItems.map(item => (
                                <div key={item.name} style={styles.item}>
                                    <img src={item.image} alt={item.name} style={styles.itemImage} />
                                    <div style={styles.itemDetails}>
                                        <p style={styles.itemName}>{item.name}</p>
                                        <p style={styles.itemPrice}>{item.price}</p>
                                    </div>
                                    <div style={styles.quantityControl}>
                                        <button onClick={() => updateQuantity(item.name, item.quantity - 1)} style={styles.quantityButton}><Minus size={14}/></button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.name, item.quantity + 1)} style={styles.quantityButton}><Plus size={14}/></button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.name)} style={styles.removeButton}><Trash2 size={16} /></button>
                                </div>
                            ))}
                        </div>
                        <div style={styles.summaryAndForm}>
                            <div style={styles.summary}>
                                <strong>Tổng cộng:</strong>
                                <strong style={styles.totalPrice}>{totalPrice.toLocaleString('vi-VN')}đ</strong>
                            </div>
                            <form onSubmit={handleSubmitOrder} style={styles.form}>
                                <h3 style={styles.formTitle}>Thông Tin Giao Hàng</h3>
                                <input type="text" name="name" placeholder="Họ và tên" required style={styles.input} onChange={handleInputChange} />
                                <input type="tel" name="phone" placeholder="Số điện thoại" required style={styles.input} onChange={handleInputChange} />
                                <textarea name="address" placeholder="Địa chỉ" required rows="3" style={styles.input} onChange={handleInputChange}></textarea>
                                <button type="submit" style={styles.submitButton} disabled={status === 'sending'}>
                                    {status === 'sending' ? 'Đang Gửi...' : 'Hoàn Tất Đơn Hàng'}
                                </button>
                                {status === 'error' && <p style={styles.errorMessage}>Đã có lỗi xảy ra. Vui lòng thử lại.</p>}
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


// CSS-in-JS Styles for the component
const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' },
    modal: { backgroundColor: 'white', padding: '24px', borderRadius: '12px', width: '90%', maxWidth: '800px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 5px 15px rgba(0,0,0,0.3)'},
    closeButton: { position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: '#888' },
    title: { textAlign: 'center', marginBottom: '24px', color: 'var(--mau-text-chinh)' },
    contentWrapper: { display: 'flex', gap: '24px', flex: 1, overflow: 'hidden' },
    itemList: { flex: 2, overflowY: 'auto', borderRight: '1px solid #eee', paddingRight: '16px'},
    item: { display: 'flex', alignItems: 'center', marginBottom: '16px', gap: '12px' },
    itemImage: { width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' },
    itemDetails: { flex: 1 },
    itemName: { fontWeight: 'bold', color: 'var(--mau-text-chinh)' },
    itemPrice: { color: 'var(--mau-text-phu)', fontSize: '14px' },
    quantityControl: { display: 'flex', alignItems: 'center', gap: '8px' },
    quantityButton: { border: '1px solid #ccc', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#f8f8f8' },
    removeButton: { background: 'none', border: 'none', color: '#aaa', cursor: 'pointer' },
    summaryAndForm: { flex: 1.5, display: 'flex', flexDirection: 'column'},
    summary: { display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px solid #eee' },
    totalPrice: { color: 'var(--mau-cam)' },
    form: { display: 'flex', flexDirection: 'column', gap: '12px'},
    formTitle: { fontSize: '16px', color: 'var(--mau-text-chinh)', marginBottom: '4px'},
    input: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' },
    submitButton: { backgroundColor: 'var(--mau-cam)', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' },
    emptyText: { textAlign: 'center', color: '#888', padding: '40px 0' },
    successMessage: { textAlign: 'center', padding: '20px' },
    successButton: { marginTop: '20px', backgroundColor: 'var(--mau-cam)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer'},
    errorMessage: { color: 'red', fontSize: '12px', textAlign: 'center', marginTop: '8px' },
};


export default CartModal;
