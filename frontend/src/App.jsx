import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Cities from './components/Cities';
import Activities from './components/Activities';
import withAnimation from './components/withAnimation';
import './App.css';
import '../style/animations.css'; 

const AnimatedHero = withAnimation(Hero);
const AnimatedCities = withAnimation(Cities);
const AnimatedActivities = withAnimation(Activities);

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="app-main">
        <AnimatedHero />
        <AnimatedCities />
        <AnimatedActivities />
      </main>
      <Footer />
    </div>
  );
};

export default App;