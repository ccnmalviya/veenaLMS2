import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin (only if not already initialized)
if (!getApps().length) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  } catch (error) {
    console.error("Error initializing Firebase Admin:", error);
  }
}

const adminDb = getFirestore();

export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
      userId,
      amount,
    } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courseId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 400 }
      );
    }

    // Payment verified! Create enrollment
    const enrollmentId = `${userId}_${courseId}`;
    const enrollmentData = {
      userId,
      courseId,
      enrolledAt: serverTimestamp(),
      status: "active",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amount,
      accessExpiresAt: null, // Lifetime access by default
      deviceCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await adminDb.collection("enrollments").doc(enrollmentId).set(enrollmentData);

    // Also create payment record
    const paymentData = {
      userId,
      courseId,
      amount,
      currency: "INR",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature,
      status: "completed",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await adminDb.collection("payments").add(paymentData);

    return NextResponse.json({
      success: true,
      enrollmentId,
      message: "Payment verified and enrollment created",
    });
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: error.message || "Failed to verify payment" },
      { status: 500 }
    );
  }
}

