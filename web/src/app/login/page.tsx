/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../../lib/firebaseClient";

type AuthMode = "login" | "register";
type AuthMethod = "phone" | "email";

type UserProfile = {
  name: string;
  mobile: string;
  email: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  gps_location: { lat: number; lng: number } | null;
  role: "student" | "instructor" | "admin" | "super_admin" | "affiliate" | "support";
  created_at: any;
  updated_at: any;
};

export default function LoginPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [authMethod, setAuthMethod] = useState<AuthMethod>("phone");

  // Shared state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Phone auth state
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<import("firebase/auth").ConfirmationResult | null>(null);

  // Email auth state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Profile fields for registration
  const [city, setCity] = useState("");
  const [stateRegion, setStateRegion] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");

  // Setup invisible reCAPTCHA for phone auth
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
    }
  }, []);

  const resetMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const ensureUserDocument = async (uid: string, data?: Partial<UserProfile>) => {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      const now = serverTimestamp();
      const base: UserProfile = {
        name: data?.name || "",
        mobile: data?.mobile || phone || "",
        email: data?.email || email || "",
        city: data?.city || city || "",
        state: data?.state || stateRegion || "",
        country: data?.country || country || "",
        pincode: data?.pincode || pincode || "",
        gps_location: null,
        role: "student",
        created_at: now,
        updated_at: now,
      };
      await setDoc(userRef, base);
    }
    return snap.data() as UserProfile | null;
  };

  const redirectAfterLogin = async (uid: string) => {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    const userData = snap.data() as UserProfile | null;
    const role = userData?.role || "student";
    
    // Redirect based on role
    if (role === "super_admin" || role === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  const handleSendOtp = async () => {
    resetMessages();
    if (!phone) {
      setError("Enter mobile number with country code, e.g. +91XXXXXXXXXX");
      return;
    }
    try {
      setLoading(true);
      const verifier = (window as any).recaptchaVerifier as RecaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phone, verifier);
      setConfirmationResult(confirmation);
      setSuccess("OTP sent. Please check your phone.");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    resetMessages();
    if (!confirmationResult) {
      setError("Please request OTP first.");
      return;
    }
    if (!otp) {
      setError("Enter the OTP you received.");
      return;
    }
    try {
      setLoading(true);
      const result = await confirmationResult.confirm(otp);
      await ensureUserDocument(result.user.uid);
      setSuccess("Logged in successfully.");
      // Redirect after a short delay
      setTimeout(() => {
        redirectAfterLogin(result.user.uid);
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    resetMessages();
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    try {
      setLoading(true);
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await ensureUserDocument(credential.user.uid, {
        email,
      });
      setSuccess("Logged in successfully.");
      // Redirect after a short delay
      setTimeout(() => {
        redirectAfterLogin(credential.user.uid);
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailRegister = async () => {
    resetMessages();
    if (!name || !email || !password) {
      setError("Name, email, and password are required.");
      return;
    }
    try {
      setLoading(true);
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(credential.user, { displayName: name });
      await ensureUserDocument(credential.user.uid, {
        name,
        email,
        mobile: phone,
        city,
        state: stateRegion,
        country,
        pincode,
      });
      setSuccess("Account created and logged in.");
      setAuthMode("login");
      // Redirect after a short delay
      setTimeout(() => {
        redirectAfterLogin(credential.user.uid);
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const isRegister = authMode === "register";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-3xl rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl p-8 space-y-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">
              {isRegister ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Unified LMS + E‑commerce login (one account for courses, products,
              workshops).
            </p>
          </div>
          <div className="inline-flex rounded-full border border-slate-700 bg-slate-900 p-1">
            <button
              type="button"
              onClick={() => setAuthMode("login")}
              className={`px-4 py-1 text-xs font-medium rounded-full ${
                authMode === "login"
                  ? "bg-indigo-500 text-white"
                  : "text-slate-300"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("register")}
              className={`px-4 py-1 text-xs font-medium rounded-full ${
                authMode === "register"
                  ? "bg-indigo-500 text-white"
                  : "text-slate-300"
              }`}
            >
              Register
            </button>
          </div>
        </header>

        <div className="flex gap-6 flex-col md:flex-row">
          {/* Left: method selection + forms */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex rounded-full border border-slate-700 bg-slate-900 p-1">
              <button
                type="button"
                onClick={() => setAuthMethod("phone")}
                className={`px-4 py-1 text-xs font-medium rounded-full ${
                  authMethod === "phone"
                    ? "bg-emerald-500 text-white"
                    : "text-slate-300"
                }`}
              >
                Mobile OTP
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod("email")}
                className={`px-4 py-1 text-xs font-medium rounded-full ${
                  authMethod === "email"
                    ? "bg-emerald-500 text-white"
                    : "text-slate-300"
                }`}
              >
                Email & Password
              </button>
            </div>

            {authMethod === "phone" ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-200 mb-1">
                    Mobile number
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                    placeholder="+91XXXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                {isRegister && (
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="email"
                      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                      placeholder="Email (optional)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      type="text"
                      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                      type="text"
                      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                      placeholder="State"
                      value={stateRegion}
                      onChange={(e) => setStateRegion(e.target.value)}
                    />
                    <input
                      type="text"
                      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                    <input
                      type="text"
                      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                      placeholder="Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </button>
                  <input
                    type="text"
                    className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 disabled:opacity-60"
                  >
                    {loading ? "Verifying..." : "Verify"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {isRegister && (
                  <div>
                    <label className="block text-sm text-slate-200 mb-1">
                      Full name
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm text-slate-200 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-200 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {isRegister && (
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="tel"
                      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                      placeholder="Mobile (+91...)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                      type="text"
                      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                      type="text"
                      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                      placeholder="State"
                      value={stateRegion}
                      onChange={(e) => setStateRegion(e.target.value)}
                    />
                    <input
                      type="text"
                      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                    <input
                      type="text"
                      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                      placeholder="Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={
                    isRegister ? handleEmailRegister : handleEmailLogin
                  }
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-60"
                >
                  {loading
                    ? "Please wait..."
                    : isRegister
                    ? "Create account"
                    : "Login"}
                </button>
              </div>
            )}
          </div>

          {/* Right: explainer */}
          <aside className="w-full md:w-72 rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 px-4 py-5 text-sm text-slate-300 space-y-3">
            <h2 className="text-sm font-semibold text-white">
              One account for everything
            </h2>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
              <li>Access all courses, live classes, and workshops.</li>
              <li>Track orders, certificates, and learning progress.</li>
              <li>Use the same login on web and mobile (future app).</li>
            </ul>
            <div className="mt-3 rounded-lg border border-emerald-700/50 bg-emerald-950/40 px-3 py-2 text-xs text-emerald-200">
              Location details are used only to show{" "}
              <span className="font-semibold">
                nearby workshops and relevant products
              </span>
              . You can update them later from your profile.
            </div>
          </aside>
        </div>

        {(error || success) && (
          <div className="text-sm">
            {error && <p className="text-rose-400">{error}</p>}
            {success && <p className="text-emerald-400">{success}</p>}
          </div>
        )}

        {/* Container required for Firebase reCAPTCHA */}
        <div id="recaptcha-container" />
      </div>
    </div>
  );
}
