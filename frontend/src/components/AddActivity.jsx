import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const AddActivity = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    locationCity: '',
    type: [],
    cost: 0,
    durationHours: 1,
    rating: 1,
    categories: [],
    pictureUrl: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
            <label htmlFor="locationCity" className="form-label">City</label>
            <select
              id="locationCity"
              name="locationCity"
              className="form-select"
              value={formData.locationCity}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a city --</option>
              <option value="Riyadh">Riyadh</option>
              <option value="Jeddah">Jeddah</option>
              <option value="Mecca">Mecca</option>
              <option value="Medina">Medina</option>
              <option value="Al-Ula">Al-Ula</option>
              <option value="Khobar">Khobar</option>
              <option value="Dammam">Dammam</option>
              <option value="Abha">Abha</option>
              <option value="Neom">Neom</option>
              <option value="Tabuk">Tabuk</option>
              <option value="Qassim">Qassim</option>
              <option value="Hail">Hail</option>
              <option value="Jizan">Jizan</option>
              <option value="Najran">Najran</option>
              <option value="Taif">Taif</option>
              <option value="Al-Baha">Al-Baha</option>
              <option value="Jubail">Jubail</option>
              <option value="Hafr Al-Batin">Hafr Al-Batin</option>
              <option value="Arar">Arar</option>
              <option value="Sakaka">Sakaka</option>
              <option value="Al-Ahsa">Al-Ahsa</option>
              <option value="Al-Kharj">Al-Kharj</option>
              <option value="Al-Ghat">Al-Ghat</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Type</label>
            <div className="form-check">
              <input
                type="checkbox"
                id="historical"
                name="type"
                value="Historical"
                className="form-check-input"
                checked={formData.type.includes('Historical')}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="historical" className="form-check-label">Historical</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="adventure"
                name="type"
                value="Adventure"
                className="form-check-input"
                checked={formData.type.includes('Adventure')}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="adventure" className="form-check-label">Adventure</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="cultural"
                name="type"
                value="Cultural"
                className="form-check-input"
                checked={formData.type.includes('Cultural')}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="cultural" className="form-check-label">Cultural</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="experiences"
                name="type"
                value="Experiences"
                className="form-check-input"
                checked={formData.type.includes('Experiences')}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="experiences" className="form-check-label">Experiences</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="theater-and-arts"
                name="type"
                value="Theater and arts"
                className="form-check-input"
                checked={formData.type.includes('Theater and arts')}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="theater-and-arts" className="form-check-label">Theater and arts</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="concerts"
                name="type"
                value="Concerts"
                className="form-check-input"
                checked={formData.type.includes('Concerts')}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="concerts" className="form-check-label">Concerts</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="sports"
                name="type"
                value="Sports"
                className="form-check-input"
                checked={formData.type.includes('Sports')}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="sports" className="form-check-label">Sports</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="food"
                name="type"
                value="Food"
                className="form-check-input"
                checked={formData.type.includes('Food')}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="food" className="form-check-label">Food</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="music"
                name="type"
                value="Music"
                className="form-check-input"
                checked={formData.type.includes('Music')}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="music" className="form-check-label">Music</label>
            </div>
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
            <div className="form-check">
              <input
                type="checkbox"
                id="family-friendly"
                name="categories"
                value="Family-friendly"
                className="form-check-input"
                checked={formData.categories.includes('Family-friendly')}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="family-friendly" className="form-check-label">Family-friendly</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="outdoor"
                name="categories"
                value="Outdoor"
                className="form-check-input"
                checked={formData.categories.includes('Outdoor')}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="outdoor" className="form-check-label">Outdoor</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="luxury"
                name="categories"
                value="Luxury"
                className="form-check-input"
                checked={formData.categories.includes('Luxury')}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="luxury" className="form-check-label">Luxury</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="budget"
                name="categories"
                value="Budget"
                className="form-check-input"
                checked={formData.categories.includes('Budget')}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="budget" className="form-check-label">Budget</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="solo-traveler"
                name="categories"
                value="Solo-traveler"
                className="form-check-input"
                checked={formData.categories.includes('Solo-traveler')}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="solo-traveler" className="form-check-label">Solo-traveler</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="group-traveler"
                name="categories"
                value="Group-traveler"
                className="form-check-input"
                checked={formData.categories.includes('Group-traveler')}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="group-traveler" className="form-check-label">Group-traveler</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="indoor"
                name="categories"
                value="Indoor"
                className="form-check-input"
                checked={formData.categories.includes('Indoor')}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="indoor" className="form-check-label">Indoor</label>
            </div>
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