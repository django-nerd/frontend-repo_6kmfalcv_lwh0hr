import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AuthModal({ open, onClose, onAuth }) {
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const backend = import.meta.env.VITE_BACKEND_URL || ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const url = mode === 'login' ? `${backend}/auth/login` : `${backend}/auth/signup`
      const payload = mode === 'login' ? { email: form.email, password: form.password } : { name: form.name, email: form.email, password: form.password }
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error('Auth failed')
      const data = await res.json()
      onAuth(data)
      onClose()
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-40 grid place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.div className="relative z-10 w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex rounded-full bg-gray-100 p-1">
                  <button onClick={() => setMode('login')} className={`px-4 py-1.5 text-sm rounded-full ${mode==='login'?'bg-white shadow':'text-gray-600'}`}>Login</button>
                  <button onClick={() => setMode('signup')} className={`px-4 py-1.5 text-sm rounded-full ${mode==='signup'?'bg-white shadow':'text-gray-600'}`}>Sign up</button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {mode === 'signup' && (
                  <div>
                    <label className="text-sm text-gray-700">Name</label>
                    <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="Your name" />
                  </div>
                )}
                <div>
                  <label className="text-sm text-gray-700">Email</label>
                  <input required type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Password</label>
                  <input required type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="••••••••" />
                </div>
                <button disabled={loading} className="w-full mt-2 rounded-lg bg-gray-900 text-white py-2.5 font-semibold hover:opacity-90">
                  {loading ? 'Please wait…' : (mode === 'login' ? 'Login' : 'Create account')}
                </button>
              </form>

              <p className="mt-4 text-xs text-gray-500">
                By continuing, you agree to our Terms and acknowledge the Privacy Policy.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
