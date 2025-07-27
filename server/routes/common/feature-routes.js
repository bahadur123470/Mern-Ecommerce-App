import express from 'express';
import { addFeatureImages, getFeatureImages } from '../../controllers/admin/feature-controller.js';

const router = express.Router();

router.post('/add', addFeatureImages);
router.get('/get', getFeatureImages);

export default router;