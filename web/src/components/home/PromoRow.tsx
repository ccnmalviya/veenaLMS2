"use client";

import Link from "next/link";

// Using the same shopping videos as orange cards
const PROMO_VIDEOS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
];

// Two wide promo cards below hero, matching the shoe layout style.
export function PromoRow() {
  // TODO: Drive from Firestore campaigns / featured store_items
  const promos = [
    {
      id: "formal",
      title: "Explore All Formal Courses",
      badge: "20% OFF",
      cta: "Shop Now",
    },
    {
      id: "running",
      title: "Grab the Latest Live Classes",
      badge: "25% OFF",
      cta: "Shop Now",
    },
  ];

  return (
    <section className="bg-[#f5f5f5]">
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {promos.map((promo, index) => (
            <div
              key={promo.id}
              className="relative h-44 bg-gray-200 rounded-2xl overflow-hidden flex items-end p-4"
            >
              {/* Video Background */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: 0.5 }}
              >
                <source src={PROMO_VIDEOS[index] || PROMO_VIDEOS[0]} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0" />
              
              <div className="absolute top-3 left-3 text-[10px] font-semibold bg-white px-2 py-1 rounded-full z-10">
                {promo.badge}
              </div>
              <div className="relative z-10">
                <h3 className="text-sm md:text-base font-semibold text-white drop-shadow">
                  {promo.title}
                </h3>
                <Link
                  href="/classes"
                  className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-full bg-white text-[11px] font-semibold text-gray-900 hover:bg-gray-100"
                >
                  {promo.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}





