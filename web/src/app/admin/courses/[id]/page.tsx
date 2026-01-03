"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, updateDoc, deleteDoc, addDoc, serverTimestamp, getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { FileUpload } from "@/components/admin/FileUpload";
import { S3Image } from "@/components/common/S3Image";
import { Plus, X, Edit2, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import type {
  CourseLanguage,
  CourseLevel,
  CourseStatus,
  CourseAccessType,
  CourseEnrollmentType,
  Course,
  Section,
  SectionUnlockRule,
  Lesson,
  LessonType,
  VideoSource,
  CompletionRule,
  Quiz,
  QuizType,
  Progress,
  Review,
} from "@/types/course";
import type { Category } from "@/types/store";

export default function CourseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [instructors, setInstructors] = useState<Array<{ id: string; name: string; email: string }>>([]);
  const [allCourses, setAllCourses] = useState<Array<{ id: string; title: string }>>([]);
  const [allLessons, setAllLessons] = useState<Array<{ id: string; courseId: string; sectionId: string; title: string }>>([]);
  const [tagsInput, setTagsInput] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [isEditing, setIsEditing] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [showSectionForm, setShowSectionForm] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [sectionFormData, setSectionFormData] = useState<Partial<Section>>({
    title: "",
    description: "",
    orderIndex: 0,
    unlockRule: "paid",
  });
  const [lessons, setLessons] = useState<Record<string, Lesson[]>>({}); // key: sectionId
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set()); // lessonId
  const [showLessonForm, setShowLessonForm] = useState<string | null>(null); // sectionId or null
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [lessonFormData, setLessonFormData] = useState<Partial<Lesson>>({
    title: "",
    lessonType: "video",
    videoSource: "s3",
    videoUrl: "",
    videoDuration: 0,
    description: "",
    orderIndex: 0,
    isFreePreview: false,
    notesPdfUrl: "",
    transcriptText: "",
    completionRule: "watch_percentage",
    watchPercentageRequired: 100,
    dripDelayDays: undefined,
  });
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [quizzes, setQuizzes] = useState<Record<string, Quiz[]>>({}); // key: lessonId
  const [showQuizForm, setShowQuizForm] = useState<string | null>(null); // lessonId or null
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [studentProgress, setStudentProgress] = useState<Array<{
    userId: string;
    userName: string;
    userEmail: string;
    progressData: Progress[];
    overallProgress: number;
    lessonsCompleted: number;
    totalLessons: number;
  }>>([]);
  const [progressLoading, setProgressLoading] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [analytics, setAnalytics] = useState<{
    totalEnrollments: number;
    activeStudents: number;
    completionRate: number;
    revenueGenerated: number;
    lessonDropOffData: Array<{ lessonId: string; lessonTitle: string; enrollments: number; completions: number; dropOffRate: number }>;
    engagementGraphData: Array<{ date: string; activeUsers: number; lessonsCompleted: number }>;
  }>({
    totalEnrollments: 0,
    activeStudents: 0,
    completionRate: 0,
    revenueGenerated: 0,
    lessonDropOffData: [],
    engagementGraphData: [],
  });
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [quizFormData, setQuizFormData] = useState<Partial<Quiz>>({
    title: "",
    quizType: "mcq",
    totalMarks: 100,
    passingMarks: 50,
    timeLimitMinutes: undefined,
    attemptsAllowed: 1,
    shuffleQuestions: false,
    showResultImmediately: true,
    certificateEligible: false,
  });

  const [formData, setFormData] = useState<Partial<Course>>({
    // Core fields
    title: "",
    slug: "",
    shortDescription: "",
    fullDescription: "",
    language: "english",
    category: "",
    subCategory: "",
    tags: [],
    level: "beginner",
    courseType: "video_course",
    instructors: [],
    thumbnailImage: "",
    promoVideoUrl: "",
    status: "draft",
    
    // Pricing & Monetization
    price: 0,
    discountedPrice: undefined,
    discountStartDate: undefined,
    discountEndDate: undefined,
    currency: "INR",
    gstApplicable: false,
    accessType: "lifetime",
    accessDurationDays: undefined,
    installmentEnabled: false,
    affiliateCommissionPercentage: undefined,
    
    // Bundles & Offers
    allowBundle: false,
    bundleCourseIds: [],
    bonusContentIds: [],
    couponAllowed: false,
    maxCouponDiscountPercentage: undefined,
    
    // Enrollment & Access Control
    enrollmentType: "auto",
    maxEnrollments: undefined,
    deviceLimit: undefined,
    allowDownloads: false,
    screenRecordingBlocked: false,
    ipRestrictionEnabled: false,
    
    // Certificate
    certificateEnabled: false,
    certificateTemplateId: undefined,
    certificateIssueRule: undefined,
    
    // Reviews & Ratings
    allowReviews: true,
    autoApproveReviews: false,
    
    // SEO & Marketing
    seoTitle: "",
    metaDescription: "",
    ogImage: "",
    landingPageHeadline: "",
    ctaText: "",
    
    // Notifications & Automation
    notificationsEnabled: true,
    notifyOnPurchase: true,
    notifyOnPurchaseEmail: true,
    notifyOnPurchaseWhatsApp: false,
    notifyOnLessonCompletion: true,
    notifyOnCourseCompletion: true,
    notifyOnCourseCompletionEmail: true,
    notifyOnInactivity: false,
    inactivityDays: 7,
  });

  useEffect(() => {
    loadCategories();
    loadInstructors();
    loadAllCourses();
    loadCourse();
    loadSections();
  }, [courseId]);

  useEffect(() => {
    // Load lessons for all sections when sections change
    if (sections.length > 0) {
      sections.forEach((section) => {
        if (section.id) {
          loadLessonsForSection(section.id);
        }
      });
    }
  }, [sections]);

  useEffect(() => {
    // Load all lessons from all courses for bonus content selection
    const loadAllLessons = async () => {
      try {
        const snapshot = await getDocs(collection(db, "lessons"));
        const lessonsData: Array<{ id: string; courseId: string; sectionId: string; title: string }> = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          lessonsData.push({
            id: doc.id,
            courseId: data.courseId || "",
            sectionId: data.sectionId || "",
            title: data.title || "Untitled Lesson",
          });
        });
        setAllLessons(lessonsData);
      } catch (error) {
        console.error("Error loading all lessons:", error);
      }
    };
    loadAllLessons();
  }, []);

  useEffect(() => {
    // Load quizzes for all lessons when lessons change
    Object.entries(lessons).forEach(([sectionId, sectionLessons]) => {
      sectionLessons.forEach((lesson) => {
        if (lesson.id) {
          loadQuizzesForLesson(lesson.id);
        }
      });
    });
  }, [lessons]);

  useEffect(() => {
    // Update tags input when formData.tags changes
    if (formData.tags) {
      setTagsInput(formData.tags.join(", "));
    }
  }, [formData.tags]);

  const loadCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, "categories"));
      const categoriesData: Category[] = [];
      snapshot.forEach((doc) => {
        categoriesData.push({ categoryId: doc.id, ...doc.data() } as Category);
      });
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const loadInstructors = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const instructorsData: Array<{ id: string; name: string; email: string }> = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        instructorsData.push({
          id: doc.id,
          name: data.name || data.email || "Unknown",
          email: data.email || "",
        });
      });
      setInstructors(instructorsData);
    } catch (error) {
      console.error("Error loading instructors:", error);
    }
  };

  const loadAllCourses = async () => {
    try {
      const snapshot = await getDocs(collection(db, "courses"));
      const coursesData: Array<{ id: string; title: string }> = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Exclude current course from bundle options
        if (doc.id !== courseId) {
          coursesData.push({
            id: doc.id,
            title: data.title || "Untitled Course",
          });
        }
      });
      setAllCourses(coursesData);
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  const loadCourse = async () => {
    try {
      setLoading(true);
      const courseRef = doc(db, "courses", courseId);
      const courseSnap = await getDoc(courseRef);
      
      if (!courseSnap.exists()) {
        alert("Course not found");
        router.push("/admin/courses");
        return;
      }

      const data = courseSnap.data();
      setFormData({
        ...data,
        id: courseSnap.id,
      } as Partial<Course>);
    } catch (error) {
      console.error("Error loading course:", error);
      alert("Failed to load course");
      router.push("/admin/courses");
    } finally {
      setLoading(false);
    }
  };

  const loadSections = async () => {
    try {
      // Fetch all sections and filter/sort in memory to avoid index requirements
      const snapshot = await getDocs(collection(db, "sections"));
      const sectionsData: Section[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Only include sections for this course
        if (data.courseId === courseId) {
          sectionsData.push({ id: doc.id, ...data } as Section);
        }
      });
      // Sort manually by orderIndex
      sectionsData.sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
      setSections(sectionsData);
    } catch (error) {
      console.error("Error loading sections:", error);
      setSections([]);
    }
  };

  const handleAddSection = () => {
    setEditingSection(null);
    setSectionFormData({
      title: "",
      description: "",
      orderIndex: sections.length,
      unlockRule: "paid",
    });
    setShowSectionForm(true);
  };

  const handleEditSection = (section: Section) => {
    setEditingSection(section);
    setSectionFormData({
      title: section.title,
      description: section.description || "",
      orderIndex: section.orderIndex,
      unlockRule: section.unlockRule,
    });
    setShowSectionForm(true);
  };

  const handleSaveSection = async () => {
    if (!sectionFormData.title?.trim()) {
      alert("Please enter a section title");
      return;
    }

    try {
      const sectionData: any = {
        courseId: courseId,
        title: sectionFormData.title,
        orderIndex: sectionFormData.orderIndex || sections.length,
        unlockRule: sectionFormData.unlockRule || "paid",
        updatedAt: serverTimestamp(),
      };

      if (sectionFormData.description) {
        sectionData.description = sectionFormData.description;
      }

      if (editingSection?.id) {
        // Update existing section
        const sectionRef = doc(db, "sections", editingSection.id);
        await updateDoc(sectionRef, sectionData);
        alert("Section updated successfully!");
      } else {
        // Create new section
        sectionData.createdAt = serverTimestamp();
        await addDoc(collection(db, "sections"), sectionData);
        alert("Section created successfully!");
      }

      setShowSectionForm(false);
      setEditingSection(null);
      loadSections();
    } catch (error) {
      console.error("Error saving section:", error);
      alert("Failed to save section. Please check console for details.");
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!confirm("Are you sure you want to delete this section? This will also delete all lessons in this section.")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "sections", sectionId));
      alert("Section deleted successfully!");
      loadSections();
    } catch (error) {
      console.error("Error deleting section:", error);
      alert("Failed to delete section. Please check console for details.");
    }
  };

  const handleMoveSection = async (sectionId: string, direction: "up" | "down") => {
    const sectionIndex = sections.findIndex((s) => s.id === sectionId);
    if (sectionIndex === -1) return;

    const newIndex = direction === "up" ? sectionIndex - 1 : sectionIndex + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;

    const section = sections[sectionIndex];
    const swapSection = sections[newIndex];

    try {
      // Swap orderIndex values
      await updateDoc(doc(db, "sections", section.id!), {
        orderIndex: swapSection.orderIndex,
        updatedAt: serverTimestamp(),
      });
      await updateDoc(doc(db, "sections", swapSection.id!), {
        orderIndex: section.orderIndex,
        updatedAt: serverTimestamp(),
      });
      loadSections();
    } catch (error) {
      console.error("Error moving section:", error);
      alert("Failed to move section. Please check console for details.");
    }
  };

  const loadLessonsForSection = async (sectionId: string) => {
    try {
      console.log("=== Loading lessons for section:", sectionId);
      
      // Use fallback method: get all lessons and filter in memory
      // This avoids the Firestore index requirement
      try {
        const allLessonsSnapshot = await getDocs(collection(db, "lessons"));
        console.log(`Total lessons in database: ${allLessonsSnapshot.size}`);
        
        const lessonsData: Lesson[] = [];
        allLessonsSnapshot.forEach((doc) => {
          const data = doc.data();
          // Compare sectionIds as strings to ensure they match
          if (String(data.sectionId) === String(sectionId)) {
            console.log(`Found matching lesson: ${doc.id} for section ${sectionId}`, {
              id: doc.id,
              sectionId: data.sectionId,
              title: data.title,
              orderIndex: data.orderIndex
            });
            lessonsData.push({ id: doc.id, ...data } as Lesson);
          } else {
            console.log(`Lesson ${doc.id} doesn't match - stored sectionId: "${data.sectionId}" vs query sectionId: "${sectionId}"`);
          }
        });
        
        // Sort by orderIndex
        lessonsData.sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
        
        console.log(`=== Loaded ${lessonsData.length} lessons for section ${sectionId}:`, lessonsData);
        
        setLessons((prev) => {
          const updated = {
            ...prev,
            [sectionId]: lessonsData,
          };
          console.log("Updated lessons state:", updated);
          return updated;
        });
        
        return;
      } catch (fallbackError) {
        console.error("Error in fallback method:", fallbackError);
        // If even the fallback fails, set empty array
        setLessons((prev) => ({
          ...prev,
          [sectionId]: [],
        }));
      }
      
      // Try with index-based query (if index exists)
      try {
        const q = query(
          collection(db, "lessons"),
          where("sectionId", "==", sectionId),
          orderBy("orderIndex", "asc")
        );
        const snapshot = await getDocs(q);
        const lessonsData: Lesson[] = [];
        snapshot.forEach((doc) => {
          lessonsData.push({ id: doc.id, ...doc.data() } as Lesson);
        });
        setLessons((prev) => ({
          ...prev,
          [sectionId]: lessonsData,
        }));
      } catch (indexError: any) {
        // Index doesn't exist - this is expected, fallback method already handled it
        console.log("Index-based query not available (this is OK):", indexError.message);
      }
    } catch (error) {
      console.error(`Error loading lessons for section ${sectionId}:`, error);
      // Set empty array on error to prevent UI issues
      setLessons((prev) => ({
        ...prev,
        [sectionId]: [],
      }));
    }
  };

  const toggleSectionExpanded = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const handleAddLesson = (sectionId: string) => {
    const sectionLessons = lessons[sectionId] || [];
    setEditingLesson(null);
    setVideoFile(null);
    setLessonFormData({
      title: "",
      lessonType: "video",
      videoSource: "s3",
      videoUrl: "",
      videoDuration: 0,
      description: "",
      orderIndex: sectionLessons.length,
      isFreePreview: false,
      notesPdfUrl: "",
      transcriptText: "",
      completionRule: "watch_percentage",
      watchPercentageRequired: 100,
      dripDelayDays: undefined,
    });
    setShowLessonForm(sectionId);
    // Expand section if not already expanded
    if (!expandedSections.has(sectionId)) {
      toggleSectionExpanded(sectionId);
    }
  };

  const handleEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setVideoFile(null); // Clear any video file when editing
    setLessonFormData({
      title: lesson.title,
      lessonType: lesson.lessonType,
      videoSource: lesson.videoSource,
      videoUrl: lesson.videoUrl || "",
      videoDuration: lesson.videoDuration || 0,
      description: lesson.description || "",
      orderIndex: lesson.orderIndex,
      isFreePreview: lesson.isFreePreview || false,
      notesPdfUrl: lesson.notesPdfUrl || "",
      transcriptText: lesson.transcriptText || "",
      completionRule: lesson.completionRule,
      watchPercentageRequired: lesson.watchPercentageRequired || 100,
      dripDelayDays: lesson.dripDelayDays,
    });
    setShowLessonForm(lesson.sectionId);
    // Expand section if not already expanded
    if (!expandedSections.has(lesson.sectionId)) {
      toggleSectionExpanded(lesson.sectionId);
    }
  };

  const handleSaveLesson = async () => {
    if (!lessonFormData.title?.trim()) {
      alert("Please enter a lesson title");
      return;
    }

    if (!showLessonForm) {
      alert("Section ID is missing");
      return;
    }

    if (lessonFormData.lessonType === "video" && !lessonFormData.videoUrl?.trim() && !videoFile) {
      alert("Please upload a video file for video lessons");
      return;
    }

    try {
      // Helper function to remove undefined values
      const removeUndefined = (obj: any): any => {
        const cleaned: any = {};
        for (const key in obj) {
          if (obj[key] !== undefined && key !== "id") {
            cleaned[key] = obj[key];
          }
        }
        return cleaned;
      };

      const sectionId = showLessonForm; // Save sectionId before clearing state
      
      const lessonData: any = {
        courseId: courseId,
        sectionId: sectionId,
        title: lessonFormData.title,
        lessonType: lessonFormData.lessonType || "video",
        orderIndex: lessonFormData.orderIndex || 0,
        isFreePreview: lessonFormData.isFreePreview || false,
        completionRule: lessonFormData.completionRule || "watch_percentage",
        updatedAt: serverTimestamp(),
      };

      // Add optional fields only if they have values
      if (lessonFormData.description) lessonData.description = lessonFormData.description;
      if (lessonFormData.lessonType === "video") {
        if (lessonFormData.videoSource) lessonData.videoSource = lessonFormData.videoSource;
        if (lessonFormData.videoUrl) lessonData.videoUrl = lessonFormData.videoUrl;
        if (lessonFormData.videoDuration !== undefined && lessonFormData.videoDuration !== null) {
          lessonData.videoDuration = lessonFormData.videoDuration;
        }
      }
      if (lessonFormData.notesPdfUrl) lessonData.notesPdfUrl = lessonFormData.notesPdfUrl;
      if (lessonFormData.transcriptText) lessonData.transcriptText = lessonFormData.transcriptText;
      if (lessonFormData.completionRule === "watch_percentage" && lessonFormData.watchPercentageRequired !== undefined) {
        lessonData.watchPercentageRequired = lessonFormData.watchPercentageRequired;
      }
      if (lessonFormData.dripDelayDays !== undefined && lessonFormData.dripDelayDays !== null) {
        lessonData.dripDelayDays = lessonFormData.dripDelayDays;
      }

      // Remove undefined values before saving
      const cleanedLessonData = removeUndefined(lessonData);

      console.log("=== SAVING LESSON ===");
      console.log("Lesson data to save:", cleanedLessonData);
      console.log("Section ID being used:", sectionId);
      console.log("Section ID type:", typeof sectionId);
      console.log("Course ID:", courseId);
      
      // Verify sectionId exists in sections
      const sectionExists = sections.find(s => s.id === sectionId);
      console.log("Section exists in loaded sections?", sectionExists);
      console.log("All loaded section IDs:", sections.map(s => s.id));

      if (editingLesson?.id) {
        // Update existing lesson
        const lessonRef = doc(db, "lessons", editingLesson.id);
        await updateDoc(lessonRef, cleanedLessonData);
        console.log("Lesson updated successfully!");
        alert("Lesson updated successfully!");
      } else {
        // Create new lesson
        cleanedLessonData.createdAt = serverTimestamp();
        console.log("Creating lesson with cleaned data:", cleanedLessonData);
        const docRef = await addDoc(collection(db, "lessons"), cleanedLessonData);
        console.log("Lesson created successfully with ID:", docRef.id);
        console.log("Lesson data saved:", {
          id: docRef.id,
          courseId: cleanedLessonData.courseId,
          sectionId: cleanedLessonData.sectionId,
          title: cleanedLessonData.title
        });
        alert("Lesson created successfully!");
      }

      // Wait a bit for Firestore to update
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Reload lessons for the section BEFORE clearing form (using saved sectionId)
      console.log("Reloading lessons for section:", sectionId);
      await loadLessonsForSection(sectionId);
      console.log("Lessons reloaded for section:", sectionId);
      
      // Double-check by reloading again after a short delay
      setTimeout(async () => {
        console.log("Second reload attempt for section:", sectionId);
        await loadLessonsForSection(sectionId);
      }, 1000);
      
      // Ensure section is expanded to show the newly created lesson
      if (!expandedSections.has(sectionId)) {
        setExpandedSections((prev) => {
          const newSet = new Set(prev);
          newSet.add(sectionId);
          console.log("Expanded sections updated:", Array.from(newSet));
          return newSet;
        });
      }
      
      // Clear form state AFTER reload
      setShowLessonForm(null);
      setEditingLesson(null);
      setVideoFile(null);
      
      // Force a state update to trigger re-render
      setLessons((prev) => {
        console.log("Force updating lessons state for re-render");
        return { ...prev };
      });
    } catch (error) {
      console.error("Error saving lesson:", error);
      console.error("Full error details:", JSON.stringify(error, null, 2));
      alert(`Failed to save lesson: ${error instanceof Error ? error.message : "Unknown error"}. Please check console for details.`);
    }
  };

  const handleDeleteLesson = async (lessonId: string, sectionId: string) => {
    if (!confirm("Are you sure you want to delete this lesson?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "lessons", lessonId));
      alert("Lesson deleted successfully!");
      loadLessonsForSection(sectionId);
    } catch (error) {
      console.error("Error deleting lesson:", error);
      alert("Failed to delete lesson. Please check console for details.");
    }
  };

  const handleMoveLesson = async (lessonId: string, sectionId: string, direction: "up" | "down") => {
    const sectionLessons = lessons[sectionId] || [];
    const lessonIndex = sectionLessons.findIndex((l) => l.id === lessonId);
    if (lessonIndex === -1) return;

    const newIndex = direction === "up" ? lessonIndex - 1 : lessonIndex + 1;
    if (newIndex < 0 || newIndex >= sectionLessons.length) return;

    const lesson = sectionLessons[lessonIndex];
    const swapLesson = sectionLessons[newIndex];

    try {
      // Swap orderIndex values
      await updateDoc(doc(db, "lessons", lesson.id!), {
        orderIndex: swapLesson.orderIndex,
        updatedAt: serverTimestamp(),
      });
      await updateDoc(doc(db, "lessons", swapLesson.id!), {
        orderIndex: lesson.orderIndex,
        updatedAt: serverTimestamp(),
      });
      loadLessonsForSection(sectionId);
    } catch (error) {
      console.error("Error moving lesson:", error);
      alert("Failed to move lesson. Please check console for details.");
    }
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(Math.floor(video.duration));
      };
      
      video.onerror = () => {
        reject(new Error("Failed to load video metadata"));
      };
      
      video.src = URL.createObjectURL(file);
    });
  };

  const handleVideoUpload = async (file: File) => {
    try {
      setVideoUploading(true);
      setVideoFile(file);

      // Get video duration
      const duration = await getVideoDuration(file);
      setLessonFormData((prev) => ({ ...prev, videoDuration: duration }));

      // Upload video to S3
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", `courses/lessons/${courseId}`);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Video upload failed");
      }

      // Update lesson data with uploaded video URL
      setLessonFormData((prev) => ({
        ...prev,
        videoUrl: data.url,
        videoSource: "s3",
        videoDuration: duration,
      }));

      alert("Video uploaded successfully! Duration: " + formatDuration(duration));
    } catch (error: any) {
      console.error("Video upload error:", error);
      alert("Failed to upload video: " + (error.message || "Unknown error"));
    } finally {
      setVideoUploading(false);
    }
  };

  const loadStudentProgress = async () => {
    try {
      setProgressLoading(true);
      
      // Get all progress records for this course
      const progressQuery = query(
        collection(db, "progress"),
        where("courseId", "==", courseId)
      );
      const progressSnapshot = await getDocs(progressQuery);
      
      // Get all lessons for this course to calculate total
      const allCourseLessons: Lesson[] = [];
      Object.values(lessons).forEach((sectionLessons) => {
        allCourseLessons.push(...sectionLessons);
      });
      const totalLessons = allCourseLessons.length;

      // Group progress by userId
      const progressByUser: Record<string, {
        userId: string;
        progressData: Progress[];
      }> = {};

      progressSnapshot.forEach((doc) => {
        const progress = { id: doc.id, ...doc.data() } as Progress;
        if (!progressByUser[progress.userId]) {
          progressByUser[progress.userId] = {
            userId: progress.userId,
            progressData: [],
          };
        }
        progressByUser[progress.userId].progressData.push(progress);
      });

      // Get user details and calculate overall progress
      const studentProgressData: Array<{
        userId: string;
        userName: string;
        userEmail: string;
        progressData: Progress[];
        overallProgress: number;
        lessonsCompleted: number;
        totalLessons: number;
      }> = [];

      for (const [userId, userProgress] of Object.entries(progressByUser)) {
        try {
          const userDoc = await getDoc(doc(db, "users", userId));
          const userData = userDoc.data();
          
          const completedLessons = userProgress.progressData.filter((p) => p.completed).length;
          const overallProgress = totalLessons > 0 
            ? Math.round((completedLessons / totalLessons) * 100) 
            : 0;

          studentProgressData.push({
            userId,
            userName: userData?.name || "Unknown User",
            userEmail: userData?.email || "No email",
            progressData: userProgress.progressData,
            overallProgress,
            lessonsCompleted: completedLessons,
            totalLessons,
          });
        } catch (error) {
          console.error(`Error loading user ${userId}:`, error);
        }
      }

      // Sort by overall progress (descending)
      studentProgressData.sort((a, b) => b.overallProgress - a.overallProgress);
      
      setStudentProgress(studentProgressData);
    } catch (error) {
      console.error("Error loading student progress:", error);
      alert("Failed to load student progress. Please check console for details.");
    } finally {
      setProgressLoading(false);
    }
  };

  useEffect(() => {
    // Load progress when progress tab is active and we have lessons loaded
    if (activeTab === "progress" && Object.keys(lessons).length > 0) {
      loadStudentProgress();
    }
  }, [activeTab, courseId, lessons]);

  useEffect(() => {
    // Load reviews when reviews tab is active
    if (activeTab === "reviews") {
      loadReviews();
    }
  }, [activeTab, courseId]);

  useEffect(() => {
    // Load analytics when analytics tab is active
    if (activeTab === "analytics") {
      loadAnalytics();
    }
  }, [activeTab, courseId, lessons]);

  const loadReviews = async () => {
    try {
      setReviewsLoading(true);
      const reviewsQuery = query(
        collection(db, "reviews"),
        where("courseId", "==", courseId),
        orderBy("createdAt", "desc")
      );
      
      let snapshot;
      try {
        snapshot = await getDocs(reviewsQuery);
      } catch (error) {
        // Fallback without orderBy if index doesn't exist
        const fallbackQuery = query(
          collection(db, "reviews"),
          where("courseId", "==", courseId)
        );
        snapshot = await getDocs(fallbackQuery);
      }

      const reviewsData: Review[] = [];
      snapshot.forEach((doc) => {
        reviewsData.push({ id: doc.id, ...doc.data() } as Review);
      });

      // Sort manually if orderBy failed
      reviewsData.sort((a, b) => {
        const aTime = a.createdAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || 0;
        return bTime - aTime;
      });

      setReviews(reviewsData);

      // Calculate average rating from approved reviews only
      const approvedReviews = reviewsData.filter((r) => r.approved);
      if (approvedReviews.length > 0) {
        const totalRating = approvedReviews.reduce((sum, review) => sum + (review.rating || 0), 0);
        const avg = totalRating / approvedReviews.length;
        const calculatedAvg = Math.round(avg * 10) / 10; // Round to 1 decimal place
        setAverageRating(calculatedAvg);
        // Update formData with calculated average rating
        setFormData((prev) => ({ ...prev, averageRating: calculatedAvg }));
      } else {
        setAverageRating(0);
        setFormData((prev) => ({ ...prev, averageRating: 0 }));
      }
    } catch (error) {
      console.error("Error loading reviews:", error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleApproveReview = async (reviewId: string) => {
    try {
      const reviewRef = doc(db, "reviews", reviewId);
      await updateDoc(reviewRef, {
        approved: true,
        updatedAt: serverTimestamp(),
      });
      loadReviews();
      alert("Review approved successfully!");
    } catch (error) {
      console.error("Error approving review:", error);
      alert("Failed to approve review. Please check console for details.");
    }
  };

  const handleRejectReview = async (reviewId: string) => {
    if (!confirm("Are you sure you want to reject this review? It will no longer be visible to students.")) {
      return;
    }
    try {
      const reviewRef = doc(db, "reviews", reviewId);
      await updateDoc(reviewRef, {
        approved: false,
        updatedAt: serverTimestamp(),
      });
      loadReviews();
      alert("Review rejected successfully!");
    } catch (error) {
      console.error("Error rejecting review:", error);
      alert("Failed to reject review. Please check console for details.");
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review? This action cannot be undone.")) {
      return;
    }
    try {
      await deleteDoc(doc(db, "reviews", reviewId));
      loadReviews();
      alert("Review deleted successfully!");
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review. Please check console for details.");
    }
  };

  const [progressRecords, setProgressRecords] = useState<Progress[]>([]);

  const loadAnalytics = async () => {
    try {
      setAnalyticsLoading(true);

      // Get all enrollments for this course
      const enrollmentsQuery = query(
        collection(db, "enrollments"),
        where("courseId", "==", courseId)
      );
      const enrollmentsSnapshot = await getDocs(enrollmentsQuery);
      
      const enrollments: Array<{ id: string; userId: string; status: string; enrolledAt: any }> = [];
      enrollmentsSnapshot.forEach((doc) => {
        const data = doc.data();
        enrollments.push({
          id: doc.id,
          userId: data.userId || "",
          status: data.status || "active",
          enrolledAt: data.enrolledAt || data.enrolled_at,
        });
      });

      // Get all progress records for this course
      const progressQuery = query(
        collection(db, "progress"),
        where("courseId", "==", courseId)
      );
      const progressSnapshot = await getDocs(progressQuery);
      
      const progressData: Progress[] = [];
      progressSnapshot.forEach((doc) => {
        progressData.push({ id: doc.id, ...doc.data() } as Progress);
      });
      setProgressRecords(progressData);

      // Get all lessons for this course
      const allLessons: Lesson[] = [];
      Object.values(lessons).forEach((sectionLessons) => {
        allLessons.push(...sectionLessons);
      });

      // Calculate total enrollments
      const totalEnrollments = enrollments.length;

      // Calculate active students (enrolled with status 'active')
      const activeStudents = enrollments.filter((e) => e.status === "active").length;

      // Calculate completion rate
      const userIds = new Set(enrollments.map((e) => e.userId));
      const completedUsers = new Set<string>();
      
      // Group progress by userId to check course completion
      const progressByUser: Record<string, Progress[]> = {};
      progressData.forEach((p) => {
        if (!progressByUser[p.userId]) {
          progressByUser[p.userId] = [];
        }
        progressByUser[p.userId].push(p);
      });

      // A user has completed the course if they've completed all lessons
      userIds.forEach((userId) => {
        const userProgress = progressByUser[userId] || [];
        const completedLessons = userProgress.filter((p) => p.completed);
        if (completedLessons.length === allLessons.length && allLessons.length > 0) {
          completedUsers.add(userId);
        }
      });

      const completionRate = totalEnrollments > 0 
        ? Math.round((completedUsers.size / totalEnrollments) * 100) 
        : 0;

      // Calculate revenue - try to get from payments/orders, fallback to estimate
      let revenueGenerated = 0;
      try {
        // Try to query orders/payments collection if it exists
        const ordersQuery = query(
          collection(db, "orders"),
          where("courseId", "==", courseId)
        );
        const ordersSnapshot = await getDocs(ordersQuery);
        
        if (ordersSnapshot.size > 0) {
          ordersSnapshot.forEach((doc) => {
            const orderData = doc.data();
            // Sum up order amounts (adjust field names based on your order structure)
            const amount = orderData.amount || orderData.totalAmount || orderData.price || 0;
            revenueGenerated += amount;
          });
        } else {
          // Fallback: estimate based on enrollments and course price
          revenueGenerated = enrollments.length * (formData.price || 0);
        }
      } catch (error) {
        // If orders collection doesn't exist or query fails, use estimate
        console.warn("Could not query orders collection, using enrollment-based estimate:", error);
        revenueGenerated = enrollments.length * (formData.price || 0);
      }

      // Calculate lesson drop-off data
      const lessonDropOffData = allLessons.map((lesson) => {
        const lessonProgress = progressData.filter((p) => p.lessonId === lesson.id);
        const startedLesson = new Set(lessonProgress.map((p) => p.userId)).size;
        const completedLesson = lessonProgress.filter((p) => p.completed).length;
        const dropOffRate = startedLesson > 0 
          ? Math.round(((startedLesson - completedLesson) / startedLesson) * 100) 
          : 0;

        return {
          lessonId: lesson.id || "",
          lessonTitle: lesson.title,
          enrollments: totalEnrollments,
          completions: completedLesson,
          dropOffRate,
        };
      });

      // Calculate engagement graph data (last 30 days)
      const engagementData: Array<{ date: string; activeUsers: number; lessonsCompleted: number }> = [];
      const today = new Date();
      
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split("T")[0];
        
        // Count enrollments on this date (as a proxy for active users)
        const enrollmentsOnDate = enrollments.filter((e) => {
          if (!e.enrolledAt) return false;
          const enrolledDate = e.enrolledAt.seconds 
            ? new Date(e.enrolledAt.seconds * 1000).toISOString().split("T")[0]
            : null;
          return enrolledDate === dateStr;
        }).length;

        // Count lessons completed on this date (if we have updatedAt in progress)
        const lessonsCompletedOnDate = progressData.filter((p) => {
          if (!p.updatedAt || !p.completed) return false;
          const updatedDate = p.updatedAt.seconds 
            ? new Date(p.updatedAt.seconds * 1000).toISOString().split("T")[0]
            : null;
          return updatedDate === dateStr;
        }).length;
        
        engagementData.push({
          date: dateStr,
          activeUsers: enrollmentsOnDate,
          lessonsCompleted: lessonsCompletedOnDate,
        });
      }

      // Update analytics state
      setAnalytics({
        totalEnrollments,
        activeStudents,
        completionRate,
        revenueGenerated,
        lessonDropOffData,
        engagementGraphData: engagementData,
      });
    } catch (error) {
      console.error("Error loading analytics:", error);
      alert("Failed to load analytics. Please check console for details.");
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const loadQuizzesForLesson = async (lessonId: string) => {
    try {
      const q = query(
        collection(db, "quizzes"),
        where("lessonId", "==", lessonId)
      );
      
      const snapshot = await getDocs(q);
      const quizzesData: Quiz[] = [];
      snapshot.forEach((doc) => {
        quizzesData.push({ id: doc.id, ...doc.data() } as Quiz);
      });
      
      setQuizzes((prev) => ({
        ...prev,
        [lessonId]: quizzesData,
      }));
    } catch (error) {
      console.error(`Error loading quizzes for lesson ${lessonId}:`, error);
    }
  };

  const toggleLessonExpanded = (lessonId: string) => {
    setExpandedLessons((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(lessonId)) {
        newSet.delete(lessonId);
      } else {
        newSet.add(lessonId);
      }
      return newSet;
    });
  };

  const handleAddQuiz = (lessonId: string) => {
    setEditingQuiz(null);
    setQuizFormData({
      title: "",
      quizType: "mcq",
      totalMarks: 100,
      passingMarks: 50,
      timeLimitMinutes: undefined,
      attemptsAllowed: 1,
      shuffleQuestions: false,
      showResultImmediately: true,
      certificateEligible: false,
    });
    setShowQuizForm(lessonId);
    // Expand lesson if not already expanded
    if (!expandedLessons.has(lessonId)) {
      toggleLessonExpanded(lessonId);
    }
  };

  const handleEditQuiz = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    setQuizFormData({
      title: quiz.title,
      quizType: quiz.quizType,
      totalMarks: quiz.totalMarks,
      passingMarks: quiz.passingMarks,
      timeLimitMinutes: quiz.timeLimitMinutes,
      attemptsAllowed: quiz.attemptsAllowed,
      shuffleQuestions: quiz.shuffleQuestions || false,
      showResultImmediately: quiz.showResultImmediately !== false,
      certificateEligible: quiz.certificateEligible || false,
    });
    setShowQuizForm(quiz.lessonId);
    // Expand lesson if not already expanded
    if (!expandedLessons.has(quiz.lessonId)) {
      toggleLessonExpanded(quiz.lessonId);
    }
  };

  const handleSaveQuiz = async () => {
    if (!quizFormData.title?.trim()) {
      alert("Please enter a quiz title");
      return;
    }

    if (!showQuizForm) {
      alert("Lesson ID is missing");
      return;
    }

    if (!quizFormData.totalMarks || quizFormData.totalMarks <= 0) {
      alert("Please enter a valid total marks");
      return;
    }

    if (!quizFormData.passingMarks || quizFormData.passingMarks <= 0) {
      alert("Please enter a valid passing marks");
      return;
    }

    if (quizFormData.passingMarks > quizFormData.totalMarks) {
      alert("Passing marks cannot be greater than total marks");
      return;
    }

    try {
      const quizData: any = {
        lessonId: showQuizForm,
        title: quizFormData.title,
        quizType: quizFormData.quizType || "mcq",
        totalMarks: quizFormData.totalMarks,
        passingMarks: quizFormData.passingMarks,
        attemptsAllowed: quizFormData.attemptsAllowed || 1,
        shuffleQuestions: quizFormData.shuffleQuestions || false,
        showResultImmediately: quizFormData.showResultImmediately !== false,
        certificateEligible: quizFormData.certificateEligible || false,
        updatedAt: serverTimestamp(),
      };

      // Add optional fields only if they have values
      if (quizFormData.timeLimitMinutes !== undefined && quizFormData.timeLimitMinutes !== null && quizFormData.timeLimitMinutes > 0) {
        quizData.timeLimitMinutes = quizFormData.timeLimitMinutes;
      }

      if (editingQuiz?.id) {
        // Update existing quiz
        const quizRef = doc(db, "quizzes", editingQuiz.id);
        await updateDoc(quizRef, quizData);
        alert("Quiz updated successfully!");
      } else {
        // Create new quiz
        quizData.createdAt = serverTimestamp();
        await addDoc(collection(db, "quizzes"), quizData);
        alert("Quiz created successfully!");
      }

      setShowQuizForm(null);
      setEditingQuiz(null);
      if (showQuizForm) {
        loadQuizzesForLesson(showQuizForm);
      }
    } catch (error) {
      console.error("Error saving quiz:", error);
      alert("Failed to save quiz. Please check console for details.");
    }
  };

  const handleDeleteQuiz = async (quizId: string, lessonId: string) => {
    if (!confirm("Are you sure you want to delete this quiz?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "quizzes", quizId));
      alert("Quiz deleted successfully!");
      loadQuizzesForLesson(lessonId);
    } catch (error) {
      console.error("Error deleting quiz:", error);
      alert("Failed to delete quiz. Please check console for details.");
    }
  };

  const handleTagsChange = (value: string) => {
    setTagsInput(value);
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    setFormData((prev) => ({ ...prev, tags }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title?.trim()) {
      alert("Please enter a course title");
      return;
    }
    if (!formData.shortDescription?.trim()) {
      alert("Please enter a short description");
      return;
    }
    if (formData.shortDescription.length > 200) {
      alert("Short description must be 200 characters or less");
      return;
    }
    if (!formData.fullDescription?.trim()) {
      alert("Please enter a full description");
      return;
    }
    if (!formData.category) {
      alert("Please select a category");
      return;
    }
    if (!formData.instructors || formData.instructors.length === 0) {
      alert("Please select at least one instructor");
      return;
    }
    if (!formData.thumbnailImage) {
      alert("Please upload a thumbnail image");
      return;
    }
    if (!formData.price || formData.price <= 0) {
      alert("Please enter a valid price");
      return;
    }
    if (formData.accessType === "limited" && !formData.accessDurationDays) {
      alert("Please enter access duration in days for limited access");
      return;
    }

    try {
      setSaving(true);

      // Helper function to remove undefined values
      const removeUndefined = (obj: any): any => {
        const cleaned: any = {};
        for (const key in obj) {
          if (obj[key] !== undefined && key !== "id") {
            cleaned[key] = obj[key];
          }
        }
        return cleaned;
      };

      const courseData: any = {
        title: formData.title!,
        slug: formData.slug!,
        shortDescription: formData.shortDescription!,
        fullDescription: formData.fullDescription!,
        language: formData.language!,
        category: formData.category!,
        tags: formData.tags || [],
        level: formData.level!,
        courseType: "video_course",
        instructors: formData.instructors!,
        thumbnailImage: formData.thumbnailImage!,
        status: formData.status!,
        
        // Pricing
        price: formData.price!,
        currency: formData.currency || "INR",
        gstApplicable: formData.gstApplicable || false,
        accessType: formData.accessType!,
        installmentEnabled: formData.installmentEnabled || false,
        
        // Bundles
        allowBundle: formData.allowBundle || false,
        couponAllowed: formData.couponAllowed || false,
        
        // Enrollment & Access
        enrollmentType: formData.enrollmentType!,
        allowDownloads: formData.allowDownloads || false,
        screenRecordingBlocked: formData.screenRecordingBlocked || false,
        ipRestrictionEnabled: formData.ipRestrictionEnabled || false,
        
        // Certificate
        certificateEnabled: formData.certificateEnabled || false,
        
        // Reviews
        allowReviews: formData.allowReviews !== false,
        autoApproveReviews: formData.autoApproveReviews || false,
        averageRating: averageRating || 0,
        testimonials: formData.testimonials || [],
        
        updatedAt: serverTimestamp(),
      };

      // Add optional fields only if they have values
      if (formData.subCategory) courseData.subCategory = formData.subCategory;
      if (formData.promoVideoUrl) courseData.promoVideoUrl = formData.promoVideoUrl;
      if (formData.discountedPrice !== undefined && formData.discountedPrice !== null) {
        courseData.discountedPrice = formData.discountedPrice;
      }
      if (formData.discountStartDate) courseData.discountStartDate = formData.discountStartDate;
      if (formData.discountEndDate) courseData.discountEndDate = formData.discountEndDate;
      if (formData.accessDurationDays !== undefined && formData.accessDurationDays !== null) {
        courseData.accessDurationDays = formData.accessDurationDays;
      }
      if (formData.affiliateCommissionPercentage !== undefined && formData.affiliateCommissionPercentage !== null) {
        courseData.affiliateCommissionPercentage = formData.affiliateCommissionPercentage;
      }
      if (formData.bundleCourseIds && formData.bundleCourseIds.length > 0) {
        courseData.bundleCourseIds = formData.bundleCourseIds;
      }
      if (formData.bonusContentIds && formData.bonusContentIds.length > 0) {
        courseData.bonusContentIds = formData.bonusContentIds;
      }
      if (formData.maxCouponDiscountPercentage !== undefined && formData.maxCouponDiscountPercentage !== null) {
        courseData.maxCouponDiscountPercentage = formData.maxCouponDiscountPercentage;
      }
      if (formData.maxEnrollments !== undefined && formData.maxEnrollments !== null) {
        courseData.maxEnrollments = formData.maxEnrollments;
      }
      if (formData.deviceLimit !== undefined && formData.deviceLimit !== null) {
        courseData.deviceLimit = formData.deviceLimit;
      }
      if (formData.certificateTemplateId) courseData.certificateTemplateId = formData.certificateTemplateId;
      if (formData.certificateIssueRule) courseData.certificateIssueRule = formData.certificateIssueRule;
      if (formData.seoTitle) courseData.seoTitle = formData.seoTitle;
      if (formData.metaDescription) courseData.metaDescription = formData.metaDescription;
      if (formData.ogImage) courseData.ogImage = formData.ogImage;
      if (formData.landingPageHeadline) courseData.landingPageHeadline = formData.landingPageHeadline;
      if (formData.ctaText) courseData.ctaText = formData.ctaText;
      
      // Notifications & Automation
      courseData.notificationsEnabled = formData.notificationsEnabled !== false;
      courseData.notifyOnPurchase = formData.notifyOnPurchase !== false;
      courseData.notifyOnPurchaseEmail = formData.notifyOnPurchaseEmail !== false;
      courseData.notifyOnPurchaseWhatsApp = formData.notifyOnPurchaseWhatsApp || false;
      courseData.notifyOnLessonCompletion = formData.notifyOnLessonCompletion !== false;
      courseData.notifyOnCourseCompletion = formData.notifyOnCourseCompletion !== false;
      courseData.notifyOnCourseCompletionEmail = formData.notifyOnCourseCompletionEmail !== false;
      courseData.notifyOnInactivity = formData.notifyOnInactivity || false;
      if (formData.inactivityDays !== undefined && formData.inactivityDays !== null) {
        courseData.inactivityDays = formData.inactivityDays;
      }

      const cleanedCourseData = removeUndefined(courseData);
      const courseRef = doc(db, "courses", courseId);
      await updateDoc(courseRef, cleanedCourseData);

      alert("Course updated successfully!");
      setIsEditing(false);
      loadCourse(); // Reload to get updated data
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course. Please check console for details.");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "curriculum", label: "Curriculum" },
    { id: "pricing", label: "Pricing" },
    { id: "access", label: "Access Control" },
    { id: "bundles", label: "Bundles & Offers" },
    { id: "certificate", label: "Certificate" },
    { id: "reviews", label: "Reviews & Ratings" },
    { id: "seo", label: "SEO & Marketing" },
    { id: "notifications", label: "Notifications" },
    { id: "analytics", label: "Analytics" },
    { id: "progress", label: "Student Progress" },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">Loading course...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? "Edit Course" : "Course Details"}
            </h1>
            <p className="text-gray-600 mt-2">{formData.title}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/admin/courses")}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              ← Back to Courses
            </button>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Edit Course
              </button>
            )}
          </div>
        </div>

        {!isEditing ? (
          // View mode
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {formData.thumbnailImage && (
                  <div className="w-full h-64 rounded-lg overflow-hidden mb-4">
                    <S3Image
                      src={formData.thumbnailImage}
                      alt={formData.title || "Course thumbnail"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">{formData.title}</h2>
                <div className="space-y-2 text-sm">
                  <p><strong>Slug:</strong> {formData.slug}</p>
                  <p><strong>Status:</strong> <span className={`px-2 py-1 rounded ${
                    formData.status === "published" ? "bg-green-100 text-green-800" : 
                    formData.status === "draft" ? "bg-yellow-100 text-yellow-800" : 
                    "bg-gray-100 text-gray-800"
                  }`}>{formData.status}</span></p>
                  <p><strong>Level:</strong> {formData.level}</p>
                  <p><strong>Language:</strong> {formData.language}</p>
                  <p><strong>Price:</strong> ₹{formData.price}</p>
                  {formData.discountedPrice && (
                    <p><strong>Discounted Price:</strong> ₹{formData.discountedPrice}</p>
                  )}
                  <p><strong>Short Description:</strong> {formData.shortDescription}</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Full Description</h3>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: formData.fullDescription || "" }} />
            </div>
          </div>
        ) : (
          // Edit mode
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6 max-w-5xl">
              {activeTab === "basic" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Course Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        const slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                        setFormData((prev) => ({ ...prev, title: newTitle, slug }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter course title"
                    />
                    {formData.slug && (
                      <p className="text-xs text-gray-500 mt-1">Slug: {formData.slug}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Short Description * (Max 200 characters)
                    </label>
                    <textarea
                      required
                      value={formData.shortDescription}
                      onChange={(e) => setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))}
                      maxLength={200}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Brief description (max 200 characters)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.shortDescription?.length || 0}/200 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Description *
                    </label>
                    <textarea
                      required
                      value={formData.fullDescription}
                      onChange={(e) => setFormData((prev) => ({ ...prev, fullDescription: e.target.value }))}
                      rows={8}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Detailed course description"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Language *
                      </label>
                      <select
                        value={formData.language}
                        onChange={(e) => setFormData((prev) => ({ ...prev, language: e.target.value as CourseLanguage }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="english">English</option>
                        <option value="hindi">Hindi</option>
                        <option value="hinglish">Hinglish</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Level *
                      </label>
                      <select
                        value={formData.level}
                        onChange={(e) => setFormData((prev) => ({ ...prev, level: e.target.value as CourseLevel }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat.categoryId} value={cat.categoryId}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => handleTagsChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="e.g., web development, javascript, react"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instructors * (Select at least one)
                    </label>
                    <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2">
                      {instructors.map((instructor) => (
                        <label key={instructor.id} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="checkbox"
                            checked={formData.instructors?.includes(instructor.id) || false}
                            onChange={(e) => {
                              const currentInstructors = formData.instructors || [];
                              if (e.target.checked) {
                                setFormData((prev) => ({ ...prev, instructors: [...currentInstructors, instructor.id] }));
                              } else {
                                setFormData((prev) => ({ ...prev, instructors: currentInstructors.filter((id) => id !== instructor.id) }));
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm">{instructor.name} ({instructor.email})</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Thumbnail Image *
                    </label>
                    {formData.thumbnailImage && (
                      <div className="mb-2 w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                        <S3Image
                          src={formData.thumbnailImage}
                          alt="Thumbnail preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <FileUpload
                      folder="courses/thumbnails"
                      onUploadComplete={(url) => setFormData((prev) => ({ ...prev, thumbnailImage: url }))}
                      accept="image/*"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Promo Video URL (optional)
                    </label>
                    <input
                      type="url"
                      value={formData.promoVideoUrl || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, promoVideoUrl: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status *
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as CourseStatus }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === "curriculum" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Course Sections</h3>
                    <button
                      type="button"
                      onClick={handleAddSection}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Plus size={18} />
                      Add Section
                    </button>
                  </div>

                  {showSectionForm && (
                    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                      <h4 className="font-semibold mb-4">
                        {editingSection ? "Edit Section" : "Add New Section"}
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Section Title *
                          </label>
                          <input
                            type="text"
                            value={sectionFormData.title}
                            onChange={(e) => setSectionFormData((prev) => ({ ...prev, title: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="e.g., Introduction to Web Development"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description (optional)
                          </label>
                          <textarea
                            value={sectionFormData.description || ""}
                            onChange={(e) => setSectionFormData((prev) => ({ ...prev, description: e.target.value }))}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="Brief description of what this section covers"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Order Index
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={sectionFormData.orderIndex || 0}
                              onChange={(e) => setSectionFormData((prev) => ({ ...prev, orderIndex: parseInt(e.target.value) || 0 }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Unlock Rule *
                            </label>
                            <select
                              value={sectionFormData.unlockRule}
                              onChange={(e) => setSectionFormData((prev) => ({ ...prev, unlockRule: e.target.value as SectionUnlockRule }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                              <option value="free">Free</option>
                              <option value="paid">Paid</option>
                              <option value="drip">Drip (Time-based)</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={handleSaveSection}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            {editingSection ? "Update Section" : "Create Section"}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowSectionForm(false);
                              setEditingSection(null);
                            }}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {sections.length === 0 ? (
                      <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                        No sections yet. Click "Add Section" to create your first section.
                      </div>
                    ) : (
                      sections.map((section, index) => {
                        const sectionLessons = lessons[section.id || ""] || [];
                        const isExpanded = expandedSections.has(section.id || "");
                        const isShowingLessonForm = showLessonForm === section.id;
                        
                        return (
                          <div key={section.id} className="border border-gray-300 rounded-lg overflow-hidden">
                            <div className="p-4 hover:bg-gray-50">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3">
                                    <button
                                      type="button"
                                      onClick={() => toggleSectionExpanded(section.id!)}
                                      className="text-gray-400 hover:text-gray-600"
                                    >
                                      {isExpanded ? "▼" : "▶"}
                                    </button>
                                    <span className="text-sm font-medium text-gray-500">
                                      #{section.orderIndex + 1}
                                    </span>
                                    <h4 className="font-semibold text-lg">{section.title}</h4>
                                    <span className={`px-2 py-1 text-xs rounded ${
                                      section.unlockRule === "free" ? "bg-green-100 text-green-800" :
                                      section.unlockRule === "paid" ? "bg-blue-100 text-blue-800" :
                                      "bg-yellow-100 text-yellow-800"
                                    }`}>
                                      {section.unlockRule}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      ({sectionLessons.length} lesson{sectionLessons.length !== 1 ? "s" : ""})
                                    </span>
                                  </div>
                                  {section.description && (
                                    <p className="text-sm text-gray-600 mt-2 ml-8">{section.description}</p>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleAddLesson(section.id!)}
                                    className="flex items-center gap-1 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                                    title="Add lesson"
                                  >
                                    <Plus size={16} />
                                    Add Lesson
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleMoveSection(section.id!, "up")}
                                    disabled={index === 0}
                                    className="p-2 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Move up"
                                  >
                                    <ArrowUp size={18} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleMoveSection(section.id!, "down")}
                                    disabled={index === sections.length - 1}
                                    className="p-2 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Move down"
                                  >
                                    <ArrowDown size={18} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleEditSection(section)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                    title="Edit section"
                                  >
                                    <Edit2 size={18} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteSection(section.id!)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                                    title="Delete section"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Lessons List */}
                            {isExpanded && (
                              <div className="border-t border-gray-200 bg-gray-50">
                                {isShowingLessonForm && (
                                  <div className="p-4 border-b border-gray-300 bg-white">
                                    <h5 className="font-semibold mb-4">
                                      {editingLesson ? "Edit Lesson" : "Add New Lesson"}
                                    </h5>
                                    <div className="space-y-4">
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                          Lesson Title *
                                        </label>
                                        <input
                                          type="text"
                                          value={lessonFormData.title}
                                          onChange={(e) => setLessonFormData((prev) => ({ ...prev, title: e.target.value }))}
                                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                          placeholder="e.g., Introduction to React"
                                        />
                                      </div>

                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Lesson Type *
                                          </label>
                                          <select
                                            value={lessonFormData.lessonType}
                                            onChange={(e) => setLessonFormData((prev) => ({ ...prev, lessonType: e.target.value as LessonType }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                          >
                                            <option value="video">Video</option>
                                            <option value="pdf">PDF</option>
                                            <option value="quiz">Quiz</option>
                                          </select>
                                        </div>

                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Order Index
                                          </label>
                                          <input
                                            type="number"
                                            min="0"
                                            value={lessonFormData.orderIndex || 0}
                                            onChange={(e) => setLessonFormData((prev) => ({ ...prev, orderIndex: parseInt(e.target.value) || 0 }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                          />
                                        </div>
                                      </div>

                                      {lessonFormData.lessonType === "video" && (
                                        <>
                                          <div className="grid grid-cols-2 gap-4">
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Video Source *
                                              </label>
                                              <select
                                                value={lessonFormData.videoSource}
                                                onChange={(e) => setLessonFormData((prev) => ({ ...prev, videoSource: e.target.value as VideoSource }))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                              >
                                                <option value="s3">S3</option>
                                                <option value="vimeo">Vimeo</option>
                                                <option value="youtube_private">YouTube Private</option>
                                              </select>
                                            </div>

                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Video Duration
                                              </label>
                                              {(lessonFormData.videoDuration ?? 0) > 0 ? (
                                                <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                                                  <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-700">
                                                      {formatDuration(lessonFormData.videoDuration ?? 0)}
                                                    </span>
                                                    <span className="text-xs text-green-600 font-medium">
                                                      ✓ Auto-calculated
                                                    </span>
                                                  </div>
                                                  <input
                                                    type="hidden"
                                                    value={lessonFormData.videoDuration ?? 0}
                                                  />
                                                </div>
                                              ) : (
                                                <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-500">
                                                  Duration will be calculated automatically after video upload
                                                </div>
                                              )}
                                              {(lessonFormData.videoDuration ?? 0) > 0 && (
                                                <p className="text-xs text-gray-500 mt-1">
                                                  ({lessonFormData.videoDuration ?? 0} seconds) - Auto-calculated from uploaded video
                                                </p>
                                              )}
                                            </div>
                                          </div>

                                          <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                              Video Upload *
                                            </label>
                                            {lessonFormData.videoUrl && (
                                              <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                                                <div className="flex items-center gap-2 text-sm text-green-800">
                                                  <span className="text-green-600">✓</span>
                                                  <span>Video uploaded: {lessonFormData.videoUrl.split("/").pop()}</span>
                                                  {(lessonFormData.videoDuration ?? 0) > 0 && (
                                                    <span className="ml-2 text-xs">
                                                      (Duration: {formatDuration(lessonFormData.videoDuration ?? 0)})
                                                    </span>
                                                  )}
                                                </div>
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    setLessonFormData((prev) => ({ ...prev, videoUrl: "", videoDuration: 0 }));
                                                    setVideoFile(null);
                                                  }}
                                                  className="mt-2 text-xs text-red-600 hover:text-red-800"
                                                >
                                                  Remove video
                                                </button>
                                              </div>
                                            )}
                                            
                                            {!lessonFormData.videoUrl && (
                                              <>
                                                <label className="cursor-pointer">
                                                  <input
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={(e) => {
                                                      const file = e.target.files?.[0];
                                                      if (file) {
                                                        handleVideoUpload(file);
                                                      }
                                                    }}
                                                    disabled={videoUploading}
                                                    className="hidden"
                                                  />
                                                  <div className="px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition text-center bg-gray-50">
                                                    {videoUploading ? (
                                                      <div className="flex items-center justify-center gap-2">
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                                        <span className="text-sm text-gray-600">
                                                          Uploading video and calculating duration...
                                                        </span>
                                                      </div>
                                                    ) : (
                                                      <div>
                                                        <span className="text-sm text-gray-600">
                                                          Click to upload video or drag and drop
                                                        </span>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                          Supported: MP4, MOV, AVI, WebM (Duration will be auto-calculated)
                                                        </p>
                                                      </div>
                                                    )}
                                                  </div>
                                                </label>
                                              </>
                                            )}

                                            {/* Alternative: Manual URL entry (optional) */}
                                            <details className="mt-3">
                                              <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                                                Or enter video URL manually (for external videos)
                                              </summary>
                                              <input
                                                type="url"
                                                value={lessonFormData.videoUrl || ""}
                                                onChange={(e) => setLessonFormData((prev) => ({ ...prev, videoUrl: e.target.value }))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-2"
                                                placeholder="https://... (for YouTube, Vimeo, etc.)"
                                                disabled={videoUploading}
                                              />
                                            </details>
                                          </div>
                                        </>
                                      )}

                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                          Description (optional)
                                        </label>
                                        <textarea
                                          value={lessonFormData.description || ""}
                                          onChange={(e) => setLessonFormData((prev) => ({ ...prev, description: e.target.value }))}
                                          rows={3}
                                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                          placeholder="Lesson description"
                                        />
                                      </div>

                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Completion Rule *
                                          </label>
                                          <select
                                            value={lessonFormData.completionRule}
                                            onChange={(e) => setLessonFormData((prev) => ({ ...prev, completionRule: e.target.value as CompletionRule }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                          >
                                            <option value="watch_percentage">Watch Percentage</option>
                                            <option value="manual">Manual</option>
                                          </select>
                                        </div>

                                        {lessonFormData.completionRule === "watch_percentage" && (
                                          <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                              Watch Percentage Required (%)
                                            </label>
                                            <input
                                              type="number"
                                              min="0"
                                              max="100"
                                              value={lessonFormData.watchPercentageRequired || 100}
                                              onChange={(e) => setLessonFormData((prev) => ({ ...prev, watchPercentageRequired: parseInt(e.target.value) || 100 }))}
                                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            />
                                          </div>
                                        )}
                                      </div>

                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Notes PDF URL (optional)
                                          </label>
                                          <input
                                            type="url"
                                            value={lessonFormData.notesPdfUrl || ""}
                                            onChange={(e) => setLessonFormData((prev) => ({ ...prev, notesPdfUrl: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            placeholder="https://..."
                                          />
                                        </div>

                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Drip Delay Days (optional)
                                          </label>
                                          <input
                                            type="number"
                                            min="0"
                                            value={lessonFormData.dripDelayDays || ""}
                                            onChange={(e) => setLessonFormData((prev) => ({ ...prev, dripDelayDays: e.target.value ? parseInt(e.target.value) : undefined }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            placeholder="Days to wait before unlocking"
                                          />
                                        </div>
                                      </div>

                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                          Transcript Text (optional)
                                        </label>
                                        <textarea
                                          value={lessonFormData.transcriptText || ""}
                                          onChange={(e) => setLessonFormData((prev) => ({ ...prev, transcriptText: e.target.value }))}
                                          rows={4}
                                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                          placeholder="Video transcript text"
                                        />
                                      </div>

                                      <div className="flex items-center space-x-2">
                                        <input
                                          type="checkbox"
                                          checked={lessonFormData.isFreePreview || false}
                                          onChange={(e) => setLessonFormData((prev) => ({ ...prev, isFreePreview: e.target.checked }))}
                                          className="rounded"
                                        />
                                        <label className="text-sm font-medium text-gray-700">Free Preview (available without purchase)</label>
                                      </div>

                                      <div className="flex gap-3">
                                        <button
                                          type="button"
                                          onClick={handleSaveLesson}
                                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                          {editingLesson ? "Update Lesson" : "Create Lesson"}
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setShowLessonForm(null);
                                            setEditingLesson(null);
                                          }}
                                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                <div className="p-4 space-y-2">
                                  {sectionLessons.length === 0 ? (
                                    <div className="text-center py-4 text-gray-500 text-sm">
                                      No lessons yet. Click "Add Lesson" to create one.
                                    </div>
                                  ) : (
                                    sectionLessons.map((lesson, lessonIndex) => (
                                      <div
                                        key={lesson.id}
                                        className="bg-white border border-gray-300 rounded-lg p-3 hover:bg-gray-50"
                                      >
                                        <div className="flex items-start justify-between">
                                          <div className="flex-1">
                                            <div className="flex items-center gap-3">
                                              <span className="text-xs font-medium text-gray-500">
                                                #{lesson.orderIndex + 1}
                                              </span>
                                              <h5 className="font-medium">{lesson.title}</h5>
                                              <span className={`px-2 py-1 text-xs rounded ${
                                                lesson.lessonType === "video" ? "bg-blue-100 text-blue-800" :
                                                lesson.lessonType === "pdf" ? "bg-purple-100 text-purple-800" :
                                                "bg-orange-100 text-orange-800"
                                              }`}>
                                                {lesson.lessonType}
                                              </span>
                                              {lesson.isFreePreview && (
                                                <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                                                  Free Preview
                                                </span>
                                              )}
                                              {lesson.lessonType === "video" && lesson.videoDuration && (
                                                <span className="text-xs text-gray-500">
                                                  {formatDuration(lesson.videoDuration)}
                                                </span>
                                              )}
                                            </div>
                                            {lesson.description && (
                                              <p className="text-xs text-gray-600 mt-1 ml-8">{lesson.description}</p>
                                            )}
                                          </div>
                                          <div className="flex items-center gap-1">
                                            <button
                                              type="button"
                                              onClick={() => handleMoveLesson(lesson.id!, section.id!, "up")}
                                              disabled={lessonIndex === 0}
                                              className="p-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                              title="Move up"
                                            >
                                              <ArrowUp size={16} />
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => handleMoveLesson(lesson.id!, section.id!, "down")}
                                              disabled={lessonIndex === sectionLessons.length - 1}
                                              className="p-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                              title="Move down"
                                            >
                                              <ArrowDown size={16} />
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => handleEditLesson(lesson)}
                                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                              title="Edit lesson"
                                            >
                                              <Edit2 size={16} />
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => handleDeleteLesson(lesson.id!, section.id!)}
                                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                                              title="Delete lesson"
                                            >
                                              <Trash2 size={16} />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    ))
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {activeTab === "pricing" && (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-semibold mb-4">Base Pricing</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price *
                        </label>
                        <input
                          type="number"
                          required
                          min="0"
                          step="0.01"
                          value={formData.price || 0}
                          onChange={(e) => setFormData((prev) => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Currency *
                        </label>
                        <select
                          value={formData.currency || "INR"}
                          onChange={(e) => setFormData((prev) => ({ ...prev, currency: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="INR">INR (₹)</option>
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discounted Price (optional)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.discountedPrice || ""}
                        onChange={(e) => setFormData((prev) => ({ ...prev, discountedPrice: e.target.value ? parseFloat(e.target.value) : undefined }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="Enter discounted price"
                      />
                      {formData.discountedPrice && formData.price && (
                        <p className="text-xs text-green-600 mt-1">
                          Discount: {((1 - formData.discountedPrice / formData.price) * 100).toFixed(1)}% off
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Discount Start Date (optional)
                        </label>
                        <input
                          type="datetime-local"
                          value={formData.discountStartDate 
                            ? (formData.discountStartDate.seconds 
                                ? new Date(formData.discountStartDate.seconds * 1000).toISOString().slice(0, 16)
                                : formData.discountStartDate instanceof Date 
                                  ? formData.discountStartDate.toISOString().slice(0, 16)
                                  : "")
                            : ""}
                          onChange={(e) => {
                            const dateValue = e.target.value ? new Date(e.target.value) : undefined;
                            setFormData((prev) => ({ 
                              ...prev, 
                              discountStartDate: dateValue ? { seconds: Math.floor(dateValue.getTime() / 1000) } : undefined 
                            }));
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Discount End Date (optional)
                        </label>
                        <input
                          type="datetime-local"
                          value={formData.discountEndDate 
                            ? (formData.discountEndDate.seconds 
                                ? new Date(formData.discountEndDate.seconds * 1000).toISOString().slice(0, 16)
                                : formData.discountEndDate instanceof Date 
                                  ? formData.discountEndDate.toISOString().slice(0, 16)
                                  : "")
                            : ""}
                          onChange={(e) => {
                            const dateValue = e.target.value ? new Date(e.target.value) : undefined;
                            setFormData((prev) => ({ 
                              ...prev, 
                              discountEndDate: dateValue ? { seconds: Math.floor(dateValue.getTime() / 1000) } : undefined 
                            }));
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-semibold mb-4">Access Control</h3>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Access Type *
                      </label>
                      <select
                        value={formData.accessType || "lifetime"}
                        onChange={(e) => setFormData((prev) => ({ ...prev, accessType: e.target.value as CourseAccessType }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="lifetime">Lifetime Access</option>
                        <option value="limited">Limited Duration</option>
                        <option value="subscription">Subscription Based</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        {formData.accessType === "lifetime" && "Students get access forever"}
                        {formData.accessType === "limited" && "Access expires after specified duration"}
                        {formData.accessType === "subscription" && "Access requires active subscription"}
                      </p>
                    </div>

                    {formData.accessType === "limited" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Access Duration (Days) *
                        </label>
                        <input
                          type="number"
                          required
                          min="1"
                          value={formData.accessDurationDays || ""}
                          onChange={(e) => setFormData((prev) => ({ ...prev, accessDurationDays: e.target.value ? parseInt(e.target.value) : undefined }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="e.g., 365 for 1 year"
                        />
                      </div>
                    )}
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-semibold mb-4">Tax & Payment Options</h3>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <input
                        type="checkbox"
                        checked={formData.gstApplicable || false}
                        onChange={(e) => setFormData((prev) => ({ ...prev, gstApplicable: e.target.checked }))}
                        className="rounded"
                      />
                      <label className="text-sm font-medium text-gray-700">GST Applicable</label>
                      <span className="text-xs text-gray-500">(Goods and Services Tax will be added to the price)</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.installmentEnabled || false}
                        onChange={(e) => setFormData((prev) => ({ ...prev, installmentEnabled: e.target.checked }))}
                        className="rounded"
                      />
                      <label className="text-sm font-medium text-gray-700">Enable Installments</label>
                      <span className="text-xs text-gray-500">(Allow students to pay in multiple installments)</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Affiliate & Commission</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Affiliate Commission Percentage (optional)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={formData.affiliateCommissionPercentage || ""}
                        onChange={(e) => setFormData((prev) => ({ ...prev, affiliateCommissionPercentage: e.target.value ? parseFloat(e.target.value) : undefined }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="e.g., 15 for 15%"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Percentage of course price that will be paid to affiliates who refer students
                      </p>
                    </div>
                  </div>

                  {/* Pricing Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-3">Pricing Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Base Price:</span>
                        <span className="font-medium">
                          {formData.currency === "INR" ? "₹" : formData.currency === "USD" ? "$" : formData.currency === "EUR" ? "€" : "£"}
                          {formData.price?.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}
                        </span>
                      </div>
                      {formData.discountedPrice && formData.price && (
                        <>
                          <div className="flex justify-between text-red-600">
                            <span>Discount:</span>
                            <span>
                              -{formData.currency === "INR" ? "₹" : formData.currency === "USD" ? "$" : formData.currency === "EUR" ? "€" : "£"}
                              {(formData.price - formData.discountedPrice).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </div>
                          <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-300">
                            <span>Final Price:</span>
                            <span className="text-green-600">
                              {formData.currency === "INR" ? "₹" : formData.currency === "USD" ? "$" : formData.currency === "EUR" ? "€" : "£"}
                              {formData.discountedPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </div>
                        </>
                      )}
                      {formData.gstApplicable && (
                        <div className="flex justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                          <span>+ GST (18%):</span>
                          <span>
                            {formData.currency === "INR" ? "₹" : formData.currency === "USD" ? "$" : formData.currency === "EUR" ? "€" : "£"}
                            {((formData.discountedPrice || formData.price || 0) * 0.18).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "access" && (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-semibold mb-4">Enrollment Settings</h3>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Enrollment Type *
                      </label>
                      <select
                        value={formData.enrollmentType || "auto"}
                        onChange={(e) => setFormData((prev) => ({ ...prev, enrollmentType: e.target.value as CourseEnrollmentType }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="auto">Auto Enrollment</option>
                        <option value="manual">Manual Approval</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        {formData.enrollmentType === "auto" 
                          ? "Students are automatically enrolled after payment/registration"
                          : "Enrollment requires admin approval before access is granted"}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Maximum Enrollments (optional)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.maxEnrollments || ""}
                        onChange={(e) => setFormData((prev) => ({ ...prev, maxEnrollments: e.target.value ? parseInt(e.target.value) : undefined }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="e.g., 100 for maximum 100 students"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Maximum number of students that can enroll in this course. Leave empty for unlimited enrollments.
                      </p>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-semibold mb-4">Device & Access Limits</h3>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Device Limit
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.deviceLimit || ""}
                        onChange={(e) => setFormData((prev) => ({ ...prev, deviceLimit: e.target.value ? parseInt(e.target.value) : undefined }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="e.g., 3 for maximum 3 devices per student"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Maximum number of devices a student can use to access this course simultaneously. Leave empty for no limit.
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.allowDownloads || false}
                        onChange={(e) => setFormData((prev) => ({ ...prev, allowDownloads: e.target.checked }))}
                        className="rounded"
                      />
                      <div>
                        <label className="text-sm font-medium text-gray-700">Allow Downloads</label>
                        <p className="text-xs text-gray-500">Students can download course materials (videos, PDFs, etc.)</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-semibold mb-4">Security & Protection</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.screenRecordingBlocked || false}
                          onChange={(e) => setFormData((prev) => ({ ...prev, screenRecordingBlocked: e.target.checked }))}
                          className="rounded mt-1"
                        />
                        <div>
                          <label className="text-sm font-medium text-gray-700">Block Screen Recording</label>
                          <p className="text-xs text-gray-500">
                            Prevents students from recording course videos using screen capture tools
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.ipRestrictionEnabled || false}
                          onChange={(e) => setFormData((prev) => ({ ...prev, ipRestrictionEnabled: e.target.checked }))}
                          className="rounded mt-1"
                        />
                        <div>
                          <label className="text-sm font-medium text-gray-700">Enable IP Restriction</label>
                          <p className="text-xs text-gray-500">
                            Restrict access to specific IP addresses or IP ranges (requires additional IP whitelist configuration)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Access Control Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-3">Access Control Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Enrollment Type:</span>
                        <span className="font-medium capitalize">{formData.enrollmentType || "auto"}</span>
                      </div>
                      {formData.maxEnrollments && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Max Enrollments:</span>
                          <span className="font-medium">{formData.maxEnrollments.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Device Limit:</span>
                        <span className="font-medium">{formData.deviceLimit ? `${formData.deviceLimit} device${formData.deviceLimit !== 1 ? "s" : ""}` : "Unlimited"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Downloads:</span>
                        <span className={`font-medium ${formData.allowDownloads ? "text-green-600" : "text-red-600"}`}>
                          {formData.allowDownloads ? "Allowed" : "Blocked"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Screen Recording:</span>
                        <span className={`font-medium ${formData.screenRecordingBlocked ? "text-green-600" : "text-gray-400"}`}>
                          {formData.screenRecordingBlocked ? "Blocked" : "Allowed"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">IP Restriction:</span>
                        <span className={`font-medium ${formData.ipRestrictionEnabled ? "text-yellow-600" : "text-gray-400"}`}>
                          {formData.ipRestrictionEnabled ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "bundles" && (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-semibold mb-4">Bundle Settings</h3>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <input
                        type="checkbox"
                        checked={formData.allowBundle || false}
                        onChange={(e) => setFormData((prev) => ({ ...prev, allowBundle: e.target.checked }))}
                        className="rounded"
                      />
                      <label className="text-sm font-medium text-gray-700">Allow this course to be included in bundles</label>
                      <span className="text-xs text-gray-500">(This course can be packaged with other courses)</span>
                    </div>

                    {formData.allowBundle && (
                      <div className="ml-6 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bundle Courses (Select courses to bundle with this one)
                          </label>
                          <div className="border border-gray-300 rounded-lg p-3 max-h-60 overflow-y-auto bg-gray-50">
                            {allCourses.length === 0 ? (
                              <p className="text-sm text-gray-500">No other courses available for bundling</p>
                            ) : (
                              <div className="space-y-2">
                                {allCourses.map((course) => (
                                  <label key={course.id} className="flex items-center space-x-2 cursor-pointer hover:bg-white p-2 rounded">
                                    <input
                                      type="checkbox"
                                      checked={formData.bundleCourseIds?.includes(course.id) || false}
                                      onChange={(e) => {
                                        const currentIds = formData.bundleCourseIds || [];
                                        if (e.target.checked) {
                                          setFormData((prev) => ({ ...prev, bundleCourseIds: [...currentIds, course.id] }));
                                        } else {
                                          setFormData((prev) => ({ ...prev, bundleCourseIds: currentIds.filter((id) => id !== course.id) }));
                                        }
                                      }}
                                      className="rounded"
                                    />
                                    <span className="text-sm">{course.title}</span>
                                  </label>
                                ))}
                              </div>
                            )}
                          </div>
                          {formData.bundleCourseIds && formData.bundleCourseIds.length > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              {formData.bundleCourseIds.length} course{formData.bundleCourseIds.length !== 1 ? "s" : ""} selected
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bonus Content (Select lessons or courses as bonus content)
                          </label>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-medium text-gray-600 mb-2">Bonus Courses:</p>
                              <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto bg-gray-50">
                                {allCourses.length === 0 ? (
                                  <p className="text-sm text-gray-500">No courses available</p>
                                ) : (
                                  <div className="space-y-2">
                                    {allCourses.map((course) => (
                                      <label key={course.id} className="flex items-center space-x-2 cursor-pointer hover:bg-white p-2 rounded">
                                        <input
                                          type="checkbox"
                                          checked={formData.bonusContentIds?.includes(`course:${course.id}`) || false}
                                          onChange={(e) => {
                                            const currentIds = formData.bonusContentIds || [];
                                            const courseId = `course:${course.id}`;
                                            if (e.target.checked) {
                                              setFormData((prev) => ({ ...prev, bonusContentIds: [...currentIds, courseId] }));
                                            } else {
                                              setFormData((prev) => ({ ...prev, bonusContentIds: currentIds.filter((id) => id !== courseId) }));
                                            }
                                          }}
                                          className="rounded"
                                        />
                                        <span className="text-sm">{course.title}</span>
                                      </label>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-600 mb-2">Bonus Lessons:</p>
                              <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto bg-gray-50">
                                {allLessons.length === 0 ? (
                                  <p className="text-sm text-gray-500">
                                    {Object.keys(lessons).length === 0 
                                      ? "Load course sections first to select bonus lessons"
                                      : "No lessons available from other courses"}
                                  </p>
                                ) : (
                                  <div className="space-y-2">
                                    {allLessons
                                      .filter((lesson) => lesson.courseId !== courseId)
                                      .map((lesson) => (
                                        <label key={lesson.id} className="flex items-center space-x-2 cursor-pointer hover:bg-white p-2 rounded">
                                          <input
                                            type="checkbox"
                                            checked={formData.bonusContentIds?.includes(`lesson:${lesson.id}`) || false}
                                            onChange={(e) => {
                                              const currentIds = formData.bonusContentIds || [];
                                              const lessonId = `lesson:${lesson.id}`;
                                              if (e.target.checked) {
                                                setFormData((prev) => ({ ...prev, bonusContentIds: [...currentIds, lessonId] }));
                                              } else {
                                                setFormData((prev) => ({ ...prev, bonusContentIds: currentIds.filter((id) => id !== lessonId) }));
                                              }
                                            }}
                                            className="rounded"
                                          />
                                          <span className="text-sm">{lesson.title}</span>
                                          <span className="text-xs text-gray-500">(from another course)</span>
                                        </label>
                                      ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          {formData.bonusContentIds && formData.bonusContentIds.length > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              {formData.bonusContentIds.length} bonus item{formData.bonusContentIds.length !== 1 ? "s" : ""} selected
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-semibold mb-4">Coupon Settings</h3>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <input
                        type="checkbox"
                        checked={formData.couponAllowed || false}
                        onChange={(e) => setFormData((prev) => ({ ...prev, couponAllowed: e.target.checked }))}
                        className="rounded"
                      />
                      <label className="text-sm font-medium text-gray-700">Allow Coupons</label>
                      <span className="text-xs text-gray-500">(Students can apply coupon codes for discounts)</span>
                    </div>

                    {formData.couponAllowed && (
                      <div className="ml-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Maximum Coupon Discount Percentage
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            value={formData.maxCouponDiscountPercentage || ""}
                            onChange={(e) => setFormData((prev) => ({ ...prev, maxCouponDiscountPercentage: e.target.value ? parseFloat(e.target.value) : undefined }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="e.g., 30 for 30% maximum discount"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Maximum discount percentage that can be applied via coupons (0-100%)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bundle Summary */}
                  {formData.allowBundle && (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h3 className="text-lg font-semibold mb-3">Bundle Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Main Course:</span>
                          <span className="font-medium">{formData.title || "Untitled"}</span>
                        </div>
                        {formData.bundleCourseIds && formData.bundleCourseIds.length > 0 && (
                          <div>
                            <span className="text-gray-600">Bundled Courses:</span>
                            <ul className="list-disc list-inside ml-2 mt-1">
                              {formData.bundleCourseIds.map((courseId) => {
                                const course = allCourses.find((c) => c.id === courseId);
                                return (
                                  <li key={courseId} className="text-gray-700">
                                    {course?.title || `Course ID: ${courseId}`}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                        {formData.bonusContentIds && formData.bonusContentIds.length > 0 && (
                          <div>
                            <span className="text-gray-600">Bonus Content:</span>
                            <ul className="list-disc list-inside ml-2 mt-1">
                              {formData.bonusContentIds.map((contentId) => {
                                if (contentId.startsWith("course:")) {
                                  const courseId = contentId.replace("course:", "");
                                  const course = allCourses.find((c) => c.id === courseId);
                                  return (
                                    <li key={contentId} className="text-gray-700">
                                      📚 {course?.title || `Course ID: ${courseId}`}
                                    </li>
                                  );
                                } else if (contentId.startsWith("lesson:")) {
                                  const lessonId = contentId.replace("lesson:", "");
                                  const lesson = allLessons.find((l) => l.id === lessonId);
                                  return (
                                    <li key={contentId} className="text-gray-700">
                                      📹 {lesson?.title || `Lesson ID: ${lessonId}`}
                                    </li>
                                  );
                                }
                                return null;
                              })}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "certificate" && (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-semibold mb-4">Certificate Configuration</h3>
                    
                    <div className="flex items-start space-x-2 mb-6">
                      <input
                        type="checkbox"
                        checked={formData.certificateEnabled || false}
                        onChange={(e) => setFormData((prev) => ({ ...prev, certificateEnabled: e.target.checked }))}
                        className="rounded mt-1"
                      />
                      <div>
                        <label className="text-sm font-medium text-gray-700">Enable Certificate Generation</label>
                        <p className="text-xs text-gray-500 mt-1">
                          Students will receive a certificate upon meeting the completion criteria
                        </p>
                      </div>
                    </div>

                    {formData.certificateEnabled && (
                      <div className="ml-6 space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Certificate Template ID (optional)
                          </label>
                          <input
                            type="text"
                            value={formData.certificateTemplateId || ""}
                            onChange={(e) => setFormData((prev) => ({ ...prev, certificateTemplateId: e.target.value || undefined }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="e.g., template_001"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Reference ID for the certificate design template (if using custom templates)
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Certificate Issue Rule *
                          </label>
                          <select
                            value={formData.certificateIssueRule || "course_complete"}
                            onChange={(e) => setFormData((prev) => ({ ...prev, certificateIssueRule: e.target.value as any }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          >
                            <option value="course_complete">Course Complete</option>
                            <option value="quiz_pass">Quiz Pass</option>
                          </select>
                          <p className="text-xs text-gray-500 mt-1">
                            {formData.certificateIssueRule === "course_complete" 
                              ? "Certificate will be issued when student completes all lessons in the course"
                              : "Certificate will be issued when student passes the required quiz with passing marks"}
                          </p>
                        </div>

                        {formData.certificateIssueRule === "quiz_pass" && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-sm text-yellow-800">
                              <strong>Note:</strong> When using "Quiz Pass" rule, make sure you have quizzes configured in the curriculum with passing marks set. The certificate will be issued when a student passes the quiz(es) as defined in the lesson settings.
                            </p>
                          </div>
                        )}

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="text-sm font-semibold text-blue-900 mb-2">Auto-Generated Fields</h4>
                          <div className="space-y-2 text-sm text-blue-800">
                            <div>
                              <strong>Certificate Serial Number:</strong> Automatically generated when certificate is issued
                              <p className="text-xs text-blue-600 mt-1">
                                Format: CERT-{courseId?.substring(0, 6).toUpperCase()}-{`{TIMESTAMP}`}
                              </p>
                            </div>
                            <div className="mt-3">
                              <strong>Verification URL/QR Code:</strong> Automatically generated for each certificate
                              <p className="text-xs text-blue-600 mt-1">
                                Unique verification link will be created for certificate verification on your website
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Certificate Preview/Info */}
                        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                          <h4 className="text-sm font-semibold mb-3">Certificate Information</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Status:</p>
                              <p className="font-medium text-green-600">Enabled</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Issue Rule:</p>
                              <p className="font-medium capitalize">
                                {formData.certificateIssueRule === "course_complete" ? "Course Complete" : "Quiz Pass"}
                              </p>
                            </div>
                            {formData.certificateTemplateId && (
                              <div>
                                <p className="text-gray-600">Template ID:</p>
                                <p className="font-medium">{formData.certificateTemplateId}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {!formData.certificateEnabled && (
                      <div className="ml-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-600">
                          Enable certificate generation to allow students to receive certificates upon course completion or quiz pass.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Certificate Issuance Info */}
                  {formData.certificateEnabled && (
                    <div className="border-t border-gray-200 pt-4">
                      <h3 className="text-lg font-semibold mb-4">Certificate Issuance Details</h3>
                      
                      <div className="bg-white border border-gray-300 rounded-lg p-4">
                        <h4 className="font-medium mb-3">How Certificates Work:</h4>
                        <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                          <li>
                            <strong>Automatic Generation:</strong> Certificates are automatically generated when students meet the criteria (course completion or quiz pass)
                          </li>
                          <li>
                            <strong>Unique Serial Number:</strong> Each certificate gets a unique serial number for verification
                          </li>
                          <li>
                            <strong>Verification:</strong> Students receive a verification URL/QR code to verify their certificate authenticity
                          </li>
                          <li>
                            <strong>Digital Download:</strong> Students can download their certificate as a PDF from their course dashboard
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-semibold mb-4">Reviews & Ratings Settings</h3>
                    
                    <div className="flex items-start space-x-2 mb-4">
                      <input
                        type="checkbox"
                        checked={formData.allowReviews !== false}
                        onChange={(e) => setFormData((prev) => ({ ...prev, allowReviews: e.target.checked }))}
                        className="rounded mt-1"
                      />
                      <div>
                        <label className="text-sm font-medium text-gray-700">Allow Reviews</label>
                        <p className="text-xs text-gray-500 mt-1">
                          Enable students to leave reviews and ratings for this course
                        </p>
                      </div>
                    </div>

                    {formData.allowReviews !== false && (
                      <div className="ml-6 space-y-4">
                        <div className="flex items-start space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.autoApproveReviews || false}
                            onChange={(e) => setFormData((prev) => ({ ...prev, autoApproveReviews: e.target.checked }))}
                            className="rounded mt-1"
                          />
                          <div>
                            <label className="text-sm font-medium text-gray-700">Auto-Approve Reviews</label>
                            <p className="text-xs text-gray-500 mt-1">
                              Reviews will be automatically approved and visible to students without admin moderation
                            </p>
                          </div>
                        </div>

                        {/* Average Rating Display */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600">Average Rating</p>
                              <p className="text-3xl font-bold text-blue-600 mt-1">
                                {averageRating > 0 ? averageRating.toFixed(1) : "N/A"}
                              </p>
                              {averageRating > 0 && (
                                <div className="flex items-center mt-2">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                      key={star}
                                      className={`text-2xl ${
                                        star <= Math.round(averageRating)
                                          ? "text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    >
                                      ★
                                    </span>
                                  ))}
                                  <span className="ml-2 text-sm text-gray-600">
                                    ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-500">Auto-calculated</p>
                              <p className="text-xs text-gray-500 mt-1">from approved reviews</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Featured Testimonials (Select reviews to feature on course page)
                          </label>
                          <p className="text-xs text-gray-500 mb-2">
                            Select approved reviews to showcase as testimonials on the course landing page
                          </p>
                          {reviews.length === 0 ? (
                            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 text-center text-sm text-gray-500">
                              No reviews available yet. Reviews will appear here once students submit them.
                            </div>
                          ) : (
                            <div className="border border-gray-300 rounded-lg p-3 max-h-60 overflow-y-auto bg-gray-50">
                              {reviews
                                .filter((r) => r.approved)
                                .map((review) => {
                                  const isSelected = formData.testimonials?.includes(review.id || "") || false;
                                  return (
                                    <label
                                      key={review.id}
                                      className="flex items-start space-x-2 cursor-pointer hover:bg-white p-2 rounded mb-2"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={(e) => {
                                          const currentTestimonials = formData.testimonials || [];
                                          if (e.target.checked) {
                                            setFormData((prev) => ({
                                              ...prev,
                                              testimonials: [...currentTestimonials, review.id!],
                                            }));
                                          } else {
                                            setFormData((prev) => ({
                                              ...prev,
                                              testimonials: currentTestimonials.filter((id) => id !== review.id),
                                            }));
                                          }
                                        }}
                                        className="rounded mt-1"
                                      />
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                          <div className="flex">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                              <span
                                                key={star}
                                                className={`text-sm ${
                                                  star <= review.rating ? "text-yellow-400" : "text-gray-300"
                                                }`}
                                              >
                                                ★
                                              </span>
                                            ))}
                                          </div>
                                          {review.comment && (
                                            <span className="text-xs text-gray-500 truncate max-w-xs">
                                              {review.comment.substring(0, 50)}
                                              {review.comment.length > 50 ? "..." : ""}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </label>
                                  );
                                })}
                              {reviews.filter((r) => r.approved).length === 0 && (
                                <p className="text-sm text-gray-500 text-center py-2">
                                  No approved reviews available for testimonials
                                </p>
                              )}
                            </div>
                          )}
                          {formData.testimonials && formData.testimonials.length > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              {formData.testimonials.length} testimonial{formData.testimonials.length !== 1 ? "s" : ""} selected
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Reviews List */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Course Reviews</h3>
                      <button
                        type="button"
                        onClick={loadReviews}
                        disabled={reviewsLoading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
                      >
                        {reviewsLoading ? "Loading..." : "Refresh"}
                      </button>
                    </div>

                    {reviewsLoading ? (
                      <div className="text-center py-12">Loading reviews...</div>
                    ) : reviews.length === 0 ? (
                      <div className="text-center py-12 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                        No reviews yet. Reviews will appear here once students submit them.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {reviews.map((review) => {
                          // Get user details (we'd need to load this, but for now show ID)
                          return (
                            <div
                              key={review.id}
                              className={`border rounded-lg p-4 ${
                                review.approved
                                  ? "border-green-200 bg-green-50"
                                  : "border-yellow-200 bg-yellow-50"
                              }`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="flex">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                          key={star}
                                          className={`text-lg ${
                                            star <= review.rating ? "text-yellow-400" : "text-gray-300"
                                          }`}
                                        >
                                          ★
                                        </span>
                                      ))}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
                                      {review.rating} / 5
                                    </span>
                                    {review.approved ? (
                                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                        Approved
                                      </span>
                                    ) : (
                                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                                        Pending
                                      </span>
                                    )}
                                  </div>
                                  {review.comment && (
                                    <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                                  )}
                                  <p className="text-xs text-gray-500">
                                    User ID: {review.userId} | 
                                    {review.createdAt?.seconds
                                      ? new Date(review.createdAt.seconds * 1000).toLocaleDateString()
                                      : "Date unavailable"}
                                  </p>
                                </div>
                                <div className="flex gap-2 ml-4">
                                  {!review.approved && (
                                    <button
                                      type="button"
                                      onClick={() => handleApproveReview(review.id!)}
                                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                                    >
                                      Approve
                                    </button>
                                  )}
                                  {review.approved && (
                                    <button
                                      type="button"
                                      onClick={() => handleRejectReview(review.id!)}
                                      className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
                                    >
                                      Reject
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteReview(review.id!)}
                                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "seo" && (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-semibold mb-4">SEO (Search Engine Optimization)</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Optimize how your course appears in search engine results and social media shares
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          SEO Title
                        </label>
                        <input
                          type="text"
                          value={formData.seoTitle || ""}
                          onChange={(e) => setFormData((prev) => ({ ...prev, seoTitle: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="e.g., Complete Web Development Course - Learn HTML, CSS, JavaScript"
                          maxLength={60}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Recommended: 50-60 characters. Leave empty to use course title. {(formData.seoTitle || "").length} / 60 characters
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Meta Description
                        </label>
                        <textarea
                          value={formData.metaDescription || ""}
                          onChange={(e) => setFormData((prev) => ({ ...prev, metaDescription: e.target.value }))}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="A compelling description of your course that appears in search results..."
                          maxLength={160}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Recommended: 150-160 characters. Leave empty to use course short description. {(formData.metaDescription || "").length} / 160 characters
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Open Graph Image (OG Image)
                        </label>
                        <p className="text-xs text-gray-500 mb-2">
                          Image displayed when sharing this course on social media (Facebook, Twitter, LinkedIn, etc.)
                        </p>
                        {formData.ogImage && (
                          <div className="mb-3 w-full max-w-md rounded-lg overflow-hidden border border-gray-200">
                            <S3Image
                              src={formData.ogImage}
                              alt="OG Image preview"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        )}
                        <FileUpload
                          folder="courses/og-images"
                          onUploadComplete={(url) => setFormData((prev) => ({ ...prev, ogImage: url }))}
                          accept="image/*"
                        />
                        {formData.ogImage && (
                          <button
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, ogImage: undefined }))}
                            className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                          >
                            Remove Image
                          </button>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          Recommended size: 1200x630 pixels. Leave empty to use course thumbnail.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-semibold mb-4">Landing Page Marketing</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Customize the marketing copy that appears on the course landing page
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Landing Page Headline
                        </label>
                        <input
                          type="text"
                          value={formData.landingPageHeadline || ""}
                          onChange={(e) => setFormData((prev) => ({ ...prev, landingPageHeadline: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="e.g., Master Web Development in 30 Days"
                          maxLength={100}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Compelling headline displayed prominently on the course landing page. Leave empty to use course title. {(formData.landingPageHeadline || "").length} / 100 characters
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Call-to-Action (CTA) Text
                        </label>
                        <input
                          type="text"
                          value={formData.ctaText || ""}
                          onChange={(e) => setFormData((prev) => ({ ...prev, ctaText: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="e.g., Enroll Now - Start Learning Today!"
                          maxLength={50}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Text displayed on the primary action button (e.g., Enroll, Buy Now). Leave empty to use default. {(formData.ctaText || "").length} / 50 characters
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SEO Preview */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-3">Search Engine Preview</h3>
                    <p className="text-xs text-gray-500 mb-4">
                      This is how your course will appear in Google search results
                    </p>
                    <div className="bg-white border border-gray-300 rounded-lg p-4">
                      <div className="space-y-2">
                        <div className="text-blue-600 text-sm">
                          {formData.seoTitle || formData.title || "Course Title"}
                        </div>
                        <div className="text-green-700 text-xs">
                          https://yourdomain.com/courses/{formData.slug || "course-slug"}
                        </div>
                        <div className="text-gray-600 text-sm">
                          {formData.metaDescription || formData.shortDescription || "Course description will appear here..."}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Preview */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-3">Social Media Preview</h3>
                    <p className="text-xs text-gray-500 mb-4">
                      This is how your course will appear when shared on social media
                    </p>
                    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden max-w-md">
                      {(formData.ogImage || formData.thumbnailImage) && (
                        <div className="w-full h-48 bg-gray-200 overflow-hidden">
                          <S3Image
                            src={formData.ogImage || formData.thumbnailImage || ""}
                            alt="Social media preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="text-sm text-gray-500 mb-1">yourdomain.com</div>
                        <div className="font-semibold text-lg mb-1">
                          {formData.seoTitle || formData.title || "Course Title"}
                        </div>
                        <div className="text-sm text-gray-600">
                          {formData.metaDescription || formData.shortDescription || "Course description..."}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Landing Page Preview */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-3">Landing Page Preview</h3>
                    <div className="bg-white border border-gray-300 rounded-lg p-6">
                      <h1 className="text-3xl font-bold mb-4">
                        {formData.landingPageHeadline || formData.title || "Course Headline"}
                      </h1>
                      <p className="text-lg text-gray-700 mb-6">
                        {formData.shortDescription || "Course description will appear here..."}
                      </p>
                      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                        {formData.ctaText || "Enroll Now"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-semibold mb-4">Notifications & Automation Settings</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Configure automated notifications to keep students engaged and informed
                    </p>
                    
                    <div className="flex items-start space-x-2 mb-6">
                      <input
                        type="checkbox"
                        checked={formData.notificationsEnabled !== false}
                        onChange={(e) => setFormData((prev) => ({ ...prev, notificationsEnabled: e.target.checked }))}
                        className="rounded mt-1"
                      />
                      <div>
                        <label className="text-sm font-medium text-gray-700">Enable Notifications</label>
                        <p className="text-xs text-gray-500 mt-1">
                          Master switch to enable/disable all automated notifications for this course
                        </p>
                      </div>
                    </div>
                  </div>

                  {formData.notificationsEnabled !== false && (
                    <>
                      {/* Course Purchase Notifications */}
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-lg font-semibold mb-4">Course Purchase Notifications</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-start space-x-2">
                            <input
                              type="checkbox"
                              checked={formData.notifyOnPurchase !== false}
                              onChange={(e) => setFormData((prev) => ({ ...prev, notifyOnPurchase: e.target.checked }))}
                              className="rounded mt-1"
                            />
                            <div className="flex-1">
                              <label className="text-sm font-medium text-gray-700">Send Welcome Notification</label>
                              <p className="text-xs text-gray-500 mt-1">
                                Automatically send a welcome message when a student purchases/enrolls in this course
                              </p>
                            </div>
                          </div>

                          {formData.notifyOnPurchase !== false && (
                            <div className="ml-6 space-y-3 bg-gray-50 rounded-lg p-4">
                              <div className="flex items-start space-x-2">
                                <input
                                  type="checkbox"
                                  checked={formData.notifyOnPurchaseEmail !== false}
                                  onChange={(e) => setFormData((prev) => ({ ...prev, notifyOnPurchaseEmail: e.target.checked }))}
                                  className="rounded mt-1"
                                />
                                <div>
                                  <label className="text-sm font-medium text-gray-700">📧 Email Notification</label>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Send welcome email with course access details and getting started guide
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-2">
                                <input
                                  type="checkbox"
                                  checked={formData.notifyOnPurchaseWhatsApp || false}
                                  onChange={(e) => setFormData((prev) => ({ ...prev, notifyOnPurchaseWhatsApp: e.target.checked }))}
                                  className="rounded mt-1"
                                />
                                <div>
                                  <label className="text-sm font-medium text-gray-700">💬 WhatsApp Notification</label>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Send welcome message via WhatsApp (requires student's WhatsApp number)
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Lesson Completion Notifications */}
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-lg font-semibold mb-4">Lesson Completion Notifications</h3>
                        
                        <div className="flex items-start space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.notifyOnLessonCompletion !== false}
                            onChange={(e) => setFormData((prev) => ({ ...prev, notifyOnLessonCompletion: e.target.checked }))}
                            className="rounded mt-1"
                          />
                          <div>
                            <label className="text-sm font-medium text-gray-700">Send Progress Update</label>
                            <p className="text-xs text-gray-500 mt-1">
                              Automatically send progress updates when students complete lessons. Includes course completion percentage and next lesson information.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Course Completion Notifications */}
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-lg font-semibold mb-4">Course Completion Notifications</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-start space-x-2">
                            <input
                              type="checkbox"
                              checked={formData.notifyOnCourseCompletion !== false}
                              onChange={(e) => setFormData((prev) => ({ ...prev, notifyOnCourseCompletion: e.target.checked }))}
                              className="rounded mt-1"
                            />
                            <div className="flex-1">
                              <label className="text-sm font-medium text-gray-700">Send Completion Notification</label>
                              <p className="text-xs text-gray-500 mt-1">
                                Automatically send a congratulatory message when students complete the entire course
                              </p>
                            </div>
                          </div>

                          {formData.notifyOnCourseCompletion !== false && (
                            <div className="ml-6 space-y-3 bg-gray-50 rounded-lg p-4">
                              <div className="flex items-start space-x-2">
                                <input
                                  type="checkbox"
                                  checked={formData.notifyOnCourseCompletionEmail !== false}
                                  onChange={(e) => setFormData((prev) => ({ ...prev, notifyOnCourseCompletionEmail: e.target.checked }))}
                                  className="rounded mt-1"
                                />
                                <div>
                                  <label className="text-sm font-medium text-gray-700">📧 Certificate Email</label>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Send certificate via email when course is completed (requires certificate to be enabled)
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Inactivity Reminders */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Inactivity Reminders</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-start space-x-2">
                            <input
                              type="checkbox"
                              checked={formData.notifyOnInactivity || false}
                              onChange={(e) => setFormData((prev) => ({ ...prev, notifyOnInactivity: e.target.checked }))}
                              className="rounded mt-1"
                            />
                            <div className="flex-1">
                              <label className="text-sm font-medium text-gray-700">Send Reminder Notifications</label>
                              <p className="text-xs text-gray-500 mt-1">
                                Remind students to continue their learning if they haven't accessed the course for a specified number of days
                              </p>
                            </div>
                          </div>

                          {formData.notifyOnInactivity && (
                            <div className="ml-6 bg-gray-50 rounded-lg p-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Inactivity Period (Days)
                                </label>
                                <input
                                  type="number"
                                  min="1"
                                  max="90"
                                  value={formData.inactivityDays || 7}
                                  onChange={(e) => setFormData((prev) => ({ ...prev, inactivityDays: parseInt(e.target.value) || 7 }))}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                  Send reminder notification if student hasn't accessed the course for this many days
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Notification Summary */}
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h3 className="text-lg font-semibold mb-3">Notification Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Course Purchase:</span>
                            <span className={`font-medium ${formData.notifyOnPurchase !== false ? "text-green-600" : "text-gray-400"}`}>
                              {formData.notifyOnPurchase !== false ? "Enabled" : "Disabled"}
                              {formData.notifyOnPurchase !== false && (
                                <span className="ml-2 text-xs">
                                  ({formData.notifyOnPurchaseEmail !== false ? "Email" : ""}
                                  {(formData.notifyOnPurchaseEmail !== false && formData.notifyOnPurchaseWhatsApp) ? " + " : ""}
                                  {formData.notifyOnPurchaseWhatsApp ? "WhatsApp" : ""})
                                </span>
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Lesson Completion:</span>
                            <span className={`font-medium ${formData.notifyOnLessonCompletion !== false ? "text-green-600" : "text-gray-400"}`}>
                              {formData.notifyOnLessonCompletion !== false ? "Enabled" : "Disabled"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Course Completion:</span>
                            <span className={`font-medium ${formData.notifyOnCourseCompletion !== false ? "text-green-600" : "text-gray-400"}`}>
                              {formData.notifyOnCourseCompletion !== false ? "Enabled" : "Disabled"}
                              {formData.notifyOnCourseCompletion !== false && formData.notifyOnCourseCompletionEmail !== false && (
                                <span className="ml-2 text-xs">(with Certificate)</span>
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Inactivity Reminders:</span>
                            <span className={`font-medium ${formData.notifyOnInactivity ? "text-green-600" : "text-gray-400"}`}>
                              {formData.notifyOnInactivity ? `Enabled (${formData.inactivityDays || 7} days)` : "Disabled"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Notification Information */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-blue-900 mb-2">ℹ️ How Notifications Work:</h4>
                        <ul className="space-y-1 text-xs text-blue-800 list-disc list-inside">
                          <li>Notifications are sent automatically based on student actions and course progress</li>
                          <li>Email notifications require a valid student email address</li>
                          <li>WhatsApp notifications require the student's WhatsApp number to be on file</li>
                          <li>Inactivity reminders are sent based on last access date, not just enrollment date</li>
                          <li>Certificate emails are only sent if certificates are enabled and course completion criteria are met</li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === "analytics" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Course Analytics Dashboard</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Comprehensive analytics and insights for this course
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={loadAnalytics}
                      disabled={analyticsLoading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      {analyticsLoading ? "Loading..." : "Refresh Analytics"}
                    </button>
                  </div>

                  {analyticsLoading ? (
                    <div className="text-center py-12">Loading analytics data...</div>
                  ) : (
                    <>
                      {/* Key Metrics Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white border border-gray-300 rounded-lg p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Total Enrollments</p>
                              <p className="text-3xl font-bold text-gray-900">
                                {analytics.totalEnrollments.toLocaleString()}
                              </p>
                            </div>
                            <div className="text-4xl text-blue-500">👥</div>
                          </div>
                        </div>

                        <div className="bg-white border border-gray-300 rounded-lg p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Active Students</p>
                              <p className="text-3xl font-bold text-green-600">
                                {analytics.activeStudents.toLocaleString()}
                              </p>
                            </div>
                            <div className="text-4xl text-green-500">✓</div>
                          </div>
                        </div>

                        <div className="bg-white border border-gray-300 rounded-lg p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Completion Rate</p>
                              <p className="text-3xl font-bold text-blue-600">
                                {analytics.completionRate}%
                              </p>
                            </div>
                            <div className="text-4xl text-blue-500">📊</div>
                          </div>
                        </div>

                        <div className="bg-white border border-gray-300 rounded-lg p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Revenue Generated</p>
                              <p className="text-2xl font-bold text-green-600">
                                {formData.currency === "INR" ? "₹" : formData.currency === "USD" ? "$" : formData.currency === "EUR" ? "€" : "£"}
                                {analytics.revenueGenerated.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </p>
                            </div>
                            <div className="text-4xl text-green-500">💰</div>
                          </div>
                        </div>
                      </div>

                      {/* Lesson Drop-off Analysis */}
                      <div className="bg-white border border-gray-300 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-4">Lesson Drop-off Analysis</h4>
                        {analytics.lessonDropOffData.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            No lesson data available. Lessons will appear here once curriculum is set up.
                          </div>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lesson</th>
                                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Started</th>
                                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Completed</th>
                                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Drop-off Rate</th>
                                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Progress</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {analytics.lessonDropOffData.map((lesson, index) => {
                                  const completionPercentage = lesson.enrollments > 0
                                    ? Math.round((lesson.completions / lesson.enrollments) * 100)
                                    : 0;
                                  return (
                                    <tr key={lesson.lessonId} className="hover:bg-gray-50">
                                      <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                          {index + 1}. {lesson.lessonTitle}
                                        </div>
                                      </td>
                                      <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-600">
                                        {lesson.enrollments}
                                      </td>
                                      <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-600">
                                        {lesson.completions}
                                      </td>
                                      <td className="px-4 py-3 whitespace-nowrap text-center">
                                        <span className={`text-sm font-medium ${
                                          lesson.dropOffRate > 50 ? "text-red-600" :
                                          lesson.dropOffRate > 25 ? "text-yellow-600" :
                                          "text-green-600"
                                        }`}>
                                          {lesson.dropOffRate}%
                                        </span>
                                      </td>
                                      <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="flex items-center">
                                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                            <div
                                              className={`h-2 rounded-full ${
                                                completionPercentage >= 80 ? "bg-green-500" :
                                                completionPercentage >= 50 ? "bg-yellow-500" :
                                                "bg-red-500"
                                              }`}
                                              style={{ width: `${completionPercentage}%` }}
                                            ></div>
                                          </div>
                                          <span className="text-xs text-gray-600 w-10">
                                            {completionPercentage}%
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>

                      {/* Engagement Graph Data */}
                      <div className="bg-white border border-gray-300 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-4">Engagement Trends (Last 30 Days)</h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-2">
                            Engagement data structure (ready for chart integration):
                          </p>
                          <div className="text-xs text-gray-500 bg-white rounded p-3 font-mono overflow-x-auto">
                            {JSON.stringify(analytics.engagementGraphData.slice(0, 5), null, 2)}
                            {analytics.engagementGraphData.length > 5 && (
                              <span className="text-gray-400"> ... ({analytics.engagementGraphData.length - 5} more days)</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            This data can be used with charting libraries (Chart.js, Recharts, etc.) to visualize engagement trends.
                          </p>
                        </div>
                      </div>

                      {/* Analytics Summary */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-blue-900 mb-2">📈 Analytics Summary</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                          <div>
                            <strong>Enrollment Status:</strong> {analytics.totalEnrollments} total, {analytics.activeStudents} active
                          </div>
                          <div>
                            <strong>Completion:</strong> {analytics.completionRate}% of enrolled students completed the course
                          </div>
                          <div>
                            <strong>Revenue:</strong> Estimated based on enrollments and course price
                          </div>
                          <div>
                            <strong>Lessons:</strong> {analytics.lessonDropOffData.length} lessons tracked
                          </div>
                        </div>
                      </div>

                      {/* Relationships Summary */}
                      <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-4">📊 Course Relationships Summary</h4>
                        <p className="text-sm text-gray-600 mb-6">
                          Overview of how this course connects to all related entities in the system
                        </p>

                        <div className="space-y-6">
                          {/* Course Structure */}
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <h5 className="font-semibold text-gray-800 mb-3">Course Structure</h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-blue-600">Course:</span>
                                <span className="text-gray-700">{formData.title || "Untitled"}</span>
                                <span className="text-xs text-gray-500">(1)</span>
                              </div>
                              <div className="ml-4 flex items-center gap-2">
                                <span className="text-gray-400">└─→</span>
                                <span className="font-medium text-green-600">Sections:</span>
                                <span className="text-gray-700">{sections.length}</span>
                              </div>
                              {sections.length > 0 && (
                                <>
                                  {sections.map((section, idx) => {
                                    const sectionLessons = lessons[section.id || ""] || [];
                                    const totalQuizzes = sectionLessons.reduce((sum, lesson) => {
                                      const lessonQuizzes = quizzes[lesson.id || ""] || [];
                                      return sum + lessonQuizzes.length;
                                    }, 0);
                                    
                                    return (
                                      <div key={section.id} className="ml-8 space-y-1">
                                        <div className="flex items-center gap-2">
                                          <span className="text-gray-400">└─→</span>
                                          <span className="font-medium text-purple-600">Section {idx + 1}:</span>
                                          <span className="text-gray-700">{section.title}</span>
                                        </div>
                                        <div className="ml-4 flex items-center gap-2">
                                          <span className="text-gray-400">└─→</span>
                                          <span className="font-medium text-orange-600">Lessons:</span>
                                          <span className="text-gray-700">{sectionLessons.length}</span>
                                        </div>
                                        {totalQuizzes > 0 && (
                                          <div className="ml-8 flex items-center gap-2">
                                            <span className="text-gray-400">└─→</span>
                                            <span className="font-medium text-red-600">Quizzes:</span>
                                            <span className="text-gray-700">{totalQuizzes}</span>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                  <div className="ml-4 flex items-center gap-2">
                                    <span className="text-gray-400">└─→</span>
                                    <span className="font-medium text-orange-600">Total Lessons:</span>
                                    <span className="text-gray-700 font-semibold">
                                      {Object.values(lessons).flat().length}
                                    </span>
                                  </div>
                                  <div className="ml-8 flex items-center gap-2">
                                    <span className="text-gray-400">└─→</span>
                                    <span className="font-medium text-red-600">Total Quizzes:</span>
                                    <span className="text-gray-700 font-semibold">
                                      {Object.values(quizzes).flat().length}
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Direct Course Relationships */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <h5 className="font-semibold text-gray-800 mb-3">Course → Instructors</h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-blue-600">Instructors:</span>
                                  <span className="text-gray-700">
                                    {formData.instructors?.length || 0}
                                  </span>
                                </div>
                                {formData.instructors && formData.instructors.length > 0 && (
                                  <ul className="ml-4 space-y-1 text-xs text-gray-600">
                                    {formData.instructors.slice(0, 3).map((instructorId) => {
                                      const instructor = instructors.find((i) => i.id === instructorId);
                                      return (
                                        <li key={instructorId} className="flex items-center gap-1">
                                          <span className="text-gray-400">•</span>
                                          {instructor?.name || `User ID: ${instructorId.substring(0, 8)}...`}
                                        </li>
                                      );
                                    })}
                                    {formData.instructors.length > 3 && (
                                      <li className="text-gray-500">
                                        + {formData.instructors.length - 3} more
                                      </li>
                                    )}
                                  </ul>
                                )}
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <h5 className="font-semibold text-gray-800 mb-3">Course → Enrollments</h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-blue-600">Total Enrollments:</span>
                                  <span className="text-gray-700 font-semibold">
                                    {analytics.totalEnrollments}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-green-600">Active:</span>
                                  <span className="text-gray-700">{analytics.activeStudents}</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <h5 className="font-semibold text-gray-800 mb-3">Course → Reviews</h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-blue-600">Total Reviews:</span>
                                  <span className="text-gray-700 font-semibold">{reviews.length}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-green-600">Approved:</span>
                                  <span className="text-gray-700">
                                    {reviews.filter((r) => r.approved).length}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-yellow-600">Average Rating:</span>
                                  <span className="text-gray-700">
                                    {averageRating > 0 ? averageRating.toFixed(1) : "N/A"} / 5
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <h5 className="font-semibold text-gray-800 mb-3">Course → Payments</h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-blue-600">Revenue:</span>
                                  <span className="text-gray-700 font-semibold">
                                    {formData.currency === "INR" ? "₹" : formData.currency === "USD" ? "$" : formData.currency === "EUR" ? "€" : "£"}
                                    {analytics.revenueGenerated.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-600">Price per Enrollment:</span>
                                  <span className="text-gray-700">
                                    {formData.currency === "INR" ? "₹" : formData.currency === "USD" ? "$" : formData.currency === "EUR" ? "€" : "£"}
                                    {(formData.price || 0).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Enrollment Relationships */}
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <h5 className="font-semibold text-gray-800 mb-3">Enrollment Relationships</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-medium text-blue-600">Enrollment → Progress</span>
                                </div>
                                <div className="ml-4 space-y-1 text-xs text-gray-600">
                                  <div>Total Progress Records: {progressRecords.length}</div>
                                  <div>Users with Progress: {new Set(progressRecords.map((p) => p.userId)).size}</div>
                                  <div>Completed Lessons: {progressRecords.filter((p) => p.completed).length}</div>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-medium text-blue-600">Enrollment → Certificate</span>
                                </div>
                                <div className="ml-4 space-y-1 text-xs text-gray-600">
                                  <div>
                                    Certificates Enabled: {formData.certificateEnabled ? "Yes" : "No"}
                                  </div>
                                  {formData.certificateEnabled && (
                                    <>
                                      <div>
                                        Issue Rule: {formData.certificateIssueRule === "course_complete" ? "Course Complete" : "Quiz Pass"}
                                      </div>
                                      {/* Note: Actual certificate count would need to query certificates collection */}
                                      <div className="text-gray-500">Certificate count: Query certificates collection</div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Relationship Diagram */}
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <h5 className="font-semibold text-gray-800 mb-3">Relationship Diagram</h5>
                            <div className="text-xs font-mono text-gray-700 space-y-1 bg-gray-50 rounded p-4">
                              <div>Course ({formData.title || "Course"})</div>
                              <div className="ml-2">├─ Sections ({sections.length})</div>
                              <div className="ml-4">│  └─ Lessons ({Object.values(lessons).flat().length})</div>
                              <div className="ml-6">│     └─ Quizzes ({Object.values(quizzes).flat().length})</div>
                              <div className="ml-2">├─ Instructors ({formData.instructors?.length || 0})</div>
                              <div className="ml-2">├─ Enrollments ({analytics.totalEnrollments})</div>
                              <div className="ml-4">│  ├─ Progress ({progressRecords.length} records)</div>
                              <div className="ml-4">│  └─ Certificates (if enabled)</div>
                              <div className="ml-2">├─ Reviews ({reviews.length})</div>
                              <div className="ml-2">└─ Payments (Revenue: {formData.currency === "INR" ? "₹" : "$"}{analytics.revenueGenerated.toLocaleString()})</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === "progress" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Student Progress Tracking</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        View and track how students are progressing through this course
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={loadStudentProgress}
                      disabled={progressLoading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      {progressLoading ? "Loading..." : "Refresh"}
                    </button>
                  </div>

                  {progressLoading ? (
                    <div className="text-center py-12">Loading progress data...</div>
                  ) : studentProgress.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                      No student progress data found. Progress will appear here as students watch lessons.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {studentProgress.map((student) => (
                        <div
                          key={student.userId}
                          className="border border-gray-300 rounded-lg p-4 bg-white"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-semibold text-lg">{student.userName}</h4>
                              <p className="text-sm text-gray-500">{student.userEmail}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-blue-600">
                                {student.overallProgress}%
                              </div>
                              <p className="text-xs text-gray-500">
                                {student.lessonsCompleted} / {student.totalLessons} lessons
                              </p>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                style={{ width: `${student.overallProgress}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Lesson Progress Details */}
                          <div className="mt-4">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Lesson Progress:</h5>
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                              {student.progressData.map((progress) => {
                                const lesson = Object.values(lessons)
                                  .flat()
                                  .find((l) => l.id === progress.lessonId);
                                
                                return (
                                  <div
                                    key={progress.id}
                                    className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
                                  >
                                    <div className="flex-1">
                                      <div className="font-medium">
                                        {lesson?.title || `Lesson ID: ${progress.lessonId}`}
                                      </div>
                                      <div className="text-xs text-gray-500 mt-1">
                                        Watch Time: {formatDuration(progress.watchTime)} | 
                                        Position: {formatDuration(progress.lastWatchedPosition)}
                                        {progress.completed && (
                                          <span className="ml-2 text-green-600 font-semibold">✓ Completed</span>
                                        )}
                                      </div>
                                    </div>
                                    <div className="ml-4">
                                      <div className={`w-16 h-2 rounded-full ${
                                        progress.completed ? "bg-green-500" : "bg-gray-300"
                                      }`}>
                                        {!progress.completed && (
                                          <div
                                            className="bg-blue-500 h-2 rounded-full"
                                            style={{ width: `${progress.progressPercentage}%` }}
                                          ></div>
                                        )}
                                      </div>
                                      <p className="text-xs text-gray-500 text-center mt-1">
                                        {progress.progressPercentage}%
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Progress Statistics */}
                  {studentProgress.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h4 className="text-lg font-semibold mb-3">Course Statistics</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Total Students</p>
                          <p className="text-2xl font-bold">{studentProgress.length}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Average Progress</p>
                          <p className="text-2xl font-bold">
                            {Math.round(
                              studentProgress.reduce((sum, s) => sum + s.overallProgress, 0) /
                                studentProgress.length
                            )}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Completed Course</p>
                          <p className="text-2xl font-bold">
                            {studentProgress.filter((s) => s.overallProgress === 100).length}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8 flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    loadCourse(); // Reload original data
                  }}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
