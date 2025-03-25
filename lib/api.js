
import axios from 'axios'

// Helper function to fetch data from the API
const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api${endpoint}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error)
    return null
  }
}

// Products
export async function getAllProducts() {
  return fetchData('/products')
}

export async function getProductBySlug(slug) {
  return fetchData(`/products/slug/${slug}`)
}

export async function getRelatedProducts(categoryId, productId) {
  return fetchData(`/products/related/${categoryId}/${productId}`)
}

// Categories
export async function getAllCategories() {
  return fetchData('/categories')
}

export async function getCategoryBySlug(slug) {
  return fetchData(`/categories/slug/${slug}`)
}

// Orders
export async function getOrderById(id) {
  return fetchData(`/orders/${id}`)
}

export async function getUserOrders() {
  return fetchData('/orders/user')
}

// Fallback functions if API fails
export function getFallbackProducts() {
  return [
    {
      _id: '1',
      name: 'VaporX Pro',
      slug: 'vaporx-pro',
      description: 'Premium vaping device with advanced temperature control',
      price: 89.99,
      images: ['https://images.unsplash.com/photo-1560924311-c99d45ee5eee?q=80&w=500&auto=format&fit=crop'],
      rating: 4.8,
      reviewCount: 124,
      countInStock: 15,
      category: { _id: '1', name: 'Vape Devices', slug: 'vape-devices' }
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
      countInStock: 8,
      category: { _id: '1', name: 'Vape Devices', slug: 'vape-devices' }
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
      countInStock: 22,
      category: { _id: '2', name: 'E-Liquids', slug: 'e-liquids' }
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
      countInStock: 12,
      category: { _id: '1', name: 'Vape Devices', slug: 'vape-devices' }
    }
  ]
}

export function getFallbackCategories() {
  return [
    { _id: '1', name: 'Vape Devices', slug: 'vape-devices', count: 24 },
    { _id: '2', name: 'E-Liquids', slug: 'e-liquids', count: 38 },
    { _id: '3', name: 'Accessories', slug: 'accessories', count: 15 }
  ]
}
