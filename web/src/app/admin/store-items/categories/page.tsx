"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, deleteDoc, query, orderBy } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import type { Category } from "@/types/store";

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
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
      loadCategories();
    });
    return () => unsubscribe();
  }, [router]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "categories"), orderBy("orderIndex", "asc"));
      const snapshot = await getDocs(q);
      const categoriesData: Category[] = [];
      snapshot.forEach((doc) => {
        categoriesData.push({ categoryId: doc.id, ...doc.data() } as Category);
      });
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteDoc(doc(db, "categories", categoryId));
      loadCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category");
    }
  };

  const getParentName = (parentId: string | null) => {
    if (!parentId) return "—";
    const parent = categories.find(c => c.categoryId === parentId);
    return parent?.name || "Unknown";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-600 mt-2">Manage product categories and organization</p>
          </div>
          <button
            onClick={() => router.push("/admin/store-items/categories/new")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Add Category
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No categories found</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.categoryId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{category.slug}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {getParentName(category.parentCategoryId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.orderIndex}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          category.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {category.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => router.push(`/admin/store-items/categories/${category.categoryId}`)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.categoryId)}
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

