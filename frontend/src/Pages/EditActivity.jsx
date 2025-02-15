import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserContext } from '../components/UserContext';

const EditActivity = () => {
  const { user } = useContext(UserContext);
  const [activityName, setActivityName] = useState('');
  const [activity, setActivity] = useState(null);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesResponse, categoriesAndTypesResponse] = await Promise.all([
          axios.get('/api/cities'),
          axios.get('/api/activities/categories-and-types')
        ]);
        setCities(citiesResponse.data);
        setCategories(categoriesAndTypesResponse.data.categories);
        setTypes(categoriesAndTypesResponse.data.types);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(`/api/activities/search?name=${activityName}`);
      setActivity(data);
      setError('');
    } catch (err) {
      console.error('Error fetching activity:', err);
      setError('Activity not found');
      setActivity(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setActivity((prev) => ({
      ...prev,
      [name]: checked
        ? [...prev[name], e.target.value]
        : prev[name].filter((item) => item !== e.target.value),
    }));
  };

  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(`/api/activities/${activity._id}`, activity, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSuccess('Activity updated successfully');
      setError('');

      // Clear the form data after 3 seconds
      setTimeout(() => {
        setSuccess('');
        setActivity(null);
        setActivityName('');
      }, 3000);
    } catch (err) {
      console.error('Error updating activity:', err);
      setError('Failed to update activity');
      setSuccess('');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/activities/${activity._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSuccess('Activity deleted successfully');
      setActivity(null);
      setError('');

      // Clear the form data after 3 seconds
      setTimeout(() => {
        setSuccess('');
        setActivityName('');
      }, 3000);
    } catch (err) {
      console.error('Error deleting activity:', err);
      setError('Failed to delete activity');
      setSuccess('');
    }
  };

  return (
    <div className="edit-activity-container">
      <Header />
      <div className="container mt-5">
        <h1>Edit Activity</h1>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}

        <div className="mb-3">
          <label htmlFor="activityName" className="form-label">Activity Name</label>
          <input
            type="text"
            id="activityName"
            name="activityName"
            className="form-control"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
          />
          <button onClick={handleSearch} className="btn btn-primary mt-2">Search</button>
        </div>

        {activity && (
          <div className="activity-details mt-4">
            <h2>{activity.name}</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Activity Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={activity.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  rows="3"
                  value={activity.description}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">City</label>
                <select
                  id="city"
                  name="city"
                  className="form-select"
                  value={activity.city}
                  onChange={handleChange}
                >
                  <option value="">-- Select a city --</option>
                  {cities.map((city) => (
                    <option key={city._id} value={city._id}>{city.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Type</label>
                {types.map((type) => (
                  <div key={type} className="form-check">
                    <input
                      type="checkbox"
                      id={type}
                      name="type"
                      value={type}
                      className="form-check-input"
                      checked={activity.type.includes(type)}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={type} className="form-check-label">{type}</label>
                  </div>
                ))}
              </div>
              <div className="mb-3">
                <label htmlFor="cost" className="form-label">Cost</label>
                <input
                  type="number"
                  id="cost"
                  name="cost"
                  className="form-control"
                  min="0"
                  value={activity.cost}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="durationHours" className="form-label">Duration (hours)</label>
                <input
                  type="number"
                  id="durationHours"
                  name="durationHours"
                  className="form-control"
                  min="1"
                  value={activity.durationHours}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="rating" className="form-label">Rating</label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  className="form-control"
                  min="1"
                  max="5"
                  value={activity.rating}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Categories</label>
                {categories.map((category) => (
                  <div key={category} className="form-check">
                    <input
                      type="checkbox"
                      id={category}
                      name="categories"
                      value={category}
                      className="form-check-input"
                      checked={activity.categories.includes(category)}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={category} className="form-check-label">{category}</label>
                  </div>
                ))}
              </div>
              <div className="mb-3">
                <label htmlFor="pictureUrl" className="form-label">Picture URL</label>
                <input
                  type="text"
                  id="pictureUrl"
                  name="pictureUrl"
                  className="form-control"
                  value={activity.pictureUrl}
                  onChange={handleChange}
                />
              </div>
              <button type="button" onClick={handleUpdate} className="btn btn-success mt-2">Update</button>
              <button type="button" onClick={handleDelete} className="btn btn-danger mt-2 ms-2">Delete</button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EditActivity;