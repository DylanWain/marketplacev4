'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CAR_INSPECTION_CHECKLIST, APARTMENT_INSPECTION_CHECKLIST, calculateScore } from '@/lib/inspection-checklist';

export default function HomePage() {
  const [mode, setMode] = useState('car'); // 'car' or 'apartment'
  const [vin, setVin] = useState('');
  const [vinData, setVinData] = useState(null);
  const [vinLoading, setVinLoading] = useState(false);
  const [vinError, setVinError] = useState('');
  const [checkedItems, setCheckedItems] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  
  const checklist = mode === 'car' ? CAR_INSPECTION_CHECKLIST : APARTMENT_INSPECTION_CHECKLIST;
  const scoreData = calculateScore(checklist, checkedItems);
  
  // Decode VIN
  const decodeVin = async () => {
    if (vin.length !== 17) {
      setVinError('VIN must be 17 characters');
      return;
    }
    setVinLoading(true);
    setVinError('');
    setVinData(null);
    
    try {
      const res = await fetch('/api/vin-decode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vin }),
      });
      const data = await res.json();
      
      if (data.error) {
        setVinError(data.error);
      } else {
        setVinData(data);
      }
    } catch (e) {
      setVinError('Failed to decode VIN');
    }
    setVinLoading(false);
  };
  
  // Toggle section
  const toggleSection = (id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  // Toggle item
  const toggleItem = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  // Check all in section
  const checkAllInSection = (sectionId) => {
    const section = checklist.sections.find(s => s.id === sectionId);
    const allChecked = section.items.every(item => checkedItems[item.id]);
    const newChecked = { ...checkedItems };
    section.items.forEach(item => {
      newChecked[item.id] = !allChecked;
    });
    setCheckedItems(newChecked);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 bg-black/80 backdrop-blur z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <span className="font-bold text-xl">DibbyTour</span>
          </div>
          <Link 
            href="/subscribe"
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-sm font-semibold"
          >
            Get Pro - $30/mo
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black mb-3">
            Don't Get Scammed
          </h1>
          <p className="text-zinc-400 text-lg">
            150-point inspection checklist used by professionals
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => { setMode('car'); setCheckedItems({}); setVinData(null); }}
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              mode === 'car' 
                ? 'bg-orange-500 text-white' 
                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
            }`}
          >
            🚗 Used Car
          </button>
          <button
            onClick={() => { setMode('apartment'); setCheckedItems({}); }}
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              mode === 'apartment' 
                ? 'bg-orange-500 text-white' 
                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
            }`}
          >
            🏠 Apartment
          </button>
        </div>

        {/* VIN Decoder (Car only) */}
        {mode === 'car' && (
          <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
            <h2 className="font-bold text-lg mb-4">🔍 VIN Decoder (Free)</h2>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter 17-character VIN"
                value={vin}
                onChange={(e) => setVin(e.target.value.toUpperCase().slice(0, 17))}
                className="flex-1 px-4 py-3 bg-black/50 border border-white/20 rounded-xl focus:border-orange-500 focus:outline-none font-mono"
              />
              <button
                onClick={decodeVin}
                disabled={vinLoading || vin.length !== 17}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-700 disabled:cursor-not-allowed rounded-xl font-semibold transition"
              >
                {vinLoading ? 'Checking...' : 'Decode'}
              </button>
            </div>
            
            {vinError && (
              <p className="mt-3 text-red-400 text-sm">{vinError}</p>
            )}
            
            {vinData && (
              <div className="mt-4 p-4 bg-black/50 rounded-xl">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-zinc-500">Year:</span>
                    <span className="ml-2 font-semibold">{vinData.vehicle.year}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Make:</span>
                    <span className="ml-2 font-semibold">{vinData.vehicle.make}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Model:</span>
                    <span className="ml-2 font-semibold">{vinData.vehicle.model}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Trim:</span>
                    <span className="ml-2 font-semibold">{vinData.vehicle.trim || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Engine:</span>
                    <span className="ml-2 font-semibold">{vinData.vehicle.engine || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Drive:</span>
                    <span className="ml-2 font-semibold">{vinData.vehicle.driveType || 'N/A'}</span>
                  </div>
                </div>
                
                {/* Recalls */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  {vinData.recallCount > 0 ? (
                    <div className="text-red-400">
                      <span className="font-bold">⚠️ {vinData.recallCount} Open Recalls</span>
                      <ul className="mt-2 space-y-2 text-sm">
                        {vinData.recalls.slice(0, 3).map((r, i) => (
                          <li key={i} className="text-zinc-300">
                            <strong>{r.component}:</strong> {r.summary?.slice(0, 100)}...
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <span className="text-green-400 font-semibold">✓ No Open Recalls</span>
                  )}
                </div>
                
                <p className="mt-3 text-xs text-zinc-500">
                  Data source: NHTSA Vehicle Database
                </p>
              </div>
            )}
          </div>
        )}

        {/* Score Display */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 mb-8 border border-white/10 text-center">
          <div className="text-6xl font-black mb-2">
            <span className={scoreData.score >= 80 ? 'text-green-400' : scoreData.score >= 50 ? 'text-yellow-400' : 'text-red-400'}>
              {scoreData.passed}/{scoreData.total}
            </span>
          </div>
          <div className={`text-lg font-bold ${
            scoreData.verdict === 'LIKELY SAFE' ? 'text-green-400' : 
            scoreData.verdict === 'PROCEED WITH CAUTION' ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {scoreData.verdict}
          </div>
          <p className="text-zinc-500 text-sm mt-2">
            {scoreData.criticalPassed}/{scoreData.criticalTotal} critical items verified
          </p>
          <div className="w-full bg-zinc-800 rounded-full h-3 mt-4">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                scoreData.score >= 80 ? 'bg-green-500' : 
                scoreData.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${(scoreData.passed / scoreData.total) * 100}%` }}
            />
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{checklist.title}</h2>
          
          {checklist.sections.map(section => {
            const sectionChecked = section.items.filter(i => checkedItems[i.id]).length;
            const isExpanded = expandedSections[section.id] !== false; // Default expanded
            
            return (
              <div key={section.id} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{section.icon}</span>
                    <span className="font-semibold">{section.title}</span>
                    <span className="text-sm text-zinc-500">
                      ({sectionChecked}/{section.items.length})
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); checkAllInSection(section.id); }}
                      className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 rounded transition"
                    >
                      {sectionChecked === section.items.length ? 'Uncheck All' : 'Check All'}
                    </button>
                    <span className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="px-5 pb-4 space-y-2">
                    {section.items.map(item => (
                      <label
                        key={item.id}
                        className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition ${
                          checkedItems[item.id] ? 'bg-green-500/10' : 'hover:bg-white/5'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={!!checkedItems[item.id]}
                          onChange={() => toggleItem(item.id)}
                          className="mt-1 w-5 h-5 rounded border-2 border-zinc-600 checked:bg-green-500 checked:border-green-500"
                        />
                        <span className={checkedItems[item.id] ? 'text-zinc-400 line-through' : ''}>
                          {item.text}
                          {item.critical && (
                            <span className="ml-2 text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded">
                              CRITICAL
                            </span>
                          )}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pro CTA */}
        <div className="mt-12 p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-2">Want a Human to Check It?</h2>
          <p className="text-zinc-400 mb-6">
            Our experts inspect cars and apartments in person. We verify sellers and catch what checklists miss.
          </p>
          
          <div className="inline-flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-black text-orange-400">$30</span>
            <span className="text-zinc-400">/month</span>
          </div>
          
          <ul className="text-sm text-left max-w-sm mx-auto space-y-2 mb-6">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> In-person inspections (2/month)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Expert reviews (5/month)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Seller verification
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Direct text/call support
            </li>
          </ul>
          
          <Link
            href="/subscribe"
            className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-bold text-lg hover:opacity-90 transition"
          >
            Start 7-Day Free Trial →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 mt-16 text-center text-zinc-600 text-sm">
        <p>DibbyTour © 2024 • Protecting marketplace buyers</p>
      </footer>
    </div>
  );
}
