'use client';
import React from 'react';

export default function SightUnseenRentalVerificationPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-indigo-900 to-indigo-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sight Unseen Rental Verification
          </h1>
          <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
            Renting an apartment without seeing it first? We verify it's real, inspect the condition, and confirm the landlord is legitimate.
          </p>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl">
            Verify Before You Sign — $149
          </a>
        </div>
      </section>

      <section className="py-12 px-4 bg-red-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <span className="text-4xl">⚠️</span>
            <div>
              <h2 className="text-xl font-bold text-red-900 mb-2">The Risk of Renting Sight Unseen</h2>
              <ul className="text-red-800 space-y-1">
                <li>• 1 in 3 renters encounter scams during their search</li>
                <li>• $350M+ lost to rental scams annually</li>
                <li>• 34% of renters have rented sight unseen</li>
                <li>• 62% of them wished they had verified first</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Verification Process</h2>
          <div className="space-y-6">
            {[
              { title: "Ownership Verification", desc: "We check county records to confirm your landlord actually owns or manages the property" },
              { title: "Physical Inspection", desc: "Our inspector visits the property and documents everything with 75+ timestamped photos" },
              { title: "Condition Assessment", desc: "We check appliances, look for damage, test water/HVAC, and note any concerns" },
              { title: "Neighborhood Review", desc: "We assess parking, safety, noise levels, and proximity to your workplace/school" },
              { title: "Detailed Report", desc: "You receive a comprehensive report with photos, findings, and our honest assessment" }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Why Renters Trust Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">140+</div>
              <p className="text-gray-600">Customers served</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">$200K+</div>
              <p className="text-gray-600">Saved from scams</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">24hr</div>
              <p className="text-gray-600">Average turnaround</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Don't Rent Blind</h2>
          <p className="text-indigo-200 mb-8">Verify before you sign. Know exactly what you're getting.</p>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl">
            Get Verification — $149
          </a>
        </div>
      </section>
    </div>
  );
}
