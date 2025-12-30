# 🔑 Razorpay Environment Variables Setup

## ⚠️ IMPORTANT: You MUST do this for Razorpay to work!

### Step 1: Create/Edit `.env.local` file

**Location:** `web/.env.local` (in the `web` directory)

**File Content (copy exactly):**
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_RxjZFKhR5qOUmu
RAZORPAY_KEY_SECRET=fEZla4zNot2f1447CYolNrql
RAZORPAY_KEY_ID=rzp_live_RxjZFKhR5qOUmu
```

### Step 2: Restart Your Dev Server

**CRITICAL:** After creating/editing `.env.local`, you MUST:

1. **Stop your Next.js dev server** (press `Ctrl+C` in the terminal)
2. **Start it again** with `npm run dev`

**Why?** Next.js only reads `.env.local` when the server starts. Changes won't take effect until you restart!

### Step 3: Verify It's Working

After restarting, try the checkout again. The error should be gone.

## ✅ Quick Checklist

- [ ] `.env.local` file exists in `web/` directory
- [ ] File contains all 3 environment variables with correct values
- [ ] No extra spaces or quotes around the values
- [ ] Dev server has been restarted after creating/editing the file
- [ ] No typos in the key values

## 🐛 Still Not Working?

If you still get the error after restarting:

1. Check the file is named exactly `.env.local` (not `.env.local.txt`)
2. Make sure there are no spaces before/after the `=` sign
3. Verify the keys are correct (no typos)
4. Check your terminal/console for any error messages when starting the server

