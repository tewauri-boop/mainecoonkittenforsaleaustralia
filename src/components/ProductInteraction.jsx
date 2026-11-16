'use client';

import { useState } from 'react';
import { ShoppingBag, MessageCircle, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { SITE, CONTACT, getKittenDeposit } from '@/src/config/site.js';

export default function ProductInteraction({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [added, setAdded] = useState(false);

  const reservationDeposit = getKittenDeposit(product);
  const remainingBalance = Math.max(0, product.price - reservationDeposit);
  const cleanPhone = CONTACT.whatsapp.replace(/[^\d+]/g, '');
  const whatsappMessage = `Hello Maine Coon Heaven! I would like to reserve ${product.name} (Total Adoption Fee: $${product.price.toLocaleString()} ${SITE.currency}, Reservation Deposit: $${reservationDeposit.toLocaleString()} ${SITE.currency}). Please let me know how to proceed.`;
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleAddToCart = () => {
    try {
      const stored = localStorage.getItem(SITE.cartKey);
      let currentCart = stored ? JSON.parse(stored) : [];

      const existingIndex = currentCart.findIndex((item) => item.slug === product.slug);
      if (existingIndex > -1) {
        currentCart[existingIndex].qty += 1;
        currentCart[existingIndex].deposit = reservationDeposit;
      } else {
        currentCart.push({
          slug: product.slug,
          name: product.name,
          price: product.price,
          deposit: reservationDeposit,
          category: product.category,
          color: product.color,
          image: product.images[0],
          qty: 1,
        });
      }

      localStorage.setItem(SITE.cartKey, JSON.stringify(currentCart));
      // Dispatch storage event to notify other components
      window.dispatchEvent(new Event('storage'));
      setAdded(true);
      setTimeout(() => setAdded(false), 3000);
    } catch (e) {
      console.error('Error adding to cart:', e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Gallery Selector */}
      <div className="space-y-3">
        <div
          className={`${
            selectedImage?.startsWith('/assets/')
              ? 'rounded-2xl overflow-hidden border border-[#E8E2D8] bg-white shadow-sm flex items-center justify-center'
              : 'product-frame rounded-2xl overflow-hidden border border-[#E8E2D8] bg-white shadow-sm'
          }`}
        >
          <img
            src={selectedImage}
            alt={product.name}
            className={
              selectedImage?.startsWith('/assets/')
                ? 'w-full h-auto max-h-[600px] object-contain'
                : 'w-full h-full object-cover transition-all duration-300'
            }
          />
        </div>

        {product.images.length > 1 && (
          <div className="flex gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all p-0.5 bg-white ${
                  selectedImage === img
                    ? 'border-[#C59B4B] ring-2 ring-[#C59B4B]/30'
                    : 'border-[#E8E2D8] hover:border-[#8C827A]'
                }`}
                aria-label={`View photo ${idx + 1} of ${product.name}`}
              >
                <img
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  className={`w-full h-full rounded-lg ${
                    img.startsWith('/assets/') ? 'object-contain' : 'object-cover'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <div className="p-4 rounded-xl bg-white border border-[#E8E2D8] flex items-center justify-between text-xs shadow-sm">
          <div>
            <div className="font-semibold text-[#16161A]">Kitten Reservation Deposit</div>
            <div className="text-[11px] text-[#7A746E]">
              Remaining balance of ${remainingBalance.toLocaleString()} {SITE.currency} due before collection or flight
            </div>
          </div>
          <span className="font-bold text-sm text-[#16161A] shrink-0 ml-3">
            ${reservationDeposit.toLocaleString()} {SITE.currency}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#FCF8EE] border border-[#DBC9A2] flex items-center justify-between text-xs text-[#7A5B15]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C59B4B]" />
            <span className="font-semibold">Save 10% with Bitcoin or USDT:</span>
          </div>
          <span className="font-bold text-[#16161A]">
            ${Math.round(product.price * 0.9).toLocaleString()} {SITE.currency}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex-1 py-4 px-6 rounded-xl font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
              added
                ? 'bg-[#2D6A4F] text-white shadow-md'
                : 'bg-[#16161A] hover:bg-[#C59B4B] text-white shadow-md'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Reservation Cart!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Reserve Kitten</span>
              </>
            )}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-4 px-6 rounded-xl font-semibold text-xs tracking-wider uppercase bg-[#25D366] hover:bg-[#20BE5B] text-white flex items-center justify-center gap-2 shadow-md transition-all shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
