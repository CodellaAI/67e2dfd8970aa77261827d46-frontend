
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Loader2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder')

export default function CheckoutForm() {
  const router = useRouter()
  const { cart } = useCart()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (cart.items.length === 0) {
      toast.error('Your cart is empty')
      return
    }
    
    setLoading(true)
    
    try {
      // Create a Stripe checkout session
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout`, {
        items: cart.items,
        shippingAddress: formData
      })
      
      const stripe = await stripePromise
      
      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id
      })
      
      if (result.error) {
        toast.error(result.error.message)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error('Failed to process checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-soft p-6">
      <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State / Province
            </label>
            <input
              id="state"
              name="state"
              type="text"
              value={formData.state}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
              ZIP / Postal Code
            </label>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              value={formData.postalCode}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
            </select>
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Continue to Payment'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
