"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
});

type SignInSchema = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInSchema) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form data:", data);
      router.push("/movies");
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl font-semibold text-white mb-16">Sign In</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:max-w-[300px] space-y-6"
      >
        <div className="space-y-2">
          <Input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full h-[45px] bg-input rounded-lg transition duration-300 ease-in-out text-white border-none placeholder:text-white/70"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full h-[45px] bg-input rounded-lg transition duration-300 ease-in-out text-white border-none placeholder:text-white/70"
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex justify-center items-center">
          <label
            htmlFor="rememberMe"
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Checkbox
              {...register("rememberMe")}
              id="rememberMe"
              className="w-5 h-5 rounded border border-white transition-colors duration-200 ease-in-out data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              disabled={isLoading}
            />
            <span className="text-sm font-medium leading-none text-white">
              Remember me
            </span>
          </label>
        </div>

        <Button
          type="submit"
          className="w-full h-[45px] rounded-lg bg-primary hover:bg-primary/90 text-white transition-transform duration-300 hover:scale-105"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
