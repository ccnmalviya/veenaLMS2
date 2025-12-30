"use client";

// Auto shows: New launches, Upcoming live classes, Limited offers
export function NotificationStrip() {
  // TODO: Query Firestore for active notifications
  const notifications = [
    { id: "1", text: "🎉 New Course Launch: Advanced Photography", type: "new_launch" },
    { id: "2", text: "📅 Live Class Tomorrow: Digital Marketing Basics", type: "live_class" },
    { id: "3", text: "⚡ Limited Offer: 50% off on all workshops this week!", type: "offer" },
  ];

  return (
    <div className="bg-blue-600 text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 overflow-x-auto">
          {notifications.map((notif) => (
            <span key={notif.id} className="text-sm whitespace-nowrap">
              {notif.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}




