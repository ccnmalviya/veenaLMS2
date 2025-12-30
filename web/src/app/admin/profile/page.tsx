"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [changingPassword, setChangingPassword] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/login");
        return;
      }
      const userRef = doc(db, "users", firebaseUser.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      if (!userData || (userData.role !== "super_admin" && userData.role !== "admin")) {
        router.push("/dashboard");
        return;
      }
      setUser({ ...userData, email: firebaseUser.email, uid: firebaseUser.uid });
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      return;
    }

    if (passwordForm.newPassword.length < 4) {
      setMessage({ type: "error", text: "Password must be at least 4 characters" });
      return;
    }

    try {
      setChangingPassword(true);
      const currentUser = auth.currentUser;
      if (!currentUser || !currentUser.email) {
        throw new Error("User not authenticated");
      }

      // Re-authenticate user
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        passwordForm.currentPassword
      );
      await reauthenticateWithCredential(currentUser, credential);

      // Update password
      await updatePassword(currentUser, passwordForm.newPassword);

      setMessage({
        type: "success",
        text: "Password changed successfully!",
      });

      // Reset form
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error("Error changing password:", error);
      if (error.code === "auth/wrong-password") {
        setMessage({ type: "error", text: "Current password is incorrect" });
      } else if (error.code === "auth/weak-password") {
        setMessage({ type: "error", text: "New password is too weak" });
      } else {
        setMessage({ type: "error", text: error.message || "Failed to change password" });
      }
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and password</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={user?.name || ""}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input
                type="text"
                value={user?.role === "super_admin" ? "Super Admin" : "Admin"}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
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
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password *
              </label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password *
              </label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
                minLength={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password *
              </label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
                minLength={4}
              />
            </div>
            <button
              type="submit"
              disabled={changingPassword}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {changingPassword ? "Changing Password..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
