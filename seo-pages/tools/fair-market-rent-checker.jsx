// FAIR MARKET RENT CHECKER
// Compares rent to HUD Fair Market Rent data
// Great for "is this rent too good to be true" searches

import React, { useState } from 'react';

export default function FairMarketRentChecker() {
  const [zipCode, setZipCode] = useState('');
  const [bedrooms, setBedrooms] = useState('1');
  const [askingRent, setAskingRent] = useState('');
  const [showResult, setShowResult] = useState(false);

  // Sample FMR data (in production, this would be API-driven)
  // Source: HUD Fair Market Rents 2024
  const fmrData = {
    // NYC Area
    '10001': { area: 'Manhattan, NY', fmr: { '0': 1945, '1': 2387, '2': 2691, '3': 3420, '4': 3673 } },
    '10019': { area: 'Midtown Manhattan, NY', fmr: { '0': 1945, '1': 2387, '2': 2691, '3': 3420, '4': 3673 } },
    '11201': { area: 'Brooklyn, NY', fmr: { '0': 1945, '1': 2387, '2': 2691, '3': 3420, '4': 3673 } },
    '11211': { area: 'Williamsburg, Brooklyn, NY', fmr: { '0': 1945, '1': 2387, '2': 2691, '3': 3420, '4': 3673 } },
    
    // LA Area
    '90001': { area: 'Los Angeles, CA', fmr: { '0': 1547, '1': 1861, '2': 2364, '3': 3088, '4': 3382 } },
    '90028': { area: 'Hollywood, CA', fmr: { '0': 1547, '1': 1861, '2': 2364, '3': 3088, '4': 3382 } },
    '90210': { area: 'Beverly Hills, CA', fmr: { '0': 1547, '1': 1861, '2': 2364, '3': 3088, '4': 3382 } },
    
    // San Francisco
    '94102': { area: 'San Francisco, CA', fmr: { '0': 2195, '1': 2752, '2': 3447, '3': 4575, '4': 5107 } },
    '94110': { area: 'Mission District, SF', fmr: { '0': 2195, '1': 2752, '2': 3447, '3': 4575, '4': 5107 } },
    
    // Austin
    '78701': { area: 'Austin, TX', fmr: { '0': 1233, '1': 1418, '2': 1724, '3': 2257, '4': 2682 } },
    '78704': { area: 'South Austin, TX', fmr: { '0': 1233, '1': 1418, '2': 1724, '3': 2257, '4': 2682 } },
    
    // Chicago
    '60601': { area: 'Chicago Loop, IL', fmr: { '0': 1024, '1': 1190, '2': 1387, '3': 1768, '4': 1949 } },
    '60614': { area: 'Lincoln Park, Chicago', fmr: { '0': 1024, '1': 1190, '2': 1387, '3': 1768, '4': 1949 } },
    '60657': { area: 'Lakeview, Chicago', fmr: { '0': 1024, '1': 1190, '2': 1387, '3': 1768, '4': 1949 } },
    
    // Miami
    '33101': { area: 'Miami, FL', fmr: { '0': 1328, '1': 1615, '2': 2043, '3': 2604, '4': 3014 } },
    '33139': { area: 'South Beach, Miami', fmr: { '0': 1328, '1': 1615, '2': 2043, '3': 2604, '4': 3014 } },
    
    // Seattle
    '98101': { area: 'Seattle, WA', fmr: { '0': 1555, '1': 1800, '2': 2235, '3': 3099, '4': 3558 } },
    '98122': { area: 'Capitol Hill, Seattle', fmr: { '0': 1555, '1': 1800, '2': 2235, '3': 3099, '4': 3558 } },
    
    // Denver
    '80202': { area: 'Denver, CO', fmr: { '0': 1302, '1': 1496, '2': 1880, '3': 2674, '4': 3066 } },
    '80205': { area: 'RiNo, Denver', fmr: { '0': 1302, '1': 1496, '2': 1880, '3': 2674, '4': 3066 } },
    
    // Boston
    '02101': { area: 'Boston, MA', fmr: { '0': 1739, '1': 2027, '2': 2521, '3': 3134, '4': 3405 } },
    '02116': { area: 'Back Bay, Boston', fmr: { '0': 1739, '1': 2027, '2': 2521, '3': 3134, '4': 3405 } },
    
    // Default / National Average
    'default': { area: 'National Average', fmr: { '0': 1100, '1': 1250, '2': 1550, '3': 2000, '4': 2300 } }
  };

  const getAreaData = (zip) => {
    // Try exact match first, then try first 3 digits for metro area
    return fmrData[zip] || fmrData[zip.substring(0, 3) + '00'] || fmrData['default'];
  };

  const analyzeRent = () => {
    const areaData = getAreaData(zipCode);
    const fmr = areaData.fmr[bedrooms];
    const asking = parseInt(askingRent);
    const percentOfFMR = Math.round((asking / fmr) * 100);
    const difference = asking - fmr;

    let riskLevel, analysis, recommendation;

    if (percentOfFMR < 50) {
      riskLevel = 'EXTREME';
      analysis = `This rent is ${100 - percentOfFMR}% below fair market value. This is almost certainly a scam. Legitimate landlords don't leave this much money on the table.`;
      recommendation = 'DO NOT proceed. This listing is almost certainly fraudulent.';
    } else if (percentOfFMR < 70) {
      riskLevel = 'HIGH';
      analysis = `This rent is ${100 - percentOfFMR}% below fair market value. While deals exist, this much below market is a major red flag.`;
      recommendation = 'Verify extensively before sending any money. Consider professional verification.';
    } else if (percentOfFMR < 85) {
      riskLevel = 'MODERATE';
      analysis = `This rent is ${100 - percentOfFMR}% below fair market value. This could be a good deal, but verify the landlord and property carefully.`;
      recommendation = 'Proceed with caution. Verify ownership and view in person before paying.';
    } else if (percentOfFMR <= 115) {
      riskLevel = 'LOW';
      analysis = `This rent is within normal market range (${percentOfFMR}% of fair market rent). The price itself isn't a red flag.`;
      recommendation = 'Price seems reasonable. Still verify landlord and property through normal due diligence.';
    } else {
      riskLevel = 'NORMAL';
      analysis = `This rent is ${percentOfFMR - 100}% above fair market value. While expensive, above-market rents are common in desirable areas.`;
      recommendation = 'Price is high but not suspicious. Negotiate if possible, but not a scam indicator.';
    }

    return { areaData, fmr, asking, percentOfFMR, difference, riskLevel, analysis, recommendation };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (zipCode.length === 5 && askingRent) {
      setShowResult(true);
    }
  };

  const result = showResult ? analyzeRent() : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            💵 Is This Rent Too Good To Be True?
          </h1>
          <p className="text-gray-600">
            Compare the asking rent to HUD Fair Market Rent data for your area
          </p>
        </div>

        {!showResult ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
            {/* ZIP Code */}
            <div className="mb-6">
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Property ZIP Code
              </label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                placeholder="10001"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-xl"
                maxLength={5}
              />
            </div>

            {/* Bedrooms */}
            <div className="mb-6">
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Bedrooms
              </label>
              <div className="flex gap-2">
                {['0', '1', '2', '3', '4'].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setBedrooms(num)}
                    className={`flex-1 py-3 rounded-lg border-2 font-medium transition-colors ${
                      bedrooms === num
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {num === '0' ? 'Studio' : `${num} BR`}
                  </button>
                ))}
              </div>
            </div>

            {/* Asking Rent */}
            <div className="mb-8">
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Asking Rent (Monthly)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">$</span>
                <input
                  type="number"
                  value={askingRent}
                  onChange={(e) => setAskingRent(e.target.value)}
                  placeholder="1500"
                  className="w-full border-2 border-gray-200 rounded-lg px-10 py-3 text-xl"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={zipCode.length !== 5 || !askingRent}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-lg text-lg transition-colors"
            >
              Check This Rent
            </button>
          </form>
        ) : (
          <div>
            {/* Result Card */}
            <div className={`rounded-xl p-8 mb-6 ${
              result.riskLevel === 'EXTREME' ? 'bg-red-600 text-white' :
              result.riskLevel === 'HIGH' ? 'bg-orange-500 text-white' :
              result.riskLevel === 'MODERATE' ? 'bg-yellow-400 text-gray-900' :
              'bg-green-500 text-white'
            }`}>
              <div className="text-center mb-6">
                <p className="text-sm opacity-80 mb-1">Scam Risk Level</p>
                <h2 className="text-4xl font-bold">{result.riskLevel}</h2>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`p-4 rounded-lg ${
                  result.riskLevel === 'EXTREME' || result.riskLevel === 'HIGH' 
                    ? 'bg-white/20' 
                    : 'bg-black/10'
                }`}>
                  <p className="text-sm opacity-80">Asking Rent</p>
                  <p className="text-2xl font-bold">${result.asking.toLocaleString()}</p>
                </div>
                <div className={`p-4 rounded-lg ${
                  result.riskLevel === 'EXTREME' || result.riskLevel === 'HIGH' 
                    ? 'bg-white/20' 
                    : 'bg-black/10'
                }`}>
                  <p className="text-sm opacity-80">Fair Market Rent</p>
                  <p className="text-2xl font-bold">${result.fmr.toLocaleString()}</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-6xl font-bold mb-2">{result.percentOfFMR}%</p>
                <p className="opacity-80">of Fair Market Rent</p>
              </div>
            </div>

            {/* Analysis */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-2">Analysis</h3>
              <p className="text-gray-700 mb-4">{result.analysis}</p>
              
              <div className={`p-4 rounded-lg ${
                result.riskLevel === 'EXTREME' ? 'bg-red-50 border-2 border-red-200' :
                result.riskLevel === 'HIGH' ? 'bg-orange-50 border-2 border-orange-200' :
                result.riskLevel === 'MODERATE' ? 'bg-yellow-50 border-2 border-yellow-200' :
                'bg-green-50 border-2 border-green-200'
              }`}>
                <p className="font-medium">
                  <strong>Recommendation:</strong> {result.recommendation}
                </p>
              </div>
            </div>

            {/* Market Context */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Market Context: {result.areaData.area}</h3>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Studio FMR</span>
                  <span className="font-medium">${result.areaData.fmr['0'].toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">1 Bedroom FMR</span>
                  <span className="font-medium">${result.areaData.fmr['1'].toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">2 Bedroom FMR</span>
                  <span className="font-medium">${result.areaData.fmr['2'].toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">3 Bedroom FMR</span>
                  <span className="font-medium">${result.areaData.fmr['3'].toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">4 Bedroom FMR</span>
                  <span className="font-medium">${result.areaData.fmr['4'].toLocaleString()}</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4">
                Source: HUD Fair Market Rents 2024. FMR represents the 40th percentile rent.
              </p>
            </div>

            {/* CTA */}
            {(result.riskLevel === 'EXTREME' || result.riskLevel === 'HIGH' || result.riskLevel === 'MODERATE') && (
              <div className="bg-blue-900 text-white rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold mb-4">Want Certainty?</h3>
                <p className="text-blue-200 mb-6">
                  Our professional inspectors verify apartments in person, confirm the landlord is legitimate, 
                  and send you a detailed report. Don't risk thousands on a listing that's too good to be true.
                </p>
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-colors">
                  Get Professional Verification — $149
                </button>
              </div>
            )}

            {/* Try Again */}
            <button
              onClick={() => {
                setShowResult(false);
                setZipCode('');
                setAskingRent('');
              }}
              className="w-full mt-4 text-gray-500 hover:text-gray-700"
            >
              ← Check another listing
            </button>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-2">About Fair Market Rent</h3>
          <p className="text-blue-800 text-sm">
            Fair Market Rent (FMR) is calculated by HUD and represents the 40th percentile of 
            rents in an area. Rents significantly below FMR are unusual and often indicate scams. 
            While legitimate deals exist, be extra cautious with rents more than 20% below FMR.
          </p>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Is This Rent Too Good To Be True? | Fair Market Rent Checker | DibbyTour",
  description: "Free tool to check if a rental price is suspiciously low. Compare asking rent to HUD Fair Market Rent data. Spot potential scams before you lose money.",
  keywords: [
    "rent too good to be true",
    "fair market rent checker",
    "is this rent a scam",
    "rental price checker",
    "suspicious rent price"
  ]
};
