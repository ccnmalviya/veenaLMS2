"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where, orderBy, doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";

type LiveClass = {
  id: string;
  item_id: string;
  title: string;
  price: number;
  discount_price?: number;
  status: string;
  scheduled_date?: any;
  zoom_meeting_id?: string;
};

export default function LiveClassesPage() {
  const router = useRouter();
  const [classes, setClasses] = useState<LiveClass[]>([]);
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
      loadClasses();
    });
    return () => unsubscribe();
  }, [router]);

  const loadClasses = async () => {
    try {
      setLoading(true);
      // Fetch all items and filter/sort in memory to avoid index requirements
      const snapshot = await getDocs(collection(db, "store_items"));
      const classesData: LiveClass[] = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Filter for live_class type
        const itemType = data.type || data.itemType;
        if (itemType === "live_class") {
          classesData.push({ id: doc.id, ...data } as LiveClass);
        }
      });
      
      // Sort by created_at (newest first) - handle both field names
      classesData.sort((a, b) => {
        const dateA = (a as any).created_at?.toMillis?.() || (a as any).createdAt?.toMillis?.() || 0;
        const dateB = (b as any).created_at?.toMillis?.() || (b as any).createdAt?.toMillis?.() || 0;
        return dateB - dateA;
      });
      
      setClasses(classesData);
    } catch (error) {
      console.error("Error loading classes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Live Classes Management</h1>
            <p className="text-gray-600 mt-2">Schedule and manage online live classes</p>
          </div>
          <button
            onClick={() => router.push("/admin/store-items/new?type=live_class")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Schedule Class
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : classes.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No live classes found</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Zoom Meeting</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {classes.map((classItem) => (
                  <tr key={classItem.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{classItem.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{classItem.discount_price || classItem.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        classItem.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {classItem.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {classItem.zoom_meeting_id || "Not created"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => router.push(`/admin/store-items/${classItem.id}/edit`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
