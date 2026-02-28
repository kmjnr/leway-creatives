import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Receives contact form data and forwards a WhatsApp notification to the owner
 * via the Callmebot API. Credentials are stored in Netlify environment variables:
 *   - CALLMEBOT_PHONE   → your WhatsApp number with country code (e.g. +254741408647)
 *   - CALLMEBOT_APIKEY  → the API key received from the Callmebot bot
 *
 * The client never sees these values — this route runs entirely server-side.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, whatsapp, services, service } = body;

    // Basic server-side validation
    if (!name || !email || !whatsapp || !service) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const phone = process.env.CALLMEBOT_PHONE;
    const apikey = process.env.CALLMEBOT_APIKEY;

    if (!phone || !apikey) {
      console.error("Callmebot env vars not set: CALLMEBOT_PHONE / CALLMEBOT_APIKEY");
      return NextResponse.json(
        { error: "Server misconfiguration." },
        { status: 500 }
      );
    }

    const selectedServices =
      Array.isArray(services) && services.length
        ? `\nServices: ${services.join(", ")}`
        : "";

    const message = encodeURIComponent(
      `🔔 *New Enquiry - LEWAY Creatives*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📧 *Email:* ${email}\n` +
      `📱 *WhatsApp:* ${whatsapp}` +
      `${selectedServices}\n\n` +
      `💬 *Service Needed:*\n${service}`
    );

    const callmebotUrl = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${message}&apikey=${apikey}`;

    const response = await fetch(callmebotUrl);

    if (!response.ok) {
      const text = await response.text();
      console.error("Callmebot API error:", response.status, text);
      return NextResponse.json(
        { error: "Failed to send WhatsApp notification." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API route error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
