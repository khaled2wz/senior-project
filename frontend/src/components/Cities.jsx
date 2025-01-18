import React, { useState } from "react";
import RiyadhImage from "./images/Riyadh.jpg";
import JeddahImage from "./images/Jeddah.jpg";
import KhobarImage from "./images/Khobar.jpg";
import NeomImage from "./images/Neom.jpg";

const cities = [
  { name: "Riyadh", image: RiyadhImage },
  { name: "Jeddah", image: JeddahImage },
  { name: "Khobar", image: KhobarImage },
  { name: "Neom", image: NeomImage },
];

const Cities = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); // The currently selected card
  const [hoverIndex, setHoverIndex] = useState(null); // The currently hovered card

  const handlePrev = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? cities.length - 1 : prevIndex - 1
    );
    setHoverIndex(null); // Clear hover state when using arrows
  };

  const handleNext = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === cities.length - 1 ? 0 : prevIndex + 1
    );
    setHoverIndex(null); // Clear hover state when using arrows
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black relative">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Explore Cities
        </h2>
        <p className="text-lg text-gray-400 mt-2">Select the topic</p>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto px-4">
        {/* City Cards */}
        <div className="flex items-center justify-center gap-6">
          {cities.map((city, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => setSelectedIndex(index)}
              className={`relative w-64 h-96 flex-shrink-0 transition-all duration-500 ease-out transform cursor-pointer ${
                // Apply classes based on hover or selected state
                hoverIndex === index || selectedIndex === index
                  ? "scale-105 z-20 opacity-100"
                  : "scale-75 opacity-50"
              }`}
            >
              {/* City Image */}
              <div className="relative w-full h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-2xl font-semibold text-white">
                  {city.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 z-20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 z-20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Cities;