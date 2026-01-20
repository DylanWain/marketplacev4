'use client';
import React, { useState } from 'react';

export default function ReverseImageSearchGuidePage() {
  const [step, setStep] = useState(0);
  
  const steps = [
    { title: 'Save the listing photos', content: 'Right-click on each photo in the listing and select "Save image" or take screenshots.' },
    { title: 'Go to Google Images', content: 'Visit images.google.com and click the camera icon in the search bar.' },
    { title: 'Upload the photo', content: 'Click "Upload a file" and select the photo you saved from the listing.' },
    { title: 'Analyze results', content: 'Look for the same photos appearing on OTHER listings at DIFFERENT addresses - this means the photos are stolen.' },
    { title: 'Check multiple photos', content: 'Repeat for all listing photos. Scammers often mix real and stolen photos.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🔎 Reverse Image Search Guide</h1>
          <p className="text-gray-600">Check if rental listing photos are stolen</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Step {step + 1} of {steps.length}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
            </div>
          </div>
          <h2 className="text-xl font-bold mb-4">{steps[step].title}</h2>
          <p className="text-gray-600 mb-6">{steps[step].content}</p>
          <div className="flex justify-between">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className="text-gray-500 disabled:opacity-50">← Previous</button>
            <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1} className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50">Next →</button>
          </div>
        </div>
        <div className="bg-red-50 rounded-xl p-6 mt-6">
          <h3 className="font-bold text-red-900 mb-2">🚨 Red Flags in Results:</h3>
          <ul className="text-red-800 space-y-1 text-sm">
            <li>• Same photos at different addresses = SCAM</li>
            <li>• Photos from real estate sales sites = possibly outdated</li>
            <li>• Photos on Airbnb/VRBO = might be a vacation rental scam</li>
            <li>• Stock photo sites = definitely SCAM</li>
          </ul>
        </div>
        <div className="bg-blue-900 text-white rounded-xl p-8 text-center mt-6">
          <h3 className="text-xl font-bold mb-4">Not Sure About Your Results?</h3>
          <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg">Get Professional Verification — $149</a>
        </div>
      </div>
    </div>
  );
}
