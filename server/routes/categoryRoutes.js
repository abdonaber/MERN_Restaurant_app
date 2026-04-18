const express = require('express');
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { categorySchema } = require('../utils/validators');
const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(protect, authorize('admin'), validate(categorySchema), createCategory);

router.route('/:id')
  .patch(protect, authorize('admin'), validate(categorySchema), updateCategory)
  .delete(protect, authorize('admin'), deleteCategory);

module.exports = router;
