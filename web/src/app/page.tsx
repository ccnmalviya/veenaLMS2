"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import type { SiteSettings } from "@/types/siteSettings";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if shop is enabled
    const settingsRef = doc(db, "site_settings", "global");
    
    const unsubscribe = onSnapshot(settingsRef, (snapshot) => {
      if (snapshot.exists()) {
        const settings = snapshot.data() as SiteSettings;
        const shopEnabled = settings.shopEnabled || false;
        
        if (shopEnabled) {
          // Shop is enabled, stay on shop page
          // Don't redirect, let the existing shop page load
        } else {
          // Shop is disabled, redirect to classes
          router.replace("/classes");
        }
      } else {
        // No settings found, default to classes page
        router.replace("/classes");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Show loading state while checking settings
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
