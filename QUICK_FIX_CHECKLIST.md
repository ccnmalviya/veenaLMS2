# Quick Fix Checklist for veenaclasses Bucket

## ✅ Your Configuration

- **Bucket Name:** `veenaclasses`
- **IAM Policy:** ✅ Correct (has GetObject, PutObject, KMS permissions)
- **Folders:** `products/*`, `categories/*`, `brands/*`

## 🔍 Immediate Checks (Do These First)

### 1. Environment Variables

Check `web/.env.local` exists and has:

```env
AWS_REGION=your-bucket-region
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_S3_BUCKET_NAME=veenaclasses
```

**⚠️ Important:** 
- Replace `your-bucket-region` with actual region (check in S3 console)
- Bucket name must be exactly `veenaclasses` (case-sensitive)

### 2. Verify IAM Policy is Attached

1. AWS Console → IAM → Users → Your User
2. Permissions tab
3. Verify your policy is listed (the one with GetObject, PutObject, KMS)

**If not attached:**
- Click "Add permissions" → "Create inline policy"
- JSON tab → Paste your policy
- Save

### 3. Restart Dev Server

After changing `.env.local`:
```bash
cd web
# Stop server (Ctrl+C)
npm run dev
```

### 4. Test in Browser Console

Open browser console (F12) and check for errors when:
- Uploading an image
- Viewing uploaded images

Look for:
- `S3Image: Error getting signed URL`
- `Access Denied`
- `Failed to get signed URL`

## 🐛 Common Issues

### Images Upload But Don't Show

**Check:**
1. Browser console for errors
2. Network tab → Look for `/api/s3-signed-url` requests
3. Check response - if 403, it's a permission issue

**Fix:**
- Verify IAM policy has `s3:GetObject` ✅ (yours does)
- Verify policy is attached to IAM user
- Check bucket region matches `AWS_REGION` in `.env.local`

### "Access Denied" Error

**Possible causes:**
1. IAM policy not attached → Attach it
2. Wrong bucket name → Check `.env.local` has `veenaclasses`
3. Wrong region → Check bucket region matches `AWS_REGION`
4. KMS key issue → Verify KMS permissions in policy ✅ (yours has it)

### Images Don't Upload

**Check:**
1. Upload API response in Network tab
2. Server console for errors
3. Verify `s3:PutObject` permission ✅ (yours has it)

## 🧪 Quick Test

1. **Upload Test:**
   - Go to `/admin/store-items/new`
   - Upload an image
   - Check if URL appears in formData.images array
   - Check browser console for errors

2. **Display Test:**
   - After upload, check if image preview appears
   - Open browser console
   - Look for `S3Image: Got signed URL` or errors

3. **API Test:**
   - Copy an uploaded image URL
   - In browser console, run:
   ```javascript
   fetch(`/api/s3-signed-url?key=${encodeURIComponent('YOUR_IMAGE_URL')}`)
     .then(r => r.json())
     .then(console.log)
   ```

## 📋 Your Policy (Verified ✅)

Your IAM policy is correct:
- ✅ `s3:GetObject` - For reading/displaying images
- ✅ `s3:PutObject` - For uploading images  
- ✅ `s3:DeleteObject` - For deleting images
- ✅ KMS permissions - For encrypted bucket
- ✅ Correct folders: `products/*`, `categories/*`, `brands/*`

**Just ensure:**
1. ✅ Policy is attached to your IAM user
2. ✅ IAM user's access key is in `.env.local`
3. ✅ Bucket name in `.env.local` is `veenaclasses`
4. ✅ Region in `.env.local` matches bucket region

## 🚀 Next Steps

1. **Verify Setup:** Follow `VERIFY_SETUP.md`
2. **Check Console:** Look for specific error messages
3. **Test API:** Use the browser console test above
4. **Check S3:** Verify images exist in `veenaclasses/products/images/`

## 📞 Still Not Working?

Share:
1. Browser console errors (screenshot or copy text)
2. Server console errors (from terminal)
3. Network tab response for `/api/s3-signed-url` (if any)
4. Confirmation that:
   - ✅ Policy is attached to IAM user
   - ✅ `.env.local` has correct values
   - ✅ Dev server was restarted after env changes
