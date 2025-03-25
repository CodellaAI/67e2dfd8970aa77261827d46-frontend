
'use client'

import { useState, useEffect } from 'react'
import { Plus, Loader2, Edit, Trash2 } from 'lucide-react'
import axios from 'axios'
import { Dialog } from '@headlessui/react'
import toast from 'react-hot-toast'
import AdminCategoryForm from '@/components/admin/AdminCategoryForm'

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
      setCategories(response.data)
    } catch (error) {
      toast.error('Failed to fetch categories')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddNew = () => {
    setCurrentCategory(null)
    setIsModalOpen(true)
  }

  const handleEdit = (category) => {
    setCurrentCategory(category)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`)
      setCategories(categories.filter(category => category._id !== id))
      toast.success('Category deleted successfully')
      setConfirmDelete(null)
    } catch (error) {
      toast.error('Failed to delete category')
      console.error(error)
    }
  }

  const handleSave = async (categoryData, isNew) => {
    try {
      if (isNew) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, categoryData)
        setCategories([...categories, response.data])
        toast.success('Category added successfully')
      } else {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categoryData._id}`, categoryData)
        setCategories(categories.map(category => category._id === categoryData._id ? response.data : category))
        toast.success('Category updated successfully')
      }
      setIsModalOpen(false)
    } catch (error) {
      toast.error('Failed to save category')
      console.error(error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button 
          onClick={handleAddNew}
          className="btn btn-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Category
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-soft p-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {category.image && (
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              className="h-10 w-10 rounded-md object-cover" 
                              src={category.image} 
                              alt={category.name} 
                            />
                          </div>
                        )}
                        <div className={category.image ? "ml-4" : ""}>
                          <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{category.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 truncate max-w-xs">{category.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => handleEdit(category)}
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => setConfirmDelete(category._id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {categories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No categories found</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Category Form Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg shadow-hard p-6">
            <Dialog.Title className="text-xl font-bold mb-6">
              {currentCategory ? 'Edit Category' : 'Add New Category'}
            </Dialog.Title>
            
            <AdminCategoryForm 
              category={currentCategory} 
              onSave={handleSave}
              onCancel={() => setIsModalOpen(false)}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
      
      {/* Delete Confirmation Modal */}
      <Dialog
        open={confirmDelete !== null}
        onClose={() => setConfirmDelete(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg shadow-hard p-6">
            <Dialog.Title className="text-xl font-bold mb-4">
              Confirm Deletion
            </Dialog.Title>
            
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this category? This action cannot be undone.
            </p>
            
            <div className="flex justify-end gap-4">
              <button
                className="btn btn-secondary"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
              <button
                className="btn bg-red-600 hover:bg-red-700 text-white"
                onClick={() => handleDelete(confirmDelete)}
              >
                Delete
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
