# AWS Permissions Check Guide

## Understanding IAM User Policies vs Bucket Policies

**IMPORTANT:** There are two types of policies, and they're used in different places:

1. **IAM User Policy (Identity-based)** - Attached to your IAM user
   - ❌ Does NOT have a `Principal` field
   - ✅ Attach in: IAM → Users → Your User → Permissions
   - Use this for: Granting permissions to your IAM user to upload files

2. **Bucket Policy (Resource-based)** - Attached to your S3 bucket
   - ✅ MUST have a `Principal` field
   - ✅ Attach in: S3 → Your Bucket → Permissions → Bucket Policy
   - Use this for: Public read access or cross-account access

**If you get "Missing required field Principal" error:**
- You're trying to use an IAM user policy as a bucket policy
- Solution: Use the IAM user policy in IAM console, or add `Principal` field if using as bucket policy

---

## Step 1: Check IAM User Permissions

### 1.1 Go to IAM Console
1. Open AWS Console: https://console.aws.amazon.com
2. Search for "IAM" in the top search bar
3. Click on "IAM" service

### 1.2 Find Your User
1. In the left sidebar, click **"Users"**
2. Find the user with Access Key ID: `AKIA6LZRWRSK7CTBG5EJ`
3. Click on that user's name

### 1.3 Check Permissions
1. Click on the **"Permissions"** tab
2. You'll see:
   - **Permissions policies** (attached directly)
   - **Permissions boundaries** (if any)
   - **Inline policies** (if any)

### 1.4 What to Look For
Your user needs a policy that allows `s3:PutObject`. Look for policies like:
- `AmazonS3FullAccess` (too broad, but works)
- `AmazonS3ReadWriteAccess` (works)
- Custom policy with `s3:PutObject` permission

### 1.5 If No Permission Found - Add It
1. Click **"Add permissions"** button
2. Select **"Attach policies directly"**
3. Search for "S3" and select:
   - **AmazonS3FullAccess** (easiest, but gives full access)
   OR
   - Create a custom policy (recommended - see below)

