
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import Categories from '@/components/home/Categories'
import Testimonials from '@/components/home/Testimonials'
import Newsletter from '@/components/home/Newsletter'
import BenefitsSection from '@/components/home/BenefitsSection'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <BenefitsSection />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  )
}
