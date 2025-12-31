'use client';
import React from 'react';

export default function ChicagoApartmentInspectionPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-300 font-medium mb-2">Apartment Inspection Service</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Chicago Apartment Inspection</h1>
          <p className="text-xl text-blue-100 mb-6">We inspect Chicago apartments for out-of-state renters. All neighborhoods covered.</p>
          <div className="flex gap-4 mb-8">
            <div className="bg-white/10 px-4 py-2 rounded-lg"><span className="text-blue-200 text-sm">Avg Rent</span><p className="font-bold">$1,900</p></div>
            <div className="bg-red-500/20 px-4 py-2 rounded-lg"><span className="text-red-300 text-sm">Scam Rate</span><p className="font-bold text-red-300">7.2%</p></div>
          </div>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl">Book Chicago Inspection — $149</a>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">We Cover All Chicago Neighborhoods</h2>
          <div className="flex flex-wrap gap-3">
            {["Lincoln Park", "Lakeview", "Wicker Park", "Logan Square", "River North", "Gold Coast", "Pilsen", "Hyde Park", "Andersonville", "Bucktown"].map((hood, i) => (
              <span key={i} className="bg-gray-100 px-4 py-2 rounded-full">{hood}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Moving to Chicago?</h2>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl">Book Chicago Inspection — $149</a>
        </div>
      </section>
    </div>
  );
}
