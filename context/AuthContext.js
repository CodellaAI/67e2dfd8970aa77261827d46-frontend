
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      const token = Cookies.get('token')
      
      if (token) {
        try {
          // Set default auth header for all requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          // Fetch user data
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`)
          setUser(response.data)
        } catch (error) {
          console.error('Authentication error:', error)
          Cookies.remove('token')
          delete axios.defaults.headers.common['Authorization']
        }
      }
      
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
      email,
      password
    })
    
    const { token, user } = response.data
    
    // Save token to cookies
    Cookies.set('token', token, { expires: 7 }) // Expires in 7 days
    
    // Set default auth header for all requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
    setUser(user)
    return user
  }

  const register = async (name, email, password) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, {
      name,
      email,
      password
    })
    
    const { token, user } = response.data
    
    // Save token to cookies
    Cookies.set('token', token, { expires: 7 }) // Expires in 7 days
    
    // Set default auth header for all requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
    setUser(user)
    return user
  }

  const logout = () => {
    // Remove token from cookies
    Cookies.remove('token')
    
    // Remove auth header
    delete axios.defaults.headers.common['Authorization']
    
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
