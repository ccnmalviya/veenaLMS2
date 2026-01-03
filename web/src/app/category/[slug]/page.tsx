"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CategoryNavigation } from "@/components/layout/CategoryNavigation";
import { NotificationStrip } from "@/components/home/NotificationStrip";
import { getSignedImageUrl } from "@/lib/s3ImageHelper";
import type { Category, StoreItem } from "@/types/store";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<StoreItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [productImageUrls, setProductImageUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    if (slug) {
      loadCategoryAndProducts();
    }
  }, [slug]);

  const loadCategoryAndProducts = async () => {
    try {
      setLoading(true);
      
      // Find category by slug
      const categoriesQuery = query(
        collection(db, "categories"),
        where("slug", "==", slug)
      );
      const categoriesSnapshot = await getDocs(categoriesQuery);
      
      if (categoriesSnapshot.empty) {
        // Try finding by ID if slug doesn't match
        const categoryDoc = await getDoc(doc(db, "categories", slug));
        if (categoryDoc.exists()) {
          const categoryData = { categoryId: categoryDoc.id, ...categoryDoc.data() } as Category;
          setCategory(categoryData);
          await loadProducts(categoryDoc.id);
        } else {
          setCategory(null);
        }
      } else {
        const categoryDoc = categoriesSnapshot.docs[0];
        const categoryData = { categoryId: categoryDoc.id, ...categoryDoc.data() } as Category;
        setCategory(categoryData);
        await loadProducts(categoryDoc.id);
      }
    } catch (error) {
      console.error("Error loading category:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async (categoryId: string) => {
    try {
      const productsQuery = query(
        collection(db, "store_items"),
        where("categoryId", "==", categoryId),
        where("status", "==", "active")
      );
      const productsSnapshot = await getDocs(productsQuery);
      const productsData: StoreItem[] = [];
      
      productsSnapshot.forEach((doc) => {
        const data = doc.data();
        productsData.push({
          itemId: doc.id,
          ...data,
        } as StoreItem);
      });
      
      setProducts(productsData);
      
      // Get signed URLs for all product images
      const imageUrlMap: Record<string, string> = {};
      for (const product of productsData) {
        const images = product.images || (product as any).image 
          ? (Array.isArray(product.images || (product as any).image) 
              ? (product.images || (product as any).image) 
              : [product.images || (product as any).image])
          : [];
        if (images.length > 0) {
          try {
            const firstImage = Array.isArray(images[0]) ? images[0][0] : images[0];
            const signedUrl = await getSignedImageUrl(firstImage);
            imageUrlMap[product.itemId] = signedUrl;
          } catch (error) {
            console.error(`Error getting signed URL for product ${product.itemId}:`, error);
            const firstImage = Array.isArray(images[0]) ? images[0][0] : images[0];
            imageUrlMap[product.itemId] = firstImage;
          }
        }
      }
      setProductImageUrls(imageUrlMap);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <NotificationStrip />
        <CategoryNavigation />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading category...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <NotificationStrip />
        <CategoryNavigation />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <NotificationStrip />
      <CategoryNavigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-gray-600 text-lg">{category.description}</p>
          )}
          <p className="text-gray-500 mt-2">
            {products.length} {products.length === 1 ? "product" : "products"} found
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg mb-4">No products found in this category.</p>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Browse all products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.itemId}
                href={`/item/${product.itemId}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Product Image */}
                <div className="aspect-square bg-gray-200 relative overflow-hidden">
                  {(() => {
                    // Handle both new and old field names, and both array and single image
                    const images = product.images || (product as any).image 
                      ? (Array.isArray(product.images || (product as any).image) 
                          ? (product.images || (product as any).image) 
                          : [product.images || (product as any).image])
                      : [];
                    const firstImageRaw = images[0];
                    const firstImage = Array.isArray(firstImageRaw) ? firstImageRaw[0] : firstImageRaw;
                    // Use signed URL if available, otherwise use original
                    const imageUrl = productImageUrls[product.itemId] || firstImage;
                    
                    return imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image fails to load
                          (e.target as HTMLImageElement).style.display = 'none';
                          const parent = (e.target as HTMLImageElement).parentElement;
                          if (parent) {
                            parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400"><svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>';
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    );
                  })()}
                  {product.itemType && (
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded uppercase">
                      {product.itemType.replace("_", " ")}
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  {product.shortDescription && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.shortDescription}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      {product.compareAtPrice && product.compareAtPrice > product.basePrice && (
                        <span className="text-sm text-gray-500 line-through mr-2">
                          ₹{product.compareAtPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-xl font-bold text-blue-600">
                        ₹{product.basePrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  {product.trackInventory && product.stockQuantity !== undefined && (
                    <p className="text-xs text-gray-500 mt-2">
                      {product.stockQuantity > 0 ? (
                        <span className="text-green-600">{product.stockQuantity} in stock</span>
                      ) : (
                        <span className="text-red-600">Out of stock</span>
                      )}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

