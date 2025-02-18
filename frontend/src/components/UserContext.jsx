import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clearUserSession = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    setError(null);
  }, []);

  const handleAuthError = useCallback((error) => {
    console.error('Auth error:', error);
    const errorMessage = error.response?.data?.message || error.message;
    
    if (error.response?.status === 401 || errorMessage.includes('jwt')) {
      clearUserSession();
    }
    
    setError(errorMessage);
    setLoading(false);
  }, [clearUserSession]);

  const fetchUserData = useCallback(async (token) => {
    try {
      setLoading(true);
      setError(null);

      if (!token || typeof token !== 'string') {
        throw new Error('Invalid token format');
      }

      const response = await axios.get(`${API_BASE_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      });

      setUser(response.data);
      setError(null);
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  }, [handleAuthError]);

  // Check token validity and refresh user data periodically
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }

    // Refresh user data every 15 minutes
    const refreshInterval = setInterval(() => {
      const currentToken = localStorage.getItem('token');
      if (currentToken) {
        fetchUserData(currentToken);
      }
    }, 15 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [fetchUserData]);

  const signOut = useCallback(() => {
    clearUserSession();
  }, [clearUserSession]);

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        setUser, 
        signOut, 
        fetchUserData,
        loading,
        error
      }}
    >
      {children}
    </UserContext.Provider>
  );
};