'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SubscribePage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black">
      <header className="border-b border-white/10 py-4 px-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <span className="font-bold text-xl">DibbyTour</span>
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black mb-4">
            Never Get Scammed.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Period.
            </span>
          </h1>
          <p className="text-zinc-400 text-lg">
            Real humans verify listings, check sellers, and inspect items in person.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="bg-white/5 border-2 border-orange-500/50 rounded-2xl p-8 mb-12">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">DibbyTour Pro</h2>
              <p className="text-zinc-500">Everything you need to buy safely</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-black text-orange-400">$30</span>
              <span className="text-zinc-500">/mo</span>
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            {[
              { title: 'Unlimited AI Scam Checks', desc: 'Check every listing you find' },
              { title: '5 Human Expert Reviews/month', desc: 'Real person deep-dives any listing' },
              { title: '2 In-Person Inspections/month', desc: 'We send someone to see it for you' },
              { title: 'Seller Verification', desc: 'We verify identity and ownership' },
              { title: 'Direct Text/Call Support', desc: 'Message us when you\'re unsure' },
              { title: 'Scam Recovery Help', desc: 'We help you fight back if scammed' },
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-green-500 text-lg">✓</span>
                <div>
                  <strong>{item.title}</strong>
                  <p className="text-sm text-zinc-500">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-black/50 border border-white/20 rounded-xl mb-3 focus:border-orange-500 focus:outline-none"
                required
              />
              <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-bold text-lg hover:opacity-90 transition">
                Start 7-Day Free Trial →
              </button>
              <p className="text-center text-xs text-zinc-600 mt-3">
                No credit card required. Cancel anytime.
              </p>
            </form>
          ) : (
            <div className="text-center p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
              <span className="text-4xl">🎉</span>
              <h3 className="font-bold text-lg mt-3 mb-2">You're on the list!</h3>
              <p className="text-sm text-zinc-400">We'll email you when Pro launches.</p>
            </div>
          )}
        </div>

        {/* Cost Comparison */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
            <div className="text-2xl font-black text-red-400">$4,800</div>
            <p className="text-xs text-zinc-500">Avg car scam loss</p>
          </div>
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
            <div className="text-2xl font-black text-red-400">$2,400</div>
            <p className="text-xs text-zinc-500">Avg rental scam loss</p>
          </div>
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
            <div className="text-2xl font-black text-green-400">$30</div>
            <p className="text-xs text-zinc-500">DibbyTour Pro</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Questions</h2>
          {[
            { q: 'What if I only need one inspection?', a: 'The free checklist works great for DIY. Pro is for people actively shopping who want human backup.' },
            { q: 'How fast are inspections?', a: 'Expert reviews: 2 hours. In-person inspections: same or next day in most areas.' },
            { q: 'Can I cancel anytime?', a: 'Yes. One click, no questions. You keep access until your billing period ends.' },
          ].map((faq, i) => (
            <details key={i} className="bg-white/5 border border-white/10 rounded-xl">
              <summary className="p-4 cursor-pointer font-medium">{faq.q}</summary>
              <p className="px-4 pb-4 text-sm text-zinc-400">{faq.a}</p>
            </details>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/" className="text-zinc-500 hover:text-white transition">
            ← Back to free checklist
          </Link>
        </div>
      </main>
    </div>
  );
}
