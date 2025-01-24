import React, { useState } from "react";
import RiyadhImage from "./images/Riyadh.jpg";
import JeddahImage from "./images/Jeddah.jpg";
import KhobarImage from "./images/Khobar.jpg";
import NeomImage from "./images/Neom.jpg";

const cities = [
  { name: "Residential Care Project in Riyadh", image: RiyadhImage },
  { name: "Concert Hall in Jeddah", image: JeddahImage },
  { name: "Modern Hotel in Khobar", image: KhobarImage },
  { name: "Future City in Neom", image: NeomImage },
];

const Cities = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrev = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? cities.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === cities.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center">
      {/* Carousel */}
      <div className="relative flex items-center justify-center w-full max-w-7xl h-[36rem]">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-4 bg-transparent border border-gray-600 hover:bg-gray-700 hover:border-gray-500 text-white w-12 h-12 flex items-center justify-center rounded-full z-10 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
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

        {/* Cards */}
        <div className="flex items-center gap-8">
          {cities.map((city, index) => {
            const isActive = index === selectedIndex;
            return (
              <div
                key={index}
                className={`relative w-72 h-[30rem] transition-all duration-700 ${
                  isActive
                    ? "opacity-100 scale-100 z-20"
                    : "opacity-50 scale-90"
                }`}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl bg-gray-800">
                  {/* City Image */}
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  {/* City Name */}
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-lg font-semibold uppercase">
                      {city.name}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-4 bg-transparent border border-gray-600 hover:bg-gray-700 hover:border-gray-500 text-white w-12 h-12 flex items-center justify-center rounded-full z-10 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
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
