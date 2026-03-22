import express from 'express';
import { sendMessage, getMessages, markRead, deleteMessage } from '../controllers/contactController.js';
import auth from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/', sendMessage);
router.get('/messages', auth, getMessages);
router.patch('/messages/:id/read', auth, markRead);
router.delete('/messages/:id', auth, deleteMessage);
export default router;
