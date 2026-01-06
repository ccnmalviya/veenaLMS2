"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Course } from "@/types/course";
import { getSignedImageUrl } from "@/lib/s3ImageHelper";

interface CourseCardProps {
  course: Course;
  formatPrice: (price: number) => string;
}

export function CourseCard({ course, formatPrice }: CourseCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load signed URL for thumbnail
    if (course.thumbnailImage) {
      getSignedImageUrl(course.thumbnailImage).then(setThumbnailUrl);
    }

    // Load signed URL for promo video if available
    if (course.promoVideoUrl) {
      getSignedImageUrl(course.promoVideoUrl).then(setVideoUrl);
    }
  }, [course.thumbnailImage, course.promoVideoUrl]);

  const handleMouseEnter = () => {
    // Delay video playback by 500ms to avoid accidental triggers
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovering(true);
      if (videoRef.current && videoUrl) {
        videoRef.current.play().catch(() => {
          // Ignore autoplay errors
        });
      }
    }, 500);
  };

  const handleMouseLeave = () => {
    // Clear the hover timeout if user leaves quickly
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Link
      href={`/courses/${course.id}`}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        {/* Thumbnail Image */}
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt={course.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isHovering && videoUrl ? "opacity-0" : "opacity-100"
            }`}
          />
        )}

        {/* Video Preview (plays on hover) */}
        {videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isHovering ? "opacity-100" : "opacity-0"
            }`}
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}

        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`bg-black/60 rounded-full p-3 transition-all ${
            isHovering ? "scale-0" : "scale-100"
          }`}>
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </div>

        {/* Badge */}
        {course.discountedPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {Math.round(((course.price - course.discountedPrice) / course.price) * 100)}% OFF
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-blue-600 uppercase">
            {course.category || "Course"}
          </span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500 capitalize">
            {course.level || "All Levels"}
          </span>
        </div>

        <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-blue-600 transition">
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {course.shortDescription || "No description available."}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {course.discountedPrice ? (
              <>
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(course.discountedPrice)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(course.price)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(course.price)}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              // TODO: Add to wishlist
              alert("Wishlist feature coming soon!");
            }}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="Add to wishlist"
          >
            <svg className="w-5 h-5 text-gray-400 hover:text-red-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}

