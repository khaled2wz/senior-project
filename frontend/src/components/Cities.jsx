import React from "react";
import RiyadhImage from "./images/Riyadh.jpg";
import JeddahImage from "./images/Jeddah.jpg";
import KhobarImage from "./images/Khobar.jpg";
import NeomImage from "./images/Neom.jpg";
import '../../style/Cities.css';

const cities = [
  { name: "Riyadh", image: RiyadhImage },
  { name: "Jeddah", image: JeddahImage },
  { name: "Khobar", image: KhobarImage },
  { name: "Neom", image: NeomImage },
];

const Cities = () => {
  return (
    <div>
    <h1 className="cities-title">Cities</h1>
    <section className="cities-section">
      <div className="cities-grid">
        {cities.map((city, index) => (
          <div key={index} className="city-card">
            <img src={city.image} alt={city.name} className="city-image" />
            <div className="city-name">{city.name}</div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default Cities;