import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AddActivity = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    city: '',
    type: [],
    cost: 0,
    durationHours: 1,
    rating: 1,
    categories: [],
    pictureUrl: ''
  });
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
        console.log('Cities Response:', citiesResponse.data); // Debugging log
        setCities(citiesResponse.data || []);
        setCategories(categoriesAndTypesResponse.data.categories || []);
        setTypes(categoriesAndTypesResponse.data.types || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked
        ? [...prev[name], e.target.value]
        : prev[name].filter((item) => item !== e.target.value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const { data } = await axios.post('/api/activities', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSuccess(data.message);
    } catch (err) {
      console.error('Error adding activity:', err);
      setError(err.response?.data?.message || 'Failed to add activity');
    }
  };

  return (
    <div className="add-activity-container">
      <Header />
      <div className="container mt-5">
        <h1>Add Activity</h1>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Activity Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="city" className="form-label">City</label>
            <select
              id="city"
              name="city"
              className="form-select"
              value={formData.city}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a city --</option>
              {Array.isArray(cities) && cities.map((city) => (
                <option key={city._id} value={city._id}>{city.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Type</label>
            {Array.isArray(types) && types.map((type) => (
              <div key={type} className="form-check">
                <input
                  type="checkbox"
                  id={type}
                  name="type"
                  value={type}
                  className="form-check-input"
                  checked={formData.type.includes(type)}
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
              value={formData.cost}
              onChange={handleChange}
              required
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
              value={formData.durationHours}
              onChange={handleChange}
              required
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
              value={formData.rating}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Categories</label>
            {Array.isArray(categories) && categories.map((category) => (
              <div key={category} className="form-check">
                <input
                  type="checkbox"
                  id={category}
                  name="categories"
                  value={category}
                  className="form-check-input"
                  checked={formData.categories.includes(category)}
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
              value={formData.pictureUrl}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">Add Activity</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddActivity;