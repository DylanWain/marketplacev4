'use client';
import React from 'react';

export default function ApartmentViewingServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-teal-900 to-teal-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Professional Apartment Viewing Service
          </h1>
          <p className="text-xl text-teal-200 mb-8 max-w-2xl mx-auto">
            We view apartments on your behalf. Perfect for out-of-state moves, busy professionals, and anyone who can't visit in person.
          </p>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl">
            Book a Viewing — $149
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What You Get</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "📸", title: "75+ HD Photos", desc: "Every angle, every room, every detail documented" },
              { icon: "📋", title: "Condition Report", desc: "Honest assessment of the apartment's condition" },
              { icon: "🔍", title: "Red Flag Check", desc: "We look for signs of scams, damage, and issues" },
              { icon: "✅", title: "Landlord Verification", desc: "Confirm the landlord actually owns the property" },
              { icon: "📍", title: "Neighborhood Notes", desc: "Safety, parking, noise, nearby amenities" },
              { icon: "📹", title: "Live Video Option", desc: "Join via video call and direct the viewing" }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                <span className="text-3xl">{item.icon}</span>
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
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
          <p className="text-center text-gray-600 mb-8">No hidden fees. No surprises.</p>
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-teal-600 text-white p-6 text-center">
              <div className="text-4xl font-bold">$149</div>
              <p className="text-teal-100">per apartment</p>
            </div>
            <div className="p-6 space-y-3">
              {[
                "Full apartment inspection",
                "75+ timestamped photos",
                "Landlord verification",
                "Detailed written report",
                "24-hour turnaround",
                "Money-back guarantee"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="p-6 bg-gray-50">
              <a href="/book" className="block w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg text-center">
                Book Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-teal-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to View Your Apartment?</h2>
          <p className="text-teal-200 mb-8">Book in 2 minutes. Report in 24 hours.</p>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl">
            Book Apartment Viewing — $149
          </a>
        </div>
      </section>
    </div>
  );
}
