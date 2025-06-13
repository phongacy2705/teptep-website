import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openCart, totalItems } = useCart();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;

  const handleScroll = (e, target) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      const headerOffset = 80;
      const offset = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      backgroundColor: isScrolled ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)',
      backdropFilter: 'blur(10px)',
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      boxShadow: isScrolled ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '12px 24px', height: '72px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <a href="#" onClick={scrollToTop}>
          <img src="/toteptep.png" alt="Logo Tép Tép" style={{ height: '48px' }} />
        </a>

        {isMobile ? (
          <div>
            <button onClick={openCart} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', marginRight: '16px' }}>
              <ShoppingCart size={24} color="#334155" />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: '-5px', right: '-8px',
                  backgroundColor: '#f97316', color: 'white', borderRadius: '50%',
                  width: '18px', height: '18px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 'bold'
                }}>
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <MenuIcon size={24} color="#334155" />
            </button>
          </div>
        ) : (
          <>
            <nav style={{ display: 'flex', gap: '16px' }}>
              {navLinks.map(link => (
                <a key={link.href} href={link.href} onClick={(e) => handleScroll(e, link.href)} className="nav-link">
                  {link.label}
                </a>
              ))}
            </nav>
            <button onClick={openCart} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}>
              <ShoppingCart size={28} color="#475569" />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: '-5px', right: '-8px',
                  backgroundColor: '#f97316', color: 'white', borderRadius: '50%',
                  width: '20px', height: '20px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 'bold'
                }}>
                  {totalItems}
                </span>
              )}
            </button>
          </>
        )}
      </div>

      {isMobile && isMenuOpen && (
        <div style={{ backgroundColor: 'white', padding: '16px 0' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={(e) => handleScroll(e, link.href)} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
