"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { collection, addDoc, getDocs, serverTimestamp, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { FileUpload } from "@/components/admin/FileUpload";
import { S3Image } from "@/components/common/S3Image";
import type { StoreItemType, Category, Brand } from "@/types/store";

type CourseLanguage = "hindi" | "english" | "hinglish";
type CourseLevel = "beginner" | "intermediate" | "advanced";

function NewStoreItemForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isCourse, setIsCourse] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [instructors, setInstructors] = useState<Array<{ id: string; name: string; email: string }>>([]);
  const [tagsInput, setTagsInput] = useState<string>("");
  
  const [formData, setFormData] = useState({
    // Basic Product Information
    itemId: "",
    itemType: "physical_product" as StoreItemType | "course",
    title: "",
    shortDescription: "",
    fullDescription: "",
    categoryId: "", // Required
    brandId: "", // Optional
    hasVariants: false,
    isDigital: false,
    
    // Course-specific fields
    courseLanguage: "english" as CourseLanguage,
    courseLevel: "beginner" as CourseLevel,
    courseInstructors: [] as string[],
    courseTags: [] as string[],
    subCategory: "",
    promoVideoUrl: "",
    
    // Pricing
    basePrice: "",
    compareAtPrice: "",
    taxable: false,
    currency: "INR",
    
    // Inventory
    trackInventory: true,
    stockQuantity: "",
    allowBackorder: false,
    lowStockThreshold: "",
    
    // Media
    images: [] as string[],
    videos: [] as string[],
    thumbnailImage: "",
    
    // Workshop/Live Class specific
    location: "",
    city: "",
    date: "",
    startTime: "",
    endTime: "",
    capacity: "",
    meetingUrl: "",
    
    // Bundle
    includedItems: [] as Array<{ itemId: string; variantId?: string; quantity: number }>,
    bundlePrice: "",
    
    // SEO
    seoTitle: "",
    seoDescription: "",
    slug: "",
    
    // Optional Fields
    material: "",
    dimensions: "",
    warranty: "",
    ageGroup: "",
    usageInstructions: "",
    
    // System
    featured: false,
    status: "active" as "draft" | "active" | "inactive",
  });

  // Detect course type from URL params
  useEffect(() => {
    const itemTypeParam = searchParams.get("type");
    const courseMode = itemTypeParam === "course";
    setIsCourse(courseMode);
    if (courseMode) {
      setFormData((prev) => ({ ...prev, itemType: "course" }));
    }
  }, [searchParams]);

  useEffect(() => {
    loadCategories();
    loadBrands();
    if (isCourse) {
      loadInstructors();
    }
  }, [isCourse]);

  useEffect(() => {
    // Auto-generate slug from title for courses
    if (isCourse && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title, isCourse]);

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

  const loadBrands = async () => {
    try {
      const q = query(collection(db, "brands"), where("status", "==", "active"));
      const snapshot = await getDocs(q);
      const brandsData: Brand[] = [];
      snapshot.forEach((doc) => {
        brandsData.push({ brandId: doc.id, ...doc.data() } as Brand);
      });
      setBrands(brandsData);
    } catch (error) {
      console.error("Error loading brands:", error);
    }
  };

  const loadInstructors = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const instructorsData: Array<{ id: string; name: string; email: string }> = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        instructorsData.push({
          id: doc.id,
          name: data.name || data.email || "Unknown",
          email: data.email || "",
        });
      });
      setInstructors(instructorsData);
    } catch (error) {
      console.error("Error loading instructors:", error);
    }
  };

  const handleCourseTagsChange = (value: string) => {
    setTagsInput(value);
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    setFormData((prev) => ({ ...prev, courseTags: tags }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Validate required fields
      if (!formData.categoryId) {
        alert("Please select a category");
        return;
      }
      
      const storeItemData: any = {
        // Core fields
        itemId: formData.itemId || `ITEM-${Date.now()}`, // Auto-generate if not provided
        itemType: formData.itemType,
        title: formData.title,
        shortDescription: formData.shortDescription || null,
        fullDescription: formData.fullDescription,
        categoryId: formData.categoryId,
        brandId: formData.brandId || null,
        hasVariants: formData.hasVariants,
        isDigital: formData.isDigital || formData.itemType === "digital_product",
        
        // Pricing
        basePrice: parseFloat(formData.basePrice) || 0,
        compareAtPrice: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : null,
        taxable: formData.taxable,
        currency: formData.currency,
        
        // Inventory (for physical products, workshops, live classes)
        trackInventory: formData.trackInventory && formData.itemType !== "digital_product",
        stockQuantity: formData.trackInventory && formData.stockQuantity ? parseInt(formData.stockQuantity) : null,
        allowBackorder: formData.allowBackorder,
        lowStockThreshold: formData.lowStockThreshold ? parseInt(formData.lowStockThreshold) : null,
        
        // Media
        images: formData.images,
        videos: formData.videos,
        thumbnailImage: formData.images[0] || formData.thumbnailImage || null,
        
        // Workshop/Live Class specific
        location: (formData.itemType === "workshop" && formData.location) ? formData.location : null,
        city: (formData.itemType === "workshop" && formData.city) ? formData.city : null,
        date: (formData.itemType === "workshop" || formData.itemType === "live_class") && formData.date ? formData.date : null,
        startTime: (formData.itemType === "workshop" || formData.itemType === "live_class") && formData.startTime ? formData.startTime : null,
        endTime: (formData.itemType === "workshop" || formData.itemType === "live_class") && formData.endTime ? formData.endTime : null,
        capacity: (formData.itemType === "workshop" || formData.itemType === "live_class") && formData.capacity ? parseInt(formData.capacity) : null,
        meetingUrl: (formData.itemType === "live_class" && formData.meetingUrl) ? formData.meetingUrl : null,
        
        // Bundle
        includedItems: formData.itemType === "bundle" ? formData.includedItems : [],
        bundlePrice: formData.itemType === "bundle" && formData.bundlePrice ? parseFloat(formData.bundlePrice) : null,
        
        // SEO
        seoTitle: formData.seoTitle || formData.title,
        seoDescription: formData.seoDescription || formData.fullDescription,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
        
        // Optional fields
        material: formData.material || null,
        dimensions: formData.dimensions || null,
        warranty: formData.warranty || null,
        ageGroup: formData.ageGroup || null,
        usageInstructions: formData.usageInstructions || null,
        
        // System
        featured: formData.featured,
        status: formData.status,
        
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      await addDoc(collection(db, "store_items"), storeItemData);
      router.push("/admin/store-items");
    } catch (error) {
      console.error("Error creating item:", error);
      alert("Failed to create item");
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
          <h1 className="text-3xl font-bold text-gray-900">
            {isCourse ? "Create New Course" : "Add New Product"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-4xl">
          {/* 1️⃣ Basic Information */}
          <section className="mb-8 pb-8 border-b">
            <h2 className="text-xl font-semibold mb-4">
              {isCourse ? "1️⃣ Basic Course Information" : "1️⃣ Basic Product Information"}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isCourse ? "Course Title *" : "Product Title *"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => {
                    const newData = {
                      ...formData,
                      title: e.target.value,
                      slug: isCourse ? e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : e.target.value.toLowerCase().replace(/\s+/g, "-"),
                      seoTitle: formData.seoTitle || e.target.value
                    };
                    setFormData(newData);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder={isCourse ? "Enter course title" : "Enter product title"}
                />
                {isCourse && formData.slug && (
                  <p className="text-xs text-gray-500 mt-1">Slug: {formData.slug}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Category *</label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value, subCategory: "" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.categoryId} value={cat.categoryId}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {categories.length === 0 && (
                  <p className="text-xs text-yellow-600 mt-1">
                    No categories found. <a href="/admin/store-items/categories/new" className="underline">Create one first</a>
                  </p>
                )}
              </div>

              {/* Sub Category - Course only */}
              {isCourse && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sub Category (Optional)
                  </label>
                  <select
                    value={formData.subCategory || ""}
                    onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">None</option>
                    {/* Sub-categories can be added if Category type is extended */}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Sub-categories feature coming soon</p>
                </div>
              )}

              {/* Brand - Product only */}
              {!isCourse && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Brand (Optional)</label>
                  <select
                    value={formData.brandId}
                    onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">None</option>
                    {brands.map((brand) => (
                      <option key={brand.brandId} value={brand.brandId}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Course Language and Level */}
              {isCourse && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Language *
                    </label>
                    <select
                      required
                      value={formData.courseLanguage || "english"}
                      onChange={(e) => setFormData({ ...formData, courseLanguage: e.target.value as CourseLanguage })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                      <option value="hinglish">Hinglish</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Level *
                    </label>
                    <select
                      required
                      value={formData.courseLevel || "beginner"}
                      onChange={(e) => setFormData({ ...formData, courseLevel: e.target.value as CourseLevel })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isCourse ? "Short Description * (Max 200 characters)" : "Short Description"}
                </label>
                {isCourse ? (
                  <textarea
                    required
                    maxLength={200}
                    rows={3}
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Brief description of the course"
                  />
                ) : (
                  <input
                    type="text"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Brief description (for listings)"
                  />
                )}
                {isCourse && (
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.shortDescription.length}/200 characters
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Description *</label>
                <textarea
                  required
                  rows={6}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    fullDescription: e.target.value,
                    seoDescription: formData.seoDescription || e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder={isCourse ? "Detailed course description" : "Full product description (rich text supported)"}
                />
              </div>

              {/* Course Tags */}
              {isCourse && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => handleCourseTagsChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., javascript, react, web development"
                  />
                  {formData.courseTags && formData.courseTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.courseTags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Course Instructors */}
              {isCourse && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instructors * (At least one required)
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-4">
                    {instructors.length === 0 ? (
                      <p className="text-sm text-gray-500">No instructors found</p>
                    ) : (
                      instructors.map((instructor) => (
                        <label key={instructor.id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={(formData.courseInstructors || []).includes(instructor.id)}
                            onChange={(e) => {
                              const currentInstructors = (formData.courseInstructors || []) as string[];
                              if (e.target.checked) {
                                setFormData({
                                  ...formData,
                                  courseInstructors: [...currentInstructors, instructor.id],
                                });
                              } else {
                                setFormData({
                                  ...formData,
                                  courseInstructors: currentInstructors.filter((id) => id !== instructor.id),
                                });
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700">
                            {instructor.name} {instructor.email && `(${instructor.email})`}
                          </span>
                        </label>
                      ))
                    )}
                  </div>
                  {formData.courseInstructors && formData.courseInstructors.length > 0 && (
                    <p className="text-xs text-gray-500 mt-2">
                      {formData.courseInstructors.length} instructor(s) selected
                    </p>
                  )}
                </div>
              )}

              {/* Thumbnail Image - Course specific */}
              {isCourse ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thumbnail Image * (Required)
                  </label>
                  {formData.thumbnailImage ? (
                    <div className="relative inline-block">
                      <S3Image
                        src={formData.thumbnailImage}
                        alt="Course thumbnail"
                        className="w-48 h-32 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, thumbnailImage: "" })}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <FileUpload
                      accept="image/*"
                      folder="courses/thumbnails"
                      multiple={false}
                      onUploadComplete={(url) => {
                        setFormData({ ...formData, thumbnailImage: url });
                      }}
                      onUploadError={(error) => {
                        alert(`Upload failed: ${error}`);
                      }}
                    />
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                  <FileUpload
                    accept="image/*"
                    folder="products/images"
                    multiple={true}
                    onUploadComplete={(url) => {
                      if (!formData.images.includes(url)) {
                        setFormData({ ...formData, images: [...formData.images, url] });
                      }
                    }}
                    onUploadError={(error) => {
                      alert(`Upload failed: ${error}`);
                    }}
                  />
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <S3Image
                          src={img}
                          alt={`Product image ${idx + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, images: formData.images.filter((_, i) => i !== idx) })}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Promo Video - Course specific */}
              {isCourse && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Promo Video URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.promoVideoUrl || ""}
                    onChange={(e) => setFormData({ ...formData, promoVideoUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="https://youtube.com/watch?v=... or video URL"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter a URL to a promotional video for this course
                  </p>
                </div>
              )}

              {/* Videos - Product only */}
              {!isCourse && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Videos (Optional)</label>
                  <FileUpload
                    accept="video/*"
                    folder="products/videos"
                    multiple={true}
                    onUploadComplete={(url) => {
                      if (!formData.videos.includes(url)) {
                        setFormData({ ...formData, videos: [...formData.videos, url] });
                      }
                    }}
                    onUploadError={(error) => {
                      alert(`Upload failed: ${error}`);
                    }}
                  />
                  <div className="mt-4 space-y-2">
                    {formData.videos.map((vid, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-purple-50 rounded border border-purple-200">
                        <span className="text-sm text-purple-800">Video {idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, videos: formData.videos.filter((_, i) => i !== idx) })}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 2️⃣ Pricing Details */}
          <section className="mb-8 pb-8 border-b">
            <h2 className="text-xl font-semibold mb-4">2️⃣ Pricing Details</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">5. Pricing Setup - Base Price (₹) *</label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Compare at Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.compareAtPrice}
                  onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Original price for discounts"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.taxable}
                    onChange={(e) => setFormData({ ...formData, taxable: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Taxable</span>
                </label>
              </div>
            </div>
          </section>

          {/* 6️⃣ Inventory Setup */}
          {(formData.itemType === "physical_product" || formData.itemType === "workshop" || formData.itemType === "live_class") && (
            <section className="mb-8 pb-8 border-b">
              <h2 className="text-xl font-semibold mb-4">6️⃣ Inventory Setup</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.trackInventory}
                      onChange={(e) => setFormData({ ...formData, trackInventory: e.target.checked })}
                      className="mr-2"
                      disabled={formData.isDigital}
                    />
                    <span className="text-sm text-gray-700">Track inventory</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.allowBackorder}
                      onChange={(e) => setFormData({ ...formData, allowBackorder: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Allow backorder</span>
                  </label>
                </div>

                {formData.trackInventory && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {formData.itemType === "workshop" || formData.itemType === "live_class" ? "Capacity/Seats" : "Stock Quantity"} *
                      </label>
                      <input
                        type="number"
                        required={formData.trackInventory}
                        value={formData.stockQuantity}
                        onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Low Stock Threshold</label>
                      <input
                        type="number"
                        value={formData.lowStockThreshold}
                        onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="10"
                      />
                    </div>
                  </>
                )}
              </div>
            </section>
          )}

          {/* 7️⃣ Variant Setup */}
          {formData.itemType === "physical_product" && (
            <section className="mb-8 pb-8 border-b">
              <h2 className="text-xl font-semibold mb-4">7️⃣ Variant Setup (Optional)</h2>
              
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.hasVariants}
                    onChange={(e) => setFormData({ ...formData, hasVariants: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">This product has variants (Size, Color, etc.)</span>
                </label>
                
                {formData.hasVariants && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      Variant management will be available after creating the product. You can add variants in the product edit page.
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}


          {/* 9️⃣ SEO Setup */}
          <section className="mb-8 pb-8 border-b">
            <h2 className="text-xl font-semibold mb-4">9️⃣ SEO Setup</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="SEO optimized title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <textarea
                  rows={3}
                  value={formData.seoDescription}
                  onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="SEO meta description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Handle (Slug)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="product-slug"
                />
              </div>
            </div>
          </section>

          {/* 🔟 Optional Fields */}
          {formData.itemType === "physical_product" && (
            <section className="mb-8 pb-8 border-b">
              <h2 className="text-xl font-semibold mb-4">🔟 Optional Fields</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                    <input
                      type="text"
                      value={formData.material}
                      onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="e.g., Plastic, Metal, Wood"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
                    <input
                      type="text"
                      value={formData.dimensions}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="e.g., 10x5x3 cm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Warranty</label>
                    <input
                      type="text"
                      value={formData.warranty}
                      onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="e.g., 1 year warranty"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age Group</label>
                    <input
                      type="text"
                      value={formData.ageGroup}
                      onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="e.g., 5-12 years"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Usage Instructions</label>
                  <textarea
                    rows={4}
                    value={formData.usageInstructions}
                    onChange={(e) => setFormData({ ...formData, usageInstructions: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Product usage instructions..."
                  />
                </div>
              </div>
            </section>
          )}

          {/* 🔟 Save Draft / Publish */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">🔟 Save Draft / Publish</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Featured Product</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </section>

          <div className="flex gap-4 pt-4 border-t">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Product"}
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

export default function NewStoreItemPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewStoreItemForm />
    </Suspense>
  );
}
