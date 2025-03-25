
'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Filter, Loader2, Edit, Trash2, Eye } from 'lucide-react'
import axios from 'axios'
import { Dialog } from '@headlessui/react'
import toast from 'react-hot-toast'
import AdminProductForm from '@/components/admin/AdminProductForm'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [categories, setCategories] = useState([])
  const [confirmDelete, setConfirmDelete] = useState(null)

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      setProducts(response.data)
    } catch (error) {
      toast.error('Failed to fetch products')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
      setCategories(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddNew = () => {
    setCurrentProduct(null)
    setIsModalOpen(true)
  }

  const handleEdit = (product) => {
    setCurrentProduct(product)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`)
      setProducts(products.filter(product => product._id !== id))
      toast.success('Product deleted successfully')
      setConfirmDelete(null)
    } catch (error) {
      toast.error('Failed to delete product')
      console.error(error)
    }
  }

  const handleSave = async (productData, isNew) => {
    try {
      if (isNew) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, productData)
        setProducts([...products, response.data])
        toast.success('Product added successfully')
      } else {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productData._id}`, productData)
        setProducts(products.map(product => product._id === productData._id ? response.data : product))
        toast.success('Product updated successfully')
      }
      setIsModalOpen(false)
    } catch (error) {
      toast.error('Failed to save product')
      console.error(error)
    }
  }

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button 
          onClick={handleAddNew}
          className="btn btn-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Product
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-soft p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </button>
        </div>
        
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
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img 
                            className="h-10 w-10 rounded-md object-cover" 
                            src={product.images[0] || 'https://images.unsplash.com/photo-1595272568891-123402d0fb3b?q=80&w=200'} 
                            alt={product.name} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.category.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.countInStock}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.countInStock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => window.open(`/products/${product.slug}`, '_blank')}
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button 
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => setConfirmDelete(product._id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Product Form Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl bg-white rounded-lg shadow-hard p-6 max-h-[90vh] overflow-y-auto">
            <Dialog.Title className="text-xl font-bold mb-6">
              {currentProduct ? 'Edit Product' : 'Add New Product'}
            </Dialog.Title>
            
            <AdminProductForm 
              product={currentProduct} 
              categories={categories}
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
              Are you sure you want to delete this product? This action cannot be undone.
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
