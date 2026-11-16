'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Phone, Mail, MapPin, Send, ShieldCheck, Check } from 'lucide-react';
import { SITE, CONTACT, FORMS, PRODUCTS } from '@/src/config/site.js';

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [replyTo, setReplyTo] = useState('');

  const cleanPhone = CONTACT.whatsapp.replace(/[^\d+]/g, '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    const form = e.target;
    const accessKey = form.querySelector('[name="access_key"]')?.value || '';

    // WebForge Key-pending fallback: if key is empty or 'pending', skip gracefully to thank-you
    if (!accessKey || accessKey === 'pending' || accessKey.startsWith('YOUR-')) {
      window.location.href = '/thank-you-contact/';
      return;
    }

    try {
      // Exact WebForge Web3Forms method:
      // fetch with body: new FormData(form) + header 'Accept': 'application/json' ONLY.
      // NO Content-Type, NO action, NO method, NO redirect field.
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      const data = await res.json();
      if (res.status === 200 && data.success) {
        window.location.href = '/thank-you-contact/';
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      setErrorMsg(
        'There was a temporary issue sending your inquiry. Please reach out to us directly via WhatsApp or email.'
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
            Have questions about an available kitten, future planned litters, or domestic flight transport? We are here to help your family every step of the way.
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
                href={`https://wa.me/${cleanPhone}`}
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

              {/* Email (Entity Encoded) */}
              <div className="flex items-start gap-4 p-3 rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] text-[#C59B4B] flex items-center justify-center shrink-0 border border-[#E8E2D8]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#16161A]">Official Inquiries</div>
                  <div className="text-xs text-[#5C554E] mt-0.5">
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="hover:text-[#C59B4B] underline"
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

          {/* Right Column: Web3Forms CORS Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E8E2D8] p-8 sm:p-10 shadow-sm">
            <h2 className="font-serif font-bold text-xl text-[#16161A] mb-2">
              Send an Adoption Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-[#7A746E] mb-8">
              Fill out the details below. Our adoption coordinator will review your preferences and contact you promptly.
            </p>

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
              {/* Mandatory Web3Forms hidden inputs */}
              <input
                type="hidden"
                name="access_key"
                value={FORMS.web3formsKey || 'pending'}
              />
              <input
                type="hidden"
                name="subject"
                value="New Maine Coon Kitten Adoption Inquiry"
              />
              <input type="hidden" name="from_name" value={SITE.name} />
              {/* Honeypot anti-spam botcheck */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />
              {/* replyto synced with email input */}
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
                    placeholder="e.g. 0401 000 000"
                    className="w-full px-4 py-3 rounded-xl border border-[#D8D2C9] text-xs text-[#16161A] focus:outline-none focus:ring-2 focus:ring-[#C59B4B] bg-[#FAF8F5]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="kitten"
                    className="block text-xs font-bold text-[#16161A] mb-2 uppercase tracking-wider"
                  >
                    Kitten of Interest (Optional)
                  </label>
                  <select
                    id="kitten"
                    name="kitten_of_interest"
                    className="w-full px-4 py-3 rounded-xl border border-[#D8D2C9] text-xs text-[#16161A] focus:outline-none focus:ring-2 focus:ring-[#C59B4B] bg-[#FAF8F5]"
                  >
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
                  placeholder="e.g. Melbourne, VIC or Brisbane, QLD"
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
                  rows={4}
                  required
                  placeholder="Tell us a little about your home environment, experience with cats, or specific questions about the kitten..."
                  className="w-full px-4 py-3 rounded-xl border border-[#D8D2C9] text-xs text-[#16161A] focus:outline-none focus:ring-2 focus:ring-[#C59B4B] bg-[#FAF8F5]"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-4 bg-[#16161A] hover:bg-[#C59B4B] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Sending Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Adoption Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
