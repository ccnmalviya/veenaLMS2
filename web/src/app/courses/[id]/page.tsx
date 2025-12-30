"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/lib/firebaseClient";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { S3Image } from "@/components/common/S3Image";
import type { Course } from "@/types/course";

export default function PublicCoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.id as string | undefined;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourse = async () => {
      if (!courseId) return;
      try {
        setLoading(true);
        setError(null);
        const ref = doc(db, "courses", courseId);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          setError("Course not found");
          setCourse(null);
          return;
        }
        setCourse({ id: snap.id, ...(snap.data() as Course) });
      } catch (err: any) {
        console.error("Error loading course:", err);
        setError(err?.message || "Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId]);

  const formatPrice = (price: number | undefined) => {
    if (price == null) return "";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleEnrollNow = async () => {
    if (!courseId || !course) return;
    const user = auth.currentUser;

    // If not logged in, send to login and then back here
    if (!user) {
      router.push(`/login?redirect=/courses/${courseId}`);
      return;
    }

    try {
      // Simple enrollment: create an enrollment document
      await addDoc(collection(db, "enrollments"), {
        userId: user.uid,
        courseId,
        status: "active",
        progress: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      alert("You are enrolled in this course now.");
      // Optional: redirect to a dashboard or my-courses page
      // router.push("/dashboard");
    } catch (err: any) {
      console.error("Failed to enroll:", err);
      alert("Failed to enroll. Please try again.");
    }
  };

  const handleAddToWishlist = async () => {
    if (!courseId) return;
    const user = auth.currentUser;

    if (!user) {
      // Redirect to login, then back to this course
      router.push(`/login?redirect=/courses/${courseId}`);
      return;
    }

    try {
      await addDoc(collection(db, "wishlists"), {
        userId: user.uid,
        courseId,
        type: "course",
        createdAt: serverTimestamp(),
      });
      alert("Course added to your wishlist.");
    } catch (err: any) {
      console.error("Failed to add to wishlist:", err);
      alert("Failed to add to wishlist. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-10">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-16 text-gray-500">Loading course...</div>
          ) : error ? (
            <div className="max-w-xl mx-auto text-center py-16">
              <h1 className="text-2xl font-bold mb-2">Course Not Found</h1>
              <p className="text-gray-600 mb-4">
                The course you&apos;re looking for doesn&apos;t exist or is not available.
              </p>
              <button
                onClick={() => router.push("/classes")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Back to Classes
              </button>
            </div>
          ) : course ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Thumbnail / preview */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="h-56 bg-gray-200 relative">
                    {course.thumbnailImage ? (
                      <S3Image
                        src={course.thumbnailImage}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Thumbnail
                      </div>
                    )}
                  </div>
                  <div className="p-4 border-t border-gray-100 space-y-3">
                    <div>
                      {course.discountedPrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-gray-900">
                            {formatPrice(course.discountedPrice)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(course.price)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-2xl font-bold text-gray-900">
                          {formatPrice(course.price)}
                        </span>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {course.accessType === "lifetime"
                          ? "Lifetime access"
                          : course.accessType === "limited" && course.accessDurationDays
                          ? `${course.accessDurationDays} days access`
                          : course.accessType === "subscription"
                          ? "Subscription-based access"
                          : "Flexible access"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleEnrollNow}
                      className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700"
                    >
                      Enroll Now
                    </button>
                    <button
                      type="button"
                      onClick={handleAddToWishlist}
                      className="w-full py-2.5 border border-gray-300 text-gray-800 rounded-lg font-semibold text-sm hover:bg-gray-100"
                    >
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Details */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold mb-2">
                    {course.level} · {course.language}
                  </p>
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">{course.title}</h1>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">
                    {course.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                    <span className="px-2 py-1 bg-gray-100 rounded-full">
                      Category: {course.category}
                    </span>
                    {course.subCategory && (
                      <span className="px-2 py-1 bg-gray-100 rounded-full">
                        Subcategory: {course.subCategory}
                      </span>
                    )}
                    <span className="px-2 py-1 bg-gray-100 rounded-full">
                      Type: Video Course
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-5">
                  <h2 className="text-lg font-semibold mb-3">Course Description</h2>
                  <p className="text-sm text-gray-700 whitespace-pre-line">
                    {course.fullDescription}
                  </p>
                </div>

                {course.tags && course.tags.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <h2 className="text-lg font-semibold mb-3">What you&apos;ll learn</h2>
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-full border border-blue-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}
