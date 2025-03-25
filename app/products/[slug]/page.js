
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductDetail from '@/components/products/ProductDetail'
import RelatedProducts from '@/components/products/RelatedProducts'
import { getProductBySlug, getRelatedProducts } from '@/lib/api'

export default async function ProductPage({ params }) {
  const { slug } = params
  
  // In a real app, these would be fetched server-side
  const product = await getProductBySlug(slug)
  const relatedProducts = await getRelatedProducts(product.category, product._id)

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <>
      <Header />
      <div className="container-custom py-12">
        <ProductDetail product={product} />
      </div>
      
      <div className="bg-gray-50 py-16">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-8">You might also like</h2>
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
      
      <Footer />
    </>
  )
}
