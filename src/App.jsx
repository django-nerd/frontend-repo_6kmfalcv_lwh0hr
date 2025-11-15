import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import AuthModal from './components/AuthModal'

const backend = import.meta.env.VITE_BACKEND_URL || ''

export default function App() {
  const [authOpen, setAuthOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${backend}/products`)
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        // seed defaults if backend empty
        setProducts([
          { title: 'Aero Puffer Jacket', description: 'Ultralight warmth with recycled fill.', price: 189, category: 'Outerwear' },
          { title: 'Core Oversized Tee', description: 'Premium heavyweight cotton in relaxed fit.', price: 39, category: 'Tops' },
          { title: 'Flex Joggers', description: '4-way stretch, tapered silhouette.', price: 69, category: 'Bottoms' },
          { title: 'Everyday Hoodie', description: 'Fleece-lined comfort, minimalist logo.', price: 79, category: 'Sweats' },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const onAddToCart = (p) => {
    if (!user) return setAuthOpen(true)
    // Minimal optimistic UX; real add handled on Cart page or future enhancement
    alert(`Added ${p.title} to cart`)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onOpenAuth={() => setAuthOpen(true)} />
      <Hero />

      <main className="relative z-10">
        <section id="shop" className="container mx-auto px-6 sm:px-10 py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Featured</h2>
              <p className="text-gray-600">Elevated essentials curated for everyday performance.</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {(loading ? Array.from({ length: 8 }).map((_, i) => (
                <motion.div key={i} className="h-72 bg-gray-100 rounded-2xl animate-pulse" />
              )) : products.map((p, i) => (
                <ProductCard key={i} product={p} onAdd={onAddToCart} />
              )))}
            </AnimatePresence>
          </div>
        </section>

        <footer className="border-t">
          <div className="container mx-auto px-6 sm:px-10 py-12 grid sm:grid-cols-3 gap-8 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-900">About</h4>
              <p className="mt-2">Minimalist silhouettes. Technical fabrics. Built for motion.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Support</h4>
              <ul className="mt-2 space-y-1">
                <li>Shipping & Returns</li>
                <li>Contact</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Newsletter</h4>
              <div className="mt-2 flex gap-2">
                <input placeholder="Email" className="flex-1 rounded-lg border px-3 py-2" />
                <button className="rounded-lg bg-gray-900 text-white px-4">Join</button>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuth={setUser} />
    </div>
  )
}
