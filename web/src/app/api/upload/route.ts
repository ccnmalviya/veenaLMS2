import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Validate environment variables
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  console.error("Missing AWS credentials in environment variables");
}

if (!BUCKET_NAME) {
  console.error("Missing AWS_S3_BUCKET_NAME in environment variables");
}

// Create S3 client with forcePathStyle if needed (for some regions/buckets)
const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID || "",
    secretAccessKey: AWS_SECRET_ACCESS_KEY || "",
  },
  // Use the correct endpoint format for the region
  forcePathStyle: false, // Use virtual-hosted-style (default)
});

export async function POST(request: NextRequest) {
  let folderPath = "products"; // Default folder for error messages
  
  try {
    // Check if credentials are configured
    if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
      return NextResponse.json(
        { error: "AWS credentials not configured. Please check your .env.local file." },
        { status: 500 }
      );
    }

    if (!BUCKET_NAME) {
      return NextResponse.json(
        { error: "S3 bucket name not configured. Please set AWS_S3_BUCKET_NAME in .env.local" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    let folder = (formData.get("folder") as string) || "products";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Normalize folder path: remove leading/trailing slashes and ensure proper format
    folder = folder.replace(/^\/+|\/+$/g, ""); // Remove leading and trailing slashes
    if (!folder) {
      folder = "products"; // Default to products if folder becomes empty
    }
    folderPath = folder; // Store for error messages

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split(".").pop();
    const fileName = `${folder}/${timestamp}-${randomString}.${fileExtension}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to S3
    // Your bucket requires KMS encryption, so we need to include the KMS key ID
    const kmsKeyId = process.env.AWS_KMS_KEY_ID; // Optional: set in .env.local if you have a specific KMS key
    
    const putObjectParams: any = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
      // Required: Your bucket policy requires KMS encryption
      ServerSideEncryption: "aws:kms",
    };

    // If KMS key ID is provided, use it; otherwise AWS will use the default key
    if (kmsKeyId) {
      putObjectParams.SSEKMSKeyId = kmsKeyId;
    }

    const command = new PutObjectCommand(putObjectParams);

    await s3Client.send(command);

    // Return the S3 URL (using the correct format based on region)
    // For most regions: bucket.s3.region.amazonaws.com
    // For us-east-1: bucket.s3.amazonaws.com (no region in URL)
    let fileUrl: string;
    if (AWS_REGION === "us-east-1") {
      fileUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
    } else {
      fileUrl = `https://${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${fileName}`;
    }

    return NextResponse.json({ 
      success: true, 
      url: fileUrl,
      fileName: fileName 
    });
  } catch (error: any) {
    console.error("Upload error details:", {
      message: error.message,
      name: error.name,
      code: error.Code || error.code,
      bucket: BUCKET_NAME,
      region: AWS_REGION,
      folder: folderPath,
      hasCredentials: !!(AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY),
    });

    // Provide more specific error messages
    let errorMessage = "Upload failed";
    if (error.name === "AccessDenied" || error.Code === "AccessDenied" || error.$metadata?.httpStatusCode === 403) {
      errorMessage = `Access Denied for folder "${folderPath}". This is likely a folder permission issue. Please check:\n\n1. IAM user has s3:PutObject permission for the folder path: ${folderPath}/*\n2. IAM user has kms:Decrypt and kms:GenerateDataKey permissions (for KMS encryption)\n3. Bucket policy allows access to the folder: ${folderPath}/*\n4. Bucket name is correct: ${BUCKET_NAME}\n5. Region is correct: ${AWS_REGION}\n\nTo fix folder permissions:\n- Go to IAM → Your User → Permissions\n- Ensure the policy includes: "s3:PutObject" with Resource: "arn:aws:s3:::${BUCKET_NAME}/${folderPath}/*"\n- Or use a broader policy like: "arn:aws:s3:::${BUCKET_NAME}/*" to allow all folders`;
    } else if (error.name === "NoSuchBucket" || error.Code === "NoSuchBucket") {
      errorMessage = `Bucket '${BUCKET_NAME}' not found. Please check AWS_S3_BUCKET_NAME in .env.local`;
    } else if (error.message) {
      errorMessage = `${error.message} (Folder: ${folderPath})`;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

