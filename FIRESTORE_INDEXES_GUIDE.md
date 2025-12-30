# Firestore Indexes Guide

This guide helps you create the required Firestore composite indexes for your application.

## Quick Fix

When you see an index error, **click the link in the error message** - it will automatically create the index for you!

## Required Indexes

### 1. Categories Index (Currently Needed)

**Collection:** `categories`  
**Fields:**
- `status` (Ascending)
- `orderIndex` (Ascending)

**Why:** Used in CategoryNavigation component to display active categories in order.

**Create Link:** When you see the error, click the link provided. It will look like:
```
https://console.firebase.google.com/v1/r/project/veena-lms/firestore/indexes?create_composite=...
```

**Manual Creation:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `veena-lms`
3. Navigate to **Firestore Database** → **Indexes** tab
4. Click **Create Index**
5. Collection ID: `categories`
6. Add fields:
   - Field: `status`, Order: Ascending
   - Field: `orderIndex`, Order: Ascending
7. Click **Create**

### 2. Hero Banners Index

**Collection:** `hero_banners`  
**Fields:**
- `enabled` (Ascending)
- `status` (Ascending)
- `displayOrder` (Ascending)

**Why:** Used in HeroBanner component to fetch active banners in display order.

**Manual Creation:**
1. Go to Firebase Console → Firestore → Indexes
2. Click **Create Index**
3. Collection ID: `hero_banners`
4. Add fields:
   - Field: `enabled`, Order: Ascending
   - Field: `status`, Order: Ascending
   - Field: `displayOrder`, Order: Ascending
5. Click **Create**

## Understanding Index Errors

### Error Message Format
```
The query requires an index. You can create it here: [URL]
```

### What This Means
Firestore requires composite indexes when you:
- Use multiple `where()` clauses
- Combine `where()` with `orderBy()` on different fields
- Use range queries with equality filters

### Automatic Index Creation
✅ **Easiest:** Click the link in the error message - it will pre-fill all fields and create the index automatically.

### Index Building Time
- Indexes usually build in **1-5 minutes**
- You'll see status: "Building" → "Enabled"
- Queries will work once the index is enabled

## Fallback Behavior

The code includes fallback queries that:
1. ✅ Try the indexed query first (fastest)
2. ⚠️ Fall back to simpler query + client-side sorting (if index missing)
3. 🔄 Final fallback: Get all documents and filter/sort client-side

**Note:** Fallbacks work but are slower. Creating the index is recommended for better performance.

## Verification

After creating an index:

1. **Check Status:**
   - Go to Firestore → Indexes
   - Look for your index
   - Status should be "Enabled" (not "Building")

2. **Test the Query:**
   - Refresh your application
   - Check browser console for:
     - `✅ Categories loaded:` (no warnings)
     - `✅ Hero banner loaded:` (no errors)

3. **Monitor Performance:**
   - Indexed queries are much faster
   - Large collections benefit significantly from indexes

## Common Issues

### Issue: Index Still Building
**Solution:** Wait a few minutes and refresh. Check index status in Firebase Console.

### Issue: Index Creation Failed
**Solution:** 
- Check Firestore rules allow the fields
- Ensure collection name is correct
- Verify field names match exactly (case-sensitive)

### Issue: Still Getting Index Errors
**Solution:**
- Clear browser cache
- Check if you're using the correct project
- Verify the index is enabled (not just building)

## Current Required Indexes Summary

| Collection | Fields | Used In |
|------------|--------|---------|
| `categories` | `status`, `orderIndex` | CategoryNavigation |
| `hero_banners` | `enabled`, `status`, `displayOrder` | HeroBanner |

## Need Help?

If you continue to see index errors:
1. Copy the full error message
2. Check the Firebase Console → Indexes tab
3. Verify the index exists and is enabled
4. Try the automatic creation link from the error
