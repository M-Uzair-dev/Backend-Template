const User = require('../models/User');

const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const updateMe = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (req.body.password) {
      return res.status(400).json({
        success: false,
        message: 'This route is not for password updates'
      });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: req.user._id } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }
      updateData.email = email;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      user: updatedUser
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const deleteMe = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);

    res.cookie('jwt', '', {
      expires: new Date(Date.now() - 1000),
      httpOnly: true
    });

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getMe,
  updateMe,
  deleteMe
};