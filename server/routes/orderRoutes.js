const express = require('express');
const { createOrder, getOrders, getMyOrders, getOrder, updateOrderStatus } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, authorize('admin', 'staff'), getOrders)
  .post(protect, createOrder);

router.get('/my-orders', protect, getMyOrders);

router.route('/:id')
  .get(protect, getOrder)
  .patch(protect, authorize('admin', 'staff'), updateOrderStatus);

module.exports = router;
