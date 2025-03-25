
'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      setEmail('')
    }, 1000)
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-soft overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay in the loop</h2>
                <p className="text-gray-600 mb-6">
                  Subscribe to our newsletter and be the first to know about new products, special offers, and vaping tips.
                </p>
                
                {isSubmitted ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Thanks for subscribing!</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="sr-only">Email address</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                        placeholder="Enter your email"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn btn-primary w-full"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Subscribing...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <Send className="w-4 h-4 mr-2" />
                          Subscribe
                        </span>
                      )}
                    </button>
                    <p className="text-xs text-gray-500">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                )}
              </div>
            </div>
            
            <div className="hidden md:block relative">
              <img 
                src="https://images.unsplash.com/photo-1560749003-f4b1e17e2dff?q=80&w=600&auto=format&fit=crop" 
                alt="Vaping lifestyle" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
