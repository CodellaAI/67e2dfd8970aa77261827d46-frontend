
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingBag, CreditCard } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CartSummary() {
  const router = useRouter()
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
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="h-px bg-gray-200 my-4"></div>
        
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      <button 
        onClick={() => router.push('/checkout')}
        disabled={cart.items.length === 0}
        className="btn btn-primary w-full mb-4"
      >
        <CreditCard className="w-5 h-5 mr-2" />
        Proceed to Checkout
      </button>
      
      <button 
        onClick={() => router.push('/products')}
        className="btn btn-secondary w-full"
      >
        <ShoppingBag className="w-5 h-5 mr-2" />
        Continue Shopping
      </button>
      
      <div className="mt-6 text-xs text-gray-500">
        <p>Free shipping on orders over $50</p>
        <p className="mt-1">Taxes calculated at checkout</p>
      </div>
    </div>
  )
}
