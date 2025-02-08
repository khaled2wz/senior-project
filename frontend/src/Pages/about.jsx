import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
             
            Welcome to Hala Saudi Trip Advisor, your ultimate travel companion for exploring Saudi Arabia! We specialize in providing personalized travel experiences by offering customized itineraries tailored specifically to your preferences.

Using advanced AI-powered tools, we analyze your interests, budget, and travel style to generate a unique itinerary that perfectly aligns with your needs. Whether you're looking for adventure, cultural experiences, historical sites, or luxury stays, our platform ensures a seamless and hassle-free travel planning experience.

Our mission is to enhance your journey by providing expert recommendations, top-rated accommodations, must-visit attractions, and hidden gems across Saudi Arabia. With Hala Saudi Trip Advisor, every trip is curated to offer you the best experiences, making your stay truly unforgettable.

Let us take care of the planning while you focus on exploring, discovering, and enjoying the beauty of Saudi Arabia! 🌍✨


           </p>
          </div>
        </div>

       {/* Logo Section */}
<div className="row justify-content-center my-5">
  <div className="col-md-6 text-center">
    <img src="/images/dark-blue-logo.png" alt="Logo" className="about-logo" />
  </div>
</div>

        {/* Information Section */}
        <div className="row justify-content-center my-5">
          <div className="col-md-8">
            <h2 className="section-title">Our Mission</h2>
            <p className="about-text">
              Our mission is to provide the best travel experiences for our users by leveraging advanced technology and personalized recommendations.
            </p>
            <h2 className="section-title">Our Vision</h2>
            <p className="about-text">
              We envision a world where travel planning is seamless, enjoyable, and tailored to individual preferences.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="row justify-content-center my-5">
          <div className="col-md-8">
            <h2 className="section-title">Meet the Team</h2>
            <ul className="team-list">
              <li className="team-member">Ziyad    </li>
              <li className="team-member">Khalid - Lead Developer</li>
              <li className="team-member">  - UI/UX Designer</li>
              <li className="team-member"> Khalid end Developer</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;