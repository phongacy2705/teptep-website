import React, { createContext, useState, useContext } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
    return useContext(CartContext);
};

// Provider component that wraps the app and provides cart state
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.name === product.name);
            if (existingItem) {
                // If item exists, increase quantity
                return prevItems.map(item =>
                    item.name === product.name
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // If item doesn't exist, add it to the cart with quantity 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
        // Automatically open the cart when an item is added
        setIsCartOpen(true);
    };

    const removeFromCart = (productName) => {
        setCartItems(prevItems => prevItems.filter(item => item.name !== productName));
    };

    const updateQuantity = (productName, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productName);
        } else {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.name === productName ? { ...item, quantity } : item
                )
            );
        }
    };
    
    const clearCart = () => {
        setCartItems([]);
    };

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
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
