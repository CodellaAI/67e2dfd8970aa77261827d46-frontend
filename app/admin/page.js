
'use client'

import { useState, useEffect } from 'react'
import { BarChart3, Users, ShoppingBag, DollarSign, TrendingUp, Package } from 'lucide-react'
import axios from 'axios'
import AdminDashboardCard from '@/components/admin/AdminDashboardCard'
import AdminChart from '@/components/admin/AdminChart'
import AdminRecentOrders from '@/components/admin/AdminRecentOrders'
import AdminTopProducts from '@/components/admin/AdminTopProducts'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    recentOrders: [],
    topProducts: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`)
        setStats(response.data)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminDashboardCard 
          title="Total Sales" 
          value={`$${stats.totalSales.toFixed(2)}`}
          icon={<DollarSign className="w-6 h-6" />}
          trend={"+12.5%"}
          color="bg-blue-500"
        />
        <AdminDashboardCard 
          title="Total Orders" 
          value={stats.totalOrders}
          icon={<ShoppingBag className="w-6 h-6" />}
          trend={"+8.2%"}
          color="bg-purple-500"
        />
        <AdminDashboardCard 
          title="Total Customers" 
          value={stats.totalCustomers}
          icon={<Users className="w-6 h-6" />}
          trend={"+5.1%"}
          color="bg-green-500"
        />
        <AdminDashboardCard 
          title="Total Products" 
          value={stats.totalProducts}
          icon={<Package className="w-6 h-6" />}
          trend={"+3.7%"}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Sales Overview</h2>
            <div className="flex items-center text-sm text-gray-500">
              <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
              <span>+12.5% from last month</span>
            </div>
          </div>
          <AdminChart />
        </div>
        
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h2 className="text-lg font-semibold mb-6">Top Selling Products</h2>
          <AdminTopProducts products={stats.topProducts} />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-soft p-6">
        <h2 className="text-lg font-semibold mb-6">Recent Orders</h2>
        <AdminRecentOrders orders={stats.recentOrders} />
      </div>
    </div>
  )
}
