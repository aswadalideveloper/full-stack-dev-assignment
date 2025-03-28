"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MovieForm from "@/components/MovieForm/MovieForm";
import { createMovie } from "@/app/actions/movies";
import { useImageUpload } from "@/hooks/useImageUpload";

export default function AddMovieForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const { uploadImage, isUploading } = useImageUpload();

  async function handleSubmit(data: {
    title: string;
    year: string;
    image: string | null;
  }) {
    setCreating(true);
    setError("");

    try {
      const { url: imageUrl, error: uploadError } = await uploadImage(
        data.image
      );
      if (uploadError) {
        throw new Error(uploadError);
      }

      const formData = new FormData();
      formData.set("title", data.title);
      formData.set("year", data.year);
      formData.set("imageUrl", imageUrl);

      const result = await createMovie(formData);
      if (result.error) {
        setError(result.error);
      } else {
        router.push("/movies");
      }
    } catch (err) {
      console.error("Error during submission:", err);
      setError("Failed to upload image or create movie");
    } finally {
      setCreating(false);
    }
  }

  return (
    <MovieForm
      mode="add"
      onSubmit={handleSubmit}
      isLoading={creating || isUploading}
      error={error}
    />
  );
}
