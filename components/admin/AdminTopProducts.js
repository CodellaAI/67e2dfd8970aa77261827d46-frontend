
import Image from 'next/image'

export default function AdminTopProducts({ products = [] }) {
  // Fallback products if none are provided
  const fallbackProducts = [
    {
      _id: '1',
      name: 'VaporX Pro',
      image: 'https://images.unsplash.com/photo-1560924311-c99d45ee5eee?q=80&w=100&auto=format&fit=crop',
      price: 89.99,
      soldCount: 124
    },
    {
      _id: '2',
      name: 'CloudChaser Elite',
      image: 'https://images.unsplash.com/photo-1555487505-8603a1a69755?q=80&w=100&auto=format&fit=crop',
      price: 79.99,
      soldCount: 98
    },
    {
      _id: '3',
      name: 'Berry Blast E-Liquid',
      image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=100&auto=format&fit=crop',
      price: 24.99,
      soldCount: 156
    },
    {
      _id: '4',
      name: 'PocketVape Mini',
      image: 'https://images.unsplash.com/photo-1567703665000-ba26a14c3726?q=80&w=100&auto=format&fit=crop',
      price: 49.99,
      soldCount: 87
    }
  ]

  const displayProducts = products.length > 0 ? products : fallbackProducts

  return (
    <div className="space-y-4">
      {displayProducts.map((product) => (
        <div key={product._id} className="flex items-center p-3 rounded-lg hover:bg-gray-50">
          <div className="w-12 h-12 relative flex-shrink-0">
            <Image 
              src={product.image} 
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <div className="ml-4 flex-1">
            <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
            <p className="text-xs text-gray-500">${product.price.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <span className="text-sm font-semibold text-gray-900">{product.soldCount}</span>
            <p className="text-xs text-gray-500">sold</p>
          </div>
        </div>
      ))}
    </div>
  )
}
