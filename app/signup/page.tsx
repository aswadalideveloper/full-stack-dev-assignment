"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/app/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Background from "@/components/ui/background";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsPending(true);

    try {
      const formData = new FormData(event.currentTarget);
      const result = await signUp(formData);

      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        if (result.hasMovies) {
          router.push("/movies");
        } else {
          router.push("/empty");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Background>
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-4xl font-semibold text-white mb-16">Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full md:max-w-[300px] space-y-6"
        >
          {error && (
            <div className="p-3 rounded bg-red-500/10 border border-red-500 text-red-500 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full h-[45px] bg-input rounded-lg transition duration-300 ease-in-out text-white border-none placeholder:text-white/70"
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full h-[45px] bg-input rounded-lg transition duration-300 ease-in-out text-white border-none placeholder:text-white/70"
              disabled={isPending}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-[45px] rounded-lg bg-primary hover:bg-primary/90 text-white transition-transform duration-300 hover:scale-105"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-center text-sm text-white/70">
            Already have an account?{" "}
            <Link href="/" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </Background>
  );
}
