import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../style/SignUp.css'; // Import the external CSS file
import Header from './Header';
import Footer from './Footer';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input change dynamically
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation Logic
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address.';
    }
    if (!passwordRegex.test(formData.password)) {
      return 'Password must be at least 8 characters long, contain at least one uppercase letter, and one number.';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to sign up');
    }
  };

  return (
    <div className="signup-container">
      <Header />
      <div className="signup-content">
        <div className="welcome-section">
          <h1>Start Your Journey!</h1>
        </div>
        <div className="signup-form-container">
          <form onSubmit={handleSubmit} className="signup-form">
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <p className="alert alert-danger">{error}</p>}
            {['firstName', 'lastName', 'email', 'password', 'confirmPassword'].map((field, index) => (
              <div key={index} className="form-group mb-3">
                <label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                <input
                  type={field.includes('password') ? 'password' : 'text'}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
            ))}
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            <div className="text-center mt-3">
              <span>Already have an account? </span>
              <Link to="/signin" className="text-primary">Log in</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;