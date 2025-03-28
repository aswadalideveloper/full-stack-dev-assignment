"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Background from "@/components/ui/background";
import { Download } from "lucide-react";

interface MovieFormProps {
  mode: "add" | "edit";
  initialData?: {
    title: string;
    year: string;
    image: string;
  };
  onSubmit?: (data: {
    title: string;
    year: string;
    image: string | null;
  }) => void;
}

export default function MovieForm({
  mode,
  initialData,
  onSubmit,
}: MovieFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || "");
  const [year, setYear] = useState(initialData?.year || "");
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image || null
  );
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ title, year, image: imagePreview });
    }
  };

  return (
    <Background>
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-20 md:mb-32">
            {mode === "add" ? "Create a new Movie" : "Edit Movie"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32">
            {/* Image Upload */}
            <div className="w-full">
              <div
                className={`border-2 border-dashed rounded-lg aspect-[4/5] flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out w-full ${
                  isDragging
                    ? "border-primary bg-primary/10"
                    : "border-white hover:border-white/40 hover:scale-105 transition-transform duration-300 ease-in-out"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-input")?.click()}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center p-4">
                    <Download className="w-8 h-8 text-white/60 mx-auto mb-2" />
                    <p className="text-white/60">Drop an image here</p>
                  </div>
                )}
                <input
                  type="file"
                  id="file-input"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Form Inputs */}
            <div className="space-y-6">
              <div className="flex flex-col">
                <Input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-[45px] bg-input rounded-lg text-white border-none placeholder:text-white/70 transition duration-300 ease-in-out"
                />
              </div>

              <div className="flex flex-col">
                <Input
                  type="text"
                  placeholder="Publishing year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="h-[45px] bg-input rounded-lg text-white border-none placeholder:text-white/70 transition duration-300 ease-in-out w-1/2"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 h-[45px] bg-transparent rounded-lg text-white border-white/20 transition duration-300 ease-in-out transform hover:bg-white hover:scale-105"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 h-[45px] bg-primary hover:bg-primary/90 text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={handleSubmit}
                >
                  {mode === "add" ? "Submit" : "Update"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
}
