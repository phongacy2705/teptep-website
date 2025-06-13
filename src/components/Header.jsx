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
  const width = useWindowWidth();
  const isMobile = width < 768;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (e, target) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      const offset = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header style={{
      backgroundColor: isScrolled ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)',
      backdropFilter: 'blur(10px)', boxShadow: isScrolled ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '12px 24px', height: '72px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" onClick={(e) => scrollTo(e, 'body')}><img src="/toteptep.png" alt="Logo" height={48} /></a>
        {!isMobile ? (
          <>
            <nav style={{ display: 'flex', gap: '16px' }}>
              {navLinks.map(link => (
                <a key={link.href} href={link.href} onClick={(e) => scrollTo(e, link.href)} className="nav-link">
                  {link.label}
                </a>
              ))}
            </nav>
            <button onClick={openCart} style={{ position: 'relative', background: 'none', border: 'none' }}>
              <ShoppingCart size={28} color="#475569" />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: '-5px', right: '-8px',
                  backgroundColor: '#f97316', color: 'white',
                  borderRadius: '50%', width: '20px', height: '20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 'bold',
                }}>{totalItems}</span>
              )}
            </button>
          </>
        ) : (
          <div>
            <button onClick={openCart} style={{ background: 'none', border: 'none', marginRight: '16px' }}>
              <ShoppingCart size={24} color="#334155" />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: '-5px', right: '-8px',
                  backgroundColor: '#f97316', color: 'white',
                  borderRadius: '50%', width: '18px', height: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 'bold',
                }}>{totalItems}</span>
              )}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none' }}>
              <MenuIcon size={24} color="#334155" />
            </button>
          </div>
        )}
      </div>
      {isMobile && isMenuOpen && (
        <nav style={{ backgroundColor: 'white', padding: '16px 0', display: 'flex',
          flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={(e) => scrollTo(e, link.href)}
               style={{ color: '#475569', textDecoration: 'none', fontWeight: 500 }}>
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
