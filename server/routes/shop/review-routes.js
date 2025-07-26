import express from 'express';
import { addProductReviews, getProductReviews } from '../../controllers/shop/product-review-controller';

const router = express.Router();

router.post('/add', addProductReviews)
router.get('/:productId', getProductReviews)

export default router;