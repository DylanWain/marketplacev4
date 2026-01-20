'use client';

import React from 'react';

export default function LandlordStoppedRespondingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* EMERGENCY HERO */}
      <section className="bg-red-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-700 text-white text-sm font-bold px-4 py-2 rounded mb-4 inline-flex items-center gap-2 animate-pulse">
            <span className="text-xl">🚨</span> URGENT SITUATION
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Landlord Stopped Responding After You Sent Deposit?
          </h1>
          
          <p className="text-xl text-red-100 mb-6 p-4 bg-red-800 rounded-lg">
            You sent money. Now silence. Calls go to voicemail. Texts unread. Emails bounce. Move-in is soon.
          </p>

          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105">
            VERIFY IF IT'S REAL — $99 (Results in 2 Hours)
          </a>
          <p className="text-green-400 text-sm mt-4">⚡ Results in hours, not days • Real humans • We've seen this before</p>
        </div>
      </section>

      {/* IMMEDIATE ACTIONS */}
      <section className="py-8 px-4 bg-yellow-50 border-b-4 border-yellow-400">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-yellow-900 mb-4 flex items-center gap-2">
            <span>⚡</span> DO THIS RIGHT NOW:
          </h2>
          <ol className="space-y-3">
            {[
              "STOP sending any more money - no matter what excuse they give",
              "Screenshot EVERYTHING - all messages, listing, payment confirmation",
              "Contact your bank NOW - wire transfers can sometimes be stopped within hours",
              "Do NOT delete any communications",
              "Let us verify if this property/landlord is real"
            ].map((action, i) => (
              <li key={i} className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                <span className="bg-yellow-400 text-yellow-900 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-gray-800">{action}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHAT WE CAN FIND */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">What We Can Find Out:</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Does this property actually exist at this address?",
              "Does the person you paid the actual owner?",
              "Has this address been used in other scam reports?",
              "Is there a real landlord we can contact?",
              "What are your options right now?"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HONEST TRUTH */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl border-l-4 border-blue-500">
            <h3 className="font-bold text-gray-900 mb-2">The Honest Truth:</h3>
            <p className="text-gray-700">
              If someone stops responding after getting your money, it's usually a scam. BUT - sometimes landlords are just bad at communication. We'll find out which situation you're in within hours. If it's a scam, we'll help you document everything for your bank and police report.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-green-50 p-6 rounded-xl">
            <p className="text-lg text-gray-700 italic mb-4">
              "Sent $2,400 deposit. Landlord responded great for 3 days then... nothing. Panic mode. DibbyTour verified the property in 2 hours - turned out the landlord was just on a cruise with bad signal. I felt stupid but SO relieved."
            </p>
            <p className="font-bold text-gray-900">Trevor M.</p>
            <p className="text-gray-500 text-sm">Outcome: Legit - just bad communication</p>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl">
            <p className="text-lg text-gray-700 italic mb-4">
              "Same situation but mine WAS a scam. DibbyTour confirmed the 'landlord' didn't own the property within an hour. Gave me documentation. Bank reversed my wire transfer because I acted fast. Got every penny back."
            </p>
            <p className="font-bold text-gray-900">Rachel K.</p>
            <p className="text-green-600 font-medium">Recovered: $3,200</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Every Minute Counts.</h2>
          <p className="text-gray-300 mb-6">Don't wait. Don't second-guess. Get answers now.</p>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105">
            VERIFY IF IT'S REAL — $99
          </a>
          <p className="text-gray-500 text-sm mt-4">
            Results in hours, not days • Real humans • We've seen this before
          </p>
        </div>
      </section>
    </div>
  );
}
