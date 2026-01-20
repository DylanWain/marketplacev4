'use client';
import React, { useState } from 'react';

export default function ScamRiskCalculatorPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { id: 'price', q: "How does the rent compare to similar apartments?", options: [
      { text: "About the same", score: 0 }, { text: "10-20% below", score: 15 }, { text: "20-30% below", score: 35 }, { text: "30%+ below (way too good)", score: 60 }
    ]},
    { id: 'viewing', q: "Can you view the apartment in person?", options: [
      { text: "Yes, landlord will meet me", score: 0 }, { text: "Video call only", score: 25 }, { text: "No viewing, landlord is overseas", score: 55 }
    ]},
    { id: 'payment', q: "How does the landlord want payment?", options: [
      { text: "Check or credit card", score: 0 }, { text: "Venmo/Zelle", score: 10 }, { text: "Wire transfer", score: 50 }, { text: "Gift cards or crypto", score: 70 }
    ]},
    { id: 'pressure', q: "Is there pressure to pay quickly?", options: [
      { text: "No rush", score: 0 }, { text: "Others are interested", score: 15 }, { text: "Pay today or lose it", score: 40 }, { text: "Pay before viewing", score: 60 }
    ]},
    { id: 'verification', q: "Can you verify ownership?", options: [
      { text: "Yes, checked records", score: 0 }, { text: "Haven't checked", score: 15 }, { text: "Can't find any info", score: 35 }
    ]}
  ];

  const handleAnswer = (score) => {
    setAnswers(prev => ({ ...prev, [questions[step].id]: score }));
    if (step < questions.length - 1) setStep(s => s + 1);
    else setShowResult(true);
  };

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const riskLevel = totalScore < 20 ? 'LOW' : totalScore < 50 ? 'MODERATE' : totalScore < 80 ? 'HIGH' : 'EXTREME';
  const riskColor = totalScore < 20 ? 'green' : totalScore < 50 ? 'yellow' : totalScore < 80 ? 'orange' : 'red';

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className={`bg-white rounded-2xl shadow-lg p-8 text-center mb-8`}>
            <p className="text-gray-500 text-sm mb-2">Your Scam Risk Score</p>
            <div className={`text-8xl font-bold mb-4 text-${riskColor}-500`}>{Math.min(totalScore, 100)}</div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-bold bg-${riskColor}-100 text-${riskColor}-700`}>
              {riskLevel} RISK
            </div>
          </div>
          {totalScore > 20 && (
            <div className="bg-blue-900 text-white rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Want 100% Certainty?</h3>
              <p className="text-blue-200 mb-6">Our inspectors verify apartments in person and confirm landlord legitimacy.</p>
              <a href="/book" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg">Get Professional Verification — $149</a>
            </div>
          )}
          <button onClick={() => { setStep(0); setAnswers({}); setShowResult(false); }} className="w-full mt-6 text-gray-500">← Take quiz again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🔍 Rental Scam Risk Calculator</h1>
          <p className="text-gray-600">Answer {questions.length} questions to get your scam risk score</p>
        </div>
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 transition-all" style={{ width: `${(step / questions.length) * 100}%` }} />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{questions[step].q}</h2>
          <div className="space-y-3">
            {questions[step].options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt.score)} className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors">
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
