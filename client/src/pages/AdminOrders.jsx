import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

const AdminOrders = () => {
  const queryClient = useQueryClient();
  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: () => api.get('/orders').then(res => res.data)
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => api.patch(`/orders/${id}/status`, { status }),
    onSuccess: () => queryClient.invalidateQueries(['admin-orders'])
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-bold">Order #{order._id.slice(-6)}</p>
              <p className="text-sm text-gray-600">{order.customer?.name} - {order.items.length} items</p>
              <p className="text-sm font-semibold">${order.totalPrice}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-xs ${
                order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {order.status.toUpperCase()}
              </span>
              <select
                value={order.status}
                onChange={(e) => statusMutation.mutate({ id: order._id, status: e.target.value })}
                className="border rounded p-1"
              >
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
