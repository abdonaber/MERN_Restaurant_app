import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../lib/api';
import io from 'socket.io-client';
import { CheckCircle2, Clock, ChefHat, PackageCheck, Truck } from 'lucide-react';

const socket = io('http://localhost:5000');

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`).then(res => setOrder(res.data));

    socket.emit('joinOrder', id);
    socket.on('orderUpdate', (updatedOrder) => {
      if (updatedOrder._id === id) {
        setOrder(updatedOrder);
      }
    });

    return () => {
      socket.off('orderUpdate');
    };
  }, [id]);

  if (!order) return <div className="text-center py-20">Loading order...</div>;

  const statuses = [
    { name: 'pending', icon: Clock, label: 'Order Placed' },
    { name: 'preparing', icon: ChefHat, label: 'Preparing' },
    { name: 'ready', icon: PackageCheck, label: 'Ready for Pickup' },
    { name: 'delivered', icon: Truck, label: 'Delivered' },
  ];

  const currentIdx = statuses.findIndex(s => s.name === order.status);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Track Your Order</h1>
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 -z-0"></div>
          {statuses.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx <= currentIdx;
            return (
              <div key={step.name} className="flex flex-col items-center z-10">
                <div className={`p-3 rounded-full ${isActive ? 'bg-orange-500 text-white' : 'bg-white border-2 border-gray-100 text-gray-400'}`}>
                  <Icon size={24} />
                </div>
                <span className={`mt-2 text-xs font-bold ${isActive ? 'text-orange-500' : 'text-gray-400'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between border-b pb-4">
            <span className="text-gray-600">Order ID</span>
            <span className="font-mono">{order._id}</span>
          </div>
          <div className="flex justify-between border-b pb-4">
            <span className="text-gray-600">Status</span>
            <span className="font-bold text-orange-500 uppercase">{order.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total</span>
            <span className="font-bold">${order.totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
