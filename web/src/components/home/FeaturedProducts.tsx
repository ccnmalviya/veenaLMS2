"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      // Get ALL products first, then filter and sort in memory
      console.log("Fetching all products for featured...");
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
            price: data.price || data.basePrice || 0,
            discountPrice: data.discountPrice || data.discount_price || data.compareAtPrice,
            image: data.image || data.images?.[0] || data.thumbnailImage,
            images: data.images,
            status: data.status || "active",
            featured: data.featured || false,
          });
        }
      });

      // Filter for featured if we got all products
      const featuredProducts = productsData.filter(p => p.featured);
      const finalProducts = featuredProducts.length >= 3 
        ? featuredProducts.slice(0, 6)
        : productsData.slice(0, 6);

      console.log(`Displaying ${finalProducts.length} featured products`);
      setProducts(finalProducts);
    } catch (error) {
      console.error("Error loading featured products:", error);
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
              <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
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
        No featured products available at the moment.
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
            <span className="text-xs text-blue-600 font-semibold uppercase">
              {item.type || item.itemType || "Product"}
            </span>
            <h3 className="font-semibold text-lg mt-2 line-clamp-2">{item.title}</h3>
            <div className="mt-2 flex items-center gap-2">
              {item.discountPrice ? (
                <>
                  <span className="text-gray-500 line-through">
                    {formatPrice(item.price)}
                  </span>
                  <span className="text-xl font-bold text-blue-600">
                    {formatPrice(item.discountPrice)}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-blue-600">
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




