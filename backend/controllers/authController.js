import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/auth/me
export const getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};

// POST /api/auth/change-password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!(await user.comparePassword(currentPassword)))
      return res.status(400).json({ success: false, message: 'Current password incorrect' });

    user.password = newPassword;
    await user.save();
    res.json({ success: true, message: 'Password updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Seed initial admin (call once)
export const seedAdmin = async () => {
  try {
    const exists = await User.findOne({ email: process.env.ADMIN_EMAIL_DEFAULT });
    if (!exists) {
      await User.create({
        name: 'Utkal Behera',
        email: process.env.ADMIN_EMAIL_DEFAULT,
        password: process.env.ADMIN_PASSWORD_DEFAULT,
      });
      console.log('✅ Admin seeded');
    }
  } catch (err) {
    console.error('Seed error:', err.message);
  }
};
