
import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Vaping Enthusiast',
    content: 'The quality of products from VaporVista is exceptional. I\'ve been using their devices for over a year now, and the performance is consistently reliable. Their customer service is also top-notch!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Samantha Lee',
    role: 'Cloud Chaser',
    content: 'As someone who\'s tried many different vape shops, I can confidently say that VaporVista stands out. Their e-liquid flavors are unique and the vapor production from their devices is impressive.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Michael Torres',
    role: 'Casual Vaper',
    content: 'I was new to vaping and the team at VaporVista helped me find the perfect starter kit. The guidance they provided made my transition smooth, and I\'ve been a loyal customer ever since.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  }
]

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers about their experiences with VaporVista
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 rounded-lg p-6 shadow-soft">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img 
                    className="h-12 w-12 rounded-full object-cover" 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-700">{testimonial.content}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to elevate your vaping experience?</h3>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made VaporVista their go-to destination for premium vaping products.
          </p>
          <a href="/products" className="btn bg-white text-primary-700 hover:bg-gray-100">
            Shop Now
          </a>
        </div>
      </div>
    </section>
  )
}
