import React, { useState } from 'react';

// BOFU PAGE: "Hire Someone to View Apartment For Me"
// Target keyword: "hire someone to view apartment for me" (BUYER INTENT)
// This page is for people READY TO PAY

const HireSomeoneToViewApartment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    urgency: 'this_week'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Booking submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HERO - Direct, Action-Oriented */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-emerald-500/30 text-emerald-100 px-4 py-2 rounded-full text-sm font-medium mb-4">
                ✓ Same-Day Inspections Available
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                We'll View the Apartment <span className="text-yellow-300">For You</span>
              </h1>
              <p className="text-xl text-emerald-100 mb-8">
                Can't visit an apartment in person? We send a local inspector to verify it's real, 
                check the condition, and protect you from scams. <strong>Reports within 24 hours.</strong>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#book" className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg text-center transition">
                  Book Inspection - $149
                </a>
                <a href="#how-it-works" className="border-2 border-white hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-lg text-lg text-center transition">
                  See How It Works
                </a>
              </div>

              <div className="flex items-center gap-6 text-sm text-emerald-100">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-300">★★★★★</span>
                  <span>4.9/5 (200+ reviews)</span>
                </div>
                <div>✓ 50+ Cities</div>
                <div>✓ 24hr Reports</div>
              </div>
            </div>

            {/* Quick Booking Form */}
            <div className="bg-white rounded-2xl p-8 text-gray-900 shadow-2xl">
              <h2 className="text-2xl font-bold mb-2">Get Your Inspection Quote</h2>
              <p className="text-gray-600 mb-6">Tell us about the apartment you need inspected</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <select
                    className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    required
                  >
                    <option value="">Select City</option>
                    <option value="new-york">New York City</option>
                    <option value="los-angeles">Los Angeles</option>
                    <option value="chicago">Chicago</option>
                    <option value="houston">Houston</option>
                    <option value="phoenix">Phoenix</option>
                    <option value="philadelphia">Philadelphia</option>
                    <option value="san-antonio">San Antonio</option>
                    <option value="san-diego">San Diego</option>
                    <option value="dallas">Dallas</option>
                    <option value="austin">Austin</option>
                    <option value="other">Other City</option>
                  </select>
                </div>
                <div>
                  <select
                    className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    value={formData.urgency}
                    onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                  >
                    <option value="today">I need this TODAY</option>
                    <option value="this_week">Within this week</option>
                    <option value="next_week">Next week</option>
                    <option value="flexible">I'm flexible</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition"
                >
                  Get Free Quote →
                </button>
                <p className="text-center text-gray-500 text-sm">
                  No payment required. We'll call you within 1 hour.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-gray-50 py-6 border-b">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">2,500+ Inspections</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">$1.2M+ Saved from Scams</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">50+ Major Cities</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Money-Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Can't Visit an Apartment in Person?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              You're relocating, working remotely, or simply can't travel. But sending a deposit 
              for an apartment you've never seen? That's how people lose thousands to scams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Problem */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">😰</span> The Risk You're Taking
              </h3>
              <ul className="space-y-3 text-red-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>$145M+ lost to rental scams in 2023 (FBI data)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Scammers steal photos from real listings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Virtual tours can be faked or recorded elsewhere</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Deposits are almost never recovered</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Asking a friend is awkward and unreliable</span>
                </li>
              </ul>
            </div>

            {/* Solution */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">😌</span> Our Solution
              </h3>
              <ul className="space-y-3 text-emerald-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>Local inspector visits the ACTUAL apartment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>75+ photos documenting every room</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>Live video tour while you watch (optional)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>Verify landlord identity and ownership</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>Full written report within 24 hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Book Online', desc: 'Tell us the address and your timeline. Takes 2 minutes.', icon: '📝' },
              { step: '2', title: 'We Assign Inspector', desc: 'A local verified inspector is matched within 24 hours.', icon: '👤' },
              { step: '3', title: 'Inspection Day', desc: 'Inspector visits, takes photos, optional live video call.', icon: '📸' },
              { step: '4', title: 'Get Your Report', desc: 'Full report with photos delivered within 24 hours.', icon: '📋' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="inline-flex items-center justify-center w-8 h-8 bg-emerald-600 text-white rounded-full font-bold text-sm mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="#book" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition">
              Book Your Inspection
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="book" className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 text-center mb-12">Choose the inspection level that fits your needs</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic */}
            <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Basic Verification</h3>
              <p className="text-gray-600 mb-4">Confirm it exists and matches listing</p>
              <div className="text-4xl font-bold mb-6">$99</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-500">✓</span> Exterior verification
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-500">✓</span> 25+ photos
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-500">✓</span> Listing comparison
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-500">✓</span> 48-hour report
                </li>
              </ul>
              <a href="#" className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg transition">
                Select Basic
              </a>
            </div>

            {/* Standard - Most Popular */}
            <div className="border-2 border-emerald-500 rounded-2xl p-8 relative shadow-lg">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                MOST POPULAR
              </div>
              <h3 className="text-xl font-bold mb-2">Full Inspection</h3>
              <p className="text-gray-600 mb-4">Complete interior + exterior verification</p>
              <div className="text-4xl font-bold mb-6 text-emerald-600">$149</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-500">✓</span> Full interior walkthrough
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-500">✓</span> 75+ photos
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-500">✓</span> Appliance testing
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-500">✓</span> 24-hour report
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-500">✓</span> Live video option (+$25)
                </li>
              </ul>
              <a href="#" className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition">
                Select Full Inspection
              </a>
            </div>

            {/* Premium */}
            <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Premium + Video</h3>
              <p className="text-gray-600 mb-4">Live walkthrough + detailed report</p>
              <div className="text-4xl font-bold mb-6">$199</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-500">✓</span> Everything in Full
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-500">✓</span> 30-min live video tour
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-500">✓</span> Neighborhood walk
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-500">✓</span> Landlord verification
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-500">✓</span> Priority scheduling
                </li>
              </ul>
              <a href="#" className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg transition">
                Select Premium
              </a>
            </div>
          </div>

          <p className="text-center text-gray-500 mt-8">
            💳 All plans include our 100% money-back guarantee if you're not satisfied
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "I was relocating from Seattle to Austin and couldn't fly out to see apartments. DibbyTour saved me from a scam - the 'landlord' was using stolen photos. Worth every penny.",
                name: "Sarah M.",
                role: "Software Engineer",
                rating: 5
              },
              {
                quote: "As a travel nurse, I move every 13 weeks. I've used DibbyTour 4 times now. They catch things I'd never notice on a video call. Essential service.",
                name: "Marcus J.",
                role: "Travel RN",
                rating: 5
              },
              {
                quote: "Coming from India for grad school, I had no way to verify apartments. The inspector even checked if the landlord was real. Gave me total peace of mind.",
                name: "Priya K.",
                role: "International Student",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex gap-1 mb-4 text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                q: "How quickly can you do an inspection?",
                a: "We offer same-day inspections in most major cities. Standard turnaround is 24-48 hours from booking."
              },
              {
                q: "What cities do you serve?",
                a: "We have inspectors in 50+ major US cities including NYC, LA, Chicago, Houston, Phoenix, Dallas, Austin, Denver, Seattle, and more. If we don't cover your city yet, we can usually find an inspector within 48 hours."
              },
              {
                q: "How do I know the inspection is legitimate?",
                a: "All inspections include timestamped, geotagged photos that prove the inspector was at the actual location. We also verify the address matches what you provided."
              },
              {
                q: "Can I do a live video tour?",
                a: "Yes! Our Premium plan includes a 30-minute live video walkthrough where you can direct the inspector and ask questions in real-time via FaceTime, Zoom, or WhatsApp."
              },
              {
                q: "What if the inspection reveals problems?",
                a: "That's exactly why you hired us! Our report will document any issues so you can make an informed decision. Many customers use our reports to negotiate better terms or avoid bad apartments entirely."
              },
              {
                q: "Is there a money-back guarantee?",
                a: "Yes. If you're not satisfied with the inspection quality, we'll refund 100% of your payment. No questions asked."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don't Send Money for an Apartment You've Never Seen
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            For less than $150, get peace of mind before you commit to a lease.
          </p>
          <a href="#book" className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-emerald-600 font-bold py-4 px-10 rounded-lg text-xl transition">
            Book Your Inspection Now
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p className="text-emerald-200 mt-4 text-sm">
            Or call us: (555) 123-4567 • Available 7 days/week
          </p>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Remote Apartment Inspection Service",
            "description": "Professional apartment inspection service for people who can't visit in person. We verify apartments are real, check conditions, and protect you from rental scams.",
            "provider": {
              "@type": "Organization",
              "name": "DibbyTour",
              "url": "https://dibbytour.com"
            },
            "areaServed": {
              "@type": "Country",
              "name": "United States"
            },
            "offers": {
              "@type": "AggregateOffer",
              "lowPrice": "99",
              "highPrice": "199",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "200"
            }
          })
        }}
      />
    </div>
  );
};

export default HireSomeoneToViewApartment;
