"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import type { Category } from "@/types/store";

export function ProductCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      console.log("Loading categories from Firestore...");
      
      // Get ALL categories first, then filter and sort in memory
      // This ensures we see everything regardless of status field
      console.log("Fetching all categories from categories collection...");
      const snapshot = await getDocs(collection(db, "categories"));

      console.log(`Found ${snapshot.size} categories in Firestore`);
      const categoriesData: Category[] = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`Category ${doc.id}:`, {
          name: data.name,
          status: data.status,
          orderIndex: data.orderIndex
        });
        
        // Include if status is active or if status field doesn't exist (default to active)
        if (!data.status || data.status === "active") {
          categoriesData.push({
            categoryId: doc.id,
            ...data,
            orderIndex: data.orderIndex || 999,
            status: data.status || "active",
          } as Category);
        } else {
          console.log(`Skipping category ${doc.id} - status: ${data.status}`);
        }
      });

      // Sort by orderIndex
      categoriesData.sort((a, b) => (a.orderIndex || 999) - (b.orderIndex || 999));
      
      console.log(`Displaying ${categoriesData.length} active categories:`, categoriesData.map(c => c.name));
      
      if (categoriesData.length === 0 && snapshot.size > 0) {
        console.warn("⚠️ Categories exist in Firestore but none match the display criteria!");
        console.warn("All categories found:", Array.from(snapshot.docs).map(d => ({
          id: d.id,
          name: d.data().name,
          status: d.data().status,
          allFields: Object.keys(d.data())
        })));
      }
      
      setCategories(categoriesData);
      
      // Load item counts for each category
      loadItemCounts(categoriesData);
    } catch (error: any) {
      console.error("❌ Error loading categories:", error);
      console.error("Error code:", error?.code);
      console.error("Error message:", error?.message);
      
      // Check if it's a permissions error
      if (error?.code === "permission-denied") {
        console.error("🚫 Firestore permission denied! Check your Firestore security rules.");
        console.error("Make sure 'categories' collection allows read access for unauthenticated users or authenticated users.");
      }
      
      console.error("Full error:", JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const loadItemCounts = async (cats: Category[]) => {
    try {
      // Get all store items
      const itemsSnapshot = await getDocs(collection(db, "store_items"));
      const counts: Record<string, number> = {};
      
      itemsSnapshot.forEach((doc) => {
        const data = doc.data();
        const categoryId = data.categoryId || data.category;
        if (categoryId) {
          counts[categoryId] = (counts[categoryId] || 0) + 1;
        }
      });
      
      setItemCounts(counts);
    } catch (error) {
      console.error("Error loading item counts:", error);
    }
  };

  if (loading) {
    return (
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-4">Our Categories</h2>
          <div className="text-center py-4 text-gray-500">Loading categories...</div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-4">Our Categories</h2>
          <div className="text-center py-4 text-yellow-600 bg-yellow-50 px-4 py-2 rounded border border-yellow-200">
            No categories found. <a href="/admin/store-items/categories/new" className="text-blue-600 underline">Create categories in admin panel</a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold mb-4">Our Categories</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Link
              key={cat.categoryId}
              href={`/category/${cat.slug || cat.categoryId}`}
              className="min-w-[140px] bg-gray-100 rounded-2xl px-4 py-3 flex flex-col justify-center hover:bg-gray-200 transition"
            >
              <span className="text-sm font-semibold text-gray-900">
                {cat.name}
              </span>
              <span className="text-[11px] text-gray-500">
                {itemCounts[cat.categoryId] || 0} items
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

