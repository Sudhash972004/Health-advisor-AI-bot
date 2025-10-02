// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// exports.signup = async (req, res) => {
//   const { name, age, gender, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({ name, age, gender, email, password: hashedPassword });
//     await user.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(201).json({ token, user });
//   } catch (err) {
//     res.status(500).json({ message: 'Signup failed', error: err.message });
//   }
// };



const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { name, age, gender, email, password } = req.body;

  // Log incoming data for debugging
  console.log('Signup request body:', req.body);

  // Validate required fields
  if (!name || !age || !gender || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = new User({
      name,
      age,
      gender,
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    // Respond with token and user info
    res.status(201).json({ message: 'Signup successful', token, user });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};