import { NextRequest, NextResponse } from "next/server";
import { getRazorpayInstance } from "@/lib/razorpay";

export async function POST(request: NextRequest) {
  try {
    // Check if Razorpay keys are configured
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    
    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay keys not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in environment variables." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { amount, currency = "INR", receipt, notes } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const razorpay = getRazorpayInstance();

    // Create Razorpay order
    const options = {
      amount: Math.round(amount * 100), // Convert to paise (smallest currency unit)
      currency: currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {},
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    });
  } catch (error: any) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}

