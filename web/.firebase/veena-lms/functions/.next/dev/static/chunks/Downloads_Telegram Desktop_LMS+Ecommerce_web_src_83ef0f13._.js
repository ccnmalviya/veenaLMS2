(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/lib/firebaseClient.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "app",
    ()=>app,
    "auth",
    ()=>auth,
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/@firebase/app/dist/esm/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/@firebase/auth/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
;
;
;
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// TODO: replace with the final, correct config from your Firebase console
const firebaseConfig = {
    apiKey: "AIzaSyC85KACqcAl8tnrzfwybbuMXKspvLfkMBQ",
    authDomain: "veena-lms.firebaseapp.com",
    projectId: "veena-lms",
    storageBucket: "veena-lms.firebasestorage.app",
    messagingSenderId: "843457897028",
    appId: "1:843457897028:web:62a75a285947e39ca75211",
    measurementId: "G-BVZ10GTDXJ"
};
let app;
let auth;
let db;
if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApps"])().length) {
    app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig);
    auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuth"])(app);
    db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])(app);
} else {
    app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApps"])()[0];
    auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuth"])(app);
    db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])(app);
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminLayout",
    ()=>AdminLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/@firebase/auth/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/lib/firebaseClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/lucide-react/dist/esm/icons/video.js [app-client] (ecmascript) <export default as Video>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function AdminLayout({ children }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    // Persist sidebar state in localStorage
    const [sidebarOpen, setSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "AdminLayout.useState": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const saved = localStorage.getItem("adminSidebarOpen");
                return saved !== null ? saved === "true" : true;
            }
            //TURBOPACK unreachable
            ;
        }
    }["AdminLayout.useState"]);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userMenuOpen, setUserMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(9);
    const [openSubmenu, setOpenSubmenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Save sidebar state to localStorage when it changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminLayout.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("adminSidebarOpen", sidebarOpen.toString());
            }
        }
    }["AdminLayout.useEffect"], [
        sidebarOpen
    ]);
    // Keep Products submenu open when on store-items pages
    // Keep Courses submenu open when on courses pages
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminLayout.useEffect": ()=>{
            if (pathname?.startsWith("/admin/store-items")) {
                setOpenSubmenu("products");
            } else if (pathname?.startsWith("/admin/courses")) {
                setOpenSubmenu("courses");
            }
        }
    }["AdminLayout.useEffect"], [
        pathname
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminLayout.useEffect": ()=>{
            const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onAuthStateChanged"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"], {
                "AdminLayout.useEffect.unsubscribe": async (firebaseUser)=>{
                    if (!firebaseUser) {
                        router.push("/login");
                        return;
                    }
                    const userRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "users", firebaseUser.uid);
                    const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(userRef);
                    const userData = snap.data();
                    if (!userData || userData.role !== "super_admin" && userData.role !== "admin") {
                        router.push("/dashboard");
                        return;
                    }
                    setUser({
                        ...userData,
                        email: firebaseUser.email
                    });
                }
            }["AdminLayout.useEffect.unsubscribe"]);
            return ({
                "AdminLayout.useEffect": ()=>unsubscribe()
            })["AdminLayout.useEffect"];
        }
    }["AdminLayout.useEffect"], [
        router
    ]);
    // Close user menu when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminLayout.useEffect": ()=>{
            const handleClickOutside = {
                "AdminLayout.useEffect.handleClickOutside": (event)=>{
                    const target = event.target;
                    if (userMenuOpen && !target.closest(".user-menu-container")) {
                        setUserMenuOpen(false);
                    }
                }
            }["AdminLayout.useEffect.handleClickOutside"];
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "AdminLayout.useEffect": ()=>document.removeEventListener("mousedown", handleClickOutside)
            })["AdminLayout.useEffect"];
        }
    }["AdminLayout.useEffect"], [
        userMenuOpen
    ]);
    const handleLogout = async ()=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"]);
        router.push("/login");
    };
    const menuItems = [
        {
            title: "MENU",
            items: [
                {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"],
                    label: "Dashboards",
                    path: "/admin",
                    badge: "01"
                }
            ]
        },
        {
            title: "CUSTOM",
            items: [
                {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"],
                    label: "Products",
                    path: "/admin/store-items",
                    submenu: true,
                    submenuItems: [
                        {
                            label: "Items",
                            path: "/admin/store-items"
                        },
                        {
                            label: "Categories",
                            path: "/admin/store-items/categories"
                        },
                        {
                            label: "Brands",
                            path: "/admin/store-items/brands"
                        }
                    ]
                },
                {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"],
                    label: "Homepage",
                    path: "/admin/homepage",
                    submenu: true
                },
                {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"],
                    label: "Layouts",
                    path: "/admin/layouts",
                    badge: "New",
                    submenu: true,
                    submenuItems: [
                        {
                            label: "Orange Cards",
                            path: "/admin/layouts#offers"
                        },
                        {
                            label: "Homepage Testimonials",
                            path: "/admin/layouts#testimonials"
                        },
                        {
                            label: "Classes Video Testimonials",
                            path: "/admin/layouts#classes-testimonials"
                        }
                    ]
                }
            ]
        },
        {
            title: "COMPONENTS",
            items: [
                {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
                    label: "Courses",
                    path: "/admin/courses",
                    submenu: true,
                    submenuItems: [
                        {
                            label: "All Courses",
                            path: "/admin/courses"
                        },
                        {
                            label: "Categories",
                            path: "/admin/courses/categories"
                        }
                    ]
                },
                {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"],
                    label: "Live Classes",
                    path: "/admin/live-classes",
                    submenu: true
                },
                {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"],
                    label: "Workshops",
                    path: "/admin/workshops",
                    submenu: true
                },
                {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"],
                    label: "Orders",
                    path: "/admin/orders",
                    submenu: true
                },
                {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"],
                    label: "Certificates",
                    path: "/admin/certificates",
                    submenu: true
                },
                {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
                    label: "Users",
                    path: "/admin/users",
                    submenu: true
                },
                {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"],
                    label: "Staff",
                    path: "/admin/staff",
                    submenu: true
                }
            ]
        }
    ];
    const isActive = (path)=>pathname === path || pathname?.startsWith(path + "/");
    const toggleSubmenu = (menuKey)=>{
        setOpenSubmenu(openSubmenu === menuKey ? null : menuKey);
    };
    // Get breadcrumb path from pathname
    const getBreadcrumbs = ()=>{
        const breadcrumbs = [
            {
                label: "Lunoz",
                path: "/admin"
            }
        ];
        if (pathname === "/admin") {
            return breadcrumbs;
        }
        const pathParts = pathname.split("/").filter(Boolean);
        // Skip "admin" part
        if (pathParts[0] === "admin") {
            pathParts.shift();
        }
        let currentPath = "/admin";
        pathParts.forEach((part, index)=>{
            currentPath += `/${part}`;
            // Format the label
            let label = part.split("-").map((word)=>word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
            // Handle special cases
            if (part === "store-items") {
                label = "Items";
            } else if (part === "live-classes") {
                label = "Live Classes";
            } else if (part === "new") {
                label = "New";
            } else if (part === "edit") {
                label = "Edit";
            } else if (part.match(/^[a-f0-9]{20,}$/)) {
                // Looks like a document ID - use previous part + "Details"
                const prevLabel = breadcrumbs[breadcrumbs.length - 1]?.label || "";
                label = prevLabel.replace("s", "") + " Details";
            }
            breadcrumbs.push({
                label,
                path: currentPath
            });
        });
        return breadcrumbs;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen bg-gray-50 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: `${sidebarOpen ? "w-64" : "w-20"} bg-gray-900 text-white transition-all duration-300 flex flex-col fixed left-0 top-0 bottom-0 z-40`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: `font-bold text-xl ${!sidebarOpen && "hidden"}`,
                                children: "LUNOZ"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                lineNumber: 228,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSidebarOpen(!sidebarOpen),
                                className: "p-2 hover:bg-gray-800 rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                    lineNumber: 233,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                lineNumber: 229,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                        lineNumber: 227,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex-1 overflow-y-auto px-4 pb-4",
                        children: menuItems.map((section, sectionIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: `text-xs font-semibold text-gray-400 uppercase mb-3 ${!sidebarOpen && "hidden"}`,
                                        children: section.title
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                        lineNumber: 241,
                                        columnNumber: 15
                                    }, this),
                                    section.items.map((item, itemIdx)=>{
                                        const Icon = item.icon;
                                        const active = isActive(item.path);
                                        const menuKey = item.label.toLowerCase().replace(/\s+/g, "-");
                                        const isSubmenuOpen = openSubmenu === menuKey;
                                        const hasSubmenu = "submenu" in item && item.submenu && "submenuItems" in item && item.submenuItems;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>hasSubmenu ? toggleSubmenu(menuKey) : router.push(item.path),
                                                    className: `w-full flex items-center justify-between px-4 py-3 mb-2 rounded-lg transition-colors ${active ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                                    className: "w-5 h-5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                                    lineNumber: 262,
                                                                    columnNumber: 25
                                                                }, this),
                                                                sidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm",
                                                                    children: item.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                                    lineNumber: 263,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                            lineNumber: 261,
                                                            columnNumber: 23
                                                        }, this),
                                                        sidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                item.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `text-xs px-2 py-0.5 rounded ${active ? "bg-blue-700" : "bg-blue-600"}`,
                                                                    children: item.badge
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                                    lineNumber: 268,
                                                                    columnNumber: 29
                                                                }, this),
                                                                hasSubmenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                    className: `w-4 h-4 transition-transform ${isSubmenuOpen ? "rotate-90" : ""}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                                    lineNumber: 275,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                            lineNumber: 266,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 21
                                                }, this),
                                                hasSubmenu && isSubmenuOpen && sidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "ml-4 mb-2 space-y-1",
                                                    children: item.submenuItems.map((subItem, subIdx)=>{
                                                        const isSubActive = pathname === subItem.path || pathname?.startsWith(subItem.path + "/");
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: subItem.path,
                                                            className: `block px-4 py-2 rounded-lg text-sm transition-colors ${isSubActive ? "bg-blue-700 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`,
                                                            children: subItem.label
                                                        }, subIdx, false, {
                                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                            lineNumber: 285,
                                                            columnNumber: 29
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                    lineNumber: 281,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, itemIdx, true, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                            lineNumber: 252,
                                            columnNumber: 19
                                        }, this);
                                    })
                                ]
                            }, sectionIdx, true, {
                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                lineNumber: 240,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: (()=>{
                                        const breadcrumbs = getBreadcrumbs();
                                        return breadcrumbs.map((crumb, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    index > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-400",
                                                        children: "/"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 322,
                                                        columnNumber: 35
                                                    }, this),
                                                    index === breadcrumbs.length - 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium text-gray-900",
                                                        children: crumb.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 324,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: crumb.path,
                                                        className: "text-sm text-gray-600 hover:text-gray-900",
                                                        children: crumb.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 326,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, crumb.path, true, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                lineNumber: 321,
                                                columnNumber: 19
                                            }, this));
                                    })()
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                    lineNumber: 317,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "p-2 hover:bg-gray-100 rounded-lg",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "w-5 h-5 text-gray-600"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                lineNumber: 339,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                            lineNumber: 338,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "p-2 hover:bg-gray-100 rounded-lg relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                    className: "w-5 h-5 text-gray-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                    lineNumber: 342,
                                                    columnNumber: 17
                                                }, this),
                                                notifications > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center",
                                                    children: notifications
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                    lineNumber: 344,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                            lineNumber: 341,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "p-2 hover:bg-gray-100 rounded-lg",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                                className: "w-5 h-5 text-gray-600"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                lineNumber: 350,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                            lineNumber: 349,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative user-menu-container",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setUserMenuOpen(!userMenuOpen),
                                                    className: "flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold",
                                                            children: user?.name?.charAt(0) || "U"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                            lineNumber: 357,
                                                            columnNumber: 19
                                                        }, this),
                                                        user?.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-medium text-gray-700",
                                                            children: user.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                            lineNumber: 361,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                            className: "w-4 h-4 text-gray-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                            lineNumber: 363,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                    lineNumber: 353,
                                                    columnNumber: 17
                                                }, this),
                                                userMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: "/admin/profile",
                                                            className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
                                                            onClick: ()=>setUserMenuOpen(false),
                                                            children: "Profile"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                            lineNumber: 367,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: "/admin/settings",
                                                            className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
                                                            onClick: ()=>setUserMenuOpen(false),
                                                            children: "Settings"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                            lineNumber: 374,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                setUserMenuOpen(false);
                                                                handleLogout();
                                                            },
                                                            className: "block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100",
                                                            children: "Logout"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                            lineNumber: 381,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                                    lineNumber: 366,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                            lineNumber: 352,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                                    lineNumber: 337,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                            lineNumber: 316,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                        lineNumber: 315,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 overflow-y-auto bg-gray-50 p-6",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                        lineNumber: 398,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
                lineNumber: 309,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx",
        lineNumber: 219,
        columnNumber: 5
    }, this);
}
_s(AdminLayout, "tBYZA+7X431X/7d4EJXd1HBM0YU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = AdminLayout;
var _c;
__turbopack_context__.k.register(_c, "AdminLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/lib/firebaseClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$admin$2f$AdminLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/admin/AdminLayout.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-client] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/recharts/es6/chart/PieChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/recharts/es6/polar/Pie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6"
];
function AdminDashboard() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        orders: 0,
        revenue: 0,
        averagePrice: 0,
        productsSold: 0,
        totalUsers: 0,
        totalOrders: 0,
        totalRevenue: 0,
        activeCourses: 0,
        totalProducts: 0,
        totalCategories: 0
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            loadDashboardData();
        }
    }["AdminDashboard.useEffect"], []);
    const loadDashboardData = async ()=>{
        try {
            // Load all data in parallel
            const [ordersSnapshot, itemsSnapshot, usersSnapshot, categoriesSnapshot] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "orders"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("createdAt", "desc"))),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "store_items"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])("status", "==", "active"))),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "users")),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "categories"))
            ]);
            // Get all products without orderBy to avoid index requirements
            const allItemsSnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "store_items"));
            const orders = ordersSnapshot.docs.map((doc)=>({
                    id: doc.id,
                    ...doc.data()
                }));
            const items = itemsSnapshot.docs.map((doc)=>({
                    id: doc.id,
                    ...doc.data()
                }));
            // Calculate stats
            const totalOrders = orders.length;
            const totalRevenue = orders.reduce((sum, order)=>{
                const amount = order.totalAmount || order.total_amount || 0;
                // Only count paid orders for revenue
                if (order.paymentStatus === "paid" || order.payment_status === "paid") {
                    return sum + amount;
                }
                return sum;
            }, 0);
            const avgPrice = totalOrders > 0 ? totalRevenue / totalOrders : 0;
            const productsSold = orders.reduce((sum, order)=>{
                return sum + (order.items?.length || 0);
            }, 0);
            // Analytics stats
            const totalUsers = usersSnapshot.size;
            // Count all products - use the same method as items page for consistency
            const totalProducts = allItemsSnapshot.size;
            const totalCategories = categoriesSnapshot.size;
            // Filter courses from items (handle both old and new field names)
            const activeCourses = itemsSnapshot.docs.filter((doc)=>{
                const data = doc.data();
                return (data.itemType === "physical_product" || data.type === "course") && data.status === "active";
            }).length;
            setStats({
                orders: totalOrders,
                revenue: totalRevenue,
                averagePrice: avgPrice,
                productsSold: productsSold,
                totalUsers: totalUsers,
                totalOrders: totalOrders,
                totalRevenue: totalRevenue,
                activeCourses: activeCourses,
                totalProducts: totalProducts,
                totalCategories: totalCategories
            });
        } catch (error) {
            console.error("Error loading dashboard data:", error);
        } finally{
            setLoading(false);
        }
    };
    // Sample chart data (replace with real data from Firestore)
    const dailySalesData = [
        {
            name: "Apple",
            value: 30,
            color: "#3B82F6"
        },
        {
            name: "Samsung",
            value: 25,
            color: "#10B981"
        },
        {
            name: "Google",
            value: 20,
            color: "#F59E0B"
        },
        {
            name: "Others",
            value: 25,
            color: "#8B5CF6"
        }
    ];
    const statisticsData = [
        {
            year: "2010",
            value: 120
        },
        {
            year: "2011",
            value: 150
        },
        {
            year: "2012",
            value: 180
        },
        {
            year: "2013",
            value: 140
        },
        {
            year: "2014",
            value: 160
        },
        {
            year: "2015",
            value: 190
        },
        {
            year: "2016",
            value: 170
        },
        {
            year: "2017",
            value: 200
        },
        {
            year: "2018",
            value: 180
        },
        {
            year: "2019",
            value: 190
        }
    ];
    const revenueData = [
        {
            year: "2013",
            revenue: 80
        },
        {
            year: "2014",
            revenue: 100
        },
        {
            year: "2015",
            revenue: 120
        },
        {
            year: "2016",
            revenue: 110
        },
        {
            year: "2017",
            revenue: 140
        },
        {
            year: "2018",
            revenue: 130
        },
        {
            year: "2019",
            revenue: 150
        }
    ];
    const recentBuyers = [
        {
            product: "iPhone X",
            customer: "Tiffany W. Yang",
            category: "Mobile",
            popularity: 85,
            amount: "$1200.00"
        },
        {
            product: "iPad",
            customer: "Dale B. Warman",
            category: "Tablet",
            popularity: 70,
            amount: "$1190.00"
        },
        {
            product: "MacBook Pro",
            customer: "John D. Smith",
            category: "Laptop",
            popularity: 95,
            amount: "$2499.00"
        }
    ];
    const transactions = [
        {
            card: "**** **** **** 1234",
            date: "11 April 2019",
            amount: "$79.49",
            type: "VISA",
            payer: "Helen Warren"
        },
        {
            card: "**** **** **** 5678",
            date: "28 Jan 2019",
            amount: "$1254.00",
            type: "stripe",
            payer: "Kayla Lambie"
        }
    ];
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$admin$2f$AdminLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminLayout"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center h-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-lg",
                    children: "Loading..."
                }, void 0, false, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                    lineNumber: 196,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                lineNumber: 195,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
            lineNumber: 194,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$admin$2f$AdminLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminLayout"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-gray-900",
                        children: "Dashboard"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                        lineNumber: 206,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                    lineNumber: 205,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                            title: "TOTAL PRODUCTS",
                            value: stats.totalProducts.toLocaleString(),
                            change: "All products in store",
                            changeType: "neutral",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"],
                            iconColor: "bg-blue-500"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                            lineNumber: 211,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                            title: "TOTAL CATEGORIES",
                            value: stats.totalCategories.toLocaleString(),
                            change: "Product categories",
                            changeType: "neutral",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"],
                            iconColor: "bg-green-500"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                            lineNumber: 219,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                            title: "ORDERS",
                            value: stats.orders.toLocaleString(),
                            change: "+11% From previous period",
                            changeType: "positive",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"],
                            iconColor: "bg-purple-500"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                            lineNumber: 227,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                    lineNumber: 210,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                            title: "REVENUE",
                            value: `₹${stats.revenue.toLocaleString()}`,
                            change: "-29% From previous period",
                            changeType: "negative",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"],
                            iconColor: "bg-green-500"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                            lineNumber: 239,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                            title: "AVERAGE PRICE",
                            value: `₹${stats.averagePrice.toFixed(1)}`,
                            change: "0% From previous period",
                            changeType: "neutral",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
                            iconColor: "bg-yellow-500"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                            lineNumber: 247,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                            title: "PRODUCT SOLD",
                            value: stats.productsSold.toLocaleString(),
                            change: "+89% Last year",
                            changeType: "positive",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"],
                            iconColor: "bg-orange-500"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                            lineNumber: 255,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                    lineNumber: 238,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg shadow-md p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold mb-4",
                                    children: "Daily Sales"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                    lineNumber: 269,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                        width: "100%",
                                        height: 250,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChart"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pie"], {
                                                    data: dailySalesData,
                                                    cx: "50%",
                                                    cy: "50%",
                                                    innerRadius: 60,
                                                    outerRadius: 100,
                                                    paddingAngle: 5,
                                                    dataKey: "value",
                                                    children: dailySalesData.map((entry, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                                            fill: entry.color
                                                        }, `cell-${index}`, false, {
                                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                            lineNumber: 283,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                    lineNumber: 273,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                    lineNumber: 286,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                            lineNumber: 272,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                        lineNumber: 271,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                    lineNumber: 270,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center mt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-2xl font-bold text-gray-900",
                                            children: "Apple Company"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                            lineNumber: 291,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-3xl font-bold text-blue-600 mt-2",
                                            children: "30"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                            lineNumber: 292,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                    lineNumber: 290,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-600",
                                                children: "5,459 Total Sales"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                lineNumber: 296,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                            lineNumber: 295,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-600",
                                                children: "18 Open Compaign"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                lineNumber: 299,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                            lineNumber: 298,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                    lineNumber: 294,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                            lineNumber: 268,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg shadow-md p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold mb-4",
                                    children: "Statistics"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                    lineNumber: 306,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                    width: "100%",
                                    height: 250,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                                        data: statisticsData,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                strokeDasharray: "3 3"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                lineNumber: 309,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                dataKey: "year"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                lineNumber: 310,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {}, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                lineNumber: 311,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                lineNumber: 312,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                dataKey: "value",
                                                fill: "#10B981"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                lineNumber: 313,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                        lineNumber: 308,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                    lineNumber: 307,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-600",
                                                children: "$1875.54 Revenue"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                lineNumber: 318,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                            lineNumber: 317,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-600",
                                                children: "541 Total Offers"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                lineNumber: 321,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                            lineNumber: 320,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                    lineNumber: 316,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                            lineNumber: 305,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg shadow-md p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold mb-4",
                                    children: "Total Revenue"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                    lineNumber: 328,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                    width: "100%",
                                    height: 250,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                                        data: revenueData,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                strokeDasharray: "3 3"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                lineNumber: 331,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                dataKey: "year"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                lineNumber: 332,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {}, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                lineNumber: 333,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                lineNumber: 334,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                                type: "monotone",
                                                dataKey: "revenue",
                                                stroke: "#EF4444",
                                                strokeWidth: 2
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                lineNumber: 335,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                        lineNumber: 330,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                    lineNumber: 329,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-600",
                                                children: "$7841.12 Total Revenue"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                lineNumber: 345,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                            lineNumber: 344,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-600",
                                                children: "17 Open Compaign"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                lineNumber: 348,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                            lineNumber: 347,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                    lineNumber: 343,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                            lineNumber: 327,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                    lineNumber: 266,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg shadow-md p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold mb-2",
                                    children: "Recent Buyers"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                    lineNumber: 358,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500 mb-4",
                                    children: "Transaction period from 21 July to 25 Aug"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                    lineNumber: 359,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "border-b border-gray-200",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "text-left py-3 px-4 text-sm font-semibold text-gray-700",
                                                            children: "Product"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                            lineNumber: 366,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "text-left py-3 px-4 text-sm font-semibold text-gray-700",
                                                            children: "Customers"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                            lineNumber: 369,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "text-left py-3 px-4 text-sm font-semibold text-gray-700",
                                                            children: "Categories"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                            lineNumber: 372,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "text-left py-3 px-4 text-sm font-semibold text-gray-700",
                                                            children: "Popularity"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                            lineNumber: 375,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "text-left py-3 px-4 text-sm font-semibold text-gray-700",
                                                            children: "Amount"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                            lineNumber: 378,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                    lineNumber: 365,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                lineNumber: 364,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                children: recentBuyers.map((buyer, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "border-b border-gray-100",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-3 px-4 text-sm text-gray-900",
                                                                children: buyer.product
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                                lineNumber: 386,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-3 px-4 text-sm text-gray-600",
                                                                children: buyer.customer
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                                lineNumber: 387,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-3 px-4 text-sm text-gray-600",
                                                                children: buyer.category
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                                lineNumber: 388,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-3 px-4",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-full bg-gray-200 rounded-full h-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "bg-blue-600 h-2 rounded-full",
                                                                        style: {
                                                                            width: `${buyer.popularity}%`
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                                        lineNumber: 391,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                                    lineNumber: 390,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                                lineNumber: 389,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-3 px-4 text-sm font-semibold text-gray-900",
                                                                children: buyer.amount
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                                lineNumber: 397,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, idx, true, {
                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                        lineNumber: 385,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                lineNumber: 383,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                        lineNumber: 363,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                    lineNumber: 362,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                            lineNumber: 357,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg shadow-md p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold mb-2",
                                    children: "Account Transactions"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                    lineNumber: 409,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500 mb-4",
                                    children: "Transaction period from 21 July to 25 Aug"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                    lineNumber: 410,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "border-b border-gray-200",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "text-left py-3 px-4 text-sm font-semibold text-gray-700",
                                                            children: "Card"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                            lineNumber: 417,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "text-left py-3 px-4 text-sm font-semibold text-gray-700",
                                                            children: "Date"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                            lineNumber: 420,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "text-left py-3 px-4 text-sm font-semibold text-gray-700",
                                                            children: "Amount"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                            lineNumber: 423,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "text-left py-3 px-4 text-sm font-semibold text-gray-700",
                                                            children: "Card"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                            lineNumber: 426,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "text-left py-3 px-4 text-sm font-semibold text-gray-700",
                                                            children: "Pay"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                            lineNumber: 429,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                    lineNumber: 416,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                lineNumber: 415,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                children: transactions.map((transaction, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "border-b border-gray-100",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-3 px-4 text-sm text-gray-900",
                                                                children: transaction.card
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                                lineNumber: 437,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-3 px-4 text-sm text-gray-600",
                                                                children: transaction.date
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                                lineNumber: 440,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-3 px-4 text-sm font-semibold text-gray-900",
                                                                children: transaction.amount
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                                lineNumber: 441,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-3 px-4 text-sm text-gray-600",
                                                                children: transaction.type
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                                lineNumber: 444,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-3 px-4 text-sm text-gray-600",
                                                                children: transaction.payer
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                                lineNumber: 445,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, idx, true, {
                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                        lineNumber: 436,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                                lineNumber: 434,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                        lineNumber: 414,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                                    lineNumber: 413,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                            lineNumber: 408,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                    lineNumber: 355,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
            lineNumber: 204,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
        lineNumber: 203,
        columnNumber: 5
    }, this);
}
_s(AdminDashboard, "QPwLlOg5bPC6GS2QygDvZFL+wzI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AdminDashboard;
function MetricCard({ title, value, change, changeType, icon: Icon, iconColor }) {
    const changeColor = changeType === "positive" ? "text-green-600" : changeType === "negative" ? "text-red-600" : "text-orange-600";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-semibold text-gray-600 uppercase",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                        lineNumber: 485,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${iconColor} p-3 rounded-lg`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            className: "w-6 h-6 text-white"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                            lineNumber: 487,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                        lineNumber: 486,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                lineNumber: 484,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-3xl font-bold text-gray-900",
                    children: value
                }, void 0, false, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                    lineNumber: 491,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                lineNumber: 490,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `text-sm ${changeColor}`,
                children: change
            }, void 0, false, {
                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
                lineNumber: 493,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/admin/page.tsx",
        lineNumber: 483,
        columnNumber: 5
    }, this);
}
_c1 = MetricCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "AdminDashboard");
__turbopack_context__.k.register(_c1, "MetricCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_Telegram%20Desktop_LMS%2BEcommerce_web_src_83ef0f13._.js.map