### 1.6 Create Custom Policy (Recommended)
1. Go to **IAM → Policies → Create policy**
2. Click **"JSON"** tab
3. Paste this (replace `YOUR_BUCKET_NAME` with your actual bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket"
      ],
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME"
    }
  ]
}
```

4. Click **"Next"**
5. Name it: `S3UploadAccess`
6. Click **"Create policy"**
7. Go back to your user → Permissions → Add permissions → Attach the new policy

### 1.7 Folder-Specific Permissions (If Access Denied for Specific Folders)

If you're getting "Access Denied" errors for specific folders like `products/images`, `products/videos`, `categories/images`, `brands/logos`, `hero-banners`, `courses/thumbnails`, or `courses/lessons/*`, you may need folder-specific permissions:

1. Go to **IAM → Policies → Create policy**
2. Click **"JSON"** tab
3. Paste this (replace `YOUR_BUCKET_NAME` with your actual bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR_BUCKET_NAME/products/*",
        "arn:aws:s3:::YOUR_BUCKET_NAME/categories/*",
        "arn:aws:s3:::YOUR_BUCKET_NAME/brands/*",
        "arn:aws:s3:::YOUR_BUCKET_NAME/courses/thumbnails/*",
        "arn:aws:s3:::YOUR_BUCKET_NAME/courses/lessons/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket"
      ],
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME",
      "Condition": {
        "StringLike": {
          "s3:prefix": [
            "products/*",
            "categories/*",
            "brands/*",
            "hero-banners/*",
            "courses/thumbnails/*",
            "courses/lessons/*"
          ]
        }
      }
    },
    {
      "Effect": "Allow",
      "Action": [
        "kms:Decrypt",
        "kms:GenerateDataKey",
        "kms:DescribeKey"
      ],
      "Resource": "*"
    }
  ]
}
```

**Note:** The `/*` at the end of the Resource ARN allows access to all files within those folders. If you need access to all folders, use `arn:aws:s3:::YOUR_BUCKET_NAME/*` instead.

**Important:** This is an **IAM User Policy** (identity-based policy). It should be attached to your IAM user, NOT used as a bucket policy. If you get an error "Missing required field Principal", you're trying to use it as a bucket policy - use the IAM user policy version instead.

---

## Step 2: Check S3 Bucket Permissions

### 2.1 Go to S3 Console
1. In AWS Console, search for "S3"
2. Click on **"S3"** service

### 2.2 Find Your Bucket
1. Find your bucket in the list
2. Click on the bucket name

### 2.3 Check Permissions Tab
1. Click on the **"Permissions"** tab
2. Check three sections:

#### A. Block Public Access Settings
- If **"Block all public access"** is ON, you need to:
  - Click **"Edit"**
  - Uncheck **"Block all public access"** (or at least uncheck "Block public access to buckets and objects granted through new access control lists (ACLs)")
  - Click **"Save changes"**
  - Type "confirm" and click **"Confirm"**

#### B. Bucket Policy
- Click **"Edit"** on Bucket policy
- **IMPORTANT:** Bucket policies require a `Principal` field. If you get "Missing required field Principal" error, make sure you're using a bucket policy (not an IAM user policy).

**Option 1: Public Read Access Only** (if you only need public read access):
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    }
  ]
}
```

**Option 2: IAM User Upload + Public Read** (if you need your IAM user to upload):
Replace `YOUR_ACCOUNT_ID` and `YOUR_IAM_USERNAME` with your actual values:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowPublicReadAccess",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": [
        "arn:aws:s3:::YOUR_BUCKET_NAME/products/*",
        "arn:aws:s3:::YOUR_BUCKET_NAME/categories/*",
        "arn:aws:s3:::YOUR_BUCKET_NAME/brands/*",
        "arn:aws:s3:::YOUR_BUCKET_NAME/courses/thumbnails/*"
      ]
    },
    {
      "Sid": "AllowIAMUserUpload",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::YOUR_ACCOUNT_ID:user/YOUR_IAM_USERNAME"
      },
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR_BUCKET_NAME/products/*",
        "arn:aws:s3:::YOUR_BUCKET_NAME/categories/*",
        "arn:aws:s3:::YOUR_BUCKET_NAME/brands/*",
        "arn:aws:s3:::YOUR_BUCKET_NAME/courses/thumbnails/*",
        "arn:aws:s3:::YOUR_BUCKET_NAME/courses/lessons/*"
      ]
    }
  ]
}
```

**To find your Account ID and IAM Username:**
- Account ID: Top right corner of AWS Console (12-digit number)
- IAM Username: IAM → Users → Your username

- Click **"Save changes"**

#### C. Access Control List (ACL)
- Usually not needed if bucket policy is set
- Can leave as default

---

## Step 3: Verify Your Bucket Name

### 3.1 Get Exact Bucket Name
1. In S3 console, look at the bucket list
2. Copy the **exact** bucket name (case-sensitive)
3. Update your `.env.local` file:

```bash
AWS_S3_BUCKET_NAME=exact-bucket-name-here
```

### 3.2 Check Bucket Region
1. Click on your bucket
2. Look at the **"Properties"** tab
3. Find **"AWS Region"** (e.g., `us-east-1`, `ap-south-1`)
4. Update your `.env.local`:

```bash
AWS_REGION=us-east-1  # or whatever region your bucket is in
```

---

## Step 4: Test the Setup

### 4.1 Restart Dev Server
After updating `.env.local`:
```bash
cd /Users/chandanmalviya/Documents/LMS+Ecommerce/web
npm run dev
```

### 4.2 Try Upload Again
1. Go to `/admin/store-items/new`
2. Try uploading an image
3. Check the terminal/console for detailed error messages

---

## Common Issues & Solutions

### Issue: "Access Denied"
**Solution:**
- Check IAM user has `s3:PutObject` permission
- Check bucket name is correct in `.env.local`
- Check region matches bucket region

### Issue: "NoSuchBucket"
**Solution:**
- Bucket name is wrong in `.env.local`
- Bucket doesn't exist
- Check bucket name spelling (case-sensitive)

### Issue: "InvalidAccessKeyId"
**Solution:**
- AWS credentials are wrong
- Check `.env.local` has correct `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`

### Issue: Files upload but can't view
**Solution:**
- Add bucket policy for public read (see Step 2.3.B)
- Or use CloudFront CDN for better performance

---

## Quick Checklist

- [ ] IAM user has `s3:PutObject` permission
- [ ] Bucket name in `.env.local` matches actual bucket name
- [ ] Region in `.env.local` matches bucket region
- [ ] Bucket policy allows public read (if needed)
- [ ] Block public access is configured correctly
- [ ] Dev server restarted after `.env.local` changes




