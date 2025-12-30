"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";

type User = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: string;
  created_at: any;
};

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
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
      loadUsers();
    });
    return () => unsubscribe();
  }, [router]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "users"));
      const usersData: User[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Only show regular users (not staff/admin/super_admin)
        if (data.role !== "admin" && data.role !== "super_admin") {
          usersData.push({ id: doc.id, ...data } as User);
        }
      });
      setUsers(usersData);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      await updateDoc(doc(db, "users", userId), { role: newRole });
      loadUsers();
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update role");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-2">Manage users, roles, and permissions</p>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : users.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No users found</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{user.mobile}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={user.role}
                        onChange={(e) => updateUserRole(user.id, e.target.value)}
                        className="px-2 py-1 text-xs border border-gray-300 rounded"
                      >
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                        <option value="admin">Admin</option>
                        <option value="super_admin">Super Admin</option>
                        <option value="affiliate">Affiliate</option>
                        <option value="support">Support</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.created_at?.toDate?.()?.toLocaleDateString() || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => router.push(`/admin/users/${user.id}`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
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


