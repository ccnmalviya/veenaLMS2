"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import {
  LayoutDashboard,
  ShoppingBag,
  Home,
  BookOpen,
  Video,
  Calendar,
  Package,
  FileText,
  Award,
  BarChart3,
  Users,
  Menu,
  Search,
  Bell,
  Moon,
  User,
  ChevronDown,
  ChevronRight,
  Settings,
  ArrowLeft,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  // Persist sidebar state in localStorage
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("adminSidebarOpen");
      return saved !== null ? saved === "true" : true;
    }
    return true;
  });
  const [user, setUser] = useState<any>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(9);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("adminSidebarOpen", sidebarOpen.toString());
    }
  }, [sidebarOpen]);

  // Keep Products submenu open when on store-items pages
  // Keep Courses submenu open when on courses pages
  useEffect(() => {
    if (pathname?.startsWith("/admin/store-items")) {
      setOpenSubmenu("products");
    } else if (pathname?.startsWith("/admin/courses")) {
      setOpenSubmenu("courses");
    }
  }, [pathname]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/login");
        return;
      }
      const userRef = doc(db, "users", firebaseUser.uid);
      const snap = await getDoc(userRef);
      const userData = snap.data();
      if (!userData || (userData.role !== "super_admin" && userData.role !== "admin")) {
        router.push("/dashboard");
        return;
      }
      setUser({ ...userData, email: firebaseUser.email });
    });
    return () => unsubscribe();
  }, [router]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (userMenuOpen && !target.closest(".user-menu-container")) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const menuItems = [
    {
      title: "MENU",
      items: [
        { icon: LayoutDashboard, label: "Dashboards", path: "/admin", badge: "01" },
      ],
    },
    {
      title: "CUSTOM",
      items: [
        { 
          icon: ShoppingBag, 
          label: "Products", 
          path: "/admin/store-items", 
          submenu: true,
          submenuItems: [
            { label: "Items", path: "/admin/store-items" },
            { label: "Categories", path: "/admin/store-items/categories" },
            { label: "Brands", path: "/admin/store-items/brands" },
          ]
        },
        { icon: Home, label: "Homepage", path: "/admin/homepage", submenu: true },
        { 
          icon: Settings, 
          label: "Layouts", 
          path: "/admin/layouts", 
          badge: "New", 
          submenu: true,
          submenuItems: [
            { label: "Orange Cards", path: "/admin/layouts#offers" },
            { label: "Homepage Testimonials", path: "/admin/layouts#testimonials" },
            { label: "Classes Video Testimonials", path: "/admin/layouts#classes-testimonials" },
          ]
        },
        { icon: Settings, label: "Site Settings", path: "/admin/settings", badge: "NEW" },
      ],
    },
    {
      title: "COMPONENTS",
      items: [
        { 
          icon: BookOpen, 
          label: "Courses", 
          path: "/admin/courses", 
          submenu: true,
          submenuItems: [
            { label: "All Courses", path: "/admin/courses" },
            { label: "Categories", path: "/admin/courses/categories" },
          ]
        },
        { icon: Video, label: "Live Classes", path: "/admin/live-classes", submenu: true },
        { icon: Calendar, label: "Workshops", path: "/admin/workshops", submenu: true },
        { icon: Package, label: "Orders", path: "/admin/orders", submenu: true },
        { icon: Award, label: "Certificates", path: "/admin/certificates", submenu: true },
        { icon: Users, label: "Users", path: "/admin/users", submenu: true },
        { icon: User, label: "Staff", path: "/admin/staff", submenu: true },
      ],
    },
  ];

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + "/");
  
  const toggleSubmenu = (menuKey: string) => {
    setOpenSubmenu(openSubmenu === menuKey ? null : menuKey);
  };

  // Get breadcrumb path from pathname
  const getBreadcrumbs = () => {
    const breadcrumbs: Array<{ label: string; path: string }> = [
      { label: "Lunoz", path: "/admin" },
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
    
    pathParts.forEach((part, index) => {
      currentPath += `/${part}`;
      
      // Format the label
      let label = part
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      
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
      
      breadcrumbs.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Fixed */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gray-900 text-white transition-all duration-300 flex flex-col fixed left-0 top-0 bottom-0 z-40`}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between">
          <h1 className={`font-bold text-xl ${!sidebarOpen && "hidden"}`}>LUNOZ</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 pb-4">
          {menuItems.map((section, sectionIdx) => (
            <div key={sectionIdx} className="mb-6">
              <h2 className={`text-xs font-semibold text-gray-400 uppercase mb-3 ${!sidebarOpen && "hidden"}`}>
                {section.title}
              </h2>
              {section.items.map((item, itemIdx) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                const menuKey = item.label.toLowerCase().replace(/\s+/g, "-");
                const isSubmenuOpen = openSubmenu === menuKey;
                const hasSubmenu = "submenu" in item && item.submenu && "submenuItems" in item && item.submenuItems;
                
                return (
                  <div key={itemIdx}>
                    <button
                      onClick={() => hasSubmenu ? toggleSubmenu(menuKey) : router.push(item.path)}
                      className={`w-full flex items-center justify-between px-4 py-3 mb-2 rounded-lg transition-colors ${
                        active
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        {sidebarOpen && <span className="text-sm">{item.label}</span>}
                      </div>
                      {sidebarOpen && (
                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              active ? "bg-blue-700" : "bg-blue-600"
                            }`}>
                              {item.badge}
                            </span>
                          )}
                          {hasSubmenu && (
                            <ChevronRight className={`w-4 h-4 transition-transform ${isSubmenuOpen ? "rotate-90" : ""}`} />
                          )}
                        </div>
                      )}
                    </button>
                    {hasSubmenu && isSubmenuOpen && sidebarOpen && (
                      <div className="ml-4 mb-2 space-y-1">
                        {item.submenuItems!.map((subItem, subIdx) => {
                          const isSubActive = pathname === subItem.path || pathname?.startsWith(subItem.path + "/");
                          return (
                            <Link
                              key={subIdx}
                              href={subItem.path}
                              className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                                isSubActive
                                  ? "bg-blue-700 text-white"
                                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content - Offset by sidebar width */}
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Header - Fixed */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {(() => {
                const breadcrumbs = getBreadcrumbs();
                return breadcrumbs.map((crumb, index) => (
                  <div key={crumb.path} className="flex items-center gap-2">
                    {index > 0 && <span className="text-gray-400">/</span>}
                    {index === breadcrumbs.length - 1 ? (
                      <span className="text-sm font-medium text-gray-900">{crumb.label}</span>
                    ) : (
                      <Link
                        href={crumb.path}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </div>
                ));
              })()}
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5 text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Moon className="w-5 h-5 text-gray-600" />
              </button>
              <div className="relative user-menu-container">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  {user?.name && (
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  )}
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      href="/admin/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/admin/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

