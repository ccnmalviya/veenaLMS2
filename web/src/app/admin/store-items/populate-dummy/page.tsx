"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import type { StoreItem, Variant } from "@/types/store";

// Unsplash image URLs - Using specific curated images from Unsplash
// Format: https://images.unsplash.com/photo-{id}?w=800&h=800&fit=crop
const PRODUCT_IMAGE_SETS = [
  // Product 0 - Headphones
  [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=800&fit=crop",
  ],
  // Product 1 - Smartwatch
  [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&h=800&fit=crop",
  ],
  // Product 2 - Laptop/Programming
  [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=800&fit=crop",
  ],
  // Product 3 - Camera/Photography
  [
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=800&fit=crop",
  ],
  // Product 4 - Python/Coding
  [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=800&fit=crop",
  ],
  // Product 5 - Mouse/Keyboard
  [
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1587825147138-346c006b6e7c?w=800&h=800&fit=crop",
  ],
  // Product 6 - JavaScript/Web
  [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&h=800&fit=crop",
  ],
  // Product 7 - Speaker/Audio
  [
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop",
  ],
];

// Get 4 images for a product based on its index
const getProductImages = (productIndex: number): string[] => {
  const imageSet = PRODUCT_IMAGE_SETS[productIndex % PRODUCT_IMAGE_SETS.length];
  return [...imageSet]; // Return all 4 images
};

