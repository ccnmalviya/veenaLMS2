"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

export default function DebugFirestorePage() {
  const [results, setResults] = useState<{
    storeItems: { count: number; error?: string; sample?: any };
    categories: { count: number; error?: string; sample?: any };
    heroBanners: { count: number; error?: string; sample?: any };
    courses: { count: number; error?: string; sample?: any };
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFirestore = async () => {
      const results: any = {};

      // Check store_items
      try {
        const storeItemsSnapshot = await getDocs(collection(db, "store_items"));
        const storeItems = storeItemsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        results.storeItems = {
          count: storeItems.length,
          sample: storeItems.slice(0, 2),
        };
      } catch (error: any) {
        results.storeItems = {
          count: 0,
          error: `${error.code}: ${error.message}`,
        };
      }

      // Check categories
      try {
        const categoriesSnapshot = await getDocs(collection(db, "categories"));
        const categories = categoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        results.categories = {
          count: categories.length,
          sample: categories.slice(0, 2),
        };
      } catch (error: any) {
        results.categories = {
          count: 0,
          error: `${error.code}: ${error.message}`,
        };
      }

      // Check hero_banners
      try {
        const heroBannersSnapshot = await getDocs(collection(db, "hero_banners"));
        const heroBanners = heroBannersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        results.heroBanners = {
          count: heroBanners.length,
          sample: heroBanners.slice(0, 2),
        };
      } catch (error: any) {
        results.heroBanners = {
          count: 0,
          error: `${error.code}: ${error.message}`,
        };
      }

      // Check courses
      try {
        const coursesSnapshot = await getDocs(collection(db, "courses"));
        const courses = coursesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        results.courses = {
          count: courses.length,
          sample: courses.slice(0, 2),
        };
      } catch (error: any) {
        results.courses = {
          count: 0,
          error: `${error.code}: ${error.message}`,
        };
      }

      setResults(results);
      setLoading(false);
    };

    checkFirestore();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Firestore Diagnostic Tool</h1>
          <p>Checking Firestore connectivity...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Firestore Diagnostic Tool</h1>
        <p className="text-gray-600 mb-6">
          This page tests if your Firestore collections are accessible and shows sample data.
        </p>

        <div className="space-y-6">
          {/* Store Items */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-3">store_items Collection</h2>
            {results?.storeItems.error ? (
              <div className="bg-red-50 border border-red-200 rounded p-4">
                <p className="text-red-800 font-semibold">❌ Error:</p>
                <p className="text-red-700">{results.storeItems.error}</p>
                {results.storeItems.error.includes("permission-denied") && (
                  <p className="text-red-600 mt-2 text-sm">
                    🔒 Firestore security rules are blocking access. Update rules to allow public read access.
                  </p>
                )}
              </div>
            ) : (
              <>
                <p className="text-gray-700 mb-3">
                  <strong>Count:</strong> {results?.storeItems.count} items
                </p>
                {results?.storeItems.sample && results.storeItems.sample.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold mb-2">Sample Data (first 2 items):</p>
                    <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
                      {JSON.stringify(results.storeItems.sample, null, 2)}
                    </pre>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Categories */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-3">categories Collection</h2>
            {results?.categories.error ? (
              <div className="bg-red-50 border border-red-200 rounded p-4">
                <p className="text-red-800 font-semibold">❌ Error:</p>
                <p className="text-red-700">{results.categories.error}</p>
                {results.categories.error.includes("permission-denied") && (
                  <p className="text-red-600 mt-2 text-sm">
                    🔒 Firestore security rules are blocking access. Update rules to allow public read access.
                  </p>
                )}
              </div>
            ) : (
              <>
                <p className="text-gray-700 mb-3">
                  <strong>Count:</strong> {results?.categories.count} items
                </p>
                {results?.categories.sample && results.categories.sample.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold mb-2">Sample Data (first 2 items):</p>
                    <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
                      {JSON.stringify(results.categories.sample, null, 2)}
                    </pre>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Hero Banners */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-3">hero_banners Collection</h2>
            {results?.heroBanners.error ? (
              <div className="bg-red-50 border border-red-200 rounded p-4">
                <p className="text-red-800 font-semibold">❌ Error:</p>
                <p className="text-red-700">{results.heroBanners.error}</p>
                {results.heroBanners.error.includes("permission-denied") && (
                  <p className="text-red-600 mt-2 text-sm">
                    🔒 Firestore security rules are blocking access. Update rules to allow public read access.
                  </p>
                )}
              </div>
            ) : (
              <>
                <p className="text-gray-700 mb-3">
                  <strong>Count:</strong> {results?.heroBanners.count} items
                </p>
                {results?.heroBanners.sample && results.heroBanners.sample.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold mb-2">Sample Data (first 2 items):</p>
                    <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
                      {JSON.stringify(results.heroBanners.sample, null, 2)}
                    </pre>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Courses */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-3">courses Collection</h2>
            {results?.courses.error ? (
              <div className="bg-red-50 border border-red-200 rounded p-4">
                <p className="text-red-800 font-semibold">❌ Error:</p>
                <p className="text-red-700">{results.courses.error}</p>
                {results.courses.error.includes("permission-denied") && (
                  <p className="text-red-600 mt-2 text-sm">
                    🔒 Firestore security rules are blocking access. Update rules to allow public read access.
                  </p>
                )}
              </div>
            ) : (
              <>
                <p className="text-gray-700 mb-3">
                  <strong>Count:</strong> {results?.courses.count} items
                </p>
                {results?.courses.sample && results.courses.sample.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold mb-2">Sample Data (first 2 items):</p>
                    <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
                      {JSON.stringify(results.courses.sample, null, 2)}
                    </pre>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">How to Fix Permission Errors:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
            <li>Go to Firebase Console → Firestore Database → Rules</li>
            <li>Add rules to allow public read access:</li>
            <li>
              <pre className="bg-blue-100 p-2 rounded mt-2 text-xs">
{`match /store_items/{document=**} {
  allow read: if true;
  allow write: if request.auth != null;
}`}
              </pre>
            </li>
            <li>Do the same for categories, hero_banners, and courses collections</li>
            <li>Click "Publish" to save the rules</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
