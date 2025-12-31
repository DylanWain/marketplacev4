// REVERSE IMAGE SEARCH GUIDE FOR RENTALS
// Step-by-step tool to check if rental photos are stolen
// Targets "how to reverse image search" + "rental scam" searches

import React, { useState } from 'react';

export default function ReverseImageSearchGuide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [device, setDevice] = useState('');
  const [results, setResults] = useState({});

  const steps = [
    {
      id: 'choose_device',
      title: 'What device are you using?',
      type: 'choice',
      options: [
        { id: 'desktop', label: '💻 Desktop/Laptop', icon: '💻' },
        { id: 'iphone', label: '📱 iPhone', icon: '📱' },
        { id: 'android', label: '📱 Android', icon: '📱' }
      ]
    },
    {
      id: 'save_photos',
      title: 'Save the listing photos',
      type: 'instruction',
      desktop: {
        steps: [
          'Right-click on each photo in the listing',
          'Select "Save image as..." or "Save image"',
          'Save to a folder on your computer',
          'Or: Right-click and select "Copy image address" to get the URL'
        ]
      },
      iphone: {
        steps: [
          'Press and hold on the photo',
          'Tap "Add to Photos" or "Save Image"',
          'Repeat for each suspicious photo',
          'Or: Take a screenshot of the listing'
        ]
      },
      android: {
        steps: [
          'Press and hold on the photo',
          'Tap "Download image" or the download icon',
          'Image saves to your Downloads folder',
          'Or: Take a screenshot of the listing'
        ]
      }
    },
    {
      id: 'google_search',
      title: 'Search with Google Images',
      type: 'instruction',
      desktop: {
        steps: [
          'Go to images.google.com',
          'Click the camera icon in the search bar',
          'Choose "Upload a file" and select your saved photo',
          'Or: Drag and drop the image directly',
          'Or: Paste the image URL if you copied it'
        ],
        tip: 'Shortcut: Right-click any image and select "Search image with Google"'
      },
      iphone: {
        steps: [
          'Open Safari and go to images.google.com',
          'Tap the "aA" icon → Request Desktop Website',
          'Now you\'ll see the camera icon',
          'Tap it and upload your saved photo'
        ],
        tip: 'Alternative: Use the Google app - tap the camera icon to search with an image'
      },
      android: {
        steps: [
          'Open Chrome and go to images.google.com',
          'Tap the 3 dots → Request desktop site',
          'Now tap the camera icon in search bar',
          'Upload your saved image'
        ],
        tip: 'Alternative: In Chrome, long-press any image and select "Search with Google Lens"'
      }
    },
    {
      id: 'analyze_results',
      title: 'Analyze the results',
      type: 'checklist',
      checks: [
        {
          id: 'different_listing',
          label: 'Same photos appear on DIFFERENT rental listings',
          severity: 'critical',
          meaning: '🚨 SCAM ALERT: Scammer stole photos from another listing'
        },
        {
          id: 'different_address',
          label: 'Photos show up at a DIFFERENT address',
          severity: 'critical',
          meaning: '🚨 SCAM ALERT: Photos are from a different property entirely'
        },
        {
          id: 'real_estate_site',
          label: 'Photos appear on real estate sales sites',
          severity: 'high',
          meaning: '⚠️ WARNING: May be photos from when property was for sale. Could be outdated or stolen.'
        },
        {
          id: 'airbnb',
          label: 'Photos appear on Airbnb or VRBO',
          severity: 'high',
          meaning: '⚠️ WARNING: Could be a vacation rental scam - or landlord also lists on Airbnb. Verify.'
        },
        {
          id: 'stock_photos',
          label: 'Photos appear on stock photo sites',
          severity: 'critical',
          meaning: '🚨 SCAM ALERT: These are stock photos, not real apartment photos'
        },
        {
          id: 'no_results',
          label: 'No results or only this listing appears',
          severity: 'good',
          meaning: '✅ GOOD SIGN: Photos appear to be original. Still verify the property in person.'
        }
      ]
    },
    {
      id: 'alternative_tools',
      title: 'Try additional reverse image tools',
      type: 'tools',
      tools: [
        {
          name: 'TinEye',
          url: 'https://tineye.com',
          description: 'Specializes in finding exact image matches across the web'
        },
        {
          name: 'Yandex Images',
          url: 'https://yandex.com/images',
          description: 'Often finds matches that Google misses, especially for real estate'
        },
        {
          name: 'Bing Visual Search',
          url: 'https://www.bing.com/visualsearch',
          description: 'Microsoft\'s image search - good for finding similar images'
        }
      ]
    },
    {
      id: 'what_next',
      title: 'What to do with your findings',
      type: 'actions',
      scenarios: [
        {
          result: 'Found photos on other listings',
          actions: [
            'DO NOT send any money',
            'DO NOT share personal information',
            'Report the listing to the platform',
            'Report to FTC at ReportFraud.ftc.gov',
            'Warn others (share in apartment hunting groups)'
          ]
        },
        {
          result: 'Photos seem original',
          actions: [
            'Photos being original doesn\'t guarantee legitimacy',
            'Still verify the landlord owns the property',
            'Still view the apartment in person (or have someone verify)',
            'Never wire money regardless of photo authenticity'
          ]
        },
        {
          result: 'Unsure about results',
          actions: [
            'Get professional verification',
            'Ask landlord for a live video tour',
            'Request additional photos with today\'s date visible',
            'Trust your gut - if something feels off, it probably is'
          ]
        }
      ]
    }
  ];

  const handleDeviceSelect = (deviceId) => {
    setDevice(deviceId);
    setCurrentStep(1);
  };

  const handleCheckToggle = (checkId) => {
    setResults(prev => ({
      ...prev,
      [checkId]: !prev[checkId]
    }));
  };

  const currentStepData = steps[currentStep];
  const deviceInstructions = currentStepData[device] || currentStepData.desktop;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔎 Reverse Image Search for Rentals
          </h1>
          <p className="text-gray-600">
            Check if listing photos are stolen from other properties
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {currentStep + 1} of {steps.length}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {currentStepData.title}
          </h2>

          {/* Device Selection */}
          {currentStepData.type === 'choice' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentStepData.options.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleDeviceSelect(option.id)}
                  className="p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
                >
                  <span className="text-4xl block mb-2">{option.icon}</span>
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Instructions */}
          {currentStepData.type === 'instruction' && deviceInstructions && (
            <div>
              <ol className="space-y-3">
                {deviceInstructions.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
              {deviceInstructions.tip && (
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                  <p className="text-yellow-800">
                    💡 <strong>Pro tip:</strong> {deviceInstructions.tip}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Checklist */}
          {currentStepData.type === 'checklist' && (
            <div className="space-y-4">
              {currentStepData.checks.map(check => (
                <div 
                  key={check.id}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    results[check.id]
                      ? check.severity === 'critical' ? 'border-red-500 bg-red-50' :
                        check.severity === 'high' ? 'border-orange-500 bg-orange-50' :
                        'border-green-500 bg-green-50'
                      : 'border-gray-200'
                  }`}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={results[check.id] || false}
                      onChange={() => handleCheckToggle(check.id)}
                      className="w-5 h-5 mt-0.5"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{check.label}</p>
                      {results[check.id] && (
                        <p className={`text-sm mt-1 ${
                          check.severity === 'critical' ? 'text-red-700' :
                          check.severity === 'high' ? 'text-orange-700' :
                          'text-green-700'
                        }`}>
                          {check.meaning}
                        </p>
                      )}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          )}

          {/* Tools */}
          {currentStepData.type === 'tools' && (
            <div className="space-y-4">
              {currentStepData.tools.map(tool => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <h3 className="font-bold text-blue-700">{tool.name} →</h3>
                  <p className="text-gray-600 text-sm">{tool.description}</p>
                </a>
              ))}
            </div>
          )}

          {/* Actions */}
          {currentStepData.type === 'actions' && (
            <div className="space-y-6">
              {currentStepData.scenarios.map((scenario, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-3">
                    If you {scenario.result.toLowerCase()}:
                  </h3>
                  <ul className="space-y-2">
                    {scenario.actions.map((action, j) => (
                      <li key={j} className="flex items-start gap-2 text-gray-700">
                        <span>•</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          {currentStep > 0 ? (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="text-gray-500 hover:text-gray-700"
            >
              ← Previous
            </button>
          ) : <div />}
          
          {currentStep < steps.length - 1 && currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Next Step →
            </button>
          )}
        </div>

        {/* CTA */}
        {currentStep === steps.length - 1 && (
          <div className="bg-blue-900 text-white rounded-xl p-8 text-center mt-8">
            <h3 className="text-xl font-bold mb-4">Still Not Sure?</h3>
            <p className="text-blue-200 mb-6">
              Photos can be tricky. Our professional team verifies the actual property in person, 
              confirms the landlord is legitimate, and sends you a detailed report.
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-colors">
              Get Professional Verification — $149
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export const metadata = {
  title: "How to Reverse Image Search Rental Photos | Find Stolen Listing Photos | DibbyTour",
  description: "Step-by-step guide to reverse image search rental listing photos. Detect if photos are stolen from other listings. Protect yourself from rental scams.",
  keywords: [
    "reverse image search rental",
    "check if rental photos are stolen",
    "rental listing photo scam",
    "fake apartment photos",
    "how to reverse image search"
  ]
};
