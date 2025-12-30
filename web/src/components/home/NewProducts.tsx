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
};

export function NewProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      console.log("Loading new products from Firestore...");
      
      // Get ALL products first (no status filter) to ensure we see everything
      // Then filter and sort in memory
      console.log("Fetching all products from store_items collection...");
      const snapshot = await getDocs(collection(db, "store_items"));
      console.log(`Found ${snapshot.size} products in store_items collection`);
      
      const productsData: Array<Product & { createdAt?: any; created_at?: any }> = [];
      const docsMap = new Map();
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        docsMap.set(doc.id, { doc, data });
        
        console.log(`Product ${doc.id}:`, {
          title: data.title || data.name,
          status: data.status,
          itemType: data.itemType || data.type,
          price: data.price || data.basePrice,
          hasImage: !!(data.image || data.images?.[0] || data.thumbnailImage)
        });
        
        // Include if status is active, draft, or missing (default to active)
        // Show draft products too so admin can preview before publishing
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
            createdAt: data.createdAt,
            created_at: data.created_at,
          });
        } else {
          console.log(`Skipping product ${doc.id} - status: ${data.status}`);
        }
      });

      // Sort by createdAt (newest first)
      productsData.sort((a, b) => {
        const aTime = a.createdAt?.toMillis?.() || 
                     a.created_at?.toMillis?.() || 
                     a.createdAt?.seconds * 1000 ||
                     a.created_at?.seconds * 1000 || 0;
        const bTime = b.createdAt?.toMillis?.() || 
                     b.created_at?.toMillis?.() || 
                     b.createdAt?.seconds * 1000 ||
                     b.created_at?.seconds * 1000 || 0;
        return bTime - aTime; // Newest first
      });

      // Limit to 6
      const finalProducts = productsData.slice(0, 6);
      console.log(`Displaying ${finalProducts.length} products:`, finalProducts.map(p => p.title));
      
      if (finalProducts.length === 0 && snapshot.size > 0) {
        console.warn("⚠️ Products exist in Firestore but none match the display criteria!");
        console.warn("All products found:", Array.from(snapshot.docs).map(d => ({
          id: d.id,
          title: d.data().title || d.data().name,
          status: d.data().status,
          itemType: d.data().itemType || d.data().type,
          allFields: Object.keys(d.data())
        })));
      }
      
      setProducts(finalProducts);
    } catch (error: any) {
      console.error("❌ Error loading new products:", error);
      console.error("Error code:", error?.code);
      console.error("Error message:", error?.message);
      
      // Check if it's a permissions error
      if (error?.code === "permission-denied") {
        console.error("🚫 Firestore permission denied! Check your Firestore security rules.");
        console.error("Make sure 'store_items' collection allows read access for unauthenticated users or authenticated users.");
      }
      
      // Try to get all products without any filters as last resort
      try {
        console.log("Attempting fallback query...");
        const allSnapshot = await getDocs(collection(db, "store_items"));
        console.log(`Fallback: Found ${allSnapshot.size} total products`);
        const productsData: Product[] = [];
        allSnapshot.forEach((doc) => {
          const data = doc.data();
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
          });
        });
        // Sort by createdAt if available
        productsData.sort((a, b) => 0); // Simple sort
        setProducts(productsData.slice(0, 6));
      } catch (fallbackError: any) {
        console.error("❌ Complete fallback also failed:", fallbackError);
        console.error("Fallback error code:", fallbackError?.code);
        console.error("Fallback error message:", fallbackError?.message);
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
        No new products available at the moment.
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
            <span className="text-xs text-green-600 font-semibold uppercase">New</span>
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




