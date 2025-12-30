"use client";

import Link from "next/link";

// Rule: Match user city / pincode / radius (Displayed: Nearby workshops, Local stock products)
export function LocationBasedProducts() {
  // TODO: Query Firestore: store_items where location matches user's city/pincode
  // For workshops and products with location data
  const items = [
    {
      id: "13",
      title: "Weekend Photography Workshop",
      type: "workshop",
      location: "Mumbai, Maharashtra",
      price: 2999,
    },
    {
      id: "14",
      title: "Arduino Workshop - Delhi",
      type: "workshop",
      location: "Delhi, NCR",
      price: 1999,
    },
    {
      id: "15",
      title: "Local Electronics Kit",
      type: "product",
      location: "Available in your city",
      price: 1499,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/item/${item.id}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4">
            <span className="text-xs text-blue-600 font-semibold uppercase">📍 {item.type}</span>
            <h3 className="font-semibold text-lg mt-2">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{item.location}</p>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">₹{item.price}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}




