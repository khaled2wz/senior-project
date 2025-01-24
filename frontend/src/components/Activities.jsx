import React from 'react';

const activities = [
  { name: "Activity 1", description: "Enjoy outdoor adventures and activities." },
  { name: "Activity 2", description: "Explore cultural and historical landmarks." },
  { name: "Activity 3", description: "Indulge in culinary experiences and tours." },
];

const Activities = () => {
  return (
    <section className="bg-gray-900 text-white flex flex-col items-center justify-center">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold uppercase tracking-wider">Activities</h2>
        <p className="text-gray-400 text-sm mt-1">
          Discover a variety of experiences to enjoy.
        </p>
      </div>

      {/* Activity Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="group relative bg-gray-800 rounded-lg shadow-xl overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
          >
            {/* Content */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative h-64 flex flex-col justify-end p-4">
              <h3 className="text-xl font-bold group-hover:text-yellow-400 transition-colors duration-300">
                {activity.name}
              </h3>
              <p className="text-gray-400 mt-1 text-sm group-hover:text-gray-200 transition-colors duration-300">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Activities;
