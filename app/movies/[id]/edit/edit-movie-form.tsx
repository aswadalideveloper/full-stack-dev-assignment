"use client";

import { movies } from "@/app/data/movies";
import MovieForm from "@/components/MovieForm/MovieForm";
import { useParams } from "next/navigation";

export default function EditMovieForm() {
  const params = useParams();
  const movieId = Number(params.id);
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) return null;

  return (
    <MovieForm
      mode="edit"
      initialData={{
        title: movie.title,
        year: movie.year,
        image: movie.image,
      }}
      onSubmit={(data) => {
        // Handle update logic here
        console.log("Update movie:", data);
      }}
    />
  );
}
