'use client';
import React from 'react';

export default function LAApartmentInspectionPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-orange-900 to-orange-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-orange-300 font-medium mb-2">Apartment Inspection Service</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Los Angeles Apartment Inspection</h1>
          <p className="text-xl text-orange-100 mb-6">We inspect LA apartments for out-of-state renters. Coverage from DTLA to the Westside.</p>
          <div className="flex gap-4 mb-8">
            <div className="bg-white/10 px-4 py-2 rounded-lg"><span className="text-orange-200 text-sm">Avg Rent</span><p className="font-bold">$2,800</p></div>
            <div className="bg-red-500/20 px-4 py-2 rounded-lg"><span className="text-red-300 text-sm">Scam Rate</span><p className="font-bold text-red-300">9.8%</p></div>
          </div>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl">Book LA Inspection — $149</a>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">We Cover All LA Neighborhoods</h2>
          <div className="flex flex-wrap gap-3">
            {["Hollywood", "Silver Lake", "Echo Park", "DTLA", "Santa Monica", "Venice", "Culver City", "Koreatown", "West Hollywood", "Pasadena"].map((hood, i) => (
              <span key={i} className="bg-gray-100 px-4 py-2 rounded-full">{hood}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-orange-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Moving to LA?</h2>
          <p className="text-orange-200 mb-8">Don't rent sight unseen. Let us verify first.</p>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl">Book LA Inspection — $149</a>
        </div>
      </section>
    </div>
  );
}
