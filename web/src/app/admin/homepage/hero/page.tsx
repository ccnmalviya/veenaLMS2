"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, where, orderBy, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import type { HeroBanner } from "@/types/heroBanner";

export default function HeroBannersListPage() {
  const router = useRouter();
  const [heroBanners, setHeroBanners] = useState<HeroBanner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHeroBanners();
  }, []);

  const loadHeroBanners = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, "hero_banners"),
        orderBy("displayOrder", "asc")
      );
      const snapshot = await getDocs(q);
      const banners: HeroBanner[] = [];
      snapshot.forEach((doc) => {
        banners.push({ heroId: doc.id, ...doc.data() } as HeroBanner);
      });
      setHeroBanners(banners);
    } catch (error) {
      console.error("Error loading hero banners:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (heroId: string) => {
    if (!confirm("Are you sure you want to delete this hero banner?")) {
      return;
    }
    try {
      await deleteDoc(doc(db, "hero_banners", heroId));
      loadHeroBanners();
    } catch (error) {
      console.error("Error deleting hero banner:", error);
      alert("Failed to delete hero banner");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hero Banners</h1>
              <p className="text-gray-600 mt-2">Manage hero banners for the landing page</p>
            </div>
            <button
              onClick={() => router.push("/admin/homepage/hero/new")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + Create Hero Banner
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : heroBanners.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 mb-4">No hero banners found</p>
            <button
              onClick={() => router.push("/admin/homepage/hero/new")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Your First Hero Banner
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name / ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Heading
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enabled
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {heroBanners.map((banner) => (
                  <tr key={banner.heroId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{banner.heroName}</div>
                      <div className="text-sm text-gray-500">{banner.heroId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{banner.mainHeading}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {banner.displayOrder}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          banner.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {banner.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          banner.enabled
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {banner.enabled ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => router.push(`/admin/homepage/hero/${banner.heroId}/edit`)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(banner.heroId)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
