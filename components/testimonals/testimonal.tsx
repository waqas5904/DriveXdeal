'use client';

import { useEffect, useRef } from 'react';

interface Testimonial {
  id: number;
  name: string;
  handle: string;
  content: string;
  avatar: string;
}

const TestimonialSlider = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sue Lang",
      handle: "@Sue Lang",
      content:
        "I recently bought a Tesla through Drive X Deals, and the experience was outstanding from start to finish. I was initially a bit skeptical about purchasing such a high-end vehicle online.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1887&q=80",
    },
    {
      id: 2,
      name: "John Smith",
      handle: "@JohnSmith",
      content:
        "I recently bought a Tesla through Drive X Deals, and the experience was outstanding from start to finish. I was initially a bit skeptical about purchasing such a high-end vehicle online.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1887&q=80",
    },
    {
      id: 3,
      name: "Maria Garcia",
      handle: "@MariaG",
      content:
        "I recently bought a Tesla through Drive X Deals, and the experience was outstanding from start to finish. I was initially a bit skeptical about purchasing such a high-end vehicle online.",
      avatar:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=1899&q=80",
    },
    {
      id: 4,
      name: "Alex Johnson",
      handle: "@AlexJ",
      content:
        "I recently bought a Tesla through Drive X Deals, and the experience was outstanding from start to finish. I was initially a bit skeptical about purchasing such a high-end vehicle online.",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1887&q=80",
    },
    {
      id: 5,
      name: "Sarah Williams",
      handle: "@SarahW",
      content:
        "I recently bought a Tesla through Drive X Deals, and the experience was outstanding from start to finish. I was initially a bit skeptical about purchasing such a high-end vehicle online.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=2070&q=80",
    },
  ];

  const infiniteTestimonials = [...testimonials, ...testimonials];
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animation: number;
    let pos = 0;

    const step = () => {
      pos -= 1; // speed (px per frame)
      if (Math.abs(pos) >= testimonials.length * 320) {
        pos = 0; // reset position jab half loop complete ho
      }
      slider.style.transform = `translateX(${pos}px)`;
      animation = requestAnimationFrame(step);
    };

    animation = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animation);
  }, [testimonials.length]);

  return (
    <div className=" bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-start p-4 pt-12">
      <div className="w-full mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-[44px] font-bold text-white mb-3">
            Customer Feedback
          </h1>
          <p className="text-gray-300 text-[18px] max-w-2xl mx-auto">
            We appreciate your input and would like to take a moment to provide
            you with some detailed feedback specifically to your experience.
          </p>
        </div>

        {/* Continuous Loop Slider */}
        <div className="overflow-hidden relative w-full pt-12 pb-6 mt-16">
          <div
            ref={sliderRef}
            className="flex space-x-6 transition-none"
            style={{ width: `${infiniteTestimonials.length * 320}px` }}
          >
            {infiniteTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="w-[600px] flex-shrink-0 border border-gray-700 rounded-xl p-6 h-[280px] flex flex-col"
              >
                {/* Avatar */}
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold  text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-400 text-base">
                      {testimonial.handle}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 relative">
                  <p className="text-gray-300 leading-relaxed relative z-10 text-[19px]">
                    {testimonial.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TestimonialSlider;
