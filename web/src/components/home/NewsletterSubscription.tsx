"use client";

import { useState } from "react";

// Email opt-in, WhatsApp opt-in (Stored in subscriptions collection)
export function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save to Firestore subscriptions collection
    console.log("Subscribe:", { email, phone });
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border border-gray-800/60 bg-gray-900/70 px-5 py-6 md:px-8 md:py-7 shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left: compact copy */}
          <div className="max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-300 mb-1">
              Stay updated
            </p>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Get new courses & offers in your inbox.
            </h2>
            <p className="mt-1 text-xs md:text-sm text-gray-300/90">
              Join the list for launch alerts, live class reminders, and member-only discounts.
            </p>
          </div>

          {/* Right: slimmer form */}
          <form
            onSubmit={handleSubmit}
            className="mt-3 md:mt-0 w-full md:w-auto flex flex-col gap-2"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full md:w-56 rounded-full border border-gray-700 bg-gray-800 px-3 py-2 text-xs md:text-sm text-white placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400/70"
                required
              />
              <div className="flex gap-2">
                <span className="hidden md:inline-flex items-center rounded-full border border-gray-700 bg-gray-800 px-3 text-xs text-gray-400">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="WhatsApp (optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full md:w-40 rounded-full border border-gray-700 bg-gray-800 px-3 py-2 text-xs md:text-sm text-white placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400/70"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-blue-500 px-4 py-2 text-xs md:text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-300"
              >
                {subscribed ? "✓ Subscribed" : "Subscribe"}
              </button>
              <p className="text-[10px] text-gray-400">
                No spam. Unsubscribe with one click.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}




