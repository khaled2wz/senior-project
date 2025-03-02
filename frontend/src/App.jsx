import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Cities from './components/Cities';
import Activities from './components/Activities';
import Chatbot from './components/Chatbot';
import withAnimation from './components/withAnimation';
import './App.css';
import '../style/animations.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const AnimatedHero = withAnimation(Hero);
const AnimatedCities = withAnimation(Cities);
const AnimatedActivities = withAnimation(Activities);

const App = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="app-container">
      <Header />
      <main className="app-main">
        <AnimatedHero />
        <AnimatedCities />
        <AnimatedActivities />
      </main>
      <Footer />
      <div className="chatbot-icon" onClick={toggleChatbot}>
        <i className="fas fa-comments"></i>
      </div>
      {isChatbotOpen && <Chatbot />}
    </div>
  );
};

export default App;