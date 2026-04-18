import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ShoppingBag, User as UserIcon, LogOut } from 'lucide-react';
import { useAuthStore } from './store/useAuthStore';
import { useCartStore } from './store/useCartStore';

import Menu from './pages/Menu';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  const { user, logout } = useAuthStore();
  const cartItemsCount = useCartStore(state => state.items.length);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
              <Link to="/" className="text-2xl font-bold text-orange-500">FastFeast</Link>

              <div className="flex items-center gap-6">
                <Link to="/cart" className="relative p-2 text-gray-600 hover:text-orange-500 transition">
                  <ShoppingBag size={24} />
                  {cartItemsCount > 0 && (
                    <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>

                {user ? (
                  <div className="flex items-center gap-4">
                    {user.role === 'admin' && (
                      <Link to="/admin/orders" className="text-sm font-semibold hover:text-orange-500">Admin</Link>
                    )}
                    <button onClick={logout} className="p-2 text-gray-600 hover:text-red-500">
                      <LogOut size={22} />
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="flex items-center gap-2 text-gray-600 hover:text-orange-500">
                    <UserIcon size={24} />
                    <span className="font-semibold hidden sm:inline">Login</span>
                  </Link>
                )}
              </div>
            </div>
          </nav>

          <main className="py-8">
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order/:id" element={<OrderTracking />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={['admin', 'staff']} />}>
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
              </Route>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
