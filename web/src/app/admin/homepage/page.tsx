"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";

type HomepageSection = {
  id: string;
  section_name: string;
  enabled: boolean;
  priority: number;
  config: any;
};

export default function HomepageManagementPage() {
  const router = useRouter();
  const [sections, setSections] = useState<HomepageSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      const userRef = doc(db, "users", user.uid);
      const userSnap = await (await import("firebase/firestore")).getDoc(userRef);
      const userData = userSnap.data();
      if (userData?.role !== "super_admin" && userData?.role !== "admin") {
        router.push("/dashboard");
        return;
      }
      loadSections();
    });
    return () => unsubscribe();
  }, [router]);

  const loadSections = async () => {
    try {
      setLoading(true);
      // For now, we'll use a predefined list. Later this can come from Firestore
      const defaultSections: HomepageSection[] = [
        { id: "hero", section_name: "Hero Banner", enabled: true, priority: 1, config: {} },
        { id: "promo", section_name: "Promotional Cards", enabled: true, priority: 2, config: {} },
        { id: "live_strip", section_name: "Live Classes Strip", enabled: true, priority: 3, config: {} },
        { id: "categories", section_name: "Product Categories", enabled: true, priority: 4, config: {} },
        { id: "new_arrivals", section_name: "New Arrivals", enabled: true, priority: 5, config: {} },
        { id: "best_sellers", section_name: "Best Sellers", enabled: true, priority: 6, config: {} },
        { id: "offers", section_name: "Offers & Promotions", enabled: true, priority: 7, config: {} },
        { id: "bundles", section_name: "Product Bundles", enabled: true, priority: 8, config: {} },
        { id: "recommended", section_name: "Recommended Products", enabled: true, priority: 9, config: {} },
        { id: "location", section_name: "Location-Based Products", enabled: true, priority: 10, config: {} },
        { id: "testimonials", section_name: "Testimonials", enabled: true, priority: 11, config: {} },
        { id: "newsletter", section_name: "Newsletter Subscription", enabled: true, priority: 12, config: {} },
      ];
      setSections(defaultSections);
    } catch (error) {
      console.error("Error loading sections:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = async (sectionId: string, enabled: boolean) => {
    // TODO: Save to Firestore homepage_config collection
    setSections(sections.map(s => s.id === sectionId ? { ...s, enabled } : s));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Homepage Content Management</h1>
          <p className="text-gray-600 mt-2">Manage hero banners, featured products, and homepage sections</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Homepage Sections</h2>
          <p className="text-sm text-gray-600 mb-6">
            Enable or disable sections. Sections are auto-managed based on your store items.
          </p>

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="space-y-3">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{section.section_name}</h3>
                    <p className="text-sm text-gray-500">Priority: {section.priority}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={section.enabled}
                      onChange={(e) => toggleSection(section.id, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Hero Banner Management</h3>
            <p className="text-sm text-gray-600 mb-4">
              Create and manage hero banners for the landing page. You can customize content, CTAs, images, and styling.
            </p>
            <button
              onClick={() => router.push("/admin/homepage/hero")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Manage Hero Banners
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
