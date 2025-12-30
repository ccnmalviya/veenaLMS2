"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Plus, Edit2, Trash2, UserPlus } from "lucide-react";

type Staff = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: "super_admin" | "admin";
  permissions?: {
    courses?: boolean;
    products?: boolean;
    orders?: boolean;
    users?: boolean;
    staff?: boolean;
    analytics?: boolean;
    settings?: boolean;
  };
  created_at: any;
  created_by?: string;
};

export default function StaffPage() {
  const router = useRouter();
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "admin" as "super_admin" | "admin",
    permissions: {
      courses: true,
      products: true,
      orders: true,
      users: true,
      staff: false,
      analytics: true,
      settings: false,
    },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      if (userData?.role !== "super_admin") {
        router.push("/admin");
        return;
      }
      setCurrentUser({ ...userData, uid: user.uid });
      loadStaff();
    });
    return () => unsubscribe();
  }, [router]);

  const loadStaff = async () => {
    try {
      setLoading(true);
      // Load only staff (super_admin and admin roles)
      const q = query(
        collection(db, "users"),
        where("role", "in", ["super_admin", "admin"])
      );
      const snapshot = await getDocs(q);
      const staffData: Staff[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        staffData.push({ id: doc.id, ...data } as Staff);
      });
      setStaff(staffData);
    } catch (error) {
      console.error("Error loading staff:", error);
      // Fallback: get all users and filter
      const snapshot = await getDocs(collection(db, "users"));
      const staffData: Staff[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.role === "super_admin" || data.role === "admin") {
          staffData.push({ id: doc.id, ...data } as Staff);
        }
      });
      setStaff(staffData);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || currentUser.role !== "super_admin") {
      alert("Only super admin can create staff");
      return;
    }

    try {
      if (editingStaff) {
        // Update existing staff
        const staffRef = doc(db, "users", editingStaff.id);
        await updateDoc(staffRef, {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          role: formData.role,
          permissions: formData.permissions,
          updated_at: serverTimestamp(),
        });
        alert("Staff updated successfully!");
      } else {
        // Create new staff member
        if (!formData.password) {
          alert("Password is required for new staff");
          return;
        }

        // Create Firebase Auth user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const newUser = userCredential.user;

        // Update profile
        await updateProfile(newUser, {
          displayName: formData.name,
        });

        // Create user document in Firestore
        const userRef = doc(db, "users", newUser.uid);
        await setDoc(userRef, {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          city: "",
          state: "",
          country: "",
          pincode: "",
          gps_location: null,
          role: formData.role,
          permissions: formData.permissions,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp(),
          created_by: currentUser.uid,
        });

        alert("Staff created successfully!");
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        role: "admin",
        permissions: {
          courses: true,
          products: true,
          orders: true,
          users: true,
          staff: false,
          analytics: true,
          settings: false,
        },
      });
      setShowForm(false);
      setEditingStaff(null);
      loadStaff();
    } catch (error: any) {
      console.error("Error saving staff:", error);
      alert(error.message || "Failed to save staff");
    }
  };

  const handleEdit = (staffMember: Staff) => {
    setEditingStaff(staffMember);
    setFormData({
      name: staffMember.name,
      email: staffMember.email,
      mobile: staffMember.mobile || "",
      password: "",
      role: staffMember.role,
      permissions: staffMember.permissions || {
        courses: true,
        products: true,
        orders: true,
        users: true,
        staff: false,
        analytics: true,
        settings: false,
      },
    });
    setShowForm(true);
  };

  const handleDelete = async (staffId: string) => {
    if (!confirm("Are you sure you want to delete this staff member?")) {
      return;
    }
    try {
      await deleteDoc(doc(db, "users", staffId));
      alert("Staff deleted successfully!");
      loadStaff();
    } catch (error) {
      console.error("Error deleting staff:", error);
      alert("Failed to delete staff");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
            <p className="text-gray-600 mt-2">
              Create and manage staff members with role-based access
            </p>
          </div>
          {currentUser?.role === "super_admin" && (
            <button
              onClick={() => {
                setShowForm(true);
                setEditingStaff(null);
                setFormData({
                  name: "",
                  email: "",
                  mobile: "",
                  password: "",
                  role: "admin",
                  permissions: {
                    courses: true,
                    products: true,
                    orders: true,
                    users: true,
                    staff: false,
                    analytics: true,
                    settings: false,
                  },
                });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <UserPlus size={18} />
              Add Staff
            </button>
          )}
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingStaff ? "Edit Staff" : "Add New Staff"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                    disabled={!!editingStaff}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, mobile: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                {!editingStaff && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password *
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, password: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                      minLength={4}
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        role: e.target.value as "super_admin" | "admin",
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
              </div>

              {formData.role === "admin" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Permissions
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(formData.permissions).map(([key, value]) => (
                      <label key={key} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              permissions: {
                                ...prev.permissions,
                                [key]: e.target.checked,
                              },
                            }))
                          }
                          className="rounded"
                        />
                        <span className="text-sm text-gray-700 capitalize">{key}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingStaff ? "Update Staff" : "Create Staff"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingStaff(null);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">Loading staff...</div>
        ) : staff.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No staff members found</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Mobile
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {staff.map((staffMember) => (
                  <tr key={staffMember.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {staffMember.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{staffMember.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {staffMember.mobile || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          staffMember.role === "super_admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {staffMember.role === "super_admin" ? "Super Admin" : "Admin"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {staffMember.role === "super_admin" ? (
                        <span className="text-green-600">Full Access</span>
                      ) : (
                        <span className="text-xs">
                          {staffMember.permissions
                            ? Object.entries(staffMember.permissions)
                                .filter(([_, v]) => v)
                                .map(([k]) => k)
                                .join(", ")
                            : "No permissions"}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {staffMember.created_at?.toDate?.()?.toLocaleDateString() || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {currentUser?.role === "super_admin" && (
                          <>
                            <button
                              onClick={() => handleEdit(staffMember)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            {staffMember.id !== currentUser.uid && (
                              <button
                                onClick={() => handleDelete(staffMember.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </>
                        )}
                      </div>
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
