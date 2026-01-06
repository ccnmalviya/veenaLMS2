import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: NextRequest) {
  try {
    const { courseId, amount, currency = "INR" } = await request.json();

    console.log("Creating order for course:", courseId, "Amount:", amount);

    if (!courseId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: courseId or amount" },
        { status: 400 }
      );
    }

    // Check if Razorpay credentials are available
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    console.log("Razorpay Key ID available:", !!keyId);
    console.log("Razorpay Key Secret available:", !!keySecret);

    if (!keyId || !keySecret) {
      console.error("Missing Razorpay credentials");
      return NextResponse.json(
        { error: "Razorpay credentials not configured. Please contact support." },
        { status: 500 }
      );
    }

    // Create Razorpay instance
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: `course_${courseId}_${Date.now()}`,
      notes: {
        courseId,
        type: "course_enrollment",
      },
    });

    console.log("Order created successfully:", order.id);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    console.error("Error details:", {
      message: error.message,
      description: error.description,
      statusCode: error.statusCode,
    });
    return NextResponse.json(
      { 
        error: error.description || error.message || "Failed to create order",
        details: error.message 
      },
      { status: 500 }
    );
  }
}

