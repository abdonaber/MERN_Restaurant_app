const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['customer', 'staff', 'admin']).optional()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  category: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Category ID'),
  stock: z.number().nonnegative().optional()
});

const categorySchema = z.object({
  name: z.string().min(2),
  description: z.string().optional()
});

module.exports = {
  registerSchema,
  loginSchema,
  productSchema,
  categorySchema
};
