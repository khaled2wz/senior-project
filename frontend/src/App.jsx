import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Cities from './components/Cities';
import Activities from './components/Activities';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(atob(token.split('.')[1]));
      setUser(user);
    }
  }, []);

  return (
    <div className="app-container">
      <Header user={user} setUser={setUser} />
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