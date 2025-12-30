"use client";

import { useState, useEffect } from "react";
import { getSignedImageUrl } from "@/lib/s3ImageHelper";

interface S3ImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
}

export function S3Image({ src, alt, className = "", fallback }: S3ImageProps) {
  const [imageUrl, setImageUrl] = useState<string>(src);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // Handle empty or invalid src
    if (!src || src.trim() === "") {
      setError(true);
      setLoading(false);
      return;
    }

    // Only get signed URL if it's an S3 URL
    if (src.includes("s3") || src.includes("amazonaws.com")) {
      getSignedImageUrl(src)
        .then((signedUrl) => {
          setImageUrl(signedUrl);
          setLoading(false);
        })
        .catch((err) => {
          // Fallback to original URL - might work if bucket has public read access
          setImageUrl(src);
          setLoading(false);
        });
    } else {
      // Not an S3 URL, use as-is
      setImageUrl(src);
      setLoading(false);
    }
  }, [src]);

  if (error) {
    return (
      <div className={className}>
        {fallback || (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <img
        src={imageUrl}
        alt={alt}
        className={className}
        onError={(e) => {
          // Silently handle image load errors - don't spam console
          if (process.env.NODE_ENV === "development") {
            console.warn("S3Image: Image failed to load", imageUrl);
          }
          setError(true);
          setErrorMessage("Failed to load image");
        }}
        onLoad={() => {
          setLoading(false);
          setError(false);
        }}
        style={{ opacity: loading ? 0.5 : 1 }}
      />
      {error && process.env.NODE_ENV === "development" && (
        <div className="text-xs text-red-500 mt-1">
          Image load failed. Check console for details.
        </div>
      )}
    </>
  );
}



