"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import type { Course } from "@/types/course";

// Unsplash thumbnail images for courses
const COURSE_THUMBNAILS = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop", // Programming/Code
  "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop", // Design/UI
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop", // Technology/Business
];

const COURSE_DATA: Partial<Course>[] = [
  {
    title: "Complete Web Development Bootcamp",
    slug: "complete-web-development-bootcamp",
    shortDescription: "Master HTML, CSS, JavaScript, React, Node.js and become a Full Stack Developer",
    fullDescription: `This comprehensive web development bootcamp will take you from beginner to advanced level. 
    
You'll learn:
- HTML5 and CSS3 fundamentals
- JavaScript (ES6+)
- React.js for building modern UIs
- Node.js and Express for backend development
- MongoDB for database management
- RESTful APIs
- Deployment and DevOps basics

By the end of this course, you'll be able to build full-stack web applications from scratch and deploy them to production.`,
    language: "english",
    category: "",
    tags: ["web development", "javascript", "react", "nodejs", "full stack"],
    level: "beginner",
    courseType: "video_course",
    instructors: [],
    thumbnailImage: COURSE_THUMBNAILS[0],
    promoVideoUrl: "https://www.youtube.com/watch?v=example1",
    status: "published",
    
    // Pricing
    price: 4999,
    discountedPrice: 2999,
    currency: "INR",
    gstApplicable: true,
    accessType: "lifetime",
    installmentEnabled: true,
    affiliateCommissionPercentage: 15,
    
    // Bundles
    allowBundle: true,
    couponAllowed: true,
    maxCouponDiscountPercentage: 20,
    
    // Enrollment & Access
    enrollmentType: "auto",
    deviceLimit: 3,
    allowDownloads: true,
    screenRecordingBlocked: true,
    ipRestrictionEnabled: false,
    
    // Certificate
    certificateEnabled: true,
    certificateIssueRule: "course_complete",
    
    // Reviews
    allowReviews: true,
    autoApproveReviews: false,
    
    // SEO
    seoTitle: "Complete Web Development Bootcamp - Learn Full Stack Development",
    metaDescription: "Master web development from scratch. Learn HTML, CSS, JavaScript, React, Node.js and build real-world projects. Get certified and start your career as a Full Stack Developer.",
    landingPageHeadline: "Become a Full Stack Developer in 12 Weeks",
    ctaText: "Enroll Now - Limited Time Offer",
  },
  {
    title: "UI/UX Design Masterclass",
    slug: "ui-ux-design-masterclass",
    shortDescription: "Learn professional UI/UX design principles, tools, and workflows used by top designers",
    fullDescription: `Transform your design skills with this comprehensive UI/UX design masterclass.
    
Course Content:
- Design Thinking and User Research
- Wireframing and Prototyping
- Visual Design Principles
- Color Theory and Typography
- Figma, Adobe XD, and Sketch
- User Testing and Iteration
- Design Systems and Components
- Portfolio Development

Perfect for beginners and intermediate designers looking to advance their career.`,
    language: "english",
    category: "",
    tags: ["ui design", "ux design", "figma", "design thinking", "prototyping"],
    level: "intermediate",
    courseType: "video_course",
    instructors: [],
    thumbnailImage: COURSE_THUMBNAILS[1],
    promoVideoUrl: "https://www.youtube.com/watch?v=example2",
    status: "published",
    
    // Pricing
    price: 3999,
    discountedPrice: 2499,
    currency: "INR",
    gstApplicable: true,
    accessType: "lifetime",
    installmentEnabled: false,
    affiliateCommissionPercentage: 12,
    
    // Bundles
    allowBundle: true,
    couponAllowed: true,
    maxCouponDiscountPercentage: 25,
    
    // Enrollment & Access
    enrollmentType: "auto",
    deviceLimit: 2,
    allowDownloads: false,
    screenRecordingBlocked: false,
    ipRestrictionEnabled: false,
    
    // Certificate
    certificateEnabled: true,
    certificateIssueRule: "course_complete",
    
    // Reviews
    allowReviews: true,
    autoApproveReviews: true,
    
    // SEO
    seoTitle: "UI/UX Design Masterclass - Professional Design Course",
    metaDescription: "Learn UI/UX design from industry experts. Master Figma, design thinking, and create stunning user interfaces. Build a portfolio that gets you hired.",
    landingPageHeadline: "Design Beautiful User Experiences",
    ctaText: "Start Learning Design Today",
  },
  {
    title: "Digital Marketing & Analytics Course",
    slug: "digital-marketing-analytics-course",
    shortDescription: "Master SEO, Social Media Marketing, Google Ads, and Analytics to grow any business online",
    fullDescription: `Comprehensive digital marketing course covering all essential strategies and tools.

What You'll Learn:
- Search Engine Optimization (SEO)
- Google Ads and PPC Campaigns
- Social Media Marketing (Facebook, Instagram, LinkedIn)
- Email Marketing and Automation
- Google Analytics and Data Analysis
- Content Marketing Strategy
- Conversion Rate Optimization
- Marketing Automation Tools

This course includes real-world case studies and hands-on projects.`,
    language: "hinglish",
    category: "",
    tags: ["digital marketing", "seo", "social media", "google ads", "analytics"],
    level: "beginner",
    courseType: "video_course",
    instructors: [],
    thumbnailImage: COURSE_THUMBNAILS[2],
    promoVideoUrl: "https://www.youtube.com/watch?v=example3",
    status: "published",
    
    // Pricing
    price: 3499,
    discountedPrice: 1999,
    currency: "INR",
    gstApplicable: true,
    accessType: "limited",
    accessDurationDays: 365,
    installmentEnabled: true,
    affiliateCommissionPercentage: 18,
    
    // Bundles
    allowBundle: true,
    couponAllowed: true,
    maxCouponDiscountPercentage: 30,
    
    // Enrollment & Access
    enrollmentType: "auto",
    maxEnrollments: 500,
    deviceLimit: 2,
    allowDownloads: false,
    screenRecordingBlocked: false,
    ipRestrictionEnabled: false,
    
    // Certificate
    certificateEnabled: true,
    certificateIssueRule: "course_complete",
    
    // Reviews
    allowReviews: true,
    autoApproveReviews: false,
    
    // SEO
    seoTitle: "Digital Marketing & Analytics Course - Grow Your Business Online",
    metaDescription: "Learn digital marketing strategies, SEO, social media, Google Ads, and analytics. Get certified and help businesses grow their online presence.",
    landingPageHeadline: "Master Digital Marketing in 2024",
    ctaText: "Enroll Now - Start Today",
  },
];

