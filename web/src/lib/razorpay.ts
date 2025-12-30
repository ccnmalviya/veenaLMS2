// Server-side Razorpay initialization
// This file is only used in API routes (server-side)

let razorpayInstance: any = null;

export function getRazorpayInstance() {
  if (!razorpayInstance) {
    // Use dynamic require for CommonJS module (works in Next.js API routes)
    const Razorpay = require("razorpay");
    
    // Try to get keys from environment variables
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    
    // Validate keys are present
    if (!keyId || keyId.trim() === "") {
      console.error("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
      console.error("NEXT_PUBLIC_RAZORPAY_KEY_ID:", process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
      throw new Error("Razorpay key_id is missing. Please set RAZORPAY_KEY_ID or NEXT_PUBLIC_RAZORPAY_KEY_ID in .env.local file.");
    }
    
    if (!keySecret || keySecret.trim() === "") {
      console.error("RAZORPAY_KEY_SECRET is missing");
      throw new Error("Razorpay key_secret is missing. Please set RAZORPAY_KEY_SECRET in .env.local file.");
    }
    
    razorpayInstance = new Razorpay({
      key_id: keyId.trim(),
      key_secret: keySecret.trim(),
    });
  }
  return razorpayInstance;
}

