"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import { Header } from "@/components/layout/Header";

type UserProfile = {
  name: string;
  email: string;
  role: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/login");
        return;
      }

      // Check user role - redirect admin to admin panel
      const userRef = doc(db, "users", firebaseUser.uid);
      const snap = await getDoc(userRef);
      const userData = snap.data() as UserProfile | null;

      if (userData?.role === "super_admin" || userData?.role === "admin") {
        router.push("/admin");
        return;
      }

      setUser(userData || { name: firebaseUser.displayName || "", email: firebaseUser.email || "", role: "student" });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome, {user?.name || "Student"}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* My Courses */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-4">My Courses</h2>
            <p className="text-gray-600 mb-4">Continue your learning journey</p>
            <button
              onClick={() => router.push("/dashboard/courses")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              View Courses
            </button>
          </div>

          {/* Upcoming Live Classes */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-4">Live Classes</h2>
            <p className="text-gray-600 mb-4">Join your scheduled live sessions</p>
            <button
              onClick={() => router.push("/dashboard/live-classes")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              View Classes
            </button>
          </div>

          {/* My Orders */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-4">My Orders</h2>
            <p className="text-gray-600 mb-4">Track your purchases and orders</p>
            <button
              onClick={() => router.push("/dashboard/orders")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              View Orders
            </button>
          </div>

          {/* Certificates */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-4">Certificates</h2>
            <p className="text-gray-600 mb-4">Download your completion certificates</p>
            <button
              onClick={() => router.push("/dashboard/certificates")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              View Certificates
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}




