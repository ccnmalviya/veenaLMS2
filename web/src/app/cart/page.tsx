"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NotificationStrip } from "@/components/home/NotificationStrip";
import { CategoryNavigation } from "@/components/layout/CategoryNavigation";

type CartItem = {
  id: string;
  itemId: string;
  title: string;
  price: number;
  image?: string | null;
  type?: string;
};

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      router.push("/login?redirect=/cart");
      return;
    }
    loadCart(user.uid);
  }, [router]);

  const loadCart = async (userId: string) => {
    try {
      setLoading(true);
      const q = query(collection(db, "carts"), where("userId", "==", userId));
      const snapshot = await getDocs(q);
      const result: CartItem[] = [];
      snapshot.forEach((d) => {
        const data = d.data() as any;
        result.push({
          id: d.id,
          itemId: data.itemId,
          title: data.title || "Untitled",
          price: data.price || 0,
          image: data.image || null,
          type: data.type,
        });
      });
      setItems(result);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleRemove = async (id: string) => {
    try {
      await deleteDoc(doc(db, "carts", id));
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      alert("Failed to remove item. Please try again.");
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    router.push("/checkout");
  };

  const handleClearCart = async () => {
    if (items.length === 0) return;
    if (!confirm("Clear all items from your cart?")) return;
    try {
      setClearing(true);
      await Promise.all(items.map((item) => deleteDoc(doc(db, "carts", item.id))));
      setItems([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
      alert("Failed to clear cart. Please try again.");
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <NotificationStrip />
      <CategoryNavigation />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Your Cart</h1>

        {loading ? (
          <div className="py-10 text-gray-500">Loading cart...</div>
        ) : items.length === 0 ? (
          <div className="py-10 text-gray-500">
            Your cart is empty.{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              Continue shopping
            </Link>
            .
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
            {/* Items list */}
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4"
                >
                  <div className="h-16 w-16 flex-shrink-0 rounded-md bg-gray-100 overflow-hidden">
                    {item.image ? (
                      // simple img; you can swap to S3Image if needed
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-400 text-xs">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/item/${item.itemId}`}
                      className="block text-sm font-semibold text-gray-900 hover:text-blue-600 truncate"
                    >
                      {item.title}
                    </Link>
                    {item.type && (
                      <p className="text-xs text-gray-500 capitalize mt-0.5">
                        {item.type.replace("_", " ")}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-gray-900">
                      ₹{item.price.toLocaleString()}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="text-xs text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <aside className="rounded-lg border border-gray-200 bg-white p-5 h-fit">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Order Summary</h2>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Items</span>
                <span className="font-medium text-gray-900">{items.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">
                  ₹{total.toLocaleString()}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCheckout}
                disabled={items.length === 0}
                className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 mb-2"
              >
                Proceed to Checkout
              </button>
              <button
                type="button"
                onClick={handleClearCart}
                disabled={clearing || items.length === 0}
                className="w-full rounded-lg border border-gray-300 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {clearing ? "Clearing..." : "Clear Cart"}
              </button>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}


