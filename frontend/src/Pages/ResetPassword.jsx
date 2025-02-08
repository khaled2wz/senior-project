import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../../style/ResetPassword.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/reset-password', { email });
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send reset email');
    }
  };

  return (
    <div className="reset-password-container">
      <Header />
      <div className="reset-password-content">
        <div className="reset-password-form-container">
          <h1>Reset Password</h1>
          {message && <div className="alert alert-info mt-3">{message}</div>}
          <form onSubmit={handleSubmit} className="reset-password-form mt-4">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Send Reset Link</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;