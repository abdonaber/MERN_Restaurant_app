const express = require('express');
const { getSalesReport } = require('../controllers/reportController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/sales', protect, authorize('admin'), getSalesReport);

module.exports = router;
