"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { FileUpload } from "@/components/admin/FileUpload";
import { S3Image } from "@/components/common/S3Image";
import type {
  CourseLanguage,
  CourseLevel,
  CourseStatus,
  CourseAccessType,
  CourseEnrollmentType,
  Course,
} from "@/types/course";
import type { Category } from "@/types/store";

export default function NewCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [instructors, setInstructors] = useState<Array<{ id: string; name: string; email: string }>>([]);
  const [courses, setCourses] = useState<Array<{ id: string; title: string }>>([]);
  const [tagsInput, setTagsInput] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("basic");

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
  });

  useEffect(() => {
    loadCategories();
    loadInstructors();
    loadCourses();
  }, []);

  useEffect(() => {
    // Auto-generate slug from title
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title]);

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

  const loadCourses = async () => {
    try {
      const snapshot = await getDocs(collection(db, "courses"));
      const coursesData: Array<{ id: string; title: string }> = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        coursesData.push({
          id: doc.id,
          title: data.title || "Untitled Course",
        });
      });
      setCourses(coursesData);
    } catch (error) {
      console.error("Error loading courses:", error);
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
      setLoading(true);

      const courseData: Course = {
        title: formData.title!,
        slug: formData.slug!,
        shortDescription: formData.shortDescription!,
        fullDescription: formData.fullDescription!,
        language: formData.language!,
        category: formData.category!,
        subCategory: formData.subCategory,
        tags: formData.tags || [],
        level: formData.level!,
        courseType: "video_course",
        instructors: formData.instructors!,
        thumbnailImage: formData.thumbnailImage!,
        promoVideoUrl: formData.promoVideoUrl,
        status: formData.status!,
        
        // Pricing
        price: formData.price!,
        discountedPrice: formData.discountedPrice,
        discountStartDate: formData.discountStartDate,
        discountEndDate: formData.discountEndDate,
        currency: formData.currency || "INR",
        gstApplicable: formData.gstApplicable || false,
        accessType: formData.accessType!,
        accessDurationDays: formData.accessDurationDays,
        installmentEnabled: formData.installmentEnabled || false,
        affiliateCommissionPercentage: formData.affiliateCommissionPercentage,
        
        // Bundles
        allowBundle: formData.allowBundle || false,
        bundleCourseIds: formData.bundleCourseIds,
        bonusContentIds: formData.bonusContentIds,
        couponAllowed: formData.couponAllowed || false,
        maxCouponDiscountPercentage: formData.maxCouponDiscountPercentage,
        
        // Enrollment & Access
        enrollmentType: formData.enrollmentType!,
        maxEnrollments: formData.maxEnrollments,
        deviceLimit: formData.deviceLimit,
        allowDownloads: formData.allowDownloads || false,
        screenRecordingBlocked: formData.screenRecordingBlocked || false,
        ipRestrictionEnabled: formData.ipRestrictionEnabled || false,
        
        // Certificate
        certificateEnabled: formData.certificateEnabled || false,
        certificateTemplateId: formData.certificateTemplateId,
        certificateIssueRule: formData.certificateIssueRule,
        
        // Reviews
        allowReviews: formData.allowReviews !== false,
        autoApproveReviews: formData.autoApproveReviews || false,
        
        // SEO
        seoTitle: formData.seoTitle,
        metaDescription: formData.metaDescription,
        ogImage: formData.ogImage,
        landingPageHeadline: formData.landingPageHeadline,
        ctaText: formData.ctaText,
      };

      const docRef = await addDoc(collection(db, "courses"), {
        ...courseData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      alert("Course created successfully!");
      router.push(`/admin/courses/${docRef.id}`);
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "pricing", label: "Pricing" },
    { id: "access", label: "Access Control" },
    { id: "bundles", label: "Bundles & Offers" },
    { id: "certificate", label: "Certificate" },
    { id: "seo", label: "SEO & Marketing" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin/courses")}
            className="text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Courses
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
          <p className="text-gray-600 mt-2">Create a comprehensive video-based online course</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6 max-w-5xl">
            {/* Basic Information Tab */}
            {activeTab === "basic" && (
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Course Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title || ""}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                        maxLength={200}
                        rows={3}
                        value={formData.shortDescription || ""}
                        onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="Brief description of the course"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {(formData.shortDescription || "").length}/200 characters
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Description *
                      </label>
                      <textarea
                        required
                        rows={8}
                        value={formData.fullDescription || ""}
                        onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
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
                          required
                          value={formData.language || "english"}
                          onChange={(e) => setFormData({ ...formData, language: e.target.value as CourseLanguage })}
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
                          required
                          value={formData.level || "beginner"}
                          onChange={(e) => setFormData({ ...formData, level: e.target.value as CourseLevel })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category *
                        </label>
                        <select
                          required
                          value={formData.category || ""}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value, subCategory: "" })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
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
                          Sub Category (Optional)
                        </label>
                        <input
                          type="text"
                          value={formData.subCategory || ""}
                          onChange={(e) => setFormData({ ...formData, subCategory: e.target.value || undefined })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Sub category name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tags (Comma-separated)
                      </label>
                      <input
                        type="text"
                        value={tagsInput}
                        onChange={(e) => handleTagsChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="e.g., javascript, react, web development"
                      />
                      {formData.tags && formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Instructors * (At least one required)
                      </label>
                      <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-4">
                        {instructors.length === 0 ? (
                          <p className="text-sm text-gray-500">No instructors found</p>
                        ) : (
                          instructors.map((instructor) => (
                            <label key={instructor.id} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.instructors?.includes(instructor.id) || false}
                                onChange={(e) => {
                                  const currentInstructors = formData.instructors || [];
                                  if (e.target.checked) {
                                    setFormData({
                                      ...formData,
                                      instructors: [...currentInstructors, instructor.id],
                                    });
                                  } else {
                                    setFormData({
                                      ...formData,
                                      instructors: currentInstructors.filter((id) => id !== instructor.id),
                                    });
                                  }
                                }}
                                className="rounded border-gray-300"
                              />
                              <span className="text-sm text-gray-700">
                                {instructor.name} {instructor.email && `(${instructor.email})`}
                              </span>
                            </label>
                          ))
                        )}
                      </div>
                      {formData.instructors && formData.instructors.length > 0 && (
                        <p className="text-xs text-gray-500 mt-2">
                          {formData.instructors.length} instructor(s) selected
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thumbnail Image * (Required)
                      </label>
                      {formData.thumbnailImage ? (
                        <div className="relative inline-block">
                          <S3Image
                            src={formData.thumbnailImage}
                            alt="Course thumbnail"
                            className="w-48 h-32 object-cover rounded-lg border border-gray-300"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, thumbnailImage: "" })}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <FileUpload
                          accept="image/*"
                          folder="courses/thumbnails"
                          multiple={false}
                          onUploadComplete={(url) => {
                            setFormData({ ...formData, thumbnailImage: url });
                          }}
                          onUploadError={(error) => {
                            alert(`Upload failed: ${error}`);
                          }}
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Promo Video URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={formData.promoVideoUrl || ""}
                        onChange={(e) => setFormData({ ...formData, promoVideoUrl: e.target.value || undefined })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="https://youtube.com/watch?v=... or video URL"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Course Status *
                      </label>
                      <select
                        required
                        value={formData.status || "draft"}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as CourseStatus })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Pricing Tab */}
            {activeTab === "pricing" && (
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-4">Pricing & Monetization</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price (INR) *
                        </label>
                        <input
                          type="number"
                          required
                          min="0"
                          step="0.01"
                          value={formData.price || 0}
                          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Discounted Price (Optional)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.discountedPrice || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              discountedPrice: e.target.value ? parseFloat(e.target.value) : undefined,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Discount Start Date
                        </label>
                        <input
                          type="date"
                          value={formData.discountStartDate || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              discountStartDate: e.target.value || undefined,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Discount End Date
                        </label>
                        <input
                          type="date"
                          value={formData.discountEndDate || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              discountEndDate: e.target.value || undefined,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Currency
                        </label>
                        <select
                          value={formData.currency || "INR"}
                          onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="INR">INR (₹)</option>
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Access Type *
                        </label>
                        <select
                          required
                          value={formData.accessType || "lifetime"}
                          onChange={(e) =>
                            setFormData({ ...formData, accessType: e.target.value as CourseAccessType })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="lifetime">Lifetime</option>
                          <option value="limited">Limited Duration</option>
                          <option value="subscription">Subscription</option>
                        </select>
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
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                accessDurationDays: e.target.value ? parseInt(e.target.value) : undefined,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Affiliate Commission (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          value={formData.affiliateCommissionPercentage || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              affiliateCommissionPercentage: e.target.value ? parseFloat(e.target.value) : undefined,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.gstApplicable || false}
                          onChange={(e) => setFormData({ ...formData, gstApplicable: e.target.checked })}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">GST Applicable</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.installmentEnabled || false}
                          onChange={(e) => setFormData({ ...formData, installmentEnabled: e.target.checked })}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">Enable Installments</span>
                      </label>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Access Control Tab */}
            {activeTab === "access" && (
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-4">Enrollment & Access Control</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Enrollment Type *
                        </label>
                        <select
                          required
                          value={formData.enrollmentType || "auto"}
                          onChange={(e) =>
                            setFormData({ ...formData, enrollmentType: e.target.value as CourseEnrollmentType })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="auto">Auto</option>
                          <option value="manual">Manual</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Max Enrollments
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={formData.maxEnrollments || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              maxEnrollments: e.target.value ? parseInt(e.target.value) : undefined,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Leave empty for unlimited"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Device Limit
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={formData.deviceLimit || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              deviceLimit: e.target.value ? parseInt(e.target.value) : undefined,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Max devices per user"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.allowDownloads || false}
                          onChange={(e) => setFormData({ ...formData, allowDownloads: e.target.checked })}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">Allow Downloads</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.screenRecordingBlocked || false}
                          onChange={(e) =>
                            setFormData({ ...formData, screenRecordingBlocked: e.target.checked })
                          }
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">Block Screen Recording</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.ipRestrictionEnabled || false}
                          onChange={(e) =>
                            setFormData({ ...formData, ipRestrictionEnabled: e.target.checked })
                          }
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">Enable IP Restriction</span>
                      </label>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Bundles & Offers Tab */}
            {activeTab === "bundles" && (
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-4">Bundles & Offers</h2>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.allowBundle || false}
                        onChange={(e) => setFormData({ ...formData, allowBundle: e.target.checked })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Allow this course in bundles</span>
                    </label>

                    {formData.allowBundle && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bundle with Courses
                        </label>
                        <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-4">
                          {courses.length === 0 ? (
                            <p className="text-sm text-gray-500">No other courses available</p>
                          ) : (
                            courses.map((course) => (
                              <label key={course.id} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={formData.bundleCourseIds?.includes(course.id) || false}
                                  onChange={(e) => {
                                    const currentBundleIds = formData.bundleCourseIds || [];
                                    if (e.target.checked) {
                                      setFormData({
                                        ...formData,
                                        bundleCourseIds: [...currentBundleIds, course.id],
                                      });
                                    } else {
                                      setFormData({
                                        ...formData,
                                        bundleCourseIds: currentBundleIds.filter((id) => id !== course.id),
                                      });
                                    }
                                  }}
                                  className="rounded border-gray-300"
                                />
                                <span className="text-sm text-gray-700">{course.title}</span>
                              </label>
                            ))
                          )}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.couponAllowed || false}
                          onChange={(e) => setFormData({ ...formData, couponAllowed: e.target.checked })}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">Allow Coupons</span>
                      </label>

                      {formData.couponAllowed && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Max Coupon Discount (%)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.maxCouponDiscountPercentage || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                maxCouponDiscountPercentage: e.target.value ? parseFloat(e.target.value) : undefined,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="Maximum discount percentage"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Certificate Tab */}
            {activeTab === "certificate" && (
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-4">Certificate Settings</h2>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.certificateEnabled || false}
                        onChange={(e) => setFormData({ ...formData, certificateEnabled: e.target.checked })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Enable Certificates</span>
                    </label>

                    {formData.certificateEnabled && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Certificate Issue Rule
                          </label>
                          <select
                            value={formData.certificateIssueRule || "course_complete"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                certificateIssueRule: e.target.value as "course_complete" | "quiz_pass",
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          >
                            <option value="course_complete">On Course Completion</option>
                            <option value="quiz_pass">On Quiz Pass</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Certificate Template ID (Optional)
                          </label>
                          <input
                            type="text"
                            value={formData.certificateTemplateId || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                certificateTemplateId: e.target.value || undefined,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="Template ID if using custom template"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">Reviews & Ratings</h2>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.allowReviews !== false}
                        onChange={(e) => setFormData({ ...formData, allowReviews: e.target.checked })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Allow Reviews</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.autoApproveReviews || false}
                        onChange={(e) => setFormData({ ...formData, autoApproveReviews: e.target.checked })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Auto-Approve Reviews</span>
                    </label>
                  </div>
                </section>
              </div>
            )}

            {/* SEO & Marketing Tab */}
            {activeTab === "seo" && (
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-4">SEO & Marketing</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SEO Title
                      </label>
                      <input
                        type="text"
                        value={formData.seoTitle || ""}
                        onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value || undefined })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="SEO optimized title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Meta Description
                      </label>
                      <textarea
                        rows={3}
                        value={formData.metaDescription || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, metaDescription: e.target.value || undefined })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="SEO meta description"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Open Graph Image URL
                      </label>
                      <input
                        type="url"
                        value={formData.ogImage || ""}
                        onChange={(e) => setFormData({ ...formData, ogImage: e.target.value || undefined })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="https://example.com/og-image.jpg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Landing Page Headline
                      </label>
                      <input
                        type="text"
                        value={formData.landingPageHeadline || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, landingPageHeadline: e.target.value || undefined })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="Eye-catching headline for landing page"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CTA Text
                      </label>
                      <input
                        type="text"
                        value={formData.ctaText || ""}
                        onChange={(e) => setFormData({ ...formData, ctaText: e.target.value || undefined })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="Call-to-action button text"
                      />
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 p-6 border-t bg-gray-50">
            <button
              type="button"
              onClick={() => router.push("/admin/courses")}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
