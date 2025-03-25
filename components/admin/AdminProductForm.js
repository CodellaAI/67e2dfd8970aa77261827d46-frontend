
'use client'

import { useState, useEffect } from 'react'
import { Loader2, Upload, X } from 'lucide-react'

export default function AdminProductForm({ product, categories, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: 0,
    countInStock: 0,
    category: '',
    images: [],
    features: [],
    specifications: []
  })
  
  const [loading, setLoading] = useState(false)
  const [newFeature, setNewFeature] = useState('')
  const [newSpecName, setNewSpecName] = useState('')
  const [newSpecValue, setNewSpecValue] = useState('')

  useEffect(() => {
    if (product) {
      setFormData({
        _id: product._id,
        name: product.name || '',
        slug: product.slug || '',
        description: product.description || '',
        price: product.price || 0,
        countInStock: product.countInStock || 0,
        category: product.category?._id || product.category || '',
        images: product.images || [],
        features: product.features || [],
        specifications: product.specifications || []
      })
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'name' && !product) {
      // Auto-generate slug from name for new products
      const slug = value.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
      
      setFormData({
        ...formData,
        name: value,
        slug
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleNumberChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: parseFloat(value)
    })
  }

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()]
      })
      setNewFeature('')
    }
  }

  const handleRemoveFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    })
  }

  const handleAddSpecification = () => {
    if (newSpecName.trim() && newSpecValue.trim()) {
      setFormData({
        ...formData,
        specifications: [...formData.specifications, { name: newSpecName.trim(), value: newSpecValue.trim() }]
      })
      setNewSpecName('')
      setNewSpecValue('')
    }
  }

  const handleRemoveSpecification = (index) => {
    setFormData({
      ...formData,
      specifications: formData.specifications.filter((_, i) => i !== index)
    })
  }

  const handleAddImage = (e) => {
    // In a real application, this would upload the image to a server
    // For this example, we'll just add a placeholder URL
    setFormData({
      ...formData,
      images: [...formData.images, 'https://images.unsplash.com/photo-1595272568891-123402d0fb3b?q=80&w=500']
    })
  }

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await onSave(formData, !product)
    } catch (error) {
      console.error('Error saving product:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
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
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            value={formData.slug}
            onChange={handleChange}
            className="input"
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Used in the URL, e.g., /products/your-slug
          </p>
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="input"
            required
          ></textarea>
        </div>
        
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price ($)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleNumberChange}
            className="input"
            required
          />
        </div>
        
        <div>
          <label htmlFor="countInStock" className="block text-sm font-medium text-gray-700 mb-1">
            Stock Quantity
          </label>
          <input
            id="countInStock"
            name="countInStock"
            type="number"
            min="0"
            step="1"
            value={formData.countInStock}
            onChange={handleNumberChange}
            className="input"
            required
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Images
        </label>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {formData.images.map((image, index) => (
            <div key={index} className="relative group">
              <img 
                src={image} 
                alt={`Product image ${index + 1}`} 
                className="w-full h-32 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          
          <button
            type="button"
            onClick={handleAddImage}
            className="w-full h-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
          >
            <Upload className="w-6 h-6 mb-2" />
            <span className="text-sm">Add Image</span>
          </button>
        </div>
      </div>
      
      {/* Features */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Features
        </label>
        
        <div className="space-y-2 mb-4">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <span className="flex-1 bg-gray-50 py-2 px-3 rounded-md">{feature}</span>
              <button
                type="button"
                onClick={() => handleRemoveFeature(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Add a feature"
            className="input flex-1"
          />
          <button
            type="button"
            onClick={handleAddFeature}
            className="ml-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Add
          </button>
        </div>
      </div>
      
      {/* Specifications */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Specifications
        </label>
        
        <div className="space-y-2 mb-4">
          {formData.specifications.map((spec, index) => (
            <div key={index} className="flex items-center">
              <span className="w-1/3 bg-gray-50 py-2 px-3 rounded-l-md">{spec.name}</span>
              <span className="flex-1 bg-gray-50 py-2 px-3 rounded-r-md">{spec.value}</span>
              <button
                type="button"
                onClick={() => handleRemoveSpecification(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex">
          <input
            type="text"
            value={newSpecName}
            onChange={(e) => setNewSpecName(e.target.value)}
            placeholder="Specification name"
            className="input w-1/3"
          />
          <input
            type="text"
            value={newSpecValue}
            onChange={(e) => setNewSpecValue(e.target.value)}
            placeholder="Specification value"
            className="input flex-1 ml-2"
          />
          <button
            type="button"
            onClick={handleAddSpecification}
            className="ml-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Add
          </button>
        </div>
      </div>
      
      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Product'
          )}
        </button>
      </div>
    </form>
  )
}
