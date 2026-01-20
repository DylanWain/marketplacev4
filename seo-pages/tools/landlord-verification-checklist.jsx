// LANDLORD VERIFICATION CHECKLIST TOOL
// Interactive checklist for verifying landlord legitimacy
// High SEO value - "how to verify landlord" searches

import React, { useState } from 'react';

export default function LandlordVerificationTool() {
  const [checks, setChecks] = useState({});
  const [landlordName, setLandlordName] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');

  const verificationSteps = [
    {
      id: 'ownership',
      category: 'Property Ownership',
      critical: true,
      items: [
        {
          id: 'county_records',
          text: 'Searched county property records for owner name',
          howTo: 'Search "[County Name] property records" or "assessor" and enter the address',
          link: 'https://www.google.com/search?q=property+records+by+county'
        },
        {
          id: 'name_matches',
          text: 'Owner name on record matches who I\'m dealing with',
          howTo: 'The name on county records should match your landlord (or their LLC/company)',
          warning: 'If names don\'t match, ask for proof of authorization to rent'
        },
        {
          id: 'llc_verified',
          text: 'If LLC, verified the LLC is real and active',
          howTo: 'Search Secretary of State business database for the LLC name',
          link: 'https://www.google.com/search?q=secretary+of+state+business+search'
        }
      ]
    },
    {
      id: 'identity',
      category: 'Identity Verification',
      critical: true,
      items: [
        {
          id: 'id_seen',
          text: 'Seen landlord\'s government ID (in person or video call)',
          howTo: 'Ask to see ID during an in-person meeting or live video call',
          warning: 'Never accept a photo of ID sent via text/email - these are easily faked'
        },
        {
          id: 'google_name',
          text: 'Googled landlord\'s name + "scam" or "fraud"',
          howTo: 'Search "John Smith landlord scam" or "John Smith rental fraud"',
        },
        {
          id: 'phone_verified',
          text: 'Phone number is verifiable (not just Google Voice)',
          howTo: 'Search the phone number - legitimate landlords often have traceable numbers',
        },
        {
          id: 'email_matches',
          text: 'Email address matches their stated name/company',
          howTo: 'landlord@gmail.com is less trustworthy than john@smithproperties.com',
        }
      ]
    },
    {
      id: 'property',
      category: 'Property Verification',
      critical: true,
      items: [
        {
          id: 'address_exists',
          text: 'Verified address exists on Google Maps/Street View',
          howTo: 'Search the address on Google Maps and use Street View to see the building',
        },
        {
          id: 'photos_real',
          text: 'Reverse image searched listing photos',
          howTo: 'Right-click photos → "Search image with Google" or use images.google.com',
          warning: 'If photos appear on other listings at different addresses = SCAM'
        },
        {
          id: 'visited_property',
          text: 'Visited the property in person (or had it verified)',
          howTo: 'Tour the actual unit, not just the lobby or exterior',
        },
        {
          id: 'unit_number_verified',
          text: 'Confirmed specific unit number exists in building',
          howTo: 'Check mailboxes, unit directory, or ask building management',
        }
      ]
    },
    {
      id: 'communication',
      category: 'Communication Red Flags',
      critical: false,
      items: [
        {
          id: 'responsive',
          text: 'Landlord responds to calls (not just texts/email)',
          howTo: 'Try calling - scammers often avoid phone calls',
        },
        {
          id: 'story_consistent',
          text: 'Story has remained consistent throughout',
          howTo: 'Note any changes in their story - scammers often forget their lies',
        },
        {
          id: 'no_overseas',
          text: 'Landlord is NOT claiming to be overseas/deployed',
          howTo: '"I\'m a missionary in Nigeria" = classic scam setup',
          warning: 'Overseas landlord who can\'t show property = major red flag'
        },
        {
          id: 'no_pressure',
          text: 'No extreme pressure to pay immediately',
          howTo: 'Legitimate landlords give you time to verify',
        }
      ]
    },
    {
      id: 'payment',
      category: 'Payment Safety',
      critical: true,
      items: [
        {
          id: 'no_wire',
          text: 'NOT being asked to wire money',
          howTo: 'Wire transfer requests are the #1 scam indicator',
          warning: 'NEVER wire money for a rental - this is almost always a scam'
        },
        {
          id: 'no_gift_cards',
          text: 'NOT being asked for gift cards, crypto, or cash apps',
          howTo: 'These payment methods are untraceable - scammer favorites',
        },
        {
          id: 'lease_first',
          text: 'Will receive lease BEFORE paying deposit',
          howTo: 'Normal order: Tour → Apply → Lease → THEN payment',
        },
        {
          id: 'receipt_provided',
          text: 'Will receive official receipt for any payments',
          howTo: 'Always get written documentation of payments',
        }
      ]
    },
    {
      id: 'documentation',
      category: 'Documentation',
      critical: false,
      items: [
        {
          id: 'lease_reviewed',
          text: 'Reviewed the lease carefully (or had lawyer review)',
          howTo: 'Read every page - look for unusual terms or missing info',
        },
        {
          id: 'lease_standard',
          text: 'Lease appears standard (not handwritten/unusual)',
          howTo: 'Compare to standard lease templates online',
        },
        {
          id: 'references_available',
          text: 'Can provide references from previous tenants',
          howTo: 'Ask for contact info of current/past tenants',
        }
      ]
    }
  ];

  const handleCheck = (itemId) => {
    setChecks(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const getScore = () => {
    const totalItems = verificationSteps.flatMap(s => s.items).length;
    const checkedItems = Object.values(checks).filter(Boolean).length;
    return Math.round((checkedItems / totalItems) * 100);
  };

  const getCriticalScore = () => {
    const criticalItems = verificationSteps
      .filter(s => s.critical)
      .flatMap(s => s.items);
    const checkedCritical = criticalItems.filter(item => checks[item.id]).length;
    return Math.round((checkedCritical / criticalItems.length) * 100);
  };

  const getMissingCritical = () => {
    return verificationSteps
      .filter(s => s.critical)
      .flatMap(s => s.items)
      .filter(item => !checks[item.id]);
  };

  const score = getScore();
  const criticalScore = getCriticalScore();
  const missingCritical = getMissingCritical();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔍 Landlord Verification Checklist
          </h1>
          <p className="text-gray-600">
            Use this checklist to verify your landlord is legitimate before paying any money
          </p>
        </div>

        {/* Property Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-4">Property Details (for your records)</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Landlord Name</label>
              <input
                type="text"
                value={landlordName}
                onChange={(e) => setLandlordName(e.target.value)}
                placeholder="John Smith"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Property Address</label>
              <input
                type="text"
                value={propertyAddress}
                onChange={(e) => setPropertyAddress(e.target.value)}
                placeholder="123 Main St, Apt 4B, New York, NY"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          </div>
        </div>

        {/* Score Display */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Overall Progress</p>
              <div className="text-4xl font-bold text-blue-600">{score}%</div>
              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Critical Items</p>
              <div className={`text-4xl font-bold ${
                criticalScore >= 80 ? 'text-green-600' :
                criticalScore >= 50 ? 'text-yellow-600' :
                'text-red-600'
              }`}>{criticalScore}%</div>
              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div 
                  className={`h-full rounded-full transition-all ${
                    criticalScore >= 80 ? 'bg-green-500' :
                    criticalScore >= 50 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${criticalScore}%` }}
                />
              </div>
            </div>
          </div>

          {missingCritical.length > 0 && criticalScore < 100 && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg">
              <p className="text-red-800 font-medium">
                ⚠️ {missingCritical.length} critical verification{missingCritical.length > 1 ? 's' : ''} not complete
              </p>
              <p className="text-red-600 text-sm mt-1">
                Complete all critical items before paying any money
              </p>
            </div>
          )}

          {criticalScore === 100 && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-green-800 font-medium">
                ✅ All critical verifications complete!
              </p>
              <p className="text-green-600 text-sm mt-1">
                This landlord has passed your verification checklist
              </p>
            </div>
          )}
        </div>

        {/* Checklist Sections */}
        {verificationSteps.map(section => (
          <div key={section.id} className="bg-white rounded-xl shadow-sm p-6 mb-4">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              {section.category}
              {section.critical && (
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                  CRITICAL
                </span>
              )}
            </h2>

            <div className="space-y-4">
              {section.items.map(item => (
                <div 
                  key={item.id}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    checks[item.id] 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checks[item.id] || false}
                      onChange={() => handleCheck(item.id)}
                      className="w-5 h-5 mt-0.5 rounded border-gray-300"
                    />
                    <div className="flex-1">
                      <p className={`font-medium ${checks[item.id] ? 'text-green-800' : 'text-gray-900'}`}>
                        {item.text}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{item.howTo}</p>
                      {item.warning && (
                        <p className="text-sm text-red-600 mt-1">⚠️ {item.warning}</p>
                      )}
                      {item.link && (
                        <a 
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline mt-1 inline-block"
                        >
                          → Helpful resource
                        </a>
                      )}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="bg-blue-900 text-white rounded-xl p-8 text-center mt-8">
          <h2 className="text-2xl font-bold mb-4">Don't Want to Do This Yourself?</h2>
          <p className="text-blue-200 mb-6">
            Our professional team verifies landlords and inspects properties for you. 
            We check ownership records, visit the property in person, and send you a detailed report.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg">
            Get Professional Verification — $149
          </button>
          <p className="text-blue-300 text-sm mt-4">
            Results in 24 hours • Money-back guarantee
          </p>
        </div>

        {/* Print Button */}
        <div className="text-center mt-6">
          <button 
            onClick={() => window.print()}
            className="text-gray-500 hover:text-gray-700"
          >
            🖨️ Print this checklist
          </button>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Landlord Verification Checklist | How to Verify a Landlord | DibbyTour",
  description: "Free interactive checklist to verify your landlord is legitimate. Check property ownership, verify identity, and protect yourself from rental scams.",
  keywords: [
    "how to verify landlord",
    "landlord verification",
    "check if landlord is real",
    "verify landlord owns property",
    "landlord scam check"
  ]
};
