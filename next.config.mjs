/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";

/**
 * Next injects a small inline bootstrap script, so `'unsafe-inline'` is needed
 * for `script-src`. `'unsafe-eval'` is only required by the dev overlay and is
 * dropped in production. Everything else stays locked to the origin.
 */
const scriptSrc = isDev
    ? "'self' 'unsafe-eval' 'unsafe-inline'"
    : "'self' 'unsafe-inline'";

const connectSrc = isDev ? "'self' ws: wss:" : "'self'";

const csp = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self'",
    `connect-src ${connectSrc}`,
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    images: {
        formats: ["image/avif", "image/webp"],
        // Source files are stable; a long TTL keeps repeat visits cheap.
        minimumCacheTTL: 60 * 60 * 24 * 30,
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { key: "Content-Security-Policy", value: csp },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains; preload",
                    },
                    { key: "X-Frame-Options", value: "SAMEORIGIN" },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    { key: "X-DNS-Prefetch-Control", value: "on" },
                    {
                        // Nothing on this site needs a camera, microphone,
                        // location, payment or USB device.
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
