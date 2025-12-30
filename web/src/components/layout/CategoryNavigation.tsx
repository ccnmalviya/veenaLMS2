"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import type { Category } from "@/types/store";

export function CategoryNavigation() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      // Try with orderBy first (requires composite index)
      let q;
      let snapshot;
      let categoriesData: Category[] = [];
      
      try {
        q = query(
          collection(db, "categories"),
          where("status", "==", "active"),
          orderBy("orderIndex", "asc")
        );
        snapshot = await getDocs(q);
      } catch (error: any) {
        console.warn("Index error, trying fallback query:", error);
        
        // If query fails due to missing index, try without orderBy
        try {
          q = query(
            collection(db, "categories"),
            where("status", "==", "active")
          );
          snapshot = await getDocs(q);
        } catch (fallbackError: any) {
          // If that also fails, get all categories and filter client-side
          console.warn("Status filter failed, getting all categories:", fallbackError);
          q = query(collection(db, "categories"));
          snapshot = await getDocs(q);
        }
      }
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Include if status is active or if status field doesn't exist (default to active)
        if (!data.status || data.status === "active") {
          categoriesData.push({ 
            categoryId: doc.id, 
            ...data,
            orderIndex: data.orderIndex || 999,
            status: data.status || "active"
          } as Category);
        }
      });
      
      // Sort manually
      categoriesData.sort((a, b) => (a.orderIndex || 999) - (b.orderIndex || 999));
      setCategories(categoriesData);
      console.log("✅ Categories loaded:", categoriesData.length, categoriesData);
    } catch (error: any) {
      console.error("❌ Error loading categories:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Always render the component so it's visible
  return (
    <div className="bg-white border-b-2 border-gray-300 shadow-md py-4">
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex items-center justify-center py-2">
            <span className="text-sm text-gray-600">Loading categories...</span>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex items-center justify-center py-2">
            <span className="text-sm text-gray-600 bg-yellow-50 px-4 py-2 rounded border border-yellow-200">
              No categories found. <a href="/admin/store-items/categories/new" className="text-blue-600 underline">Create categories in admin panel</a>
            </span>
          </div>
        ) : (
          <nav className="flex items-center gap-4 md:gap-6 overflow-x-auto pb-1 hide-scrollbar">
            {categories.map((category) => (
              <Link
                key={category.categoryId}
                href={`/category/${category.slug || category.categoryId}`}
                className="text-sm md:text-base font-semibold text-gray-800 hover:text-blue-600 whitespace-nowrap transition-colors px-3 py-2 rounded-md hover:bg-blue-50 flex-shrink-0 border border-transparent hover:border-blue-200"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}

