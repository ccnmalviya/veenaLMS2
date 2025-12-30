"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default function CertificatesPage() {
  const router = useRouter();
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
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Certificates Management</h1>
            <p className="text-gray-600 mt-2">Manage certificate templates and issue certificates</p>
          </div>
          <button
            onClick={() => router.push("/admin/certificates/new")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Create Template
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">Certificate management features coming soon.</p>
            <p className="text-sm text-gray-500 mt-2">
              You'll be able to create templates, customize designs, and auto-generate certificates for course completions.
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
