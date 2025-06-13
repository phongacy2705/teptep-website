import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon } from 'lucide-react';
// Dòng quan trọng: Import file CSS cho component này
import './Header.css';

const navLinks = [
    { href: '#gioi-thieu', label: 'Về Tép Tép' },
    { href: '#thuc-don', label: 'Thực Đơn' },
    { href: '#danh-gia', label: 'Đánh Giá' },
    { href: '#lien-he', label: 'Liên Hệ' },
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


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
    const width = useWindowWidth();
    const isMobile = width < 768;

    const handleScroll = (e, target) => {
        e.preventDefault();
        const element = document.querySelector(target);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
        setIsMenuOpen(false);
    };

    // --- Hàm xử lý việc cuộn lên đầu trang ---
    const scrollToTop = (e) => {
        e.preventDefault(); // Ngăn trình duyệt nhảy trang
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    useEffect(() => {
        const handleScrollEvent = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScrollEvent);
        return () => window.removeEventListener('scroll', handleScrollEvent);
    }, []);

    const headerStyle = {
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(10px)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        boxShadow: isScrolled ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
        transition: 'all 0.3s ease',
    };
    
    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '12px 24px',
        height: '72px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
    };

    return (
        <header style={headerStyle}>
            <div style={containerStyle}>
                
                {/* Bố cục cho Desktop */}
                {!isMobile && (
                    <>
                        {/* Cột Trái: Logo đã có thể click */}
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                            {/* Thẻ <a> bao bọc logo và gọi hàm scrollToTop khi được nhấn */}
                            <a href="#" onClick={scrollToTop} style={{ cursor: 'pointer', display: 'flex' }}>
                                <img src="/toteptep.png" alt="Logo Tép Tép Mini" style={{ height: '48px' }} />
                            </a>
                        </div>

                        {/* Cột Giữa: Menu */}
                        <nav style={{ display: 'flex', gap: '16px' }}>
                            {navLinks.map(link => (
                                // Sử dụng className="nav-link" để áp dụng style từ file Header.css
                                <a 
                                    key={link.href} 
                                    href={link.href} 
                                    onClick={(e) => handleScroll(e, link.href)}
                                    className="nav-link"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>

                        {/* Cột Phải: Nút Đặt Hàng */}
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                            <a href="#thuc-don" onClick={(e) => handleScroll(e, '#thuc-don')} style={{ backgroundColor: '#f97316', color: 'white', fontWeight: 'bold', padding: '8px 24px', borderRadius: '9999px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                                Đặt Hàng Ngay
                            </a>
                        </div>
                    </>
                )}
                
                {/* Bố cục cho Mobile */}
                {isMobile && (
                    <>
                        <a href="#" onClick={scrollToTop} style={{ cursor: 'pointer', display: 'flex' }}>
                           <img src="/toteptep.png" alt="Logo Tép Tép Mini" style={{ height: '48px' }} />
                        </a>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <MenuIcon style={{ width: '24px', height: '24px', color: '#334155' }} />
                        </button>
                    </>
                )}
            </div>

            {/* Menu thả xuống cho Mobile */}
            {isMobile && isMenuOpen && (
                 <div style={{ backgroundColor: 'white', padding: '16px 0' }}>
                    <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                       {navLinks.map(link => (
                             <a key={link.href} href={link.href} onClick={(e) => handleScroll(e, link.href)} style={{ color: '#475569', textDecoration: 'none', fontWeight: 500 }}>
                                {link.label}
                            </a>
                        ))}
                        <a href="#thuc-don" onClick={(e) => handleScroll(e, '#thuc-don')} style={{ backgroundColor: '#f97316', color: 'white', fontWeight: 'bold', padding: '8px 24px', borderRadius: '9999px', textDecoration: 'none', marginTop: '8px' }}>
                            Đặt Hàng Ngay
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
