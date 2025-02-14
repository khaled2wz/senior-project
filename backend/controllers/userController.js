const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate a random verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store verification codes in memory (for simplicity)
const verificationCodes = {};

// Send verification code
const sendVerificationCode = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const verificationCode = generateVerificationCode();
    verificationCodes[email] = verificationCode;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Verification Code',
      text: `Your verification code is: ${verificationCode}\n\nPlease enter this code on the website to reset your password.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Verification code sent to your email' });
  } catch (error) {
    console.error('Error sending verification code:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Verify code and reset password
const verifyCodeAndResetPassword = async (req, res) => {
  const { email, verificationCode, newPassword } = req.body;

  try {
    if (verificationCodes[email] !== verificationCode) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    delete verificationCodes[email];

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Register user
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ firstName, lastName, email, password });
    await user.save();

    res.status(201).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error('Error registering user:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error logging in user:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = { registerUser, loginUser, sendVerificationCode, verifyCodeAndResetPassword };