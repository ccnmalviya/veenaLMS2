# Image Display Troubleshooting Guide

If images are not showing after uploading, follow these steps:

## Step 1: Check Browser Console

1. Open your browser's Developer Tools (F12 or Cmd+Option+I)
2. Go to the **Console** tab
3. Look for errors related to:
   - `S3Image: Error getting signed URL`
   - `Failed to get signed URL`
   - `Access Denied`
   - `CORS error`

## Step 2: Verify IAM Permissions

Your IAM user needs **both** upload AND read permissions:

### Required Permissions:
- ✅ `s3:PutObject` - To upload images
- ✅ `s3:GetObject` - **To read/display images** (This is critical!)
- ✅ `s3:DeleteObject` - To delete images
- ✅ `kms:Decrypt` - To decrypt KMS-encrypted objects
- ✅ `kms:GenerateDataKey` - For KMS encryption

### Check Your Policy:

1. Go to **IAM → Users → Your User → Permissions**
2. Verify your policy includes `s3:GetObject`:

```json
{
  "Effect": "Allow",
  "Action": [
    "s3:PutObject",
    "s3:GetObject",  // ← This must be present!
    "s3:DeleteObject"
  ],
  "Resource": [
    "arn:aws:s3:::veenaclasses/products/*",
    "arn:aws:s3:::veenaclasses/categories/*",
    "arn:aws:s3:::veenaclasses/brands/*"
  ]
}
```

## Step 3: Test Signed URL API

1. Open browser console
2. Run this test:

```javascript
// Replace with an actual image URL from your upload
const testUrl = "https://veenaclasses.s3.region.amazonaws.com/products/images/123456-abc.jpg";

fetch(`/api/s3-signed-url?key=${encodeURIComponent(testUrl)}`)
  .then(r => r.json())
  .then(data => {
    console.log("Signed URL:", data);
    if (data.error) {
      console.error("Error:", data.error);
    }
  })
  .catch(err => console.error("Fetch error:", err));
```

**Expected Result:**
- ✅ Success: `{ url: "https://..." }` - Signed URL generated
- ❌ Error: Check the error message

## Step 4: Check Bucket Policy (If Using)

If you're using a bucket policy, ensure it allows `s3:GetObject`:

```json
{
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::YOUR_ACCOUNT_ID:user/YOUR_IAM_USERNAME"
  },
  "Action": [
    "s3:GetObject",  // ← Must be present for reading
    "s3:PutObject"
  ],
  "Resource": "arn:aws:s3:::veenaclasses/*"
}
```

## Step 5: Verify Image Upload Success

1. Check if images are actually uploaded:
   - Go to **S3 Console → veenaclasses bucket**
   - Navigate to `products/images/` folder
   - Verify files exist

2. Check the upload response:
   - Open browser console
   - Look for upload success messages
   - Verify the URL returned from upload API

## Step 6: Test Direct Image Access

Try accessing the image directly in a new browser tab:

```
https://veenaclasses.s3.region.amazonaws.com/products/images/FILENAME.jpg
```

**Results:**
- ✅ Image loads: Bucket has public read access OR signed URLs work
- ❌ Access Denied: Need signed URLs (which should work if IAM has GetObject)
- ❌ 404 Not Found: Image wasn't uploaded successfully

## Step 7: Common Issues & Solutions

### Issue: "Access Denied" when generating signed URL
**Solution:**
- Verify IAM user has `s3:GetObject` permission
- Check KMS permissions if using encryption
- Ensure bucket name and region are correct in `.env.local`

### Issue: Images upload but don't display
**Solution:**
- Check browser console for errors
- Verify signed URL API is working (Step 3)
- Ensure IAM policy includes `s3:GetObject`

### Issue: CORS errors
**Solution:**
- Add CORS configuration to S3 bucket:
  1. Go to S3 → Your Bucket → Permissions → CORS
  2. Add:
  ```json
  [
    {
      "AllowedHeaders": ["*"],
      "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
      "AllowedOrigins": ["*"],
      "ExposeHeaders": []
    }
  ]
  ```

### Issue: Images show briefly then disappear
**Solution:**
- Signed URLs expire after 1 hour
- The component should regenerate them automatically
- Check if there's a JavaScript error preventing regeneration

## Step 8: Enable Debug Mode

The code now includes console logging. Check your browser console for:
- `S3Image: Getting signed URL for: ...`
- `S3Image: Got signed URL: ...`
- `S3Image: Error getting signed URL: ...`
- `S3Image: Image failed to load`

These logs will help identify where the issue occurs.

## Quick Checklist

- [ ] IAM user has `s3:GetObject` permission
- [ ] IAM user has KMS permissions (if using encryption)
- [ ] Images are successfully uploaded to S3
- [ ] Signed URL API returns a valid URL (test in Step 3)
- [ ] Browser console shows no errors
- [ ] CORS is configured (if needed)
- [ ] Bucket name and region are correct in `.env.local`

## Still Not Working?

1. **Check Server Logs:**
   - Look at your Next.js server console
   - Check for API route errors (`/api/s3-signed-url`)

2. **Verify Environment Variables:**
   ```bash
   AWS_REGION=your-region
   AWS_ACCESS_KEY_ID=your-key
   AWS_SECRET_ACCESS_KEY=your-secret
   AWS_S3_BUCKET_NAME=veenaclasses
   ```

3. **Test with a Simple Image:**
   - Upload a small test image
   - Check if it appears in S3 console
   - Try accessing it directly via URL

4. **Check Network Tab:**
   - Open DevTools → Network tab
   - Try loading the page
   - Look for failed requests to `/api/s3-signed-url`
   - Check the response status and error messages
