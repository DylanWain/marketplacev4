'use client';
import React from 'react';

export default function LandlordWantsDepositTodayPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-red-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-700 text-sm font-bold px-4 py-2 rounded mb-4 inline-block animate-pulse">
            🚨 PRESSURE TACTICS ALERT
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Landlord Wants Deposit TODAY. Should You Pay?
          </h1>
          <p className="text-xl text-red-100 mb-6 p-4 bg-red-800 rounded-lg">
            Pressure tactics are red flag #1. Verify before you wire anything.
          </p>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg">
            Rush Verification — $99 (2-4 hours)
          </a>
          <p className="text-green-400 text-sm mt-4">✓ Know before their deadline</p>
        </div>
      </section>

      <section className="py-12 px-4 bg-yellow-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Classic Scammer Pressure Tactics:</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "'I have 3 other people interested'",
              "'The listing goes down at 5pm'",
              "'Send deposit now to hold it'",
              "'My other tenant just backed out - act fast'",
              "'I'm leaving town tomorrow'",
              "'Wire the money and I'll mail you keys'"
            ].map((tactic, i) => (
              <div key={i} className="bg-white p-3 rounded-lg flex items-center gap-2">
                <span className="text-red-500">⚠️</span>
                <span className="text-gray-700">{tactic}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-yellow-800 font-medium">
            Truth: Legitimate landlords understand verification takes time. Scammers create urgency because time = questions = no money for them.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 p-8 rounded-xl">
            <p className="text-xl text-gray-700 italic mb-4">
              "Landlord said 5pm deadline. Called DibbyTour at 2pm. By 4pm they confirmed ownership was legit but found the unit had undisclosed water damage. Used that info to negotiate $200/month off rent."
            </p>
            <p className="font-bold text-gray-900">Chris & Anna T.</p>
            <p className="text-green-600">Saved: $2,400/year in rent + avoided water damage</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Real Urgency or Scam?</h2>
          <p className="text-gray-300 mb-8">Let us find out. We can verify in hours.</p>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl">
            Rush Verification — $99
          </a>
        </div>
      </section>
    </div>
  );
}
