module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/lib/razorpay.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Server-side Razorpay initialization
// This file is only used in API routes (server-side)
__turbopack_context__.s([
    "getRazorpayInstance",
    ()=>getRazorpayInstance
]);
let razorpayInstance = null;
function getRazorpayInstance() {
    if (!razorpayInstance) {
        // Use dynamic require for CommonJS module (works in Next.js API routes)
        const Razorpay = __turbopack_context__.r("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/razorpay/dist/razorpay.js [app-route] (ecmascript)");
        // Try to get keys from environment variables
        const keyId = process.env.RAZORPAY_KEY_ID || ("TURBOPACK compile-time value", "rzp_live_RxjZFKhR5qOUmu");
        const keySecret = process.env.RAZORPAY_KEY_SECRET;
        // Validate keys are present
        if (!keyId || keyId.trim() === "") {
            console.error("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
            console.error("NEXT_PUBLIC_RAZORPAY_KEY_ID:", ("TURBOPACK compile-time value", "rzp_live_RxjZFKhR5qOUmu"));
            throw new Error("Razorpay key_id is missing. Please set RAZORPAY_KEY_ID or NEXT_PUBLIC_RAZORPAY_KEY_ID in .env.local file.");
        }
        if (!keySecret || keySecret.trim() === "") {
            console.error("RAZORPAY_KEY_SECRET is missing");
            throw new Error("Razorpay key_secret is missing. Please set RAZORPAY_KEY_SECRET in .env.local file.");
        }
        razorpayInstance = new Razorpay({
            key_id: keyId.trim(),
            key_secret: keySecret.trim()
        });
    }
    return razorpayInstance;
}
}),
"[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/api/razorpay/create-order/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$razorpay$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/lib/razorpay.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        // Check if Razorpay keys are configured
        const keyId = process.env.RAZORPAY_KEY_ID || ("TURBOPACK compile-time value", "rzp_live_RxjZFKhR5qOUmu");
        const keySecret = process.env.RAZORPAY_KEY_SECRET;
        if (!keyId || !keySecret) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Razorpay keys not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in environment variables."
            }, {
                status: 500
            });
        }
        const body = await request.json();
        const { amount, currency = "INR", receipt, notes } = body;
        if (!amount || amount <= 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid amount"
            }, {
                status: 400
            });
        }
        const razorpay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$razorpay$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRazorpayInstance"])();
        // Create Razorpay order
        const options = {
            amount: Math.round(amount * 100),
            currency: currency,
            receipt: receipt || `receipt_${Date.now()}`,
            notes: notes || {}
        };
        const order = await razorpay.orders.create(options);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            id: order.id,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt
        });
    } catch (error) {
        console.error("Razorpay order creation error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || "Failed to create order"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__494d0acf._.js.map