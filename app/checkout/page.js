
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import OrderSummary from '@/components/checkout/OrderSummary'
import { useCart } from '@/context/CartContext'
import { Loader2 } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, loading } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !loading && cart.items.length === 0) {
      router.push('/cart')
    }
  }, [mounted, loading, cart, router])

  if (!mounted || loading || cart.items.length === 0) {
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
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
