"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const setupSuperAdmin = async () => {
    try {
      setLoading(true);
      setMessage(null);

      const email = "ccnmalviya@gmail.com";
      const password = "1234";

      // Check if user already exists
      try {
        // Try to create the user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update profile
        await updateProfile(user, {
          displayName: "Super Admin",
        });

        // Create user document in Firestore
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
          await setDoc(userRef, {
            name: "Super Admin",
            email: email,
            mobile: "",
            city: "",
            state: "",
            country: "",
            pincode: "",
            gps_location: null,
            role: "super_admin",
            created_at: serverTimestamp(),
            updated_at: serverTimestamp(),
          });
        } else {
          // Update existing user to super_admin
          await setDoc(userRef, {
            role: "super_admin",
            updated_at: serverTimestamp(),
          }, { merge: true });
        }

        setMessage({
          type: "success",
          text: "Super Admin created successfully! Email: ccnmalviya@gmail.com, Password: 1234",
        });

        // Sign out the created user
        await auth.signOut();
      } catch (error: any) {
        if (error.code === "auth/email-already-in-use") {
          setMessage({
            type: "error",
            text: "User with this email already exists. If you need to reset, please use Firebase Console or contact support.",
          });
        } else {
          throw error;
        }
      }
    } catch (error: any) {
      console.error("Setup error:", error);
      setMessage({
        type: "error",
        text: error.message || "Failed to setup super admin",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Setup Super Admin</h1>
        
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            This will create a default super admin account:
          </p>
          <ul className="mt-2 text-sm text-blue-700 list-disc list-inside space-y-1">
            <li>Email: <strong>ccnmalviya@gmail.com</strong></li>
            <li>Password: <strong>1234</strong></li>
          </ul>
          <p className="mt-3 text-xs text-blue-600">
            After setup, you can log in and change the password from the admin panel.
          </p>
        </div>

        {message && (
          <div
            className={`mb-4 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <button
          onClick={setupSuperAdmin}
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Setting up..." : "Setup Super Admin"}
        </button>

        <button
          onClick={() => router.push("/login")}
          className="w-full mt-3 py-2 text-gray-600 hover:text-gray-800"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
