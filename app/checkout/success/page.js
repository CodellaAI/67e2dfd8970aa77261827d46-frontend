
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Check, ArrowRight, Loader2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import axios from 'axios'

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    
    if (sessionId) {
      // Fetch order details from backend
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/session/${sessionId}`)
        .then(res => {
          setOrder(res.data)
          clearCart()
          setLoading(false)
        })
        .catch(err => {
          console.error(err)
          setLoading(false)
        })
    } else {
      router.push('/')
    }
  }, [searchParams, clearCart, router])

  if (loading) {
    return (
      <>
        <Header />
        <div className="container-custom py-16 min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-3 rounded-full">
              <Check className="w-12 h-12 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
          <p className="text-gray-600 mb-8">Your order has been placed successfully and is now being processed.</p>
          
          {order && (
            <div className="bg-white p-6 rounded-lg shadow-soft mb-8">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="border-t border-b border-gray-200 py-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-medium">{order._id.slice(-8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="mb-4">
                {order.items.map((item) => (
                  <div key={item.product._id} className="flex justify-between py-2">
                    <span>{item.quantity} × {item.product.name}</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-center gap-4">
            <a href="/" className="btn btn-secondary">
              Return to Home
            </a>
            <a href="/products" className="btn btn-primary">
              Continue Shopping
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
