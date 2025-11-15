import { motion } from 'framer-motion'

export default function ProductCard({ product, onAdd }) {
  return (
    <motion.div layout whileHover={{ y: -4 }} className="group bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100" />
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-gray-900">{product.title}</h3>
          <span className="font-semibold">${product.price}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
        <button onClick={() => onAdd(product)} className="mt-3 w-full rounded-lg bg-gray-900 text-white py-2 text-sm font-medium hover:opacity-90">Add to cart</button>
      </div>
    </motion.div>
  )
}
