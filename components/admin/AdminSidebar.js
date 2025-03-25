
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  Tag, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  ChevronDown, 
  Menu, 
  X 
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function AdminSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: Tag },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  const isActive = (path) => {
    return pathname === path
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-0 left-0 z-40 w-full bg-white md:hidden">
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <Link href="/admin" className="flex items-center">
            <span className="text-xl font-bold text-primary-600">Vapor<span className="text-secondary-600">Vista</span></span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-gray-900 bg-opacity-50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-64 bg-white" onClick={e => e.stopPropagation()}>
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-3 text-sm font-medium rounded-md ${
                      isActive(item.href)
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="p-4 border-t">
                <button
                  onClick={logout}
                  className="flex items-center w-full px-3 py-3 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-1 min-h-0 bg-white border-r">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b">
            <Link href="/admin" className="flex items-center">
              <span className="text-xl font-bold text-primary-600">Vapor<span className="text-secondary-600">Vista</span></span>
            </Link>
          </div>
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="flex-1 px-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-3 text-sm font-medium rounded-md ${
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t p-4">
            <button
              onClick={logout}
              className="flex items-center w-full px-3 py-3 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
