import React from 'react';
import { useForm } from 'react-hook-form';
import { useCartStore } from '../store/useCartStore';
import api from '../lib/api';

const Checkout = () => {
  const { items, getTotal, clearCart } = useCartStore();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/orders', {
        items: items.map(i => ({ product: i.product, quantity: i.quantity })),
        shippingAddress: data
      });
      // Redirect to Stripe Checkout
      window.location.href = res.data.checkoutUrl;
    } catch (error) {
      alert('Checkout failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">Address</label>
            <input {...register('address')} required className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-gray-700">City</label>
            <input {...register('city')} required className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-gray-700">Phone</label>
            <input {...register('phone')} required className="w-full border rounded p-2" />
          </div>
          <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold">
            Proceed to Payment (${getTotal().toFixed(2)})
          </button>
        </form>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
        <div className="bg-white p-4 rounded shadow">
          {items.map(item => (
            <div key={item.product} className="flex justify-between py-2 border-b">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-xl mt-4">
            <span>Total</span>
            <span>${getTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
