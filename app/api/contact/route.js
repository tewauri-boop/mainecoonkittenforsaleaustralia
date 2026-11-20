// app/api/contact/route.js - Contact & Adoption Inquiry API
import { CONTACT, FORMS, SITE } from '@/src/config/site.js';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      name,
      email,
      message,
      kittenName,
      phone,
      destinationCity,
      cartItems = [],
      totalFee,
      reservationDeposit,
      useCrypto,
    } = data;

    if (!name || !email) {
      return Response.json(
        { success: false, message: 'Name and email are required.' },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    const coordinatorEmail = CONTACT.email;
    const kittenSummary =
      Array.isArray(cartItems) && cartItems.length > 0
        ? cartItems
            .map(
              (item) =>
                `${item.name} (${item.qty || 1}x @ $${Number(item.price || 0).toLocaleString()} ${SITE.currency}, Deposit: $${Number(item.deposit || 750).toLocaleString()} ${SITE.currency})`
            )
            .join('\n')
        : kittenName || 'General Kitten Inquiry';

    const subjectLabel =
      Array.isArray(cartItems) && cartItems.length > 0
        ? `New Maine Coon Kitten Inquiry (${cartItems.map((i) => i.name).join(', ')})`
        : `New Maine Coon Kitten Inquiry${kittenName ? ` — ${kittenName}` : ''}`;

    const fullBodyLines = [
      `New Maine Coon Kitten Inquiry from ${name}`,
      `Customer Email: ${email}`,
      `Phone: ${phone || 'Not provided'}`,
      `City / State: ${destinationCity || 'Not provided'}`,
      `Selected Kitten(s):\n${kittenSummary}`,
      totalFee ? `Estimated Total Adoption Fee: $${Number(totalFee).toLocaleString()} ${SITE.currency}${useCrypto ? ' (10% Crypto Discount applied)' : ''}` : null,
      reservationDeposit ? `Reservation Deposit Due: $${Number(reservationDeposit).toLocaleString()} ${SITE.currency}` : null,
      `Message:\n${message || 'Interested in reserving selected kitten(s).'}`,
    ]
      .filter(Boolean)
      .join('\n\n');

    let deliveredVia = 'recorded';

    // 1. Resend API if RESEND_API_KEY env var is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: FORMS.resendFrom || `${SITE.name} <onboarding@resend.dev>`,
            to: [coordinatorEmail],
            reply_to: email,
            subject: subjectLabel,
            text: fullBodyLines,
          }),
          signal: AbortSignal.timeout(4000),
        });
        if (resendRes.ok) deliveredVia = 'resend';
      } catch {
        // Fallback below
      }
    }

    // 2. Web3Forms API if key is configured
    const web3Key = process.env.WEB3FORMS_ACCESS_KEY || FORMS.web3formsKey;
    if (deliveredVia === 'recorded' && web3Key && web3Key !== 'pending' && !web3Key.startsWith('YOUR-')) {
      try {
        const w3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3Key,
            subject: subjectLabel,
            from_name: SITE.name,
            replyto: email,
            name,
            email,
            phone: phone || '',
            destination_city: destinationCity || '',
            kitten_of_interest: kittenSummary,
            message: fullBodyLines,
          }),
          signal: AbortSignal.timeout(4000),
        });
        if (w3Res.ok) deliveredVia = 'web3forms';
      } catch {
        // Fallback below
      }
    }

    // 3. Direct email forwarding fallback via FormSubmit AJAX endpoint
    if (deliveredVia === 'recorded') {
      try {
        const fsRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(coordinatorEmail)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            _subject: subjectLabel,
            _replyto: email,
            _template: 'table',
            name,
            email,
            phone: phone || 'Not provided',
            destination_city: destinationCity || 'Not provided',
            selected_kittens: kittenSummary,
            total_adoption_fee: totalFee ? `$${Number(totalFee).toLocaleString()} ${SITE.currency}` : 'Standard',
            reservation_deposit: reservationDeposit ? `$${Number(reservationDeposit).toLocaleString()} ${SITE.currency}` : 'Standard',
            message: message || 'Interested in reserving selected kitten(s).',
          }),
          signal: AbortSignal.timeout(4000),
        });
        if (fsRes.ok) deliveredVia = 'formsubmit';
      } catch {
        // Gracefully continue with mailto fallback
      }
    }

    const mailtoUrl = `mailto:${coordinatorEmail}?subject=${encodeURIComponent(subjectLabel)}&body=${encodeURIComponent(fullBodyLines)}`;

    return Response.json(
      {
        success: true,
        deliveredVia,
        coordinatorEmail,
        mailtoUrl,
        message: 'Inquiry sent successfully. Our adoption coordinator will be in touch shortly.',
        data: { name, email, kittenName: kittenSummary, phone, destinationCity, message },
      },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  } catch {
    return Response.json(
      { success: false, message: 'Failed to process inquiry payload.' },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}
