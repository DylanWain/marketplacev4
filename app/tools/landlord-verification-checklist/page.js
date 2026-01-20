'use client';
import React, { useState } from 'react';

export default function LandlordVerificationChecklistPage() {
  const [checks, setChecks] = useState({});
  
  const items = [
    { id: 'ownership', text: 'Verified landlord owns the property (county records)', critical: true },
    { id: 'id', text: 'Seen landlord ID (in person or video call)', critical: true },
    { id: 'google', text: 'Googled landlord name + "scam"', critical: false },
    { id: 'photos', text: 'Reverse image searched listing photos', critical: true },
    { id: 'visited', text: 'Visited property in person (or had it verified)', critical: true },
    { id: 'no_wire', text: 'NOT being asked to wire money', critical: true },
    { id: 'lease', text: 'Reviewed lease before paying', critical: false },
    { id: 'no_pressure', text: 'No extreme pressure to pay immediately', critical: false },
  ];

  const handleCheck = (id) => setChecks(prev => ({ ...prev, [id]: !prev[id] }));
  const checkedCount = Object.values(checks).filter(Boolean).length;
  const criticalMissing = items.filter(i => i.critical && !checks[i.id]).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🔍 Landlord Verification Checklist</h1>
          <p className="text-gray-600">Check off each item to verify your landlord is legitimate</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold">Progress: {checkedCount}/{items.length}</span>
            {criticalMissing > 0 && <span className="text-red-600 text-sm">⚠️ {criticalMissing} critical items remaining</span>}
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
            <div className="h-full bg-green-500 transition-all" style={{ width: `${(checkedCount / items.length) * 100}%` }} />
          </div>
          <div className="space-y-3">
            {items.map(item => (
              <label key={item.id} className={`flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-colors ${checks[item.id] ? 'bg-green-50 border-2 border-green-500' : 'bg-gray-50 border-2 border-transparent'}`}>
                <input type="checkbox" checked={checks[item.id] || false} onChange={() => handleCheck(item.id)} className="w-5 h-5 mt-0.5" />
                <div>
                  <span className={checks[item.id] ? 'text-green-800' : 'text-gray-900'}>{item.text}</span>
                  {item.critical && <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">CRITICAL</span>}
                </div>
              </label>
            ))}
          </div>
        </div>
        {criticalMissing > 0 && (
          <div className="bg-blue-900 text-white rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold mb-4">Don't Want to Do This Yourself?</h3>
            <p className="text-blue-200 mb-6">We verify landlords and inspect properties for you.</p>
            <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg">Get Professional Verification — $149</a>
          </div>
        )}
      </div>
    </div>
  );
}
