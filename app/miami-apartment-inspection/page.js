'use client';
import React from 'react';

export default function MiamiApartmentInspectionPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-pink-900 to-pink-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-pink-300 font-medium mb-2">Apartment Inspection Service</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Miami Apartment Inspection</h1>
          <p className="text-xl text-pink-100 mb-6">We inspect Miami apartments and condos. Coverage from Brickell to Miami Beach.</p>
          <div className="flex gap-4 mb-8">
            <div className="bg-white/10 px-4 py-2 rounded-lg"><span className="text-pink-200 text-sm">Avg Rent</span><p className="font-bold">$2,600</p></div>
            <div className="bg-red-500/20 px-4 py-2 rounded-lg"><span className="text-red-300 text-sm">Scam Rate</span><p className="font-bold text-red-300">9.1%</p></div>
          </div>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl">Book Miami Inspection — $149</a>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">We Cover All Miami Areas</h2>
          <div className="flex flex-wrap gap-3">
            {["Brickell", "Miami Beach", "Wynwood", "Coral Gables", "Coconut Grove", "Downtown", "Edgewater", "Little Havana", "Design District", "Aventura"].map((hood, i) => (
              <span key={i} className="bg-gray-100 px-4 py-2 rounded-full">{hood}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-pink-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Moving to Miami?</h2>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl">Book Miami Inspection — $149</a>
        </div>
      </section>
    </div>
  );
}
