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
  const [allCourses, setAllCourses] = useState<SearchItem[]>([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [shopEnabled, setShopEnabled] = useState(false);

  // Always search courses only
  const searchPlaceholder = "Search courses";

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

  // Load courses for search suggestions
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const snapshot = await getDocs(collection(db, "courses"));
        const courses: SearchItem[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as any;
          // Only include published courses
          if (data.status === "published") {
            const title = (data.title || "").toString();
            if (!title) return;
            courses.push({
              id: doc.id,
              title,
              type: "course",
            });
          }
        });
        setAllCourses(courses);
      } catch (error) {
        console.error("Error loading courses for search:", error);
      }
    };
    loadCourses();
  }, []);

  const filteredSuggestions = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return [];
    return allCourses
      .filter((course) => course.title.toLowerCase().includes(term))
      .slice(0, 7);
  }, [allCourses, search]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = search.trim().toLowerCase();
    if (!term) return;

    // Find exact or closest match
    const exactMatch = allCourses.find((course) => 
      course.title.toLowerCase() === term
    );
    
    if (exactMatch) {
      // Direct navigate to course
      router.push(`/courses/${exactMatch.id}`);
      setSuggestionsOpen(false);
      setSearch("");
    } else {
      // Find best match
      const bestMatch = allCourses.find((course) =>
        course.title.toLowerCase().includes(term)
      );
      
      if (bestMatch) {
        router.push(`/courses/${bestMatch.id}`);
        setSuggestionsOpen(false);
        setSearch("");
      } else {
        // No match found, go to classes page with search
        router.push(`/classes?search=${encodeURIComponent(term)}`);
        setSuggestionsOpen(false);
      }
    }
  };

  const handleSuggestionClick = (course: SearchItem) => {
    setSuggestionsOpen(false);
    setSearch("");
    // Go directly to course page
    router.push(`/courses/${course.id}`);
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
          {/* Logo - goes to classes if shop is disabled */}
          <Link 
            href={shopEnabled ? "/" : "/classes"} 
            className="text-xl md:text-2xl font-bold text-gray-900"
          >
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
                    {filteredSuggestions.map((course) => (
                      <li key={course.id}>
                        <button
                          type="button"
                          onClick={() => handleSuggestionClick(course)}
                          className="flex w-full items-center gap-3 px-4 py-3 hover:bg-blue-50 transition"
                        >
                          <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                          </svg>
                          <span className="truncate text-left text-gray-800 font-medium">
                            {course.title}
                          </span>
                          <span className="ml-auto text-xs text-blue-600 flex-shrink-0">
                            View →
                          </span>
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

          {/* Wishlist icon */}
          <Link
            href="/wishlist"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100"
            title="Wishlist"
          >
            <span className="text-lg">❤️</span>
          </Link>

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
                  {filteredSuggestions.map((course) => (
                    <li key={course.id}>
                      <button
                        type="button"
                        onClick={() => handleSuggestionClick(course)}
                        className="flex w-full items-center gap-3 px-4 py-3 hover:bg-blue-50 transition"
                      >
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                        <span className="truncate text-left text-gray-800 font-medium">
                          {course.title}
                        </span>
                        <span className="ml-auto text-xs text-blue-600 flex-shrink-0">
                          View →
                        </span>
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

