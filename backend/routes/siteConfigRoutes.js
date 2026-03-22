import express from 'express';
import { getSiteConfig, updateSiteConfig, uploadProfileImage } from '../controllers/siteConfigController.js';
import { uploadProfile } from '../config/cloudinary.js';
import auth from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/', getSiteConfig);
router.put('/', auth, updateSiteConfig);
router.post('/upload-profile', auth, uploadProfile.single('image'), uploadProfileImage);
export default router;
