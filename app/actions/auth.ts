"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  hashPassword,
  verifyPassword,
  signUpSchema,
  signInSchema,
} from "@/lib/auth";

export async function signUp(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = signUpSchema.safeParse({ email, password });
    if (!result.success) {
      return { error: result.error.errors[0].message };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Email already exists" };
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      include: {
        movies: {
          select: { id: true },
          take: 1,
        },
      },
    });

    cookies().set("userId", user.id, { httpOnly: true, secure: true });

    return {
      success: true,
      hasMovies: false,
    };
  } catch (error) {
    console.error("Sign up error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function signIn(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const rememberMe = formData.get("rememberMe") === "on";

    const result = signInSchema.safeParse({ email, password });
    if (!result.success) {
      return { error: result.error.errors[0].message };
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        movies: {
          select: { id: true },
          take: 1,
        },
      },
    });

    if (!user) {
      return { error: "Invalid email or password" };
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return { error: "Invalid email or password" };
    }

    const hasMovies = user.movies.length > 0;

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      ...(rememberMe && { maxAge: 30 * 24 * 60 * 60 * 1000 }),
    };

    cookies().set("userId", user.id, cookieOptions);

    return {
      success: true,
      hasMovies,
    };
  } catch (error) {
    console.error("Sign in error:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
    };
  }
}

export async function signOut() {
  cookies().delete("userId");
  redirect("/");
}
