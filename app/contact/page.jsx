'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MessageCircle, Phone, Mail, MapPin, Send, ShieldCheck, ShoppingBag, Trash2 } from 'lucide-react';
import { SITE, CONTACT, FORMS, PRODUCTS, SHOP, getKittenDeposit, getWhatsAppUrl } from '@/src/config/site.js';

export default function ContactPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [name, setName] = useState('');
  const [replyTo, setReplyTo] = useState('');
  const [phone, setPhone] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [selectedKitten, setSelectedKitten] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [messageTouched, setMessageTouched] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [useCrypto, setUseCrypto] = useState(false);

  const cleanPhone = CONTACT.whatsapp.replace(/[^\d+]/g, '');

  useEffect(() => {
    const syncCartToForm = () => {
      try {
        const stored = localStorage.getItem(SITE.cartKey);
        const parsed = stored ? JSON.parse(stored) : [];
        const items = Array.isArray(parsed) ? parsed : [];
        setCartItems(items);

        if (items.length > 0) {
          const summaryValue =
            items.length === 1
              ? items[0].name
              : `Cart Kittens (${items.length}): ${items.map((i) => i.name).join(', ')}`;
          setSelectedKitten(summaryValue);

          if (!messageTouched) {
            const lines = items
              .map(
                (i) =>
                  `- ${i.name} (${i.qty || 1}x @ $${Number(i.price || 0).toLocaleString()} ${SITE.currency}, Deposit: $${getKittenDeposit(i).toLocaleString()} ${SITE.currency})`
              )
              .join('\n');
            setMessage(
              `Hello Maine Coon Heaven Australia,\n\nI would like to submit a new inquiry for the kitten(s) in my cart:\n${lines}\n\nPlease confirm availability, health records, and next steps for adoption.`
            );
          }
        }
      } catch (err) {
        console.error('Error syncing cart to contact inquiry:', err);
      }
    };

    syncCartToForm();
    window.addEventListener('storage', syncCartToForm);
    return () => window.removeEventListener('storage', syncCartToForm);
  }, [messageTouched]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
  const cryptoDiscountAmount = useCrypto ? Math.round((subtotal * SHOP.cryptoDiscount) / 100) : 0;
  const finalTotal = subtotal - cryptoDiscountAmount;
  const depositTotal = cartItems.reduce(
    (sum, item) => sum + getKittenDeposit(item) * (item.qty || 1),
    0
  );

  const handleRemoveCartItem = (slug) => {
    const next = cartItems.filter((i) => i.slug !== slug);
    setCartItems(next);
    try {
      localStorage.setItem(SITE.cartKey, JSON.stringify(next));
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error(err);
    }
  };

  const directEmailSubject =
    cartItems.length > 0
      ? `New Maine Coon Kitten Inquiry — ${cartItems.map((i) => i.name).join(', ')}`
      : `New Maine Coon Kitten Inquiry${selectedKitten && selectedKitten !== 'General Inquiry' ? ` — ${selectedKitten}` : ''}`;

  const directEmailBody = [
    `Hello Maine Coon Heaven Australia,`,
    ``,
    `Name: ${name || '(Your Name)'}`,
    `Email: ${replyTo || '(Your Email)'}`,
    `Phone: ${phone || '(Your Phone)'}`,
    `City / State: ${destinationCity || '(Your City / State)'}`,
    `Selected Kitten(s): ${selectedKitten}`,
    cartItems.length > 0
      ? `Total Adoption Fee: $${finalTotal.toLocaleString()} ${SITE.currency}${useCrypto ? ' (10% Crypto Discount)' : ''}\nReservation Deposit Due: $${depositTotal.toLocaleString()} ${SITE.currency}`
      : null,
    ``,
    message || 'Please share availability and next steps for adopting a Maine Coon kitten.',
  ]
    .filter((line) => line !== null)
    .join('\n');

  const directMailtoUrl = `mailto:${CONTACT.email}?subject=${encodeURIComponent(directEmailSubject)}&body=${encodeURIComponent(directEmailBody)}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const apiRes = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: replyTo,
          phone,
          destinationCity,
          kittenName: selectedKitten,
          message,
          cartItems,
          totalFee: cartItems.length > 0 ? finalTotal : undefined,
          reservationDeposit: cartItems.length > 0 ? depositTotal : undefined,
          useCrypto,
        }),
      });

      const apiData = await apiRes.json();

      try {
        sessionStorage.setItem(
          'mch-last-inquiry',
          JSON.stringify({
            name,
            email: replyTo,
            selectedKitten,
            coordinatorEmail: apiData.coordinatorEmail || CONTACT.email,
            mailtoUrl: apiData.mailtoUrl || directMailtoUrl,
            deliveredVia: apiData.deliveredVia || 'recorded',
          })
        );
      } catch {
        // Ignore sessionStorage errors
      }

      if (apiRes.ok && apiData.success) {
        router.push('/thank-you-contact/');
        return;
      }

      throw new Error(apiData.message || 'Submission failed');
    } catch {
      setErrorMsg(
        `There was a temporary issue sending your inquiry. Click "Open in Email App (${CONTACT.email})" below or reach us on WhatsApp.`
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb nav */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-[#8C827A]">
            <li>
              <Link href="/" className="hover:text-[#16161A] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-semibold text-[#16161A]">Contact Us</li>
          </ol>
        </nav>

        {/* Header with single H1 */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#C59B4B] mb-1">
            Get in Touch
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#16161A]">
            Contact Maine Coon Heaven Cattery
          </h1>
          <p className="text-xs sm:text-sm text-[#7A746E] mt-3 leading-relaxed">
            Have questions about an available kitten, future planned litters, or domestic flight transport? Submit your inquiry directly to {CONTACT.email}.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column: Direct Channels & Address */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D8] shadow-sm space-y-6">
              <h2 className="font-serif font-bold text-lg text-[#16161A] border-b border-[#F0EBE1] pb-3">
                Cattery Contact Channels
              </h2>

              {/* WhatsApp */}
              <a
                href={getWhatsAppUrl('Hello Maine Coon Heaven! I would like to inquire about available kittens.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-3 rounded-xl hover:bg-[#FAF8F5] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E8F9EE] text-[#25D366] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#16161A] group-hover:text-[#25D366]">
                    WhatsApp Coordinator
                  </div>
                  <div className="text-xs text-[#5C554E] mt-0.5">{CONTACT.whatsapp}</div>
                  <div className="text-[10px] text-[#2D6A4F] font-medium mt-0.5">Quickest response time</div>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-start gap-4 p-3 rounded-xl hover:bg-[#FAF8F5] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] text-[#16161A] flex items-center justify-center shrink-0 border border-[#E8E2D8]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#16161A] group-hover:text-[#C59B4B]">
                    Direct Telephone
                  </div>
                  <div className="text-xs text-[#5C554E] mt-0.5">{CONTACT.phone}</div>
                  <div className="text-[10px] text-[#8C827A]">Available 9am - 7pm AEST</div>
                </div>
              </a>

              {/* Email */}
              <div className="flex items-start gap-4 p-3 rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] text-[#C59B4B] flex items-center justify-center shrink-0 border border-[#E8E2D8]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#16161A]">Official Inquiries</div>
                  <div className="text-xs text-[#5C554E] mt-0.5">
                    <a
                      href={directMailtoUrl}
                      className="hover:text-[#C59B4B] underline break-all"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                  <div className="text-[10px] text-[#8C827A]">Response within 24 hours</div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 p-3 rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] text-[#16161A] flex items-center justify-center shrink-0 border border-[#E8E2D8]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#16161A]">Cattery Location</div>
                  <div className="text-xs text-[#5C554E] mt-0.5">{CONTACT.address}</div>
                  <div className="text-[10px] text-[#8C827A]">Visits by confirmed appointment</div>
                </div>
              </div>
            </div>

            <div className="bg-[#16161A] text-white p-6 rounded-2xl border border-[#2A2B30] space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#C59B4B] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Ethical Cattery Guarantee</span>
              </div>
              <p className="text-xs text-[#D1CCC4] leading-relaxed">
                All kitten adoptions are backed by DNA health certificates (HCM, SMA, PKDef clear), comprehensive desexing, and official ANCATS/TICA pedigree papers.
              </p>
            </div>
          </div>

          {/* Right Column: Email Inquiry Form with Cart Pre-Fill */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E8E2D8] p-8 sm:p-10 shadow-sm">
            <h2 className="font-serif font-bold text-xl text-[#16161A] mb-2">
              Send a New Kitten Adoption Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-[#7A746E] mb-6">
              Your inquiry goes directly to <strong className="text-[#16161A]">{CONTACT.email}</strong>. Our adoption coordinator will review your preferences and respond promptly.
            </p>

            {/* Pre-loaded Cart Kittens Summary */}
            {cartItems.length > 0 && (
              <div className="mb-8 p-5 rounded-2xl bg-[#FCF8EE] border border-[#DBC9A2] space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8C6212]">
                    <ShoppingBag className="w-4 h-4 text-[#C59B4B]" />
                    <span>Kittens Selected in Your Cart ({cartItems.reduce((t, i) => t + (i.qty || 1), 0)})</span>
                  </div>
                  <span className="text-xs font-bold text-[#16161A]">
                    Deposit Due: ${depositTotal.toLocaleString()} {SITE.currency}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {cartItems.map((item) => (
                    <div
                      key={item.slug}
                      className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-[#E8DEC3]"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-contain bg-white border border-[#E8E2D8] shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#16161A] truncate">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-[#7A746E]">
                            {item.color} · Qty {item.qty || 1} · ${Number(item.price || 0).toLocaleString()} {SITE.currency}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveCartItem(item.slug)}
                        className="p-1.5 text-[#A09A93] hover:text-red-600 transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E8DEC3] text-xs">
                  <label className="inline-flex items-center gap-2 cursor-pointer font-medium text-[#16161A]">
                    <input
                      type="checkbox"
                      checked={useCrypto}
                      onChange={(e) => setUseCrypto(e.target.checked)}
                      className="w-4 h-4 accent-[#C59B4B]"
                    />
                    <span>Apply 10% Bitcoin / USDT discount (-${Math.round((subtotal * SHOP.cryptoDiscount) / 100).toLocaleString()} {SITE.currency})</span>
                  </label>
                  <span className="font-bold text-[#16161A]">
                    Total Fee: ${finalTotal.toLocaleString()} {SITE.currency}
                  </span>
                </div>
              </div>
            )}

            {errorMsg && (
              <div
                role="alert"
                aria-live="polite"
                className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700"
              >
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="hidden"
                name="access_key"
                value={FORMS.web3formsKey || 'pending'}
              />
              <input
                type="hidden"
                name="subject"
                value={directEmailSubject}
              />
              <input type="hidden" name="from_name" value={SITE.name} />
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />
              <input type="hidden" name="replyto" value={replyTo} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-bold text-[#16161A] mb-2 uppercase tracking-wider"
                  >
                    Your Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-3 rounded-xl border border-[#D8D2C9] text-xs text-[#16161A] focus:outline-none focus:ring-2 focus:ring-[#C59B4B] bg-[#FAF8F5]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold text-[#16161A] mb-2 uppercase tracking-wider"
                  >
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={replyTo}
                    onChange={(e) => setReplyTo(e.target.value)}
                    placeholder="e.g. sarah@example.com.au"
                    className="w-full px-4 py-3 rounded-xl border border-[#D8D2C9] text-xs text-[#16161A] focus:outline-none focus:ring-2 focus:ring-[#C59B4B] bg-[#FAF8F5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-bold text-[#16161A] mb-2 uppercase tracking-wider"
                  >
                    Phone / Mobile Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0401 000 000"
                    className="w-full px-4 py-3 rounded-xl border border-[#D8D2C9] text-xs text-[#16161A] focus:outline-none focus:ring-2 focus:ring-[#C59B4B] bg-[#FAF8F5]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="kitten"
                    className="block text-xs font-bold text-[#16161A] mb-2 uppercase tracking-wider"
                  >
                    Kitten of Interest
                  </label>
                  <select
                    id="kitten"
                    name="kitten_of_interest"
                    value={selectedKitten}
                    onChange={(e) => setSelectedKitten(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#D8D2C9] text-xs text-[#16161A] focus:outline-none focus:ring-2 focus:ring-[#C59B4B] bg-[#FAF8F5]"
                  >
                    {cartItems.length > 1 && (
                      <option
                        value={`Cart Kittens (${cartItems.length}): ${cartItems.map((i) => i.name).join(', ')}`}
                      >
                        Selected Cart Kittens ({cartItems.length}): {cartItems.map((i) => i.name).join(', ')}
                      </option>
                    )}
                    <option value="General Inquiry">General Kitten Inquiry</option>
                    {PRODUCTS.map((p) => (
                      <option key={p.slug} value={p.name}>
                        {p.name} (${p.price} AUD)
                      </option>
                    ))}
                    <option value="Future Litters">Future Upcoming Litter</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-xs font-bold text-[#16161A] mb-2 uppercase tracking-wider"
                >
                  Your City / State (for flight scheduling)
                </label>
                <input
                  id="location"
                  type="text"
                  name="destination_city"
                  value={destinationCity}
                  onChange={(e) => setDestinationCity(e.target.value)}
                  placeholder="e.g. Melbourne, VIC or Sydney, NSW"
                  className="w-full px-4 py-3 rounded-xl border border-[#D8D2C9] text-xs text-[#16161A] focus:outline-none focus:ring-2 focus:ring-[#C59B4B] bg-[#FAF8F5]"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-bold text-[#16161A] mb-2 uppercase tracking-wider"
                >
                  Your Message & Questions <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => {
                    setMessageTouched(true);
                    setMessage(e.target.value);
                  }}
                  placeholder="Tell us a little about your home environment, experience with cats, or specific questions about the kitten..."
                  className="w-full px-4 py-3 rounded-xl border border-[#D8D2C9] text-xs text-[#16161A] focus:outline-none focus:ring-2 focus:ring-[#C59B4B] bg-[#FAF8F5]"
                ></textarea>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 sm:flex-none px-8 py-4 bg-[#16161A] hover:bg-[#C59B4B] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Sending New Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit New Inquiry</span>
                    </>
                  )}
                </button>

                <a
                  href={directMailtoUrl}
                  className="px-6 py-4 bg-[#FCF8EE] hover:bg-[#F3E9D2] border border-[#DBC9A2] text-[#16161A] font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-[#C59B4B]" />
                  <span>Open in Email App</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
