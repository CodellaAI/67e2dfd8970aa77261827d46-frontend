
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductsGrid from '@/components/products/ProductsGrid'
import ProductFilters from '@/components/products/ProductFilters'
import { getAllProducts, getAllCategories } from '@/lib/api'

export default async function ProductsPage() {
  // In a real app, these would be fetched server-side
  const products = await getAllProducts()
  const categories = await getAllCategories()

  return (
    <>
      <Header />
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProductFilters categories={categories} />
          </div>
          <div className="lg:col-span-3">
            <ProductsGrid products={products} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
