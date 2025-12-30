// Quick script to check if environment variables are set
// Run with: node check-env.js

require('dotenv').config({ path: '.env.local' });

const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

console.log('\n=== Razorpay Environment Variables Check ===\n');
console.log('RAZORPAY_KEY_ID:', keyId ? '✅ Set' : '❌ Missing');
console.log('NEXT_PUBLIC_RAZORPAY_KEY_ID:', process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ? '✅ Set' : '❌ Missing');
console.log('RAZORPAY_KEY_SECRET:', keySecret ? '✅ Set' : '❌ Missing');

if (!keyId || !keySecret) {
  console.log('\n❌ ERROR: Missing required environment variables!');
  console.log('\nPlease create a .env.local file in the web directory with:');
  console.log('NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_RxjZFKhR5qOUmu');
  console.log('RAZORPAY_KEY_SECRET=fEZla4zNot2f1447CYolNrql');
  console.log('RAZORPAY_KEY_ID=rzp_live_RxjZFKhR5qOUmu');
  process.exit(1);
} else {
  console.log('\n✅ All environment variables are set correctly!');
}

