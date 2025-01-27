import React from "react";
import "../../style/Destination.css"; // Ensure this file exists and matches the path
import Header from "./Header";
import Footer from "./Footer";
const Destination = () => {
  const data = [
    {
      city: "Lake Como",
      activities: [
        {
          title: "Lake Como, Bellagio with Private Boat Cruise Included",
          image: "https://via.placeholder.com/300x200",
          price: "£67.70",
          reviews: 476,
        },
        {
          title: "Small group: Lake Como, Lake Lugano, Boat Cruise, Chocolate Tasting",
          image: "https://via.placeholder.com/300x200",
          price: "£136.25",
          reviews: 371,
        },
        {
          title: "Boat Rental Without License - Lake Como 40 hp",
          image: "https://via.placeholder.com/300x200",
          price: "£94.26",
          reviews: 48,
        },
        {
          title: "Domaso: Wine Tasting at the Winery on Como Lake",
          image: "https://via.placeholder.com/300x200",
          price: "£47.13",
          reviews: 120,
        },
      ],
      attractions: [
        {
          title: "Cattedrale Di Como",
          image: "https://via.placeholder.com/300x200",
          reviews: 3272,
        },
        {
          title: "Villa Olmo",
          image: "https://via.placeholder.com/300x200",
          reviews: 723,
        },
        {
          title: "Basilica di Sant'Abbondio",
          image: "https://via.placeholder.com/300x200",
          reviews: 412,
        },
        {
          title: "Centro Storico",
          image: "https://via.placeholder.com/300x200",
          reviews: 319,
        },
      ],
    },
  ];

  return (
    <>
      <Header />
      <div className="container my-5">
        {data.map((destination, index) => (
          <div key={index} className="destination-section mb-5">
            {/* City Title */}
            <h2 className="destination-title mb-4">{destination.city}</h2>

            {/* Activities Section */}
            <h4 className="section-title">Activities</h4>
            <div className="row">
              {destination.activities.map((activity, idx) => (
                <div key={idx} className="col-md-6 col-lg-4 col-xl-3 mb-4">
                  <div className="card shadow-sm">
                    <img
                      src={activity.image}
                      className="card-img-top"
                      alt={activity.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{activity.title}</h5>
                      <p className="card-text text-muted">
                        From <strong>{activity.price}</strong> per adult
                      </p>
                      <p className="card-text">
                        <i className="bi bi-star-fill text-warning"></i>{" "}
                        {activity.reviews} reviews
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Top Attractions Section */}
            <h4 className="section-title">Top Attractions</h4>
            <div className="row">
              {destination.attractions.map((attraction, idx) => (
                <div key={idx} className="col-md-6 col-lg-4 col-xl-3 mb-4">
                  <div className="card shadow-sm">
                    <img
                      src={attraction.image}
                      className="card-img-top"
                      alt={attraction.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{attraction.title}</h5>
                      <p className="card-text">
                        <i className="bi bi-star-fill text-warning"></i>{" "}
                        {attraction.reviews} reviews
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Destination;
