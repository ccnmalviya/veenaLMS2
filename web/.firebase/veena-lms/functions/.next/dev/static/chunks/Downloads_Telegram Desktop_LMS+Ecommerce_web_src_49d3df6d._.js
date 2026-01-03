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
"[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/@firebase/auth/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/lib/firebaseClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function Header() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showUserMenu, setShowUserMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [allItems, setAllItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [suggestionsOpen, setSuggestionsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Decide what we are searching based on current page
    const isClassesPage = pathname?.startsWith("/classes");
    const searchPlaceholder = isClassesPage ? "Search courses" : "Search products";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const unsub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onAuthStateChanged"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"], {
                "Header.useEffect.unsub": (u)=>setUser(u)
            }["Header.useEffect.unsub"]);
            return ({
                "Header.useEffect": ()=>unsub()
            })["Header.useEffect"];
        }
    }["Header.useEffect"], []);
    // Load a lightweight list of products once for search suggestions
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const loadItems = {
                "Header.useEffect.loadItems": async ()=>{
                    try {
                        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "store_items"));
                        const items = [];
                        snapshot.forEach({
                            "Header.useEffect.loadItems": (doc)=>{
                                const data = doc.data();
                                const title = (data.title || data.name || "").toString();
                                if (!title) return;
                                items.push({
                                    id: doc.id,
                                    title,
                                    type: data.type || data.itemType
                                });
                            }
                        }["Header.useEffect.loadItems"]);
                        setAllItems(items);
                    } catch (error) {
                        console.error("Error loading items for search suggestions:", error);
                    }
                }
            }["Header.useEffect.loadItems"];
            loadItems();
        }
    }["Header.useEffect"], []);
    const filteredSuggestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Header.useMemo[filteredSuggestions]": ()=>{
            const term = search.trim().toLowerCase();
            if (!term) return [];
            return allItems.filter({
                "Header.useMemo[filteredSuggestions]": (item)=>item.title.toLowerCase().includes(term)
            }["Header.useMemo[filteredSuggestions]"]).slice(0, 7);
        }
    }["Header.useMemo[filteredSuggestions]"], [
        allItems,
        search
    ]);
    const handleSearchSubmit = (e)=>{
        e.preventDefault();
        const term = search.trim();
        if (!term) return;
        const query = encodeURIComponent(term);
        if (isClassesPage) {
            router.push(`/classes?search=${query}`);
        } else {
            router.push(`/?search=${query}`);
        }
    };
    const handleSuggestionClick = (item)=>{
        setSuggestionsOpen(false);
        setSearch(item.title);
        // Go directly to product detail for a more "Google result" feel
        router.push(`/item/${item.id}`);
    };
    const handleLogout = async ()=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"]);
        setShowUserMenu(false);
        router.push("/");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between h-16 gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "text-xl md:text-2xl font-bold text-gray-900",
                            children: "Veena LMS"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSearchSubmit,
                            className: "hidden md:flex flex-1 max-w-xl mx-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: search,
                                        onChange: (e)=>{
                                            setSearch(e.target.value);
                                            setSuggestionsOpen(true);
                                        },
                                        placeholder: searchPlaceholder,
                                        className: "w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                        lineNumber: 110,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: "absolute right-1 top-1 bottom-1 px-4 rounded-full bg-black text-white text-xs font-semibold hover:bg-gray-900",
                                        children: "Search"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, this),
                                    suggestionsOpen && filteredSuggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute left-0 right-0 top-full mt-1 rounded-2xl border border-gray-200 bg-white shadow-lg z-40",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "max-h-72 overflow-y-auto py-1 text-sm",
                                            children: filteredSuggestions.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>handleSuggestionClick(item),
                                                        className: "flex w-full items-center justify-between px-3 py-2 hover:bg-gray-50",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "truncate text-left text-gray-800",
                                                                children: item.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                                                lineNumber: 138,
                                                                columnNumber: 27
                                                            }, this),
                                                            item.type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] uppercase tracking-wide text-gray-500",
                                                                children: item.type
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                                                lineNumber: 142,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 25
                                                    }, this)
                                                }, item.id, false, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                                    lineNumber: 132,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                            lineNumber: 130,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                        lineNumber: 129,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    className: "hidden md:flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/",
                                            className: `text-sm font-medium ${pathname === "/" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`,
                                            children: "Shop"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                            lineNumber: 159,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/classes",
                                            className: `text-sm font-medium ${pathname?.startsWith("/classes") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`,
                                            children: "Classes"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                            lineNumber: 169,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                    lineNumber: 158,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/cart",
                                    className: "relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg",
                                        children: "🛒"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                        lineNumber: 186,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                    lineNumber: 182,
                                    columnNumber: 11
                                }, this),
                                !user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    className: "flex items-center h-9 px-3 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-100",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mr-2 text-base",
                                            children: "👤"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                            lineNumber: 195,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Login / Sign up"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                            lineNumber: 196,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                    lineNumber: 191,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setShowUserMenu((v)=>!v),
                                            className: "flex items-center h-9 px-3 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "mr-2 text-base",
                                                    children: "👤"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "max-w-[120px] truncate",
                                                    children: user.displayName || user.email || "Account"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                                    lineNumber: 206,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                            lineNumber: 200,
                                            columnNumber: 17
                                        }, this),
                                        showUserMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white shadow-lg text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/dashboard",
                                                    className: "block px-4 py-2 hover:bg-gray-50",
                                                    onClick: ()=>setShowUserMenu(false),
                                                    children: "Dashboard"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                                    lineNumber: 212,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/orders",
                                                    className: "block px-4 py-2 hover:bg-gray-50",
                                                    onClick: ()=>setShowUserMenu(false),
                                                    children: "Orders"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                                    lineNumber: 219,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: handleLogout,
                                                    className: "w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600",
                                                    children: "Logout"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                            lineNumber: 211,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                    lineNumber: 199,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                            lineNumber: 156,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                    lineNumber: 98,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSearchSubmit,
                    className: "md:hidden pb-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: search,
                                onChange: (e)=>{
                                    setSearch(e.target.value);
                                    setSuggestionsOpen(true);
                                },
                                placeholder: searchPlaceholder,
                                className: "w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                lineNumber: 243,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "absolute right-1 top-1 bottom-1 px-4 rounded-full bg-black text-white text-xs font-semibold hover:bg-gray-900",
                                children: "Go"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                lineNumber: 253,
                                columnNumber: 13
                            }, this),
                            suggestionsOpen && filteredSuggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-0 right-0 top-full mt-1 rounded-2xl border border-gray-200 bg-white shadow-lg z-40",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "max-h-72 overflow-y-auto py-1 text-sm",
                                    children: filteredSuggestions.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>handleSuggestionClick(item),
                                                className: "flex w-full items-center justify-between px-3 py-2 hover:bg-gray-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "truncate text-left text-gray-800",
                                                        children: item.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                                        lineNumber: 271,
                                                        columnNumber: 25
                                                    }, this),
                                                    item.type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] uppercase tracking-wide text-gray-500",
                                                        children: item.type
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                                        lineNumber: 275,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                                lineNumber: 266,
                                                columnNumber: 23
                                            }, this)
                                        }, item.id, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                            lineNumber: 265,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                    lineNumber: 263,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                                lineNumber: 262,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                        lineNumber: 242,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
                    lineNumber: 241,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
            lineNumber: 97,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
