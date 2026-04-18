# FastFeast - Production Ready Restaurant Management System

FastFeast is a full-stack MERN application for restaurant management, featuring real-time order tracking, Stripe payments, and a comprehensive admin dashboard.

## Features

- **Customer:**
  - Browse menu with search and category filters.
  - Cart system with Zustand.
  - Secure checkout with Stripe.
  - Real-time order status tracking via Socket.io.
- **Admin/Staff:**
  - Product and Category management (CRUD).
  - Image uploads via Cloudinary.
  - Real-time Order Management (Update status).
- **Security:**
  - JWT (Access & Refresh tokens).
  - Role-Based Access Control (RBAC).
  - Rate limiting, Helmet, XSS protection.
  - Zod validation for all requests.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Query, Zustand, Axios, Socket.io-client, Stripe-js.
- **Backend:** Node.js, Express, MongoDB (Mongoose), Redis, Socket.io, Stripe, Cloudinary.
- **DevOps:** Docker, Docker Compose, Nginx.

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js (v20+)

### Installation

1. Clone the repository.
2. Create a `.env` file in the `server` directory based on `docker-compose.yml` environment variables.
3. Run the application:
   ```bash
   docker compose up --build
   ```

## Testing

### Backend
```bash
cd server
npm test
```

### Frontend
```bash
cd client
npm test
```

## Structure
- `/client`: React frontend.
- `/server`: Express backend.
- `/nginx`: Nginx reverse proxy configuration.
- `docker-compose.yml`: Full stack orchestration.
