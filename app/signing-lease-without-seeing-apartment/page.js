'use client';

import React from 'react';

export default function SigningLeaseWithoutSeeingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-orange-500 text-white text-sm font-bold px-4 py-2 rounded mb-4 inline-block">
            ⚠️ CRITICAL DECISION
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            About to Sign a Lease Without Seeing the Apartment?
          </h1>
          
          <p className="text-xl text-gray-300 mb-6">
            STOP. Get it verified first. We can inspect TODAY and send you photos + report before you sign.
          </p>

          <div className="bg-white/10 rounded-lg p-6 mb-8">
            <p className="text-white/80 mb-2"><strong>Your situation:</strong> You found an apartment. Landlord wants you to sign. You can't visit. Clock is ticking.</p>
            <p className="text-red-300 mb-2"><strong>Your fear:</strong> What if it's a scam? What if the photos are fake? What if there's hidden damage?</p>
            <p className="text-yellow-300"><strong>What's at stake:</strong> One signature = 12 months committed + thousands in deposits</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/book" className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 text-center">
              Get Same-Day Inspection — $199
            </a>
            <a href="/book" className="bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors text-center">
              Get 24-Hour Inspection — $149
            </a>
          </div>
          <p className="text-green-400 text-sm mt-4">✓ Report before you sign or 100% refund</p>
        </div>
      </section>

      {/* WHAT WE DO FAST */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">What We Can Do RIGHT NOW:</h2>
          <div className="space-y-3">
            {[
              "Inspector at property within hours (same-day available)",
              "75+ timestamped photos sent to your phone",
              "Live video call option so YOU can direct the walkthrough",
              "Landlord/ownership verification",
              "Report in your inbox before your signing deadline"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                <span className="text-green-500 text-xl">⚡</span>
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
              "Landlord gave me until 5pm to sign. Booked DibbyTour at 10am. Had my report by 3pm. Found the 'renovated kitchen' was actually falling apart. Walked away and found something better."
            </p>
            <div className="flex justify-between items-end flex-wrap gap-4">
              <div>
                <p className="font-bold text-gray-900">Marcus T.</p>
                <p className="text-gray-500 text-sm">Job relocation to Austin, 48-hour deadline</p>
              </div>
              <div className="text-right">
                <p className="text-green-600 font-bold">Saved: $3,600 deposit + 12 months of regret</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Quick Answers:</h2>
          <div className="space-y-4">
            {[
              {
                q: "How fast can you actually do this?",
                a: "Same-day inspections available in most major cities. Book by noon, report by evening. We know you're on a deadline."
              },
              {
                q: "What if the landlord won't let you in?",
                a: "That's a red flag itself. We'll document the exterior, verify ownership, and tell you our honest assessment. Often landlords refusing access = something to hide."
              },
              {
                q: "Can I be on a video call during the inspection?",
                a: "Yes - Premium package includes live video. You direct where we look. It's like being there yourself."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 px-4 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Don't Sign Blind.</h2>
          <p className="text-xl text-blue-200 mb-8">
            Get eyes on that apartment before you commit to 12 months.
          </p>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105">
            Get Inspection Before I Sign — $149
          </a>
          <p className="text-blue-300 text-sm mt-4">
            Same-day available • 75+ photos • Money-back guarantee
          </p>
        </div>
      </section>
    </div>
  );
}
