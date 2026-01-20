'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';

const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyKqQAIpLpAmb2TFc_AjgCzSeHfzZk5TKLOasUwFfW3uMJH5DKA05a9g6-Db3tqUexa/exec';

const EMAILJS_SERVICE_ID = 'service_1rrwiuo';
const EMAILJS_CUSTOMER_TEMPLATE = 'template_2kcwz9e';
const EMAILJS_ADMIN_TEMPLATE = 'template_dcrzs54';
const EMAILJS_PUBLIC_KEY = 'G-bnsWd8dDK3bcgC6';

const sendEmailNotifications = async (orderData) => {
  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CUSTOMER_TEMPLATE, {
      to_email: orderData.email,
      customer_name: orderData.name,
      orderId: orderData.orderId,
      service: orderData.service,
      listingTitle: orderData.listingTitle || orderData.listingUrl,
      price: orderData.price,
      customer_email: orderData.email,
    }, EMAILJS_PUBLIC_KEY);

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_ADMIN_TEMPLATE, {
      orderId: orderData.orderId,
      customer_name: orderData.name,
      customer_email: orderData.email,
      customer_phone: orderData.phone,
      service: orderData.service,
      listingTitle: orderData.listingTitle || orderData.listingUrl,
      listingUrl: orderData.listingUrl,
      price: orderData.price,
      location: orderData.location || 'Not specified',
      notes: orderData.notes || 'No additional notes',
    }, EMAILJS_PUBLIC_KEY);
  } catch (error) {
    console.error('Email sending failed:', error);
  }
};

const propertyTypes = [
  { id: 'apartment', label: 'Apartment', description: 'Rental units, condos, lofts', gradient: 'from-violet-500 to-purple-600' },
  { id: 'house', label: 'House', description: 'Single family homes', gradient: 'from-blue-500 to-cyan-500' },
  { id: 'vehicle', label: 'Vehicle', description: 'Cars, trucks, motorcycles', gradient: 'from-amber-500 to-orange-500' },
  { id: 'item', label: 'Other Item', description: 'Furniture, electronics, etc.', gradient: 'from-emerald-500 to-teal-500' },
];

const packages = [
  {
    id: 'standard',
    name: 'Standard',
    price: 100,
    description: 'Everything you need for a complete inspection.',
    features: ['50+ HD photos', 'Full video walkthrough', 'Detailed inspection report', 'Live FaceTime option'],
  },
  {
    id: 'complete',
    name: 'Complete',
    price: 150,
    popular: true,
    description: 'Day + night inspection for the full picture.',
    features: ['Everything in Standard', 'Night tour included', 'Noise assessment (day & night)', 'Parking availability check'],
  },
];

