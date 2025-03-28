import { movies } from "@/app/data/movies";
import EditMovieForm from "./edit-movie-form";

export async function generateStaticParams() {
  return movies.map((movie) => ({
    id: movie.id.toString(),
  }));
}

export default function EditMoviePage() {
  return <EditMovieForm />;
}
