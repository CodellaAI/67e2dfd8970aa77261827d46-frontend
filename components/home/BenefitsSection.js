
import { ShieldCheck, Truck, RefreshCw, HeadsetMic } from 'lucide-react'

const benefits = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary-600" />,
    title: 'Premium Quality',
    description: 'All our products are carefully selected and tested to ensure the highest quality standards.'
  },
  {
    icon: <Truck className="w-10 h-10 text-primary-600" />,
    title: 'Fast Shipping',
    description: 'Get your orders quickly with our expedited shipping options across the country.'
  },
  {
    icon: <RefreshCw className="w-10 h-10 text-primary-600" />,
    title: '30-Day Returns',
    description: 'Not satisfied? Return your unused products within 30 days for a full refund.'
  },
  {
    icon: <HeadsetMic className="w-10 h-10 text-primary-600" />,
    title: '24/7 Support',
    description: 'Our customer service team is always ready to assist you with any questions.'
  }
]

export default function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose VaporVista?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best vaping experience with premium products and exceptional service
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-medium transition-shadow">
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