function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-white' : 'text-white/40'}`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300
          ${currentStep >= 1 
            ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-black shadow-lg shadow-amber-500/25' 
            : 'bg-white/10 text-white/50 border border-white/10'}`}>
          {currentStep > 1 ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : '1'}
        </div>
        <span className="hidden sm:inline text-sm font-semibold">Details</span>
      </div>
      
      <div className={`w-16 h-0.5 rounded-full transition-all duration-500 ${currentStep > 1 ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-white/10'}`} />
      
      <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-white' : 'text-white/40'}`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300
          ${currentStep >= 2 
            ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-black shadow-lg shadow-amber-500/25' 
            : 'bg-white/10 text-white/50 border border-white/10'}`}>
          2
        </div>
        <span className="hidden sm:inline text-sm font-semibold">Checkout</span>
      </div>
    </div>
  );
}

function OrderSummary({ formData, selectedPackage }) {
  const pkg = packages.find(p => p.id === selectedPackage) || packages[0];
  const propertyType = propertyTypes.find(p => p.id === formData.propertyType);
  
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
      
      <div className="relative rounded-3xl p-8 backdrop-blur-xl border border-white/10 bg-white/[0.03]">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">Order Summary</h3>
            <p className="text-sm text-white/50">Review your inspection</p>
          </div>
        </div>
        
        <div className="space-y-5 pb-6 mb-6 border-b border-white/10">
          {formData.listingUrl && (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">Listing URL</p>
              <p className="text-sm text-white/90 truncate font-mono">{formData.listingUrl}</p>
            </div>
          )}
          
          {propertyType && (
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${propertyType.gradient} flex items-center justify-center`}>
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-white/40 uppercase tracking-wider">Property Type</p>
                <p className="text-white font-semibold">{propertyType.label}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
            <div>
              <p className="text-xs font-medium text-white/40 uppercase tracking-wider">Package</p>
              <p className="text-white font-bold text-lg">{pkg.name}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-white">${pkg.price}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <p className="text-white/60 font-medium">Total</p>
          <div className="text-right">
            <p className="text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">${pkg.price}</p>
            <p className="text-xs text-white/40 mt-1">One-time payment</p>
          </div>
        </div>
        
        <div className="space-y-3 pt-6 border-t border-white/10">
          {[
            { icon: '🛡️', text: 'Money-back guarantee' },
            { icon: '⚡', text: '24-hour delivery' },
            { icon: '🔒', text: 'Secure checkout' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-white/60 text-sm">
              <span className="text-lg">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BookingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    listingUrl: '',
    propertyType: '',
    package: 'standard',
    notes: '',
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
  });

  useEffect(() => {
    const pkg = searchParams.get('package');
    if (pkg && (pkg === 'standard' || pkg === 'complete')) {
      setFormData(prev => ({ ...prev, package: pkg }));
    }
  }, [searchParams]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStep1Valid = () => formData.listingUrl && formData.propertyType && formData.package;
  const isStep2Valid = () => formData.name && formData.email && formData.phone;

  const handleSubmit = async () => {
    if (!isStep2Valid()) return;
    setIsSubmitting(true);
    
    const orderId = `DBT-${Date.now().toString(36).toUpperCase()}`;
    const pkg = packages.find(p => p.id === formData.package);
    
    const orderData = {
      orderId,
      ...formData,
      service: `${formData.propertyType} - ${pkg?.name}`,
      price: pkg?.price,
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      await sendEmailNotifications(orderData);
      router.push(`/confirmation?orderId=${orderId}&email=${encodeURIComponent(formData.email)}`);
    } catch (error) {
      console.error('Error:', error);
      router.push(`/confirmation?orderId=${orderId}&email=${encodeURIComponent(formData.email)}`);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-amber-500/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[80px]" />
      </div>
      
      <nav className="relative z-50 border-b border-white/10 backdrop-blur-xl bg-black/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <img src="/images/dibby-dog-transparent.png" alt="DibbyTour" className="w-12 h-12 object-contain" />
              <span className="text-xl font-bold text-white">DibbyTour</span>
            </Link>
            <StepIndicator currentStep={step} />
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-3">
            {step === 1 ? (
              <div className="space-y-10">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                    Tell us about the{' '}
                    <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">listing.</span>
                  </h1>
                  <p className="text-xl text-white/60">
                    We'll send a local inspector to check it out in person.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white/80 uppercase tracking-wider">
                    Listing URL <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/50 to-pink-500/50 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center">
                      <div className="absolute left-5 text-white/30">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                        </svg>
                      </div>
                      <input
                        type="url"
                        value={formData.listingUrl}
                        onChange={(e) => handleChange('listingUrl', e.target.value)}
                        placeholder="https://zillow.com/homedetails/..."
                        className="w-full pl-14 pr-5 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.07] transition-all duration-300 text-lg"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-white/40 flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    Works with Zillow, Apartments.com, Craigslist, Facebook Marketplace
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-white/80 uppercase tracking-wider">
                    What are we inspecting? <span className="text-amber-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {propertyTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => handleChange('propertyType', type.id)}
                        className={`group relative p-6 rounded-2xl text-left transition-all duration-300 overflow-hidden
                          ${formData.propertyType === type.id 
                            ? 'bg-white/10 border-2 border-amber-500/50 shadow-lg shadow-amber-500/10' 
                            : 'bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20'}`}
                      >
                        {formData.propertyType === type.id && (
                          <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                            <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          </div>
                        )}
                        
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${type.gradient} flex items-center justify-center mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            {type.id === 'apartment' && <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />}
                            {type.id === 'house' && <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />}
                            {type.id === 'vehicle' && <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />}
                            {type.id === 'item' && <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />}
                          </svg>
                        </div>
                        <h4 className="font-bold text-white text-lg mb-1">{type.label}</h4>
                        <p className="text-sm text-white/50">{type.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-white/80 uppercase tracking-wider">
                    Choose your package <span className="text-amber-400">*</span>
                  </label>
                  <div className="space-y-4">
                    {packages.map((pkg) => (
                      <button
                        key={pkg.id}
                        onClick={() => handleChange('package', pkg.id)}
                        className={`relative w-full p-6 rounded-2xl text-left transition-all duration-300 overflow-hidden
                          ${formData.package === pkg.id 
                            ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/50' 
                            : 'bg-white/[0.03] border border-white/10 hover:bg-white/[0.06]'}`}
                      >
                        {pkg.popular && (
                          <div className="absolute top-0 right-0 px-4 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs font-bold rounded-bl-xl rounded-tr-2xl">
                            MOST POPULAR
                          </div>
                        )}
                        
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 mt-1
                              ${formData.package === pkg.id 
                                ? 'border-amber-500 bg-amber-500' 
                                : 'border-white/30'}`}>
                              {formData.package === pkg.id && (
                                <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <h4 className="font-bold text-white text-xl mb-1">{pkg.name}</h4>
                              <p className="text-white/50 text-sm mb-4">{pkg.description}</p>
                              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                                {pkg.features.map((feature, i) => (
                                  <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                                    <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    <span>{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-3xl font-black text-white">${pkg.price}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white/80 uppercase tracking-wider">
                    Special requests <span className="text-white/40 normal-case font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Any specific areas you want us to check? Questions for the inspector?"
                    rows={3}
                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.07] transition-all duration-300 resize-none"
                  />
                </div>
                
                <div className="pt-4">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!isStep1Valid()}
                    className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-300 group-hover:shadow-lg group-hover:shadow-amber-500/30" />
                    <span className="relative text-black">Continue to Checkout</span>
                    <svg className="relative w-5 h-5 text-black transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-10">
                <div>
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
                  >
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    <span>Back to details</span>
                  </button>
                  
                  <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                    Complete your{' '}
                    <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">booking.</span>
                  </h1>
                  <p className="text-xl text-white/60">
                    Enter your contact details and we'll get started.
                  </p>
                </div>
                
                <div className="space-y-6">
                  {[
                    { field: 'name', label: 'Full Name', type: 'text', placeholder: 'Jane Doe', required: true },
                    { field: 'email', label: 'Email Address', type: 'email', placeholder: 'jane@example.com', required: true, hint: "We'll send your inspection report here." },
                    { field: 'phone', label: 'Phone Number', type: 'tel', placeholder: '(555) 123-4567', required: true, hint: 'For FaceTime during the inspection (if requested).' },
                    { field: 'preferredDate', label: 'Preferred Inspection Date', type: 'date', required: false, hint: "We'll do our best to accommodate your schedule." },
                  ].map((input) => (
                    <div key={input.field} className="space-y-2">
                      <label className="block text-sm font-semibold text-white/80 uppercase tracking-wider">
                        {input.label} {input.required && <span className="text-amber-400">*</span>}
                      </label>
                      <input
                        type={input.type}
                        value={formData[input.field]}
                        onChange={(e) => handleChange(input.field, e.target.value)}
                        placeholder={input.placeholder}
                        min={input.type === 'date' ? new Date().toISOString().split('T')[0] : undefined}
                        className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.07] transition-all duration-300"
                      />
                      {input.hint && <p className="text-sm text-white/40">{input.hint}</p>}
                    </div>
                  ))}
                </div>
                
                <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
                  <div className="relative flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg mb-1">Payment on confirmation</p>
                      <p className="text-white/60">
                        You'll receive a secure payment link via email after we confirm inspector availability. No charge until then.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={!isStep2Valid() || isSubmitting}
                    className="group relative w-full inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-300 group-hover:shadow-lg group-hover:shadow-amber-500/30" />
                    {isSubmitting ? (
                      <>
                        <div className="relative w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        <span className="relative text-black">Processing...</span>
                      </>
                    ) : (
                      <>
                        <svg className="relative w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                        <span className="relative text-black">Complete Booking — ${packages.find(p => p.id === formData.package)?.price || 50}</span>
                      </>
                    )}
                  </button>
                  
                  <p className="text-center text-sm text-white/40 mt-6">
                    By booking, you agree to our{' '}
                    <Link href="/terms" className="text-amber-400 hover:text-amber-300 transition-colors">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-amber-400 hover:text-amber-300 transition-colors">Privacy Policy</Link>.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-2 hidden lg:block">
            <div className="sticky top-28">
              <OrderSummary formData={formData} selectedPackage={formData.package} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-amber-500/30 border-t-amber-500 animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    }>
      <BookingPageContent />
    </Suspense>
  );
}
