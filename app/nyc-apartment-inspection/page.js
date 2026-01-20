'use client';
import React from 'react';

export default function NYCApartmentInspectionPage() {
  const city = {
    name: "New York City",
    short: "NYC",
    state: "NY",
    avgRent: "$3,500",
    scamRate: "12.3%",
    neighborhoods: ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island", "Williamsburg", "Astoria", "Harlem"],
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-400 font-medium mb-2">Apartment Inspection Service</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {city.name} Apartment Inspection
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            We inspect {city.short} apartments for out-of-state renters. 75+ photos, landlord verification, and detailed reports.
          </p>
          <div className="flex gap-4 mb-8">
            <div className="bg-white/10 px-4 py-2 rounded-lg">
              <span className="text-gray-400 text-sm">Avg Rent</span>
              <p className="font-bold">{city.avgRent}</p>
            </div>
            <div className="bg-red-500/20 px-4 py-2 rounded-lg">
              <span className="text-red-300 text-sm">Scam Rate</span>
              <p className="font-bold text-red-300">{city.scamRate}</p>
            </div>
          </div>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl">
            Book {city.short} Inspection — $149
          </a>
        </div>
      </section>

      <section className="py-12 px-4 bg-red-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-red-900 mb-4">⚠️ {city.short} Has the Highest Rental Scam Rate</h2>
          <p className="text-red-800">
            {city.name}'s competitive rental market makes it a prime target for scammers. With average rents of {city.avgRent} and apartments going fast, scammers exploit desperate renters with fake listings, stolen photos, and pressure tactics. Don't become a statistic.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">We Cover All {city.short} Neighborhoods</h2>
          <div className="flex flex-wrap gap-3">
            {city.neighborhoods.map((hood, i) => (
              <span key={i} className="bg-gray-100 px-4 py-2 rounded-full">{hood}</span>
            ))}
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">+ All others</span>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">What's Included</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Full apartment walkthrough",
              "75+ HD photos",
              "Landlord ownership verification",
              "Appliance testing",
              "Water pressure & hot water check",
              "Signs of pests or damage",
              "Neighborhood safety assessment",
              "Detailed written report"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-lg">
                <span className="text-green-500">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 p-8 rounded-xl">
            <p className="text-xl text-gray-700 italic mb-4">
              "Moving to NYC from California for work. Found a great apartment in Brooklyn but couldn't fly out. DibbyTour inspected it and found the photos were from a completely different unit. Saved me $4,800 in deposits."
            </p>
            <p className="font-bold">David K.</p>
            <p className="text-gray-500">Relocating to Brooklyn</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Moving to {city.short}?</h2>
          <p className="text-gray-300 mb-8">Don't rent sight unseen in one of America's most scam-heavy markets.</p>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl">
            Book {city.short} Inspection — $149
          </a>
        </div>
      </section>
    </div>
  );
}
