import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../../style/ActivityDetails.css';

const ActivityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [relatedActivities, setRelatedActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(`/api/activities/${id}`);
        setActivity(response.data);
        fetchRelatedActivities(response.data);
      } catch (err) {
        setError('Failed to fetch activity details');
      }
    };

    const fetchRelatedActivities = async (activity) => {
      try {
        const response = await axios.get('/api/activities', {
          params: {
            locationCity: activity.locationCity,
            type: activity.type.join(','),
          },
        });
        setRelatedActivities(response.data.filter(a => a._id !== activity._id));
      } catch (err) {
        setError('Failed to fetch related activities');
      }
    };

    fetchActivity();
  }, [id]);

  const handleRelatedActivityClick = (relatedActivityId) => {
    navigate(`/activity/${relatedActivityId}`);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!activity) {
    return <div>Loading...</div>;
  }

  return (
    <div className="activity-details-container">
      <Header />
      <div className="container mt-5">
        <div className="card activity-card">
          <div className="card-body">
            <h1 className="card-title">{activity.name}</h1>
            <div className="activity-details">
              <img src={activity.pictureUrl} alt={activity.name} className="activity-image" />
              <p className="card-text">{activity.description}</p>
              <p className="card-text"><strong>Location:</strong> {activity.locationCity}</p>
              <p className="card-text"><strong>Type:</strong> {activity.type ? activity.type.join(', ') : 'N/A'}</p>
              <p className="card-text"><strong>Cost:</strong> {activity.cost} SAR</p>
              <p className="card-text"><strong>Duration:</strong> {activity.durationHours} hours</p>
              <p className="card-text"><strong>Rating:</strong> {activity.rating} stars</p>
            </div>
          </div>
        </div>
        <h2 className="mt-5">Related Activities</h2>
        <div className="related-activities">
          {relatedActivities.map((relatedActivity) => (
            <div key={relatedActivity._id} className="related-activity-card" onClick={() => handleRelatedActivityClick(relatedActivity._id)}>
              <img src={relatedActivity.pictureUrl} alt={relatedActivity.name} />
              <h3>{relatedActivity.name}</h3>
              <p>{relatedActivity.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ActivityDetails;