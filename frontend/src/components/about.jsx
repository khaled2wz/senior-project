import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../../style/About.css';  

const About = () => {
  return (
    <div className="about-container d-flex flex-column min-vh-100 bg-dark text-light">
      <Header />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="about-title mb-4">About Hala Saudi Trip Advisor</h1>
            <p className="about-text">
              This is our about page for Hala Saudi Trip Advisor. We provide services and itineraries tailored to your needs and stay using AI-based tools that recommend you a custom tailored itinerary according to your needs.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;