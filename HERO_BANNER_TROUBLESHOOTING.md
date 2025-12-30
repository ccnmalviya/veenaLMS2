# Hero Banner Troubleshooting Guide

If your hero banner is not showing on the landing page, follow these steps:

## Quick Checks

### 1. Verify Banner Settings in Admin

1. Go to **Admin → Homepage → Manage Hero Banners**
2. Check your banner:
   - ✅ **Enabled** toggle should be ON
   - ✅ **Status** should be "Active" (not "Inactive")
   - ✅ **Display Order** should be set (e.g., 1)

### 2. Check Required Fields

Make sure your hero banner has:
- ✅ **Hero Name** (required)
- ✅ **Main Heading** (required)
- ✅ **Primary CTA Button Text** (required)
- ✅ **Primary CTA Action Target** (required)

### 3. Browser Console

Open browser console (F12) and look for:
- `Hero banner loaded:` - Shows the banner data was loaded
- `No active hero banner found` - Means no banner matches the criteria
- `All banners in collection:` - Shows all banners for debugging
- Any Firestore errors

### 4. Firestore Index (If Needed)

If you see an error about "failed-precondition" or "index required":

1. **Automatic Index Creation:**
   - The error message will contain a link to create the index
   - Click the link to create it automatically

2. **Manual Index Creation:**
   - Go to Firebase Console → Firestore → Indexes
   - Create a composite index:
     - Collection: `hero_banners`
     - Fields:
       - `enabled` (Ascending)
       - `status` (Ascending)
       - `displayOrder` (Ascending)
   - Wait for the index to build (can take a few minutes)

## Common Issues

### Issue: Banner Created But Not Showing

**Check:**
1. Is `enabled` set to `true`?
2. Is `status` set to `"active"`?
3. Does it have a `mainHeading`?

**Solution:**
- Edit the banner and ensure all checkboxes/statuses are correct
- Save and refresh the landing page

### Issue: Multiple Banners - Wrong One Showing

**Solution:**
- The banner with the lowest `displayOrder` will be shown
- Edit banners and set `displayOrder` to control which one appears
- Lower number = shown first

### Issue: "No active hero banner found" in Console

**Possible Causes:**
1. Banner is disabled (`enabled: false`)
2. Status is inactive (`status: "inactive"`)
3. No banner exists with both conditions

**Solution:**
1. Go to admin panel
2. Check banner list
3. Ensure at least one banner has:
   - Enabled: ✅
   - Status: Active

### Issue: Banner Shows in Admin But Not on Landing Page

**Check:**
1. Browser console for errors
2. Network tab - are Firestore queries succeeding?
3. Check if you're logged in (some components might require auth)

**Solution:**
- Check browser console for specific errors
- Verify Firestore rules allow reading from `hero_banners` collection
- Try in incognito/private window

### Issue: Firestore Index Error

**Error Message:**
```
Error loading hero banner: {code: "failed-precondition", message: "..."}
```

**Solution:**
The code will automatically fall back to client-side sorting, but for better performance:
1. Click the error link to create index automatically, OR
2. Go to Firebase Console → Firestore → Indexes
3. Create the composite index manually (see above)

## Debugging Steps

### Step 1: Check Browser Console

```javascript
// In browser console, manually check:
// (Replace with your actual banner ID)
```

### Step 2: Verify in Firestore Console

1. Go to Firebase Console
2. Navigate to Firestore Database
3. Open `hero_banners` collection
4. Check your banner document:
   - `enabled`: should be `true`
   - `status`: should be `"active"`
   - `displayOrder`: should be a number
   - `mainHeading`: should exist

### Step 3: Test Query

The component queries:
```javascript
where("enabled", "==", true)
where("status", "==", "active")
orderBy("displayOrder", "asc")
```

Make sure your banner matches ALL these conditions.

## Expected Behavior

✅ **Working:**
- Banner appears on landing page immediately after creation (if enabled & active)
- Banner updates when edited
- Console shows: `Hero banner loaded: {...}`

❌ **Not Working:**
- Banner doesn't appear
- Console shows: `No active hero banner found`
- Console shows errors

## Still Not Working?

1. **Check Firestore Rules:**
   - Ensure `hero_banners` collection is readable by public or authenticated users
   - Example rule:
   ```javascript
   match /hero_banners/{bannerId} {
     allow read: if true; // Or your specific rules
   }
   ```

2. **Clear Browser Cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

3. **Check Network Tab:**
   - Look for failed requests to Firestore
   - Check response status codes

4. **Development Mode Warning:**
   - If in development, you'll see a yellow warning box if no banner is found
   - This helps identify the issue quickly

## Quick Fix Checklist

- [ ] Banner exists in admin panel
- [ ] Banner has `enabled: true`
- [ ] Banner has `status: "active"`
- [ ] Banner has `mainHeading` filled
- [ ] Banner has primary CTA button text
- [ ] No console errors
- [ ] Firestore index created (if error shown)
- [ ] Firestore rules allow reading
- [ ] Page refreshed after creating/editing banner
