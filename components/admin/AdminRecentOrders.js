
import { formatDate } from '@/lib/utils'

export default function AdminRecentOrders({ orders = [] }) {
  // Fallback orders if none are provided
  const fallbackOrders = [
    {
      _id: '1',
      orderNumber: 'ORD12345',
      user: { name: 'John Smith', email: 'john@example.com' },
      total: 129.99,
      status: 'processing',
      createdAt: '2023-11-15T10:30:00Z'
    },
    {
      _id: '2',
      orderNumber: 'ORD12346',
      user: { name: 'Sarah Johnson', email: 'sarah@example.com' },
      total: 89.95,
      status: 'shipped',
      createdAt: '2023-11-14T16:45:00Z'
    },
    {
      _id: '3',
      orderNumber: 'ORD12347',
      user: { name: 'Michael Brown', email: 'michael@example.com' },
      total: 215.50,
      status: 'delivered',
      createdAt: '2023-11-13T09:15:00Z'
    },
    {
      _id: '4',
      orderNumber: 'ORD12348',
      user: { name: 'Emily Davis', email: 'emily@example.com' },
      total: 45.99,
      status: 'pending',
      createdAt: '2023-11-12T14:20:00Z'
    },
    {
      _id: '5',
      orderNumber: 'ORD12349',
      user: { name: 'Robert Wilson', email: 'robert@example.com' },
      total: 175.25,
      status: 'processing',
      createdAt: '2023-11-11T11:10:00Z'
    }
  ]

  const displayOrders = orders.length > 0 ? orders : fallbackOrders

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayOrders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {order.orderNumber || order._id.slice(-6).toUpperCase()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{order.user.name}</div>
                <div className="text-sm text-gray-500">{order.user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{formatDate(order.createdAt)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href={`/admin/orders/${order._id}`} className="text-indigo-600 hover:text-indigo-900">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
