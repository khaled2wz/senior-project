import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <h1 className="hero-title">Explore the World</h1>
        <div className="hero-grid">
          <a href="#" className="hero-card">
            <h2 className="hero-card-title">Places to Visit</h2>
            <p> </p>
          </a>
          <a href="#" className="hero-card">
            <h2 className="hero-card-title">Activities</h2>
            <p> </p>
          </a>
          <a href="#" className="hero-card">
            <h2 className="hero-card-title">Get Inspired</h2>
            
          </a>
        </div>
        <div className="hero-search">
          <input
            type="text"
            placeholder="Search..."
            className="hero-input"
          />
          <button className="hero-button">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;