export default function PopulateDummyCoursesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("");

  const createDummyCourses = async () => {
    try {
      setLoading(true);
      setStatus("Loading categories and users...");

      // Get categories
      setStatus("Loading categories...");
      const categoriesSnapshot = await getDocs(collection(db, "categories"));
      const categories: Array<{ id: string; name: string }> = [];
      categoriesSnapshot.forEach((doc) => {
        const data = doc.data();
        categories.push({ id: doc.id, name: data.name || "Unnamed Category" });
      });

      if (categories.length === 0) {
        const errorMsg = "No categories found. Please create categories first.";
        setStatus(`❌ ${errorMsg}`);
        alert(errorMsg);
        setLoading(false);
        return;
      }

      // Get users for instructors
      setStatus("Loading users for instructors...");
      const usersSnapshot = await getDocs(collection(db, "users"));
      const users: Array<{ id: string; name: string }> = [];
      usersSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.name || data.email) {
          users.push({ id: doc.id, name: data.name || data.email || "Unknown" });
        }
      });

      if (users.length === 0) {
        const errorMsg = "No users found. Please create users first.";
        setStatus(`❌ ${errorMsg}`);
        alert(errorMsg);
        setLoading(false);
        return;
      }

      setStatus("Creating dummy courses...");

      const createdCourses: string[] = [];

      for (let i = 0; i < COURSE_DATA.length; i++) {
        const courseTemplate = COURSE_DATA[i];
        
        // Assign category (cycle through available categories)
        const category = categories[i % categories.length];
        
        // Assign instructors (use first 1-2 users)
        const instructorIds = users.slice(0, Math.min(2, users.length)).map(u => u.id);

        if (!instructorIds || instructorIds.length === 0) {
          throw new Error("No instructors available. At least one instructor is required.");
        }

        setStatus(`Creating course ${i + 1}/${COURSE_DATA.length}: ${courseTemplate.title}...`);

        // Validate required fields
        if (!courseTemplate.title || !courseTemplate.shortDescription || !courseTemplate.fullDescription) {
          throw new Error(`Course ${i + 1} is missing required fields: title, shortDescription, or fullDescription`);
        }

        // Helper function to remove undefined values
        const removeUndefined = (obj: any): any => {
          const cleaned: any = {};
          for (const key in obj) {
            if (obj[key] !== undefined) {
              cleaned[key] = obj[key];
            }
          }
          return cleaned;
        };

        const courseData: any = {
          title: courseTemplate.title,
          slug: courseTemplate.slug || courseTemplate.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
          shortDescription: courseTemplate.shortDescription,
          fullDescription: courseTemplate.fullDescription,
          language: courseTemplate.language || "english",
          category: category.id,
          tags: courseTemplate.tags || [],
          level: courseTemplate.level || "beginner",
          courseType: "video_course",
          instructors: instructorIds,
          thumbnailImage: courseTemplate.thumbnailImage || "",
          status: courseTemplate.status || "draft",
          
          // Pricing
          price: courseTemplate.price!,
          currency: courseTemplate.currency || "INR",
          gstApplicable: courseTemplate.gstApplicable || false,
          accessType: courseTemplate.accessType!,
          installmentEnabled: courseTemplate.installmentEnabled || false,
          
          // Bundles
          allowBundle: courseTemplate.allowBundle || false,
          couponAllowed: courseTemplate.couponAllowed || false,
          
          // Enrollment & Access
          enrollmentType: courseTemplate.enrollmentType!,
          allowDownloads: courseTemplate.allowDownloads || false,
          screenRecordingBlocked: courseTemplate.screenRecordingBlocked || false,
          ipRestrictionEnabled: courseTemplate.ipRestrictionEnabled || false,
          
          // Certificate
          certificateEnabled: courseTemplate.certificateEnabled || false,
          
          // Reviews
          allowReviews: courseTemplate.allowReviews !== false,
          autoApproveReviews: courseTemplate.autoApproveReviews || false,
        };

        // Add optional fields only if they have values
        if (courseTemplate.subCategory) {
          courseData.subCategory = courseTemplate.subCategory;
        }
        if (courseTemplate.promoVideoUrl) {
          courseData.promoVideoUrl = courseTemplate.promoVideoUrl;
        }
        if (courseTemplate.discountedPrice !== undefined && courseTemplate.discountedPrice !== null) {
          courseData.discountedPrice = courseTemplate.discountedPrice;
        }
        if (courseTemplate.discountStartDate) {
          courseData.discountStartDate = courseTemplate.discountStartDate;
        }
        if (courseTemplate.discountEndDate) {
          courseData.discountEndDate = courseTemplate.discountEndDate;
        }
        if (courseTemplate.accessDurationDays !== undefined && courseTemplate.accessDurationDays !== null) {
          courseData.accessDurationDays = courseTemplate.accessDurationDays;
        }
        if (courseTemplate.affiliateCommissionPercentage !== undefined && courseTemplate.affiliateCommissionPercentage !== null) {
          courseData.affiliateCommissionPercentage = courseTemplate.affiliateCommissionPercentage;
        }
        if (courseTemplate.bundleCourseIds && courseTemplate.bundleCourseIds.length > 0) {
          courseData.bundleCourseIds = courseTemplate.bundleCourseIds;
        }
        if (courseTemplate.bonusContentIds && courseTemplate.bonusContentIds.length > 0) {
          courseData.bonusContentIds = courseTemplate.bonusContentIds;
        }
        if (courseTemplate.maxCouponDiscountPercentage !== undefined && courseTemplate.maxCouponDiscountPercentage !== null) {
          courseData.maxCouponDiscountPercentage = courseTemplate.maxCouponDiscountPercentage;
        }
        if (courseTemplate.maxEnrollments !== undefined && courseTemplate.maxEnrollments !== null) {
          courseData.maxEnrollments = courseTemplate.maxEnrollments;
        }
        if (courseTemplate.deviceLimit !== undefined && courseTemplate.deviceLimit !== null) {
          courseData.deviceLimit = courseTemplate.deviceLimit;
        }
        if (courseTemplate.certificateTemplateId) {
          courseData.certificateTemplateId = courseTemplate.certificateTemplateId;
        }
        if (courseTemplate.certificateIssueRule) {
          courseData.certificateIssueRule = courseTemplate.certificateIssueRule;
        }
        if (courseTemplate.seoTitle) {
          courseData.seoTitle = courseTemplate.seoTitle;
        }
        if (courseTemplate.metaDescription) {
          courseData.metaDescription = courseTemplate.metaDescription;
        }
        if (courseTemplate.ogImage) {
          courseData.ogImage = courseTemplate.ogImage;
        }
        if (courseTemplate.landingPageHeadline) {
          courseData.landingPageHeadline = courseTemplate.landingPageHeadline;
        }
        if (courseTemplate.ctaText) {
          courseData.ctaText = courseTemplate.ctaText;
        }

        try {
          // Remove any remaining undefined values and add timestamps
          const cleanedCourseData = removeUndefined({
            ...courseData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });

          const docRef = await addDoc(collection(db, "courses"), cleanedCourseData);

          createdCourses.push(courseData.title);
          setStatus(`✅ Created (${i + 1}/${COURSE_DATA.length}): ${courseData.title}`);
        } catch (courseError) {
          console.error(`Error creating course "${courseData.title}":`, courseError);
          throw new Error(`Failed to create course "${courseData.title}": ${courseError instanceof Error ? courseError.message : String(courseError)}`);
        }
      }

      const successMsg = `Successfully created ${createdCourses.length} courses!`;
      setStatus(`✅ ${successMsg}`);
      alert(`${successMsg}\n\nCourses created:\n${createdCourses.join("\n")}`);
      setTimeout(() => {
        router.push("/admin/courses");
      }, 2000);
    } catch (error) {
      console.error("Error creating dummy courses:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : "";
      console.error("Full error details:", {
        message: errorMessage,
        stack: errorStack,
        error: error
      });
      
      const detailedError = `Error: ${errorMessage}\n\nTroubleshooting:\n1. Check browser console for full error details\n2. Ensure categories exist in Firestore\n3. Ensure users exist in Firestore\n4. Check Firestore security rules allow writes to 'courses' collection\n5. Verify all required fields are present`;
      
      setStatus(`❌ ${errorMessage}\n\nCheck browser console (F12) for more details.`);
      alert(`${detailedError}\n\nError: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin/courses")}
            className="text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Courses
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Populate Dummy Courses</h1>
          <p className="text-gray-600 mt-2">Create 3 sample courses with realistic data</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Courses to be created:</h2>
            <div className="space-y-4">
              {COURSE_DATA.map((course, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex gap-4">
                    <img
                      src={course.thumbnailImage}
                      alt={course.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{course.shortDescription}</p>
                      <div className="flex gap-4 mt-2 text-xs text-gray-500">
                        <span>Level: {course.level}</span>
                        <span>Language: {course.language}</span>
                        <span>Price: ₹{course.discountedPrice || course.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> This will create 3 courses with dummy data. Make sure you have:
            </p>
            <ul className="list-disc list-inside text-sm text-yellow-700 mt-2 space-y-1">
              <li>At least one category created</li>
              <li>At least one user in the system (will be used as instructor)</li>
            </ul>
          </div>

          {status && (
            <div className={`mb-6 p-4 rounded-lg ${
              status.includes("✅") 
                ? "bg-green-50 border border-green-200 text-green-800" 
                : status.includes("❌")
                ? "bg-red-50 border border-red-200 text-red-800"
                : "bg-blue-50 border border-blue-200 text-blue-800"
            }`}>
              <p className="text-sm">{status}</p>
            </div>
          )}

          <button
            onClick={createDummyCourses}
            disabled={loading}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? "Creating Courses..." : "📚 Create 3 Dummy Courses"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
