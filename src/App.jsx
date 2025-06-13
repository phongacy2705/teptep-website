import React, { useState, useEffect, Fragment } from 'react';
import { MapPin, Phone, Send, Menu as MenuIcon, Mail, Facebook, ShoppingCart, Trash2, Plus, Minus, X } from 'lucide-react';
// Import thư viện emailjs
import emailjs from '@emailjs/browser';

// --- BỘ NÃO GIỎ HÀNG (CART CONTEXT) ---
const CartContext = React.createContext();

const useCart = () => {
    return React.useContext(CartContext);
};

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.name === product.name);
            if (existingItem) {
                return prevItems.map(item => item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true); 
    };

    const removeFromCart = (productName) => {
        setCartItems(prevItems => prevItems.filter(item => item.name !== productName));
    };

    const updateQuantity = (productName, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productName);
        } else {
            setCartItems(prevItems => prevItems.map(item => item.name === productName ? { ...item, quantity } : item));
        }
    };
    
    const clearCart = () => setCartItems([]);
    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const value = {
        cartItems, addToCart, removeFromCart, updateQuantity, clearCart, isCartOpen, openCart, closeCart,
        totalItems: cartItems.reduce((total, item) => total + item.quantity, 0),
        totalPrice: cartItems.reduce((total, item) => {
            const price = parseFloat(item.price.replace(/[^0-9]/g, ''));
            return total + price * item.quantity;
        }, 0)
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};


