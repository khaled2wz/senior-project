import React from 'react';
import '../../style/Activities.css';


const activities = [
  { name: "Activity 1", description: "Enjoy outdoor adventures and activities." },
  { name: "Activity 2", description: "Explore cultural and historical landmarks." },
  { name: "Activity 3", description: "Indulge in culinary experiences and tours." },
];

const Activities = () => {
  return (
    <section className="activities-section">
      {/* Header */}
      <div className="activities-header">
        <h2 className="activities-title">Activities</h2>
        <p className="activities-subtitle">
          Discover a variety of experiences to enjoy.
        </p>
      </div>

      {/* Activity Cards */}
      <div className="activities-grid">
        {activities.map((activity, index) => (
          <div key={index} className="activity-card">
            <div className="activity-card-overlay"></div>
            <div className="activity-card-content">
              <h3 className="activity-card-title">{activity.name}</h3>
              <p className="activity-card-description">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Activities;
