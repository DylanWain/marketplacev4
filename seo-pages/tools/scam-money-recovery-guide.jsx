// WIRE TRANSFER SCAM RECOVERY TOOL
// Step-by-step guide for people who already sent money
// Captures leads from "just got scammed" searches

import React, { useState } from 'react';

export default function WireTransferRecoveryTool() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [timeElapsed, setTimeElapsed] = useState('');
  const [amount, setAmount] = useState('');
  const [showPlan, setShowPlan] = useState(false);

  const paymentMethods = [
    { id: 'wire', name: 'Bank Wire Transfer', recoveryChance: 'Very Low (5-10%)', color: 'red' },
    { id: 'zelle', name: 'Zelle', recoveryChance: 'Low (10-20%)', color: 'red' },
    { id: 'venmo', name: 'Venmo', recoveryChance: 'Medium (30-40%)', color: 'yellow' },
    { id: 'paypal', name: 'PayPal', recoveryChance: 'Medium-High (40-60%)', color: 'yellow' },
    { id: 'cashapp', name: 'Cash App', recoveryChance: 'Low (15-25%)', color: 'red' },
    { id: 'credit', name: 'Credit Card', recoveryChance: 'High (70-85%)', color: 'green' },
    { id: 'debit', name: 'Debit Card', recoveryChance: 'Medium (40-60%)', color: 'yellow' },
    { id: 'check', name: 'Check', recoveryChance: 'Medium (if not cashed)', color: 'yellow' },
    { id: 'crypto', name: 'Cryptocurrency', recoveryChance: 'Almost Zero', color: 'red' },
    { id: 'giftcard', name: 'Gift Cards', recoveryChance: 'Almost Zero', color: 'red' },
    { id: 'cash', name: 'Cash', recoveryChance: 'Zero', color: 'red' }
  ];

  const timeOptions = [
    { id: 'minutes', name: 'Less than 1 hour ago', urgency: 'critical' },
    { id: 'hours', name: '1-24 hours ago', urgency: 'high' },
    { id: 'days', name: '1-7 days ago', urgency: 'medium' },
    { id: 'weeks', name: 'More than a week ago', urgency: 'low' }
  ];

  const getRecoveryPlan = () => {
    const method = paymentMethods.find(m => m.id === paymentMethod);
    const time = timeOptions.find(t => t.id === timeElapsed);
    
    const plans = {
      wire: {
        critical: [
          { step: 1, action: 'CALL YOUR BANK NOW', detail: 'Call your bank\'s fraud line immediately. Wire transfers can sometimes be stopped within 24-48 hours if the receiving bank hasn\'t released funds.', priority: 'CRITICAL' },
          { step: 2, action: 'Request a wire recall', detail: 'Ask your bank to initiate a wire recall. This requests the receiving bank to return the funds. Success rate is low but possible if acted on quickly.', priority: 'HIGH' },
          { step: 3, action: 'File a police report', detail: 'File immediately - you\'ll need the case number for bank disputes and potential recovery efforts.', priority: 'HIGH' },
          { step: 4, action: 'Report to FBI IC3', detail: 'File at ic3.gov - the FBI tracks these scams and occasionally recovers funds in larger operations.', priority: 'MEDIUM' }
        ],
        hours: [
          { step: 1, action: 'Call your bank immediately', detail: 'There\'s still a small window. Banks can attempt wire recalls within 24-72 hours.', priority: 'CRITICAL' },
          { step: 2, action: 'File police report', detail: 'Do this today - you\'ll need documentation for any recovery attempts.', priority: 'HIGH' },
          { step: 3, action: 'Report to FTC and FBI IC3', detail: 'File at ReportFraud.ftc.gov and ic3.gov', priority: 'HIGH' }
        ],
        default: [
          { step: 1, action: 'Contact your bank', detail: 'Even if time has passed, document the fraud with your bank. They may have recovery programs or can flag the receiving account.', priority: 'MEDIUM' },
          { step: 2, action: 'File police report', detail: 'Important for documentation and potential future recovery if scammer is caught.', priority: 'MEDIUM' },
          { step: 3, action: 'Report to authorities', detail: 'FTC (ReportFraud.ftc.gov) and FBI IC3 (ic3.gov). Your report helps build cases against scam rings.', priority: 'MEDIUM' }
        ]
      },
      credit: {
        default: [
          { step: 1, action: 'Call your credit card company', detail: 'Request a chargeback for fraud. Credit cards have strong consumer protections - success rate is 70-85%.', priority: 'CRITICAL' },
          { step: 2, action: 'File written dispute', detail: 'Follow up your call with written documentation. Include all evidence of the scam.', priority: 'HIGH' },
          { step: 3, action: 'File police report', detail: 'Some credit card companies require this for fraud disputes.', priority: 'MEDIUM' }
        ]
      },
      zelle: {
        default: [
          { step: 1, action: 'Contact your bank', detail: 'Zelle disputes go through your bank, not Zelle. Report as unauthorized transaction.', priority: 'CRITICAL' },
          { step: 2, action: 'File Reg E dispute', detail: 'If sent from a bank account, you may have Regulation E protections for unauthorized transfers.', priority: 'HIGH' },
          { step: 3, action: 'File police report', detail: 'Documentation helps with bank disputes.', priority: 'MEDIUM' },
          { step: 4, action: 'Report to Zelle', detail: 'Report the receiving account to Zelle to help protect others.', priority: 'LOW' }
        ]
      },
      venmo: {
        default: [
          { step: 1, action: 'Open Venmo dispute', detail: 'Go to the transaction and select "Get Help". Venmo has some buyer protection for business transactions.', priority: 'CRITICAL' },
          { step: 2, action: 'Contact your bank', detail: 'If Venmo was linked to a bank or card, dispute through them as well.', priority: 'HIGH' },
          { step: 3, action: 'File police report', detail: 'Strengthens your case with Venmo and bank.', priority: 'MEDIUM' }
        ]
      },
      paypal: {
        default: [
          { step: 1, action: 'File PayPal dispute', detail: 'Go to Resolution Center. PayPal has buyer protection - success rate is 40-60%.', priority: 'CRITICAL' },
          { step: 2, action: 'Escalate to claim', detail: 'If seller doesn\'t respond in 7 days, escalate to PayPal claim.', priority: 'HIGH' },
          { step: 3, action: 'Credit card chargeback', detail: 'If PayPal was funded by credit card, file chargeback as backup.', priority: 'HIGH' }
        ]
      },
      check: {
        critical: [
          { step: 1, action: 'CALL YOUR BANK NOW', detail: 'Stop payment on the check immediately. If not cashed, you can recover 100%.', priority: 'CRITICAL' },
          { step: 2, action: 'Request stop payment', detail: 'This usually costs $30-35 but saves your full payment amount.', priority: 'CRITICAL' }
        ],
        default: [
          { step: 1, action: 'Check if cashed', detail: 'Log into your bank to see if the check has cleared. If not, stop payment immediately.', priority: 'CRITICAL' },
          { step: 2, action: 'File police report', detail: 'If already cashed, document for potential recovery.', priority: 'MEDIUM' }
        ]
      },
      crypto: {
        default: [
          { step: 1, action: 'Document everything', detail: 'Screenshot wallet addresses, transaction IDs, all communications.', priority: 'MEDIUM' },
          { step: 2, action: 'File police report', detail: 'Crypto is traceable on blockchain - occasionally large scam operations are busted.', priority: 'MEDIUM' },
          { step: 3, action: 'Report to FBI IC3', detail: 'FBI has recovered some crypto in major fraud cases.', priority: 'LOW' },
          { step: 4, action: 'Accept the reality', detail: 'Crypto recovery is extremely rare. Focus on reporting to protect others.', priority: 'INFO' }
        ]
      },
      giftcard: {
        critical: [
          { step: 1, action: 'Contact gift card company', detail: 'Call immediately with card numbers. Cards may be frozen if not yet redeemed.', priority: 'CRITICAL' },
          { step: 2, action: 'Report as fraud', detail: 'Most gift card companies have fraud departments - act fast.', priority: 'HIGH' }
        ],
        default: [
          { step: 1, action: 'Contact gift card company', detail: 'Some may reimburse if you can prove fraud and cards haven\'t been fully redeemed.', priority: 'MEDIUM' },
          { step: 2, action: 'File FTC report', detail: 'FTC tracks gift card scams at ReportFraud.ftc.gov', priority: 'LOW' }
        ]
      },
      default: {
        default: [
          { step: 1, action: 'Contact your bank/payment provider', detail: 'Report the fraud and ask about recovery options.', priority: 'HIGH' },
          { step: 2, action: 'File police report', detail: 'Document the fraud officially.', priority: 'MEDIUM' },
          { step: 3, action: 'Report to FTC', detail: 'File at ReportFraud.ftc.gov', priority: 'MEDIUM' }
        ]
      }
    };

    const methodPlans = plans[paymentMethod] || plans.default;
    const timePlan = methodPlans[timeElapsed] || methodPlans.critical || methodPlans.default;
    
    return timePlan;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPlan(true);
  };

  const selectedMethod = paymentMethods.find(m => m.id === paymentMethod);
  const selectedTime = timeOptions.find(t => t.id === timeElapsed);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            💰 Scam Money Recovery Guide
          </h1>
          <p className="text-gray-600">
            Sent money to a rental scammer? Get your personalized recovery action plan.
          </p>
        </div>

        {/* Urgency Notice */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-8">
          <p className="text-red-800 font-medium text-center">
            ⚡ TIME IS CRITICAL. The faster you act, the better your chances of recovery.
          </p>
        </div>

        {!showPlan ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
            {/* Payment Method */}
            <div className="mb-8">
              <label className="block text-lg font-bold text-gray-900 mb-4">
                How did you send the money?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {paymentMethods.map(method => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      paymentMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium block">{method.name}</span>
                    <span className={`text-xs ${
                      method.color === 'red' ? 'text-red-600' :
                      method.color === 'yellow' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {method.recoveryChance}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Elapsed */}
            <div className="mb-8">
              <label className="block text-lg font-bold text-gray-900 mb-4">
                When did you send it?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {timeOptions.map(option => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setTimeElapsed(option.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      timeElapsed === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium">{option.name}</span>
                    {option.urgency === 'critical' && (
                      <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                        ACT NOW
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div className="mb-8">
              <label className="block text-lg font-bold text-gray-900 mb-4">
                How much did you lose?
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full border-2 border-gray-200 rounded-lg px-8 py-4 text-2xl"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!paymentMethod || !timeElapsed}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
            >
              Get My Recovery Plan
            </button>
          </form>
        ) : (
          <div>
            {/* Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="font-bold text-gray-900 mb-4">Your Situation</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-bold">{selectedMethod?.name}</p>
                  <p className={`text-sm ${
                    selectedMethod?.color === 'red' ? 'text-red-600' :
                    selectedMethod?.color === 'yellow' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    Recovery: {selectedMethod?.recoveryChance}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Time Elapsed</p>
                  <p className="font-bold">{selectedTime?.name}</p>
                </div>
                {amount && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-bold text-xl">${parseInt(amount).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recovery Plan */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="font-bold text-gray-900 mb-4">Your Recovery Action Plan</h2>
              
              <div className="space-y-4">
                {getRecoveryPlan().map((item, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      item.priority === 'CRITICAL' ? 'border-red-500 bg-red-50' :
                      item.priority === 'HIGH' ? 'border-orange-500 bg-orange-50' :
                      item.priority === 'MEDIUM' ? 'border-yellow-500 bg-yellow-50' :
                      'border-gray-300 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        item.priority === 'CRITICAL' ? 'bg-red-500' :
                        item.priority === 'HIGH' ? 'bg-orange-500' :
                        item.priority === 'MEDIUM' ? 'bg-yellow-500' :
                        'bg-gray-400'
                      }`}>
                        {item.step}
                      </span>
                      <div>
                        <h3 className="font-bold text-gray-900">{item.action}</h3>
                        <p className="text-gray-600 text-sm mt-1">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Contacts */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="font-bold text-gray-900 mb-4">Important Resources</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="https://reportfraud.ftc.gov" target="_blank" rel="noopener noreferrer" 
                   className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <p className="font-bold text-blue-900">FTC Fraud Report</p>
                  <p className="text-blue-700 text-sm">ReportFraud.ftc.gov</p>
                </a>
                <a href="https://www.ic3.gov" target="_blank" rel="noopener noreferrer"
                   className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <p className="font-bold text-blue-900">FBI Internet Crime</p>
                  <p className="text-blue-700 text-sm">ic3.gov</p>
                </a>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gray-900 text-white rounded-xl p-8 text-center">
              <h2 className="text-xl font-bold mb-4">Need Help Documenting the Scam?</h2>
              <p className="text-gray-300 mb-6">
                We can help verify the property was fake, document the scam, 
                and provide official reports for your bank disputes and police reports.
              </p>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Get Scam Documentation — $99
              </button>
            </div>

            {/* Start Over */}
            <button
              onClick={() => {
                setShowPlan(false);
                setPaymentMethod('');
                setTimeElapsed('');
                setAmount('');
              }}
              className="w-full mt-4 text-gray-500 hover:text-gray-700"
            >
              ← Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export const metadata = {
  title: "Rental Scam Money Recovery Guide | Got Scammed? What To Do | DibbyTour",
  description: "Sent money to a rental scammer? Get a personalized recovery action plan based on how you paid and when. Free tool to maximize your chances of getting money back.",
  keywords: [
    "rental scam recovery",
    "get money back scam",
    "wire transfer scam recovery",
    "rental fraud refund",
    "scammed on apartment"
  ]
};
