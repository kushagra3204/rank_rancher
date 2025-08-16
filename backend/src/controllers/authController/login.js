const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    user.lastLogin = new Date();
    await user.save();

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        // sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .status(200)
      .json({ message: 'Logged in successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err });
  }
};