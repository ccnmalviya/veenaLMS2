"use client";

import Link from "next/link";

// Query: type == "bundle" AND status == "active"
export function ProductBundles() {
  // TODO: Query Firestore: store_items where type == "bundle" AND status == "active"
  const bundles = [
    {
      id: "1",
      title: "Web Dev Complete Bundle",
      items: ["Course", "Live Class", "Certificate"],
      price: 4999,
      discountPrice: 3499,
    },
    {
      id: "2",
      title: "Photography Workshop + Kit",
      items: ["Workshop", "Camera Kit", "Guide"],
      price: 8999,
      discountPrice: 6999,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {bundles.map((bundle) => (
        <Link
          key={bundle.id}
          href={`/bundle/${bundle.id}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border-2 border-blue-200"
        >
          <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-400"></div>
          <div className="p-6">
            <span className="text-xs text-blue-600 font-semibold uppercase">Bundle</span>
            <h3 className="font-bold text-xl mt-2">{bundle.title}</h3>
            <ul className="mt-3 space-y-1">
              {bundle.items.map((item, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="text-green-500">✓</span> {item}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-gray-500 line-through">₹{bundle.price}</span>
              <span className="text-2xl font-bold text-blue-600">₹{bundle.discountPrice}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}




