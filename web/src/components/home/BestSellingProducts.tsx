"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
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
  salesCount?: number;
  sales_count?: number;
};

export function BestSellingProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      // Get ALL products first, then filter and sort in memory
      console.log("Fetching all products for best sellers...");
      const snapshot = await getDocs(collection(db, "store_items"));
      console.log(`Found ${snapshot.size} products in store_items collection`);
      
      const productsData: Product[] = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`Product ${doc.id}:`, {
          title: data.title || data.name,
          status: data.status,
          salesCount: data.salesCount || data.sales_count
        });
        
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
            salesCount: data.salesCount || data.sales_count || 0,
            sales_count: data.sales_count || data.salesCount || 0,
          });
        }
      });

      // Sort by sales count if not already sorted
      productsData.sort((a, b) => {
        const salesA = a.salesCount || a.sales_count || 0;
        const salesB = b.salesCount || b.sales_count || 0;
        return salesB - salesA;
      });

      // Limit to 6
      setProducts(productsData.slice(0, 6));
    } catch (error) {
      console.error("Error loading best selling products:", error);
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
        No best selling products available at the moment.
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
            <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold">
              🔥 Best Seller
            </span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mt-2 line-clamp-2">{item.title}</h3>
            <p className="text-sm text-gray-500">
              {(item.salesCount || item.sales_count || 0)}+ sold
            </p>
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




