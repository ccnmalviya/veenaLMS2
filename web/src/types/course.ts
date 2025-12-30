// Course Types and Interfaces

export type CourseLanguage = "hindi" | "english" | "hinglish";
export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseStatus = "draft" | "published" | "archived";
export type CourseAccessType = "lifetime" | "limited" | "subscription";
export type CourseEnrollmentType = "auto" | "manual";
export type SectionUnlockRule = "free" | "paid" | "drip";
export type LessonType = "video" | "pdf" | "quiz";
export type VideoSource = "s3" | "vimeo" | "youtube_private";
export type CompletionRule = "watch_percentage" | "manual";
export type QuizType = "mcq" | "descriptive";
export type CertificateIssueRule = "course_complete" | "quiz_pass";

// Course Interface
export interface Course {
  id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  language: CourseLanguage;
  category: string;
  subCategory?: string;
  tags: string[];
  level: CourseLevel;
  courseType: "video_course";
  instructors: string[];
  thumbnailImage: string;
  promoVideoUrl?: string;
  status: CourseStatus;
  
  // Pricing & Monetization
  price: number;
  discountedPrice?: number;
  discountStartDate?: any;
  discountEndDate?: any;
  currency: string;
  gstApplicable: boolean;
  accessType: CourseAccessType;
  accessDurationDays?: number;
  installmentEnabled: boolean;
  affiliateCommissionPercentage?: number;
  
  // Bundles & Offers
  allowBundle: boolean;
  bundleCourseIds?: string[];
  bonusContentIds?: string[];
  couponAllowed: boolean;
  maxCouponDiscountPercentage?: number;
  
  // Enrollment & Access Control
  enrollmentType: CourseEnrollmentType;
  maxEnrollments?: number;
  deviceLimit?: number;
  allowDownloads: boolean;
  screenRecordingBlocked: boolean;
  ipRestrictionEnabled: boolean;
  
  // Certificate
  certificateEnabled: boolean;
  certificateTemplateId?: string;
  certificateIssueRule?: CertificateIssueRule;
  
  // Reviews & Ratings
  allowReviews: boolean;
  autoApproveReviews: boolean;
  
  // SEO & Marketing
  seoTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  landingPageHeadline?: string;
  ctaText?: string;
  
  // Timestamps
  createdAt?: any;
  updatedAt?: any;
}

// Section Interface
export interface Section {
  id?: string;
  courseId: string;
  title: string;
  description?: string;
  orderIndex: number;
  unlockRule: SectionUnlockRule;
  createdAt?: any;
  updatedAt?: any;
}

// Lesson Interface
export interface Lesson {
  id?: string;
  courseId: string;
  sectionId: string;
  title: string;
  lessonType: LessonType;
  videoSource?: VideoSource;
  videoUrl?: string;
  videoDuration?: number; // in seconds
  description?: string;
  orderIndex: number;
  isFreePreview: boolean;
  notesPdfUrl?: string;
  transcriptText?: string;
  completionRule: CompletionRule;
  watchPercentageRequired?: number; // if completionRule is watch_percentage
  dripDelayDays?: number;
  createdAt?: any;
  updatedAt?: any;
}

// Quiz Interface
export interface Quiz {
  id?: string;
  lessonId: string;
  title: string;
  quizType: QuizType;
  totalMarks: number;
  passingMarks: number;
  timeLimitMinutes?: number;
  attemptsAllowed: number;
  shuffleQuestions: boolean;
  showResultImmediately: boolean;
  certificateEligible: boolean;
  createdAt?: any;
  updatedAt?: any;
}

// Progress Interface
export interface Progress {
  id?: string;
  userId: string;
  courseId: string;
  lessonId: string;
  watchTime: number; // in seconds
  completed: boolean;
  progressPercentage: number; // 0-100
  lastWatchedPosition: number; // in seconds
  updatedAt?: any;
}

// Enrollment Interface
export interface Enrollment {
  id?: string;
  userId: string;
  courseId: string;
  enrolledAt: any;
  accessExpiresAt?: any;
  status: "active" | "expired" | "cancelled";
  paymentId?: string;
  deviceCount?: number;
  createdAt?: any;
  updatedAt?: any;
}

// Certificate Interface
export interface Certificate {
  id?: string;
  userId: string;
  courseId: string;
  enrollmentId: string;
  certificateSerialNumber: string;
  issueDate: any;
  verificationUrl: string;
  templateId?: string;
  createdAt?: any;
}

// Review Interface
export interface Review {
  id?: string;
  userId: string;
  courseId: string;
  rating: number; // 1-5
  comment?: string;
  approved: boolean;
  createdAt?: any;
  updatedAt?: any;
}
