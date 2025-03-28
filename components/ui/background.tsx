import React from "react";

interface BackgroundProps {
  children: React.ReactNode;
}

const Background = ({ children }: BackgroundProps) => {
  return (
    <div className="min-h-screen bg-[#093545] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto relative z-10">{children}</div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full"
          viewBox="0 0 1440 111"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0L59.625 4.17C120.375 8.34 239.625 16.68 360 30.8C480.375 45.23 599.625 65.77 720 69.94C840.375 74.11 959.625 61.59 1080 57.75C1200.38 53.57 1319.62 57.75 1380.38 59.67L1440 61.59V111H0V0Z"
            fill="#20DF7F"
            fillOpacity="0.09"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 44.4L48 53.28C96 62.16 192 79.92 288 75.48C384 71.04 480 44.4 576 26.64C672 8.88 768 0 864 0C960 0 1056 8.88 1152 24.42C1248 39.96 1344 62.16 1392 73.26L1440 84.36V111H0V44.4Z"
            fill="#E5E5E5"
            fillOpacity="0.13"
          />
        </svg>
      </div>
    </div>
  );
};

export default Background;
