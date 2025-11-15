import { useState } from 'react'
import { Menu, ShoppingCart, User, Search } from 'lucide-react'

export default function Navbar({ onOpenAuth }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 left-0 right-0 z-30">
      <div className="backdrop-blur-md bg-white/60 border-b border-white/30">
        <div className="container mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="sm:hidden" onClick={() => setOpen(!open)}>
              <Menu className="w-6 h-6" />
            </button>
            <a href="/" className="font-extrabold tracking-tight text-gray-900 text-xl">FLAMÉ</a>
          </div>

          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-700">
            <a href="#collections" className="hover:text-gray-900">Collections</a>
            <a href="#new" className="hover:text-gray-900">New</a>
            <a href="#men" className="hover:text-gray-900">Men</a>
            <a href="#women" className="hover:text-gray-900">Women</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700">
              <Search className="w-4 h-4" />
              <span className="text-sm">Search</span>
            </button>
            <a href="#cart" className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs w-5 h-5 rounded-full grid place-items-center">2</span>
            </a>
            <button onClick={onOpenAuth} className="rounded-full bg-gray-900 text-white p-2 hover:opacity-90">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="sm:hidden bg-white border-b">
          <nav className="px-6 py-3 flex flex-col gap-2 text-gray-700">
            <a href="#collections" className="py-2">Collections</a>
            <a href="#new" className="py-2">New</a>
            <a href="#men" className="py-2">Men</a>
            <a href="#women" className="py-2">Women</a>
          </nav>
        </div>
      )}
    </header>
  )
}
