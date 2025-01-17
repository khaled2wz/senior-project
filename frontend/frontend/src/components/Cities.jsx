import React, { useEffect, useRef } from 'react';
import './Cities.css';
import RiyadhImage from './images/Riyadh.jpg';
import JeddahImage from './images/Jeddah.jpg';
import KhobarImage from './images/Khobar.jpg';
import NeomImage from './images/Neom.jpg';

const cities = [
  { name: 'Riyadh', image: RiyadhImage },
  { name: 'Jeddah', image: JeddahImage },
  { name: 'Khobar', image: KhobarImage },
  { name: 'Neom', image: NeomImage },
];

const Cities = () => {
  const cityRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    cityRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      cityRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <section className="cities-section">
      <div className="cities-container">
        {cities.map((city, index) => (
          <div
            key={index}
            className="city-card"
            ref={(el) => (cityRefs.current[index] = el)}
          >
            <img src={city.image} alt={city.name} className="city-image" />
            <h3 className="city-name">{city.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cities;