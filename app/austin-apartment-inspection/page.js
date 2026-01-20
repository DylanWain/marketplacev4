'use client';
import React from 'react';

export default function AustinApartmentInspectionPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-teal-900 to-teal-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-300 font-medium mb-2">Apartment Inspection Service</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Austin Apartment Inspection</h1>
          <p className="text-xl text-teal-100 mb-6">We inspect Austin apartments for tech workers, relocators, and remote workers.</p>
          <div className="flex gap-4 mb-8">
            <div className="bg-white/10 px-4 py-2 rounded-lg"><span className="text-teal-200 text-sm">Avg Rent</span><p className="font-bold">$1,800</p></div>
            <div className="bg-red-500/20 px-4 py-2 rounded-lg"><span className="text-red-300 text-sm">Scam Rate</span><p className="font-bold text-red-300">8.1%</p></div>
          </div>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl">Book Austin Inspection — $149</a>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">We Cover All Austin Areas</h2>
          <div className="flex flex-wrap gap-3">
            {["Downtown", "East Austin", "South Congress", "Mueller", "Domain", "Hyde Park", "Zilker", "Tarrytown", "Clarksville", "Round Rock"].map((hood, i) => (
              <span key={i} className="bg-gray-100 px-4 py-2 rounded-full">{hood}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-teal-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Moving to Austin?</h2>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl">Book Austin Inspection — $149</a>
        </div>
      </section>
    </div>
  );
}
