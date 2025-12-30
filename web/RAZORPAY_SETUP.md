# Razorpay Payment Integration - Setup Guide

## ✅ Integration Complete!

Razorpay payment system has been successfully integrated into your checkout page.

## 🔑 Environment Variables Setup - REQUIRED!

**CRITICAL:** You MUST create a `.env.local` file in the `web` directory with the following:

```env
# Razorpay Public Key (safe to expose in client-side code)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_RxjZFKhR5qOUmu

# Razorpay Private Key (NEVER expose - only used in server-side API routes)
RAZORPAY_KEY_SECRET=fEZla4zNot2f1447CYolNrql

# Also set without prefix for server-side (required)
RAZORPAY_KEY_ID=rzp_live_RxjZFKhR5qOUmu
```

**File location:** `web/.env.local` (create this file if it doesn't exist)

**After creating the file, you MUST restart your Next.js dev server!**

## 📝 Steps to Complete Setup

1. **Create `.env.local` file** in the `web` directory
2. **Add the environment variables** shown above
3. **Restart your Next.js dev server** after adding the variables

## 🚀 How It Works

1. User fills shipping details and clicks "Place Order"
2. System creates a Razorpay order via `/api/razorpay/create-order`
3. Razorpay payment modal opens
4. User completes payment
5. Payment is verified on server via `/api/razorpay/verify-payment`
6. Order is marked as "completed" in Firestore
7. Cart is cleared and user is redirected to orders page

## ✅ What's Included

- ✅ Razorpay package installed
- ✅ API routes for order creation and payment verification
- ✅ Checkout page integrated with Razorpay
- ✅ Server-side Razorpay initialization (no module errors)
- ✅ Payment verification with signature validation
- ✅ Order status updates in Firestore

## 🔒 Security Notes

- The `RAZORPAY_KEY_SECRET` is only used in server-side API routes
- Payment signatures are verified on the server before marking orders as complete
- Never commit `.env.local` to version control

## 🎯 Ready to Use

After setting up the environment variables and restarting your server, the payment system will be fully functional!

