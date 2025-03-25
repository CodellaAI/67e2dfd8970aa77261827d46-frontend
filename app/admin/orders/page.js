
'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Loader2, Eye, Calendar, Package, X } from 'lucide-react'
import axios from 'axios'
import { Dialog } from '@headlessui/react'
import toast from 'react-hot-toast'
import { formatDate } from '@/lib/utils'

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewOrder, setViewOrder] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`)
      setOrders(response.data)
    } catch (error) {
      toast.error('Failed to fetch orders')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}/status`, { status })
      
      // Update local state
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status } : order
      ))
      
      // If we're viewing this order, update the view too
      if (viewOrder && viewOrder._id === orderId) {
        setViewOrder({ ...viewOrder, status })
      }
      
      toast.success('Order status updated')
    } catch (error) {
      toast.error('Failed to update order status')
      console.error(error)
    }
  }

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

  const filteredOrders = orders.filter(order => {
    // Filter by status
    if (filterStatus !== 'all' && order.status !== filterStatus) {
      return false;
    }
    
    // Filter by search term
    const searchString = (
      order._id +
      order.user.name +
      order.user.email +
      order.shippingAddress.address +
      order.shippingAddress.city
    ).toLowerCase();
    
    return searchString.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>
      
      <div className="bg-white rounded-lg shadow-soft p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-600">Status:</span>
            <select 
              className="input py-2 pl-3 pr-10"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
          </div>
        ) : (
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
                    Total
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
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{order._id.slice(-8).toUpperCase()}</div>
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
                      <div className="text-xs text-gray-500">{order.items.length} items</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => setViewOrder(order)}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No orders found</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Order Details Modal */}
      <Dialog
        open={viewOrder !== null}
        onClose={() => setViewOrder(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-3xl bg-white rounded-lg shadow-hard p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <Dialog.Title className="text-xl font-bold">
                Order Details
              </Dialog.Title>
              <button onClick={() => setViewOrder(null)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {viewOrder && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pb-4 border-b">
                  <div>
                    <h3 className="text-lg font-semibold">Order #{viewOrder._id.slice(-8).toUpperCase()}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDate(viewOrder.createdAt)}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-start md:items-end">
                    <div className="flex items-center mb-2">
                      <span className="text-sm text-gray-600 mr-2">Status:</span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(viewOrder.status)}`}>
                        {viewOrder.status.charAt(0).toUpperCase() + viewOrder.status.slice(1)}
                      </span>
                    </div>
                    
                    <select 
                      className="input py-1 pl-3 pr-8 text-sm"
                      value={viewOrder.status}
                      onChange={(e) => updateOrderStatus(viewOrder._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Customer Information</h4>
                    <p className="text-sm">{viewOrder.user.name}</p>
                    <p className="text-sm">{viewOrder.user.email}</p>
                    <p className="text-sm">{viewOrder.shippingAddress.phone}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Shipping Address</h4>
                    <p className="text-sm">{viewOrder.shippingAddress.address}</p>
                    <p className="text-sm">
                      {viewOrder.shippingAddress.city}, {viewOrder.shippingAddress.state} {viewOrder.shippingAddress.postalCode}
                    </p>
                    <p className="text-sm">{viewOrder.shippingAddress.country}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Order Items</h4>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {viewOrder.items.map((item) => (
                          <tr key={item._id}>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img 
                                    className="h-10 w-10 rounded-md object-cover" 
                                    src={item.product.images[0] || 'https://images.unsplash.com/photo-1595272568891-123402d0fb3b?q=80&w=200'} 
                                    alt={item.product.name} 
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{item.product.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{item.quantity}</div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">
                              <div className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${viewOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${viewOrder.shippingPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${viewOrder.taxPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>${viewOrder.total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => setViewOrder(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
