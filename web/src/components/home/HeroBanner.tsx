"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { S3Image } from "@/components/common/S3Image";
import { getSignedImageUrl } from "@/lib/s3ImageHelper";
import type { HeroBanner } from "@/types/heroBanner";

export function HeroBanner() {
  const [heroBanners, setHeroBanners] = useState<HeroBanner[]>([]);
  const [heroImageUrls, setHeroImageUrls] = useState<Record<string, string>>({});
  const [backgroundImageUrls, setBackgroundImageUrls] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadHeroBanners();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (heroBanners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % heroBanners.length;
        return nextIndex;
      });
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroBanners.length]);

  // Debug logging - must be before any early returns
  useEffect(() => {
    if (heroBanners.length > 0) {
      console.log("Hero banners loaded:", heroBanners.length, heroBanners);
    }
  }, [heroBanners]);

  const loadHeroBanners = async () => {
    try {
      // Get ALL hero banners first, then filter and sort in memory
      // This ensures we see everything regardless of enabled/status fields
      console.log("Fetching all hero banners from hero_banners collection...");
      const snapshot = await getDocs(collection(db, "hero_banners"));
      
      const bannersData: HeroBanner[] = [];
      console.log(`Found ${snapshot.size} hero banners in Firestore`);
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`Hero Banner ${doc.id}:`, {
          heroName: data.heroName,
          enabled: data.enabled,
          status: data.status,
          displayOrder: data.displayOrder,
          mainHeading: data.mainHeading
        });
        
        // Include if enabled is true (or missing, default to true) and status is active (or missing, default to active)
        const enabled = data.enabled !== undefined ? data.enabled : true;
        const status = data.status || "active";
        
        if (enabled && status === "active") {
          bannersData.push({
            heroId: doc.id,
            ...data,
            enabled: enabled,
            status: status,
            displayOrder: data.displayOrder || 999,
          } as HeroBanner);
        } else {
          console.log(`Skipping banner ${doc.id} - enabled: ${enabled}, status: ${status}`);
        }
      });
      
      console.log(`Displaying ${bannersData.length} active hero banners`);
      
      if (bannersData.length === 0 && snapshot.size > 0) {
        console.warn("⚠️ Hero banners exist in Firestore but none match the display criteria!");
        console.warn("All banners found:", Array.from(snapshot.docs).map(d => ({
          id: d.id,
          heroName: d.data().heroName,
          enabled: d.data().enabled,
          status: d.data().status,
          displayOrder: d.data().displayOrder,
          mainHeading: d.data().mainHeading,
          allFields: Object.keys(d.data())
        })));
        console.warn("Expected: enabled=true (or undefined) AND status='active' (or undefined)");
      }
      
      // Sort by displayOrder
      bannersData.sort((a, b) => (a.displayOrder || 999) - (b.displayOrder || 999));
      
      if (bannersData.length > 0) {
        setHeroBanners(bannersData);
        loadAllImageUrls(bannersData);
      } else {
        console.log("No active hero banner found. Check that banner has enabled=true and status='active'");
        // Try to find any banner for debugging
        const allBannersQuery = query(collection(db, "hero_banners"), limit(5));
        const allSnapshot = await getDocs(allBannersQuery);
        console.log("All banners in collection:", allSnapshot.docs.map(d => ({
          id: d.id,
          enabled: d.data().enabled,
          status: d.data().status,
          displayOrder: d.data().displayOrder,
          mainHeading: d.data().mainHeading
        })));
      }
    } catch (error: any) {
      console.error("❌ Error loading hero banners:", error);
      console.error("Error code:", error?.code);
      console.error("Error message:", error?.message);
      
      // Check if it's a permissions error
      if (error?.code === "permission-denied") {
        console.error("🚫 Firestore permission denied! Check your Firestore security rules.");
        console.error("Make sure 'hero_banners' collection allows read access for unauthenticated users or authenticated users.");
      }
      
      if (error.code === "failed-precondition") {
        console.error("Firestore index required. Please create a composite index for:");
        console.error("Collection: hero_banners");
        console.error("Fields: enabled (Ascending), status (Ascending), displayOrder (Ascending)");
      }
    } finally {
      setLoading(false);
    }
  };

  const loadAllImageUrls = async (banners: HeroBanner[]) => {
    const heroUrls: Record<string, string> = {};
    const bgUrls: Record<string, string> = {};

    try {
      await Promise.all(
        banners.map(async (banner) => {
          // Load signed URL for hero image
          if (banner.heroImage) {
            try {
              const signedUrl = await getSignedImageUrl(banner.heroImage);
              heroUrls[banner.heroId] = signedUrl;
            } catch (error) {
              console.error(`Error loading hero image for ${banner.heroId}:`, error);
              heroUrls[banner.heroId] = banner.heroImage; // Fallback
            }
          }

          // Load signed URL for background image if different
          if (banner.backgroundImage && banner.backgroundImage !== banner.heroImage) {
            try {
              const signedUrl = await getSignedImageUrl(banner.backgroundImage);
              bgUrls[banner.heroId] = signedUrl;
            } catch (error) {
              console.error(`Error loading background image for ${banner.heroId}:`, error);
              bgUrls[banner.heroId] = banner.backgroundImage; // Fallback
            }
          }
        })
      );

      setHeroImageUrls(heroUrls);
      setBackgroundImageUrls(bgUrls);
    } catch (error) {
      console.error("Error loading image URLs:", error);
    }
  };

  const getActionUrl = (cta: HeroBanner["primaryCta"] | HeroBanner["secondaryCta"]) => {
    if (!cta) return "#";
    
    switch (cta.actionType) {
      case "url":
        return cta.actionTarget;
      case "page":
        return cta.actionTarget;
      case "category":
        return `/category/${cta.actionTarget}`;
      case "product":
      case "course":
        return `/item/${cta.actionTarget}`;
      default:
        return "#";
    }
  };

  const getButtonClasses = (style: string) => {
    switch (style) {
      case "primary":
        return "inline-flex items-center justify-center px-6 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-900 transition";
      case "secondary":
        return "inline-flex items-center justify-center px-6 py-3 rounded-full bg-gray-200 text-gray-900 text-sm font-semibold hover:bg-gray-300 transition";
      case "outline":
        return "inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-300 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition";
      default:
        return "inline-flex items-center justify-center px-6 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-900 transition";
    }
  };

  const getBackgroundStyle = (banner: HeroBanner) => {
    const styles: React.CSSProperties = {};
    
    // Use the signed URL for hero image (or fallback to original)
    const imageUrl = heroImageUrls[banner.heroId] || banner.heroImage;
    const bgImageUrl = backgroundImageUrls[banner.heroId] || banner.backgroundImage;
    
    // Hero image always goes in background
    if (imageUrl) {
      styles.backgroundImage = `url(${imageUrl})`;
      styles.backgroundSize = "cover";
      styles.backgroundPosition = "center";
      styles.backgroundRepeat = "no-repeat";
    }
    
    // Handle background type overlay
    switch (banner.backgroundType) {
      case "solid":
        if (banner.backgroundColor) {
          // Add overlay with solid color
          if (imageUrl) {
            // Use linear gradient overlay to blend image with color
            styles.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${imageUrl})`;
          } else {
            styles.backgroundColor = banner.backgroundColor;
          }
        } else {
          styles.backgroundColor = imageUrl ? "transparent" : "#f5f5f5";
        }
        break;
      case "gradient":
        if (banner.backgroundGradient && imageUrl) {
          // Overlay dark gradient on image for better text readability
          styles.backgroundImage = `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${imageUrl})`;
        }
        break;
      case "image":
        // Use backgroundImage as overlay or replacement
        if (bgImageUrl) {
          styles.backgroundImage = `url(${bgImageUrl})`;
          styles.backgroundSize = "cover";
          styles.backgroundPosition = "center";
        } else if (imageUrl) {
          // Fallback to hero image
          styles.backgroundImage = `url(${imageUrl})`;
          styles.backgroundSize = "cover";
          styles.backgroundPosition = "center";
        }
        break;
      default:
        if (!imageUrl) {
          styles.backgroundColor = "#f5f5f5";
        }
    }
    
    return styles;
  };

  const getBackgroundClasses = (banner: HeroBanner) => {
    let classes = "";
    
    // Add gradient classes if background type is gradient
    if (banner.backgroundType === "gradient" && banner.backgroundGradient) {
      classes = `bg-gradient-to-r ${banner.backgroundGradient}`;
    }
    
    // Add overlay class for better text readability over background images
    if (banner.heroImage || banner.backgroundType === "image") {
      classes += " relative";
    }
    
    return classes;
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < heroBanners.length) {
      setCurrentIndex(index);
    }
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted || loading) {
    return null;
  }

  if (heroBanners.length === 0) {
    // Show debug info in development mode
    if (process.env.NODE_ENV === "development") {
      return (
        <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 m-4">
          <p className="text-sm text-yellow-800">
            ⚠️ No active hero banner found. Check that:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Banner has <code>enabled: true</code></li>
              <li>Banner has <code>status: "active"</code></li>
              <li>Check browser console for details</li>
            </ul>
          </p>
        </section>
      );
    }
    return null; // No hero banner configured
  }

  return (
    <section className="relative min-h-[500px] md:min-h-[600px] overflow-hidden">
      {/* Slider container */}
      <div 
        className="flex transition-transform duration-700 ease-in-out"
        style={{ 
          transform: `translateX(-${(currentIndex * 100) / heroBanners.length}%)`,
          width: `${heroBanners.length * 100}%`
        }}
      >
        {heroBanners.map((banner, index) => {
          const backgroundStyle = getBackgroundStyle(banner);
          const hasBgImage = !!(heroImageUrls[banner.heroId] || banner.heroImage);
          
          // Calculate text colors for this specific banner
          const bannerTextColorClass = hasBgImage 
            ? "text-white" 
            : (banner.themeMode === "dark" ? "text-white" : "text-gray-900");
          const bannerTextSecondaryColorClass = hasBgImage 
            ? "text-white/90" 
            : (banner.themeMode === "dark" ? "text-gray-200" : "text-gray-600");
          
            return (
              <div
                key={banner.heroId}
                className={`${getBackgroundClasses(banner)} relative flex items-center flex-shrink-0`}
                style={{
                  ...backgroundStyle,
                  minHeight: '500px',
                  width: `${100 / heroBanners.length}%`
                }}
              >
                {/* Dark overlay for text readability over background image */}
                {hasBgImage && (
                  <div className="absolute inset-0 bg-black/40"></div>
                )}
                
                {/* Content floating above the background image - Left aligned */}
                <div className="w-full h-full flex items-center relative z-10">
                  <div className="container mx-auto px-4 py-10 md:py-20 w-full">
                    <div className="max-w-2xl text-left">
                      {banner.eyebrowText && (
                        <div className={`text-xs font-semibold uppercase mb-3 tracking-wide ${bannerTextColorClass} drop-shadow-lg`}>
                          {banner.eyebrowText}
                        </div>
                      )}
                      <h1 className={`text-4xl md:text-6xl font-extrabold ${bannerTextColorClass} drop-shadow-lg leading-tight mb-4`}>
                        {banner.mainHeading}
                      </h1>
                      {banner.subheading && (
                        <p className={`text-base md:text-lg ${bannerTextSecondaryColorClass} drop-shadow-md mb-8 max-w-2xl`}>
                          {banner.subheading}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-4">
                        <Link
                          href={getActionUrl(banner.primaryCta)}
                          className={getButtonClasses(banner.primaryCta.buttonStyle)}
                        >
                          {banner.primaryCta.buttonText}
                        </Link>
                        {banner.secondaryCta?.buttonText && (
                          <Link
                            href={getActionUrl(banner.secondaryCta)}
                            className={getButtonClasses(banner.secondaryCta.buttonStyle)}
                          >
                            {banner.secondaryCta.buttonText}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slider Dots - Inside each hero banner container, absolute positioned at bottom */}
                {heroBanners.length > 1 && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-14 z-20 flex gap-2 items-center">
                    {heroBanners.map((_, dotIndex) => (
                      <button
                        key={dotIndex}
                        onClick={() => goToSlide(dotIndex)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                          dotIndex === currentIndex 
                            ? "bg-white" 
                            : "bg-gray-700 hover:bg-gray-600"
                        }`}
                        aria-label={`Go to slide ${dotIndex + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
        })}
      </div>
    </section>
  );
}

