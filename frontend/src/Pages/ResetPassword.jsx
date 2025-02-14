import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../../style/ResetPassword.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);

  const handleSendVerificationCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/send-verification-code', { email });
      setMessage(response.data.message);
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send verification code');
    }
  };

  const handleVerifyCodeAndResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/verify-code-and-reset-password', { email, verificationCode, newPassword });
      setMessage(response.data.message);
      setStep(3);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div className="reset-password-container">
      <Header />
      <div className="reset-password-content">
        <div className="reset-password-form-container">
          <h1>Reset Password</h1>
          {message && <div className="alert alert-info mt-3">{message}</div>}
          {step === 1 && (
            <form onSubmit={handleSendVerificationCode} className="reset-password-form mt-4">
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
              <button type="submit" className="btn btn-primary">Send Verification Code</button>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleVerifyCodeAndResetPassword} className="reset-password-form mt-4">
              <div className="mb-3">
                <label htmlFor="verificationCode" className="form-label">Verification Code</label>
                <input
                  type="text"
                  id="verificationCode"
                  name="verificationCode"
                  className="form-control"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Reset Password</button>
            </form>
          )}
          {step === 3 && (
            <div className="mt-4">
              <p>Your password has been reset successfully. You can now <a href="/signin">sign in</a> with your new password.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;