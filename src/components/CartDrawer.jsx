'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, MessageCircle, Send, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import { SITE, SHOP, CONTACT, getKittenDeposit, getWhatsAppUrl } from '@/src/config/site.js';

export default function CartDrawer({ isOpen, onClose, cart, setCart }) {
  const [useCrypto, setUseCrypto] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const updateQuantity = (slug, delta) => {
    setCart((prev) => {
      const next = prev
        .map((item) => {
          if (item.slug === slug) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
      try {
        localStorage.setItem(SITE.cartKey, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const removeItem = (slug) => {
    setCart((prev) => {
      const next = prev.filter((item) => item.slug !== slug);
      try {
        localStorage.setItem(SITE.cartKey, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem(SITE.cartKey);
    } catch (e) {
      console.error(e);
    }
  };

  const reservationDepositTotal = cart.reduce(
    (sum, item) => sum + getKittenDeposit(item) * item.qty,
    0
  );
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cryptoDiscountAmount = useCrypto ? Math.round((subtotal * SHOP.cryptoDiscount) / 100) : 0;
  const finalTotal = subtotal - cryptoDiscountAmount;
  const remainingBalance = Math.max(0, finalTotal - reservationDepositTotal);

  // Build WhatsApp reservation link
  const itemsSummary = cart
    .map(
      (item) =>
        `${item.name} (${item.qty}x @ $${item.price.toLocaleString()} ${SITE.currency}, Deposit: $${getKittenDeposit(item).toLocaleString()} ${SITE.currency})`
    )
    .join('\n');
  const paymentMethodNote = useCrypto ? `Payment: Cryptocurrency (10% Discount applied: -$${cryptoDiscountAmount.toLocaleString()})` : 'Payment: Bank Transfer / PayID';
  const whatsappMessage = `Hello Maine Coon Heaven! I would like to reserve the following kitten(s):\n\n${itemsSummary}\n\nTotal Adoption Fee: $${finalTotal.toLocaleString()} ${SITE.currency}\nReservation Deposit Due: $${reservationDepositTotal.toLocaleString()} ${SITE.currency}\nRemaining Balance Before Dispatch: $${remainingBalance.toLocaleString()} ${SITE.currency}\n${paymentMethodNote}\nFree Nationwide Delivery: Yes\nPlease confirm availability and adoption agreement.`;
  const whatsappUrl = getWhatsAppUrl(whatsappMessage);

  const emailSubject = `New Maine Coon Kitten Inquiry — ${cart.map((i) => i.name).join(', ')}`;
  const emailBody = `Hello Maine Coon Heaven Australia,\n\nI would like to send a new inquiry for the following available kitten(s) from my reservation cart:\n\n${itemsSummary}\n\nTotal Adoption Fee: $${finalTotal.toLocaleString()} ${SITE.currency}\nReservation Deposit Due: $${reservationDepositTotal.toLocaleString()} ${SITE.currency}\nRemaining Balance Before Dispatch: $${remainingBalance.toLocaleString()} ${SITE.currency}\n${paymentMethodNote}\nFree Nationwide Delivery: Yes\n\nPlease confirm availability and send adoption details.\n\nMy Name:\nMy Phone:\nMy City / State (Australia):\n`;
  const mailtoUrl = `mailto:${CONTACT.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Reservation Cart Drawer">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#E8E2D8] bg-white">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-lg font-bold text-[#16161A]">
                Kitten Reservation Cart
              </h2>
              <span className="text-xs bg-[#EFEAE2] text-[#5C554E] px-2 py-0.5 rounded-full font-medium">
                {cart.reduce((total, i) => total + i.qty, 0)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[11px] font-medium text-[#7A746E] hover:text-red-600 px-2 py-1 rounded transition-colors"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-[#7A746E] hover:text-[#16161A] rounded-lg hover:bg-[#EFEAE2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C59B4B]"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EFEAE2] text-[#A09A93] mx-auto flex items-center justify-center font-serif text-2xl font-bold">
                  🐾
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#16161A]">
                  Your cart is empty
                </h3>
                <p className="text-xs text-[#7A746E] max-w-xs mx-auto">
                  Browse our available Maine Coon kittens to place a reservation inquiry.
                </p>
                <div className="pt-2">
                  <Link
                    href="/shop/"
                    onClick={onClose}
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-[#16161A] text-white text-xs font-semibold rounded-lg hover:bg-[#C59B4B] transition-colors"
                  >
                    View Available Kittens
                  </Link>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.slug}
                  className="bg-white p-4 rounded-xl border border-[#E8E2D8] flex gap-4 shadow-sm"
                >
                  <div className={`w-20 h-20 rounded-lg overflow-hidden shrink-0 ${item.image?.startsWith('/assets/') ? 'bg-white border border-[#E8E2D8]' : 'bg-[#EFEAE2]'}`}>
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=400&q=80'}
                      alt={item.name}
                      className={`w-full h-full ${item.image?.startsWith('/assets/') ? 'object-contain' : 'object-cover'}`}
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/shop/${item.category}/${item.slug}/`}
                          onClick={onClose}
                          className="font-serif font-bold text-sm text-[#16161A] hover:text-[#C59B4B] line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeItem(item.slug)}
                          className="text-[#A09A93] hover:text-red-600 transition-colors p-1"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-[#7A746E] mt-0.5">{item.color || item.category}</p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F0EBE1]">
                      <div className="flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-md p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, -1)}
                          className="w-6 h-6 flex items-center justify-center text-[#5C554E] hover:text-black rounded"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-2 text-[#16161A]">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#5C554E] hover:text-black rounded"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-bold text-[#16161A]">
                          ${(item.price * item.qty).toLocaleString()} {SITE.currency}
                        </div>
                        <div className="text-[11px] font-semibold text-[#9A7222]">
                          Deposit: ${(getKittenDeposit(item) * item.qty).toLocaleString()} {SITE.currency}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E8E2D8] bg-white space-y-4">
              {/* Crypto 10% discount toggle */}
              <div
                onClick={() => setUseCrypto(!useCrypto)}
                className={`cursor-pointer p-3 rounded-lg border flex items-center justify-between transition-colors ${
                  useCrypto
                    ? 'bg-[#FCF8EE] border-[#C59B4B] text-[#7A5B15]'
                    : 'bg-[#FAF8F5] border-[#E8E2D8] text-[#5C554E]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className={`w-4 h-4 ${useCrypto ? 'text-[#C59B4B]' : 'text-[#A09A93]'}`} />
                  <div>
                    <div className="text-xs font-bold text-[#16161A]">
                      Pay with Crypto (BTC / USDT)
                    </div>
                    <div className="text-[11px] text-[#7A746E]">
                      Save 10% instantly on your reservation
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={useCrypto}
                  onChange={(e) => setUseCrypto(e.target.checked)}
                  className="w-4 h-4 accent-[#C59B4B] cursor-pointer"
                  aria-label="Apply 10 percent cryptocurrency discount"
                />
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-[#5C554E]">
                <div className="flex justify-between">
                  <span>Adoption Fee Subtotal</span>
                  <span className="font-medium text-[#16161A]">${subtotal.toLocaleString()} {SITE.currency}</span>
                </div>
                {useCrypto && (
                  <div className="flex justify-between text-[#B38022] font-medium">
                    <span>10% Crypto Discount</span>
                    <span>-${cryptoDiscountAmount.toLocaleString()} {SITE.currency}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#2D6A4F] font-medium">
                  <span>Nationwide Flight Transit</span>
                  <span>Free (Included)</span>
                </div>
                <div className="flex justify-between font-semibold text-[#16161A] pt-1.5 border-t border-[#F0EBE1]">
                  <span>Total Adoption Fee</span>
                  <span>${finalTotal.toLocaleString()} {SITE.currency}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#16161A] pt-2 border-t border-[#E8E2D8]">
                  <span>Reservation Deposit Due</span>
                  <span className="text-[#9A7222]">${reservationDepositTotal.toLocaleString()} {SITE.currency}</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#7A746E]">
                  <span>Remaining Balance (Before Dispatch)</span>
                  <span>${remainingBalance.toLocaleString()} {SITE.currency}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                {/* Primary: Redirect to Email as New Inquiry */}
                <a
                  href={mailtoUrl}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#C59B4B] hover:bg-[#D4AF37] text-[#16161A] rounded-xl font-bold text-sm shadow-md transition-transform active:scale-[0.98]"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send New Inquiry to Email</span>
                </a>

                {/* Secondary: Pre-filled Online Inquiry Form */}
                <Link
                  href="/contact/?from=cart"
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#16161A] hover:bg-[#2A2B30] text-white rounded-xl font-semibold text-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Complete Inquiry Form ({CONTACT.email})</span>
                </Link>

                {/* Tertiary: WhatsApp Checkout */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20BE5B] text-white rounded-xl font-semibold text-xs shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Reserve on WhatsApp</span>
                </a>
              </div>

              <div className="space-y-1.5 text-center pt-1">
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7A746E]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                  <span>Zero obligation inquiry · Breeder verifies pedigree agreement</span>
                </div>
                <p className="text-[11px] text-[#7A746E]">
                  <strong className="text-[#16161A]">Refund Policy:</strong> {SHOP.refundPolicy}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
