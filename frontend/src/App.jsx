import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Cities from './components/Cities';
import Activities from './components/Activities';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Cities />
        <Activities />  
      </main>
      <Footer />
    </div>
  );
};

export default App;