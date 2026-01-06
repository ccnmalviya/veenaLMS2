"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, setDoc, collection, serverTimestamp, query, where, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSignedImageUrl } from "@/lib/s3ImageHelper";
import type { Course } from "@/types/course";
import type { RazorpayResponse } from "@/types/payment";

// Declare Razorpay on window
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PublicCoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.id as string | undefined;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [promoVideoUrl, setPromoVideoUrl] = useState<string>("");
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistId, setWishlistId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user && courseId) {
        checkEnrollment(user.uid);
        checkWishlist(user.uid);
      } else {
        setCheckingEnrollment(false);
      }
    });
    return () => unsubscribe();
  }, [courseId]);

  // Load course
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
        const courseData = { id: snap.id, ...(snap.data() as Course) };
        setCourse(courseData);

        // Load signed URLs for images/videos
        if (courseData.thumbnailImage) {
          getSignedImageUrl(courseData.thumbnailImage).then(setThumbnailUrl);
        }
        if (courseData.promoVideoUrl) {
          getSignedImageUrl(courseData.promoVideoUrl).then(setPromoVideoUrl);
        }
      } catch (err: any) {
        console.error("Error loading course:", err);
        setError(err?.message || "Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId]);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const checkEnrollment = async (userId: string) => {
    if (!courseId) return;
    try {
      const enrollmentId = `${userId}_${courseId}`;
      const enrollmentRef = doc(db, "enrollments", enrollmentId);
      const enrollmentSnap = await getDoc(enrollmentRef);
      
      if (enrollmentSnap.exists() && enrollmentSnap.data().status === "active") {
        setIsEnrolled(true);
      } else {
        setIsEnrolled(false);
      }
    } catch (error) {
      console.error("Error checking enrollment:", error);
      setIsEnrolled(false);
    } finally {
      setCheckingEnrollment(false);
    }
  };

  const checkWishlist = async (userId: string) => {
    if (!courseId) return;
    try {
      const q = query(
        collection(db, "wishlists"),
        where("userId", "==", userId),
        where("courseId", "==", courseId)
      );
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        setIsInWishlist(true);
        setWishlistId(snapshot.docs[0].id);
      } else {
        setIsInWishlist(false);
        setWishlistId(null);
      }
    } catch (error) {
      console.error("Error checking wishlist:", error);
    }
  };

  const formatPrice = (price: number | undefined) => {
    if (price == null) return "";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleEnrollNow = async () => {
    if (!courseId || !course || !currentUser) {
      router.push(`/login?redirect=/courses/${courseId}`);
      return;
    }

    const amount = course.discountedPrice || course.price;

    // If course is free, enroll directly
    if (amount === 0) {
      try {
        setProcessingPayment(true);
        const enrollmentId = `${currentUser.uid}_${courseId}`;
        await setDoc(doc(db, "enrollments", enrollmentId), {
          userId: currentUser.uid,
          courseId,
          enrolledAt: serverTimestamp(),
          status: "active",
          paymentId: "free",
          accessExpiresAt: null,
          deviceCount: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        alert("✅ You are now enrolled in this course!");
        setIsEnrolled(true);
        router.push(`/courses/${courseId}/learn`);
      } catch (error: any) {
        console.error("Error enrolling:", error);
        alert("Failed to enroll. Please try again.");
      } finally {
        setProcessingPayment(false);
      }
      return;
    }

    // Paid course - initiate Razorpay payment
    try {
      setProcessingPayment(true);

      // Step 1: Create order
      const orderResponse = await fetch("/api/razorpay/create-enrollment-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          amount,
          currency: "INR",
        }),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create order");
      }

      const orderData = await orderResponse.json();

      // Step 2: Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Veena LMS",
        description: course.title,
        order_id: orderData.orderId,
        handler: async function (response: RazorpayResponse) {
          // Step 3: Verify payment
          try {
            const verifyResponse = await fetch("/api/razorpay/verify-enrollment-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                courseId,
                userId: currentUser.uid,
                amount,
              }),
            });

            if (!verifyResponse.ok) {
              throw new Error("Payment verification failed");
            }

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              alert("✅ Payment successful! You are now enrolled in the course.");
              setIsEnrolled(true);
              router.push(`/courses/${courseId}/learn`);
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (error: any) {
            console.error("Error verifying payment:", error);
            alert("Payment verification failed. Please contact support with payment ID: " + response.razorpay_payment_id);
          }
        },
        prefill: {
          name: currentUser.displayName || "",
          email: currentUser.email || "",
        },
        theme: {
          color: "#3b82f6",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      console.error("Error initiating payment:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setProcessingPayment(false);
    }
  };

  const handleWishlistToggle = async () => {
    if (!courseId || !currentUser) {
      router.push(`/login?redirect=/courses/${courseId}`);
      return;
    }

    try {
      if (isInWishlist && wishlistId) {
        // Remove from wishlist
        await deleteDoc(doc(db, "wishlists", wishlistId));
        setIsInWishlist(false);
        setWishlistId(null);
        alert("Removed from wishlist");
      } else {
        // Add to wishlist
        const docRef = await addDoc(collection(db, "wishlists"), {
          userId: currentUser.uid,
          courseId,
          type: "course",
          createdAt: serverTimestamp(),
        });
        setIsInWishlist(true);
        setWishlistId(docRef.id);
        alert("✅ Added to wishlist!");
      }
    } catch (error: any) {
      console.error("Error toggling wishlist:", error);
      alert("Failed to update wishlist. Please try again.");
    }
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-gray-500">Loading course...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center max-w-xl">
          <h1 className="text-2xl font-bold mb-2">Course Not Found</h1>
          <p className="text-gray-600 mb-4">
            The course you're looking for doesn't exist or is not available.
          </p>
          <button
            onClick={() => router.push("/classes")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            Back to Classes
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const finalPrice = course.discountedPrice || course.price;
  const isFree = finalPrice === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Video Preview & Enrollment Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-20">
                {/* Video Preview or Thumbnail */}
                <div className="relative h-64 bg-gray-900 group">
                  {promoVideoUrl ? (
                    <>
                      <video
                        ref={videoRef}
                        src={promoVideoUrl}
                        className="w-full h-full object-cover"
                        poster={thumbnailUrl}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                      />
                      <button
                        onClick={toggleVideoPlayback}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition"
                      >
                        {!isPlaying && (
                          <div className="bg-white/90 rounded-full p-4">
                            <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        )}
                      </button>
                    </>
                  ) : thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Preview Available
                    </div>
                  )}
                </div>

                {/* Pricing & CTA */}
                <div className="p-6 space-y-4">
                  <div>
                    {course.discountedPrice ? (
                      <div>
                        <div className="flex items-baseline gap-3">
                          <span className="text-3xl font-bold text-gray-900">
                            {formatPrice(course.discountedPrice)}
                          </span>
                          <span className="text-lg text-gray-500 line-through">
                            {formatPrice(course.price)}
                          </span>
                        </div>
                        <p className="text-sm text-green-600 font-semibold mt-1">
                          Save {formatPrice(course.price - course.discountedPrice)} (
                          {Math.round(((course.price - course.discountedPrice) / course.price) * 100)}% OFF)
                        </p>
                      </div>
                    ) : (
                      <span className="text-3xl font-bold text-gray-900">
                        {isFree ? "FREE" : formatPrice(course.price)}
                      </span>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      {course.accessType === "lifetime"
                        ? "🎯 Lifetime access"
                        : course.accessType === "limited" && course.accessDurationDays
                        ? `⏰ ${course.accessDurationDays} days access`
                        : "Flexible access"}
                    </p>
                  </div>

                  {checkingEnrollment ? (
                    <div className="text-center py-4 text-sm text-gray-500">
                      Checking enrollment status...
                    </div>
                  ) : isEnrolled ? (
                    <button
                      onClick={() => router.push(`/courses/${courseId}/learn`)}
                      className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                      ✓ Continue Learning
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleEnrollNow}
                        disabled={processingPayment}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {processingPayment
                          ? "Processing..."
                          : isFree
                          ? "Enroll for Free"
                          : "Buy Now"}
                      </button>

                      <button
                        onClick={handleWishlistToggle}
                        className={`w-full py-3 rounded-lg font-semibold transition ${
                          isInWishlist
                            ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                            : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
                        }`}
                      >
                        {isInWishlist ? "❤️ Added to Wishlist" : "🤍 Add to Wishlist"}
                      </button>
                    </>
                  )}

                  <div className="pt-4 border-t border-gray-200 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Certificate of completion</span>
                    </div>
                    {course.allowDownloads && (
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Downloadable resources</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Course Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Course Title & Meta */}
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase">
                    {course.category}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full capitalize">
                    {course.level}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full capitalize">
                    {course.language}
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {course.title}
                </h1>

                <p className="text-lg text-gray-700 leading-relaxed">
                  {course.shortDescription}
                </p>
              </div>

              {/* Full Description */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="whitespace-pre-line">{course.fullDescription}</p>
                </div>
              </div>

              {/* What You'll Learn */}
              {course.tags && course.tags.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.tags.map((tag, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
