import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Cities from './components/Cities';
import Activities from './components/Activities';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="app-main">
        <Hero />
        <Cities />
        <Activities />
      </main>
      <Footer />
    </div>
  );
};

export default App;