// --- COMPONENT THÊM STYLE VÀ FONT ---
const GlobalStylesAndFonts = () => {
    useEffect(() => {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
            :root {
                --mau-cam: #f97316; --mau-nen: #fff7ed; --mau-text-chinh: #1e293b;
                --mau-text-phu: #475569; --mau-nen-toi: #1e293b;
            }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            html { scroll-behavior: smooth; }
            body { font-family: 'Be Vietnam Pro', sans-serif; background-color: #fff; color: var(--mau-text-chinh); line-height: 1.6; }
            .nav-link {
                color: #475569; background-color: transparent; text-decoration: none;
                font-weight: 500; white-space: nowrap; padding: 8px 16px;
                border-radius: 9999px; transition: all 0.2s ease-in-out;
            }
            .nav-link:hover { color: white; background-color: #f97316; }
        `;
        document.head.appendChild(styleTag);
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;700;800&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
        return () => {
            document.head.removeChild(styleTag);
            document.head.removeChild(fontLink);
        };
    }, []);
    return null;
};


// --- Dữ liệu của trang web ---
const menuItems = [
    { name: 'Bánh tráng trộn Tép Tép', description: 'Phiên bản đặc trưng với tép sấy giòn tan, xoài xanh, trứng cút và sốt bơ độc quyền.', price: '25.000đ', image: 'https://placehold.co/400x400/f97316/ffffff?text=Tép+Tép', tag: 'Bán Chạy' },
    { name: 'Bánh tráng cuộn sốt me', description: 'Bánh tráng dẻo cuộn với hành phi, đậu phộng, và chấm cùng sốt me chua ngọt đậm đà.', price: '20.000đ', image: 'https://placehold.co/400x400/fb923c/ffffff?text=Cuộn+Me' },
    { name: 'Bánh tráng phơi sương', description: 'Đặc sản Tây Ninh với bánh tráng dẻo, muối nhuyễn, hành phi và tép sấy.', price: '30.000đ', image: 'https://placehold.co/400x400/fdba74/ffffff?text=Phơi+Sương' },
    { name: 'Bánh tráng bơ tỏi cay', description: 'Sự kết hợp bùng nổ của bơ béo ngậy, tỏi phi thơm lừng và vị cay nồng của ớt bột.', price: '25.000đ', image: 'https://placehold.co/400x400/fed7aa/ffffff?text=Bơ+Tỏi+Cay', tag: 'Món Mới' }
];
const testimonials = [
    { quote: 'Bánh tráng ở đây đỉnh thật sự, sốt bơ béo ngậy mà không ngán. Sẽ ủng hộ Tép Tép dài dài!', author: 'Chị Minh Anh', location: 'Quận 1, TP.HCM' },
    { quote: 'Logo quán siêu cưng, đồ ăn thì chất lượng. Mình đặc biệt thích món bánh tráng trộn Tép Tép.', author: 'Anh Quốc Bảo', location: 'TP. Thủ Đức' },
    { quote: 'Giao hàng nhanh, đóng gói sạch sẽ. Vị bánh tráng rất vừa miệng, không quá mặn hay quá ngọt.', author: 'Bạn Thu Trang', location: 'Quận Bình Thạnh' }
];
const navLinks = [
    { href: '#gioi-thieu', label: 'Về Tép Tép' }, { href: '#thuc-don', label: 'Thực Đơn' },
    { href: '#danh-gia', label: 'Đánh Giá' }, { href: '#lien-he', label: 'Liên Hệ' },
];

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowWidth;
};


// --- Các Component của trang web ---
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { openCart, totalItems } = useCart();
    
    const width = useWindowWidth();
    const isMobile = width < 768;

    const handleScroll = (e, target) => {
        e.preventDefault();
        const element = document.querySelector(target);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
        setIsMenuOpen(false);
    };

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    useEffect(() => {
        const handleScrollEvent = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScrollEvent);
        return () => window.removeEventListener('scroll', handleScrollEvent);
    }, []);

    const headerStyle = {
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(10px)', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        boxShadow: isScrolled ? '0 2px 4px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.3s ease',
    };
    
    const containerStyle = {
        maxWidth: '1200px', margin: '0 auto', padding: '12px 24px', height: '72px',
        alignItems: 'center', display: 'flex', justifyContent: 'space-between',
    };

    return (
        <header style={headerStyle}>
            <div style={containerStyle}>
                {!isMobile ? (
                    <>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                             <a href="#" onClick={scrollToTop} style={{ cursor: 'pointer' }}><img src="/toteptep.png" alt="Logo Tép Tép Mini" style={{ height: '48px' }} /></a>
                        </div>
                        <nav style={{ display: 'flex', gap: '16px' }}>
                            {navLinks.map(link => <a key={link.href} href={link.href} onClick={(e) => handleScroll(e, link.href)} className="nav-link">{link.label}</a>)}
                        </nav>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                             <button onClick={openCart} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}>
                                <ShoppingCart size={28} color="#475569" />
                                {totalItems > 0 && (<span style={{ position: 'absolute', top: '-5px', right: '-8px', backgroundColor: '#f97316', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>{totalItems}</span>)}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <a href="#" onClick={scrollToTop} style={{ cursor: 'pointer' }}><img src="/toteptep.png" alt="Logo Tép Tép Mini" style={{ height: '48px' }} /></a>
                        <div>
                            <button onClick={openCart} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', marginRight: '16px' }}>
                                <ShoppingCart size={24} color="#334155" />
                                {totalItems > 0 && (<span style={{ position: 'absolute', top: '-5px', right: '-8px', backgroundColor: '#f97316', color: 'white', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>{totalItems}</span>)}
                            </button>
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><MenuIcon style={{ width: '24px', height: '24px', color: '#334155' }} /></button>
                        </div>
                    </>
                )}
            </div>
            {isMobile && isMenuOpen && (
                <div style={{ backgroundColor: 'white', padding: '16px 0' }}>
                    <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                       {navLinks.map(link => <a key={link.href} href={link.href} onClick={(e) => handleScroll(e, link.href)} style={{ color: '#475569', textDecoration: 'none', fontWeight: 500 }}>{link.label}</a>)}
                    </nav>
                </div>
            )}
        </header>
    );
};

const Hero = () => (
    <section style={{ paddingTop: '128px', paddingBottom: '64px', backgroundColor: 'var(--mau-nen)', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 800, color: 'var(--mau-text-chinh)', marginBottom: '16px', lineHeight: 1.2 }}>
                Bánh Tráng Trộn <span style={{ color: 'var(--mau-cam)' }}>Thế Hệ Mới</span>
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--mau-text-phu)', maxWidth: '600px', margin: '0 auto 2rem' }}>TÉP TÉP mang đến hương vị bánh tráng trộn truyền thống, kết hợp với quy trình đóng gói hiện đại, đảm bảo vệ sinh và trải nghiệm <span style={{whiteSpace: 'nowrap'}}>tuyệt vời.</span></p>
            <a href="#thuc-don" onClick={(e) => { e.preventDefault(); document.querySelector('#thuc-don').scrollIntoView({ behavior: 'smooth' }); }} style={{ display: 'inline-block', backgroundColor: 'var(--mau-cam)', color: 'white', fontWeight: 'bold', padding: '12px 32px', borderRadius: '9999px', textDecoration: 'none' }}>Khám Phá Thực Đơn</a>
        </div>
    </section>
);

const About = () => {
    const width = useWindowWidth();
    const isMobile = width < 768;
    return (
        <section id="gioi-thieu" style={{ padding: '80px 0', backgroundColor: 'white' }}>
            <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: '48px' }}>
                <div style={{ flex: 1 }}><img src="/logoteptep.png" alt="Logo Tép Tép" style={{ borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '450px', margin: '0 auto' }} /></div>
                <div style={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}>
                    <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--mau-text-chinh)', marginBottom: '16px' }}>Câu Chuyện Của <span style={{ color: 'var(--mau-cam)' }}>TÉP TÉP</span></h2>
                    <p style={{ color: 'var(--mau-text-phu)', marginBottom: '16px' }}>Ra đời từ niềm đam mê với ẩm thực đường phố Việt Nam, TÉP TÉP mong muốn nâng tầm món bánh tráng trộn quen thuộc. Chúng tôi kết hợp công thức gia truyền với quy trình chế biến và đóng gói theo tiêu chuẩn công nghệ, đảm bảo mỗi sản phẩm đến tay bạn đều thơm ngon, sạch sẽ và <span style={{whiteSpace: 'nowrap'}}>tiện lợi.</span></p>
                    <p style={{ color: 'var(--mau-text-phu)' }}>Linh vật của chúng tôi - chú tép robot, đại diện cho sự giao thoa giữa hương vị truyền thống và tinh thần hiện đại, <span style={{whiteSpace: 'nowrap'}}>sáng tạo.</span></p>
                </div>
            </div>
        </section>
    );
};

const Menu = () => {
    const { addToCart } = useCart();
    return (
        <section id="thuc-don" style={{ padding: '80px 0', backgroundColor: 'var(--mau-nen)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 style={{ fontSize: '2.25rem', fontWeight: 700 }}>Thực Đơn <span style={{ color: 'var(--mau-cam)'}}>TÉP TÉP</span></h2>
                    <p style={{ color: 'var(--mau-text-phu)', marginTop: '8px' }}>Những hương vị độc đáo đang chờ bạn khám phá.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
                    {menuItems.map((item, index) => (
                        <div key={index} style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                            <div style={{ position: 'relative' }}>
                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                {item.tag && <span style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: 'var(--mau-cam)', color: 'white', fontSize: '12px', fontWeight: 'bold', padding: '4px 12px', borderRadius: '9999px' }}>{item.tag}</span>}
                            </div>
                            <div style={{ padding: '24px' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px' }}>{item.name}</h3>
                                <p style={{ color: 'var(--mau-text-phu)', fontSize: '14px', marginBottom: '16px', minHeight: '60px' }}>{item.description}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'var(--mau-cam)' }}>{item.price}</span>
                                    <button onClick={() => addToCart(item)} style={{ backgroundColor: 'var(--mau-text-chinh)', color: 'white', fontSize: '14px', fontWeight: 'bold', padding: '8px 16px', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}>Thêm vào giỏ</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Testimonials = () => (
    <section id="danh-gia" style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h2 style={{ fontSize: '2.25rem', fontWeight: 700 }}>Khách Hàng <span style={{ color: 'var(--mau-cam)'}}>Nói Gì?</span></h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                {testimonials.map((item, index) => (
                    <div key={index} style={{ backgroundColor: 'var(--mau-nen)', padding: '32px', borderRadius: '16px' }}>
                        <p style={{ color: 'var(--mau-text-phu)', fontStyle: 'italic', marginBottom: '24px' }}>"{item.quote}"</p>
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

const Contact = () => {
    const width = useWindowWidth();
    const isMobile = width < 768;
    return (
        <section id="lien-he" style={{ padding: '80px 0', backgroundColor: 'var(--mau-nen-toi)', color: 'white' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 style={{ fontSize: '2.25rem', fontWeight: 700 }}>Liên Hệ <span style={{ color: '#fb923c' }}>TÉP TÉP</span></h2>
                    <p style={{ color: '#94a3b8', marginTop: '8px' }}>Luôn sẵn sàng lắng nghe bạn!</p>
                </div>
                <div style={{ maxWidth: '896px', margin: '0 auto', backgroundColor: 'rgba(255,255,255,0.1)', padding: '32px', borderRadius: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '48px', alignItems: 'stretch' }}>
                        <form style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <input type="text" placeholder="Tên của bạn" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '12px 16px', color: 'white' }} />
                            <input type="email" placeholder="Email" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '12px 16px', color: 'white' }} />
                            <textarea rows="5" placeholder="Lời nhắn của bạn..." style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '12px 16px', color: 'white', flexGrow: 1 }}></textarea>
                            <button type="submit" style={{ backgroundColor: 'var(--mau-cam)', fontWeight: 'bold', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Send size={18} /> Gửi Tin Nhắn</button>
                        </form>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><MapPin size={20} style={{ color: '#fb923c', flexShrink: 0 }} /><p style={{ color: '#d1d5db' }}>229 Đ. Hoàng Văn Thụ, P.8, Phú Nhuận, TP.HCM</p></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><Phone size={20} style={{ color: '#fb923c', flexShrink: 0 }} /><p style={{ color: '#d1d5db' }}>0849.029.092</p></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><Mail size={20} style={{ color: '#fb923c', flexShrink: 0 }} /><p style={{ color: '#d1d5db' }}>banhtrangteptep@gmail.com</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '40px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '24px' }}>
                <a href="https://facebook.com/banhtrangteptep" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8' }}><Facebook size={24} /></a>
                <a href="mailto:banhtrangteptep@gmail.com" style={{ color: '#94a3b8' }}><Mail size={24} /></a>
                <a href="tel:0849029092" style={{ color: '#94a3b8' }}><Phone size={24} /></a>
            </div>
            <div style={{ fontSize: '14px' }}>
                <p>&copy; {new Date().getFullYear()} TÉP TÉP. All Rights Reserved.</p>
                <p style={{ marginTop: '4px' }}>Thiết kế với ❤️ dành cho ẩm thực Việt.</p>
            </div>
        </div>
    </footer>
);

// --- COMPONENT GIỎ HÀNG (Đã được thiết kế lại) ---
const CartModal = () => {
    const { isCartOpen, closeCart, cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
    const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });
    const [status, setStatus] = useState('idle');

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
            order_items: cartItems.map(item => `${item.name} (x${item.quantity}) - ${item.price}`).join('\n'),
            total_price: totalPrice.toLocaleString('vi-VN') + 'đ',
        };
        
        // --- CHỖ ĐỂ BẠN ĐIỀN MÃ KHÓA ---
        const SERVICE_ID = 'service_su95piv';
        const TEMPLATE_ID = 'template_mpf951e';
        const PUBLIC_KEY = 'kLgDb5KQHKShA0Tpb';

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            .then((response) => {
               console.log('SUCCESS!', response.status, response.text);
               setStatus('success');
               clearCart();
            }, (err) => {
               console.log('FAILED...', err);
               setStatus('error');
            });
    };

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
        buttonGroup: { display: 'flex', gap: '12px', marginTop: '8px' },
        saveButton: { flex: 1, backgroundColor: '#6b7280', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' },
        submitButton: { flex: 2, backgroundColor: 'var(--mau-cam)', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' },
        emptyText: { textAlign: 'center', color: '#888', padding: '40px 0' },
        successMessage: { textAlign: 'center', padding: '20px' },
        successButton: { marginTop: '20px', backgroundColor: 'var(--mau-cam)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer'},
        errorMessage: { color: 'red', fontSize: '12px', textAlign: 'center', marginTop: '8px' },
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
                                
                                <div style={styles.buttonGroup}>
                                    <button type="button" onClick={closeCart} style={styles.saveButton}>Tiếp tục mua sắm</button>
                                    <button type="submit" style={styles.submitButton} disabled={status === 'sending'}>
                                        {status === 'sending' ? 'Đang Gửi...' : 'Hoàn Tất Đơn Hàng'}
                                    </button>
                                </div>
                                {status === 'error' && <p style={styles.errorMessage}>Đã có lỗi xảy ra. Vui lòng thử lại.</p>}
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


// Component chính của ứng dụng
export default function App() {
  return (
    <CartProvider>
      <GlobalStylesAndFonts />
      <Header />
      <main>
        <Hero />
        <About />
        <Menu />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <CartModal />
    </CartProvider>
  );
}
