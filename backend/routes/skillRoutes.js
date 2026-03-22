import express from 'express';
import { Skill } from '../models/index.js';
import auth from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await Skill.find({ visible: true }).sort({ order: 1 });
    res.json({ success: true, data });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});
router.get('/all', auth, async (req, res) => {
  try {
    const data = await Skill.find().sort({ order: 1 });
    res.json({ success: true, data });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});
router.post('/', auth, async (req, res) => {
  try {
    const item = await Skill.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});
router.put('/:id', auth, async (req, res) => {
  try {
    const item = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: item });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});
router.delete('/:id', auth, async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});
router.patch('/reorder', auth, async (req, res) => {
  try {
    const { orders } = req.body;
    await Promise.all(orders.map(({ id, order }) => Skill.findByIdAndUpdate(id, { order })));
    res.json({ success: true });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});
export default router;
