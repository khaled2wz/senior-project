import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/Activities.css';

const activities = [
  { name: "Activity 1", description: "Enjoy outdoor adventures and activities." },
  { name: "Activity 2", description: "Explore cultural and historical landmarks." },
  { name: "Activity 3", description: "Indulge in culinary experiences and tours." },
];

const Activities = () => {
  return (
    <section className="activities-section py-5 bg-light">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="activities-title">Activities</h2>
        <p className="activities-subtitle">
          Discover a variety of experiences to enjoy.
        </p>
      </div>

      {/* Activity Cards */}
      <div className="container">
        <div className="row">
          {activities.map((activity, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100 activity-card">
                <div className="card-body">
                  <h3 className="card-title">{activity.name}</h3>
                  <p className="card-text">{activity.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Activities;