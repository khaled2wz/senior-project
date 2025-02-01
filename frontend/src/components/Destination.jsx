import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/Destination.css"; // Ensure this file exists and matches the path
import Header from "./Header";
import Footer from "./Footer";

const Destination = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("/api/activities");
        setActivities(response.data);
      } catch (err) {
        setError("Failed to fetch activities");
      }
    };

    fetchActivities();
  }, []);

  // Group activities by city
  const groupedActivities = activities.reduce((acc, activity) => {
    const city = activity.locationCity;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(activity);
    return acc;
  }, {});

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="destination-title mb-4">Activities</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {Object.keys(groupedActivities).map((city) => (
          <div key={city} className="city-section">
            <h3 className="city-title">{city}</h3>
            <div className="row">
              {groupedActivities[city].map((activity, idx) => (
                <div key={idx} className="col-md-6 col-lg-4 col-xl-3 mb-4">
                  <div className="card shadow-sm">
                    <img
                      src={activity.pictureUrl}
                      className="card-img-top"
                      alt={activity.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{activity.name}</h5>
                      <p className="card-text">{activity.description}</p>
                      <p className="card-text">
                        <i className="bi bi-star-fill text-warning"></i>{" "}
                        {activity.rating} stars
                      </p>
                      <p className="card-text">
                        <strong>Cost:</strong> {activity.cost} SAR
                      </p>
                      <p className="card-text">
                        <strong>Duration:</strong> {activity.durationHours} hours
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