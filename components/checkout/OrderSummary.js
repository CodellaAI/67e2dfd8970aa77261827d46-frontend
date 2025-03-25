
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

export default function OrderSummary() {
  const { cart } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="bg-white rounded-lg shadow-soft p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded mt-6"></div>
      </div>
    )
  }

  // Calculate subtotal
  const subtotal = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  
  // Calculate shipping
  const shipping = subtotal > 50 ? 0 : 5.99
  
  // Calculate tax (assuming 7% tax rate)
  const taxRate = 0.07
  const tax = subtotal * taxRate
  
  // Calculate total
  const total = subtotal + shipping + tax

  return (
    <div className="bg-white rounded-lg shadow-soft p-6 sticky top-24">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
      
      <div className="max-h-64 overflow-y-auto mb-6">
        {cart.items.map((item) => (
          <div key={item.id} className="flex py-3 border-b border-gray-100">
            <div className="w-16 h-16 relative flex-shrink-0">
              <Image 
                src={item.image || 'https://images.unsplash.com/photo-1555487505-8603a1a69755?q=80&w=100&auto=format&fit=crop'} 
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            
            <div className="ml-4 flex-1">
              <h4 className="text-sm font-medium">{item.name}</h4>
              <p className="text-xs text-gray-500 mt-1">${item.price.toFixed(2)} each</p>
            </div>
            
            <div className="text-right">
              <span className="text-sm font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-3 pt-2 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="h-px bg-gray-200 my-3"></div>
        
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="mt-6 text-xs text-gray-500">
        <p>Free shipping on orders over $50</p>
        <p className="mt-1">Taxes calculated based on shipping address</p>
      </div>
    </div>
  )
}
