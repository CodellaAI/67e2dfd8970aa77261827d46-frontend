
import Link from 'next/link'

const categories = [
  {
    id: 1,
    name: 'Vape Devices',
    description: 'High-performance devices for every vaping style',
    image: 'https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?q=80&w=600&auto=format&fit=crop',
    slug: 'vape-devices'
  },
  {
    id: 2,
    name: 'E-Liquids',
    description: 'Premium flavors to satisfy every palate',
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=600&auto=format&fit=crop',
    slug: 'e-liquids'
  },
  {
    id: 3,
    name: 'Accessories',
    description: 'Essential add-ons to complete your experience',
    image: 'https://images.unsplash.com/photo-1567703665000-ba26a14c3726?q=80&w=600&auto=format&fit=crop',
    slug: 'accessories'
  }
]

export default function Categories() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of premium vaping products designed for the modern enthusiast
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.slug}`}>
              <div className="group relative h-80 overflow-hidden rounded-xl card">
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all z-10"></div>
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 text-white">
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm text-white/90 mb-4">{category.description}</p>
                  <span className="inline-flex items-center text-sm font-medium">
                    Shop Now
                    <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
