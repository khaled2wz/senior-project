const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

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
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ firstName, lastName, email, password, role });
    await user.save();

    res.status(201).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
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
        role: user.role,
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

// Reset Password
const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    if (req.file) {
      user.profilePic = `/uploads/${req.file.filename}`;
    }

    await user.save();

    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error('Error updating user profile:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
const deleteProfilePic = async (req, res) => {
  try {
    // Identify the user from the request (token, session, etc.)
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // If there's no profilePic, return a 400 (nothing to delete).
    if (!user.profilePic) {
      return res.status(400).json({ message: 'No profile picture to delete' });
    }

    
    const fileName = user.profilePic.replace('/uploads/', '');  
    const filePath = path.join(__dirname, '../uploads', fileName);
    
    fs.unlink(filePath, (err) => {
     
      if (err) {
        console.error('Error removing file:', err);
      }
    });

    // Set the database field to null
    user.profilePic = null;
    await user.save();

    return res.json({ message: 'Profile picture deleted successfully.' });
  } catch (error) {
    console.error('Error deleting profile pic:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { registerUser,deleteProfilePic, loginUser, sendVerificationCode, verifyCodeAndResetPassword, resetPassword, updateUserProfile, upload };