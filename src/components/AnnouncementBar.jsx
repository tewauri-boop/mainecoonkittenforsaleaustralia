'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Plane, ShieldCheck, Phone } from 'lucide-react';
import { CONTACT, getWhatsAppUrl } from '@/src/config/site.js';

const announcements = [
  {
    icon: Plane,
    text: 'Complimentary safe air transport across Australia (Sydney, Melbourne, Brisbane, Perth & Adelaide)',
    link: '/about/',
    external: false,
  },
  {
    icon: Sparkles,
    text: `10% Instant Reservation Discount when paying with Bitcoin (BTC) or USDT`,
    link: '/shop/',
    external: false,
  },
  {
    icon: ShieldCheck,
    text: '100% DNA Health Tested (HCM, SMA, PKDef clear) with 2-year genetic health guarantee',
    link: '/about/',
    external: false,
  },
  {
    icon: Phone,
    text: `Direct WhatsApp Coordinator: ${CONTACT.whatsapp}`,
    link: getWhatsAppUrl('Hello Maine Coon Heaven! I would like to inquire about available kittens.'),
    external: true,
  },
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = announcements[index];
  const Icon = current.icon;

  return (
    <aside aria-label="Announcements" className="bg-[#16161A] text-[#FAF8F5] text-xs py-2 px-4 border-b border-[#2A2B30] transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
        {current.external ? (
          <a
            href={current.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-[#25D366] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C59B4B]"
          >
            <Icon className="w-3.5 h-3.5 text-[#25D366] shrink-0" aria-hidden="true" />
            <span className="font-medium tracking-wide">{current.text}</span>
          </a>
        ) : (
          <Link
            href={current.link}
            className="inline-flex items-center gap-2 hover:text-[#C59B4B] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C59B4B]"
          >
            <Icon className="w-3.5 h-3.5 text-[#C59B4B] shrink-0" aria-hidden="true" />
            <span className="font-medium tracking-wide">{current.text}</span>
          </Link>
        )}
      </div>
    </aside>
  );
}
