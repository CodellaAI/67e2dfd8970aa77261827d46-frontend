
'use client'

import { useState, useEffect } from 'react'
import { Loader2, Upload, X } from 'lucide-react'

export default function AdminCategoryForm({ category, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: ''
  })
  
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (category) {
      setFormData({
        _id: category._id,
        name: category.name || '',
        slug: category.slug || '',
        description: category.description || '',
        image: category.image || ''
      })
    }
  }, [category])

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'name' && !category) {
      // Auto-generate slug from name for new categories
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

  const handleAddImage = (e) => {
    // In a real application, this would upload the image to a server
    // For this example, we'll just add a placeholder URL
    setFormData({
      ...formData,
      image: 'https://images.unsplash.com/photo-1595272568891-123402d0fb3b?q=80&w=500'
    })
  }

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      image: ''
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await onSave(formData, !category)
    } catch (error) {
      console.error('Error saving category:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Category Name
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
          Used in the URL, e.g., /products?category=your-slug
        </p>
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="input"
        ></textarea>
      </div>
      
      {/* Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category Image
        </label>
        
        {formData.image ? (
          <div className="relative group w-full h-48 mb-4">
            <img 
              src={formData.image} 
              alt={formData.name} 
              className="w-full h-full object-cover rounded-md"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAddImage}
            className="w-full h-48 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors mb-4"
          >
            <Upload className="w-6 h-6 mb-2" />
            <span className="text-sm">Add Image</span>
          </button>
        )}
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
            'Save Category'
          )}
        </button>
      </div>
    </form>
  )
}
