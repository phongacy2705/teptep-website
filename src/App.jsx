// src/App.jsx
import React from 'react';
import Header from '@components/Header';
import Hero from '@components/Hero';
import About from '@components/About';
import Menu from '@components/Menu';
import Testimonials from '@components/Testimonials';
import Contact from '@components/Contact';
import Footer from '@components/Footer';
import CartModal from '@components/CartModal';
import GlobalStylesAndFonts from '@components/GlobalStylesAndFonts';
import { CartProvider } from '@contexts/CartContext';

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
