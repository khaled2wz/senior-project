import React from "react";
import '../../style/Hero.css';

const HeroCard = ({ title, description }) => (
  <a href="#" className="hero-card card bg-dark text-light p-4 mb-4">
    <h2 className="hero-card-title">{title}</h2>
    <p className="hero-card-description">{description}</p>
  </a>
);

const Hero = () => {
  return (
    <section className="hero-section text-center py-5 bg-dark text-light">
      {/* Decorative Elements */}
      <div className="hero-bg"></div>
      <div className="hero-blur top-left"></div>
      <div className="hero-blur bottom-right"></div>

      {/* Content */}
      <div className="hero-content container">
        <h1 className="hero-title mb-4">Explore the World</h1>
        <div className="hero-grid row">
          <div className="col-md-4">
            <HeroCard
              title="Places to Visit"
              description="Discover the best destinations around the world."
            />
          </div>
          <div className="col-md-4">
            <HeroCard
              title="Activities"
              description="Find exciting activities for your adventures."
            />
          </div>
          <div className="col-md-4">
            <HeroCard
              title="Get Inspired"
              description="Explore stories and ideas to inspire your travels."
            />
          </div>
        </div>
        <div className="hero-search mt-4 d-flex justify-content-center">
          <input
            type="text"
            placeholder="Search..."
            className="form-control me-2"
          />
          <button className="btn btn-outline-light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
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