'use client';

import { MessageCircle } from 'lucide-react';
import { CONTACT, getWhatsAppUrl } from '@/src/config/site.js';

export default function ChatHub() {
  const whatsappHref = getWhatsAppUrl(
    'Hello Maine Coon Heaven! I would like to inquire about kitten availability.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat directly on WhatsApp (${CONTACT.whatsapp})`}
        title={`WhatsApp Direct: ${CONTACT.whatsapp}`}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BE5B] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
