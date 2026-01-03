"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { S3Image } from "@/components/common/S3Image";

type Product = {
  id: string;
  title: string;
  itemType?: string;
  type?: string;
  price: number;
  discountPrice?: number;
  image?: string;
  images?: string[];
  status?: string;
  featured?: boolean;
};

function RecommendedProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.trim() || "";

  useEffect(() => {
    loadProducts();
    // Re-run whenever search query changes so recommendations refresh
  }, [search]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      // Get ALL products first, then filter and sort in memory
      console.log("Fetching all products for recommendations...");
      const snapshot = await getDocs(collection(db, "store_items"));
      const productsData: Product[] = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Include if status is active, draft, or missing
        if (!data.status || data.status === "active" || data.status === "draft") {
          productsData.push({
            id: doc.id,
            title: data.title || data.name || "Untitled",
            itemType: data.itemType || data.type,
            type: data.type || data.itemType,
            price: data.price || 0,
            discountPrice: data.discountPrice || data.discount_price,
            image: data.image || data.images?.[0],
            images: data.images,
            status: data.status || "active",
            featured: data.featured || false,
          });
        }
      });

      const MAX_RECOMMENDATIONS = 6;
      let finalProducts: Product[] = [];

      // If user searched something, bias recommendations to that search
      if (search) {
        const queryLower = search.toLowerCase();

        // 1) Products that match the search
        const searchMatches = productsData.filter((p) => {
          const title = (p.title || "").toLowerCase();
          const type = (p.type || p.itemType || "").toLowerCase();
          return title.includes(queryLower) || type.includes(queryLower);
        });

        const selected: Product[] = [];
        const usedIds = new Set<string>();

        // Add up to MAX_RECOMMENDATIONS matching search
        for (const p of searchMatches) {
          if (selected.length >= MAX_RECOMMENDATIONS) break;
          if (!usedIds.has(p.id)) {
            selected.push(p);
            usedIds.add(p.id);
          }
        }

        // 2) Fill remaining slots with other products (no duplicates)
        if (selected.length < MAX_RECOMMENDATIONS) {
          for (const p of productsData) {
            if (selected.length >= MAX_RECOMMENDATIONS) break;
            if (!usedIds.has(p.id)) {
              selected.push(p);
              usedIds.add(p.id);
            }
          }
        }

        finalProducts = selected;
      } else {
        // No search term – keep original behaviour (featured → first products)
        const featuredProducts = productsData.filter((p) => p.featured);
        finalProducts =
          featuredProducts.length >= 3
            ? featuredProducts.slice(0, MAX_RECOMMENDATIONS)
            : productsData.slice(0, MAX_RECOMMENDATIONS);
      }

      console.log(`Displaying ${finalProducts.length} recommended products`);
      setProducts(finalProducts);
    } catch (error) {
      console.error("Error loading recommended products:", error);
      // Fallback: get all products without filter
      try {
        const q = query(collection(db, "store_items"), limit(12));
        const snapshot = await getDocs(q);
        const productsData: Product[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          productsData.push({
            id: doc.id,
            title: data.title || data.name || "Untitled",
            itemType: data.itemType || data.type,
            type: data.type || data.itemType,
            price: data.price || 0,
            discountPrice: data.discountPrice || data.discount_price,
            image: data.image || data.images?.[0],
            images: data.images,
            status: data.status || "active",
            featured: data.featured || false,
          });
        });
        setProducts(productsData.slice(0, 6));
      } catch (fallbackError) {
        console.error("Fallback query also failed:", fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No recommended products available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((item) => (
        <Link
          key={item.id}
          href={`/item/${item.id}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <div className="h-48 bg-gray-200 relative">
            {item.image ? (
              <S3Image
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          <div className="p-4">
            <span className="text-xs text-purple-600 font-semibold uppercase">Recommended</span>
            <h3 className="font-semibold text-lg mt-2 line-clamp-2">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-1 capitalize">{item.type || item.itemType || "Product"}</p>
            <div className="mt-2 flex items-center gap-2">
              {item.discountPrice ? (
                <>
                  <span className="text-xl font-bold text-gray-900">
                    {formatPrice(item.discountPrice)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(item.price)}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(item.price)}
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function RecommendedProducts() {
  return (
    <Suspense fallback={
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    }>
      <RecommendedProductsContent />
    </Suspense>
  );
}




