import express from 'express';
import { Experience } from '../models/index.js';
import auth from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await Experience.find({ visible: true }).sort({ order: 1 });
    res.json({ success: true, data });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});
router.get('/all', auth, async (req, res) => {
  try {
    const data = await Experience.find().sort({ order: 1 });
    res.json({ success: true, data });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});
router.post('/', auth, async (req, res) => {
  try {
    const item = await Experience.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});
router.put('/:id', auth, async (req, res) => {
  try {
    const item = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: item });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});
router.delete('/:id', auth, async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});
export default router;
