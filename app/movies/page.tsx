"use client";

import { LogOut, CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Background from "@/components/ui/background";
import { useRouter } from "next/navigation";
import { movies } from "@/app/data/movies";
import MovieCard from "@/components/MovieCard/MovieCard";

export default function MoviesPage() {
  const router = useRouter();

  return (
    <Background>
      <div className="min-h-screen p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12 md:mb-28">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-5xl font-semibold text-white flex items-center gap-2">
                My movies
              </h1>
              <Button
                variant="link"
                className="text-white transition-transform duration-300 hover:scale-105"
                onClick={() => router.push("/movies/add")}
              >
                <CirclePlus className="h-6 w-6 md:h-8 md:w-8" />
              </Button>
            </div>
            <Button
              variant="link"
              className="text-white font-semibold !px-0 text-xl transition-transform duration-300 hover:scale-105 flex items-center"
              onClick={() => router.push("/")}
            >
              <span className="hidden md:inline">Logout</span>
              <LogOut className="ml-3 h-6 w-6 md:h-8 md:w-8" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                year={movie.year}
                image={movie.image}
                onClick={() => router.push(`/movies/${movie.id}/edit`)}
              />
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 mt-12 md:my-32">
            <Button variant="link" className="text-white font-bold" disabled>
              Prev
            </Button>
            <div className="flex gap-2">
              <Button
                variant="default"
                className="bg-primary hover:bg-primary/90 text-white transition-transform duration-300 hover:scale-105"
              >
                1
              </Button>
              <Button
                variant="outline"
                className="text-white border-white/20 hover:bg-white/10 transition-transform duration-300 hover:scale-105"
              >
                2
              </Button>
            </div>
            <Button variant="link" className="text-white font-bold">
              Next
            </Button>
          </div>
        </div>
      </div>
    </Background>
  );
}
