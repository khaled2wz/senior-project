const express = require('express');
const { registerUser, loginUser, sendVerificationCode, verifyCodeAndResetPassword, resetPassword, updateUserProfile, upload } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { deleteProfilePic } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/send-verification-code', sendVerificationCode);
router.post('/verify-code-and-reset-password', verifyCodeAndResetPassword);
router.post('/reset-password', resetPassword);
router.delete('/me/profile-pic',deleteProfilePic);
router.get('/me', protect, async (req, res) => {
  res.json(req.user);
});
router.put('/me', protect, upload.single('profilePic'), updateUserProfile);

module.exports = router;