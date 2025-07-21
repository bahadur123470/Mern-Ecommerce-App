import express from 'express';
import { getAllOrdersByAllUsers, getOrderDetailsForAdmin, updateOrderStatus } from '../../controllers/admin/order-controller.js';


const router = express.Router();
router.get("/get", getAllOrdersByAllUsers)
router.get("/details/:id", getOrderDetailsForAdmin)
router.put("/update/:id", updateOrderStatus)

export default router