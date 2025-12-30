# Setup Verification Checklist for veenaclasses Bucket

## ✅ Step 1: Verify Environment Variables

Create or check `.env.local` in the `web` folder:

```bash
cd web
cat .env.local
```

Should contain:
```env
AWS_REGION=your-actual-region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET_NAME=veenaclasses
```

**Important:** Replace `your-actual-region` with the actual AWS region where your bucket is located (e.g., `us-east-1`, `ap-south-1`, `eu-north-1`).

## ✅ Step 2: Verify IAM Policy is Attached

1. Go to **AWS Console → IAM → Users**
2. Find your IAM user (the one with the access key you're using)
3. Click on the user → **Permissions** tab
4. Verify you see a policy that includes:
   - ✅ `s3:PutObject`
   - ✅ `s3:GetObject` ← **Critical for displaying images**
   - ✅ `s3:DeleteObject`
   - ✅ `kms:Decrypt`, `kms:GenerateDataKey`, `kms:DescribeKey`

## ✅ Step 3: Verify Bucket Exists and Region

1. Go to **AWS Console → S3**
2. Find bucket named **`veenaclasses`**
3. Click on it → **Properties** tab
4. Note the **AWS Region** (e.g., `us-east-1`, `ap-south-1`)
5. **Update `.env.local`** if `AWS_REGION` doesn't match

## ✅ Step 4: Check Bucket Permissions

1. Go to **S3 → veenaclasses → Permissions** tab
2. Check **Block public access settings**:
   - If you want public read access: Turn OFF "Block all public access"
   - If using signed URLs only: Can keep it ON

3. Check **Bucket policy** (if you have one):
   - Should allow your IAM user to GetObject
   - Or allow public GetObject if you want public access

## ✅ Step 5: Test Upload

1. Start your dev server:
   ```bash
   cd web
   npm run dev
   ```

2. Go to `/admin/store-items/new`
3. Try uploading an image
4. Check browser console (F12) for errors
5. Check if image appears in the preview grid

## ✅ Step 6: Test Signed URL API

Open browser console and run:

```javascript
// First, upload an image and copy its URL, then test:
const testImageUrl = "https://veenaclasses.s3.REGION.amazonaws.com/products/images/TIMESTAMP-RANDOM.jpg";

fetch(`/api/s3-signed-url?key=${encodeURIComponent(testImageUrl)}`)
  .then(r => r.json())
  .then(data => {
    console.log("✅ Signed URL Response:", data);
    if (data.error) {
      console.error("❌ Error:", data.error);
    } else {
      console.log("✅ Signed URL:", data.url);
      // Try opening this URL in a new tab
      window.open(data.url, '_blank');
    }
  })
  .catch(err => console.error("❌ Fetch Error:", err));
```

**Expected:**
- ✅ `{ url: "https://..." }` - Success!
- ❌ `{ error: "..." }` - Check the error message

## ✅ Step 7: Verify Images in S3

1. Go to **S3 → veenaclasses bucket**
2. Navigate to `products/images/` folder
3. Verify uploaded images exist
4. Try clicking on an image → **Open** button
5. If you get "Access Denied", you need:
   - Either: Bucket policy with public read access
   - Or: Signed URLs (which should work with your IAM policy)

## ✅ Step 8: Check CORS (If Getting CORS Errors)

1. Go to **S3 → veenaclasses → Permissions → CORS**
2. Add this configuration if not present:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

## Common Issues & Quick Fixes

### Issue: "Access Denied" when generating signed URL
**Check:**
- ✅ IAM user has `s3:GetObject` permission (your policy has it ✓)
- ✅ IAM user has KMS permissions (your policy has it ✓)
- ✅ Bucket name in `.env.local` is exactly `veenaclasses`
- ✅ Region in `.env.local` matches bucket region

### Issue: Images upload but don't display
**Check:**
- ✅ Browser console for errors
- ✅ Signed URL API is working (Step 6)
- ✅ IAM policy is actually attached to your IAM user
- ✅ Environment variables are loaded (restart dev server after changing `.env.local`)

### Issue: "Missing required field Principal"
**Solution:**
- This means you're trying to use an IAM user policy as a bucket policy
- IAM user policies don't need `Principal` field
- Attach the policy to your IAM user, NOT as a bucket policy

## Your Current Policy (Verified ✓)

Your policy looks correct:
- ✅ Has `s3:GetObject` (needed to read/display images)
- ✅ Has `s3:PutObject` (needed to upload)
- ✅ Has KMS permissions (needed for encrypted bucket)
- ✅ Covers the right folders: `products/*`, `categories/*`, `brands/*`

**Just make sure:**
1. This policy is **attached to your IAM user**
2. The IAM user's access key is in `.env.local`
3. The bucket name and region are correct in `.env.local`

## Quick Test Command

After setting up, test the entire flow:

```bash
# 1. Verify env vars are set
cd web
grep AWS .env.local

# 2. Start server
npm run dev

# 3. Open browser to http://localhost:3000/admin/store-items/new
# 4. Upload an image
# 5. Check browser console (F12) for any errors
# 6. Check if image preview appears
```

## Still Not Working?

1. **Check Server Logs:**
   - Look at terminal where `npm run dev` is running
   - Check for API errors

2. **Check Browser Network Tab:**
   - DevTools → Network tab
   - Try uploading/loading images
   - Look for failed requests
   - Check response status codes and error messages

3. **Verify IAM User:**
   - Go to IAM → Users → Your User
   - Check **Access keys** tab - make sure the key in `.env.local` matches
   - Check **Permissions** tab - verify policy is attached

4. **Test Direct S3 Access:**
   - Try accessing an image URL directly in browser
   - If it works: Signed URL generation might be the issue
   - If it fails: Bucket permissions or policy issue
