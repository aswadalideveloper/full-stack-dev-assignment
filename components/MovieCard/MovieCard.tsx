import React from "react";
import Image from "next/image";

interface MovieCardProps {
  id: string | number;
  title: string;
  year: number | string;
  image: string;
  onClick?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  year,
  image,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer rounded-lg bg-card p-0 md:p-2 w-full transition-transform duration-300 hover:scale-105"
      role="button"
      tabIndex={0}
    >
      <div className="overflow-hidden rounded-md aspect-[3/4] relative">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="my-2 md:my-4">
        <h3 className="text-white font-medium text-xl">{title}</h3>
        <p className="text-white text-sm mt-2">{year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
