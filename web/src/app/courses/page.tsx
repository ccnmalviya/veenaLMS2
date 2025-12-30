"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { S3Image } from "@/components/common/S3Image";
import { Course } from "@/types/course";

export default function AllCoursesPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("search") || "";
  const selectedCategory = searchParams?.get("category") || "";
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, [searchQuery, selectedCategory]);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "courses"));
      const coursesData: Course[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.status === "published") {
          coursesData.push({
            id: doc.id,
            ...data,
          } as Course);
        }
      });

      let filtered = coursesData;

      // Filter by category if selected
      if (selectedCategory) {
        filtered = filtered.filter((course) => {
          const courseCategoryId = course.categoryId || (course as any).category_id || "";
          const courseCategoryName = (course.category || "").toLowerCase();
          const selectedCategoryLower = selectedCategory.toLowerCase();

          return (
            courseCategoryId === selectedCategory ||
            courseCategoryName === selectedCategoryLower ||
            courseCategoryName.includes(selectedCategoryLower)
          );
        });
      }

      // Filter by search query if provided
      if (searchQuery && searchQuery.trim()) {
        const queryLower = searchQuery.toLowerCase().trim();
        filtered = filtered.filter((course) => {
          const title = (course.title || "").toLowerCase();
          const description = (course.shortDescription || course.description || "").toLowerCase();
          const category = (course.category || "").toLowerCase();
          const level = (course.level || "").toLowerCase();

          return (
            title.includes(queryLower) ||
            description.includes(queryLower) ||
            category.includes(queryLower) ||
            level.includes(queryLower)
          );
        });
      }

      // Remove duplicates
      const uniqueFiltered = filtered.filter((course, index, self) =>
        index === self.findIndex((c) => c.id === course.id)
      );

      // Sort by createdAt (newest first)
      uniqueFiltered.sort((a, b) => {
        const dateA = a.createdAt?.toMillis?.() || (a as any).created_at?.toMillis?.() || 0;
        const dateB = b.createdAt?.toMillis?.() || (b as any).created_at?.toMillis?.() || 0;
        return dateB - dateA;
      });

      setCourses(uniqueFiltered);
    } catch (error) {
      console.error("Error loading courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {searchQuery ? `Courses for "${searchQuery}"` : "All Courses"}
            </h1>
            <p className="text-lg text-blue-100">
              {searchQuery
                ? "Explore courses related to your search"
                : "Explore our complete collection of courses and start your learning journey today."}
            </p>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {searchQuery && (
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-600">
                  Showing results for: <span className="font-semibold">"{searchQuery}"</span>
                </p>
                <Link
                  href="/courses"
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Clear search
                </Link>
              </div>
            )}
            {selectedCategory && (
              <div className="mb-6">
                <p className="text-gray-600">
                  Filtered by category: <span className="font-semibold">{selectedCategory}</span>
                </p>
              </div>
            )}

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-500">Loading courses...</p>
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchQuery || selectedCategory
                    ? "No courses found matching your criteria."
                    : "No courses available at the moment."}
                </p>
                <Link
                  href="/classes"
                  className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Back to Classes
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-gray-600">
                    Found <span className="font-semibold">{courses.length}</span> course{courses.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {courses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/courses/${course.id}`}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                    >
                      <div className="h-48 bg-gray-200 relative overflow-hidden">
                        {course.thumbnailImage ? (
                          <S3Image
                            src={course.thumbnailImage}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                            <span className="text-4xl font-bold text-gray-400">
                              {course.title.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg line-clamp-2 mb-2">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                          {course.shortDescription || "No description available."}
                        </p>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-gray-500 capitalize">
                            {course.level || "All Levels"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {course.category || "Course"}
                          </span>
                        </div>
                        {course.price && (
                          <div className="pt-3 border-t border-gray-100">
                            {course.discountedPrice ? (
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-gray-900">
                                  {formatPrice(course.discountedPrice)}
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                  {formatPrice(course.price)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-lg font-bold text-gray-900">
                                {formatPrice(course.price)}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

