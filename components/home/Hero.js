
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 to-primary-700 text-white">
      <div className="absolute inset-0 bg-pattern opacity-5"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16 md:py-24">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Elevate Your <span className="text-secondary-400">Vaping</span> Experience
            </h1>
            
            <p className="text-lg md:text-xl text-primary-100 max-w-lg mx-auto md:mx-0">
              Discover premium vaping devices and e-liquids crafted for the modern enthusiast. Quality meets style.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/products" className="btn bg-white text-primary-800 hover:bg-gray-100">
                Shop Collection
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/about" className="btn bg-transparent border border-white text-white hover:bg-white/10">
                Learn More
              </Link>
            </div>
            
            <div className="pt-4 flex items-center justify-center md:justify-start space-x-8">
              <div className="flex items-center">
                <div className="text-secondary-400 font-bold text-2xl mr-2">100+</div>
                <div className="text-sm text-primary-100">Products</div>
              </div>
              <div className="flex items-center">
                <div className="text-secondary-400 font-bold text-2xl mr-2">5K+</div>
                <div className="text-sm text-primary-100">Happy Customers</div>
              </div>
              <div className="flex items-center">
                <div className="text-secondary-400 font-bold text-2xl mr-2">24/7</div>
                <div className="text-sm text-primary-100">Support</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=800&auto=format&fit=crop" 
                alt="Premium Vape Device" 
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-secondary-500 rounded-full filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-primary-400 rounded-full filter blur-3xl opacity-20"></div>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  )
}
