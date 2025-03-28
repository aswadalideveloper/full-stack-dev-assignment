"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import MovieForm from "@/components/MovieForm/MovieForm";
import { getMovie, updateMovie } from "@/app/actions/movies";
import { useImageUpload } from "@/hooks/useImageUpload";
import type { Movie } from "@prisma/client";

export default function EditMovieForm() {
  const params = useParams();
  const router = useRouter();
  const movieId = params.id as string;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { uploadImage, isUploading } = useImageUpload();

  useEffect(() => {
    loadMovie();
  }, []);

  async function loadMovie() {
    const result = await getMovie(movieId);
    if (result.error) {
      setError(result.error);
    } else if (result.movie) {
      setMovie(result.movie);
    }
    setLoading(false);
  }

  async function handleSubmit(data: {
    title: string;
    year: string;
    image: string | null;
  }) {
    setUpdating(true);
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
      formData.set("imageUrl", imageUrl || movie?.imageUrl || "");

      const result = await updateMovie(movieId, formData);
      if (result.error) {
        setError(result.error);
      } else {
        router.push("/movies");
      }
    } catch (err) {
      console.error("Error during update:", err);
      setError("Failed to upload image or update movie");
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !movie) {
    return <div>{error || "Movie not found"}</div>;
  }

  return (
    <MovieForm
      mode="edit"
      initialData={{
        title: movie.title,
        year: movie.year,
        image: movie.imageUrl,
      }}
      onSubmit={handleSubmit}
      isLoading={updating || isUploading}
      error={error}
    />
  );
}
