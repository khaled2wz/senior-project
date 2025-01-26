import React, { useState } from "react";
import RiyadhImage from "./images/Riyadh.jpg";
import JeddahImage from "./images/Jeddah.jpg";
import KhobarImage from "./images/Khobar.jpg";
import NeomImage from "./images/Neom.jpg";
import '../../style/Cities.css';

const cities = [
  { name: "Riyadh", image: RiyadhImage },
  { name: "Jeddah", image: JeddahImage },
  { name: "Khobar", image: KhobarImage },
  { name: "Neom", image: NeomImage },
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
    <section className="cities-section">
      {/* Carousel */}
      <div className="carousel-container">
        {/* Cards */}
        <div className="carousel-cards">
          {cities.map((city, index) => {
            const isActive = index === selectedIndex;
            return (
              <div
                key={index}
                className={`carousel-card ${
                  isActive ? "active" : "inactive"
                }`}
              >
                <div className="card-content">
                  {/* City Image */}
                  <img
                    src={city.image}
                    alt={city.name}
                    className="city-image"
                  />
                  {/* Gradient Overlay */}
                  <div className="gradient-overlay"></div>
                  {/* City Name */}
                  <div className="city-name">
                    <h3>{city.name}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls Below at Edges */}
        <div className="carousel-controls">
          {/* Left Arrow */}
          <button onClick={handlePrev} className="carousel-arrow left-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="arrow-icon"
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

          {/* Right Arrow */}
          <button onClick={handleNext} className="carousel-arrow right-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="arrow-icon"
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
      </div>
    </section>
  );
};

export default Cities;
