"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VideoTestimonials } from "@/components/common/VideoTestimonials";
import { S3Image } from "@/components/common/S3Image";
import { Course } from "@/types/course";
import { UpcomingSessions } from "@/components/home/UpcomingSessions";

type Category = {
  categoryId: string;
  name: string;
  slug?: string;
  image?: string;
  description?: string;
  status?: string;
  courseImages?: string[]; // Preview images from courses in this category
};

// Function to get category-related images from Unsplash based on category name
const getCategoryImage = (categoryName: string): string => {
  const name = categoryName.toLowerCase();
  
  // Map common category names to relevant Unsplash images
  const categoryImageMap: { [key: string]: string } = {
    // Technology & Programming
    "programming": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    "web development": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    "javascript": "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop",
    "python": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
    "react": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    "coding": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    "software": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    "technology": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    
    // Design
    "design": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=300&fit=crop",
    "ui/ux": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    "graphic design": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    "web design": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    
    // Business
    "business": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    "marketing": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    "finance": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    "entrepreneurship": "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
    
    // Data & Analytics
    "data science": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    "analytics": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    "machine learning": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    "ai": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    "artificial intelligence": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    
    // Photography & Video
    "photography": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop",
    "video editing": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop",
    "videography": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop",
    
    // Language & Communication
    "language": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
    "english": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
    "communication": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    
    // Health & Fitness
    "health": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    "fitness": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    "yoga": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
    
    // Music & Arts
    "music": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    "art": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
    
    // Default fallback
    "default": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
  };
  
  // Check for exact match first
  if (categoryImageMap[name]) {
    return categoryImageMap[name];
  }
  
  // Check for partial matches
  for (const [key, url] of Object.entries(categoryImageMap)) {
    if (name.includes(key) || key.includes(name)) {
      return url;
    }
  }
  
  // Return default image
  return categoryImageMap["default"];
};

function ClassesPageContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("search") || "";
  const selectedCategory = searchParams?.get("category") || "";
  const showAllCourses = searchParams?.get("all") === "true";
  const [newCourses, setNewCourses] = useState<Course[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [categoryCourses, setCategoryCourses] = useState<Course[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNewCourses();
    loadRecommendedCourses();
    loadCategories();
    loadCategoryCourses();
    loadAllCourses();
  }, [searchQuery, selectedCategory, showAllCourses]);

  const loadNewCourses = async () => {
    try {
      setLoading(true);
      console.log("Loading new courses...");
      
      // Use fallback method: get all courses and filter/sort in memory
      // This avoids Firestore index requirements
      try {
        const allCoursesSnapshot = await getDocs(collection(db, "courses"));
        console.log(`Total courses in database: ${allCoursesSnapshot.size}`);
        
        const coursesData: Course[] = [];
        allCoursesSnapshot.forEach((doc) => {
          const data = doc.data();
          // Filter for published courses only
          if (data.status === "published") {
            console.log(`Found published course: ${doc.id} - ${data.title}`, {
              id: doc.id,
              status: data.status,
              title: data.title,
              createdAt: data.createdAt,
              created_at: data.created_at
            });
            coursesData.push({ 
              id: doc.id, 
              ...data 
            } as Course);
          } else {
            console.log(`Skipping course ${doc.id} - status: ${data.status}`);
          }
        });
        
        // Sort by createdAt in descending order (newest first)
        coursesData.sort((a, b) => {
          let aTime = 0;
          let bTime = 0;
          
          // Try to get timestamp from createdAt (Firestore Timestamp)
          if (a.createdAt) {
            aTime = a.createdAt?.toMillis?.() || (a.createdAt as any)?.seconds * 1000 || 0;
          } else if ((a as any).created_at) {
            const created_at = (a as any).created_at;
            aTime = created_at?.toMillis?.() || created_at?.seconds * 1000 || 0;
          }
          
          if (b.createdAt) {
            bTime = b.createdAt?.toMillis?.() || (b.createdAt as any)?.seconds * 1000 || 0;
          } else if ((b as any).created_at) {
            const created_at = (b as any).created_at;
            bTime = created_at?.toMillis?.() || created_at?.seconds * 1000 || 0;
          }
          
          return bTime - aTime; // Descending order (newest first)
        });
        
        // Limit to 6 most recent
        const limitedCourses = coursesData.slice(0, 6);
        
        console.log(`Loaded ${limitedCourses.length} published courses (out of ${coursesData.length} total published)`, limitedCourses);
        setNewCourses(limitedCourses);
      } catch (fallbackError) {
        console.error("Error in fallback method:", fallbackError);
        
        // Last resort: try indexed query (might require index)
        try {
          const q = query(
            collection(db, "courses"),
            where("status", "==", "published"),
            orderBy("createdAt", "desc"),
            limit(6)
          );
          const snapshot = await getDocs(q);
          const coursesData: Course[] = [];
          snapshot.forEach((doc) => {
            coursesData.push({ 
              id: doc.id, 
              ...doc.data() 
            } as Course);
          });
          console.log(`Loaded ${coursesData.length} courses using indexed query`);
          setNewCourses(coursesData);
        } catch (indexError: any) {
          console.error("Indexed query also failed:", indexError);
          console.error("This might require creating a Firestore index. Courses may still load using the fallback method.");
          // Set empty array if all methods fail
          setNewCourses([]);
        }
      }
    } catch (error) {
      console.error("Error loading new courses:", error);
      console.error("Full error:", JSON.stringify(error, null, 2));
      setNewCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      // First, get all published courses to collect course images for category previews
      const coursesSnapshot = await getDocs(collection(db, "courses"));
      const courseCategoryMap = new Map<string, string[]>(); // category id/name -> course images
      
      coursesSnapshot.forEach((courseDoc) => {
        const courseData = courseDoc.data();
        if (courseData.status === "published" && courseData.thumbnailImage) {
          // Get category ID if available
          const courseCategoryId = courseData.categoryId || (courseData as any).category_id || "";
          const courseCategoryName = (courseData.category || "").trim().toLowerCase();
          
          if (courseCategoryId) {
            const images = courseCategoryMap.get(courseCategoryId) || [];
            if (images.length < 4) {
              images.push(courseData.thumbnailImage);
              courseCategoryMap.set(courseCategoryId, images);
            }
          }
          
          // Also match by name for categories that might use name instead of ID
          if (courseCategoryName) {
            const images = courseCategoryMap.get(courseCategoryName) || [];
            if (images.length < 4) {
              images.push(courseData.thumbnailImage);
              courseCategoryMap.set(courseCategoryName, images);
            }
          }
        }
      });
      
      // Get ALL active categories from Firestore (matching admin panel)
      const snapshot = await getDocs(collection(db, "categories"));
      const categoriesData: Category[] = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Include ALL active categories (same as admin shows)
        const isActive = !data.status || data.status === "active";
        
        if (isActive) {
          const categoryName = (data.name || "").toLowerCase();
          // Get course images for preview (if any courses use this category)
          const courseImages = courseCategoryMap.get(doc.id) || 
                              courseCategoryMap.get(categoryName) || 
                              [];
          
          categoriesData.push({ 
            categoryId: doc.id, 
            name: data.name || "",
            slug: data.slug || "",
            image: data.image || "",
            description: data.description || "",
            status: data.status || "active",
            courseImages: courseImages
          } as Category);
        }
      });
      
      // Sort by orderIndex if available, otherwise by name (matching admin sorting)
      categoriesData.sort((a, b) => {
        const orderA = (a as any).orderIndex || 0;
        const orderB = (b as any).orderIndex || 0;
        if (orderA !== orderB) return orderA - orderB;
        return a.name.localeCompare(b.name);
      });
      
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const loadAllCourses = async () => {
    try {
      // Fetch all courses from Firestore
      const snapshot = await getDocs(collection(db, "courses"));
      const coursesData: Course[] = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Only include published courses
        if (data.status === "published") {
          coursesData.push({ 
            id: doc.id, 
            ...data 
          } as Course);
        }
      });

      let filtered = coursesData;

      // If there's a search query, filter courses by search term
      if (searchQuery && searchQuery.trim()) {
        const queryLower = searchQuery.toLowerCase().trim();
        filtered = filtered.filter((course) => {
          const title = (course.title || "").toLowerCase();
          const description = (course.shortDescription || "").toLowerCase();
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
      
      setAllCourses(uniqueFiltered);
    } catch (error) {
      console.error("Error loading all courses:", error);
      setAllCourses([]);
    }
  };

  const loadCategoryCourses = async () => {
    try {
      // Fetch all courses from Firestore
      const snapshot = await getDocs(collection(db, "courses"));
      const coursesData: Course[] = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Only include published courses
        if (data.status === "published") {
          coursesData.push({ 
            id: doc.id, 
            ...data 
          } as Course);
        }
      });

      let filtered = coursesData;

      // Filter by category if selected
      if (selectedCategory) {
        filtered = filtered.filter((course) => {
          const courseCategoryId = (course as any).categoryId || (course as any).category_id || "";
          const courseCategoryName = (course.category || "").toLowerCase();
          const selectedCategoryLower = selectedCategory.toLowerCase();
          
          return (
            courseCategoryId === selectedCategory ||
            courseCategoryName === selectedCategoryLower ||
            courseCategoryName.includes(selectedCategoryLower)
          );
        });
      }

      // If there's a search query, filter courses by search term
      if (searchQuery && searchQuery.trim()) {
        const queryLower = searchQuery.toLowerCase().trim();
        filtered = filtered.filter((course) => {
          const title = (course.title || "").toLowerCase();
          const description = (course.shortDescription || "").toLowerCase();
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
      
      setCategoryCourses(uniqueFiltered);
    } catch (error) {
      console.error("Error loading category courses:", error);
      setCategoryCourses([]);
    }
  };

  const loadRecommendedCourses = async () => {
    try {
      // Fetch all courses from Firestore
      const snapshot = await getDocs(collection(db, "courses"));
      const coursesData: Course[] = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Only include published courses
        if (data.status === "published") {
          coursesData.push({ 
            id: doc.id, 
            ...data 
          } as Course);
        }
      });

      let filtered = coursesData;

      // ONLY filter by search query - NOT by category
      // Category selection should not affect "Explore Courses"
      if (searchQuery && searchQuery.trim()) {
        const queryLower = searchQuery.toLowerCase().trim();
        filtered = filtered.filter((course) => {
          const title = (course.title || "").toLowerCase();
          const description = (course.shortDescription || "").toLowerCase();
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
      
      if (searchQuery && searchQuery.trim()) {
        // If there's a search, show search results (limit to 4 for recommended section)
        setRecommendedCourses(uniqueFiltered.slice(0, 4));
      } else {
        // No search - show general recommended courses (featured or newest)
        const featured = filtered.filter(c => (c as any).featured);
        const recommended = featured.length >= 4 
          ? featured.slice(0, 4)
          : filtered.slice(0, 4);
        
        setRecommendedCourses(recommended);
      }
    } catch (error) {
      console.error("Error loading recommended courses:", error);
      setRecommendedCourses([]);
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
        {/* 1. Hero banner (slider, image/video, stats) */}
        <section className="relative bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm uppercase tracking-wide text-blue-300 mb-2">
                Learn · Practice · Earn
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Explore Premium Classes & Learning Paths
              </h1>
              <p className="text-gray-200 mb-6 text-sm md:text-base">
                Live classes, self-paced courses, and hands-on workshops designed
                to move you from beginner to job-ready.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={searchQuery ? `/courses?search=${encodeURIComponent(searchQuery)}` : "/courses"}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600"
                >
                  Explore Courses
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="text-2xl font-bold">150+</div>
                <div className="text-gray-300 mt-1">Courses & workshops</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="text-2xl font-bold">10k+</div>
                <div className="text-gray-300 mt-1">Active learners</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-gray-300 mt-1">
                  Satisfaction score
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-gray-300 mt-1">Anytime access</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. New launches */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2">New Launches</h2>
            <p className="text-sm text-gray-500 mb-6">
              Fresh courses and programs recently added by instructors.
            </p>
            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading new courses...</div>
            ) : newCourses.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No new courses available at the moment.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {newCourses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition"
                  >
                    <div className="h-40 bg-gray-200 relative">
                      {course.thumbnailImage ? (
                        <S3Image
                          src={course.thumbnailImage}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-semibold text-green-600 uppercase">
                        New
                      </p>
                      <h3 className="font-semibold text-lg mt-1 line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {course.shortDescription || "No description available."}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {course.discountedPrice ? (
                            <>
                              <span className="text-lg font-bold text-gray-900">
                                {formatPrice(course.discountedPrice)}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                {formatPrice(course.price)}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-gray-900">
                              {formatPrice(course.price)}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 capitalize">
                          {course.level}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 3. Upcoming live classes / offline workshop */}
        <UpcomingSessions />

        {/* 4. Explore Courses - Infinite Scrolling Carousel */}
        <section className="py-12 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2">
              {searchQuery 
                ? `Recommended Courses for "${searchQuery}"` 
                : "Explore Courses"}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {searchQuery 
                ? "Courses related to your search"
                : "Browse top-rated courses across skills and industries."}
            </p>
            {recommendedCourses.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                {searchQuery 
                  ? `No courses found matching "${searchQuery}"`
                  : "No courses available at the moment."}
              </div>
            ) : (
              <div className="relative">
                {/* Infinite Scrolling Container */}
                <div className="carousel-container">
                  {/* First Set of Courses */}
                  <div className="carousel-track">
                    {recommendedCourses.map((course) => (
                      <Link
                        key={`first-${course.id}`}
                        href={`/courses/${course.id}`}
                        className="carousel-card bg-white rounded-xl border-2 border-gray-200 p-4 hover:shadow-xl hover:border-blue-400 transition-all flex-shrink-0"
                      >
                        <div className="h-40 bg-gray-200 rounded-lg mb-3 relative overflow-hidden">
                          {course.thumbnailImage ? (
                            <S3Image
                              src={course.thumbnailImage}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                              No Image
                            </div>
                          )}
                        </div>
                        <h3 className="font-bold text-base line-clamp-2 mb-2">
                          {course.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-3">
                          {course.category || "Course"} · {course.level || "All Levels"}
                        </p>
                        {course.price && (
                          <p className="text-sm font-bold text-blue-600">
                            {course.discountedPrice ? (
                              <>
                                <span className="line-through text-gray-400 mr-2 text-xs">
                                  {formatPrice(course.price)}
                                </span>
                                {formatPrice(course.discountedPrice)}
                              </>
                            ) : (
                              formatPrice(course.price)
                            )}
                          </p>
                        )}
                      </Link>
                    ))}
                    {/* Duplicate Set for Seamless Loop */}
                    {recommendedCourses.map((course) => (
                      <Link
                        key={`second-${course.id}`}
                        href={`/courses/${course.id}`}
                        className="carousel-card bg-white rounded-xl border-2 border-gray-200 p-4 hover:shadow-xl hover:border-blue-400 transition-all flex-shrink-0"
                      >
                        <div className="h-40 bg-gray-200 rounded-lg mb-3 relative overflow-hidden">
                          {course.thumbnailImage ? (
                            <S3Image
                              src={course.thumbnailImage}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                              No Image
                            </div>
                          )}
                        </div>
                        <h3 className="font-bold text-base line-clamp-2 mb-2">
                          {course.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-3">
                          {course.category || "Course"} · {course.level || "All Levels"}
                        </p>
                        {course.price && (
                          <p className="text-sm font-bold text-blue-600">
                            {course.discountedPrice ? (
                              <>
                                <span className="line-through text-gray-400 mr-2 text-xs">
                                  {formatPrice(course.price)}
                                </span>
                                {formatPrice(course.discountedPrice)}
                              </>
                            ) : (
                              formatPrice(course.price)
                            )}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Carousel Styles */}
          <style jsx>{`
            .carousel-container {
              overflow: hidden;
              position: relative;
              width: 100%;
              padding: 20px 0;
            }

            .carousel-track {
              display: flex;
              gap: 24px;
              animation: scroll 40s linear infinite;
              will-change: transform;
            }

            .carousel-card {
              width: 280px;
              min-width: 280px;
            }

            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }

            .carousel-track:hover {
              animation-play-state: paused;
            }

            /* Gradient fade on edges */
            .carousel-container::before,
            .carousel-container::after {
              content: '';
              position: absolute;
              top: 0;
              bottom: 0;
              width: 100px;
              z-index: 10;
              pointer-events: none;
            }

            .carousel-container::before {
              left: 0;
              background: linear-gradient(to right, white, transparent);
            }

            .carousel-container::after {
              right: 0;
              background: linear-gradient(to left, white, transparent);
            }
          `}</style>
        </section>

        {/* 5. Category Courses - Shows courses when a category is selected */}
        {selectedCategory && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-2">
                {categories.find(c => c.categoryId === selectedCategory)?.name || "Category Courses"}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                All courses in this category
              </p>
              {categoryCourses.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No courses found in this category.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {categoryCourses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/courses/${course.id}`}
                      className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition"
                    >
                      <div className="h-32 bg-gray-200 rounded-md mb-3 relative overflow-hidden">
                        {course.thumbnailImage ? (
                          <S3Image
                            src={course.thumbnailImage}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            No Image
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-sm line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {course.category || "Course"} · {course.level || "All Levels"}
                      </p>
                      {course.price && (
                        <p className="text-xs font-semibold text-blue-600 mt-2">
                          {course.discountedPrice ? (
                            <>
                              <span className="line-through text-gray-400 mr-2">
                                {formatPrice(course.price)}
                              </span>
                              {formatPrice(course.discountedPrice)}
                            </>
                          ) : (
                            formatPrice(course.price)
                          )}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Video Testimonials (for classes page) */}
        <VideoTestimonials />
      </main>

      {/* 9. Common footer */}
      <Footer />
    </div>
  );
}

export default function ClassesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClassesPageContent />
    </Suspense>
  );
}