_s(Header, "ZONsdMXUp41gipAIciBUd5t/zBA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
"use client";
;
;
function Footer() {
    // TODO: Make links and content manageable by super admin via CMS collections
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "bg-gray-950 text-gray-400 pt-12 pb-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-800",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-white font-semibold mb-3",
                                    children: "Veena LMS"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                                    lineNumber: 13,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm",
                                    children: "Unified platform to sell courses, live classes, workshops, and products with a single cart and dashboard."
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                                    lineNumber: 14,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                            lineNumber: 12,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-sm font-semibold text-white mb-3",
                                    children: "Navigation"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                                    lineNumber: 20,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-2 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/",
                                                className: "hover:text-white",
                                                children: "Home"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                                                lineNumber: 23,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                                            lineNumber: 22,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/classes",
                                                className: "hover:text-white",
                                                children: "Classes"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                                                lineNumber: 28,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                                            lineNumber: 27,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/dashboard",
                                                className: "hover:text-white",
                                                children: "Dashboard"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                                                lineNumber: 33,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                                            lineNumber: 32,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                                    lineNumber: 21,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-sm font-semibold text-white mb-3",
                                    children: "Support & Legal"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                                    lineNumber: 40,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-2 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/support",
                                                className: "hover:text-white",
                                                children: "Help & Support"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                                                lineNumber: 45,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                                            lineNumber: 44,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/terms",
                                                className: "hover:text-white",
                                                children: "Terms & Conditions"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                                                lineNumber: 50,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                                            lineNumber: 49,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/privacy",
                                                className: "hover:text-white",
                                                children: "Privacy Policy"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                                                lineNumber: 55,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                                            lineNumber: 54,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                                    lineNumber: 43,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-sm font-semibold text-white mb-3",
                                    children: "Contact"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm",
                                    children: "Email: hello@example.com"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm mt-1",
                                    children: "Phone: +91-00000-00000"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-gray-500 mt-4",
                                    children: "Content, pricing, and availability managed by super admin."
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                    lineNumber: 11,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between pt-4 text-xs text-gray-600",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                "© ",
                                new Date().getFullYear(),
                                " Veena LMS. All rights reserved."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Built on Next.js, Firebase, and AWS S3."
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/CategoryNavigation.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CategoryNavigation",
    ()=>CategoryNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/lib/firebaseClient.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function CategoryNavigation() {
    _s();
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CategoryNavigation.useEffect": ()=>{
            loadCategories();
        }
    }["CategoryNavigation.useEffect"], []);
    const loadCategories = async ()=>{
        try {
            // Try with orderBy first (requires composite index)
            let q;
            let snapshot;
            let categoriesData = [];
            try {
                q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "categories"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])("status", "==", "active"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("orderIndex", "asc"));
                snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
            } catch (error) {
                console.warn("Index error, trying fallback query:", error);
                // If query fails due to missing index, try without orderBy
                try {
                    q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "categories"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])("status", "==", "active"));
                    snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
                } catch (fallbackError) {
                    // If that also fails, get all categories and filter client-side
                    console.warn("Status filter failed, getting all categories:", fallbackError);
                    q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "categories"));
                    snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
                }
            }
            snapshot.forEach((doc)=>{
                const data = doc.data();
                // Include if status is active or if status field doesn't exist (default to active)
                if (!data.status || data.status === "active") {
                    categoriesData.push({
                        categoryId: doc.id,
                        ...data,
                        orderIndex: data.orderIndex || 999,
                        status: data.status || "active"
                    });
                }
            });
            // Sort manually
            categoriesData.sort((a, b)=>(a.orderIndex || 999) - (b.orderIndex || 999));
            setCategories(categoriesData);
            console.log("✅ Categories loaded:", categoriesData.length, categoriesData);
        } catch (error) {
            console.error("❌ Error loading categories:", error);
            setCategories([]);
        } finally{
            setLoading(false);
        }
    };
    // Always render the component so it's visible
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border-b-2 border-gray-300 shadow-md py-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4",
            children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center py-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm text-gray-600",
                    children: "Loading categories..."
                }, void 0, false, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/CategoryNavigation.tsx",
                    lineNumber: 80,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/CategoryNavigation.tsx",
                lineNumber: 79,
                columnNumber: 11
            }, this) : categories.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center py-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm text-gray-600 bg-yellow-50 px-4 py-2 rounded border border-yellow-200",
                    children: [
                        "No categories found. ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "/admin/store-items/categories/new",
                            className: "text-blue-600 underline",
                            children: "Create categories in admin panel"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/CategoryNavigation.tsx",
                            lineNumber: 85,
                            columnNumber: 36
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/CategoryNavigation.tsx",
                    lineNumber: 84,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/CategoryNavigation.tsx",
                lineNumber: 83,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex items-center gap-4 md:gap-6 overflow-x-auto pb-1 hide-scrollbar",
                children: categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/category/${category.slug || category.categoryId}`,
                        className: "text-sm md:text-base font-semibold text-gray-800 hover:text-blue-600 whitespace-nowrap transition-colors px-3 py-2 rounded-md hover:bg-blue-50 flex-shrink-0 border border-transparent hover:border-blue-200",
                        children: category.name
                    }, category.categoryId, false, {
                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/CategoryNavigation.tsx",
                        lineNumber: 91,
                        columnNumber: 15
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/CategoryNavigation.tsx",
                lineNumber: 89,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/CategoryNavigation.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/CategoryNavigation.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_s(CategoryNavigation, "Ku/3fYTZ4p+HhLbl/Ex0fsiHh1U=");
_c = CategoryNavigation;
var _c;
__turbopack_context__.k.register(_c, "CategoryNavigation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/home/NotificationStrip.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NotificationStrip",
    ()=>NotificationStrip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function NotificationStrip() {
    // TODO: Query Firestore for active notifications
    const notifications = [
        {
            id: "1",
            text: "🎉 New Course Launch: Advanced Photography",
            type: "new_launch"
        },
        {
            id: "2",
            text: "📅 Live Class Tomorrow: Digital Marketing Basics",
            type: "live_class"
        },
        {
            id: "3",
            text: "⚡ Limited Offer: 50% off on all workshops this week!",
            type: "offer"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-blue-600 text-white py-2",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center gap-4 overflow-x-auto",
                children: notifications.map((notif)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm whitespace-nowrap",
                        children: notif.text
                    }, notif.id, false, {
                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/home/NotificationStrip.tsx",
                        lineNumber: 17,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/home/NotificationStrip.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/home/NotificationStrip.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/home/NotificationStrip.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = NotificationStrip;
var _c;
__turbopack_context__.k.register(_c, "NotificationStrip");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/lib/s3ImageHelper.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Helper function to get signed S3 URLs for images
 * This is needed because S3 objects with KMS encryption require signed URLs
 */ __turbopack_context__.s([
    "getSignedImageUrl",
    ()=>getSignedImageUrl,
    "getSignedImageUrls",
    ()=>getSignedImageUrls
]);
async function getSignedImageUrl(imageUrl) {
    // If it's not an S3 URL, return as-is
    if (!imageUrl || !imageUrl.includes("s3") && !imageUrl.includes("amazonaws.com")) {
        return imageUrl;
    }
    try {
        // Pass the full URL as-is; the API will extract the S3 object key
        const response = await fetch(`/api/s3-signed-url?key=${encodeURIComponent(imageUrl)}`);
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Failed to get signed URL:", {
                status: response.status,
                statusText: response.statusText,
                error: errorText,
                imageUrl: imageUrl
            });
            return imageUrl; // Fallback to original URL
        }
        const data = await response.json();
        if (data.error) {
            console.error("Signed URL API error:", data.error);
            return imageUrl; // Fallback to original URL
        }
        return data.url || imageUrl;
    } catch (error) {
        console.error("Error getting signed URL:", error);
        return imageUrl; // Fallback to original URL
    }
}
async function getSignedImageUrls(imageUrls) {
    return Promise.all(imageUrls.map((url)=>getSignedImageUrl(url)));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/common/S3Image.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "S3Image",
    ()=>S3Image
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$s3ImageHelper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/lib/s3ImageHelper.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function S3Image({ src, alt, className = "", fallback }) {
    _s();
    const [imageUrl, setImageUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(src);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "S3Image.useEffect": ()=>{
            // Handle empty or invalid src
            if (!src || src.trim() === "") {
                setError(true);
                setLoading(false);
                return;
            }
            // Only get signed URL if it's an S3 URL
            if (src.includes("s3") || src.includes("amazonaws.com")) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$s3ImageHelper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSignedImageUrl"])(src).then({
                    "S3Image.useEffect": (signedUrl)=>{
                        setImageUrl(signedUrl);
                        setLoading(false);
                    }
                }["S3Image.useEffect"]).catch({
                    "S3Image.useEffect": (err)=>{
                        // Fallback to original URL - might work if bucket has public read access
                        setImageUrl(src);
                        setLoading(false);
                    }
                }["S3Image.useEffect"]);
            } else {
                // Not an S3 URL, use as-is
                setImageUrl(src);
                setLoading(false);
            }
        }
    }["S3Image.useEffect"], [
        src
    ]);
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: className,
            children: fallback || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-full flex items-center justify-center text-gray-400 bg-gray-100",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-16 h-16",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/common/S3Image.tsx",
                        lineNumber: 52,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/common/S3Image.tsx",
                    lineNumber: 51,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/common/S3Image.tsx",
                lineNumber: 50,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/common/S3Image.tsx",
            lineNumber: 48,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: imageUrl,
                alt: alt,
                className: className,
                onError: (e)=>{
                    // Silently handle image load errors - don't spam console
                    if ("TURBOPACK compile-time truthy", 1) {
                        console.warn("S3Image: Image failed to load", imageUrl);
                    }
                    setError(true);
                    setErrorMessage("Failed to load image");
                },
                onLoad: ()=>{
                    setLoading(false);
                    setError(false);
                },
                style: {
                    opacity: loading ? 0.5 : 1
                }
            }, void 0, false, {
                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/common/S3Image.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            error && ("TURBOPACK compile-time value", "development") === "development" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs text-red-500 mt-1",
                children: "Image load failed. Check console for details."
            }, void 0, false, {
                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/common/S3Image.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(S3Image, "eQNNZfYxTpcFBgNrInPUon5C5Js=");
_c = S3Image;
var _c;
__turbopack_context__.k.register(_c, "S3Image");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/lib/firebaseClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$layout$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/Footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$layout$2f$CategoryNavigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/layout/CategoryNavigation.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$home$2f$NotificationStrip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/home/NotificationStrip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$common$2f$S3Image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/components/common/S3Image.tsx [app-client] (ecmascript)");
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
;
;
;
function ProductDetailPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const productId = params?.id;
    const [product, setProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [selectedImageIndex, setSelectedImageIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [recommendedProducts, setRecommendedProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [recommendedImages, setRecommendedImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [addingToCart, setAddingToCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [buying, setBuying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [wishlistLoading, setWishlistLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductDetailPage.useEffect": ()=>{
            if (!productId) {
                console.error("No product ID provided");
                setLoading(false);
                return;
            }
            loadProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["ProductDetailPage.useEffect"], [
        productId
    ]);
    const loadProduct = async ()=>{
        try {
            setLoading(true);
            console.log("Loading product with ID:", productId);
            if (!productId || productId.trim() === "") {
                console.error("Invalid product ID:", productId);
                setProduct(null);
                setLoading(false);
                return;
            }
            let productDoc = null;
            // Try 1: Search by Firestore document ID
            try {
                const productDocRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "store_items", productId);
                const docSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(productDocRef);
                if (docSnap.exists()) {
                    productDoc = docSnap;
                    console.log("Product found by document ID");
                }
            } catch (error) {
                console.log("Product not found by document ID, trying itemId field");
            }
            // Try 2: Search by itemId field if document ID didn't work
            if (!productDoc) {
                try {
                    const itemsQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "store_items"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])("itemId", "==", productId));
                    const itemsSnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(itemsQuery);
                    if (!itemsSnapshot.empty) {
                        productDoc = itemsSnapshot.docs[0];
                        console.log("Product found by itemId field");
                    }
                } catch (error) {
                    console.error("Error searching by itemId field:", error);
                }
            }
            // Try 3: Also try searching by old field name item_id
            if (!productDoc) {
                try {
                    const itemsQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "store_items"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])("item_id", "==", productId));
                    const itemsSnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(itemsQuery);
                    if (!itemsSnapshot.empty) {
                        productDoc = itemsSnapshot.docs[0];
                        console.log("Product found by item_id field");
                    }
                } catch (error) {
                    console.error("Error searching by item_id field:", error);
                }
            }
            if (!productDoc || !productDoc.exists()) {
                console.error("Product not found in Firestore:", {
                    productId,
                    collection: "store_items",
                    searchedBy: [
                        "document ID",
                        "itemId field",
                        "item_id field"
                    ]
                });
                setProduct(null);
                setLoading(false);
                return;
            }
            const data = productDoc.data();
            console.log("Product data loaded:", data);
            console.log("Firestore document ID:", productDoc.id);
            // Normalize images - handle both array and single value, and both field names
            let normalizedImages = [];
            if (data.images) {
                normalizedImages = Array.isArray(data.images) ? data.images : [
                    data.images
                ];
            } else if (data.image) {
                normalizedImages = Array.isArray(data.image) ? data.image : [
                    data.image
                ];
            }
            // Normalize pricing
            const basePrice = data.basePrice || data.price || 0;
            const compareAtPrice = data.compareAtPrice || data.compare_at_price || data.discount_price || null;
            const productData = {
                itemId: productDoc.id,
                ...data,
                images: normalizedImages,
                basePrice: basePrice,
                compareAtPrice: compareAtPrice
            };
            setProduct(productData);
            // Load recommended products (products from same category, excluding current product)
            if (productData.categoryId) {
                loadRecommendedProducts(productData.categoryId, productData.itemId);
            }
        } catch (error) {
            console.error("Error loading product:", error);
            setProduct(null);
        } finally{
            setLoading(false);
        }
    };
    const handleAddToCart = async ()=>{
        if (!product) return;
        if (product.trackInventory && product.stockQuantity === 0) return;
        const user = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"].currentUser;
        if (!user) {
            router.push(`/login?redirect=/item/${product.itemId}`);
            return;
        }
        try {
            setAddingToCart(true);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "carts"), {
                userId: user.uid,
                itemId: product.itemId,
                quantity: 1,
                addedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                // Basic denormalized info for easier display
                title: product.title,
                price: product.basePrice,
                image: product.images?.[0] || null,
                type: product.itemType || product.type || "product"
            });
            alert("Added to cart.");
        } catch (error) {
            console.error("Failed to add to cart:", error);
            alert("Failed to add to cart. Please try again.");
        } finally{
            setAddingToCart(false);
        }
    };
    const handleBuyNow = async ()=>{
        if (!product) return;
        if (product.trackInventory && product.stockQuantity === 0) return;
        const user = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"].currentUser;
        if (!user) {
            router.push(`/login?redirect=/item/${product.itemId}`);
            return;
        }
        try {
            setBuying(true);
            // For now, just ensure it's in the cart, then go to a generic checkout/cart page
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "carts"), {
                userId: user.uid,
                itemId: product.itemId,
                quantity: 1,
                addedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                title: product.title,
                price: product.basePrice,
                image: product.images?.[0] || null,
                type: product.itemType || product.type || "product",
                source: "buy_now"
            });
            router.push("/cart");
        } catch (error) {
            console.error("Failed to start checkout:", error);
            alert("Failed to start checkout. Please try again.");
        } finally{
            setBuying(false);
        }
    };
    const handleAddToWishlist = async ()=>{
        if (!product) return;
        const user = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"].currentUser;
        if (!user) {
            router.push(`/login?redirect=/item/${product.itemId}`);
            return;
        }
        try {
            setWishlistLoading(true);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "wishlists"), {
                userId: user.uid,
                itemId: product.itemId,
                type: "product",
                createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
            });
            alert("Product added to your wishlist.");
        } catch (error) {
            console.error("Failed to add to wishlist:", error);
            alert("Failed to add to wishlist. Please try again.");
        } finally{
            setWishlistLoading(false);
        }
    };
    const loadRecommendedProducts = async (categoryId, excludeItemId)=>{
        try {
            // Simple fetch: get all items, then filter/sort in memory to avoid index issues
            const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "store_items"));
            const products = [];
            const imageMap = {};
            snapshot.forEach((doc)=>{
                const data = doc.data();
                // Filter: same category, active status (or missing), and not the current product
                if (doc.id !== excludeItemId && data.categoryId === categoryId && (!data.status || data.status === "active")) {
                    // Normalize images
                    let normalizedImages = [];
                    if (data.images) {
                        normalizedImages = Array.isArray(data.images) ? data.images : [
                            data.images
                        ];
                    } else if (data.image) {
                        normalizedImages = Array.isArray(data.image) ? data.image : [
                            data.image
                        ];
                    }
                    const productItem = {
                        itemId: doc.id,
                        ...data,
                        images: normalizedImages,
                        basePrice: data.basePrice || data.price || 0,
                        compareAtPrice: data.compareAtPrice || data.compare_at_price || data.discount_price || null
                    };
                    products.push(productItem);
                    // Get first image for each product
                    if (normalizedImages.length > 0) {
                        imageMap[productItem.itemId] = normalizedImages[0];
                    }
                }
            });
            // Sort client-side by createdAt desc if present
            products.sort((a, b)=>{
                const dateA = a.createdAt?.toMillis?.() || 0;
                const dateB = b.createdAt?.toMillis?.() || 0;
                return dateB - dateA;
            });
            // Limit to 4 products
            const limitedProducts = products.slice(0, 4);
            setRecommendedProducts(limitedProducts);
            setRecommendedImages(imageMap);
        } catch (error) {
            console.error("Error loading recommended products:", error);
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {}, void 0, false, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                    lineNumber: 302,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$home$2f$NotificationStrip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NotificationStrip"], {}, void 0, false, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                    lineNumber: 303,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$layout$2f$CategoryNavigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CategoryNavigation"], {}, void 0, false, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                    lineNumber: 304,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4 py-20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                lineNumber: 307,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-gray-600",
                                children: "Loading product..."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                lineNumber: 308,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                        lineNumber: 306,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                    lineNumber: 305,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$layout$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                    lineNumber: 311,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
            lineNumber: 301,
            columnNumber: 7
        }, this);
    }
    if (!product) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {}, void 0, false, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                    lineNumber: 319,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$home$2f$NotificationStrip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NotificationStrip"], {}, void 0, false, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                    lineNumber: 320,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$layout$2f$CategoryNavigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CategoryNavigation"], {}, void 0, false, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                    lineNumber: 321,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4 py-20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl font-bold text-gray-900 mb-4",
                                children: "Product Not Found"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                lineNumber: 324,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 mb-2",
                                children: "The product you're looking for doesn't exist."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                lineNumber: 325,
                                columnNumber: 13
                            }, this),
                            productId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 mb-8",
                                children: [
                                    "Product ID: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "bg-gray-200 px-2 py-1 rounded",
                                        children: productId
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                        lineNumber: 328,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                lineNumber: 327,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/",
                                        className: "px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
                                        children: "Go Back Home"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                        lineNumber: 332,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>router.back(),
                                        className: "px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors",
                                        children: "Go Back"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                        lineNumber: 338,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                lineNumber: 331,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                        lineNumber: 323,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                    lineNumber: 322,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$layout$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                    lineNumber: 347,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
            lineNumber: 318,
            columnNumber: 7
        }, this);
    }
    const images = product.images || [];
    const mainImage = images[selectedImageIndex] || images[0] || "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {}, void 0, false, {
                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                lineNumber: 357,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$home$2f$NotificationStrip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NotificationStrip"], {}, void 0, false, {
                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                lineNumber: 358,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$layout$2f$CategoryNavigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CategoryNavigation"], {}, void 0, false, {
                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                lineNumber: 359,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "container mx-auto px-4 py-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "mb-6 text-sm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                            className: "flex items-center space-x-2 text-gray-600",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/",
                                        className: "hover:text-blue-600",
                                        children: "Home"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                        lineNumber: 365,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                    lineNumber: 365,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "/"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                    lineNumber: 366,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/",
                                        className: "hover:text-blue-600",
                                        children: "Products"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                        lineNumber: 367,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                    lineNumber: 367,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "/"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                    lineNumber: 368,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "text-gray-900",
                                    children: product.title
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                    lineNumber: 369,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                            lineNumber: 364,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                        lineNumber: 363,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "aspect-square bg-gray-100 rounded-lg overflow-hidden",
                                        children: mainImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$common$2f$S3Image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S3Image"], {
                                            src: mainImage,
                                            alt: product.title,
                                            className: "w-full h-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                            lineNumber: 379,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full h-full flex items-center justify-center text-gray-400",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-24 h-24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                    lineNumber: 387,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                lineNumber: 386,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                            lineNumber: 385,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                        lineNumber: 377,
                                        columnNumber: 13
                                    }, this),
                                    images.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-4 gap-2",
                                        children: images.map((img, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setSelectedImageIndex(index),
                                                className: `aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImageIndex === index ? "border-blue-600 ring-2 ring-blue-200" : "border-gray-200 hover:border-gray-300"}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$common$2f$S3Image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S3Image"], {
                                                    src: img,
                                                    alt: `${product.title} ${index + 1}`,
                                                    className: "w-full h-full object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                    lineNumber: 406,
                                                    columnNumber: 21
                                                }, this)
                                            }, index, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                lineNumber: 397,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                        lineNumber: 395,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                lineNumber: 375,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    product.itemType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full uppercase font-semibold",
                                        children: product.itemType.replace("_", " ")
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                        lineNumber: 421,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-3xl md:text-4xl font-bold text-gray-900",
                                        children: product.title
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                        lineNumber: 427,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2 py-4 border-y border-gray-200",
                                        children: [
                                            product.compareAtPrice && product.compareAtPrice > product.basePrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-2xl text-gray-500 line-through",
                                                        children: [
                                                            "₹",
                                                            product.compareAtPrice.toLocaleString()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                        lineNumber: 435,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm bg-red-100 text-red-600 font-semibold px-2 py-1 rounded",
                                                        children: [
                                                            Math.round((product.compareAtPrice - product.basePrice) / product.compareAtPrice * 100),
                                                            "% OFF"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                        lineNumber: 438,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                lineNumber: 434,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-4xl font-bold text-blue-600",
                                                children: [
                                                    "₹",
                                                    product.basePrice.toLocaleString()
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                lineNumber: 443,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                        lineNumber: 432,
                                        columnNumber: 13
                                    }, this),
                                    product.shortDescription && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg text-gray-600",
                                        children: product.shortDescription
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                        lineNumber: 450,
                                        columnNumber: 15
                                    }, this),
                                    product.trackInventory && product.stockQuantity !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: product.stockQuantity > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-3 h-3 bg-green-500 rounded-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                    lineNumber: 458,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-green-600 font-semibold",
                                                    children: [
                                                        product.stockQuantity,
                                                        " in stock"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                    lineNumber: 459,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-3 h-3 bg-red-500 rounded-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                    lineNumber: 465,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-600 font-semibold",
                                                    children: "Out of stock"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                    lineNumber: 466,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                        lineNumber: 455,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 pt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: handleAddToCart,
                                                        disabled: addingToCart || product.trackInventory && product.stockQuantity === 0,
                                                        className: `flex-1 py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${product.trackInventory && product.stockQuantity === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`,
                                                        children: product.trackInventory && product.stockQuantity === 0 ? "Out of Stock" : addingToCart ? "Adding..." : "Add to Cart"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                        lineNumber: 475,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: handleAddToWishlist,
                                                        className: "px-4 py-4 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors",
                                                        title: "Add to Wishlist",
                                                        disabled: wishlistLoading,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-6 h-6 text-gray-600",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                                lineNumber: 499,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                            lineNumber: 498,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                        lineNumber: 491,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                lineNumber: 474,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: handleBuyNow,
                                                disabled: buying || product.trackInventory && product.stockQuantity === 0,
                                                className: "w-full py-4 px-6 rounded-lg font-semibold text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
                                                children: product.trackInventory && product.stockQuantity === 0 ? "Out of Stock" : buying ? "Processing..." : "Buy Now"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                lineNumber: 503,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                        lineNumber: 473,
                                        columnNumber: 13
                                    }, this),
                                    product.fullDescription && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-6 border-t",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-xl font-bold text-gray-900 mb-3",
                                                children: "Description"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                lineNumber: 520,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-gray-700 whitespace-pre-wrap leading-relaxed",
                                                children: product.fullDescription
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                lineNumber: 521,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                        lineNumber: 519,
                                        columnNumber: 15
                                    }, this),
                                    (product.material || product.dimensions || product.warranty) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-6 border-t space-y-2",
                                        children: [
                                            product.material && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-gray-700 w-32",
                                                        children: "Material:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                        lineNumber: 532,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-600",
                                                        children: product.material
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                        lineNumber: 533,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                lineNumber: 531,
                                                columnNumber: 19
                                            }, this),
                                            product.dimensions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-gray-700 w-32",
                                                        children: "Dimensions:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                        lineNumber: 538,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-600",
                                                        children: product.dimensions
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                        lineNumber: 539,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                lineNumber: 537,
                                                columnNumber: 19
                                            }, this),
                                            product.warranty && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-gray-700 w-32",
                                                        children: "Warranty:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                        lineNumber: 544,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-600",
                                                        children: product.warranty
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                        lineNumber: 545,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                lineNumber: 543,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                        lineNumber: 529,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                lineNumber: 418,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                        lineNumber: 373,
                        columnNumber: 9
                    }, this),
                    recommendedProducts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mt-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl md:text-3xl font-bold text-gray-900 mb-6",
                                children: "Recommended for You"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                lineNumber: 556,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
                                children: recommendedProducts.map((recProduct)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/item/${recProduct.itemId}`,
                                        className: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "aspect-square bg-gray-200 relative overflow-hidden",
                                                children: recommendedImages[recProduct.itemId] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$common$2f$S3Image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S3Image"], {
                                                    src: recommendedImages[recProduct.itemId],
                                                    alt: recProduct.title,
                                                    className: "w-full h-full object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                    lineNumber: 567,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-full h-full flex items-center justify-center text-gray-400",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-16 h-16",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                            lineNumber: 575,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                        lineNumber: 574,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                    lineNumber: 573,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                lineNumber: 565,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-semibold text-lg text-gray-900 mb-2 line-clamp-2",
                                                        children: recProduct.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                        lineNumber: 583,
                                                        columnNumber: 21
                                                    }, this),
                                                    recProduct.shortDescription && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-600 mb-3 line-clamp-2",
                                                        children: recProduct.shortDescription
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                        lineNumber: 587,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            recProduct.compareAtPrice && recProduct.compareAtPrice > recProduct.basePrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm text-gray-500 line-through mr-2",
                                                                children: [
                                                                    "₹",
                                                                    recProduct.compareAtPrice.toLocaleString()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                                lineNumber: 593,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xl font-bold text-blue-600",
                                                                children: [
                                                                    "₹",
                                                                    recProduct.basePrice.toLocaleString()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                                lineNumber: 597,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                        lineNumber: 591,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                                lineNumber: 582,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, recProduct.itemId, true, {
                                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                        lineNumber: 559,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                                lineNumber: 557,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                        lineNumber: 555,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                lineNumber: 361,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$src$2f$components$2f$layout$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
                lineNumber: 609,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Telegram Desktop/LMS+Ecommerce/web/src/app/item/[id]/page.tsx",
        lineNumber: 356,
        columnNumber: 5
    }, this);
}
_s(ProductDetailPage, "LCuPEa32HC3X/0d4Swef43zelvw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Telegram__Desktop$2f$LMS$2b$Ecommerce$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ProductDetailPage;
var _c;
__turbopack_context__.k.register(_c, "ProductDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_Telegram%20Desktop_LMS%2BEcommerce_web_src_49d3df6d._.js.map