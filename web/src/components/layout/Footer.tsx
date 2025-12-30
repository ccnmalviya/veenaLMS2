"use client";

import Link from "next/link";

// Common footer for landing + classes + rest of site
export function Footer() {
  // TODO: Make links and content manageable by super admin via CMS collections
  return (
    <footer className="bg-gray-950 text-gray-400 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-800">
          <div>
            <h3 className="text-white font-semibold mb-3">Veena LMS</h3>
            <p className="text-sm">
              Unified platform to sell courses, live classes, workshops, and
              products with a single cart and dashboard.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/classes" className="hover:text-white">
                  Classes
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">
              Support & Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/support" className="hover:text-white">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Contact</h4>
            <p className="text-sm">Email: hello@example.com</p>
            <p className="text-sm mt-1">Phone: +91-00000-00000</p>
            <p className="text-xs text-gray-500 mt-4">
              Content, pricing, and availability managed by super admin.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} Veena LMS. All rights reserved.</span>
          <span>Built on Next.js, Firebase, and AWS S3.</span>
        </div>
      </div>
    </footer>
  );
}





