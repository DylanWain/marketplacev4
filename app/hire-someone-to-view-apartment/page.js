'use client';
import React from 'react';

export default function HireSomeoneToViewApartmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hire Someone to View an Apartment For You
          </h1>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Can't visit in person? We'll inspect the apartment, verify the landlord, take 75+ photos, and send you a detailed report.
          </p>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105">
            Book Apartment Viewing — $149
          </a>
          <p className="text-blue-300 text-sm mt-4">Same-day available in most cities</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What's Included</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "📸", title: "75+ Photos", desc: "Every room, closet, appliance, window view, and detail documented" },
              { icon: "📋", title: "Detailed Report", desc: "Condition assessment, red flags, neighborhood notes" },
              { icon: "✅", title: "Landlord Verification", desc: "We verify ownership and legitimacy before you pay a dime" },
              { icon: "📹", title: "Live Video Option", desc: "Join the inspection via video call and direct where we look" },
              { icon: "⏰", title: "24-Hour Turnaround", desc: "Book today, get your report tomorrow (same-day available)" },
              { icon: "💰", title: "Money-Back Guarantee", desc: "Not satisfied? Full refund, no questions asked" }
            ].map((item, i) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Perfect For</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Relocating for Work", desc: "New job, new city, no time to fly out and apartment hunt" },
              { title: "International Students", desc: "Moving to the US and can't visit before your semester starts" },
              { title: "Travel Nurses", desc: "13-week assignment, need verified housing fast" },
              { title: "Military PCS", desc: "Orders dropped, need housing ASAP without the scam risk" },
              { title: "Remote Workers", desc: "Moving somewhere new, want to verify before committing" },
              { title: "Anyone Renting Sight Unseen", desc: "If you can't see it yourself, let us see it for you" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { quote: "Found water damage under the sink that wasn't visible in listing photos. Saved me from signing a lease on a unit with mold issues.", name: "Sarah K.", location: "NYC" },
              { quote: "The landlord I was dealing with didn't even own the property. Complete scam. DibbyTour saved me $4,200.", name: "Marcus T.", location: "Austin" }
            ].map((item, i) => (
              <div key={i} className="bg-blue-50 p-6 rounded-xl">
                <p className="text-gray-700 italic mb-4">"{item.quote}"</p>
                <p className="font-bold">{item.name}</p>
                <p className="text-gray-500 text-sm">{item.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Your Apartment Verified?</h2>
          <p className="text-blue-200 mb-8">Takes 2 minutes to book. Report in your inbox within 24 hours.</p>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl">
            Book Apartment Viewing — $149
          </a>
        </div>
      </section>
    </div>
  );
}
