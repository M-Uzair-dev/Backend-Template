const User = require('../models/User');
const { createAndSendToken } = require('../utils/jwt');
const { sendPasswordResetEmail } = require('../utils/email');
const crypto = require('crypto');

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    const user = await User.create({
      name,
      email,
      password
    });

    createAndSendToken(user, 201, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    user.password = undefined;
    createAndSendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const logout = (req, res) => {
  res.cookie('jwt', '', {
    expires: new Date(Date.now() - 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address'
      });
    }

    // Always return the same message for security (prevents email enumeration)
    const successMessage = 'If an account with this email exists, a password reset link has been sent';

    try {
      const user = await User.findOne({ email });
      
      if (user) {
        // Generate reset token
        const resetToken = user.createPasswordResetToken();
        
        // Save the user with the reset token (without validation)
        await user.save({ validateBeforeSave: false });
        
        // Send password reset email
        await sendPasswordResetEmail(email, resetToken, user.name);
        
        console.log(`Password reset email sent to: ${email}`);
      }
    } catch (error) {
      // If there's an error sending email, clear the reset token
      if (error.message.includes('Failed to send')) {
        const user = await User.findOne({ email });
        if (user) {
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
          await user.save({ validateBeforeSave: false });
        }
      }
      console.error('Forgot password error:', error);
    }

    // Always return success to prevent email enumeration
    res.status(200).json({
      success: true,
      message: successMessage
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Password reset token is required'
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'New password is required'
      });
    }

    // Hash the token to find the user
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user by token and check if token is still valid
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    }).select('+passwordResetToken +passwordResetExpires');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Password reset token is invalid or has expired'
      });
    }

    // Set new password
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    
    await user.save();

    // Log the user in with new password
    createAndSendToken(user, 200, res);

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to reset password'
    });
  }
};

module.exports = {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword
};