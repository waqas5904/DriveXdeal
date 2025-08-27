"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const videos = [
  {
    id: 1,
    thumbnail: "https://picsum.photos/id/1015/500/300",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    title: "EV Expert Review",
  },
  {
    id: 2,
    thumbnail: "https://picsum.photos/id/1016/500/300",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    title: "X10 EV 1st Look",
  },
  {
    id: 3,
    thumbnail: "https://picsum.photos/id/1018/500/300",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    title: "EV Model 3 Review",
  },
  {
    id: 4,
    thumbnail: "https://picsum.photos/id/1020/500/300",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    title: "EV Model 4 Review",
  },
];

export default function Page() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 2;

  const prev = () => {
    setStartIndex((prev) =>
      prev === 0 ? Math.max(videos.length - visibleCount, 0) : prev - 1
    );
  };

  const next = () => {
    setStartIndex((prev) =>
      prev + visibleCount >= videos.length ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-black text-white py-12 px-8 sm:px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between ml-3 items-start sm:items-center mb-6 gap-3 sm:gap-0">
          <div>
            <h2 className="text-2xl sm:text-3xl font-normal ml-3">
              Explore Every Feature in Detail
            </h2>
            <p className="text-gray-400 text-sm sm:text-base ml-3">
              Full tour of design, comfort & performance.
            </p>
          </div>
          <button className="mt-4 sm:mt-0 text-white border border-gray-500 rounded-2xl px-4 py-1 hover:bg-gray-800">
            View More
          </button>
        </div>

        {/* Video Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ml-6">
          {videos.slice(startIndex, startIndex + visibleCount).map((video) => (
            <div
              key={video.id}
              className="relative rounded-lg overflow-hidden shadow-lg bg-[#111] cursor-pointer"
            >
              <video
                src={video.videoUrl}
                controls
                className="w-full h-[500px] object-cover rounded-lg"
              />
              {/* Title Overlay */}
              <div className="absolute bottom-2 left-2 bg-black/60 px-3 py-1 rounded text-sm">
                {video.title}
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <div className="mt-6 flex justify-center gap-2 items-center select-none">
          <button
            onClick={prev}
            className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-500 hover:bg-gray-800 transition"
          >
            <FaChevronLeft size={28} />
          </button>
          <button
            onClick={next}
            className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-500 hover:bg-gray-800 transition"
          >
            <FaChevronRight size={28} />
          </button>
        </div>
      </div>
    </div>
  );
}
