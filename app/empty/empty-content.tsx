"use client";

import { Button } from "@/components/ui/button";
import Background from "@/components/ui/background";
import { useRouter } from "next/navigation";

export default function EmptyContent() {
  const router = useRouter();

  return (
    <Background>
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-semibold text-white mb-10 md:mb-12">
            Your movies list is empty
          </h1>

          <Button
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg transition-transform duration-300 hover:scale-105 rounded-lg w-full md:w-auto"
            onClick={() => router.push("/movies/add")}
          >
            Add a new movie
          </Button>
        </div>
      </div>
    </Background>
  );
}
