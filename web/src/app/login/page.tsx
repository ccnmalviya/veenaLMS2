"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult
} from "firebase/auth";
import { auth, db } from "@/lib/firebaseClient";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Declare recaptchaVerifier on window
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect") || "/dashboard";

  const [isSignUp, setIsSignUp] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  
  // Email/Password states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  
  // Phone states
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize reCAPTCHA
  useEffect(() => {
    if (loginMethod === "phone" && !window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {
            console.log("reCAPTCHA solved");
          },
          'expired-callback': () => {
            console.log("reCAPTCHA expired");
          }
        });
      } catch (error) {
        console.error("Error initializing reCAPTCHA:", error);
      }
    }
  }, [loginMethod]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(redirect);
    } catch (err: any) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        displayName: name || email.split("@")[0],
        mobile: "",
        role: "student",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      router.push(redirect);
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Format phone number with country code if not present
      let formattedPhone = phoneNumber.trim();
      if (!formattedPhone.startsWith("+")) {
        formattedPhone = "+91" + formattedPhone; // Default to India (+91)
      }

      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      
      setConfirmationResult(result);
      setShowOtpInput(true);
      setError("");
    } catch (err: any) {
      console.error("Error sending OTP:", err);
      setError(err.message || "Failed to send OTP. Please try again.");
      
      // Reset reCAPTCHA on error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!confirmationResult) {
        throw new Error("Please request OTP first");
      }

      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      // Check if user document exists, create if not
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          mobile: user.phoneNumber,
          displayName: name || user.phoneNumber,
          email: "",
          role: "student",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }

      router.push(redirect);
    } catch (err: any) {
      console.error("Error verifying OTP:", err);
      setError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white">
              <h1 className="text-3xl font-bold mb-2">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h1>
              <p className="text-blue-100">
                {isSignUp
                  ? "Start your learning journey today"
                  : "Sign in to continue your learning"}
              </p>
            </div>

            {/* Form */}
            <div className="p-8">
              {/* Login Method Toggle */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-full bg-gray-100 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod("email");
                      setError("");
                      setShowOtpInput(false);
                    }}
                    className={`px-6 py-2 text-sm font-semibold rounded-full transition-all ${
                      loginMethod === "email"
                        ? "bg-white text-gray-900 shadow"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    📧 Email
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod("phone");
                      setError("");
                      setShowOtpInput(false);
                    }}
                    className={`px-6 py-2 text-sm font-semibold rounded-full transition-all ${
                      loginMethod === "phone"
                        ? "bg-white text-gray-900 shadow"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    📱 Phone
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm mb-5">
                  {error}
                </div>
              )}

              {/* EMAIL LOGIN FORM */}
              {loginMethod === "email" && (
                <form onSubmit={isSignUp ? handleEmailSignUp : handleEmailLogin} className="space-y-5">
                  {/* Name Field (Sign Up Only) */}
                  {isSignUp && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  )}

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  {/* Confirm Password (Sign Up Only) */}
                  {isSignUp && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </span>
                    ) : isSignUp ? (
                      "Create Account"
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>
              )}

              {/* PHONE LOGIN FORM */}
              {loginMethod === "phone" && (
                <div className="space-y-5">
                  {!showOtpInput ? (
                    <form onSubmit={handleSendOTP} className="space-y-5">
                      {/* Name Field (For new users) */}
                      {isSignUp && (
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                      )}

                      {/* Phone Number Field */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="flex gap-2">
                          <div className="w-20 px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 flex items-center justify-center font-semibold text-gray-700">
                            +91
                          </div>
                          <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                            placeholder="9876543210"
                            maxLength={10}
                            required
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">We'll send you an OTP to verify</p>
                      </div>

                      {/* reCAPTCHA container */}
                      <div id="recaptcha-container"></div>

                      {/* Send OTP Button */}
                      <button
                        type="submit"
                        disabled={loading || phoneNumber.length !== 10}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending OTP...
                          </span>
                        ) : (
                          "Send OTP"
                        )}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOTP} className="space-y-5">
                      {/* OTP Input */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Enter OTP
                        </label>
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-center text-2xl tracking-widest"
                          placeholder="000000"
                          maxLength={6}
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1 text-center">
                          OTP sent to +91{phoneNumber}
                        </p>
                      </div>

                      {/* Verify OTP Button */}
                      <button
                        type="submit"
                        disabled={loading || otp.length !== 6}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Verifying...
                          </span>
                        ) : (
                          "Verify OTP"
                        )}
                      </button>

                      {/* Resend OTP */}
                      <button
                        type="button"
                        onClick={() => {
                          setShowOtpInput(false);
                          setOtp("");
                        }}
                        className="w-full text-sm text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        ← Change Phone Number
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Toggle Sign In / Sign Up */}
              <div className="text-center pt-4 mt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError("");
                    setShowOtpInput(false);
                  }}
                  className="text-sm text-gray-600 hover:text-blue-600 font-medium"
                >
                  {isSignUp ? (
                    <>
                      Already have an account?{" "}
                      <span className="text-blue-600 font-bold">Sign In</span>
                    </>
                  ) : (
                    <>
                      Don't have an account?{" "}
                      <span className="text-blue-600 font-bold">Sign Up</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-1">📚</div>
              <p className="text-xs font-semibold text-gray-700">150+ Courses</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-1">🎓</div>
              <p className="text-xs font-semibold text-gray-700">Expert Teachers</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-1">⭐</div>
              <p className="text-xs font-semibold text-gray-700">Certificates</p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link
              href="/classes"
              className="text-sm text-gray-600 hover:text-blue-600 font-medium inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Classes
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
