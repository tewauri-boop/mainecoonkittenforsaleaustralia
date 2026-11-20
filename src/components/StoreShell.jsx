'use client';

import { useState, useEffect } from 'react';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import CartDrawer from './CartDrawer.jsx';
import ChatHub from './ChatHub.jsx';
import AnnouncementBar from './AnnouncementBar.jsx';
import { SITE } from '@/src/config/site.js';

export default function StoreShell({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(SITE.cartKey);
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    }

    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem(SITE.cartKey);
        if (stored) {
          setCart(JSON.parse(stored));
        } else {
          setCart([]);
        }
      } catch (e) {
        console.error(e);
      }
    };

    const handleOpenCart = () => {
      handleStorageChange();
      setIsCartOpen(true);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('mch-open-cart', handleOpenCart);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('mch-open-cart', handleOpenCart);
    };
  }, []);

  const totalItems = mounted ? cart.reduce((total, item) => total + item.qty, 0) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#16161A] selection:bg-[#C59B4B]/30 selection:text-[#16161A]">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <AnnouncementBar />

      <Nav onOpenCart={() => setIsCartOpen(true)} cartCount={totalItems} />

      <main id="main" className="flex-1">
        {children}
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        setCart={setCart}
      />

      <ChatHub />
    </div>
  );
}
