"use client";

import { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { S3Image } from "@/components/common/S3Image";

type VideoTestimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
  videoUrl?: string;
  thumbnailImage?: string;
  enabled: boolean;
  displayOrder: number;
};

// Default video URLs for testimonials (people giving reviews)
const DEFAULT_TESTIMONIAL_VIDEOS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Review video 1
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", // Review video 2
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", // Review video 3
];

const DEFAULT_VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: "1",
    name: "Harper Jackson",
    role: "Founder, Creative Studio",
    text: "The unified LMS and store experience made it incredibly easy to sell courses and physical kits together.",
    videoUrl: DEFAULT_TESTIMONIAL_VIDEOS[0],
    enabled: true,
    displayOrder: 1,
  },
  {
    id: "2",
    name: "Mason Jack",
    role: "Digital Marketer",
    text: "Live classes, recorded courses, and workshop registrations all work from a single dashboard. Huge time saver.",
    videoUrl: DEFAULT_TESTIMONIAL_VIDEOS[1],
    enabled: true,
    displayOrder: 2,
  },
  {
    id: "3",
    name: "Avery Wyatt",
    role: "Student",
    text: "I can learn, buy workshop kits, and track my certificates in one place. The experience feels premium.",
    videoUrl: DEFAULT_TESTIMONIAL_VIDEOS[2],
    enabled: true,
    displayOrder: 3,
  },
];

// Video testimonials for classes page - videos loop automatically
export function VideoTestimonials() {
  const [testimonials, setTestimonials] = useState<VideoTestimonial[]>(DEFAULT_VIDEO_TESTIMONIALS);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true);
        const snapshot = await getDocs(collection(db, "classes_testimonials"));
        const data: VideoTestimonial[] = [];
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
          .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
          .map((t, idx) => ({
            ...t,
            // Ensure videoUrl is set - use default if not provided
            videoUrl: t.videoUrl || DEFAULT_TESTIMONIAL_VIDEOS[idx] || DEFAULT_TESTIMONIAL_VIDEOS[0],
          }));
        if (enabled.length > 0) {
          setTestimonials(enabled.slice(0, 3)); // Only show first 3
        } else {
          // Use defaults with videos if no data from Firestore
          setTestimonials(DEFAULT_VIDEO_TESTIMONIALS);
        }
      } catch (error) {
        console.error("Error loading video testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  // Auto-loop videos when they end
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        const handleEnded = () => {
          video.currentTime = 0;
          video.play().catch(() => {
            // Autoplay might be blocked, that's okay
          });
        };
        video.addEventListener("ended", handleEnded);
        return () => {
          video.removeEventListener("ended", handleEnded);
        };
      }
    });
  }, [testimonials]);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">What People Say</h2>
          <div className="text-center py-12 text-gray-500">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            >
              {t.videoUrl ? (
                // Video testimonial with auto-loop
                <div className="relative">
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={t.videoUrl || DEFAULT_TESTIMONIAL_VIDEOS[index] || DEFAULT_TESTIMONIAL_VIDEOS[0]}
                    poster={t.thumbnailImage}
                    controls
                    loop
                    muted
                    playsInline
                    autoPlay
                    className="w-full h-64 object-cover"
                    preload="auto"
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
                // Fallback to video if no videoUrl set (shouldn't happen now, but just in case)
                <div className="relative">
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={DEFAULT_TESTIMONIAL_VIDEOS[index] || DEFAULT_TESTIMONIAL_VIDEOS[0]}
                    controls
                    loop
                    muted
                    playsInline
                    autoPlay
                    className="w-full h-64 object-cover"
                    preload="auto"
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
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

