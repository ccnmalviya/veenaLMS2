"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where, orderBy, doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Course } from "@/types/course";
import { S3Image } from "@/components/common/S3Image";

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      const userRef = doc(db, "users", user.uid);
      const userSnap = await (await import("firebase/firestore")).getDoc(userRef);
      const userData = userSnap.data();
      if (userData?.role !== "super_admin" && userData?.role !== "admin") {
        router.push("/dashboard");
        return;
      }
      loadCourses();
    });
    return () => unsubscribe();
  }, [router]);

  const loadCourses = async () => {
    try {
      setLoading(true);
      // Query from the courses collection
      let q;
      try {
        q = query(
          collection(db, "courses"),
          orderBy("createdAt", "desc")
        );
      } catch (error) {
        // Fallback to old field name if index doesn't exist
        try {
          q = query(
            collection(db, "courses"),
            orderBy("created_at", "desc")
          );
        } catch (fallbackError) {
          // If both fail, get all without ordering
          console.warn("Could not use ordered query for courses, using fallback");
          q = query(collection(db, "courses"));
        }
      }
      
      const snapshot = await getDocs(q);
      const coursesData: Course[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        coursesData.push({ 
          id: doc.id, 
          ...data 
        } as Course);
      });
      setCourses(coursesData);
    } catch (error) {
      console.error("Error loading courses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Courses Management</h1>
            <p className="text-gray-600 mt-2">Create and manage courses, curriculum, and content</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/admin/courses/populate-dummy")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              📚 Populate Dummy Courses
            </button>
            <button
              onClick={() => router.push("/admin/courses/new")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + Create Course
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No courses found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow p-6">
                <div className="mb-4">
                  {course.thumbnailImage ? (
                    <div className="w-full h-40 rounded-lg overflow-hidden mb-3">
                      <S3Image
                        src={course.thumbnailImage}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-40 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-400">No Thumbnail</span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p className="text-xs text-gray-500 mb-2">Slug: {course.slug}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-blue-600">
                    ₹{course.discountedPrice || course.price}
                    {course.discountedPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ₹{course.price}
                      </span>
                    )}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    course.status === "published" ? "bg-green-100 text-green-800" : 
                    course.status === "draft" ? "bg-yellow-100 text-yellow-800" : 
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {course.status}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="text-xs text-gray-500">
                    Level: {course.level} | Language: {course.language}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/admin/courses/${course.id}`)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    View/Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
