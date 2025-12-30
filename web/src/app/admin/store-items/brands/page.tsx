"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, deleteDoc, query, orderBy } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import type { Brand } from "@/types/store";

export default function BrandsPage() {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
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
      loadBrands();
    });
    return () => unsubscribe();
  }, [router]);

  const loadBrands = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "brands"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const brandsData: Brand[] = [];
      snapshot.forEach((doc) => {
        brandsData.push({ brandId: doc.id, ...doc.data() } as Brand);
      });
      setBrands(brandsData);
    } catch (error) {
      console.error("Error loading brands:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (brandId: string) => {
    if (!confirm("Are you sure you want to delete this brand?")) return;
    try {
      await deleteDoc(doc(db, "brands", brandId));
      loadBrands();
    } catch (error) {
      console.error("Error deleting brand:", error);
      alert("Failed to delete brand");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Brands</h1>
            <p className="text-gray-600 mt-2">Manage product brands</p>
          </div>
          <button
            onClick={() => router.push("/admin/store-items/brands/new")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Add Brand
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : brands.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No brands found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <div key={brand.brandId} className="bg-white rounded-lg shadow p-6">
                {brand.logo && (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-20 h-20 object-contain mb-4 mx-auto"
                  />
                )}
                <h3 className="text-lg font-semibold mb-2">{brand.name}</h3>
                {brand.description && (
                  <p className="text-sm text-gray-600 mb-2">{brand.description}</p>
                )}
                {brand.websiteUrl && (
                  <a
                    href={brand.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {brand.websiteUrl}
                  </a>
                )}
                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      brand.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {brand.status}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/admin/store-items/brands/${brand.brandId}`)}
                      className="text-blue-600 hover:text-blue-900 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(brand.brandId)}
                      className="text-red-600 hover:text-red-900 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

