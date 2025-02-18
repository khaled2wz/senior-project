import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../style/SignIn.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserContext } from '../components/UserContext';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(null);
  const navigate = useNavigate();
  const { fetchUserData } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/login`, {
        email,
        password,
      });

      localStorage.setItem('token', response.data.user.token);
      await fetchUserData(response.data.user.token);
      navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to sign in';
      setError(errorMessage);

      // Handle rate limiting feedback
      if (err.response?.data?.remainingAttempts) {
        setRemainingAttempts(err.response.data.remainingAttempts);
      }

      // Clear password on error
      setPassword('');
    } finally {
      setIsLoading(false);
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
            
            {error && (
              <div className="alert alert-danger">
                {error}
                {remainingAttempts !== null && (
                  <div className="mt-2">
                    Remaining attempts: {remainingAttempts}
                  </div>
                )}
              </div>
            )}

            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                required
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-100"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="text-center mt-3">
              <Link to="/reset-password" className="text-primary">
                Forgot my password
              </Link>
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