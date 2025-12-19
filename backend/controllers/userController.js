const User = require('../models/User');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    // Admin login
    if (role === 'admin' && email === 'admin13@gmail.com' && password === 'seceaids2024') {
      const token = jwt.sign({ id: 'admin', role: 'admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
      const userData = { id: 'admin', email, role: 'admin', name: 'Admin' };
      return res.json({ success: true, user: userData, token });
    }
    
    // User login (for demo, accept any valid email/password)
    if (role === 'user' && email && password) {
      const token = jwt.sign({ id: email, role: 'user' }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
      const userData = { id: email, email, role: 'user', name: email.split('@')[0] };
      return res.json({ success: true, user: userData, token });
    }
    
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const token = jwt.sign({ id: email, role: 'user' }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
    const userData = { id: email, email, role: 'user', name };
    res.json({ success: true, user: userData, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { login, register, getUsers, getUserById, updateUser, deleteUser };