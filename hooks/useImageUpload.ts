import { useState } from "react";

interface UploadResponse {
  url: string;
  error?: string;
}

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (
    imageData: string | null
  ): Promise<UploadResponse> => {
    if (!imageData || !imageData.startsWith("data:")) {
      return { url: imageData || "" };
    }

    setIsUploading(true);
    setError(null);

    try {
      const response = await fetch(imageData);
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: blob.type });

      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) {
        throw new Error(uploadData.error || "Failed to upload image");
      }

      return { url: uploadData.url };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload image";
      setError(errorMessage);
      return { url: "", error: errorMessage };
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadImage,
    isUploading,
    error,
  };
}
