import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../style/SignIn.css';
import Header from './Header';
import Footer from './Footer';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to sign in');
    }
  };

  return (
    <div className="signin-container">
      <Header />
      <div className="signin-content">
        <div className="welcome-section">
          <h1>Welcome Back!</h1>
        </div>
        <div className="signin-form-container">
          <form onSubmit={handleSubmit} className="signin-form">
            <h2 className="text-center mb-4">Sign In</h2>
            {error && <p className="alert alert-danger">{error}</p>}
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign In</button>
            <div className="text-center mt-3">
              <Link to="/forgot-password" className="text-primary">Forgot my password</Link>
            </div>
            <div className="text-center mt-3">
              <span>Don't have an account? </span>
              <Link to="/signup" className="text-primary">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;