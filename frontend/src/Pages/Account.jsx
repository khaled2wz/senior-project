import React, { useContext, useEffect } from 'react';
import { UserContext } from '../components/UserContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../../style/Account.css';

const Account = () => {
  const { user, fetchUserData } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    }
  }, [fetchUserData]);

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
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;