import React from 'react';
import { useCartStore } from '../store/useCartStore';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/" className="text-orange-500 hover:underline">Go to menu</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="bg-white rounded-xl shadow-md p-6">
        {items.map(item => (
          <div key={item.product} className="flex items-center gap-4 py-4 border-b last:border-0">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.product, Math.max(1, item.quantity - 1))}
                className="p-1 border rounded hover:bg-gray-100"
              >
                <Minus size={16} />
              </button>
              <span className="font-bold w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product, item.quantity + 1)}
                className="p-1 border rounded hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={() => removeItem(item.product)}
              className="text-red-500 p-2 hover:bg-red-50 rounded"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}

        <div className="mt-8 pt-6 border-t flex justify-between items-center">
          <div>
            <p className="text-gray-600">Total amount</p>
            <p className="text-3xl font-bold">${getTotal().toFixed(2)}</p>
          </div>
          <Link
            to="/checkout"
            className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-600 transition"
          >
            Checkout <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
