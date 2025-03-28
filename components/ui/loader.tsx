import { Loader2 } from "lucide-react";

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 text-white/70 text-lg">Loading your movies...</p>
    </div>
  );
}
