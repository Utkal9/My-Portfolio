import express from 'express';
import { SocialLink } from '../models/index.js';
import auth from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await SocialLink.find({ visible: true }).sort({ order: 1 });
    res.json({ success: true, data });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.get('/all', auth, async (req, res) => {
  try {
    const data = await SocialLink.find().sort({ order: 1 });
    res.json({ success: true, data });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const item = await SocialLink.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const item = await SocialLink.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: item });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await SocialLink.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

export default router;
