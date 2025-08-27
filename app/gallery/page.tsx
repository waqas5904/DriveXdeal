"use client";

import React from "react";
import YouTube from "react-youtube";

const videoIds = [
  "dQw4w9WgXcQ",
  "3JZ_D3ELwOQ",
  "kXYiU_JCYtU",
  "60ItHLz5WEA",
  "hLQl3WQQoQ0",
  "2Vv-BfVoq4g",
  "RgKAFK5djSk",
  "JGwWNGJdvx8",
  "JGwWNGJdvx8",
];

const Gallery: React.FC = () => {
  return (
    <div className="bg-white">
      {/* ✅ Hero Section */}
   {/* ✅ Hero Section */}
<div className="bg-green-900 h-[400px] flex flex-col justify-center items-center text-white py-16">
  <div className="max-w-6xl mx-auto px-4 text-center">
    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
      Drive X deal Gallery
    </h2>
    <p className="mt-3 text-lg sm:text-xl font-normal max-w-2xl mx-auto">
      Explore our latest cars and memorable moments in the place.
    </p>
  </div>
</div>

{/* ✅ Extra Description Below Hero */}
<div className="max-w-6xl mx-auto px-4 text-center mt-10">
  <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800">
    Experience Cars Like Never Before
  </h3>
  <p className="mt-3 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
    Browse through our gallery and discover the finest cars curated by Drive X Deal.
    Every model reflects power, precision, and passion for driving.
  </p>
</div>


      {/* ✅ Video Gallery */}
      <div className="max-w-[1400px] mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoIds.map((id, idx) => (
          <div
            key={idx}
            className="video-card rounded-lg overflow-hidden shadow-md"
          >
            <div className="relative pb-[56.25%] h-0">
              <YouTube
                videoId={id}
                className="absolute top-0 left-0 w-full h-full"
                opts={{
                  playerVars: {
                    autoplay: 0,
                    modestbranding: 1,
                    rel: 0,
                  },
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
