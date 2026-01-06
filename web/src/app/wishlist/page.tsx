"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs, doc, getDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSignedImageUrl } from "@/lib/s3ImageHelper";
import type { Course } from "@/types/course";
import type { WishlistItem } from "@/types/wishlist";

interface WishlistCourse extends WishlistItem {
  course?: Course;
  thumbnailUrl?: string;
}

export default function WishlistPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [wishlistItems, setWishlistItems] = useState<WishlistCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        loadWishlist(user.uid);
      } else {
        router.push("/login?redirect=/wishlist");
      }
    });
    return () => unsubscribe();
  }, []);

  const loadWishlist = async (userId: string) => {
    try {
      setLoading(true);

      // Get wishlist items
      const q = query(
        collection(db, "wishlists"),
        where("userId", "==", userId),
        where("type", "==", "course")
      );
      const snapshot = await getDocs(q);

      const items: WishlistCourse[] = [];

      // Load course details for each wishlist item
      for (const docSnap of snapshot.docs) {
        const wishlistData = { id: docSnap.id, ...docSnap.data() } as WishlistCourse;

        // Get course details
        const courseRef = doc(db, "courses", wishlistData.courseId);
        const courseSnap = await getDoc(courseRef);

        if (courseSnap.exists()) {
          const courseData = { id: courseSnap.id, ...courseSnap.data() } as Course;
          wishlistData.course = courseData;

          // Load thumbnail
          if (courseData.thumbnailImage) {
            const url = await getSignedImageUrl(courseData.thumbnailImage);
            wishlistData.thumbnailUrl = url;
          }
        }

        items.push(wishlistData);
      }

      setWishlistItems(items);
    } catch (error) {
      console.error("Error loading wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (wishlistId: string) => {
    if (!confirm("Remove this course from your wishlist?")) return;

    try {
      await deleteDoc(doc(db, "wishlists", wishlistId));
      setWishlistItems((prev) => prev.filter((item) => item.id !== wishlistId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      alert("Failed to remove from wishlist");
    }
  };

  const handleBuyNow = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };

  const formatPrice = (price: number | undefined) => {
    if (price == null) return "";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateTotalPrice = () => {
    return wishlistItems.reduce((total, item) => {
      if (!item.course) return total;
      const price = item.course.discountedPrice || item.course.price;
      return total + price;
    }, 0);
  };

  const calculateTotalSavings = () => {
    return wishlistItems.reduce((total, item) => {
      if (!item.course || !item.course.discountedPrice) return total;
      return total + (item.course.price - item.course.discountedPrice);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
            <p className="text-gray-600">
              Save courses you're interested in and buy them when you're ready
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16 text-gray-500">Loading wishlist...</div>
          ) : wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">
                Start adding courses you're interested in to your wishlist
              </p>
              <button
                onClick={() => router.push("/classes")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              >
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Wishlist Items */}
              <div className="lg:col-span-2 space-y-4">
                {wishlistItems.map((item) => {
                  if (!item.course) return null;
                  const course = item.course;
                  const finalPrice = course.discountedPrice || course.price;

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col sm:flex-row hover:shadow-md transition"
                    >
                      {/* Thumbnail */}
                      <div className="sm:w-48 h-48 sm:h-auto bg-gray-200 flex-shrink-0 relative group">
                        {item.thumbnailUrl ? (
                          <img
                            src={item.thumbnailUrl}
                            alt={course.title}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => router.push(`/courses/${course.id}`)}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <button
                            onClick={() => router.push(`/courses/${course.id}`)}
                            className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-semibold"
                          >
                            View Course
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4 flex flex-col">
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <h3
                                className="font-bold text-lg cursor-pointer hover:text-blue-600 transition"
                                onClick={() => router.push(`/courses/${course.id}`)}
                              >
                                {course.title}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {course.category} • {course.level}
                              </p>
                            </div>
                            <button
                              onClick={() => item.id && handleRemove(item.id)}
                              className="text-gray-400 hover:text-red-500 transition"
                              title="Remove from wishlist"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                          <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                            {course.shortDescription}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-4 pt-3 border-t border-gray-100">
                          <div className="flex items-baseline gap-2">
                            {course.discountedPrice ? (
                              <>
                                <span className="text-2xl font-bold text-gray-900">
                                  {formatPrice(course.discountedPrice)}
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                  {formatPrice(course.price)}
                                </span>
                                <span className="text-xs font-semibold text-green-600">
                                  {Math.round(((course.price - course.discountedPrice) / course.price) * 100)}% OFF
                                </span>
                              </>
                            ) : (
                              <span className="text-2xl font-bold text-gray-900">
                                {formatPrice(course.price)}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => handleBuyNow(course.id || "")}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-20">
                  <h2 className="text-xl font-bold mb-4">Summary</h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Courses:</span>
                      <span className="font-semibold">{wishlistItems.length}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Price:</span>
                      <span className="font-semibold">{formatPrice(calculateTotalPrice())}</span>
                    </div>

                    {calculateTotalSavings() > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Total Savings:</span>
                        <span className="font-semibold">
                          - {formatPrice(calculateTotalSavings())}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="text-2xl font-bold mb-4">
                      {formatPrice(calculateTotalPrice())}
                    </div>

                    <p className="text-xs text-gray-600 mb-4">
                      💡 Tip: Buy courses individually when you're ready to start learning
                    </p>

                    <button
                      onClick={() => router.push("/classes")}
                      className="w-full py-3 bg-gray-100 text-gray-800 rounded-lg font-semibold hover:bg-gray-200 transition"
                    >
                      Browse More Courses
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

