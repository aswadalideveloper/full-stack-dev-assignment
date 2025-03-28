"use client";

import { useEffect, useState } from "react";
import { LogOut, CirclePlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import Background from "@/components/ui/background";
import { useRouter } from "next/navigation";
import MovieCard from "@/components/MovieCard/MovieCard";
import { getMovies } from "@/app/actions/movies";
import { signOut } from "@/app/actions/auth";
import type { Movie } from "@prisma/client";

interface PaginationData {
  total: number;
  pages: number;
  current: number;
}

export default function MoviesPage() {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    pages: 1,
    current: 1,
  });
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [currentLoadingPage, setCurrentLoadingPage] = useState<number | null>(
    null
  );

  useEffect(() => {
    loadMovies(1);
  }, []);

  async function loadMovies(page: number) {
    try {
      if (page === pagination.current && !loading) return;

      if (loading) {
        setLoading(true);
      } else {
        setPageLoading(true);
        setCurrentLoadingPage(page);
      }

      const result = await getMovies(page);

      if (result?.movies && result?.pagination) {
        setMovies(result.movies);
        setPagination(result.pagination);
      }
    } catch (error) {
      console.error("Failed to load movies:", error);
    } finally {
      setLoading(false);
      setPageLoading(false);
      setCurrentLoadingPage(null);
    }
  }

  const handleAddMovie = async () => {
    setAddLoading(true);
    try {
      await router.push("/movies/add");
    } finally {
      setAddLoading(false);
    }
  };

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
                onClick={handleAddMovie}
                disabled={addLoading}
              >
                {addLoading ? (
                  <Loader2 className="h-6 w-6 md:h-8 md:w-8 animate-spin" />
                ) : (
                  <CirclePlus className="h-6 w-6 md:h-8 md:w-8" />
                )}
              </Button>
            </div>
            <form action={signOut}>
              <Button
                variant="link"
                className="text-white font-semibold !px-0 text-xl transition-transform duration-300 hover:scale-105 flex items-center"
                type="submit"
              >
                <span className="hidden md:inline">Logout</span>
                <LogOut className="ml-3 h-6 w-6 md:h-8 md:w-8" />
              </Button>
            </form>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div
              className={
                pageLoading ? "opacity-50 transition-opacity duration-200" : ""
              }
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    year={movie.year}
                    image={movie.imageUrl}
                    onClick={() => router.push(`/movies/${movie.id}/edit`)}
                  />
                ))}
              </div>

              <div className="flex justify-center items-center gap-2 mt-12 md:my-32">
                <Button
                  variant="link"
                  className="text-white font-bold"
                  onClick={() => loadMovies(pagination.current - 1)}
                  disabled={pagination.current === 1 || pageLoading}
                >
                  {currentLoadingPage === pagination.current - 1 ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Prev"
                  )}
                </Button>
                <div className="flex gap-2">
                  {Array.from(
                    { length: pagination.pages },
                    (_, i) => i + 1
                  ).map((page) => (
                    <Button
                      key={page}
                      variant={
                        page === pagination.current ? "default" : "outline"
                      }
                      className={
                        page === pagination.current
                          ? "bg-primary hover:bg-primary/90 text-white transition-transform duration-300 hover:scale-105 min-w-[40px]"
                          : "text-white border-white/20 hover:bg-white/10 transition-transform duration-300 hover:scale-105 min-w-[40px]"
                      }
                      onClick={() => loadMovies(page)}
                      disabled={pageLoading}
                    >
                      {currentLoadingPage === page ? (
                        <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                      ) : (
                        page
                      )}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="link"
                  className="text-white font-bold"
                  onClick={() => loadMovies(pagination.current + 1)}
                  disabled={
                    pagination.current === pagination.pages || pageLoading
                  }
                >
                  {currentLoadingPage === pagination.current + 1 ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Next"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Background>
  );
}
