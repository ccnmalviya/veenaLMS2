"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import type { SiteSettings } from "@/types/siteSettings";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settingsRef = doc(db, "site_settings", "global");
      const settingsSnap = await getDoc(settingsRef);
      
      if (settingsSnap.exists()) {
        setSettings(settingsSnap.data() as SiteSettings);
      } else {
        // Create default settings if they don't exist
        const defaultSettings: SiteSettings = {
          settingsId: "global",
          shopEnabled: false, // Shop is disabled by default
          updatedAt: new Date().toISOString(),
        };
        await setDoc(settingsRef, defaultSettings);
        setSettings(defaultSettings);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleShop = async () => {
    if (!settings) return;
    
    setSaving(true);
    setSuccessMessage("");
    
    try {
      const updatedSettings: SiteSettings = {
        ...settings,
        shopEnabled: !settings.shopEnabled,
        updatedAt: new Date().toISOString(),
      };
      
      const settingsRef = doc(db, "site_settings", "global");
      await setDoc(settingsRef, updatedSettings);
      
      setSettings(updatedSettings);
      setSuccessMessage(
        updatedSettings.shopEnabled 
          ? "✅ Shop is now VISIBLE on the website!" 
          : "✅ Shop is now HIDDEN from the website!"
      );
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("Failed to update settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="text-center py-12">Loading settings...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Site Settings</h1>
          <p className="text-gray-600 mb-8">
            Control what features are visible on your live website
          </p>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 font-medium">
              {successMessage}
            </div>
          )}

          {/* Shop Toggle Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">🛍️ Shop Section</h2>
                <p className="text-gray-600 mb-4">
                  Toggle the shop section on/off. When disabled, users will only see the Classes page.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>Current Status:</strong>{" "}
                    <span className={settings?.shopEnabled ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                      {settings?.shopEnabled ? "VISIBLE ✓" : "HIDDEN ✗"}
                    </span>
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    Changes take effect immediately on the live website
                  </p>
                </div>

                {/* What happens when shop is disabled */}
                {!settings?.shopEnabled && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold text-yellow-800 mb-2">
                      When Shop is Disabled:
                    </p>
                    <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
                      <li>"Shop" link is hidden from navigation</li>
                      <li>Shopping cart icon is hidden</li>
                      <li>Product categories are hidden</li>
                      <li>Users can only see the Classes page</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Toggle Switch */}
              <div className="ml-6">
                <button
                  onClick={handleToggleShop}
                  disabled={saving}
                  className={`relative inline-flex h-12 w-24 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings?.shopEnabled
                      ? "bg-green-500"
                      : "bg-gray-300"
                  } ${saving ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <span
                    className={`inline-block h-10 w-10 transform rounded-full bg-white shadow-lg transition-transform ${
                      settings?.shopEnabled ? "translate-x-12" : "translate-x-1"
                    }`}
                  />
                  <span className="sr-only">Toggle shop</span>
                </button>
                <p className="text-xs text-center mt-2 font-medium">
                  {settings?.shopEnabled ? "ON" : "OFF"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleToggleShop}
                disabled={saving}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  settings?.shopEnabled
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                } ${saving ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {saving ? "Updating..." : settings?.shopEnabled ? "Hide Shop" : "Show Shop"}
              </button>
            </div>
          </div>

          {/* Last Updated Info */}
          {settings?.updatedAt && (
            <div className="mt-4 text-sm text-gray-500">
              Last updated: {new Date(settings.updatedAt).toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

