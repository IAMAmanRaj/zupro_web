import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { FiSend, FiMail, FiCheckCircle, FiLoader } from 'react-icons/fi'

export const Route = createFileRoute('/contact-us/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [form, setForm] = useState({ email: '', query: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [errors, setErrors] = useState({ email: '', query: '' })

  function validate() {
    const e = { email: '', query: '' }
    if (!form.email) e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.'
    if (!form.query.trim()) e.query = 'Please describe your query.'
    return e
  }

  async function handleSubmit() {
    const e = validate()
    if (e.email || e.query) { setErrors(e); return }
    setErrors({ email: '', query: '' })
    setStatus('loading')
    // Simulated API call
    await new Promise((r) => setTimeout(r, 1800))
    setStatus('success')
  }

  function handleReset() {
    setForm({ email: '', query: '' })
    setStatus('idle')
  }

  return (
    <section className="min-h-screen bg-white flex flex-col items-center justify-center px-5 py-20 pt-10 md:pt-4">

      {/* ── Header ── */}
      <div className="text-center mb-10">
        <h1 className="sora-bold text-[#1e1b4b] text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
          Contact Us
        </h1>
        <p className="text-[#6B7280] cascadia-mono-light text-[15px] max-w-[380px] leading-relaxed">
          Have a question or need help? Send us a message and we'll get back to you shortly.
        </p>
      </div>

      {/* ── Card ── */}
      <div className="w-full max-w-[520px] bg-white rounded-2xl border border-[#e8eaf6] shadow-[0_4px_32px_rgba(63,81,181,0.08)] px-8 py-10">

        {status === 'success' ? (
          /* Success state */
          <div className="flex flex-col items-center text-center py-6 gap-4">
            <FiCheckCircle size={52} className="text-[#3F51B5]" strokeWidth={1.5} />
            <h2 className="sora-bold text-[#1e1b4b] text-xl font-black">Message Sent!</h2>
            <p className="text-[#6B7280] text-sm max-w-[280px] leading-relaxed">
              Thanks for reaching out. We'll respond to <span className="font-semibold text-[#1e1b4b]">{form.email}</span> soon.
            </p>
            <button
              onClick={handleReset}
              className="mt-2 hover:cursor-pointer text-sm font-semibold text-[#3F51B5] underline underline-offset-4 hover:opacity-70 transition-opacity"
            >
              Send another message
            </button>
          </div>
        ) : (
          /* Form */
          <div className="flex flex-col gap-6">

            {/* Email field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs dosis-semibold font-semibold text-[#374151] tracking-wide uppercase">
                Your Email
              </label>
              <div className={`flex items-center gap-3 border rounded-xl px-4 py-3 transition-all bg-[#fafafa] ${errors.email ? 'border-red-400' : 'border-[#e8eaf6] focus-within:border-[#3F51B5] focus-within:shadow-[0_0_0_3px_rgba(63,81,181,0.10)]'}`}>
                <FiMail size={16} className="text-[#9CA3AF] flex-shrink-0" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="flex-1 dosis-semibold bg-transparent text-[#111827] text-sm outline-none placeholder-[#9CA3AF]"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            {/* Query field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs dosis-semibold  text-[#374151] tracking-wide uppercase">
                Your Query
              </label>
              <div className={`border rounded-xl px-4 py-3 transition-all bg-[#fafafa] ${errors.query ? 'border-red-400' : 'border-[#e8eaf6] focus-within:border-[#3F51B5] focus-within:shadow-[0_0_0_3px_rgba(63,81,181,0.10)]'}`}>
                <textarea
                  rows={5}
                  placeholder="Describe your query in detail..."
                  value={form.query}
                  onChange={(e) => setForm((f) => ({ ...f, query: e.target.value }))}
                  className="zupro-scroll dosis-semibold w-full bg-transparent text-[#111827] text-sm outline-none placeholder-[#9CA3AF] resize-none leading-relaxed overflow-y-auto"
                />
              </div>
              {errors.query && <p className="text-red-500 text-xs">{errors.query}</p>}
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={status === 'loading'}
              className="w-full flex dosis-semibold hover:cursor-pointer items-center justify-center gap-2.5 py-3.5 rounded-xl text-white font-semibold text-[15px] transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
              style={{ background: '#3F51B5', boxShadow: '0 8px 24px rgba(63, 81, 181, 0.28)' }}
            >
              {status === 'loading' ? (
                <>
                  <FiLoader size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <FiSend size={15} />
                  Send Message
                </>
              )}
            </button>

          </div>
        )}
      </div>

     

    </section>
  )
}