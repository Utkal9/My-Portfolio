// skillRoutes.js
import express from 'express';
import { Skill } from '../models/index.js';
import auth from '../middleware/authMiddleware.js';
const skillRouter = express.Router();
const crud = (Model) => ({
  getAll: async (req, res) => {
    try {
      const data = await Model.find({ visible: true }).sort({ order: 1 });
      res.json({ success: true, data });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
  },
  getAllAdmin: async (req, res) => {
    try {
      const data = await Model.find().sort({ order: 1 });
      res.json({ success: true, data });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
  },
  create: async (req, res) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json({ success: true, data: item });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
  },
  update: async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!item) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, data: item });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
  },
  remove: async (req, res) => {
    try {
      await Model.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: 'Deleted' });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
  },
});
const sc = crud(Skill);
skillRouter.get('/', sc.getAll);
skillRouter.get('/all', auth, sc.getAllAdmin);
skillRouter.post('/', auth, sc.create);
skillRouter.put('/:id', auth, sc.update);
skillRouter.delete('/:id', auth, sc.remove);
export { skillRouter };

// contactRoutes.js
import { sendMessage, getMessages, markRead, deleteMessage } from '../controllers/contactController.js';
const contactRouter = express.Router();
contactRouter.post('/', sendMessage);
contactRouter.get('/messages', auth, getMessages);
contactRouter.patch('/messages/:id/read', auth, markRead);
contactRouter.delete('/messages/:id', auth, deleteMessage);
export { contactRouter };

// siteConfigRoutes.js
import { getSiteConfig, updateSiteConfig, uploadProfileImage } from '../controllers/siteConfigController.js';
import { uploadProfile } from '../config/cloudinary.js';
const siteConfigRouter = express.Router();
siteConfigRouter.get('/', getSiteConfig);
siteConfigRouter.put('/', auth, updateSiteConfig);
siteConfigRouter.post('/upload-profile', auth, uploadProfile.single('image'), uploadProfileImage);
export { siteConfigRouter };
