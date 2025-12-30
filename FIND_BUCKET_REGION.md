# How to Find Your S3 Bucket Region

## Quick Steps:

1. **Go to AWS S3 Console**: https://console.aws.amazon.com/s3

2. **Find Your Bucket**: Look for `veenaclasses` in the bucket list

3. **Click on the Bucket Name**: Click `veenaclasses`

4. **Check Properties Tab**: 
   - Click on **"Properties"** tab
   - Scroll down to **"AWS Region"** or **"Bucket location"**
   - Note the region (e.g., `ap-south-1`, `us-west-2`, `eu-west-1`, etc.)

5. **Update .env.local**:
   - Open `/Users/chandanmalviya/Documents/LMS+Ecommerce/web/.env.local`
   - Find: `AWS_REGION=us-east-1`
   - Change to your actual region, for example:
     - `AWS_REGION=ap-south-1` (if bucket is in Mumbai)
     - `AWS_REGION=us-west-2` (if bucket is in Oregon)
     - `AWS_REGION=eu-west-1` (if bucket is in Ireland)
     - etc.

6. **Restart Dev Server**:
   ```bash
   cd /Users/chandanmalviya/Documents/LMS+Ecommerce/web
   npm run dev
   ```

## Common AWS Regions:

- `us-east-1` - US East (N. Virginia)
- `us-west-2` - US West (Oregon)
- `ap-south-1` - Asia Pacific (Mumbai) - **Most common for India**
- `ap-southeast-1` - Asia Pacific (Singapore)
- `eu-west-1` - Europe (Ireland)

## Alternative: Check via AWS CLI (if installed)

```bash
aws s3api get-bucket-location --bucket veenaclasses
```

This will return the region code.



