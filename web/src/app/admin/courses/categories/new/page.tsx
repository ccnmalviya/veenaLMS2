"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, getDocs, serverTimestamp, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { FileUpload } from "@/components/admin/FileUpload";

export default function NewCourseCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: "",
    description: "",
    orderIndex: 0,
    status: "active" as "active" | "inactive",
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const checkSlugUnique = async (slug: string): Promise<boolean> => {
    const q = query(collection(db, "categories"), where("slug", "==", slug));
    const snapshot = await getDocs(q);
    return snapshot.empty;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Generate slug if not provided
      let finalSlug = formData.slug || generateSlug(formData.name);
      
      // Ensure slug is unique
      let slugCounter = 1;
      let uniqueSlug = finalSlug;
      while (!(await checkSlugUnique(uniqueSlug))) {
        uniqueSlug = `${finalSlug}-${slugCounter}`;
        slugCounter++;
      }

      await addDoc(collection(db, "categories"), {
        name: formData.name,
        slug: uniqueSlug,
        image: formData.image || null,
        description: formData.description || null,
        orderIndex: formData.orderIndex,
        status: formData.status,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      router.push("/admin/courses/categories");
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Failed to create category");
    } finally {
      setLoading(false);
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
            ← Back to Categories
          </button>
          <h1 className="text-3xl font-bold text-gray-900">New Course Category</h1>
          <p className="text-gray-600 mt-2">Create a new category for courses</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (!formData.slug) {
                  setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="e.g., Programming, Design, Marketing"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: generateSlug(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="e.g., programming, design, marketing"
            />
            <p className="text-xs text-gray-500 mt-1">
              Auto-generated from name, but can be edited
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image (Optional)</label>
            <FileUpload
              accept="image/*"
              folder="categories/images"
              currentValue={formData.image}
              onUploadComplete={(url) => {
                console.log("Upload complete, URL:", url);
                setFormData((prev) => ({ ...prev, image: url }));
              }}
              onUploadError={(error) => {
                alert(`Upload failed: ${error}`);
              }}
            />
            {formData.image && (
              <div className="mt-4">
                <img
                  src={formData.image}
                  alt="Category image"
                  className="w-32 h-32 object-cover border border-gray-300 rounded"
                />
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={3}
              placeholder="Brief description of this category"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Index</label>
            <input
              type="number"
              value={formData.orderIndex}
              onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">
              Lower numbers appear first in the category list
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Category"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

