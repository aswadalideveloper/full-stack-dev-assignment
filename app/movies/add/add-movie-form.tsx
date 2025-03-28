"use client";

import MovieForm from "@/components/MovieForm/MovieForm";

export default function AddMovieForm() {
  return (
    <MovieForm
      mode="add"
      onSubmit={(data) => {
        // Handle submission logic here
        console.log("Add movie:", data);
      }}
    />
  );
}
