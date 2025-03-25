
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Vapor Vista - Premium Vaping Products',
  description: 'Shop the latest and most premium vaping products at Vapor Vista. High-quality vapes, e-liquids, and accessories.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster position="top-center" />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
