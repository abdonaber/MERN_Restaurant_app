# API Contracts

## Auth
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh tokens
- `POST /api/v1/auth/logout` - Logout user
- `POST /api/v1/auth/forgot-password` - Send reset email
- `PATCH /api/v1/auth/reset-password/:token` - Reset password

## Products
- `GET /api/v1/products` - List all products (Filter, Search, Pagination)
- `GET /api/v1/products/:id` - Get product details
- `POST /api/v1/products` (Admin) - Create product
- `PATCH /api/v1/products/:id` (Admin) - Update product
- `DELETE /api/v1/products/:id` (Admin) - Delete product

## Categories
- `GET /api/v1/categories` - List categories
- `POST /api/v1/categories` (Admin) - Create category
- `PATCH /api/v1/categories/:id` (Admin) - Update category
- `DELETE /api/v1/categories/:id` (Admin) - Delete category

## Orders
- `GET /api/v1/orders` (Admin/Staff) - List all orders
- `GET /api/v1/orders/my-orders` (Customer) - List user orders
- `GET /api/v1/orders/:id` - Get order details
- `POST /api/v1/orders` - Create new order (Stripe Checkout)
- `PATCH /api/v1/orders/:id/status` (Admin/Staff) - Update order status

## Reviews
- `POST /api/v1/reviews/:productId` - Add review
- `GET /api/v1/reviews/:productId` - Get product reviews
