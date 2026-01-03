# Firebase Hosting Deployment Guide

## Prerequisites
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Have a Firebase project created at https://console.firebase.google.com

## Setup Steps

### 1. Login to Firebase
```bash
firebase login
```

### 2. Initialize Firebase Project
```bash
# Run from the root directory (/workspace)
firebase use --add
# Select your Firebase project from the list
# Give it an alias like "production" or "default"
```

Or manually edit `.firebaserc` and replace `your-firebase-project-id` with your actual project ID.

### 3. Build Your Next.js App
```bash
cd web
npm run build
```

**Note**: The Next.js config has been updated to use `output: 'export'` for static site generation.

### 4. Deploy to Firebase
```bash
# From the root directory
firebase deploy
```

## Custom Domain Setup

After deploying, to add your custom domain (pearlscreations.com):

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Enter `pearlscreations.com`
4. Follow the DNS setup instructions
5. Add the DNS records provided by Firebase (NOT the ones from the previous hosting provider)

## Important Notes

- **Static Export**: Your Next.js app will be exported as static HTML
- **Limitations**: Some Next.js features won't work with static export:
  - Image Optimization (disabled via `unoptimized: true`)
  - API Routes (won't work - use Firebase Functions instead)
  - Server-side Rendering (SSR)
  - Incremental Static Regeneration (ISR)

## Alternative: Deploy with Next.js Features Intact

If you need SSR, API routes, or other dynamic features, consider:

1. **Vercel** (recommended for Next.js): https://vercel.com
2. **Netlify**: https://netlify.com
3. **Firebase Hosting + Cloud Functions** (more complex setup)

For Vercel/Netlify deployment, you don't need firebase.json - just connect your GitHub repo.

## Troubleshooting

- If `firebase deploy` fails, ensure you're in the root directory (`/workspace`)
- If build fails, check that all environment variables are set in `.env.local`
- Firebase Hosting only serves static files - API routes in `/web/src/app/api/` won't work
