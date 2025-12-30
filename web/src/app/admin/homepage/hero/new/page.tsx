"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { FileUpload } from "@/components/admin/FileUpload";
import { S3Image } from "@/components/common/S3Image";
import type { HeroBanner, ActionType, ButtonStyle, TextAlignment, ImagePosition, ThemeMode, BackgroundType } from "@/types/heroBanner";
import type { StoreItem } from "@/types/store";
import type { Category } from "@/types/store";

export default function NewHeroBannerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<StoreItem[]>([]);
  
  const [formData, setFormData] = useState<Partial<HeroBanner>>({
    heroName: "",
    enabled: true,
    displayOrder: 1,
    eyebrowText: "",
    mainHeading: "",
    subheading: "",
    primaryCta: {
      buttonText: "",
      buttonStyle: "primary",
      actionType: "url",
      actionTarget: "",
    },
    secondaryCta: {
      buttonText: "",
      buttonStyle: "secondary",
      actionType: "url",
      actionTarget: "",
    },
    heroImage: "",
    imageAltText: "",
    textAlignment: "left",
    imagePosition: "right",
    themeMode: "light",
    backgroundType: "solid",
    backgroundColor: "#f5f5f5",
    hideImageOnMobile: false,
    status: "active",
  });

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  const loadCategories = async () => {
    try {
      const q = query(collection(db, "categories"), where("status", "==", "active"));
      const snapshot = await getDocs(q);
      const categoriesData: Category[] = [];
      snapshot.forEach((doc) => {
        categoriesData.push({ categoryId: doc.id, ...doc.data() } as Category);
      });
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const loadProducts = async () => {
    try {
      const q = query(collection(db, "store_items"), where("status", "==", "active"));
      const snapshot = await getDocs(q);
      const productsData: StoreItem[] = [];
      snapshot.forEach((doc) => {
        productsData.push({ itemId: doc.id, ...doc.data() } as StoreItem);
      });
      setProducts(productsData);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const getActionTargetOptions = (actionType: ActionType) => {
    switch (actionType) {
      case "category":
        return categories.map((cat) => ({
          value: cat.categoryId,
          label: cat.name,
        }));
      case "product":
      case "course":
        return products
          .filter((p) => actionType === "course" ? p.itemType === "live_class" || p.itemType === "digital_product" : true)
          .map((p) => ({
            value: p.itemId,
            label: p.title,
          }));
      default:
        return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!formData.heroName || !formData.mainHeading || !formData.primaryCta?.buttonText) {
        alert("Please fill in all required fields");
        return;
      }

      const heroBannerData: any = {
        heroName: formData.heroName,
        enabled: formData.enabled ?? true,
        displayOrder: formData.displayOrder ?? 1,
        eyebrowText: formData.eyebrowText || null,
        mainHeading: formData.mainHeading,
        subheading: formData.subheading || null,
        primaryCta: formData.primaryCta,
        secondaryCta: formData.secondaryCta?.buttonText ? formData.secondaryCta : null,
        heroImage: formData.heroImage || null,
        imageAltText: formData.imageAltText || null,
        textAlignment: formData.textAlignment || "left",
        imagePosition: formData.imagePosition || "right",
        themeMode: formData.themeMode || "light",
        backgroundType: formData.backgroundType || "solid",
        backgroundColor: formData.backgroundColor || null,
        backgroundGradient: formData.backgroundGradient || null,
        backgroundImage: formData.backgroundImage || null,
        hideImageOnMobile: formData.hideImageOnMobile ?? false,
        status: formData.status || "active",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addDoc(collection(db, "hero_banners"), heroBannerData);
      router.push("/admin/homepage/hero");
    } catch (error) {
      console.error("Error creating hero banner:", error);
      alert("Failed to create hero banner");
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
          <h1 className="text-3xl font-bold text-gray-900">Create Hero Banner</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-4xl">
          {/* 1. Basic Control */}
          <section className="mb-8 pb-8 border-b">
            <h2 className="text-xl font-semibold mb-4">1. Basic Control</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.enabled ?? true}
                    onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Enable Hero Banner</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hero ID / Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.heroName || ""}
                  onChange={(e) => setFormData({ ...formData, heroName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., main-hero-banner"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                <input
                  type="number"
                  value={formData.displayOrder || 1}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  min="1"
                />
              </div>
            </div>
          </section>

          {/* 2. Content */}
          <section className="mb-8 pb-8 border-b">
            <h2 className="text-xl font-semibold mb-4">2. Content</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Eyebrow Text</label>
                <input
                  type="text"
                  value={formData.eyebrowText || ""}
                  onChange={(e) => setFormData({ ...formData, eyebrowText: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Premium Learning"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Main Heading (H1) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.mainHeading || ""}
                  onChange={(e) => setFormData({ ...formData, mainHeading: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Explore Premium Courses"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subheading / Description</label>
                <textarea
                  rows={4}
                  value={formData.subheading || ""}
                  onChange={(e) => setFormData({ ...formData, subheading: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Upgrade your skills with live classes, workshops, and bundled kits."
                />
              </div>
            </div>
          </section>

          {/* 3. Primary CTA */}
          <section className="mb-8 pb-8 border-b">
            <h2 className="text-xl font-semibold mb-4">3. Primary CTA (Required)</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Text <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.primaryCta?.buttonText || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    primaryCta: { ...formData.primaryCta!, buttonText: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Shop Now"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Style</label>
                <select
                  value={formData.primaryCta?.buttonStyle || "primary"}
                  onChange={(e) => setFormData({
                    ...formData,
                    primaryCta: { ...formData.primaryCta!, buttonStyle: e.target.value as ButtonStyle }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="primary">Primary</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Action Type</label>
                <select
                  value={formData.primaryCta?.actionType || "url"}
                  onChange={(e) => setFormData({
                    ...formData,
                    primaryCta: { ...formData.primaryCta!, actionType: e.target.value as ActionType, actionTarget: "" }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="url">URL</option>
                  <option value="page">Page</option>
                  <option value="category">Category</option>
                  <option value="product">Product</option>
                  <option value="course">Course</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Action Target</label>
                {formData.primaryCta?.actionType === "url" ? (
                  <input
                    type="text"
                    required
                    value={formData.primaryCta?.actionTarget || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      primaryCta: { ...formData.primaryCta!, actionTarget: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., /classes or https://example.com"
                  />
                ) : (
                  <select
                    required
                    value={formData.primaryCta?.actionTarget || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      primaryCta: { ...formData.primaryCta!, actionTarget: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select {formData.primaryCta?.actionType}</option>
                    {getActionTargetOptions(formData.primaryCta?.actionType || "url").map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </section>

          {/* 4. Secondary CTA */}
          <section className="mb-8 pb-8 border-b">
            <h2 className="text-xl font-semibold mb-4">4. Secondary CTA (Optional)</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                <input
                  type="text"
                  value={formData.secondaryCta?.buttonText || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    secondaryCta: { ...formData.secondaryCta!, buttonText: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Learn More"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Style</label>
                <select
                  value={formData.secondaryCta?.buttonStyle || "secondary"}
                  onChange={(e) => setFormData({
                    ...formData,
                    secondaryCta: { ...formData.secondaryCta!, buttonStyle: e.target.value as ButtonStyle }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="secondary">Secondary</option>
                  <option value="outline">Outline</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Action Type</label>
                <select
                  value={formData.secondaryCta?.actionType || "url"}
                  onChange={(e) => setFormData({
                    ...formData,
                    secondaryCta: { ...formData.secondaryCta!, actionType: e.target.value as ActionType, actionTarget: "" }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="url">URL</option>
                  <option value="page">Page</option>
                  <option value="category">Category</option>
                  <option value="product">Product</option>
                  <option value="course">Course</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Action Target</label>
                {formData.secondaryCta?.actionType === "url" ? (
                  <input
                    type="text"
                    value={formData.secondaryCta?.actionTarget || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      secondaryCta: { ...formData.secondaryCta!, actionTarget: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., /about"
                  />
                ) : (
                  <select
                    value={formData.secondaryCta?.actionTarget || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      secondaryCta: { ...formData.secondaryCta!, actionTarget: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select {formData.secondaryCta?.actionType}</option>
                    {getActionTargetOptions(formData.secondaryCta?.actionType || "url").map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </section>

          {/* 5. Visual */}
          <section className="mb-8 pb-8 border-b">
            <h2 className="text-xl font-semibold mb-4">5. Visual</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
                <FileUpload
                  accept="image/*"
                  folder="hero-banners"
                  onUploadComplete={(url) => setFormData({ ...formData, heroImage: url })}
                  onUploadError={(error) => alert(`Upload failed: ${error}`)}
                  currentValue={formData.heroImage}
                />
                {formData.heroImage && (
                  <div className="mt-4">
                    <S3Image
                      src={formData.heroImage}
                      alt="Hero preview"
                      className="w-full h-64 object-cover rounded-lg border border-gray-300"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Alt Text</label>
                <input
                  type="text"
                  value={formData.imageAltText || ""}
                  onChange={(e) => setFormData({ ...formData, imageAltText: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Descriptive alt text for accessibility"
                />
              </div>
            </div>
          </section>

          {/* 6. Layout & Style */}
          <section className="mb-8 pb-8 border-b">
            <h2 className="text-xl font-semibold mb-4">6. Layout & Style</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Text Alignment</label>
                <select
                  value={formData.textAlignment || "left"}
                  onChange={(e) => setFormData({ ...formData, textAlignment: e.target.value as TextAlignment })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Position</label>
                <select
                  value={formData.imagePosition || "right"}
                  onChange={(e) => setFormData({ ...formData, imagePosition: e.target.value as ImagePosition })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Theme Mode</label>
                <select
                  value={formData.themeMode || "light"}
                  onChange={(e) => setFormData({ ...formData, themeMode: e.target.value as ThemeMode })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Background Type</label>
                <select
                  value={formData.backgroundType || "solid"}
                  onChange={(e) => setFormData({ ...formData, backgroundType: e.target.value as BackgroundType })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="solid">Solid</option>
                  <option value="gradient">Gradient</option>
                  <option value="image">Image</option>
                </select>
              </div>

              {formData.backgroundType === "solid" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.backgroundColor || "#f5f5f5"}
                      onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                      className="h-10 w-20 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={formData.backgroundColor || "#f5f5f5"}
                      onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="#f5f5f5"
                    />
                  </div>
                </div>
              )}

              {formData.backgroundType === "gradient" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Background Gradient</label>
                  <input
                    type="text"
                    value={formData.backgroundGradient || ""}
                    onChange={(e) => setFormData({ ...formData, backgroundGradient: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., from-blue-500 to-purple-500"
                  />
                </div>
              )}

              {formData.backgroundType === "image" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                  <FileUpload
                    accept="image/*"
                    folder="hero-banners/backgrounds"
                    onUploadComplete={(url) => setFormData({ ...formData, backgroundImage: url })}
                    onUploadError={(error) => alert(`Upload failed: ${error}`)}
                    currentValue={formData.backgroundImage}
                  />
                </div>
              )}
            </div>
          </section>

          {/* 7. Responsive Control */}
          <section className="mb-8 pb-8 border-b">
            <h2 className="text-xl font-semibold mb-4">7. Responsive Control</h2>
            
            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.hideImageOnMobile ?? false}
                  onChange={(e) => setFormData({ ...formData, hideImageOnMobile: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Hide Image on Mobile</span>
              </label>
            </div>
          </section>

          {/* Status */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Status</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status || "active"}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </section>

          <div className="flex gap-4 pt-4 border-t">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Hero Banner"}
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
