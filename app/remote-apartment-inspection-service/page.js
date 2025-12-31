'use client';
import React from 'react';

export default function RemoteApartmentInspectionServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Remote Apartment Inspection Service
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We physically inspect apartments for people who can't visit in person. 75+ photos, detailed report, landlord verification.
          </p>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl">
            Get Remote Inspection — $149
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-gray-600 text-center mb-12">Simple 4-step process</p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Book Online", desc: "Send us the listing link and your inspection date" },
              { step: "2", title: "We Schedule", desc: "Our inspector coordinates access with landlord" },
              { step: "3", title: "We Inspect", desc: "Full walkthrough with 75+ timestamped photos" },
              { step: "4", title: "You Decide", desc: "Get detailed report within 24 hours" }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What We Check</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Overall condition and cleanliness",
              "All appliances (fridge, stove, dishwasher, washer/dryer)",
              "Water pressure and hot water",
              "HVAC system operation",
              "Windows, doors, locks",
              "Signs of pests or water damage",
              "Closet and storage space",
              "Natural light and views",
              "Noise levels",
              "Parking situation",
              "Building common areas",
              "Neighborhood safety and amenities"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-lg">
                <span className="text-green-500">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Coverage Area</h2>
          <p className="text-center text-gray-600 mb-8">We serve all major US cities including:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "Austin", "San Francisco", "Seattle", "Denver", "Boston", "Miami", "Atlanta"].map((city, i) => (
              <span key={i} className="bg-gray-100 px-4 py-2 rounded-full text-sm">{city}</span>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">Don't see your city? Contact us - we likely cover it.</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Inspect Your Apartment?</h2>
          <p className="text-blue-200 mb-8">Don't rent sight unseen. Let us be your eyes.</p>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl">
            Book Inspection — $149
          </a>
          <p className="text-blue-300 text-sm mt-4">Same-day available • Money-back guarantee</p>
        </div>
      </section>
    </div>
  );
}
