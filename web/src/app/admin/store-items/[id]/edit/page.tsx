"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { collection, doc, getDoc, updateDoc, addDoc, deleteDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { FileUpload } from "@/components/admin/FileUpload";
import { S3Image } from "@/components/common/S3Image";
import type { StoreItemType, Category, Brand, StoreItem, VariantOption, Variant } from "@/types/store";
import { Plus, X, Trash2 } from "lucide-react";

export default function EditStoreItemPage() {
  const router = useRouter();
  const params = useParams();
  const itemId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [variantOptions, setVariantOptions] = useState<VariantOption[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [formData, setFormData] = useState({
    itemId: "",
    itemType: "physical_product" as StoreItemType,
    title: "",
    shortDescription: "",
    fullDescription: "",
    categoryId: "",
    brandId: "",
    hasVariants: false,
    isDigital: false,
    basePrice: "",
    compareAtPrice: "",
    taxable: false,
    currency: "INR",
    trackInventory: true,
    stockQuantity: "",
    allowBackorder: false,
    lowStockThreshold: "",
    images: [] as string[],
    videos: [] as string[],
    thumbnailImage: "",
    location: "",
    city: "",
    date: "",
    startTime: "",
    endTime: "",
    capacity: "",
    meetingUrl: "",
    includedItems: [] as Array<{ itemId: string; variantId?: string; quantity: number }>,
    bundlePrice: "",
    seoTitle: "",
    seoDescription: "",
    slug: "",
    material: "",
    dimensions: "",
    warranty: "",
    ageGroup: "",
    usageInstructions: "",
    featured: false,
    status: "draft" as "draft" | "active" | "inactive",
  });

  useEffect(() => {
    loadCategories();
    loadBrands();
    loadItem();
    loadVariants();
  }, [itemId]);

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

  const loadVariants = async () => {
    try {
      const variantsQuery = query(collection(db, "variants"), where("itemId", "==", itemId));
      const variantsSnapshot = await getDocs(variantsQuery);
      const variantsData: Variant[] = [];
      variantsSnapshot.forEach((doc) => {
        variantsData.push({ variantId: doc.id, ...doc.data() } as Variant);
      });
      setVariants(variantsData);

      // Load variant options from store_item
      const itemRef = doc(db, "store_items", itemId);
      const itemSnap = await getDoc(itemRef);
      if (itemSnap.exists()) {
        const data = itemSnap.data();
        if (data.variantOptions && Array.isArray(data.variantOptions)) {
          setVariantOptions(data.variantOptions);
        }
      }
    } catch (error) {
      console.error("Error loading variants:", error);
    }
  };

  // Generate all variant combinations from options
  const generateVariants = () => {
    if (variantOptions.length === 0) {
      setVariants([]);
      return;
    }

    // Filter out empty options
    const validOptions = variantOptions.filter(
      (opt) => opt.name.trim() && opt.values.filter((v) => v.trim()).length > 0
    );

    if (validOptions.length === 0) {
      setVariants([]);
      return;
    }

    // Generate all combinations
    const combinations: Record<string, string>[] = [];
    
    function generateCombinations(current: Record<string, string>, index: number) {
      if (index === validOptions.length) {
        combinations.push({ ...current });
        return;
      }

      const option = validOptions[index];
      const validValues = option.values.filter((v) => v.trim());
      
      for (const value of validValues) {
        current[option.name] = value;
        generateCombinations(current, index + 1);
      }
    }

    generateCombinations({}, 0);

    // Create variant objects
    const newVariants: Variant[] = combinations.map((optionValues, idx) => {
      // Check if variant already exists
      const existing = variants.find((v) => {
        const keys = Object.keys(optionValues).sort();
        const vKeys = Object.keys(v.optionValues).sort();
        if (keys.length !== vKeys.length) return false;
        return keys.every((k) => optionValues[k] === v.optionValues[k]);
      });

      if (existing) {
        return existing;
      }

      // Create new variant
      return {
        variantId: `temp-${idx}`,
        itemId: itemId,
        optionValues,
        price: parseFloat(formData.basePrice) || 0,
        sku: `${formData.itemId}-${Object.values(optionValues).join("-")}`.toUpperCase(),
        stockQuantity: 0,
        status: "active" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    setVariants(newVariants);
  };

  const loadItem = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "store_items", itemId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        alert("Item not found");
        router.push("/admin/store-items");
        return;
      }

      const data = docSnap.data();
      
      // Map both new and old field names for backward compatibility
      setFormData({
        itemId: data.itemId || data.item_id || "",
        itemType: (data.itemType || data.type || "physical_product") as StoreItemType,
        title: data.title || "",
        shortDescription: data.shortDescription || "",
        fullDescription: data.fullDescription || data.description || "",
        categoryId: data.categoryId || data.category_id || "",
        brandId: data.brandId || data.brand_id || "",
        hasVariants: data.hasVariants || false,
        isDigital: data.isDigital || data.itemType === "digital_product" || false,
        basePrice: data.basePrice?.toString() || data.price?.toString() || "",
        compareAtPrice: data.compareAtPrice?.toString() || data.compare_at_price?.toString() || data.discount_price?.toString() || "",
        taxable: data.taxable || data.tax_chargeable || false,
        currency: data.currency || "INR",
        trackInventory: data.trackInventory !== undefined ? data.trackInventory : (data.inventory_tracking !== undefined ? data.inventory_tracking : true),
        stockQuantity: data.stockQuantity?.toString() || data.quantity?.toString() || "",
        allowBackorder: data.allowBackorder || data.continue_selling_out_of_stock || false,
        lowStockThreshold: data.lowStockThreshold?.toString() || "",
        images: data.images || [],
        videos: data.videos || [],
        thumbnailImage: data.thumbnailImage || data.images?.[0] || "",
        location: data.location || "",
        city: data.city || "",
        date: data.date || "",
        startTime: data.startTime || "",
        endTime: data.endTime || "",
        capacity: data.capacity?.toString() || "",
        meetingUrl: data.meetingUrl || "",
        includedItems: data.includedItems || [],
        bundlePrice: data.bundlePrice?.toString() || "",
        seoTitle: data.seoTitle || data.seo_title || "",
        seoDescription: data.seoDescription || data.seo_description || "",
        slug: data.slug || "",
        material: data.material || "",
        dimensions: data.dimensions || "",
        warranty: data.warranty || "",
        ageGroup: data.ageGroup || data.age_group || "",
        usageInstructions: data.usageInstructions || data.usage_instructions || "",
        featured: data.featured || false,
        status: (data.status || "draft") as "draft" | "active" | "inactive",
      });
    } catch (error) {
      console.error("Error loading item:", error);
      alert("Failed to load item");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      
      if (!formData.categoryId) {
        alert("Please select a category");
        return;
      }
      
      const storeItemData: any = {
        itemId: formData.itemId,
        itemType: formData.itemType,
        title: formData.title,
        shortDescription: formData.shortDescription || null,
        fullDescription: formData.fullDescription,
        categoryId: formData.categoryId,
        brandId: formData.brandId || null,
        hasVariants: formData.hasVariants,
        variantOptions: variantOptions.length > 0 ? variantOptions : null,
        isDigital: formData.isDigital || formData.itemType === "digital_product",
        basePrice: parseFloat(formData.basePrice) || 0,
        compareAtPrice: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : null,
        taxable: formData.taxable,
        currency: formData.currency,
        trackInventory: formData.trackInventory && formData.itemType !== "digital_product",
        stockQuantity: formData.trackInventory && formData.stockQuantity ? parseInt(formData.stockQuantity) : null,
        allowBackorder: formData.allowBackorder,
        lowStockThreshold: formData.lowStockThreshold ? parseInt(formData.lowStockThreshold) : null,
        images: formData.images,
        videos: formData.videos,
        thumbnailImage: formData.images[0] || formData.thumbnailImage || null,
        location: (formData.itemType === "workshop" && formData.location) ? formData.location : null,
        city: (formData.itemType === "workshop" && formData.city) ? formData.city : null,
        date: (formData.itemType === "workshop" || formData.itemType === "live_class") && formData.date ? formData.date : null,
        startTime: (formData.itemType === "workshop" || formData.itemType === "live_class") && formData.startTime ? formData.startTime : null,
        endTime: (formData.itemType === "workshop" || formData.itemType === "live_class") && formData.endTime ? formData.endTime : null,
        capacity: (formData.itemType === "workshop" || formData.itemType === "live_class") && formData.capacity ? parseInt(formData.capacity) : null,
        meetingUrl: (formData.itemType === "live_class" && formData.meetingUrl) ? formData.meetingUrl : null,
        includedItems: formData.itemType === "bundle" ? formData.includedItems : [],
        bundlePrice: formData.itemType === "bundle" && formData.bundlePrice ? parseFloat(formData.bundlePrice) : null,
        seoTitle: formData.seoTitle || formData.title,
        seoDescription: formData.seoDescription || formData.fullDescription,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
        material: formData.material || null,
        dimensions: formData.dimensions || null,
        warranty: formData.warranty || null,
        ageGroup: formData.ageGroup || null,
        usageInstructions: formData.usageInstructions || null,
        featured: formData.featured,
        status: formData.status,
        updatedAt: serverTimestamp(),
      };
      
      await updateDoc(doc(db, "store_items", itemId), storeItemData);
      
      // Save variants
      if (formData.hasVariants && variants.length > 0) {
        // Delete existing variants
        const existingVariantsQuery = query(collection(db, "variants"), where("itemId", "==", itemId));
        const existingVariantsSnapshot = await getDocs(existingVariantsQuery);
        const deletePromises = existingVariantsSnapshot.docs.map((doc) => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
        
        // Add new variants
        const addPromises = variants.map((variant) => {
          const { variantId, ...variantData } = variant;
          return addDoc(collection(db, "variants"), {
            ...variantData,
            itemId: itemId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        });
        await Promise.all(addPromises);
      }
      
      router.push("/admin/store-items");
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-lg">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

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
          <h1 className="text-3xl font-bold text-gray-900">Edit Store Item</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-4xl">
          {/* Same form structure as new page - I'll include key sections */}
          <section className="mb-8 pb-8 border-b">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Type *</label>
                <select
                  required
                  value={formData.itemType}
                  onChange={(e) => {
                    const newType = e.target.value as StoreItemType;
                    setFormData({ 
                      ...formData, 
                      itemType: newType,
                      isDigital: newType === "digital_product",
                      trackInventory: newType !== "digital_product",
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="physical_product">Physical Product</option>
                  <option value="digital_product">Digital Product</option>
                  <option value="workshop">Workshop</option>
                  <option value="live_class">Live Class</option>
                  <option value="bundle">Bundle</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.categoryId} value={cat.categoryId}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand (Optional)</label>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item ID *</label>
                <input
                  type="text"
                  required
                  value={formData.itemId}
                  onChange={(e) => setFormData({ ...formData, itemId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    title: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                    seoTitle: formData.seoTitle || e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Description *</label>
                <textarea
                  required
                  rows={6}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              {formData.itemType === "physical_product" && (
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.hasVariants}
                      onChange={(e) => setFormData({ ...formData, hasVariants: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">This product has variants (Size, Color, etc.)</span>
                  </label>
                </div>
              )}
            </div>
          </section>

          {/* Pricing */}
          <section className="mb-8 pb-8 border-b">
            <h2 className="text-xl font-semibold mb-4">Pricing</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (₹) *</label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
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

          {/* Media */}
          <section className="mb-8 pb-8 border-b">
            <h2 className="text-xl font-semibold mb-4">Media</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                <FileUpload
                  accept="image/*"
                  folder="products/images"
                  multiple={true}
                  onUploadComplete={(url) => {
                    if (!formData.images.includes(url)) {
                      setFormData({ ...formData, images: [...formData.images, url] });
                    }
                  }}
                  onUploadError={(error) => alert(`Upload failed: ${error}`)}
                />
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <S3Image src={img} alt={`Image ${idx + 1}`} className="w-full h-32 object-cover rounded-lg border" />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, images: formData.images.filter((_, i) => i !== idx) })}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 opacity-0 group-hover:opacity-100"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Variant Management */}
          {formData.hasVariants && (
            <section className="mb-8 pb-8 border-b">
              <h2 className="text-xl font-semibold mb-4">Variant Management</h2>
              
              <div className="space-y-6">
                {/* Variant Options Setup */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Variant Options</h3>
                  <div className="space-y-4">
                    {variantOptions.map((option, optionIdx) => (
                      <div key={optionIdx} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <input
                            type="text"
                            value={option.name}
                            onChange={(e) => {
                              const newOptions = [...variantOptions];
                              newOptions[optionIdx].name = e.target.value;
                              setVariantOptions(newOptions);
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg mr-2"
                            placeholder="Option name (e.g., Size, Color)"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setVariantOptions(variantOptions.filter((_, i) => i !== optionIdx));
                              // Regenerate variants when option is removed
                              generateVariants();
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {option.values.map((value, valueIdx) => (
                            <div key={valueIdx} className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg">
                              <input
                                type="text"
                                value={value}
                                onChange={(e) => {
                                  const newOptions = [...variantOptions];
                                  newOptions[optionIdx].values[valueIdx] = e.target.value;
                                  setVariantOptions(newOptions);
                                }}
                                className="bg-transparent border-none outline-none text-sm"
                                placeholder="Value"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newOptions = [...variantOptions];
                                  newOptions[optionIdx].values = newOptions[optionIdx].values.filter((_, i) => i !== valueIdx);
                                  setVariantOptions(newOptions);
                                  generateVariants();
                                }}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              const newOptions = [...variantOptions];
                              newOptions[optionIdx].values.push("");
                              setVariantOptions(newOptions);
                            }}
                            className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100"
                          >
                            + Add Value
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setVariantOptions([...variantOptions, { name: "", values: [""] }]);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Variant Option
                    </button>
                    {variantOptions.length > 0 && (
                      <button
                        type="button"
                        onClick={generateVariants}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Generate Variants
                      </button>
                    )}
                  </div>
                </div>

                {/* Generated Variants */}
                {variants.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Generated Variants ({variants.length})</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {variants.map((variant, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Options</label>
                              <div className="text-sm font-medium">
                                {Object.entries(variant.optionValues).map(([key, value]) => (
                                  <span key={key} className="mr-2">
                                    {key}: {value}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Price (₹)</label>
                              <input
                                type="number"
                                step="0.01"
                                value={variant.price}
                                onChange={(e) => {
                                  const newVariants = [...variants];
                                  newVariants[idx].price = parseFloat(e.target.value) || 0;
                                  setVariants(newVariants);
                                }}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">SKU</label>
                              <input
                                type="text"
                                value={variant.sku}
                                onChange={(e) => {
                                  const newVariants = [...variants];
                                  newVariants[idx].sku = e.target.value;
                                  setVariants(newVariants);
                                }}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Stock</label>
                              <input
                                type="number"
                                value={variant.stockQuantity}
                                onChange={(e) => {
                                  const newVariants = [...variants];
                                  newVariants[idx].stockQuantity = parseInt(e.target.value) || 0;
                                  setVariants(newVariants);
                                }}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </div>
                          </div>
                          <div className="mt-2 flex items-center gap-4">
                            <label className="flex items-center text-sm">
                              <input
                                type="checkbox"
                                checked={variant.status === "active"}
                                onChange={(e) => {
                                  const newVariants = [...variants];
                                  newVariants[idx].status = e.target.checked ? "active" : "inactive";
                                  setVariants(newVariants);
                                }}
                                className="mr-2"
                              />
                              Active
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                setVariants(variants.filter((_, i) => i !== idx));
                              }}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Status */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Status</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Featured</span>
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

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
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

