
'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], totalItems: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error)
      }
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    if (!loading) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart, loading])

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(item => item.id === product._id)
      
      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        const updatedItems = [...prevCart.items]
        updatedItems[existingItemIndex].quantity += quantity
        
        return {
          ...prevCart,
          items: updatedItems,
          totalItems: prevCart.totalItems + quantity
        }
      } else {
        // Item doesn't exist, add new item
        const newItem = {
          id: product._id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.images[0],
          quantity
        }
        
        return {
          ...prevCart,
          items: [...prevCart.items, newItem],
          totalItems: prevCart.totalItems + quantity
        }
      }
    })
  }

  const updateQuantity = (id, quantity) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(item => item.id === id)
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevCart.items]
        const oldQuantity = updatedItems[existingItemIndex].quantity
        updatedItems[existingItemIndex].quantity = quantity
        
        return {
          ...prevCart,
          items: updatedItems,
          totalItems: prevCart.totalItems - oldQuantity + quantity
        }
      }
      
      return prevCart
    })
  }

  const removeFromCart = (id) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.id === id)
      
      if (!existingItem) return prevCart
      
      return {
        ...prevCart,
        items: prevCart.items.filter(item => item.id !== id),
        totalItems: prevCart.totalItems - existingItem.quantity
      }
    })
  }

  const clearCart = () => {
    setCart({ items: [], totalItems: 0 })
  }

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
