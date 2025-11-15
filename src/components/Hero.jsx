import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full h-[86vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/IKzHtP5ThSO83edK/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-white/0" />
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight">
              Elevate your style.
              <br />
              Shop the latest fits.
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-white/80">
              Discover premium streetwear and essentials designed for comfort and performance.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="#shop" className="inline-flex items-center px-6 py-3 rounded-full bg-white text-gray-900 font-semibold shadow-lg hover:shadow-xl transition">
                Shop Now
              </a>
              <a href="#collections" className="inline-flex items-center px-6 py-3 rounded-full bg-transparent border border-white/60 text-white hover:bg-white/10 transition">
                Explore Collections
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
