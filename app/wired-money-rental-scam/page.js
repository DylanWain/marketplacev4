'use client';
import React from 'react';

export default function WiredMoneyRentalScamPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-red-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-600 text-sm font-bold px-4 py-2 rounded mb-4 inline-block animate-pulse">
            🚨 EMERGENCY - ACT NOW
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Already Wired Money for a Rental. Did I Get Scammed?
          </h1>
          <p className="text-xl text-red-100 mb-6">
            Don't panic yet. Let's find out what you're dealing with.
          </p>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg">
            Emergency Verification — $149
          </a>
        </div>
      </section>

      <section className="py-8 px-4 bg-yellow-50 border-b-4 border-yellow-400">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-yellow-900 mb-4">DO THIS RIGHT NOW:</h2>
          <ol className="space-y-3">
            {[
              { step: "Contact your bank IMMEDIATELY", detail: "Wire transfers can sometimes be stopped if caught within hours. Call now." },
              { step: "Document everything", detail: "Screenshot all communications, listing photos, emails. You'll need this." },
              { step: "Don't send any more money", detail: "No matter what they say. Stop all payments now." },
              { step: "Let us verify", detail: "We'll check if the property/landlord is real. You need to know what you're dealing with." }
            ].map((item, i) => (
              <li key={i} className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
                <span className="font-bold text-gray-900">{i+1}. {item.step}</span>
                <p className="text-gray-600 text-sm mt-1">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">What We Might Find:</h2>
          <div className="space-y-4">
            {[
              { outcome: "It's Legit", desc: "Great news! Property exists, landlord is real. You're fine. Breathe.", color: "green" },
              { outcome: "It's a Scam", desc: "Property doesn't exist or landlord is fake. Contact bank, file police report, we provide documentation.", color: "red" },
              { outcome: "It's Sketchy", desc: "Something's off but not clearly a scam. May need to investigate further.", color: "yellow" }
            ].map((item, i) => (
              <div key={i} className={`p-4 rounded-lg border-l-4 ${item.color === 'green' ? 'border-green-500 bg-green-50' : item.color === 'red' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'}`}>
                <h3 className="font-bold">{item.outcome}</h3>
                <p className="text-sm text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-xl border">
            <p className="text-xl text-gray-700 italic mb-4">
              "Wired $2,800 to a 'landlord' in Brooklyn. Immediately felt sick. Called DibbyTour. They confirmed the property existed but the 'landlord' wasn't the owner. Contacted bank - they stopped the transfer. I was 3 hours from losing everything."
            </p>
            <p className="font-bold">Michelle P.</p>
            <p className="text-green-600">Saved: $2,800 + identity protection</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Time Is Critical.</h2>
          <p className="text-gray-300 mb-8">The sooner you know, the better your chances of recovery.</p>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl">
            Emergency Verification — $149
          </a>
        </div>
      </section>
    </div>
  );
}
