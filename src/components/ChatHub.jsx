'use client';

import { useState } from 'react';
import { MessageCircle, X, Phone, Mail, MessageSquare } from 'lucide-react';
import { CONTACT } from '@/src/config/site.js';

export default function ChatHub() {
  const [open, setOpen] = useState(false);
  const cleanPhone = CONTACT.whatsapp.replace(/[^\d+]/g, '');

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Popover Menu */}
      {open && (
        <div className="mb-3 w-72 bg-white rounded-2xl shadow-2xl border border-[#E8E2D8] p-4 space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE1]">
            <div>
              <div className="font-serif font-bold text-sm text-[#16161A]">
                Chat with Cattery
              </div>
              <div className="text-[11px] text-[#2D6A4F] flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-pulse"></span>
                Coordinator Active (Sydney Time)
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[#7A746E] hover:text-[#16161A] p-1 rounded-md"
              aria-label="Close chat channels"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {/* WhatsApp Link */}
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hello Maine Coon Heaven! I would like to inquire about kitten availability.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-[#E8F9EE] hover:bg-[#D6F5E1] text-[#128C7E] transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-[#16161A] group-hover:text-[#128C7E]">
                  WhatsApp Direct
                </div>
                <div className="text-[10px] text-[#5C554E]">{CONTACT.whatsapp}</div>
              </div>
            </a>

            {/* Phone Call Link */}
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EFEAE2] text-[#16161A] transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-[#16161A] text-white flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-[#16161A]">Phone Call</div>
                <div className="text-[10px] text-[#5C554E]">{CONTACT.phone}</div>
              </div>
            </a>

            {/* Email Link */}
            <a
              href={`mailto:${CONTACT.chatEmail}`}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EFEAE2] text-[#16161A] transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-[#C59B4B] text-white flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-[#16161A]">Direct Email</div>
                <div className="text-[10px] text-[#5C554E]">
                  {CONTACT.chatEmail}
                </div>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-[#16161A] hover:bg-[#C59B4B] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#C59B4B]/30"
        aria-label="Open Cattery live contact channels"
        aria-expanded={open}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
