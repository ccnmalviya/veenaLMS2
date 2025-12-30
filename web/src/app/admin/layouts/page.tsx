"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { FileUpload } from "@/components/admin/FileUpload";
import { auth, db } from "@/lib/firebaseClient";

type HomepageOffer = {
  id: string;
  title: string;
  subtitle: string;
  discount: number;
  expiresAt: string;
  ctaLabel: string;
  ctaUrl: string;
  videoUrl?: string;
  enabled: boolean;
  displayOrder: number;
};

type HomepageTestimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
  videoUrl?: string;
  thumbnailImage?: string;
  enabled: boolean;
  displayOrder: number;
};

const DEFAULT_OFFERS: Omit<HomepageOffer, "id">[] = [
  {
    title: "Flash Sale: 50% Off",
    subtitle: "All courses this week",
    discount: 50,
    expiresAt: "2024-12-31",
    ctaLabel: "Shop Now",
    ctaUrl: "/offers/1",
    videoUrl: "https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4",
    enabled: true,
    displayOrder: 1,
  },
  {
    title: "Buy 2 Get 1 Free",
    subtitle: "On selected workshops",
    discount: 33,
    expiresAt: "2024-12-25",
    ctaLabel: "Shop Now",
    ctaUrl: "/offers/2",
    videoUrl: "https://videos.pexels.com/video-files/3044474/3044474-hd_1920_1080_30fps.mp4",
    enabled: true,
    displayOrder: 2,
  },
];

const DEFAULT_TESTIMONIALS: Omit<HomepageTestimonial, "id">[] = [
  {
    name: "Harper Jackson",
    role: "Founder, Creative Studio",
    text:
      "The unified LMS and store experience made it incredibly easy to sell courses and physical kits together.",
    enabled: true,
    displayOrder: 1,
  },
  {
    name: "Mason Jack",
    role: "Digital Marketer",
    text:
      "Live classes, recorded courses, and workshop registrations all work from a single dashboard. Huge time saver.",
    enabled: true,
    displayOrder: 2,
  },
  {
    name: "Avery Wyatt",
    role: "Student",
    text:
      "I can learn, buy workshop kits, and track my certificates in one place. The experience feels premium.",
    enabled: true,
    displayOrder: 3,
  },
];

