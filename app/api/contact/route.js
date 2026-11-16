// app/api/contact/route.js - Contact & Adoption Inquiry API
import { CONTACT } from '@/src/config/site.js';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, message, kittenName, phone } = data;

    if (!name || !email) {
      return Response.json(
        { success: false, message: 'Name and email are required.' },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // Return success acknowledgement
    return Response.json(
      {
        success: true,
        message: 'Inquiry received successfully. Our adoption coordinator will be in touch shortly.',
        data: { name, email, kittenName, phone, message },
        coordinatorEmail: CONTACT.email,
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
