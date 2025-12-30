"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where, orderBy, doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";

type Workshop = {
  id: string;
  item_id: string;
  title: string;
  price: number;
  discount_price?: number;
  status: string;
  location?: string;
  max_seats?: number;
  enrolled_count?: number;
};

export default function WorkshopsPage() {
  const router = useRouter();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
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
      loadWorkshops();
    });
    return () => unsubscribe();
  }, [router]);

  const loadWorkshops = async () => {
    try {
      setLoading(true);
      // Fetch all items and filter/sort in memory to avoid index requirements
      const snapshot = await getDocs(collection(db, "store_items"));
      const workshopsData: Workshop[] = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Filter for workshop type
        const itemType = data.type || data.itemType;
        if (itemType === "workshop") {
          workshopsData.push({ id: doc.id, ...data } as Workshop);
        }
      });
      
      // Sort by created_at (newest first) - handle both field names
      workshopsData.sort((a, b) => {
        const dateA = (a as any).created_at?.toMillis?.() || (a as any).createdAt?.toMillis?.() || 0;
        const dateB = (b as any).created_at?.toMillis?.() || (b as any).createdAt?.toMillis?.() || 0;
        return dateB - dateA;
      });
      
      setWorkshops(workshopsData);
    } catch (error) {
      console.error("Error loading workshops:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Workshops Management</h1>
            <p className="text-gray-600 mt-2">Manage offline workshops and locations</p>
          </div>
          <button
            onClick={() => router.push("/admin/store-items/new?type=workshop")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Create Workshop
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : workshops.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No workshops found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((workshop) => (
              <div key={workshop.id} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-2">{workshop.title}</h3>
                <p className="text-sm text-gray-500 mb-2">📍 {workshop.location || "Location TBD"}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-blue-600">
                    ₹{workshop.discount_price || workshop.price}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    workshop.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {workshop.status}
                  </span>
                </div>
                {workshop.max_seats && (
                  <p className="text-sm text-gray-600 mb-4">
                    Seats: {workshop.enrolled_count || 0} / {workshop.max_seats}
                  </p>
                )}
                <button
                  onClick={() => router.push(`/admin/store-items/${workshop.id}/edit`)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit Workshop
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