export default function LayoutsManagementPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [offers, setOffers] = useState<HomepageOffer[]>([]);
  const [testimonials, setTestimonials] = useState<HomepageTestimonial[]>([]);
  const [classesTestimonials, setClassesTestimonials] = useState<HomepageTestimonial[]>([]);

  const [editingOffer, setEditingOffer] = useState<HomepageOffer | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<HomepageTestimonial | null>(null);
  const [editingClassesTestimonial, setEditingClassesTestimonial] = useState<HomepageTestimonial | null>(null);

  const [savingOffer, setSavingOffer] = useState(false);
  const [savingTestimonial, setSavingTestimonial] = useState(false);
  const [savingClassesTestimonial, setSavingClassesTestimonial] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      // Only allow admin / super_admin
      const userRef = doc(db, "users", user.uid);
      const { getDoc } = await import("firebase/firestore");
      const snap = await getDoc(userRef);
      const userData = snap.data();
      if (userData?.role !== "super_admin" && userData?.role !== "admin") {
        router.push("/dashboard");
        return;
      }

      loadData();
    });

    return () => unsubscribe();
  }, [router]);

  const loadData = async () => {
    try {
      setLoading(true);

      const offersQuery = query(
        collection(db, "homepage_offers"),
        orderBy("displayOrder", "asc")
      );
      const offersSnapshot = await getDocs(offersQuery);
      const offersData: HomepageOffer[] = [];
      offersSnapshot.forEach((d) => {
        const data = d.data();
        offersData.push({
          id: d.id,
          title: data.title || "",
          subtitle: data.subtitle || "",
          discount: Number(data.discount) || 0,
          expiresAt: data.expiresAt || "",
          ctaLabel: data.ctaLabel || "Shop Now",
          ctaUrl: data.ctaUrl || "/",
          videoUrl: data.videoUrl || "",
          enabled: data.enabled !== false,
          displayOrder: data.displayOrder ?? 1,
        });
      });

      // Ensure we always have exactly 2 orange cards that line up with the homepage
      if (offersData.length === 0) {
        // No docs yet – create both defaults
        const created: HomepageOffer[] = [];
        for (let index = 0; index < DEFAULT_OFFERS.length; index++) {
          const def = { ...DEFAULT_OFFERS[index], displayOrder: index + 1 };
          const ref = await addDoc(collection(db, "homepage_offers"), def);
          created.push({ id: ref.id, ...def });
        }
        setOffers(created);
      } else if (offersData.length === 1) {
        // Only one doc – keep it as first card, create a second default card
        const first = { ...offersData[0], displayOrder: 1 };
        const secondDefault = { ...DEFAULT_OFFERS[1], displayOrder: 2 };
        const ref = await addDoc(collection(db, "homepage_offers"), secondDefault);
        const second: HomepageOffer = { id: ref.id, ...secondDefault };
        setOffers([first, second]);
      } else {
        // Two or more docs – take the first two in order
        const normalized = offersData
          .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
          .slice(0, 2)
          .map((card, idx) => ({ ...card, displayOrder: idx + 1 }));
        setOffers(normalized);
      }

      const testimonialsQuery = query(
        collection(db, "homepage_testimonials"),
        orderBy("displayOrder", "asc")
      );
      const testimonialsSnapshot = await getDocs(testimonialsQuery);
      const testimonialsData: HomepageTestimonial[] = [];
      testimonialsSnapshot.forEach((d) => {
        const data = d.data();
        testimonialsData.push({
          id: d.id,
          name: data.name || "",
          role: data.role || "",
          text: data.text || "",
          videoUrl: data.videoUrl || "",
          thumbnailImage: data.thumbnailImage || "",
          enabled: data.enabled !== false,
          displayOrder: data.displayOrder ?? 1,
        });
      });
      // Only use up to the first 3 testimonials; if none exist, create default ones
      if (testimonialsData.length === 0) {
        const created: HomepageTestimonial[] = [];
        for (const def of DEFAULT_TESTIMONIALS) {
          const ref = await addDoc(collection(db, "homepage_testimonials"), def);
          created.push({ id: ref.id, ...def });
        }
        setTestimonials(created);
      } else {
        setTestimonials(testimonialsData.slice(0, 3));
      }

      // Load classes video testimonials
      const classesTestimonialsQuery = query(
        collection(db, "classes_testimonials"),
        orderBy("displayOrder", "asc")
      );
      const classesTestimonialsSnapshot = await getDocs(classesTestimonialsQuery);
      const classesTestimonialsData: HomepageTestimonial[] = [];
      classesTestimonialsSnapshot.forEach((d) => {
        const data = d.data();
        classesTestimonialsData.push({
          id: d.id,
          name: data.name || "",
          role: data.role || "",
          text: data.text || "",
          videoUrl: data.videoUrl || "",
          thumbnailImage: data.thumbnailImage || "",
          enabled: data.enabled !== false,
          displayOrder: data.displayOrder ?? 1,
        });
      });
      // Ensure we always have exactly 3 classes testimonials
      if (classesTestimonialsData.length === 0) {
        const created: HomepageTestimonial[] = [];
        for (let index = 0; index < 3; index++) {
          const def = { ...DEFAULT_TESTIMONIALS[index], displayOrder: index + 1 };
          const ref = await addDoc(collection(db, "classes_testimonials"), def);
          created.push({ id: ref.id, ...def });
        }
        setClassesTestimonials(created);
      } else if (classesTestimonialsData.length < 3) {
        // Fill missing slots
        const created: HomepageTestimonial[] = [...classesTestimonialsData];
        for (let index = classesTestimonialsData.length; index < 3; index++) {
          const def = { ...DEFAULT_TESTIMONIALS[index], displayOrder: index + 1 };
          const ref = await addDoc(collection(db, "classes_testimonials"), def);
          created.push({ id: ref.id, ...def });
        }
        setClassesTestimonials(created);
      } else {
        setClassesTestimonials(classesTestimonialsData.slice(0, 3));
      }
    } catch (error) {
      console.error("Error loading layouts data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOffer) return;

    try {
      setSavingOffer(true);
      const payload = {
        title: editingOffer.title,
        subtitle: editingOffer.subtitle,
        discount: Number(editingOffer.discount) || 0,
        expiresAt: editingOffer.expiresAt,
        ctaLabel: editingOffer.ctaLabel || "Shop Now",
        ctaUrl: editingOffer.ctaUrl || "/",
        videoUrl: editingOffer.videoUrl || "",
        enabled: editingOffer.enabled,
        displayOrder: Number(editingOffer.displayOrder) || 1,
      };

      // Always update an existing card; this screen is only for editing the two existing orange cards
      if (editingOffer.id) {
        await updateDoc(doc(db, "homepage_offers", editingOffer.id), payload);
      }

      setEditingOffer(null);
      await loadData();
    } catch (error) {
      console.error("Error saving offer:", error);
      alert("Failed to save offer");
    } finally {
      setSavingOffer(false);
    }
  };

  // No delete for offers – we always keep the two orange cards

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;

    try {
      setSavingTestimonial(true);
      const payload = {
        name: editingTestimonial.name,
        role: editingTestimonial.role,
        text: editingTestimonial.text,
        videoUrl: editingTestimonial.videoUrl || "",
        thumbnailImage: editingTestimonial.thumbnailImage || "",
        enabled: editingTestimonial.enabled,
        displayOrder: Number(editingTestimonial.displayOrder) || 1,
      };

      // Always update an existing testimonial; this screen is only for editing the three default ones
      if (editingTestimonial.id) {
        await updateDoc(doc(db, "homepage_testimonials", editingTestimonial.id), payload);
      }

      setEditingTestimonial(null);
      await loadData();
    } catch (error) {
      console.error("Error saving testimonial:", error);
      alert("Failed to save testimonial");
    } finally {
      setSavingTestimonial(false);
    }
  };

  // No delete for testimonials – we always keep the three default cards

  const handleSaveClassesTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClassesTestimonial) return;

    try {
      setSavingClassesTestimonial(true);
      const payload = {
        name: editingClassesTestimonial.name,
        role: editingClassesTestimonial.role,
        text: editingClassesTestimonial.text,
        videoUrl: editingClassesTestimonial.videoUrl || "",
        thumbnailImage: editingClassesTestimonial.thumbnailImage || "",
        enabled: editingClassesTestimonial.enabled,
        displayOrder: Number(editingClassesTestimonial.displayOrder) || 1,
      };

      if (editingClassesTestimonial.id) {
        await updateDoc(doc(db, "classes_testimonials", editingClassesTestimonial.id), payload);
      }

      setEditingClassesTestimonial(null);
      await loadData();
    } catch (error) {
      console.error("Error saving classes testimonial:", error);
      alert("Failed to save classes testimonial");
    } finally {
      setSavingClassesTestimonial(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Homepage & Classes Layouts</h1>
          <p className="text-gray-600 mt-2">
            Manage the orange offer cards, homepage testimonials, and classes page video testimonials.
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">Loading layouts...</div>
        ) : (
          <>
            {/* Orange Offer Cards */}
            <section id="offers" className="bg-white rounded-lg shadow p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Orange Offer Cards</h2>
                  <p className="text-sm text-gray-600">
                    Edit the two orange cards shown on the homepage. No extra cards will be added.
                  </p>
                </div>
              </div>

              {offers.length === 0 ? (
                <p className="text-sm text-gray-500">No offer cards configured yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase">
                        <th className="py-2 pr-4">Title</th>
                        <th className="py-2 pr-4">Subtitle</th>
                        <th className="py-2 pr-4">Discount</th>
                        <th className="py-2 pr-4">Expires</th>
                        <th className="py-2 pr-4">Enabled</th>
                        <th className="py-2 pr-4">Order</th>
                        <th className="py-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {offers.map((offer) => (
                        <tr key={offer.id} className="border-b border-gray-100">
                          <td className="py-2 pr-4 font-medium text-gray-900">{offer.title}</td>
                          <td className="py-2 pr-4 text-gray-600">{offer.subtitle}</td>
                          <td className="py-2 pr-4 text-gray-600">{offer.discount}%</td>
                          <td className="py-2 pr-4 text-gray-600">
                            {offer.expiresAt || <span className="text-gray-400">—</span>}
                          </td>
                          <td className="py-2 pr-4">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                offer.enabled
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {offer.enabled ? "Enabled" : "Disabled"}
                            </span>
                          </td>
                          <td className="py-2 pr-4 text-gray-600">{offer.displayOrder}</td>
                          <td className="py-2 text-right">
                            <button
                              onClick={() => setEditingOffer(offer)}
                              className="text-blue-600 hover:text-blue-800"
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

              {editingOffer && (
                <form
                  onSubmit={handleSaveOffer}
                  className="mt-6 border-t border-gray-200 pt-4 space-y-4"
                >
                  <h3 className="text-sm font-semibold text-gray-800">Edit Offer Card</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={editingOffer.title}
                        onChange={(e) =>
                          setEditingOffer({ ...editingOffer, title: e.target.value })
                        }
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={editingOffer.subtitle}
                        onChange={(e) =>
                          setEditingOffer({ ...editingOffer, subtitle: e.target.value })
                        }
                        className="w-full border rounded-md px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Discount (%)
                      </label>
                      <input
                        type="number"
                        value={editingOffer.discount}
                        onChange={(e) =>
                          setEditingOffer({
                            ...editingOffer,
                            discount: Number(e.target.value),
                          })
                        }
                        className="w-full border rounded-md px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Expires At (optional)
                      </label>
                      <input
                        type="text"
                        placeholder="2024-12-31"
                        value={editingOffer.expiresAt}
                        onChange={(e) =>
                          setEditingOffer({ ...editingOffer, expiresAt: e.target.value })
                        }
                        className="w-full border rounded-md px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        CTA Label
                      </label>
                      <input
                        type="text"
                        value={editingOffer.ctaLabel}
                        onChange={(e) =>
                          setEditingOffer({ ...editingOffer, ctaLabel: e.target.value })
                        }
                        className="w-full border rounded-md px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        CTA URL
                      </label>
                      <input
                        type="text"
                        value={editingOffer.ctaUrl}
                        onChange={(e) =>
                          setEditingOffer({ ...editingOffer, ctaUrl: e.target.value })
                        }
                        className="w-full border rounded-md px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Background Video URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={editingOffer.videoUrl || ""}
                        onChange={(e) =>
                          setEditingOffer({ ...editingOffer, videoUrl: e.target.value })
                        }
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        placeholder="https://example.com/video.mp4 or YouTube/Vimeo URL"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Add a looping background video for the card. If not provided, a default shopping video will be used.
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Display Order
                      </label>
                      <input
                        type="number"
                        value={editingOffer.displayOrder}
                        onChange={(e) =>
                          setEditingOffer({
                            ...editingOffer,
                            displayOrder: Number(e.target.value),
                          })
                        }
                        className="w-full border rounded-md px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-3 mt-6">
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={editingOffer.enabled}
                          onChange={(e) =>
                            setEditingOffer({
                              ...editingOffer,
                              enabled: e.target.checked,
                            })
                          }
                          className="rounded"
                        />
                        Enabled
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingOffer(null)}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingOffer}
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      {savingOffer ? "Saving..." : "Save Offer"}
                    </button>
                  </div>
                </form>
              )}
            </section>

            {/* Testimonials */}
            <section
              id="testimonials"
              className="bg-white rounded-lg shadow p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">What People Say – Testimonials</h2>
                  <p className="text-sm text-gray-600">
                    Edit the three testimonial cards in the &quot;What People Say&quot; section. No extra
                    cards will be added.
                  </p>
                </div>
              </div>

              {testimonials.length === 0 ? (
                <p className="text-sm text-gray-500">No testimonials configured yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase">
                        <th className="py-2 pr-4">Name</th>
                        <th className="py-2 pr-4">Role</th>
                        <th className="py-2 pr-4">Text</th>
                        <th className="py-2 pr-4">Enabled</th>
                        <th className="py-2 pr-4">Order</th>
                        <th className="py-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testimonials.map((t) => (
                        <tr key={t.id} className="border-b border-gray-100">
                          <td className="py-2 pr-4 font-medium text-gray-900">{t.name}</td>
                          <td className="py-2 pr-4 text-gray-600">{t.role}</td>
                          <td className="py-2 pr-4 text-gray-600 max-w-md truncate">
                            {t.text}
                          </td>
                          <td className="py-2 pr-4">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                t.enabled
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {t.enabled ? "Enabled" : "Disabled"}
                            </span>
                          </td>
                          <td className="py-2 pr-4 text-gray-600">{t.displayOrder}</td>
                          <td className="py-2 text-right">
                            <button
                              onClick={() => setEditingTestimonial(t)}
                              className="text-blue-600 hover:text-blue-800"
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

              {editingTestimonial && (
                <form
                  onSubmit={handleSaveTestimonial}
                  className="mt-6 border-t border-gray-200 pt-4 space-y-4"
                >
                  <h3 className="text-sm font-semibold text-gray-800">Edit Testimonial</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={editingTestimonial.name}
                        onChange={(e) =>
                          setEditingTestimonial({
                            ...editingTestimonial,
                            name: e.target.value,
                          })
                        }
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <input
                        type="text"
                        value={editingTestimonial.role}
                        onChange={(e) =>
                          setEditingTestimonial({
                            ...editingTestimonial,
                            role: e.target.value,
                          })
                        }
                        className="w-full border rounded-md px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Testimonial Text
                    </label>
                    <textarea
                      rows={3}
                      value={editingTestimonial.text}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          text: e.target.value,
                        })
                      }
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      placeholder="Text testimonial (optional if video is provided)"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Video URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={editingTestimonial.videoUrl || ""}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          videoUrl: e.target.value,
                        })
                      }
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      placeholder="https://example.com/video.mp4 or YouTube/Vimeo embed URL"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Upload a video testimonial. If provided, video will be shown instead of text.
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Video Thumbnail Image (Optional)
                    </label>
                    <FileUpload
                      accept="image/*"
                      folder="testimonials/thumbnails"
                      currentValue={editingTestimonial.thumbnailImage || ""}
                      onUploadComplete={(url) => {
                        setEditingTestimonial((prev) => 
                          prev ? { ...prev, thumbnailImage: url } : null
                        );
                      }}
                      onUploadError={(error) => {
                        alert(`Upload failed: ${error}`);
                      }}
                    />
                    {editingTestimonial.thumbnailImage && (
                      <div className="mt-2">
                        <img
                          src={editingTestimonial.thumbnailImage}
                          alt="Thumbnail"
                          className="w-32 h-32 object-cover border border-gray-300 rounded"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setEditingTestimonial((prev) => 
                              prev ? { ...prev, thumbnailImage: "" } : null
                            )
                          }
                          className="mt-2 text-xs text-red-600 hover:text-red-800"
                        >
                          Remove Thumbnail
                        </button>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Thumbnail image shown before video plays (poster image)
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Display Order
                      </label>
                      <input
                        type="number"
                        value={editingTestimonial.displayOrder}
                        onChange={(e) =>
                          setEditingTestimonial({
                            ...editingTestimonial,
                            displayOrder: Number(e.target.value),
                          })
                        }
                        className="w-full border rounded-md px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-3 mt-6">
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={editingTestimonial.enabled}
                          onChange={(e) =>
                            setEditingTestimonial({
                              ...editingTestimonial,
                              enabled: e.target.checked,
                            })
                          }
                          className="rounded"
                        />
                        Enabled
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingTestimonial(null)}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingTestimonial}
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      {savingTestimonial ? "Saving..." : "Save Testimonial"}
                    </button>
                  </div>
                </form>
              )}
            </section>

            {/* Classes Video Testimonials */}
            <section id="classes-testimonials" className="bg-white rounded-lg shadow p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Classes Page Video Testimonials</h2>
                  <p className="text-sm text-gray-600">
                    Edit the three video testimonials shown on the classes page. Videos will loop automatically.
                  </p>
                </div>
              </div>

              {classesTestimonials.length === 0 ? (
                <p className="text-sm text-gray-500">No video testimonials configured yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase">
                        <th className="py-2 pr-4">Name</th>
                        <th className="py-2 pr-4">Role</th>
                        <th className="py-2 pr-4">Has Video</th>
                        <th className="py-2 pr-4">Enabled</th>
                        <th className="py-2 pr-4">Order</th>
                        <th className="py-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classesTestimonials.map((testimonial) => (
                        <tr key={testimonial.id} className="border-b border-gray-100">
                          <td className="py-2 pr-4 font-medium text-gray-900">{testimonial.name}</td>
                          <td className="py-2 pr-4 text-gray-600">{testimonial.role}</td>
                          <td className="py-2 pr-4">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                testimonial.videoUrl
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {testimonial.videoUrl ? "Yes" : "No"}
                            </span>
                          </td>
                          <td className="py-2 pr-4">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                testimonial.enabled
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {testimonial.enabled ? "Enabled" : "Disabled"}
                            </span>
                          </td>
                          <td className="py-2 pr-4 text-gray-600">{testimonial.displayOrder}</td>
                          <td className="py-2 text-right">
                            <button
                              onClick={() => setEditingClassesTestimonial(testimonial)}
                              className="text-blue-600 hover:text-blue-800"
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

              {editingClassesTestimonial && (
                <form
                  onSubmit={handleSaveClassesTestimonial}
                  className="mt-6 border-t border-gray-200 pt-4 space-y-4"
                >
                  <h3 className="text-sm font-semibold text-gray-800">Edit Classes Video Testimonial</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={editingClassesTestimonial.name}
                        onChange={(e) =>
                          setEditingClassesTestimonial({
                            ...editingClassesTestimonial,
                            name: e.target.value,
                          })
                        }
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <input
                        type="text"
                        value={editingClassesTestimonial.role}
                        onChange={(e) =>
                          setEditingClassesTestimonial({
                            ...editingClassesTestimonial,
                            role: e.target.value,
                          })
                        }
                        className="w-full border rounded-md px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Testimonial Text (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={editingClassesTestimonial.text}
                      onChange={(e) =>
                        setEditingClassesTestimonial({
                          ...editingClassesTestimonial,
                          text: e.target.value,
                        })
                      }
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      placeholder="Text testimonial (optional if video is provided)"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Video URL *
                    </label>
                    <input
                      type="url"
                      value={editingClassesTestimonial.videoUrl || ""}
                      onChange={(e) =>
                        setEditingClassesTestimonial({
                          ...editingClassesTestimonial,
                          videoUrl: e.target.value,
                        })
                      }
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      placeholder="https://example.com/video.mp4 or YouTube/Vimeo embed URL"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Video URL is required for classes page testimonials. Videos will loop automatically.
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Video Thumbnail Image (Optional)
                    </label>
                    <FileUpload
                      accept="image/*"
                      folder="testimonials/thumbnails"
                      currentValue={editingClassesTestimonial.thumbnailImage || ""}
                      onUploadComplete={(url) => {
                        setEditingClassesTestimonial((prev) => 
                          prev ? { ...prev, thumbnailImage: url } : null
                        );
                      }}
                      onUploadError={(error) => {
                        alert(`Upload failed: ${error}`);
                      }}
                    />
                    {editingClassesTestimonial.thumbnailImage && (
                      <div className="mt-2">
                        <img
                          src={editingClassesTestimonial.thumbnailImage}
                          alt="Thumbnail"
                          className="w-32 h-32 object-cover border border-gray-300 rounded"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setEditingClassesTestimonial((prev) => 
                              prev ? { ...prev, thumbnailImage: "" } : null
                            )
                          }
                          className="mt-2 text-xs text-red-600 hover:text-red-800"
                        >
                          Remove Thumbnail
                        </button>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Thumbnail image shown before video plays (poster image)
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Display Order
                      </label>
                      <input
                        type="number"
                        value={editingClassesTestimonial.displayOrder}
                        onChange={(e) =>
                          setEditingClassesTestimonial({
                            ...editingClassesTestimonial,
                            displayOrder: Number(e.target.value),
                          })
                        }
                        className="w-full border rounded-md px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-3 mt-6">
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={editingClassesTestimonial.enabled}
                          onChange={(e) =>
                            setEditingClassesTestimonial({
                              ...editingClassesTestimonial,
                              enabled: e.target.checked,
                            })
                          }
                          className="rounded"
                        />
                        Enabled
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingClassesTestimonial(null)}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingClassesTestimonial}
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                      {savingClassesTestimonial ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              )}
            </section>
          </>
        )}
      </div>
    </AdminLayout>
  );
}


