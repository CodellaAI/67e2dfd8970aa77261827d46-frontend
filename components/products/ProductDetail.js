
'use client'

import { useState } from 'react'
import { Star, ShoppingCart, Heart, Truck, ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react'
import { Tab } from '@headlessui/react'
import { useCart } from '@/context/CartContext'
import toast from 'react-hot-toast'

export default function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const { addToCart } = useCart()

  // Fallback product if none is provided
  const fallbackProduct = {
    _id: '1',
    name: 'VaporX Pro',
    slug: 'vaporx-pro',
    description: 'Experience premium vaping with the VaporX Pro, featuring advanced temperature control for a perfect draw every time. This sleek device offers customizable settings, long battery life, and a premium build quality that feels great in your hand.',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1560924311-c99d45ee5eee?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555487505-8603a1a69755?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 124,
    countInStock: 15,
    category: { name: 'Vape Devices', slug: 'vape-devices' },
    specifications: [
      { name: 'Battery Capacity', value: '1500mAh' },
      { name: 'Power Range', value: '5-80W' },
      { name: 'Tank Capacity', value: '4ml' },
      { name: 'Dimensions', value: '120mm x 30mm x 25mm' },
      { name: 'Material', value: 'Zinc Alloy + Stainless Steel' }
    ],
    features: [
      'Temperature Control (TC) Mode',
      'Variable Wattage (VW) Mode',
      'OLED Display Screen',
      'USB-C Fast Charging',
      'Adjustable Airflow Control'
    ]
  }

  const displayProduct = product || fallbackProduct

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value)
    if (value > 0 && value <= displayProduct.countInStock) {
      setQuantity(value)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const incrementQuantity = () => {
    if (quantity < displayProduct.countInStock) {
      setQuantity(quantity + 1)
    }
  }

  const handleAddToCart = () => {
    addToCart(displayProduct, quantity)
    toast.success(`${displayProduct.name} added to cart`)
  }

  const nextImage = () => {
    setActiveImageIndex((activeImageIndex + 1) % displayProduct.images.length)
  }

  const prevImage = () => {
    setActiveImageIndex((activeImageIndex - 1 + displayProduct.images.length) % displayProduct.images.length)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Product Images */}
      <div>
        <div className="relative h-80 sm:h-96 md:h-[500px] rounded-lg overflow-hidden mb-4">
          <img 
            src={displayProduct.images[activeImageIndex]} 
            alt={displayProduct.name} 
            className="w-full h-full object-cover"
          />
          
          {displayProduct.images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-800" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
              >
                <ArrowRight className="w-5 h-5 text-gray-800" />
              </button>
            </>
          )}
        </div>
        
        {displayProduct.images.length > 1 && (
          <div className="flex space-x-2 overflow-x-auto">
            {displayProduct.images.map((image, index) => (
              <button 
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
                  index === activeImageIndex ? 'ring-2 ring-primary-600' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img 
                  src={image} 
                  alt={`${displayProduct.name} - view ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div>
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{displayProduct.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 font-medium">{displayProduct.rating}</span>
            </div>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-600">{displayProduct.reviewCount} reviews</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-600">Category: {displayProduct.category.name}</span>
          </div>
          
          <div className="text-2xl font-bold text-gray-900 mb-4">
            ${displayProduct.price.toFixed(2)}
          </div>
          
          <p className="text-gray-700 mb-6">
            {displayProduct.description}
          </p>
          
          {/* Stock Status */}
          <div className="mb-6">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              displayProduct.countInStock > 0 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {displayProduct.countInStock > 0 
                ? `In Stock (${displayProduct.countInStock} available)` 
                : 'Out of Stock'}
            </div>
          </div>
          
          {/* Add to Cart */}
          {displayProduct.countInStock > 0 && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mr-4">
                  <button 
                    onClick={decrementQuantity}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    min="1" 
                    max={displayProduct.countInStock}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-12 py-2 text-center border-x border-gray-300 focus:outline-none"
                  />
                  <button 
                    onClick={incrementQuantity}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="btn btn-primary flex-1"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
              </div>
              
              <button className="w-full py-3 border border-gray-300 rounded-md flex items-center justify-center text-gray-700 hover:bg-gray-50">
                <Heart className="w-5 h-5 mr-2" />
                Add to Wishlist
              </button>
            </div>
          )}
          
          {/* Benefits */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center text-sm text-gray-600">
              <Truck className="w-5 h-5 mr-3 text-primary-600" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <ShieldCheck className="w-5 h-5 mr-3 text-primary-600" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
          
          {/* Tabs */}
          <Tab.Group>
            <Tab.List className="flex border-b border-gray-200">
              <Tab className={({ selected }) => 
                `py-3 px-4 text-sm font-medium focus:outline-none ${
                  selected 
                    ? 'text-primary-600 border-b-2 border-primary-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`
              }>
                Specifications
              </Tab>
              <Tab className={({ selected }) => 
                `py-3 px-4 text-sm font-medium focus:outline-none ${
                  selected 
                    ? 'text-primary-600 border-b-2 border-primary-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`
              }>
                Features
              </Tab>
            </Tab.List>
            <Tab.Panels className="pt-4">
              <Tab.Panel>
                <ul className="space-y-2">
                  {displayProduct.specifications?.map((spec, index) => (
                    <li key={index} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">{spec.name}</span>
                      <span className="font-medium">{spec.value}</span>
                    </li>
                  ))}
                </ul>
              </Tab.Panel>
              <Tab.Panel>
                <ul className="space-y-2">
                  {displayProduct.features?.map((feature, index) => (
                    <li key={index} className="flex items-start py-2">
                      <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 mr-2"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  )
}
