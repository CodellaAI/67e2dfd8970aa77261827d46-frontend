
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bell, Search, User } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Popover } from '@headlessui/react'

export default function AdminHeader() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality
    console.log('Searching for:', searchTerm)
  }

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Search */}
          <div className="flex-1 min-w-0 md:ml-64">
            <form onSubmit={handleSearch} className="max-w-lg">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Right side - User menu & notifications */}
          <div className="flex items-center">
            {/* View Store button */}
            <Link
              href="/"
              className="hidden md:inline-flex mr-4 items-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-primary-300 focus:shadow-outline-primary active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
              target="_blank"
            >
              View Store
            </Link>

            {/* Notifications */}
            <Popover className="relative ml-4">
              <Popover.Button className="flex items-center text-gray-400 hover:text-gray-500 focus:outline-none">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </Popover.Button>
              <Popover.Panel className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <div className="px-4 py-2 border-b border-gray-100 hover:bg-gray-50">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <ShoppingBag className="w-4 h-4 text-primary-600" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">New order received</p>
                        <p className="text-xs text-gray-500">Order #12345 - 5 minutes ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2 border-b border-gray-100 hover:bg-gray-50">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Low stock alert</p>
                        <p className="text-xs text-gray-500">VaporX Pro - 2 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 text-center text-sm text-primary-600 hover:text-primary-500">
                  <a href="#">View all notifications</a>
                </div>
              </Popover.Panel>
            </Popover>

            {/* User menu */}
            <Popover className="relative ml-4">
              <Popover.Button className="flex items-center text-gray-400 hover:text-gray-500 focus:outline-none">
                <span className="sr-only">Open user menu</span>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary-600" />
                  </div>
                  <span className="hidden md:flex ml-2 text-sm font-medium text-gray-700">
                    {user?.name || 'Admin'}
                  </span>
                </div>
              </Popover.Button>
              <Popover.Panel className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Link href="/admin/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Your Profile
                </Link>
                <Link href="/admin/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </Link>
                <button
                  onClick={() => logout()}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </Popover.Panel>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  )
}

// These components are only used within AdminHeader.js
const ShoppingBag = (props) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  )
}

const AlertCircle = (props) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  )
}
