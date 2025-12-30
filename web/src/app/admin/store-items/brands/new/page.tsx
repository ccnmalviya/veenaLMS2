"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, getDocs, serverTimestamp, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { FileUpload } from "@/components/admin/FileUpload";

export default function NewBrandPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    description: "",
    websiteUrl: "",
    status: "active" as "active" | "inactive",
  });

  const checkNameUnique = async (name: string): Promise<boolean> => {
    const q = query(collection(db, "brands"), where("name", "==", name));
    const snapshot = await getDocs(q);
    return snapshot.empty;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Check name uniqueness
      if (!(await checkNameUnique(formData.name))) {
        alert("Brand name already exists. Please choose a different name.");
        return;
      }

      await addDoc(collection(db, "brands"), {
        name: formData.name,
        logo: formData.logo || null,
        description: formData.description || null,
        websiteUrl: formData.websiteUrl || null,
        status: formData.status,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      router.push("/admin/store-items/brands");
    } catch (error) {
      console.error("Error creating brand:", error);
      alert("Failed to create brand");
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
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Add New Brand</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Brand Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
              <FileUpload
                accept="image/*"
                folder="brands/logos"
                currentValue={formData.logo}
                onUploadComplete={(url) => {
                  console.log("Upload complete, URL:", url);
                  setFormData((prev) => ({ ...prev, logo: url }));
                }}
                onUploadError={(error) => {
                  alert(`Upload failed: ${error}`);
                }}
              />
              {formData.logo && (
                <div className="mt-4">
                  <img
                    src={formData.logo}
                    alt="Brand logo"
                    className="w-32 h-32 object-contain border border-gray-300 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, logo: "" }))}
                    className="mt-2 text-sm text-red-600 hover:text-red-800"
                  >
                    Remove Logo
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Brand description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website URL (Optional)</label>
              <input
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
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
                {loading ? "Creating..." : "Create Brand"}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

