"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth, db } from "@/lib/firebaseClient";
import { collection, getDocs, doc, getDoc, onSnapshot } from "firebase/firestore";
import type { SiteSettings } from "@/types/siteSettings";

type SearchItem = {
  id: string;
  title: string;
  type?: string;
};

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [allItems, setAllItems] = useState<SearchItem[]>([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [shopEnabled, setShopEnabled] = useState(false);

  // Decide what we are searching based on current page
  const isClassesPage = pathname?.startsWith("/classes");
  const searchPlaceholder = isClassesPage
    ? "Search courses"
    : "Search products";

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Listen to site settings in real-time
  useEffect(() => {
    const settingsRef = doc(db, "site_settings", "global");
    
    const unsubscribe = onSnapshot(settingsRef, (snapshot) => {
      if (snapshot.exists()) {
        const settings = snapshot.data() as SiteSettings;
        setShopEnabled(settings.shopEnabled || false);
      } else {
        // Default to false if settings don't exist
        setShopEnabled(false);
      }
    }, (error) => {
      console.error("Error listening to site settings:", error);
      setShopEnabled(false);
    });

    return () => unsubscribe();
  }, []);

  // Load a lightweight list of products once for search suggestions
  useEffect(() => {
    const loadItems = async () => {
      try {
        const snapshot = await getDocs(collection(db, "store_items"));
        const items: SearchItem[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as any;
          const title = (data.title || data.name || "").toString();
          if (!title) return;
          items.push({
            id: doc.id,
            title,
            type: data.type || data.itemType,
          });
        });
        setAllItems(items);
      } catch (error) {
        console.error("Error loading items for search suggestions:", error);
      }
    };
    loadItems();
  }, []);

  const filteredSuggestions = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return [];
    return allItems
      .filter((item) => item.title.toLowerCase().includes(term))
      .slice(0, 7);
  }, [allItems, search]);

  const handleSearchSubmit = (e: React.FormEvent) => {
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

  const handleSuggestionClick = (item: SearchItem) => {
    setSuggestionsOpen(false);
    setSearch(item.title);
    // Go directly to product detail for a more "Google result" feel
    router.push(`/item/${item.id}`);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setShowUserMenu(false);
    router.push("/");
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="text-xl md:text-2xl font-bold text-gray-900">
            Veena LMS
          </Link>

          {/* Center search bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-xl mx-4"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSuggestionsOpen(true);
                }}
                placeholder={searchPlaceholder}
                className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-4 rounded-full bg-black text-white text-xs font-semibold hover:bg-gray-900"
              >
                Search
              </button>

              {/* Desktop suggestions dropdown */}
              {suggestionsOpen && filteredSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 rounded-2xl border border-gray-200 bg-white shadow-lg z-40">
                  <ul className="max-h-72 overflow-y-auto py-1 text-sm">
                    {filteredSuggestions.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => handleSuggestionClick(item)}
                          className="flex w-full items-center justify-between px-3 py-2 hover:bg-gray-50"
                        >
                          <span className="truncate text-left text-gray-800">
                            {item.title}
                          </span>
                          {item.type && (
                            <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] uppercase tracking-wide text-gray-500">
                              {item.type}
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </form>

          {/* Right side: nav + icons */}
          <div className="flex items-center gap-4">
            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-4">
              {shopEnabled && (
                <Link
                  href="/"
                  className={`text-sm font-medium ${
                    pathname === "/"
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Shop
                </Link>
              )}
              <Link
                href="/classes"
                className={`text-sm font-medium ${
                  pathname?.startsWith("/classes")
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Classes
              </Link>
            </nav>

          {/* Cart icon - only show if shop is enabled */}
          {shopEnabled && (
            <Link
              href="/cart"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100"
            >
              <span className="text-lg">🛒</span>
            </Link>
          )}

            {/* User section */}
            {!user ? (
              <Link
                href="/login"
                className="flex items-center h-9 px-3 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <span className="mr-2 text-base">👤</span>
                <span>Login / Sign up</span>
              </Link>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowUserMenu((v) => !v)}
                  className="flex items-center h-9 px-3 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <span className="mr-2 text-base">👤</span>
                  <span className="max-w-[120px] truncate">
                    {user.displayName || user.email || "Account"}
                  </span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white shadow-lg text-sm">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Orders
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile search bar */}
        <form onSubmit={handleSearchSubmit} className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSuggestionsOpen(true);
              }}
              placeholder={searchPlaceholder}
              className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-4 rounded-full bg-black text-white text-xs font-semibold hover:bg-gray-900"
            >
              Go
            </button>

            {/* Mobile suggestions dropdown */}
            {suggestionsOpen && filteredSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 rounded-2xl border border-gray-200 bg-white shadow-lg z-40">
                <ul className="max-h-72 overflow-y-auto py-1 text-sm">
                  {filteredSuggestions.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => handleSuggestionClick(item)}
                        className="flex w-full items-center justify-between px-3 py-2 hover:bg-gray-50"
                      >
                        <span className="truncate text-left text-gray-800">
                          {item.title}
                        </span>
                        {item.type && (
                          <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] uppercase tracking-wide text-gray-500">
                            {item.type}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </form>
      </div>
    </header>
  );
}

