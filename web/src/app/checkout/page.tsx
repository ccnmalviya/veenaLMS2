"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NotificationStrip } from "@/components/home/NotificationStrip";
import { CategoryNavigation } from "@/components/layout/CategoryNavigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type CartItem = {
  id: string;
  itemId: string;
  title: string;
  price: number;
  image?: string | null;
  type?: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      router.push("/login?redirect=/checkout");
      return;
    }
    loadCart(user.uid);
  }, [router]);

  // Check if Razorpay script is loaded
  useEffect(() => {
    const checkRazorpay = () => {
      if (typeof window !== "undefined" && window.Razorpay) {
        setRazorpayLoaded(true);
      }
    };

    // Check immediately
    checkRazorpay();

    // Also check periodically in case script loads after component mounts
    const interval = setInterval(checkRazorpay, 500);
    
    return () => clearInterval(interval);
  }, []);

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
      console.error("Error loading cart for checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const user = auth.currentUser;
    if (!user) {
      router.push("/login?redirect=/checkout");
      return;
    }

    // Check if Razorpay is available
    if (typeof window === "undefined" || !window.Razorpay) {
      alert("Payment gateway is loading. Please wait a moment and try again.");
      return;
    }

    try {
      setPlacingOrder(true);

      // Create Razorpay order via API
      const orderResponse = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
          notes: {
            userId: user.uid,
            name,
            phone,
            address,
          },
        }),
      });

      if (!orderResponse.ok) {
        const error = await orderResponse.json();
        throw new Error(error.error || "Failed to create payment order");
      }

      const orderData = await orderResponse.json();

      // Create order document in Firestore (pending payment)
      const orderDocRef = await addDoc(collection(db, "orders"), {
        user_id: user.uid,
        order_id: `ORD-${Date.now()}`,
        razorpay_order_id: orderData.id,
        total_amount: total,
        status: "pending",
        payment_status: "pending",
        created_at: serverTimestamp(),
        items: items.map((item) => ({
          itemId: item.itemId,
          title: item.title,
          price: item.price,
          image: item.image || null,
          type: item.type,
        })),
        shipping: {
          name,
          address,
          phone,
        },
      });

      // Get Razorpay key from environment variable
      const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";
      
      if (!razorpayKeyId) {
        throw new Error("Razorpay key not configured. Please set NEXT_PUBLIC_RAZORPAY_KEY_ID in environment variables.");
      }

      // Initialize Razorpay payment
      const options = {
        key: razorpayKeyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Your Store",
        description: `Order for ${items.length} item(s)`,
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            // Verify payment on server
            const verifyResponse = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              // Update order with payment details
              await updateDoc(orderDocRef, {
                razorpay_payment_id: response.razorpay_payment_id,
                payment_status: "completed",
                status: "confirmed",
                payment_verified_at: serverTimestamp(),
              });

              // Clear cart
              await Promise.all(items.map((item) => deleteDoc(doc(db, "carts", item.id))));

              alert("Payment successful! Order placed.");
              router.push("/orders");
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name,
          contact: phone,
        },
        theme: {
          color: "#2563eb",
        },
        modal: {
          ondismiss: function () {
            setPlacingOrder(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      console.error("Failed to initiate payment:", error);
      alert(error.message || "Failed to initiate payment. Please try again.");
      setPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => {
          console.log("Razorpay script loaded");
          setRazorpayLoaded(true);
        }}
        onReady={() => {
          console.log("Razorpay script ready");
          if (typeof window !== "undefined" && window.Razorpay) {
            setRazorpayLoaded(true);
          }
        }}
        onError={() => {
          console.error("Failed to load Razorpay script");
          alert("Payment gateway failed to load. Please refresh the page.");
        }}
      />
      <Header />
      <NotificationStrip />
      <CategoryNavigation />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Checkout</h1>

        {loading ? (
          <div className="py-10 text-gray-500">Loading checkout...</div>
        ) : items.length === 0 ? (
          <div className="py-10 text-gray-500">
            Your cart is empty.{" "}
            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-blue-600 hover:underline"
            >
              Continue shopping
            </button>
            .
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
            {/* Shipping / details form */}
            <form onSubmit={handlePlaceOrder} className="space-y-4 bg-white rounded-lg border border-gray-200 p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Shipping Details</h2>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-700">
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-700">
                  Phone number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-700">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  rows={3}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <h2 className="text-lg font-semibold text-gray-900 mt-4 mb-1">Payment</h2>
              <p className="text-xs text-gray-500 mb-3">
                Secure payment powered by Razorpay
              </p>

              <button
                type="submit"
                disabled={placingOrder}
                className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {placingOrder ? "Placing order..." : `Place Order • ₹${total.toLocaleString()}`}
              </button>
            </form>

            {/* Order summary */}
            <aside className="bg-white rounded-lg border border-gray-200 p-5 h-fit">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Order Summary</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <div className="max-w-xs">
                      <p className="font-medium text-gray-900 truncate">{item.title}</p>
                      {item.type && (
                        <p className="text-xs text-gray-500 capitalize">
                          {item.type.replace("_", " ")}
                        </p>
                      )}
                    </div>
                    <span className="font-semibold text-gray-900">
                      ₹{item.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm border-t border-gray-200 pt-3">
                <span className="text-gray-600">Total</span>
                <span className="text-lg font-bold text-gray-900">
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}


