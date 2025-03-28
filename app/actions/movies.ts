"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { z } from "zod";

const movieSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  year: z.string().min(4, "Invalid year").max(4),
  imageUrl: z.string().url("Invalid image URL"),
});

export async function getMovies(page = 1) {
  try {
    const userId = cookies().get("userId")?.value;
    if (!userId) redirect("/");

    const perPage = 8;
    const skip = (page - 1) * perPage;

    const [movies, total] = await Promise.all([
      prisma.movie.findMany({
        where: { userId },
        skip,
        take: perPage,
        orderBy: { createdAt: "desc" },
      }),
      prisma.movie.count({
        where: { userId },
      }),
    ]);

    return {
      movies,
      pagination: {
        total,
        pages: Math.ceil(total / perPage),
        current: page,
      },
    };
  } catch (error) {
    return { error: "Failed to load movies" };
  }
}

export async function getMovie(id: string) {
  try {
    const userId = cookies().get("userId")?.value;
    if (!userId) redirect("/");

    const movie = await prisma.movie.findUnique({
      where: { id },
    });

    if (!movie || movie.userId !== userId) {
      return { error: "Movie not found" };
    }

    return { movie };
  } catch (error) {
    return { error: "Failed to load movie" };
  }
}

export async function updateMovie(id: string, formData: FormData) {
  try {
    const userId = cookies().get("userId")?.value;
    if (!userId) redirect("/");

    const title = formData.get("title") as string;
    const year = formData.get("year") as string;
    const imageUrl = formData.get("imageUrl") as string;

    const result = movieSchema.safeParse({ title, year, imageUrl });
    if (!result.success) {
      return { error: result.error.errors[0].message };
    }

    const movie = await prisma.movie.findUnique({
      where: { id },
    });

    if (!movie || movie.userId !== userId) {
      return { error: "Movie not found" };
    }

    await prisma.movie.update({
      where: { id },
      data: { title, year, imageUrl },
    });

    return { success: true };
  } catch (error) {
    return { error: "Failed to update movie" };
  }
}

export async function createMovie(formData: FormData) {
  try {
    const userId = cookies().get("userId")?.value;
    if (!userId) redirect("/");

    const title = formData.get("title") as string;
    const year = formData.get("year") as string;
    const imageUrl = formData.get("imageUrl") as string;

    const result = movieSchema.safeParse({ title, year, imageUrl });
    if (!result.success) {
      return { error: result.error.errors[0].message };
    }

    await prisma.movie.create({
      data: {
        title,
        year,
        imageUrl,
        userId,
      },
    });

    return { success: true };
  } catch (error) {
    return { error: "Failed to create movie" };
  }
}

export async function deleteMovie(id: string) {
  try {
    const userId = cookies().get("userId")?.value;
    if (!userId) redirect("/");

    const movie = await prisma.movie.findUnique({
      where: { id },
    });

    if (!movie || movie.userId !== userId) {
      return { error: "Movie not found" };
    }

    await prisma.movie.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    return { error: "Failed to delete movie" };
  }
}
