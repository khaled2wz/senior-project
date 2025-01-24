const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register a new user
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
        console.error(error); // Log the error
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// Login a user
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
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = { registerUser, loginUser };