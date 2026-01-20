'use client';

import React, { useState } from 'react';

export default function ThinkImBeingScammedPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* EMERGENCY HERO */}
      <section className="bg-red-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-700 text-white text-sm font-bold px-4 py-2 rounded mb-4 inline-flex items-center gap-2 animate-pulse">
            <span className="text-xl">🚨</span> TIME-SENSITIVE SITUATION
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Think You're Being Scammed? Verify Before You Pay.
          </h1>
          
          <p className="text-xl text-red-100 mb-6 p-4 bg-red-800 rounded-lg">
            Something feels off about this rental. Verify it's real before you lose thousands.
          </p>

          <div className="bg-white/10 rounded-lg p-6 mb-8">
            <p className="text-white/80 mb-2"><strong>Your situation:</strong> Found a great apartment. Landlord wants deposit. But something feels... off.</p>
            <p className="text-red-300 mb-2"><strong>Your fear:</strong> Am I about to wire $3,000 to a scammer? Or am I being paranoid and about to lose a great deal?</p>
            <p className="text-yellow-300"><strong>What's at stake:</strong> Your money, your credit, your identity</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/book" className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 text-center">
              Verify This Listing NOW — $99
            </a>
            <a href="/book" className="bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors text-center">
              Full Inspection + Verification — $149
            </a>
          </div>
          <p className="text-green-400 text-sm mt-4">✓ Know if it's legit within 24 hours</p>
        </div>
      </section>

      {/* RED FLAG CHECKER */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">You're Right to Be Suspicious If:</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Price is WAY below other listings in the area",
              "Landlord is 'out of town' or 'overseas'",
              "They want you to wire money or use gift cards",
              "Pressure to pay deposit BEFORE seeing it",
              "Won't do a video call at the property",
              "Story keeps changing or doesn't add up",
              "Asked for your SSN before you've even seen it",
              "Photos look too professional / staged",
              "Can't verify they actually own the property"
            ].map((flag, i) => (
              <div key={i} className="flex items-start gap-2 bg-red-50 p-3 rounded-lg">
                <span className="text-red-500">🚩</span>
                <span className="text-gray-700 text-sm">{flag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE VERIFY */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">What We Verify For You:</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Does this property actually exist at this address?",
              "Does the person you're talking to own or manage it?",
              "Do the listing photos match reality?",
              "Are there any red flags we can see in person?",
              "Is this a known scam operation?"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 p-8 rounded-xl">
            <p className="text-xl text-gray-700 italic mb-4">
              "Everything checked out. Good photos, responsive landlord, lease looked legit. But something felt off. DibbyTour discovered the 'landlord' didn't own the building - the real owner had no idea it was listed. I was 2 hours from wiring $4,800."
            </p>
            <div className="flex justify-between items-end flex-wrap gap-4">
              <div>
                <p className="font-bold text-gray-900">Sarah M.</p>
                <p className="text-gray-500 text-sm">Brooklyn apartment, too good to be true</p>
              </div>
              <div className="text-right">
                <p className="text-green-600 font-bold">Saved: $4,800 + months of headache</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IF IT'S A SCAM */}
      <section className="py-12 px-4 bg-yellow-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">If We Find It's a Scam:</h2>
          <div className="space-y-3">
            {[
              "We tell you immediately - don't send money",
              "We provide documentation for police report",
              "We report the listing to the platform",
              "We help you find legitimate alternatives"
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-lg">
                <span className="bg-yellow-400 text-yellow-900 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <span className="text-gray-700">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Quick Answers:</h2>
          <div className="space-y-4">
            {[
              {
                q: "How quickly can you verify?",
                a: "Basic verification (ownership check, address confirmation) within hours. Full inspection within 24 hours. Same-day available in major cities."
              },
              {
                q: "What if it turns out to be legit?",
                a: "Then you rent with confidence! You'll have 75+ photos and a condition report. $149 well spent for peace of mind."
              },
              {
                q: "I already sent a deposit. Can you still help?",
                a: "We can verify if the property is real. If it's a scam, contact your bank IMMEDIATELY - you may be able to stop the transfer. File a police report. We'll provide documentation."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 px-4 bg-red-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Trust Your Gut. Verify Now.
          </h2>
          <p className="text-xl text-red-200 mb-8">
            If something feels off, it probably is. Get answers before you lose money.
          </p>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105">
            Verify This Listing — $99
          </a>
          <p className="text-red-300 text-sm mt-4">
            Same-day available • Money-back guarantee • Report within 24 hours
          </p>
        </div>
      </section>
    </div>
  );
}
