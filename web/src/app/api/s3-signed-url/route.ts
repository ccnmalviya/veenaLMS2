import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const AWS_REGION = process.env.MY_AWS_REGION || "us-east-1";
const AWS_ACCESS_KEY_ID = process.env.MY_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.MY_AWS_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.MY_AWS_S3_BUCKET_NAME;

const credentialsConfigured = !!(AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY && BUCKET_NAME);

if (!credentialsConfigured) {
  console.error("⚠️ AWS S3 credentials not configured. Images will use direct URLs.");
}

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID || "",
    secretAccessKey: AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function GET(request: NextRequest) {
  try {
    // Check if credentials are configured
    if (!credentialsConfigured) {
      // Return the original URL without signing if credentials are missing
      const searchParams = request.nextUrl.searchParams;
      const key = searchParams.get("key");
      
      if (key) {
        console.log("⚠️ Returning direct URL (S3 credentials not configured):", key);
        return NextResponse.json({ url: key });
      }
      
      return NextResponse.json(
        { error: "AWS S3 credentials not configured. Please set MY_AWS_REGION, MY_AWS_ACCESS_KEY_ID, MY_AWS_SECRET_ACCESS_KEY, and MY_AWS_S3_BUCKET_NAME in environment variables." },
        { status: 503 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json(
        { error: "Missing 'key' parameter" },
        { status: 400 }
      );
    }

    // Extract the key from the full URL if provided
    let objectKey = key;
    
    // Handle different URL formats
    if (key.startsWith("https://") || key.startsWith("http://")) {
      try {
        const url = new URL(key);
        // Remove leading slash from pathname
        objectKey = url.pathname.substring(1);
        
        // If pathname is empty or just "/", try to extract from hostname
        if (!objectKey && url.hostname.includes(BUCKET_NAME || "")) {
          // This shouldn't happen, but handle it
          objectKey = key.split(`${BUCKET_NAME}/`)[1] || key;
        }
      } catch (e) {
        // If URL parsing fails, try to extract manually
        if (BUCKET_NAME && key.includes(BUCKET_NAME)) {
          const urlParts = key.split(`${BUCKET_NAME}/`);
          objectKey = urlParts[1] || key;
        } else {
          objectKey = key;
        }
      }
    } else if (BUCKET_NAME && key.includes(BUCKET_NAME)) {
      // If bucket name is in the key string, extract the path part
      const urlParts = key.split(`${BUCKET_NAME}/`);
      objectKey = urlParts[1] || key;
    }
    
    // Clean up the object key (remove any query parameters)
    if (objectKey.includes("?")) {
      objectKey = objectKey.split("?")[0];
    }

    console.log("Generating signed URL for:", { originalKey: key, objectKey, bucket: BUCKET_NAME });

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: objectKey,
    });

    // Generate a signed URL that expires in 1 hour
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600, // 1 hour
    });

    return NextResponse.json({ url: signedUrl });
  } catch (error: any) {
    console.error("Error generating signed URL:", {
      message: error.message,
      name: error.name,
      code: error.Code || error.code,
      bucket: BUCKET_NAME,
      region: AWS_REGION,
    });

    // Provide more specific error messages
    let errorMessage = error.message || "Failed to generate signed URL";
    if (error.name === "AccessDenied" || error.Code === "AccessDenied" || error.$metadata?.httpStatusCode === 403) {
      errorMessage = `Access Denied. IAM user needs s3:GetObject permission. Check:\n1. IAM user has s3:GetObject permission\n2. Bucket policy allows GetObject (if using bucket policy)\n3. KMS permissions for encrypted objects`;
    } else if (error.name === "NoSuchKey" || error.Code === "NoSuchKey") {
      errorMessage = `Object not found. The image may not exist at the specified path.`;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}



