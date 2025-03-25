
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ShoppingCart, User, Search, ChevronDown } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { Popover } from '@headlessui/react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { cart } = useCart()
  const { user, logout } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => {
    return pathname === path
  }

  // Don't render header on admin pages
  if (pathname.startsWith('/admin')) {
    return null
  }

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${
      isScrolled ? 'bg-white shadow-soft' : 'bg-white/80 backdrop-blur-md'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-primary-600">Vapor<span className="text-secondary-600">Vista</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-sm font-medium ${isActive('/') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
            >
              Home
            </Link>
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button className={`flex items-center text-sm font-medium ${isActive('/products') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}>
                    Products
                    <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
                  </Popover.Button>
                  <Popover.Panel className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-medium overflow-hidden">
                    <div className="py-1">
                      <Link href="/products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        All Products
                      </Link>
                      <Link href="/products?category=vape-devices" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Vape Devices
                      </Link>
                      <Link href="/products?category=e-liquids" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        E-Liquids
                      </Link>
                      <Link href="/products?category=accessories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Accessories
                      </Link>
                    </div>
                  </Popover.Panel>
                </>
              )}
            </Popover>
            <Link 
              href="/about" 
              className={`text-sm font-medium ${isActive('/about') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`text-sm font-medium ${isActive('/contact') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
            >
              Contact
            </Link>
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-primary-600">
              <Search className="w-5 h-5" />
            </button>
            
            <Link href="/cart" className="relative text-gray-700 hover:text-primary-600">
              <ShoppingCart className="w-5 h-5" />
              {mounted && cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.items.length}
                </span>
              )}
            </Link>
            
            {mounted && user ? (
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button className="text-gray-700 hover:text-primary-600">
                      <User className="w-5 h-5" />
                    </Popover.Button>
                    <Popover.Panel className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-medium overflow-hidden">
                      <div className="py-1">
                        <div className="px-4 py-2 text-sm font-medium text-gray-900 border-b">
                          {user.name}
                        </div>
                        <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          My Account
                        </Link>
                        <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          Orders
                        </Link>
                        {user.isAdmin && (
                          <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            Admin Dashboard
                          </Link>
                        )}
                        <button 
                          onClick={logout} 
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                        >
                          Logout
                        </button>
                      </div>
                    </Popover.Panel>
                  </>
                )}
              </Popover>
            ) : (
              <Link 
                href="/login" 
                className="text-gray-700 hover:text-primary-600"
              >
                <User className="w-5 h-5" />
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container-custom py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className={`text-base font-medium ${isActive('/') ? 'text-primary-600' : 'text-gray-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className={`text-base font-medium ${isActive('/products') ? 'text-primary-600' : 'text-gray-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                href="/about" 
                className={`text-base font-medium ${isActive('/about') ? 'text-primary-600' : 'text-gray-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className={`text-base font-medium ${isActive('/contact') ? 'text-primary-600' : 'text-gray-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
            
            <div className="flex items-center justify-between pt-4 border-t">
              <Link 
                href="/cart" 
                className="flex items-center text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                <span>Cart ({mounted ? cart.items.length : 0})</span>
              </Link>
              
              {mounted && user ? (
                <button 
                  onClick={logout}
                  className="text-red-600"
                >
                  Logout
                </button>
              ) : (
                <Link 
                  href="/login" 
                  className="flex items-center text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5 mr-2" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
