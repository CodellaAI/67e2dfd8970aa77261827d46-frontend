
'use client'

import { useState, useEffect } from 'react'
import { Loader2, Save } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    storeName: '',
    storeEmail: '',
    storePhone: '',
    storeAddress: '',
    shipping: {
      freeShippingThreshold: 0,
      standardShippingRate: 0
    },
    tax: {
      rate: 0,
      includeShipping: false
    }
  })
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/settings`)
      setSettings(response.data)
    } catch (error) {
      toast.error('Failed to fetch settings')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setSettings({
        ...settings,
        [parent]: {
          ...settings[parent],
          [child]: type === 'checkbox' ? checked : Number(value)
        }
      })
    } else {
      setSettings({
        ...settings,
        [name]: value
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/settings`, settings)
      toast.success('Settings saved successfully')
    } catch (error) {
      toast.error('Failed to save settings')
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Store Settings</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h2 className="text-lg font-semibold mb-4">General Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-1">
                Store Name
              </label>
              <input
                id="storeName"
                name="storeName"
                type="text"
                value={settings.storeName}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            
            <div>
              <label htmlFor="storeEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Store Email
              </label>
              <input
                id="storeEmail"
                name="storeEmail"
                type="email"
                value={settings.storeEmail}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            
            <div>
              <label htmlFor="storePhone" className="block text-sm font-medium text-gray-700 mb-1">
                Store Phone
              </label>
              <input
                id="storePhone"
                name="storePhone"
                type="tel"
                value={settings.storePhone}
                onChange={handleChange}
                className="input"
              />
            </div>
            
            <div>
              <label htmlFor="storeAddress" className="block text-sm font-medium text-gray-700 mb-1">
                Store Address
              </label>
              <textarea
                id="storeAddress"
                name="storeAddress"
                value={settings.storeAddress}
                onChange={handleChange}
                className="input"
                rows={3}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h2 className="text-lg font-semibold mb-4">Shipping Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="shipping.freeShippingThreshold" className="block text-sm font-medium text-gray-700 mb-1">
                Free Shipping Threshold ($)
              </label>
              <input
                id="shipping.freeShippingThreshold"
                name="shipping.freeShippingThreshold"
                type="number"
                min="0"
                step="0.01"
                value={settings.shipping.freeShippingThreshold}
                onChange={handleChange}
                className="input"
              />
              <p className="mt-1 text-xs text-gray-500">
                Set to 0 to disable free shipping
              </p>
            </div>
            
            <div>
              <label htmlFor="shipping.standardShippingRate" className="block text-sm font-medium text-gray-700 mb-1">
                Standard Shipping Rate ($)
              </label>
              <input
                id="shipping.standardShippingRate"
                name="shipping.standardShippingRate"
                type="number"
                min="0"
                step="0.01"
                value={settings.shipping.standardShippingRate}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h2 className="text-lg font-semibold mb-4">Tax Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="tax.rate" className="block text-sm font-medium text-gray-700 mb-1">
                Tax Rate (%)
              </label>
              <input
                id="tax.rate"
                name="tax.rate"
                type="number"
                min="0"
                step="0.01"
                value={settings.tax.rate}
                onChange={handleChange}
                className="input"
              />
            </div>
            
            <div className="flex items-center h-full pt-6">
              <input
                id="tax.includeShipping"
                name="tax.includeShipping"
                type="checkbox"
                checked={settings.tax.includeShipping}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="tax.includeShipping" className="ml-2 block text-sm text-gray-700">
                Apply tax to shipping cost
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
