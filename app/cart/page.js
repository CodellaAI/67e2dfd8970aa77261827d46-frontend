
'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartItems from '@/components/cart/CartItems'
import CartSummary from '@/components/cart/CartSummary'
import { useCart } from '@/context/CartContext'
import { Loader2 } from 'lucide-react'

export default function CartPage() {
  const { cart, loading } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
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
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
          </div>
        ) : cart.items.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-medium text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <a href="/products" className="btn btn-primary">Browse Products</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartItems />
            </div>
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
