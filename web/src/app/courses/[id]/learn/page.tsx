"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db, auth } from "@/lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import { Header } from "@/components/layout/Header";
import { getSignedImageUrl } from "@/lib/s3ImageHelper";
import type { Course, Section, Lesson } from "@/types/course";

export default function CourseLearnPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.id as string | undefined;

  const [course, setCourse] = useState<Course | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user && courseId) {
        checkEnrollmentAndLoadContent(user.uid);
      } else if (!user) {
        router.push(`/login?redirect=/courses/${courseId}/learn`);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [courseId]);

  const checkEnrollmentAndLoadContent = async (userId: string) => {
    if (!courseId) return;

    try {
      // Check enrollment
      const enrollmentId = `${userId}_${courseId}`;
      const enrollmentRef = doc(db, "enrollments", enrollmentId);
      const enrollmentSnap = await getDoc(enrollmentRef);

      if (!enrollmentSnap.exists() || enrollmentSnap.data().status !== "active") {
        alert("You are not enrolled in this course");
        router.push(`/courses/${courseId}`);
        return;
      }

      setIsEnrolled(true);

      // Load course
      const courseRef = doc(db, "courses", courseId);
      const courseSnap = await getDoc(courseRef);
      if (courseSnap.exists()) {
        setCourse({ id: courseSnap.id, ...courseSnap.data() } as Course);
      }

      // Load sections
      const sectionsQuery = query(
        collection(db, "sections"),
        where("courseId", "==", courseId),
        orderBy("orderIndex", "asc")
      );
      const sectionsSnap = await getDocs(sectionsQuery);
      const sectionsData: Section[] = [];
      sectionsSnap.forEach((doc) => {
        sectionsData.push({ id: doc.id, ...doc.data() } as Section);
      });
      setSections(sectionsData);

      // Expand first section by default
      if (sectionsData.length > 0 && sectionsData[0].id) {
        setExpandedSections(new Set([sectionsData[0].id]));
      }

      // Load all lessons
      const lessonsQuery = query(
        collection(db, "lessons"),
        where("courseId", "==", courseId),
        orderBy("orderIndex", "asc")
      );
      const lessonsSnap = await getDocs(lessonsQuery);
      const lessonsData: Lesson[] = [];
      lessonsSnap.forEach((doc) => {
        lessonsData.push({ id: doc.id, ...doc.data() } as Lesson);
      });
      setLessons(lessonsData);

      // Set first lesson as current
      if (lessonsData.length > 0) {
        setCurrentLesson(lessonsData[0]);
        if (lessonsData[0].videoUrl) {
          const url = await getSignedImageUrl(lessonsData[0].videoUrl);
          setVideoUrl(url);
        }
      }
    } catch (error: any) {
      console.error("Error loading course content:", error);
      alert("Failed to load course content");
    } finally {
      setLoading(false);
    }
  };

  const handleLessonClick = async (lesson: Lesson) => {
    setCurrentLesson(lesson);
    if (lesson.videoUrl) {
      const url = await getSignedImageUrl(lesson.videoUrl);
      setVideoUrl(url);
    } else {
      setVideoUrl("");
    }
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center text-white">
          <div>Loading course...</div>
        </div>
      </div>
    );
  }

  if (!isEnrolled || !course) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-4">You don't have access to this course.</p>
          <button
            onClick={() => router.push(`/courses/${courseId}`)}
            className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            View Course Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        {/* Main Content - Video Player */}
        <div className="flex-1 flex flex-col">
          {/* Video Player */}
          <div className="bg-black aspect-video">
            {currentLesson && videoUrl ? (
              <video
                key={videoUrl}
                src={videoUrl}
                controls
                className="w-full h-full"
                autoPlay
              />
            ) : currentLesson && currentLesson.lessonType === "pdf" ? (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <svg className="w-20 h-20 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xl mb-4">PDF Lesson</p>
                  {currentLesson.notesPdfUrl && (
                    <a
                      href={currentLesson.notesPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 inline-block"
                    >
                      Download PDF
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <p className="text-xl">Select a lesson to start learning</p>
                </div>
              </div>
            )}
          </div>

          {/* Lesson Info */}
          {currentLesson && (
            <div className="bg-gray-800 text-white p-6">
              <h1 className="text-2xl font-bold mb-2">{currentLesson.title}</h1>
              {currentLesson.description && (
                <p className="text-gray-300 text-sm">{currentLesson.description}</p>
              )}
            </div>
          )}
        </div>

        {/* Sidebar - Course Content */}
        <div className="w-96 bg-gray-100 overflow-y-auto">
          <div className="p-4 bg-white border-b border-gray-200">
            <h2 className="font-bold text-lg">{course.title}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {lessons.length} lessons in {sections.length} sections
            </p>
          </div>

          <div className="p-4 space-y-2">
            {sections.map((section) => {
              const sectionLessons = lessons.filter((l) => l.sectionId === section.id);
              const isExpanded = expandedSections.has(section.id || "");

              return (
                <div key={section.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <button
                    onClick={() => section.id && toggleSection(section.id)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-sm">{section.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {sectionLessons.length} lessons
                      </p>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-gray-200">
                      {sectionLessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => handleLessonClick(lesson)}
                          className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-50 transition text-left ${
                            currentLesson?.id === lesson.id
                              ? "bg-blue-50 border-l-4 border-blue-600"
                              : ""
                          }`}
                        >
                          <div className="flex-shrink-0">
                            {lesson.lessonType === "video" ? (
                              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{lesson.title}</p>
                            {lesson.videoDuration && (
                              <p className="text-xs text-gray-500 mt-1">
                                {Math.floor(lesson.videoDuration / 60)}:{String(lesson.videoDuration % 60).padStart(2, "0")} min
                              </p>
                            )}
                          </div>
                          {lesson.isFreePreview && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                              FREE
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {sections.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-sm">No lessons available yet</p>
                <p className="text-xs mt-1">Check back later for updates</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

