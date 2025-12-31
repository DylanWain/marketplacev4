'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Icons = {
  Check: () => (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  CreditCard: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  ),
  User: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  Document: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  ArrowLeft: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  ),
}

export default function ConfirmationPage() {
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    setOrderId(`DT-${Date.now().toString(36).toUpperCase()}`)
  }, [])

  const steps = [
    { icon: Icons.Mail, title: 'Check your email', desc: 'We sent a confirmation with your secure payment link.' },
    { icon: Icons.CreditCard, title: 'Complete payment', desc: 'Click the Stripe link to pay securely.' },
    { icon: Icons.User, title: 'Inspector assigned', desc: 'We\'ll match you with a local within 24 hours.' },
    { icon: Icons.Document, title: 'Get your report', desc: 'Full inspection delivered in 24-48 hours.' },
  ]

  return (
    <div className="min-h-screen gradient-hero">
      <header className="bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <img src="/images/dibby-dog.png" alt="DibbyTour" className="w-12 h-12" />
              <span className="text-2xl font-bold text-white">DibbyTour</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="w-24 h-24 rounded-3xl bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-8 text-green-400">
            <Icons.Check />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">You're all set!</h1>
          <p className="text-gray-400">Order #{orderId}</p>
        </div>

        <div className="card-dark p-8 lg:p-10 mb-8">
          <h2 className="text-xl font-bold text-white mb-8">What happens next</h2>
          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-5">
                <div className="icon-box flex-shrink-0">
                  <step.icon />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-5 bg-dibby-yellow/10 border border-dibby-yellow/20 mb-8">
          <p className="font-medium text-white mb-1">Pro tip</p>
          <p className="text-sm text-gray-400">Reply to our email with any specific things you want checked — we'll make sure our inspector covers them!</p>
        </div>

        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-medium transition-colors">
            <Icons.ArrowLeft />
            Back to Home
          </Link>
        </div>
      </main>

      {/* Gradient orbs */}
      <div className="fixed top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  )
}
