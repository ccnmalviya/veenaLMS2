"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

type HomepageOffer = {
  id: string;
  title: string;
  subtitle: string;
  discount: number;
  expiresAt: string;
  ctaLabel: string;
  ctaUrl: string;
  videoUrl?: string;
  enabled: boolean;
  displayOrder: number;
};

// Default shopping-related video URLs (can be replaced by admin)
// Using reliable sample videos from Google's test bucket
const DEFAULT_SHOPPING_VIDEOS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Sample video 1
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", // Sample video 2
];

const DEFAULT_OFFERS: HomepageOffer[] = [
  {
    id: "1",
    title: "Flash Sale: 50% Off",
    subtitle: "All courses this week",
    discount: 50,
    expiresAt: "2024-12-31",
    ctaLabel: "Shop Now",
    ctaUrl: "/offers/1",
    videoUrl: DEFAULT_SHOPPING_VIDEOS[0],
    enabled: true,
    displayOrder: 1,
  },
  {
    id: "2",
    title: "Buy 2 Get 1 Free",
    subtitle: "On selected workshops",
    discount: 33,
    expiresAt: "2024-12-25",
    ctaLabel: "Shop Now",
    ctaUrl: "/offers/2",
    videoUrl: DEFAULT_SHOPPING_VIDEOS[1],
    enabled: true,
    displayOrder: 2,
  },
];

export function OffersPromotions() {
  // Start with the original hard-coded orange cards
  const [offers, setOffers] = useState<HomepageOffer[]>(DEFAULT_OFFERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        setLoading(true);
        // Simple fetch: get all docs, then filter/sort in memory (avoids index issues)
        const snapshot = await getDocs(collection(db, "homepage_offers"));
        const data: HomepageOffer[] = [];
        snapshot.forEach((d) => {
          const docData = d.data() as any;
          data.push({
            id: d.id || "",
            title: docData.title || "",
            subtitle: docData.subtitle || "",
            discount: Number(docData.discount) || 0,
            expiresAt: docData.expiresAt || "",
            ctaLabel: docData.ctaLabel || "Shop Now",
            ctaUrl: docData.ctaUrl || "/",
            videoUrl: docData.videoUrl || "",
            enabled: docData.enabled !== false,
            displayOrder: docData.displayOrder ?? 1,
          });
        });
        // Only keep enabled cards, sort by displayOrder
        const enabled = data
          .filter((card) => card.enabled)
          .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        
        // Always ensure we have exactly 2 cards with videos
        let finalOffers: HomepageOffer[] = [];
        if (enabled.length >= 2) {
          // Use first 2 from Firestore, ensure videos are set
          finalOffers = enabled.slice(0, 2).map((offer, idx) => ({
            ...offer,
            videoUrl: offer.videoUrl || DEFAULT_SHOPPING_VIDEOS[idx] || DEFAULT_SHOPPING_VIDEOS[0],
          }));
        } else if (enabled.length === 1) {
          // Use the one from Firestore + one default (with video if missing)
          const first = {
            ...enabled[0],
            videoUrl: enabled[0].videoUrl || DEFAULT_SHOPPING_VIDEOS[0],
          };
          const second = {
            ...DEFAULT_OFFERS[1],
            videoUrl: DEFAULT_OFFERS[1].videoUrl || DEFAULT_SHOPPING_VIDEOS[1],
          };
          finalOffers = [first, second];
        } else {
          // Use both defaults (ensure videos are set)
          finalOffers = DEFAULT_OFFERS.map((offer, idx) => ({
            ...offer,
            videoUrl: offer.videoUrl || DEFAULT_SHOPPING_VIDEOS[idx] || DEFAULT_SHOPPING_VIDEOS[0],
          }));
        }
        
        setOffers(finalOffers);
      } catch (error) {
        console.error("Error loading homepage offers:", error);
        // On error, use defaults
        setOffers(DEFAULT_OFFERS);
      } finally {
        setLoading(false);
      }
    };

    loadOffers();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-lg p-8 relative overflow-hidden animate-pulse"
          >
            <div className="h-32"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {offers.slice(0, 2).map((offer, index) => {
        const videoUrl = offer.videoUrl || DEFAULT_SHOPPING_VIDEOS[index] || DEFAULT_SHOPPING_VIDEOS[0];
        return (
          <div
            key={offer.id}
            className="bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-lg p-8 relative overflow-hidden shadow-lg min-h-[300px]"
          >
            {/* Video Background */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0.4 }}
              onError={(e) => {
                console.error("Video failed to load:", videoUrl);
                // Fallback to default if video fails
                const videoElement = e.target as HTMLVideoElement;
                if (videoElement.src !== DEFAULT_SHOPPING_VIDEOS[0]) {
                  videoElement.src = DEFAULT_SHOPPING_VIDEOS[0];
                }
              }}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/70 to-orange-500/70 z-0" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="text-5xl font-bold mb-2 drop-shadow-lg">{offer.discount}% OFF</div>
              <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">{offer.title}</h3>
              <p className="text-lg opacity-90 mb-4 drop-shadow">{offer.subtitle}</p>
              <Link
                href={offer.ctaUrl || "/"}
                className="inline-block px-6 py-2 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
              >
                {offer.ctaLabel || "Shop Now"}
              </Link>
              {offer.expiresAt && (
                <p className="text-sm mt-4 opacity-90 drop-shadow">Expires: {offer.expiresAt}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}




