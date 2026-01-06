/**
 * Helper function to get signed S3 URLs for images
 * This is needed because S3 objects with KMS encryption require signed URLs
 */

export async function getSignedImageUrl(imageUrl: string): Promise<string> {
  // If it's not an S3 URL, return as-is
  if (!imageUrl || (!imageUrl.includes("s3") && !imageUrl.includes("amazonaws.com"))) {
    return imageUrl;
  }

  try {
    // Pass the full URL as-is; the API will extract the S3 object key
    const response = await fetch(`/api/s3-signed-url?key=${encodeURIComponent(imageUrl)}`);
    
    if (!response.ok) {
      // Silently fall back to original URL if signing fails
      if (response.status === 503) {
        // S3 credentials not configured - this is expected during initial setup
        console.warn("⚠️ S3 credentials not configured. Using direct image URLs.");
      } else {
        const errorText = await response.text();
        console.error("Failed to get signed URL:", {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
          imageUrl: imageUrl
        });
      }
      return imageUrl; // Fallback to original URL
    }

    const data = await response.json();
    if (data.error) {
      if (!data.error.includes("not configured")) {
        console.error("Signed URL API error:", data.error);
      }
      return imageUrl; // Fallback to original URL
    }
    return data.url || imageUrl;
  } catch (error) {
    console.error("Error getting signed URL:", error);
    return imageUrl; // Fallback to original URL
  }
}

/**
 * Get signed URLs for multiple images
 */
export async function getSignedImageUrls(imageUrls: string[]): Promise<string[]> {
  return Promise.all(imageUrls.map(url => getSignedImageUrl(url)));
}

