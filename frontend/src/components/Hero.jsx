import React from "react";

const HeroCard = ({ title, description }) => (
  <a
    href="#"
    className="block p-6 bg-gray-700 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:bg-gray-600"
  >
    <h2 className="text-xl font-semibold text-white">{title}</h2>
    <p className="mt-2 text-sm text-gray-300">{description}</p>
  </a>
);

const Hero = () => {
  return (
    <section className="relative py-12 bg-gray-800 text-center text-gray-100 overflow-hidden -mt-1">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-700"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gray-600 rounded-full blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-600 rounded-full blur-3xl opacity-20 transform translate-x-1/2 translate-y-1/2"></div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8">Explore the World</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <HeroCard
            title="Places to Visit"
            description="Discover the best destinations around the world."
          />
          <HeroCard
            title="Activities"
            description="Find exciting activities for your adventures."
          />
          <HeroCard
            title="Get Inspired"
            description="Explore stories and ideas to inspire your travels."
          />
        </div>
        <div className="flex justify-center items-center mt-8 space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-sm px-4 py-2 text-gray-700 rounded-lg focus:outline-none"
          />
          <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;