import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../components/UserContext';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../../style/Account.css';

const Account = () => {
  const { user, fetchUserData } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profilePic: null,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePic: user.profilePic || null,
      });
    }
  }, [user]);

  const handleDeletePic = async () => {
    try {
      setMessage('');
      await axios.delete('/api/users/me/profile-pic', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage('Profile picture deleted successfully.');
      
      // Clear the local state version too
      setFormData((prev) => ({
        ...prev,
        profilePic: null,
      }));
      
      // Fetch updated user data from the server if needed
      fetchUserData(localStorage.getItem('token'));
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to delete profile picture');
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profilePic: e.target.files[0],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      if (formData.profilePic instanceof File) {
        formDataToSend.append('profilePic', formData.profilePic);
      }

      await axios.put('/api/users/me', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setMessage('Profile updated successfully');
      fetchUserData(localStorage.getItem('token'));
      setEditMode(false);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update profile');
    }
  };

  if (!user) {
    return (
      <div>
        <Header />
        <div className="account-container">
          <div className="container mt-5">
            <h2>Please sign in to view your account information.</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="account-container">
        <div className="container mt-5">
          <h2>Account Information</h2>
          {message && <p className="alert alert-info">{message}</p>}
          <div className="row">
            <div className="col-md-4 text-center">
              {formData.profilePic ? (
                <img
                  src={
                    typeof formData.profilePic === 'string'
                      ? formData.profilePic
                      : URL.createObjectURL(formData.profilePic)
                  }
                  alt="Profile"
                  className="profile-pic img-fluid rounded-circle"
                />
              ) : (
                <div className="profile-pic-placeholder">No Profile Picture</div>
              )}
              {/* Delete Button (only show if there's a current picture) */}
              {user.profilePic && (
                <button
                  className="btn btn-danger mt-2"
                  onClick={handleDeletePic}
                >
                  Delete Picture
                </button>
              )}
            </div>
            <div className="col-md-8">
              {editMode ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="profilePic" className="form-label">
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      id="profilePic"
                      name="profilePic"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <div>
                  <p>
                    <strong>First Name:</strong> {user.firstName}{' '}
                    <i
                      className="bi bi-pencil"
                      onClick={() => setEditMode(true)}
                    ></i>
                  </p>
                  <p>
                    <strong>Last Name:</strong> {user.lastName}{' '}
                    <i
                      className="bi bi-pencil"
                      onClick={() => setEditMode(true)}
                    ></i>
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}{' '}
                    <i
                      className="bi bi-pencil"
                      onClick={() => setEditMode(true)}
                    ></i>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
