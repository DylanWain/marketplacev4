// SCAM RISK SCORE CALCULATOR
// Viral tool - people will share their "score"
// High SEO value - targets "is this rental a scam" searches
// Captures leads at the end

import React, { useState } from 'react';

export default function ScamRiskScoreCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 'price',
      question: "How does the rent compare to similar apartments in the area?",
      options: [
        { text: "About the same as other listings", score: 0 },
        { text: "10-20% below average", score: 15 },
        { text: "20-30% below average", score: 35 },
        { text: "30%+ below average (way too good)", score: 60 }
      ]
    },
    {
      id: 'contact',
      question: "How is the landlord communicating with you?",
      options: [
        { text: "Phone calls and in-person meetings", score: 0 },
        { text: "Email and text, but responsive", score: 5 },
        { text: "Email only, no phone number given", score: 25 },
        { text: "Only through the listing platform", score: 15 }
      ]
    },
    {
      id: 'viewing',
      question: "Can you view the apartment in person?",
      options: [
        { text: "Yes, landlord will meet me there", score: 0 },
        { text: "Yes, but only exterior / lobby", score: 20 },
        { text: "Video call only, landlord won't meet", score: 35 },
        { text: "No viewing possible, landlord is 'overseas'", score: 55 }
      ]
    },
    {
      id: 'payment',
      question: "How does the landlord want you to pay?",
      options: [
        { text: "Check or credit card", score: 0 },
        { text: "Venmo/Zelle/PayPal", score: 10 },
        { text: "Wire transfer", score: 50 },
        { text: "Gift cards, crypto, or cash app", score: 70 }
      ]
    },
    {
      id: 'pressure',
      question: "Is there pressure to pay quickly?",
      options: [
        { text: "No, take your time to decide", score: 0 },
        { text: "Mild - 'others are interested'", score: 15 },
        { text: "Strong - 'pay today or lose it'", score: 40 },
        { text: "Extreme - must pay before viewing", score: 60 }
      ]
    },
    {
      id: 'photos',
      question: "What's the photo situation?",
      options: [
        { text: "Multiple photos, looks like real apartment", score: 0 },
        { text: "Professional photos, almost too perfect", score: 10 },
        { text: "Very few photos or low quality", score: 20 },
        { text: "Photos don't match the description", score: 45 }
      ]
    },
    {
      id: 'info',
      question: "What personal info have they asked for?",
      options: [
        { text: "Just name and contact info so far", score: 0 },
        { text: "Application with employment/references", score: 0 },
        { text: "SSN before I've even viewed it", score: 50 },
        { text: "Bank account info or financial details", score: 60 }
      ]
    },
    {
      id: 'lease',
      question: "What's the lease situation?",
      options: [
        { text: "Standard lease, time to review", score: 0 },
        { text: "Lease provided but rush to sign", score: 15 },
        { text: "No lease yet, just 'trust me'", score: 35 },
        { text: "Strange lease with weird terms", score: 30 }
      ]
    },
    {
      id: 'story',
      question: "Does the landlord have an unusual story?",
      options: [
        { text: "No, seems like normal landlord", score: 0 },
        { text: "Inherited property, lives elsewhere", score: 10 },
        { text: "Military deployment / missionary abroad", score: 40 },
        { text: "Story has changed or doesn't add up", score: 45 }
      ]
    },
    {
      id: 'verification',
      question: "Can you verify they own the property?",
      options: [
        { text: "Yes, checked public records", score: 0 },
        { text: "Haven't checked but seems legit", score: 15 },
        { text: "They claim to be property manager", score: 10 },
        { text: "Can't find any ownership info", score: 35 }
      ]
    }
  ];

  const handleAnswer = (questionId, score) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    // Max possible score is around 500, normalize to 100
    return Math.min(Math.round(totalScore / 5), 100);
  };

  const getRiskLevel = (score) => {
    if (score <= 10) return { level: "LOW", color: "green", emoji: "✅" };
    if (score <= 25) return { level: "MODERATE", color: "yellow", emoji: "⚠️" };
    if (score <= 50) return { level: "HIGH", color: "orange", emoji: "🚨" };
    return { level: "EXTREME", color: "red", emoji: "🛑" };
  };

  const getRecommendation = (score) => {
    if (score <= 10) {
      return {
        headline: "This Listing Looks Legitimate",
        text: "Based on your answers, this rental has few red flags. You should still verify ownership through public records before paying any deposit.",
        action: "Proceed with normal caution"
      };
    }
    if (score <= 25) {
      return {
        headline: "Some Yellow Flags - Verify Before Paying",
        text: "There are a few concerning signs. Don't pay anything until you've verified the landlord and viewed the property in person (or had someone verify for you).",
        action: "Verify before proceeding"
      };
    }
    if (score <= 50) {
      return {
        headline: "Multiple Red Flags Detected",
        text: "This listing shows several warning signs of a potential scam. We strongly recommend professional verification before sending any money.",
        action: "Get professional verification"
      };
    }
    return {
      headline: "HIGH SCAM PROBABILITY",
      text: "This listing has major red flags consistent with rental scams. Do NOT send money. Do NOT share personal information. Walk away or get professional verification immediately.",
      action: "Do NOT proceed without verification"
    };
  };

  const score = calculateScore();
  const risk = getRiskLevel(score);
  const recommendation = getRecommendation(score);

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Score Display */}
          <div className={`bg-white rounded-2xl shadow-lg p-8 text-center mb-8`}>
            <p className="text-gray-500 text-sm uppercase tracking-wide mb-2">Your Scam Risk Score</p>
            
            <div className={`text-8xl font-bold mb-4 ${
              risk.color === 'green' ? 'text-green-500' :
              risk.color === 'yellow' ? 'text-yellow-500' :
              risk.color === 'orange' ? 'text-orange-500' :
              'text-red-500'
            }`}>
              {score}
            </div>
            
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-bold ${
              risk.color === 'green' ? 'bg-green-100 text-green-700' :
              risk.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
              risk.color === 'orange' ? 'bg-orange-100 text-orange-700' :
              'bg-red-100 text-red-700'
            }`}>
              <span>{risk.emoji}</span>
              <span>{risk.level} RISK</span>
            </div>

            {/* Risk Meter */}
            <div className="mt-6 h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${
                  risk.color === 'green' ? 'bg-green-500' :
                  risk.color === 'yellow' ? 'bg-yellow-500' :
                  risk.color === 'orange' ? 'bg-orange-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Safe</span>
              <span>Scam</span>
            </div>
          </div>

          {/* Recommendation */}
          <div className={`rounded-2xl p-6 mb-8 ${
            risk.color === 'green' ? 'bg-green-50 border-2 border-green-200' :
            risk.color === 'yellow' ? 'bg-yellow-50 border-2 border-yellow-200' :
            risk.color === 'orange' ? 'bg-orange-50 border-2 border-orange-200' :
            'bg-red-50 border-2 border-red-200'
          }`}>
            <h2 className="text-xl font-bold mb-2">{recommendation.headline}</h2>
            <p className="text-gray-700 mb-4">{recommendation.text}</p>
            <p className="font-medium">
              <strong>Recommended Action:</strong> {recommendation.action}
            </p>
          </div>

          {/* CTA */}
          {score > 15 && (
            <div className="bg-blue-900 text-white rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Want 100% Certainty?</h3>
              <p className="text-blue-200 mb-6">
                Our professional inspectors verify the apartment in person, confirm the landlord is legitimate, and send you a detailed report within 24 hours.
              </p>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
                Get Professional Verification — $149
              </button>
              <p className="text-blue-300 text-sm mt-4">
                Same-day available • Money-back guarantee
              </p>
            </div>
          )}

          {/* Retake */}
          <button 
            onClick={() => {
              setAnswers({});
              setCurrentStep(0);
              setShowResult(false);
            }}
            className="w-full mt-6 text-gray-500 hover:text-gray-700"
          >
            ← Take the quiz again
          </button>

          {/* Share */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm mb-3">Share your result:</p>
            <div className="flex justify-center gap-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">
                Share on Twitter
              </button>
              <button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                Share on Facebook
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔍 Rental Scam Risk Calculator
          </h1>
          <p className="text-gray-600">
            Answer 10 questions to get your scam risk score
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQuestion.id, option.score)}
                className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        {/* Back Button */}
        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="mt-4 text-gray-500 hover:text-gray-700"
          >
            ← Previous question
          </button>
        )}
      </div>
    </div>
  );
}

// Metadata for SEO
export const metadata = {
  title: "Rental Scam Risk Calculator | Is This Apartment a Scam? | DibbyTour",
  description: "Free tool to check if a rental listing is a scam. Answer 10 questions and get your scam risk score instantly. Protect yourself from rental fraud.",
  keywords: [
    "rental scam calculator",
    "is this apartment a scam",
    "rental scam detector",
    "rental fraud checker",
    "apartment scam test"
  ]
};
