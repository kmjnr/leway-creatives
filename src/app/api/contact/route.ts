import { NextRequest, NextResponse } from "next/server";
import { budgetOptions, serviceOptions } from "@/data/contact";
import { site } from "@/data/site";

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
const MAX_BODY_BYTES = 12_000;
const MAX_NAME = 100;
const MAX_EMAIL = 255;
const MAX_COMPANY = 120;
const MAX_PHONE = 20;
const MAX_MESSAGE = 2000;

const SERVICE_SET = new Set<string>(serviceOptions);
const BUDGET_SET = new Set<string>(budgetOptions);

/* Bounded in-memory rate limit: 5 submissions per IP per 15 minutes.
   Per-instance on serverless hosts, but it stops obvious bursts without
   letting the map grow without limit. */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_TRACKED_IPS = 5_000;
const hits = new Map<string, number[]>();

function prune(now: number) {
    for (const [ip, times] of hits) {
        const recent = times.filter((t) => now - t < WINDOW_MS);
        if (recent.length === 0) hits.delete(ip);
        else hits.set(ip, recent);
    }
}

function rateLimited(ip: string) {
    const now = Date.now();
    if (hits.size >= MAX_TRACKED_IPS) prune(now);

    const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
    if (recent.length >= MAX_PER_WINDOW) {
        hits.set(ip, recent);
        return true;
    }
    recent.push(now);
    hits.set(ip, recent);
    return false;
}

/**
 * Behind Netlify the client address is in `x-nf-client-connection-ip`.
 * `x-forwarded-for` is only a fallback because it is client-spoofable.
 */
function clientIp(req: NextRequest) {
    const netlify = req.headers.get("x-nf-client-connection-ip");
    if (netlify) return netlify.trim();
    const real = req.headers.get("x-real-ip");
    if (real) return real.trim();
    return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

/** Single-line field: strip control characters, collapse whitespace, cap length. */
function oneLine(value: unknown, max: number) {
    if (typeof value !== "string") return "";
    return value
        .replace(/[\u0000-\u001F\u007F]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, max);
}

/** Multi-line field: keep newlines, drop other control characters, cap length. */
function multiLine(value: unknown, max: number) {
    if (typeof value !== "string") return "";
    return value
        .replace(/\r\n/g, "\n")
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
        .trim()
        .slice(0, max);
}

function json(body: Record<string, unknown>, status: number) {
    return NextResponse.json(body, {
        status,
        headers: { "Cache-Control": "no-store" },
    });
}

export async function POST(req: NextRequest) {
    try {
        if (!req.headers.get("content-type")?.includes("application/json")) {
            return json({ error: "Unsupported content type." }, 415);
        }

        const declaredLength = Number(req.headers.get("content-length") ?? 0);
        if (declaredLength > MAX_BODY_BYTES) {
            return json({ error: "That message is too long." }, 413);
        }

        const ip = clientIp(req);
        if (rateLimited(ip)) {
            return json(
                { error: "Too many submissions. Please wait a few minutes, or email us directly." },
                429,
            );
        }

        const body = await req.json().catch(() => null);
        if (!body || typeof body !== "object" || Array.isArray(body)) {
            return json({ error: "Invalid request." }, 400);
        }

        // Honeypot filled → a bot. Return success without notifying anyone.
        if (oneLine((body as Record<string, unknown>).website, 1)) {
            return json({ success: true }, 200);
        }

        const raw = body as Record<string, unknown>;

        const name = oneLine(raw.name, MAX_NAME);
        const email = oneLine(raw.email, MAX_EMAIL).toLowerCase();
        const company = oneLine(raw.company, MAX_COMPANY);
        const whatsapp = oneLine(raw.whatsapp, MAX_PHONE);
        const message = multiLine(raw.message, MAX_MESSAGE);
        const budget = BUDGET_SET.has(oneLine(raw.budget, 60)) ? oneLine(raw.budget, 60) : "";
        const services = Array.isArray(raw.services)
            ? [...new Set(raw.services.map((s) => oneLine(s, 80)).filter((s) => SERVICE_SET.has(s)))]
            : [];

        if (!name) {
            return json({ error: "Please provide your name." }, 400);
        }
        if (!email || !EMAIL_RE.test(email)) {
            return json({ error: "Please provide a valid email address." }, 400);
        }
        if (message.length < 20) {
            return json({ error: "Please add a short description of what you need." }, 400);
        }

        const phone = process.env.CALLMEBOT_PHONE;
        const apikey = process.env.CALLMEBOT_APIKEY;
        if (!phone || !apikey) {
            // Never log the lead's details; the operator only needs to know
            // that a message could not be delivered.
            console.error(
                "Contact route is not configured: set CALLMEBOT_PHONE and CALLMEBOT_APIKEY. One enquiry was not delivered.",
            );
            return json(
                { error: `We couldn't send the notification. Please email us at ${site.email}.` },
                500,
            );
        }

        const lines = [
            "New enquiry — LEWAY Creatives",
            "",
            `Name: ${name}`,
            `Email: ${email}`,
        ];
        if (company) lines.push(`Company: ${company}`);
        if (whatsapp) lines.push(`WhatsApp: ${whatsapp}`);
        if (budget) lines.push(`Budget: ${budget}`);
        if (services.length) lines.push(`Services: ${services.join(", ")}`);
        lines.push("", "What they need:", message);

        const callmebotUrl =
            `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}` +
            `&text=${encodeURIComponent(lines.join("\n"))}&apikey=${encodeURIComponent(apikey)}`;

        const response = await fetch(callmebotUrl, {
            signal: AbortSignal.timeout(8_000),
            cache: "no-store",
        });
        if (!response.ok) {
            console.error("Callmebot API error:", response.status);
            return json(
                { error: `We couldn't send the notification. Please email us directly at ${site.email}.` },
                502,
            );
        }

        return json({ success: true }, 200);
    } catch (err) {
        // Log the error type only — request bodies may contain personal data.
        console.error(
            "Contact API route failed:",
            err instanceof Error ? err.name : "unknown error",
        );
        return json({ error: "Internal server error." }, 500);
    }
}
