import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Email validation regex: must include proper email notation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Password validation regex: at least 8 characters, one uppercase letter, and one number
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long, contain at least one uppercase letter, and one number.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Handle sign-up logic here
    setError(''); // Clear error if validation passes
  };

  return (
    <div className="flex min-h-screen bg-gray-800 relative">
      <div className="absolute top-4 right-4">
        <Link to="/" className="text-white transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6"
            />
          </svg>
        </Link>
      </div>
      <div className="flex-1 flex justify-center items-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Start Your</h1>
          <h1 className="text-4xl font-bold">Journey!</h1>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <form onSubmit={handleSubmit} className="bg-gray-700 p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-6">Sign Up</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-gray-600 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-gray-600 text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 rounded bg-gray-600 text-white"
              required
            />
          </div>
          <button type="submit" className="w-full bg-teal-500 p-2 rounded text-white transition">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;