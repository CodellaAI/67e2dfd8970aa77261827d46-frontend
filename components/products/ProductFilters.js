
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Slider } from '@headlessui/react'
import { ChevronDown, X } from 'lucide-react'

export default function ProductFilters({ categories }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [priceRange, setPriceRange] = useState([0, 200])
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    ratings: true
  })

  // Get current filters from URL
  const currentCategory = searchParams.get('category') || ''
  const currentRating = searchParams.get('rating') || ''

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    })
  }

  const handleCategoryChange = (slug) => {
    const params = new URLSearchParams(searchParams)
    
    if (slug === currentCategory) {
      params.delete('category')
    } else {
      params.set('category', slug)
    }
    
    router.push(`/products?${params.toString()}`)
  }

  const handleRatingChange = (rating) => {
    const params = new URLSearchParams(searchParams)
    
    if (rating === currentRating) {
      params.delete('rating')
    } else {
      params.set('rating', rating)
    }
    
    router.push(`/products?${params.toString()}`)
  }

  const handlePriceChange = () => {
    const params = new URLSearchParams(searchParams)
    params.set('minPrice', priceRange[0])
    params.set('maxPrice', priceRange[1])
    
    router.push(`/products?${params.toString()}`)
  }

  const clearAllFilters = () => {
    router.push('/products')
    setPriceRange([0, 200])
  }

  // Fallback categories if none are provided
  const fallbackCategories = [
    { _id: '1', name: 'Vape Devices', slug: 'vape-devices', count: 24 },
    { _id: '2', name: 'E-Liquids', slug: 'e-liquids', count: 38 },
    { _id: '3', name: 'Accessories', slug: 'accessories', count: 15 },
    { _id: '4', name: 'Starter Kits', slug: 'starter-kits', count: 10 },
    { _id: '5', name: 'Disposables', slug: 'disposables', count: 12 }
  ]

  const displayCategories = categories?.length > 0 ? categories : fallbackCategories

  const hasActiveFilters = currentCategory || currentRating || searchParams.has('minPrice')

  return (
    <div className="bg-white rounded-lg shadow-soft p-5">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <button 
            onClick={clearAllFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center"
          >
            <X className="w-4 h-4 mr-1" />
            Clear All
          </button>
        )}
      </div>
      
      {/* Categories */}
      <div className="mb-6 border-b pb-6">
        <button 
          className="flex justify-between items-center w-full text-left mb-3"
          onClick={() => toggleSection('categories')}
        >
          <h4 className="text-base font-medium">Categories</h4>
          <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`} />
        </button>
        
        {expandedSections.categories && (
          <div className="space-y-2">
            {displayCategories.map((category) => (
              <div key={category._id} className="flex items-center">
                <input
                  id={`category-${category.slug}`}
                  name="category"
                  type="checkbox"
                  checked={category.slug === currentCategory}
                  onChange={() => handleCategoryChange(category.slug)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label 
                  htmlFor={`category-${category.slug}`} 
                  className="ml-2 text-sm text-gray-700 flex justify-between w-full"
                >
                  <span>{category.name}</span>
                  <span className="text-gray-500">({category.count})</span>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Price Range */}
      <div className="mb-6 border-b pb-6">
        <button 
          className="flex justify-between items-center w-full text-left mb-3"
          onClick={() => toggleSection('price')}
        >
          <h4 className="text-base font-medium">Price Range</h4>
          <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
        </button>
        
        {expandedSections.price && (
          <div className="px-2">
            <div className="mb-4">
              <Slider
                value={priceRange}
                onChange={setPriceRange}
                min={0}
                max={200}
                step={5}
              >
                <div className="relative h-1 bg-gray-200 rounded-full">
                  <div 
                    className="absolute h-full bg-primary-600 rounded-full" 
                    style={{ 
                      left: `${(priceRange[0] / 200) * 100}%`, 
                      width: `${((priceRange[1] - priceRange[0]) / 200) * 100}%` 
                    }}
                  ></div>
                  <Slider.Thumb className="w-4 h-4 bg-white border border-primary-600 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2" />
                  <Slider.Thumb className="w-4 h-4 bg-white border border-primary-600 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2" />
                </div>
              </Slider>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-100 rounded px-3 py-1">
                <span className="text-sm font-medium">${priceRange[0]}</span>
              </div>
              <div className="bg-gray-100 rounded px-3 py-1">
                <span className="text-sm font-medium">${priceRange[1]}</span>
              </div>
            </div>
            
            <button 
              onClick={handlePriceChange}
              className="w-full py-2 text-sm font-medium text-white bg-primary-600 rounded hover:bg-primary-700"
            >
              Apply
            </button>
          </div>
        )}
      </div>
      
      {/* Ratings */}
      <div className="mb-6">
        <button 
          className="flex justify-between items-center w-full text-left mb-3"
          onClick={() => toggleSection('ratings')}
        >
          <h4 className="text-base font-medium">Ratings</h4>
          <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.ratings ? 'rotate-180' : ''}`} />
        </button>
        
        {expandedSections.ratings && (
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <input
                  id={`rating-${rating}`}
                  name="rating"
                  type="checkbox"
                  checked={currentRating === rating.toString()}
                  onChange={() => handleRatingChange(rating.toString())}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-700 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1">{rating === 1 ? '& Up' : ''}</span>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
