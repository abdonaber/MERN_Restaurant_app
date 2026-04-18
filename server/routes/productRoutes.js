const express = require('express');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { productSchema } = require('../utils/validators');
const { upload } = require('../utils/cloudinary');
const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, authorize('admin'), upload.single('image'), validate(productSchema), createProduct);

router.route('/:id')
  .get(getProduct)
  .patch(protect, authorize('admin'), upload.single('image'), validate(productSchema), updateProduct)
  .delete(protect, authorize('admin'), deleteProduct);

module.exports = router;
