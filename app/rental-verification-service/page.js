'use client';
import React from 'react';

export default function RentalVerificationServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-purple-900 to-purple-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Rental Verification Service
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
            We verify rental listings are legitimate before you sign. Landlord verification, property inspection, and scam protection.
          </p>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl">
            Verify a Rental — $149
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What We Verify</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Landlord Legitimacy", desc: "We confirm the person you're dealing with owns or manages the property", check: true },
              { title: "Property Existence", desc: "We physically visit to confirm the property exists as listed", check: true },
              { title: "Photo Accuracy", desc: "We compare listing photos to actual property condition", check: true },
              { title: "Scam Red Flags", desc: "We check for signs of common rental scams", check: true },
              { title: "Price Reasonability", desc: "We assess if the rent is reasonable for the area", check: true },
              { title: "Lease Review", desc: "Optional: we review lease terms for red flags (+$50)", check: false }
            ].map((item, i) => (
              <div key={i} className={`p-6 rounded-xl ${item.check ? 'bg-green-50' : 'bg-gray-50'}`}>
                <div className="flex items-start gap-3">
                  <span className={item.check ? 'text-green-500' : 'text-gray-400'}>{item.check ? '✓' : '+'}</span>
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-red-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-red-900 mb-6 text-center">Why Verification Matters</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { stat: "$350M+", label: "Lost to rental scams annually" },
              { stat: "1 in 3", label: "Renters encounter scams" },
              { stat: "43%", label: "Involve fake listings" },
              { stat: "$3,000", label: "Average victim loss" }
            ].map((item, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-red-600">{item.stat}</div>
                <p className="text-red-800 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-purple-50 p-8 rounded-xl">
            <p className="text-xl text-gray-700 italic mb-4">
              "I was about to wire $3,500 to someone who didn't even own the apartment. DibbyTour verified ownership and found the real owner had no idea it was being 'rented' out. Complete scam."
            </p>
            <p className="font-bold">Jennifer M.</p>
            <p className="text-green-600">Saved: $3,500 + avoided identity theft</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-purple-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Protect Yourself</h2>
          <p className="text-purple-200 mb-8">$149 is a small price for peace of mind.</p>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl">
            Verify This Rental — $149
          </a>
        </div>
      </section>
    </div>
  );
}
