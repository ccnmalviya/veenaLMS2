"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

type Session = {
  id: string;
  title: string;
  type: "live_class" | "workshop";
  price: number;
  discountPrice?: number;
  status: string;
  date?: any;
  startTime?: string;
  endTime?: string;
  location?: string;
  meetingUrl?: string;
  city?: string;
};

export function UpcomingSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setLoading(true);
      // Fetch all store_items and filter for live_class and workshop
      const snapshot = await getDocs(collection(db, "store_items"));
      const sessionsData: Session[] = [];

      const now = Date.now();

      snapshot.forEach((doc) => {
        const data = doc.data();
        const itemType = data.type || data.itemType;
        
        // Only include active live classes and workshops
        if ((itemType === "live_class" || itemType === "workshop") && data.status === "active") {
          // Parse the date to check if it's in the future
          let dateValue = 0;
          const dateField = data.date || data.scheduled_date;
          
          if (dateField) {
            if (dateField.toMillis) {
              dateValue = dateField.toMillis();
            } else if (dateField.seconds) {
              dateValue = dateField.seconds * 1000;
            } else if (typeof dateField === "string") {
              dateValue = new Date(dateField).getTime();
            }
          }

          // Only include sessions with future dates (or no date, which we'll show as "Date TBD")
          // If date is 0 (no date), we'll still include it but sort it to the end
          if (dateValue === 0 || dateValue >= now) {
            sessionsData.push({
              id: doc.id,
              title: data.title || data.name || "Untitled",
              type: itemType as "live_class" | "workshop",
              price: data.price || data.basePrice || 0,
              discountPrice: data.discountPrice || data.discount_price || data.compareAtPrice,
              status: data.status || "active",
              date: dateField,
              startTime: data.startTime || data.start_time,
              endTime: data.endTime || data.end_time,
              location: data.location,
              meetingUrl: data.meetingUrl || data.meeting_url || data.zoom_meeting_id,
              city: data.city,
            });
          }
        }
      });

      // Sort by date (upcoming first) - handle both Timestamp and string dates
      sessionsData.sort((a, b) => {
        let dateA = 0;
        let dateB = 0;

        if (a.date) {
          if (a.date.toMillis) {
            dateA = a.date.toMillis();
          } else if (a.date.seconds) {
            dateA = a.date.seconds * 1000;
          } else if (typeof a.date === "string") {
            dateA = new Date(a.date).getTime();
          }
        }

        if (b.date) {
          if (b.date.toMillis) {
            dateB = b.date.toMillis();
          } else if (b.date.seconds) {
            dateB = b.date.seconds * 1000;
          } else if (typeof b.date === "string") {
            dateB = new Date(b.date).getTime();
          }
        }

        // If no date, put at end (but still show them)
        if (!dateA) dateA = Infinity;
        if (!dateB) dateB = Infinity;

        return dateA - dateB; // Ascending (earliest upcoming first)
      });

      // Limit to 6 upcoming sessions (the 6 most upcoming)
      setSessions(sessionsData.slice(0, 6));
    } catch (error) {
      console.error("Error loading sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: any) => {
    if (!date) return "Date TBD";
    try {
      let dateObj: Date;
      if (date.toDate) {
        dateObj = date.toDate();
      } else if (date.seconds) {
        dateObj = new Date(date.seconds * 1000);
      } else if (typeof date === "string") {
        dateObj = new Date(date);
      } else {
        return "Date TBD";
      }
      return dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Date TBD";
    }
  };

  const formatTime = (time?: string) => {
    if (!time) return "";
    // Handle formats like "7:00 PM" or "19:00"
    return time;
  };

  const getLocationText = (session: Session) => {
    if (session.type === "workshop") {
      if (session.location && session.city) {
        return `${session.location}, ${session.city}`;
      } else if (session.location) {
        return session.location;
      } else if (session.city) {
        return session.city;
      }
      return "Location TBD";
    } else {
      // Live class
      if (session.meetingUrl) {
        return "Zoom";
      }
      return "Online";
    }
  };

  if (loading) {
    return (
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2">
            Upcoming Live Classes & Workshops
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Join high-impact live sessions and on-ground workshops.
          </p>
          <div className="text-center py-12 text-gray-500">Loading sessions...</div>
        </div>
      </section>
    );
  }

  if (sessions.length === 0) {
    return (
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2">
            Upcoming Live Classes & Workshops
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Join high-impact live sessions and on-ground workshops.
          </p>
          <div className="text-center py-12 text-gray-500">
            No upcoming sessions at the moment.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">
          Upcoming Live Classes & Workshops
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Join high-impact live sessions and on-ground workshops.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sessions.map((session) => {
            const dateStr = formatDate(session.date);
            const timeStr = formatTime(session.startTime);
            const locationStr = getLocationText(session);
            const displayDate = timeStr ? `${dateStr} · ${timeStr}` : dateStr;

            return (
              <div
                key={session.id}
                className="bg-white rounded-xl border border-blue-100 p-5 shadow-sm"
              >
                <p className="text-xs font-semibold text-blue-600 uppercase">
                  {session.type === "workshop" ? "Workshop" : "Live Class"}
                </p>
                <h3 className="font-semibold text-lg mt-1 line-clamp-2">
                  {session.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {displayDate} {locationStr !== "Online" && locationStr !== "Zoom" ? `· ${locationStr}` : locationStr ? `· ${locationStr}` : ""}
                </p>
                <Link
                  href={`/item/${session.id}`}
                  className="mt-4 inline-block px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  View details
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

