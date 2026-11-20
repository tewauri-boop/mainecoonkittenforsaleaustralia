'use client';

import { useState } from 'react';
import { ShoppingBag, Check, MessageCircle } from 'lucide-react';
import { SITE, getKittenDeposit, getWhatsAppUrl } from '@/src/config/site.js';

export default function KittenReserveBar({ kitten, variant = 'light' }) {
  const [added, setAdded] = useState(false);

  const deposit = getKittenDeposit(kitten);
  const whatsappMessage = `Hello Maine Coon Heaven! I would like to reserve ${kitten.name} (Total Adoption Fee: $${kitten.price.toLocaleString()} ${SITE.currency}, Reservation Deposit: $${deposit.toLocaleString()} ${SITE.currency}). Please let me know how to proceed.`;
  const whatsappUrl = getWhatsAppUrl(whatsappMessage);

  const handleReserve = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const stored = localStorage.getItem(SITE.cartKey);
      const currentCart = stored ? JSON.parse(stored) : [];
      const existingIndex = currentCart.findIndex((item) => item.slug === kitten.slug);

      if (existingIndex > -1) {
        currentCart[existingIndex].qty += 1;
        currentCart[existingIndex].deposit = deposit;
      } else {
        currentCart.push({
          slug: kitten.slug,
          name: kitten.name,
          price: kitten.price,
          deposit,
          category: kitten.category,
          color: kitten.color,
          image: kitten.images[0],
          qty: 1,
        });
      }

      localStorage.setItem(SITE.cartKey, JSON.stringify(currentCart));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('mch-open-cart'));
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    } catch (err) {
      console.error('Error reserving kitten:', err);
    }
  };

  const isDark = variant === 'dark';

  return (
    <div
      className={`flex items-center gap-2 pt-3 mt-3 border-t ${
        isDark ? 'border-[#2A2B33]' : 'border-[#F0EBE1]'
      }`}
    >
      <button
        type="button"
        onClick={handleReserve}
        className={`flex-1 py-2 px-3 rounded-lg text-[11px] font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
          added
            ? 'bg-[#2D6A4F] text-white'
            : isDark
            ? 'bg-[#C59B4B] hover:bg-[#D4AF37] text-[#16161A]'
            : 'bg-[#16161A] hover:bg-[#C59B4B] text-white'
        }`}
      >
        {added ? (
          <>
            <Check className="w-3.5 h-3.5 shrink-0" />
            <span>Reserved in Cart</span>
          </>
        ) : (
          <>
            <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
            <span>Reserve Kitten</span>
          </>
        )}
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Reserve ${kitten.name} via WhatsApp`}
        title={`Reserve ${kitten.name} on WhatsApp`}
        className="p-2 rounded-lg bg-[#25D366] hover:bg-[#20BE5B] text-white transition-colors shrink-0 flex items-center justify-center"
      >
        <MessageCircle className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
