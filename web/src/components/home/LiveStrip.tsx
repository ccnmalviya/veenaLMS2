"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

// Live classes strip similar to the shoe layout "Live Classes starting at..."
export function LiveStrip() {
  const [nextSession, setNextSession] = useState<{
    date: string;
    title?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNextSession();
  }, []);

  const loadNextSession = async () => {
    try {
      setLoading(true);
      // Fetch all store_items and find the next upcoming live class or workshop
      const snapshot = await getDocs(collection(db, "store_items"));
      let earliestSession: any = null;
      let earliestDate = Infinity;

      snapshot.forEach((doc) => {
        const data = doc.data();
        const itemType = data.type || data.itemType;
        
        // Only include active live classes and workshops with dates
        if ((itemType === "live_class" || itemType === "workshop") && data.status === "active" && data.date) {
          let dateValue = 0;
          
          if (data.date.toMillis) {
            dateValue = data.date.toMillis();
          } else if (data.date.seconds) {
            dateValue = data.date.seconds * 1000;
          } else if (typeof data.date === "string") {
            dateValue = new Date(data.date).getTime();
          }

          // Only consider future dates
          if (dateValue > Date.now() && dateValue < earliestDate) {
            earliestDate = dateValue;
            earliestSession = {
              date: data.date,
              title: data.title || data.name,
            };
          }
        }
      });

      if (earliestSession) {
        const dateObj = earliestSession.date.toDate 
          ? earliestSession.date.toDate() 
          : earliestSession.date.seconds 
          ? new Date(earliestSession.date.seconds * 1000)
          : new Date(earliestSession.date);
        
        setNextSession({
          date: dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          title: earliestSession.title,
        });
      } else {
        // Fallback to default if no upcoming sessions
        setNextSession({
          date: "Coming Soon",
        });
      }
    } catch (error) {
      console.error("Error loading next session:", error);
      setNextSession({
        date: "Coming Soon",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4">
        <div className="mt-4 rounded-2xl overflow-hidden relative h-40 bg-gray-900 text-white flex items-center px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-gray-300 mb-1">
              Live Classes starting at
            </p>
            <p className="text-sm font-semibold">
              {loading ? "Loading..." : nextSession?.date || "Coming Soon"}
            </p>
            {nextSession?.title && (
              <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                {nextSession.title}
              </p>
            )}
          </div>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-xs text-gray-300 hidden md:inline">
              Join interactive live batches each week
            </span>
            <Link
              href="/classes"
              className="px-5 py-2 rounded-full bg-white text-xs font-semibold text-gray-900 hover:bg-gray-100"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}





