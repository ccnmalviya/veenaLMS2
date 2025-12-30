"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

type HomepageTestimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
  videoUrl?: string;
  thumbnailImage?: string;
  enabled: boolean;
  displayOrder: number;
};

const DEFAULT_TESTIMONIALS: HomepageTestimonial[] = [
  {
    id: "1",
    name: "Harper Jackson",
    role: "Founder, Creative Studio",
    text:
      "The unified LMS and store experience made it incredibly easy to sell courses and physical kits together.",
    enabled: true,
    displayOrder: 1,
  },
  {
    id: "2",
    name: "Mason Jack",
    role: "Digital Marketer", 
    text:
      "Live classes, recorded courses, and workshop registrations all work from a single dashboard. Huge time saver.",
    enabled: true,
    displayOrder: 2,
  },
  {
    id: "3",
    name: "Avery Wyatt",
    role: "Student",
    text:
      "I can learn, buy workshop kits, and track my certificates in one place. The experience feels premium.",
    enabled: true,
    displayOrder: 3,
  },
];

// Shared testimonials for landing + classes pages
export function Testimonials() {
  // Start with the original hard-coded testimonials
  const [testimonials, setTestimonials] = useState<HomepageTestimonial[]>(DEFAULT_TESTIMONIALS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true);
        // Simple fetch: get all docs, then filter/sort in memory (avoids index issues)
        const snapshot = await getDocs(collection(db, "homepage_testimonials"));
        const data: HomepageTestimonial[] = [];
        snapshot.forEach((d) => {
          const docData = d.data() as any;
          data.push({
            id: d.id || "",
            name: docData.name || "",
            role: docData.role || "",
            text: docData.text || "",
            videoUrl: docData.videoUrl || "",
            thumbnailImage: docData.thumbnailImage || "",
            enabled: docData.enabled !== false,
            displayOrder: docData.displayOrder ?? 1,
          });
        });
        const enabled = data
          .filter((t) => t.enabled)
          .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        // If admin has configured testimonials, use them; otherwise keep the defaults
        if (enabled.length > 0) {
          setTestimonials(enabled);
        }
      } catch (error) {
        console.error("Error loading testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          What People Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            >
              {t.videoUrl ? (
                // Video testimonial
                <div className="relative">
                  <video
                    src={t.videoUrl}
                    poster={t.thumbnailImage}
                    controls
                    className="w-full h-64 object-cover"
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="p-4">
                    <div className="font-semibold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                    {t.text && (
                      <p className="text-gray-700 mt-2 text-sm leading-relaxed line-clamp-2">
                        &ldquo;{t.text}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                // Text testimonial (fallback)
                <div className="p-6">
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-4">
                    <div className="font-semibold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}





