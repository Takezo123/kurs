// controllers/UserController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/user.js';

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = new User({
      name,
      email,
      passwordHash,
    });

    await user.save();

    const token = jwt.sign({ _id: user._id }, 'secret', { expiresIn: '35d' });
    const { passwordHash: _, ...userData } = user.toObject();

    res.json({ ...userData, token });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ _id: user._id }, 'secret', { expiresIn: '35d' });
    const { passwordHash: _, ...userData } = user.toObject();

    res.json({ ...userData, token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { passwordHash, ...userData } = user.toObject();
    res.json(userData);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
