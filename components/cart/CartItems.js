
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CartItems() {
  const { cart, updateQuantity, removeFromCart } = useCart()
  const [loading, setLoading] = useState({})

  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity < 1) return
    
    setLoading(prev => ({ ...prev, [id]: true }))
    
    try {
      await updateQuantity(id, newQuantity)
    } finally {
      setLoading(prev => ({ ...prev, [id]: false }))
    }
  }

  const handleRemove = async (id) => {
    setLoading(prev => ({ ...prev, [id]: true }))
    
    try {
      await removeFromCart(id)
    } finally {
      setLoading(prev => ({ ...prev, [id]: false }))
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-soft p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
        <Link href="/products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-soft overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Your Cart ({cart.items.length} items)</h2>
        
        <div className="space-y-6">
          {cart.items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row border-b border-gray-200 pb-6">
              <div className="sm:w-24 sm:h-24 h-32 w-full relative mb-4 sm:mb-0">
                <Image 
                  src={item.image || 'https://images.unsplash.com/photo-1555487505-8603a1a69755?q=80&w=200&auto=format&fit=crop'} 
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              
              <div className="flex-1 sm:ml-6 flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-lg font-medium">
                    <Link href={`/products/${item.slug}`} className="hover:text-primary-600">
                      {item.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)} each</p>
                </div>
                
                <div className="flex items-center justify-between sm:w-auto w-full">
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={loading[item.id] || item.quantity <= 1}
                      className="px-2 py-1 bg-gray-100 hover:bg-gray-200 focus:outline-none disabled:opacity-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center py-1">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      disabled={loading[item.id]}
                      className="px-2 py-1 bg-gray-100 hover:bg-gray-200 focus:outline-none disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="ml-6 flex items-center">
                    <span className="font-semibold mr-4 sm:inline hidden">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button 
                      onClick={() => handleRemove(item.id)}
                      disabled={loading[item.id]}
                      className="text-gray-500 hover:text-red-600 focus:outline-none"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