export default function PopulateDummyProductsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const createDummyCategories = async () => {
    const categories = [
      { name: "Brand 1", slug: "brand-1", description: "Category for Brand 1 products" },
      { name: "Brand 2", slug: "brand-2", description: "Category for Brand 2 products" },
      { name: "Brand 3", slug: "brand-3", description: "Category for Brand 3 products" },
      { name: "Brand 4", slug: "brand-4", description: "Category for Brand 4 products" },
    ];

    const categoryIds: Record<string, string> = {};

    for (const category of categories) {
      setProgress(`Creating category: ${category.name}...`);
      const docRef = await addDoc(collection(db, "categories"), {
        name: category.name,
        slug: category.slug,
        description: category.description,
        parentCategoryId: null,
        orderIndex: 0,
        status: "active",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      categoryIds[category.name] = docRef.id;
    }

    return categoryIds;
  };

  const createDummyBrands = async () => {
    const brands = [
      { name: "Brand 1", description: "Brand 1 description" },
      { name: "Brand 2", description: "Brand 2 description" },
      { name: "Brand 3", description: "Brand 3 description" },
      { name: "Brand 4", description: "Brand 4 description" },
    ];

    const brandIds: Record<string, string> = {};

    for (const brand of brands) {
      setProgress(`Creating brand: ${brand.name}...`);
      const docRef = await addDoc(collection(db, "brands"), {
        name: brand.name,
        description: brand.description,
        status: "active",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      brandIds[brand.name] = docRef.id;
    }

    return brandIds;
  };

  const createDummyProducts = async (categoryIds: Record<string, string>, brandIds: Record<string, string>) => {
    const productTypes: Array<"physical_product" | "digital_product" | "workshop" | "live_class"> = [
      "physical_product",
      "physical_product",
      "digital_product",
      "workshop",
      "live_class",
      "physical_product",
      "digital_product",
      "physical_product",
    ];

    const productTitles = [
      "Premium Wireless Headphones",
      "Smart Fitness Watch",
      "Complete Programming Course",
      "Photography Workshop - Beginner",
      "Live Python Bootcamp",
      "Wireless Mouse & Keyboard Set",
      "Advanced JavaScript Course",
      "Bluetooth Speaker System",
    ];

    const descriptions = [
      "High-quality wireless headphones with noise cancellation and premium sound quality.",
      "Track your fitness goals with this smartwatch featuring heart rate monitoring and GPS.",
      "Master programming from scratch with this comprehensive online course.",
      "Learn photography basics in this hands-on workshop for beginners.",
      "Join our live Python programming bootcamp and learn from industry experts.",
      "Ergonomic wireless mouse and keyboard combo for comfortable computing.",
      "Take your JavaScript skills to the next level with advanced concepts and patterns.",
      "Portable Bluetooth speaker with powerful bass and crystal-clear sound.",
    ];

    const basePrices = [2999, 4999, 1999, 3499, 2499, 1299, 2999, 1799];
    const discountPrices = [2499, 3999, 1499, 2999, 1999, 999, 2499, 1499];

    for (let brandIndex = 0; brandIndex < 4; brandIndex++) {
      const brandName = `Brand ${brandIndex + 1}`;
      const categoryId = categoryIds[brandName];
      const brandId = brandIds[brandName];

      for (let productIndex = 0; productIndex < 8; productIndex++) {
        const productType = productTypes[productIndex];
        const hasVariants = productIndex < 3; // First 3 products have variants
        const isDigital = productType === "digital_product";
        
        const title = `${brandName} ${productTitles[productIndex]}`;
        const slug = generateSlug(title);
        const basePrice = basePrices[productIndex] + (brandIndex * 100);
        const compareAtPrice = discountPrices[productIndex] + (brandIndex * 100);
        const hasDiscount = productIndex % 2 === 0;

        setProgress(`Creating product ${productIndex + 1}/8 for ${brandName}: ${title}...`);

        const productData: any = {
          itemId: `ITEM-${Date.now()}-${brandIndex}-${productIndex}`,
          itemType: productType,
          title: title,
          shortDescription: descriptions[productIndex],
          fullDescription: `${descriptions[productIndex]} This is a detailed description for ${title}. Perfect for users looking for quality products in ${brandName}.`,
          categoryId: categoryId,
          brandId: brandId,
          hasVariants: hasVariants,
          isDigital: isDigital,
          basePrice: hasDiscount ? compareAtPrice : basePrice,
          compareAtPrice: hasDiscount ? basePrice : null,
          taxable: true,
          currency: "INR",
          trackInventory: !isDigital,
          stockQuantity: isDigital ? null : Math.floor(Math.random() * 100) + 10,
          allowBackorder: false,
          lowStockThreshold: 10,
          images: getProductImages(productIndex),
          videos: [],
          slug: slug,
          status: "active",
          featured: productIndex < 2, // First 2 products are featured
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        // Add variant options for products with variants
        if (hasVariants) {
          productData.variantOptions = [
            { name: "Size", values: ["S", "M", "L", "XL"] },
            { name: "Color", values: ["Black", "White", "Blue", "Red"] },
          ];
        }

        const productRef = await addDoc(collection(db, "store_items"), productData);
        const productId = productRef.id;

        // Create variants for products that have variants
        if (hasVariants && productData.variantOptions) {
          const sizes = productData.variantOptions[0].values;
          const colors = productData.variantOptions[1].values;
          let variantIndex = 0;

          for (const size of sizes) {
            for (const color of colors) {
              const variantData: Omit<Variant, "variantId"> = {
                itemId: productId,
                optionValues: { Size: size, Color: color },
                price: productData.basePrice + (variantIndex * 100), // Slight price variation
                sku: `${productData.itemId}-${size}-${color}`,
                stockQuantity: Math.floor(Math.random() * 50) + 5,
                status: "active",
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
              };

              await addDoc(collection(db, "variants"), variantData);
              variantIndex++;
            }
          }

          setProgress(`Created ${sizes.length * colors.length} variants for ${title}...`);
        }
      }
    }
  };

  const handlePopulate = async () => {
    if (!confirm("This will create 4 categories, 4 brands, and 32 products (8 per category). Continue?")) {
      return;
    }

    try {
      setLoading(true);
      setProgress("Starting population...");

      setProgress("Creating categories...");
      const categoryIds = await createDummyCategories();

      setProgress("Creating brands...");
      const brandIds = await createDummyBrands();

      setProgress("Creating products...");
      await createDummyProducts(categoryIds, brandIds);

      setProgress("✅ All dummy data created successfully!");
      alert("Dummy data created successfully! 4 categories, 4 brands, and 32 products have been added.");
      router.push("/admin/store-items");
    } catch (error) {
      console.error("Error populating dummy data:", error);
      setProgress(`❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`);
      alert("Error creating dummy data. Check console for details.");
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
          <h1 className="text-3xl font-bold text-gray-900">Populate Dummy Products</h1>
          <p className="text-gray-600 mt-2">
            This will create dummy data: 4 categories (Brand 1-4), 4 brands, and 32 products (8 per category).
            Some products will include variants.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-4">What will be created:</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>4 Categories: Brand 1, Brand 2, Brand 3, Brand 4</li>
                <li>4 Brands: Brand 1, Brand 2, Brand 3, Brand 4</li>
                <li>32 Products total (8 products per category)</li>
                <li>First 3 products in each category will have variants (Size and Color)</li>
                <li>Products include various types: physical products, digital products, workshops, live classes</li>
              </ul>
            </div>

            {progress && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">{progress}</p>
              </div>
            )}

            <button
              onClick={handlePopulate}
              disabled={loading}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {loading ? "Creating Dummy Data..." : "Create Dummy Data"}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
