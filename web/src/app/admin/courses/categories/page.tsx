"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { S3Image } from "@/components/common/S3Image";

type CourseCategory = {
  categoryId: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  orderIndex: number;
  status: "active" | "inactive";
  courseCount?: number;
};

export default function CourseCategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CourseCategory[]>([]);
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
      
      // Get all categories
      const categoriesSnapshot = await getDocs(collection(db, "categories"));
      const allCategories: CourseCategory[] = [];
      
      categoriesSnapshot.forEach((doc) => {
        const data = doc.data();
        allCategories.push({
          categoryId: doc.id,
          name: data.name || "",
          slug: data.slug || "",
          image: data.image || "",
          description: data.description || "",
          orderIndex: data.orderIndex || 0,
          status: data.status || "active",
          courseCount: 0,
        } as CourseCategory);
      });
      
      // Get all courses to count how many courses use each category
      const coursesSnapshot = await getDocs(collection(db, "courses"));
      const categoryCounts: Record<string, number> = {};
      
      coursesSnapshot.forEach((courseDoc) => {
        const courseData = courseDoc.data();
        if (courseData.status === "published") {
          const courseCategoryId = courseData.categoryId || (courseData as any).category_id || "";
          const courseCategoryName = (courseData.category || "").toLowerCase();
          
          if (courseCategoryId) {
            categoryCounts[courseCategoryId] = (categoryCounts[courseCategoryId] || 0) + 1;
          }
          
          // Also count by name match
          allCategories.forEach(cat => {
            if (cat.name.toLowerCase() === courseCategoryName) {
              categoryCounts[cat.categoryId] = (categoryCounts[cat.categoryId] || 0) + 1;
            }
          });
        }
      });
      
      // Update course counts
      allCategories.forEach(cat => {
        cat.courseCount = categoryCounts[cat.categoryId] || 0;
      });
      
      // Filter to only show categories that have courses OR are active (so admins can add new ones)
      const courseCategories = allCategories.filter(cat => 
        (cat.courseCount && cat.courseCount > 0) || cat.status === "active"
      );
      
      // Sort by orderIndex, then by name
      courseCategories.sort((a, b) => {
        if (a.orderIndex !== b.orderIndex) return a.orderIndex - b.orderIndex;
        return a.name.localeCompare(b.name);
      });
      
      setCategories(courseCategories);
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId: string) => {
    if (!confirm("Are you sure you want to delete this category? This will affect all courses using this category.")) return;
    try {
      await deleteDoc(doc(db, "categories", categoryId));
      loadCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Course Categories</h1>
            <p className="text-gray-600 mt-2">Manage categories for courses and classes</p>
          </div>
          <button
            onClick={() => router.push("/admin/courses/categories/new")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Add Category
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No categories found. <button
              onClick={() => router.push("/admin/courses/categories/new")}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Create your first category
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.categoryId}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition"
              >
                <div className="h-40 bg-gray-100 relative overflow-hidden">
                  {category.image ? (
                    <S3Image
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                      <span className="text-4xl font-bold text-gray-400">
                        {category.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                  {category.description && (
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{category.description}</p>
                  )}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-500">
                      {category.courseCount || 0} course{category.courseCount !== 1 ? "s" : ""}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        category.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {category.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/admin/courses/categories/${category.categoryId}/edit`)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.categoryId)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
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

