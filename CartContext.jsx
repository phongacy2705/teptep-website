import React, { useContext, useState, createContext } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.name === product.name);
      if (existing) {
        return prev.map(item => item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (name) => {
    setCartItems(prev => prev.filter(item => item.name !== name));
  };

  const updateQuantity = (name, quantity) => {
    if (quantity <= 0) {
      removeFromCart(name);
    } else {
      setCartItems(prev => prev.map(item => item.name === name ? { ...item, quantity } : item));
    }
  };

  const clearCart = () => setCartItems([]);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^0-9]/g, ''));
    return total + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}