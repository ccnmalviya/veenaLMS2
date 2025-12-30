"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";

export default function AnalyticsPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      if (!userData || (userData.role !== "super_admin" && userData.role !== "admin")) {
        router.push("/dashboard");
        return;
      }
      // Redirect to main dashboard (analytics are now integrated there)
      router.push("/admin");
    });
    return () => unsubscribe();
  }, [router]);

  return null;
}
