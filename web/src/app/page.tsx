"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import type { SiteSettings } from "@/types/siteSettings";
import { HeroBanner } from "@/components/home/HeroBanner";
import { NotificationStrip } from "@/components/home/NotificationStrip";
import { PromoRow } from "@/components/home/PromoRow";
import { LiveStrip } from "@/components/home/LiveStrip";
import { NewProducts } from "@/components/home/NewProducts";
import { ProductCategories } from "@/components/home/ProductCategories";
import { BestSellingProducts } from "@/components/home/BestSellingProducts";
import { RecommendedProducts } from "@/components/home/RecommendedProducts";
import { OffersPromotions } from "@/components/home/OffersPromotions";
import { NewsletterSubscription } from "@/components/home/NewsletterSubscription";
import { Header } from "@/components/layout/Header";
import { CategoryNavigation } from "@/components/layout/CategoryNavigation";
import { Testimonials } from "@/components/common/Testimonials";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  const router = useRouter();
  const [shopEnabled, setShopEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if shop is enabled
    const settingsRef = doc(db, "site_settings", "global");
    
    const unsubscribe = onSnapshot(settingsRef, (snapshot) => {
      if (snapshot.exists()) {
        const settings = snapshot.data() as SiteSettings;
        const enabled = settings.shopEnabled || false;
        setShopEnabled(enabled);
        
        if (!enabled) {
          // Shop is disabled, redirect to classes
          router.replace("/classes");
        }
      } else {
        // No settings found, default to classes page
        setShopEnabled(false);
        router.replace("/classes");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Show loading while checking settings
  if (shopEnabled === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If shop is enabled, show shop page
  if (shopEnabled) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <Header />
        <main>
          {/* Top thin notification bar */}
          <NotificationStrip />

          {/* Category Navigation Links */}
          <CategoryNavigation />

          {/* Hero section matching design */}
          <HeroBanner />

          {/* Two promotional cards row */}
          <PromoRow />

          {/* Live classes strip */}
          <LiveStrip />

          {/* Categories horizontal strip */}
          <ProductCategories />

          {/* New Arrivals */}
          <section className="bg-white py-10">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">New Arrivals</h2>
              <NewProducts />
            </div>
          </section>

          {/* Best Sellers */}
          <section className="bg-white py-10">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">Best Sellers</h2>
              <BestSellingProducts />
            </div>
          </section>

          {/* Recommended Products */}
          <section className="bg-white py-10">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
              <RecommendedProducts />
            </div>
          </section>

          {/* Offers & Promotions */}
          <OffersPromotions />

          {/* Testimonials */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <Testimonials />
            </div>
          </section>

          {/* Newsletter */}
          <NewsletterSubscription />
        </main>
        <Footer />
      </div>
    );
  }

  // Otherwise redirect is happening
  return null;
}
