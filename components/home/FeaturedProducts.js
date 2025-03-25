
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/featured`)
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  // Fallback products if API fails
  const fallbackProducts = [
    {
      _id: '1',
      name: 'VaporX Pro',
      slug: 'vaporx-pro',
      description: 'Premium vaping device with advanced temperature control',
      price: 89.99,
      images: ['https://images.unsplash.com/photo-1560924311-c99d45ee5eee?q=80&w=500&auto=format&fit=crop'],
      rating: 4.8,
      reviewCount: 124,
      countInStock: 15
    },
    {
      _id: '2',
      name: 'CloudChaser Elite',
      slug: 'cloudchaser-elite',
      description: 'High-performance vape for maximum cloud production',
      price: 79.99,
      images: ['https://images.unsplash.com/photo-1555487505-8603a1a69755?q=80&w=500&auto=format&fit=crop'],
      rating: 4.6,
      reviewCount: 98,
      countInStock: 8
    },
    {
      _id: '3',
      name: 'Berry Blast E-Liquid',
      slug: 'berry-blast-e-liquid',
      description: 'Rich berry flavor with smooth throat hit',
      price: 24.99,
      images: ['https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=500&auto=format&fit=crop'],
      rating: 4.9,
      reviewCount: 156,
      countInStock: 22
    },
    {
      _id: '4',
      name: 'PocketVape Mini',
      slug: 'pocketvape-mini',
      description: 'Compact and discreet vaping device for on-the-go',
      price: 49.99,
      images: ['https://images.unsplash.com/photo-1567703665000-ba26a14c3726?q=80&w=500&auto=format&fit=crop'],
      rating: 4.7,
      reviewCount: 87,
      countInStock: 12
    }
  ]

  const displayProducts = products.length > 0 ? products : fallbackProducts

  const handleAddToCart = (product) => {
    addToCart(product)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular vaping products, hand-selected for quality and performance
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((product) => (
            <div key={product._id} className="bg-white rounded-lg overflow-hidden shadow-soft group">
              <div className="relative h-64 overflow-hidden">
                <Link href={`/products/${product.slug}`}>
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <button 
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
                
                {product.countInStock === 0 && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded">
                    Out of Stock
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{product.reviewCount} reviews</span>
                </div>
                
                <h3 className="text-lg font-semibold mb-1">
                  <Link href={`/products/${product.slug}`} className="hover:text-primary-600 transition-colors">
                    {product.name}
                  </Link>
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  
                  <button 
                    onClick={() => handleAddToCart(product)}
                    disabled={product.countInStock === 0}
                    className={`flex items-center p-2 rounded-full ${
                      product.countInStock > 0 
                        ? 'bg-primary-600 text-white hover:bg-primary-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    } transition-colors`}
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/products" className="btn btn-primary">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
