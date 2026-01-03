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
"[externals]/@aws-sdk/client-s3 [external] (@aws-sdk/client-s3, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@aws-sdk/client-s3", () => require("@aws-sdk/client-s3"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/api/s3-signed-url/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@aws-sdk/client-s3 [external] (@aws-sdk/client-s3, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$aws$2d$sdk$2f$s3$2d$request$2d$presigner$2f$dist$2d$es$2f$getSignedUrl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/@aws-sdk/s3-request-presigner/dist-es/getSignedUrl.js [app-route] (ecmascript)");
;
;
;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !BUCKET_NAME) {
    console.error("Missing AWS credentials or bucket name");
}
const s3Client = new __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$29$__["S3Client"]({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID || "",
        secretAccessKey: AWS_SECRET_ACCESS_KEY || ""
    }
});
async function GET(request) {
    try {
        // Check if credentials are configured
        if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "AWS credentials not configured"
            }, {
                status: 500
            });
        }
        if (!BUCKET_NAME) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "S3 bucket name not configured"
            }, {
                status: 500
            });
        }
        const searchParams = request.nextUrl.searchParams;
        const key = searchParams.get("key");
        if (!key) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing 'key' parameter"
            }, {
                status: 400
            });
        }
        // Extract the key from the full URL if provided
        let objectKey = key;
        // Handle different URL formats
        if (key.startsWith("https://") || key.startsWith("http://")) {
            try {
                const url = new URL(key);
                // Remove leading slash from pathname
                objectKey = url.pathname.substring(1);
                // If pathname is empty or just "/", try to extract from hostname
                if (!objectKey && url.hostname.includes(BUCKET_NAME || "")) {
                    // This shouldn't happen, but handle it
                    objectKey = key.split(`${BUCKET_NAME}/`)[1] || key;
                }
            } catch (e) {
                // If URL parsing fails, try to extract manually
                if (BUCKET_NAME && key.includes(BUCKET_NAME)) {
                    const urlParts = key.split(`${BUCKET_NAME}/`);
                    objectKey = urlParts[1] || key;
                } else {
                    objectKey = key;
                }
            }
        } else if (BUCKET_NAME && key.includes(BUCKET_NAME)) {
            // If bucket name is in the key string, extract the path part
            const urlParts = key.split(`${BUCKET_NAME}/`);
            objectKey = urlParts[1] || key;
        }
        // Clean up the object key (remove any query parameters)
        if (objectKey.includes("?")) {
            objectKey = objectKey.split("?")[0];
        }
        console.log("Generating signed URL for:", {
            originalKey: key,
            objectKey,
            bucket: BUCKET_NAME
        });
        const command = new __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$29$__["GetObjectCommand"]({
            Bucket: BUCKET_NAME,
            Key: objectKey
        });
        // Generate a signed URL that expires in 1 hour
        const signedUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$aws$2d$sdk$2f$s3$2d$request$2d$presigner$2f$dist$2d$es$2f$getSignedUrl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSignedUrl"])(s3Client, command, {
            expiresIn: 3600
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            url: signedUrl
        });
    } catch (error) {
        console.error("Error generating signed URL:", {
            message: error.message,
            name: error.name,
            code: error.Code || error.code,
            bucket: BUCKET_NAME,
            region: AWS_REGION
        });
        // Provide more specific error messages
        let errorMessage = error.message || "Failed to generate signed URL";
        if (error.name === "AccessDenied" || error.Code === "AccessDenied" || error.$metadata?.httpStatusCode === 403) {
            errorMessage = `Access Denied. IAM user needs s3:GetObject permission. Check:\n1. IAM user has s3:GetObject permission\n2. Bucket policy allows GetObject (if using bucket policy)\n3. KMS permissions for encrypted objects`;
        } else if (error.name === "NoSuchKey" || error.Code === "NoSuchKey") {
            errorMessage = `Object not found. The image may not exist at the specified path.`;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: errorMessage
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__769a78c2._.js.map