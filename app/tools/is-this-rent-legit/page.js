'use client';
import React, { useState } from 'react';

export default function IsThisRentLegitPage() {
  const [zip, setZip] = useState('');
  const [bedrooms, setBedrooms] = useState('1');
  const [rent, setRent] = useState('');
  const [result, setResult] = useState(null);

  const avgRents = { '10001': 2400, '90001': 1900, '60601': 1400, '78701': 1500, '33101': 1700, 'default': 1500 };

  const handleCheck = () => {
    const avg = avgRents[zip] || avgRents['default'];
    const adjusted = avg * (bedrooms === '0' ? 0.7 : bedrooms === '2' ? 1.3 : bedrooms === '3' ? 1.6 : 1);
    const pct = Math.round((parseInt(rent) / adjusted) * 100);
    setResult({ avg: adjusted, pct, risk: pct < 60 ? 'HIGH' : pct < 80 ? 'MODERATE' : 'LOW' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">💵 Is This Rent Legit?</h1>
          <p className="text-gray-600">Check if a rental price is suspiciously low</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="space-y-4">
            <div>
              <label className="block font-bold mb-2">ZIP Code</label>
              <input type="text" value={zip} onChange={e => setZip(e.target.value)} placeholder="10001" maxLength={5} className="w-full border rounded-lg px-4 py-3" />
            </div>
            <div>
              <label className="block font-bold mb-2">Bedrooms</label>
              <div className="flex gap-2">
                {['0', '1', '2', '3'].map(n => (
                  <button key={n} onClick={() => setBedrooms(n)} className={`flex-1 py-2 rounded-lg border-2 ${bedrooms === n ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                    {n === '0' ? 'Studio' : `${n}BR`}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-bold mb-2">Asking Rent</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input type="number" value={rent} onChange={e => setRent(e.target.value)} placeholder="1500" className="w-full border rounded-lg px-8 py-3" />
              </div>
            </div>
            <button onClick={handleCheck} disabled={!zip || !rent} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg">
              Check This Rent
            </button>
          </div>
          {result && (
            <div className={`mt-6 p-6 rounded-lg ${result.risk === 'HIGH' ? 'bg-red-50' : result.risk === 'MODERATE' ? 'bg-yellow-50' : 'bg-green-50'}`}>
              <div className="text-center">
                <div className={`text-4xl font-bold ${result.risk === 'HIGH' ? 'text-red-600' : result.risk === 'MODERATE' ? 'text-yellow-600' : 'text-green-600'}`}>{result.pct}%</div>
                <p className="text-gray-600">of estimated market rent (${Math.round(result.avg)})</p>
                <p className={`font-bold mt-2 ${result.risk === 'HIGH' ? 'text-red-600' : result.risk === 'MODERATE' ? 'text-yellow-600' : 'text-green-600'}`}>
                  {result.risk} SCAM RISK
                </p>
              </div>
            </div>
          )}
        </div>
        {result && result.risk !== 'LOW' && (
          <div className="bg-blue-900 text-white rounded-xl p-8 text-center mt-6">
            <h3 className="text-xl font-bold mb-4">Want Certainty?</h3>
            <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg">Get Professional Verification — $149</a>
          </div>
        )}
      </div>
    </div>
  );
}
