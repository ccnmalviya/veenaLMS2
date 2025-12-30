"use client";

import { useState } from "react";

type FileUploadProps = {
  accept?: string;
  folder?: string;
  onUploadComplete: (url: string) => void;
  onUploadError?: (error: string) => void;
  multiple?: boolean;
  currentValue?: string; // Current uploaded URL to show preview
};

export function FileUpload({
  accept = "image/*,video/*",
  folder = "products",
  onUploadComplete,
  onUploadError,
  multiple = false,
  currentValue,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Show preview for first file if it's an image
    if (files[0] && files[0].type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await uploadFile(file);
    }

    // Reset input
    e.target.value = "";
  };

  const uploadFile = async (file: File) => {
    try {
      setUploading(true);
      setProgress(0);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error || "Upload failed";
        console.error("Upload API error:", errorMsg);
        throw new Error(errorMsg);
      }

      setProgress(100);
      // Call the callback first
      onUploadComplete(data.url);
      // Don't clear preview - let parent component handle it
      // The preview will be replaced by the parent's preview of the uploaded URL
    } catch (error: any) {
      console.error("Upload error:", error);
      setPreviewUrl(null);
      onUploadError?.(error.message || "Failed to upload file");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {multiple ? "Upload Files" : "Upload File"}
      </label>
      <div className="flex items-center gap-4">
        <label className="flex-1 cursor-pointer">
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
          <div className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition text-center">
            {uploading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm text-gray-600">Uploading... {progress}%</span>
              </div>
            ) : (
              <span className="text-sm text-gray-600">
                Click to upload or drag and drop
              </span>
            )}
          </div>
        </label>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Supported: Images (JPG, PNG, GIF) and Videos (MP4, MOV, AVI)
      </p>
      {(previewUrl || currentValue) && (
        <div className="mt-4">
          <img
            src={currentValue || previewUrl || ""}
            alt="Preview"
            className="w-32 h-32 object-cover border border-gray-300 rounded"
          />
        </div>
      )}
    </div>
  );
}

