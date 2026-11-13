import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * POST /api/contact
 *
 * Validates, rate-limits and forwards an enquiry to the owner's WhatsApp via
 * Callmebot. Credentials live in environment variables:
 *   - CALLMEBOT_PHONE   → WhatsApp number with country code (e.g. +254741408647)
 *   - CALLMEBOT_APIKEY  → the API key received from the Callmebot bot
 *
 * Nothing here is exposed to the client; the route runs entirely server-side.
 * Email is required, WhatsApp is optional — a lead is never dropped for not
 * having a phone number.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Naive in-memory rate limit: 5 submissions per IP per 15 minutes.
   It is per-instance on serverless hosts, but it stops obvious bursts. */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
    if (recent.length >= MAX_PER_WINDOW) return true;
    recent.push(now);
    hits.set(ip, recent);
    return false;
}

export async function POST(req: NextRequest) {
    try {
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
        if (rateLimited(ip)) {
            return NextResponse.json(
                { error: "Too many submissions. Please wait a few minutes, or email us directly." },
                { status: 429 },
            );
        }

        const body = await req.json().catch(() => null);
        if (!body || typeof body !== "object") {
            return NextResponse.json({ error: "Invalid request." }, { status: 400 });
        }

        // Honeypot filled → a bot. Return success without notifying anyone.
        if (typeof (body as Record<string, unknown>).website === "string" && (body as Record<string, unknown>).website) {
            return NextResponse.json({ success: true }, { status: 200 });
        }

        const {
            name,
            email,
            whatsapp,
            company,
            budget,
            services,
            message,
        } = body as Record<string, unknown>;

        const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
        const nameS = str(name);
        const emailS = str(email);
        const messageS = str(message);
        const whatsappS = str(whatsapp);
        const companyS = str(company);
        const budgetS = str(budget);
        const servicesArr = Array.isArray(services) ? services.filter((s): s is string => typeof s === "string" && s.length > 0) : [];

        if (!nameS || nameS.length > 100) {
            return NextResponse.json({ error: "Please provide your name." }, { status: 400 });
        }
        if (!emailS || !EMAIL_RE.test(emailS) || emailS.length > 255) {
            return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
        }
        if (!messageS || messageS.length < 10 || messageS.length > 2000) {
            return NextResponse.json({ error: "Please add a short description of what you need." }, { status: 400 });
        }

        const phone = process.env.CALLMEBOT_PHONE;
        const apikey = process.env.CALLMEBOT_APIKEY;
        if (!phone || !apikey) {
            console.error("Callmebot env vars not set: CALLMEBOT_PHONE / CALLMEBOT_APIKEY. Lead lost:", {
                name: nameS,
                email: emailS,
                message: messageS.slice(0, 200),
            });
            return NextResponse.json(
                { error: "Server misconfiguration." },
                { status: 500 },
            );
        }

        const lines = [
            "New enquiry — LEWAY Creatives",
            "",
            `Name: ${nameS}`,
            `Email: ${emailS}`,
        ];
        if (companyS) lines.push(`Company: ${companyS}`);
        if (whatsappS) lines.push(`WhatsApp: ${whatsappS}`);
        if (budgetS) lines.push(`Budget: ${budgetS}`);
        if (servicesArr.length) lines.push(`Services: ${servicesArr.join(", ")}`);
        lines.push("", "What they need:", messageS);

        const callmebotUrl =
            `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}` +
            `&text=${encodeURIComponent(lines.join("\n"))}&apikey=${encodeURIComponent(apikey)}`;

        const response = await fetch(callmebotUrl);
        if (!response.ok) {
            const text = await response.text().catch(() => "");
            console.error("Callmebot API error:", response.status, text.slice(0, 300));
            return NextResponse.json(
                { error: "We couldn't send the notification. Please email us directly at connect@lewaycreatives.com." },
                { status: 502 },
            );
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error("Contact API route error:", err);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
