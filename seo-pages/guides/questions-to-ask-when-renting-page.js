'use client';

import React, { useState, useEffect } from 'react';

export const metadata = {
  title: 'Questions to Ask When Renting an Apartment | 75+ Essential Questions Checklist',
  description: 'Free interactive checklist of 75+ questions to ask when renting an apartment. Compare apartments, track answers, and never forget to ask the important questions. Works on mobile during tours!',
  keywords: 'questions to ask when renting, apartment questions, rental questions, questions to ask landlord, apartment tour questions, renting checklist, apartment viewing questions',
};

const QuestionsToAskWhenRenting = () => {
  // All questions organized by category
  const questionCategories = [
    {
      id: 'rent-costs',
      name: '💰 Rent & Costs',
      icon: '💰',
      description: 'Get crystal clear on ALL the costs',
      questions: [
        { id: 1, text: 'What is the monthly rent?', critical: true, redFlag: 'If they can\'t give a straight answer, walk away' },
        { id: 2, text: 'When is rent due each month?', critical: true },
        { id: 3, text: 'What payment methods are accepted?', critical: false },
        { id: 4, text: 'Is there a grace period for late rent?', critical: true },
        { id: 5, text: 'What is the late fee amount?', critical: true },
        { id: 6, text: 'How much is the security deposit?', critical: true, redFlag: 'More than 1-2 months rent is unusual' },
        { id: 7, text: 'Are there any move-in fees beyond the deposit?', critical: true },
        { id: 8, text: 'Is there a broker fee? How much?', critical: true, redFlag: 'In NYC, broker fees can be 12-15% of annual rent' },
        { id: 9, text: 'Is renter\'s insurance required?', critical: false },
        { id: 10, text: 'Are there any recurring fees (trash, amenities, etc.)?', critical: true },
        { id: 11, text: 'Will rent increase upon lease renewal? By how much typically?', critical: true },
        { id: 12, text: 'Is there a discount for paying rent early or annually?', critical: false },
      ]
    },
    {
      id: 'utilities',
      name: '⚡ Utilities & Bills',
      icon: '⚡',
      description: 'Know exactly what you\'ll pay each month',
      questions: [
        { id: 13, text: 'Which utilities are included in rent?', critical: true },
        { id: 14, text: 'What is the average monthly cost for electricity?', critical: true },
        { id: 15, text: 'What is the average monthly cost for gas?', critical: true },
        { id: 16, text: 'Is water/sewer included?', critical: false },
        { id: 17, text: 'What internet providers service this building?', critical: false },
        { id: 18, text: 'Is cable/internet included?', critical: false },
        { id: 19, text: 'Who is responsible for setting up utilities?', critical: false },
        { id: 20, text: 'Are utility bills in my name or the landlord\'s?', critical: false },
        { id: 21, text: 'Is the unit individually metered for utilities?', critical: true, redFlag: 'Shared meters can lead to disputes' },
      ]
    },
    {
      id: 'lease-terms',
      name: '📋 Lease Terms',
      icon: '📋',
      description: 'Understand what you\'re signing',
      questions: [
        { id: 22, text: 'What is the lease length?', critical: true },
        { id: 23, text: 'Is there an option to go month-to-month after the lease?', critical: true },
        { id: 24, text: 'What is the notice required to move out?', critical: true },
        { id: 25, text: 'Can the lease be broken early? What are the penalties?', critical: true, redFlag: 'Some require paying remaining months' },
        { id: 26, text: 'Is subletting allowed?', critical: true },
        { id: 27, text: 'Can I add or remove roommates during the lease?', critical: false },
        { id: 28, text: 'Is there a co-signer/guarantor requirement?', critical: true },
        { id: 29, text: 'What is the income requirement? (40x rent rule?)', critical: true },
        { id: 30, text: 'What documents do I need to apply?', critical: false },
        { id: 31, text: 'Is there an application fee? Is it refundable?', critical: true },
        { id: 32, text: 'How long does the application process take?', critical: false },
        { id: 33, text: 'Can I see a copy of the lease before applying?', critical: true, redFlag: 'If no, be cautious' },
      ]
    },
    {
      id: 'apartment-condition',
      name: '🏠 Apartment Condition',
      icon: '🏠',
      description: 'Know what you\'re actually getting',
      questions: [
        { id: 34, text: 'When was the apartment last renovated?', critical: false },
        { id: 35, text: 'Will the apartment be cleaned before move-in?', critical: true },
        { id: 36, text: 'Will the apartment be painted before move-in?', critical: false },
        { id: 37, text: 'Are there any existing damages I should document?', critical: true, redFlag: 'Always do a move-in inspection!' },
        { id: 38, text: 'What is the square footage?', critical: false },
        { id: 39, text: 'How old are the appliances?', critical: false },
        { id: 40, text: 'What appliances are included?', critical: true },
        { id: 41, text: 'Is there a dishwasher?', critical: false },
        { id: 42, text: 'Is there in-unit laundry or laundry in the building?', critical: false },
        { id: 43, text: 'What type of heating/cooling system is there?', critical: true },
        { id: 44, text: 'Do the windows have screens?', critical: false },
        { id: 45, text: 'Are there working smoke and CO detectors?', critical: true },
        { id: 46, text: 'Is there adequate water pressure? (Test it!)', critical: true },
        { id: 47, text: 'Do all outlets and light switches work?', critical: true },
        { id: 48, text: 'Are there signs of pests? (Check corners, under sink)', critical: true, redFlag: 'Droppings, dead bugs, or traps = red flag' },
        { id: 49, text: 'Is there any visible mold or water damage?', critical: true, redFlag: 'Mold can cause serious health issues' },
        { id: 50, text: 'What is the cell phone reception like?', critical: false },
      ]
    },
    {
      id: 'building-amenities',
      name: '🏢 Building & Amenities',
      icon: '🏢',
      description: 'What comes with the building',
      questions: [
        { id: 51, text: 'Is there a doorman or concierge?', critical: false },
        { id: 52, text: 'Is there a gym? Is it free?', critical: false },
        { id: 53, text: 'Is there a rooftop or outdoor space?', critical: false },
        { id: 54, text: 'Is there a package room or system for deliveries?', critical: false },
        { id: 55, text: 'Is there storage available? Is it included?', critical: false },
        { id: 56, text: 'Is there bike storage?', critical: false },
        { id: 57, text: 'How many floors? Is there an elevator?', critical: true },
        { id: 58, text: 'Is the elevator reliable? When was it last inspected?', critical: false },
        { id: 59, text: 'Is there a laundry room? What are the hours?', critical: false },
        { id: 60, text: 'Is there a community room or lounge?', critical: false },
      ]
    },
    {
      id: 'parking-transportation',
      name: '🚗 Parking & Transportation',
      icon: '🚗',
      description: 'How will you get around',
      questions: [
        { id: 61, text: 'Is parking included? How much extra if not?', critical: true },
        { id: 62, text: 'Is parking covered or outdoor?', critical: false },
        { id: 63, text: 'What is street parking like?', critical: false },
        { id: 64, text: 'Are there parking permits required for the area?', critical: false },
        { id: 65, text: 'Is there EV charging available?', critical: false },
        { id: 66, text: 'How far is the nearest public transit?', critical: false },
        { id: 67, text: 'Is the area walkable to grocery stores, etc.?', critical: false },
      ]
    },
    {
      id: 'security-safety',
      name: '🔒 Security & Safety',
      icon: '🔒',
      description: 'Protect yourself and your belongings',
      questions: [
        { id: 68, text: 'What security measures are in place?', critical: true },
        { id: 69, text: 'Are there security cameras in common areas?', critical: false },
        { id: 70, text: 'Is there a secure entry system?', critical: true },
        { id: 71, text: 'Will the locks be changed before move-in?', critical: true, redFlag: 'If no, request it or change them yourself' },
        { id: 72, text: 'How many keys/fobs will I receive?', critical: false },
        { id: 73, text: 'Is there a fire escape? What floor am I on?', critical: true },
        { id: 74, text: 'What is the crime rate in this neighborhood?', critical: true },
        { id: 75, text: 'Is there adequate lighting in hallways and parking areas?', critical: false },
        { id: 76, text: 'Has there been any recent crime in the building?', critical: true },
      ]
    },
    {
      id: 'maintenance-repairs',
      name: '🔧 Maintenance & Repairs',
      icon: '🔧',
      description: 'Who fixes things when they break',
      questions: [
        { id: 77, text: 'How do I submit maintenance requests?', critical: true },
        { id: 78, text: 'What is the typical response time for repairs?', critical: true },
        { id: 79, text: 'Is there emergency maintenance available 24/7?', critical: true },
        { id: 80, text: 'Who is responsible for minor repairs?', critical: false },
        { id: 81, text: 'Is there an on-site maintenance person?', critical: false },
        { id: 82, text: 'What repairs am I responsible for?', critical: true },
        { id: 83, text: 'Who handles pest control? How often?', critical: true },
        { id: 84, text: 'Are there any ongoing maintenance issues I should know about?', critical: true },
      ]
    },
    {
      id: 'rules-policies',
      name: '📜 Rules & Policies',
      icon: '📜',
      description: 'Know the rules before you sign',
      questions: [
        { id: 85, text: 'Are pets allowed? What types/sizes?', critical: true },
        { id: 86, text: 'Is there a pet deposit or monthly pet rent?', critical: true },
        { id: 87, text: 'Are there quiet hours?', critical: false },
        { id: 88, text: 'Can I hang things on the walls?', critical: false },
        { id: 89, text: 'Are there restrictions on guests or overnight visitors?', critical: true, redFlag: 'Strict guest policies can be problematic' },
        { id: 90, text: 'Is smoking allowed anywhere on the property?', critical: false },
        { id: 91, text: 'Can I run a business from the apartment?', critical: false },
        { id: 92, text: 'Are there rules about decorating or modifications?', critical: false },
        { id: 93, text: 'What happens if I violate building rules?', critical: false },
      ]
    },
    {
      id: 'neighbors-community',
      name: '👥 Neighbors & Community',
      icon: '👥',
      description: 'Who you\'ll be living near',
      questions: [
        { id: 94, text: 'What type of tenants live here? (Families, students, professionals)', critical: false },
        { id: 95, text: 'How long do tenants typically stay?', critical: true, redFlag: 'High turnover may indicate problems' },
        { id: 96, text: 'Are there any noise issues with neighbors?', critical: true },
        { id: 97, text: 'How thin are the walls? Can you hear neighbors?', critical: true },
        { id: 98, text: 'Is the neighborhood safe at night?', critical: true },
        { id: 99, text: 'Are there any planned construction projects nearby?', critical: false },
        { id: 100, text: 'What is the neighborhood like? (Test it at different times)', critical: true },
      ]
    },
    {
      id: 'move-in-process',
      name: '📦 Move-In Process',
      icon: '📦',
      description: 'Logistics of moving in',
      questions: [
        { id: 101, text: 'When is the earliest move-in date available?', critical: true },
        { id: 102, text: 'Are there specific move-in hours?', critical: false },
        { id: 103, text: 'Do I need to reserve the elevator for moving?', critical: false },
        { id: 104, text: 'Is there a loading dock or designated moving area?', critical: false },
        { id: 105, text: 'Do I need a Certificate of Insurance (COI) for movers?', critical: true },
        { id: 106, text: 'Who do I contact on move-in day if there are issues?', critical: true },
        { id: 107, text: 'Will there be a move-in inspection/walkthrough?', critical: true, redFlag: 'Always request one to document existing issues!' },
      ]
    },
    {
      id: 'landlord-management',
      name: '🏛️ Landlord & Management',
      icon: '🏛️',
      description: 'Who you\'ll be dealing with',
      questions: [
        { id: 108, text: 'Is this a private landlord or management company?', critical: false },
        { id: 109, text: 'What is the best way to contact the landlord/management?', critical: true },
        { id: 110, text: 'How responsive is the landlord typically?', critical: true },
        { id: 111, text: 'Can I see reviews of this landlord/management company?', critical: true },
        { id: 112, text: 'Has there been any legal action between landlord and tenants?', critical: true, redFlag: 'Check court records if possible' },
        { id: 113, text: 'Who is my primary point of contact?', critical: false },
        { id: 114, text: 'Is the landlord local or remote?', critical: false },
      ]
    },
  ];

  // FAQ data for SEO
  const faqData = [
    {
      question: "What are the most important questions to ask when renting an apartment?",
      answer: "The most critical questions include: What is the total monthly cost including utilities? What is the lease length and can it be broken early? What is the security deposit and is it refundable? Are there any existing damages? What is the maintenance response time? Is the neighborhood safe? Always ask to see the lease before applying and do a thorough move-in inspection."
    },
    {
      question: "What questions should I ask about rent and costs?",
      answer: "Ask about: monthly rent amount, security deposit, move-in fees, broker fees (if applicable), what utilities are included, average utility costs, late fees, whether rent will increase at renewal, payment methods accepted, and any recurring fees for amenities or services."
    },
    {
      question: "What should I look for during an apartment tour?",
      answer: "During your tour, check: water pressure (turn on faucets), all light switches and outlets, signs of pests (check corners, under sinks), mold or water damage, condition of appliances, heating/cooling systems, window conditions, cell phone reception, noise levels, and overall cleanliness. Take photos and videos of everything."
    },
    {
      question: "What are red flags when renting an apartment?",
      answer: "Major red flags include: landlord won't let you see the unit, pressure to sign immediately, requests for cash or wire transfers, no formal lease agreement, rent significantly below market rate, landlord can't answer basic questions, signs of pests or mold, multiple locks on doors, and refusing to do a move-in inspection."
    },
    {
      question: "What questions should I ask about the lease?",
      answer: "Key lease questions: What is the lease term? Can I sublet? What's the penalty for breaking the lease early? What notice is required to move out? Can roommates be added or removed? Is there an option to renew? What are the rules about guests, pets, and modifications? Can you see the lease before applying?"
    },
    {
      question: "How do I ask about the neighborhood?",
      answer: "Ask: What type of people live here? How long do tenants typically stay? Is the area safe at night? What's nearby (grocery, transit, restaurants)? Are there noise issues? Any upcoming construction? Visit the neighborhood at different times of day and walk around to get a feel for it."
    },
    {
      question: "What maintenance questions should I ask?",
      answer: "Important maintenance questions: How do I submit repair requests? What's the typical response time? Is there 24/7 emergency maintenance? Who handles pest control? What repairs am I responsible for? Is there on-site maintenance staff? Are there any ongoing issues I should know about?"
    },
    {
      question: "Should I ask about the previous tenants?",
      answer: "Yes! Ask why the previous tenant left, how long they lived there, and if there were any issues. High tenant turnover can indicate problems with the unit, building, or landlord. Long-term tenants usually suggest a well-maintained, well-managed property."
    },
    {
      question: "What should I ask about utilities?",
      answer: "Ask: Which utilities are included in rent? What are average monthly costs for electricity, gas, and water? Is the unit individually metered? Who sets up utilities? What internet providers service the building? Is cable included? Are there any utility caps or allowances?"
    },
    {
      question: "What questions to ask about security?",
      answer: "Security questions: What security measures are in place? Will locks be changed before move-in? How many keys will I receive? Are there security cameras? Is there secure entry? What floor is the unit on? Is there a fire escape? Has there been any crime in the building recently?"
    },
    {
      question: "How do I verify a rental listing is legitimate?",
      answer: "To verify a listing: Meet the landlord in person at the property, verify they own it through public records, never wire money or pay before seeing the unit, be wary of prices too good to be true, check if the listing photos appear elsewhere online, and consider getting a professional inspection before signing."
    },
    {
      question: "What is the 40x rent rule?",
      answer: "The 40x rent rule means your annual salary should be at least 40 times the monthly rent. For example, if rent is $2,000/month, you need to earn at least $80,000/year ($2,000 x 40). Many NYC landlords require this. If you don't meet it, you may need a guarantor who earns 80x the rent."
    },
    {
      question: "Should I do a move-in inspection?",
      answer: "Absolutely! A move-in inspection is critical. Document every existing scratch, stain, and issue with photos and video. Note anything that doesn't work. Get the landlord to sign off on the condition report. This protects your security deposit when you move out."
    },
    {
      question: "What questions should first-time renters ask?",
      answer: "First-time renters should especially ask: What documents do I need? What is the application process? Do I need a guarantor? What's included in rent? How do I pay rent? Who do I contact for issues? What are my responsibilities vs. the landlord's? Can I see a copy of the lease first?"
    },
    {
      question: "How do I ask about pets?",
      answer: "Ask: Are pets allowed? What types/breeds/sizes? Is there a pet deposit? Is there monthly pet rent? Are there restricted breeds? Where can pets be walked? Are there pet-friendly amenities? What are the rules about pets in common areas? Get pet approval in writing."
    },
    {
      question: "What should I ask about parking?",
      answer: "Parking questions: Is parking included? What's the monthly cost if not? Is it covered or outdoor? Assigned or first-come? What's street parking like? Are permits required? Is there EV charging? Is there guest parking? How secure is the parking area?"
    },
    {
      question: "How do I compare multiple apartments?",
      answer: "Use a checklist to compare: total monthly cost (rent + utilities + parking + fees), distance to work/school, neighborhood safety, apartment condition, amenities, landlord responsiveness, lease terms, and gut feeling. Our interactive checklist lets you save and compare multiple apartments."
    },
    {
      question: "What questions should travel nurses ask?",
      answer: "Travel nurses should ask: Is there a 13-week or short-term lease option? Is the apartment furnished? Is WiFi included? Is it close to the hospital? What's the cancellation policy? Can the lease be extended? Is there secure parking? What's included in rent?"
    },
    {
      question: "What should international students ask?",
      answer: "International students should ask: Do you accept applicants without US credit history? What documents do you accept from abroad? Is a guarantor required? Can I pay multiple months upfront instead? Is the lease available in English? Can someone tour for me remotely?"
    },
    {
      question: "How do I negotiate rent?",
      answer: "Negotiation tips: Research comparable rents in the area, ask if there are any move-in specials, offer to sign a longer lease for lower rent, highlight your qualifications (good credit, stable job), ask about waiving fees, and negotiate at the end of the month when landlords are motivated to fill vacancies."
    },
    {
      question: "What should I ask about move-in?",
      answer: "Move-in questions: What's the earliest move-in date? Are there specific moving hours? Do I need to reserve the elevator? Is a COI (Certificate of Insurance) required? Where do movers park? Who do I contact on move-in day? Will there be a walkthrough?"
    },
    {
      question: "How do I check if a landlord is trustworthy?",
      answer: "Verify a landlord by: checking property records to confirm ownership, reading online reviews, asking current tenants about their experience, checking court records for lawsuits, verifying their business registration, and trusting your gut. If something feels off, keep looking."
    },
    {
      question: "What appliances should be included?",
      answer: "Standard included appliances: refrigerator, stove/oven, and sometimes microwave and dishwasher. Ask what's included and the age/condition of each. In-unit washer/dryer is a premium feature. Confirm what happens if an appliance breaks - who pays for repair/replacement?"
    },
    {
      question: "Should I get renter's insurance?",
      answer: "Yes! Renter's insurance is inexpensive ($15-30/month) and covers your belongings against theft, fire, and water damage. Many landlords require it. It also provides liability coverage if someone is injured in your apartment. Always get renter's insurance."
    },
    {
      question: "What questions help avoid rental scams?",
      answer: "Avoid scams by asking: Can I tour the apartment in person? Can you verify you own/manage this property? Why is the rent so low? Can I pay by check (not wire)? Can I see the lease before paying? If they dodge these questions or pressure you, it's likely a scam."
    },
    {
      question: "What should I document before signing?",
      answer: "Document: All existing damage (photos + video), appliance conditions, anything promised verbally (get it in writing), meter readings, key count, emergency contacts, and the lease terms you agreed to. Email this to your landlord and yourself for records."
    },
    {
      question: "Can't see the apartment in person - what should I do?",
      answer: "If you can't visit in person: request a live video tour (not pre-recorded), have a trusted friend visit, research the address and landlord online, verify the listing with reverse image search, consider a professional remote inspection service, and never pay before verifying the apartment exists."
    },
    {
      question: "What questions to ask about noise?",
      answer: "Noise questions: How thin are the walls? Can you hear neighbors? What floor is above/below? Is there street noise? Are there quiet hours? What type of tenants live here? Is there nearby construction? Visit at different times to assess noise levels yourself."
    },
    {
      question: "What should I know about breaking a lease early?",
      answer: "Ask upfront: What's the penalty for breaking the lease? Do I have to pay remaining months? Can I sublet? What notice is required? Are there any exceptions (job loss, military, etc.)? Get the early termination policy in writing before signing."
    },
    {
      question: "How far in advance should I start looking?",
      answer: "Start looking 1-2 months before your desired move-in date. In competitive markets like NYC, apartments go fast, so be ready to apply immediately. Have your documents prepared, know your budget, and be flexible on move-in dates."
    },
  ];

  // State management
  const [answers, setAnswers] = useState({});
  const [notes, setNotes] = useState({});
  const [apartmentName, setApartmentName] = useState('');
  const [savedApartments, setSavedApartments] = useState([]);
  const [currentApartmentId, setCurrentApartmentId] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState(new Set(['rent-costs']));
  const [filterCritical, setFilterCritical] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [expandedFaqs, setExpandedFaqs] = useState(new Set());

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dibbytour-apartment-questions');
    if (saved) {
      const data = JSON.parse(saved);
      setSavedApartments(data.savedApartments || []);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('dibbytour-apartment-questions', JSON.stringify({
      savedApartments,
    }));
  }, [savedApartments]);

  // Calculate progress
  const totalQuestions = questionCategories.reduce((sum, cat) => sum + cat.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = Math.round((answeredQuestions / totalQuestions) * 100);

  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // Toggle answer
  const toggleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Update note
  const updateNote = (questionId, note) => {
    setNotes(prev => ({
      ...prev,
      [questionId]: note
    }));
  };

  // Save current apartment
  const saveApartment = () => {
    if (!apartmentName.trim()) {
      alert('Please enter an apartment name/address');
      return;
    }
    
    const apartment = {
      id: currentApartmentId || Date.now(),
      name: apartmentName,
      answers: { ...answers },
      notes: { ...notes },
      savedAt: new Date().toISOString(),
      progress: progress,
    };
    
    setSavedApartments(prev => {
      const existing = prev.findIndex(a => a.id === apartment.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = apartment;
        return updated;
      }
      return [...prev, apartment];
    });
    
    setCurrentApartmentId(apartment.id);
    alert('Apartment saved!');
  };

  // Load apartment
  const loadApartment = (apartment) => {
    setApartmentName(apartment.name);
    setAnswers(apartment.answers);
    setNotes(apartment.notes);
    setCurrentApartmentId(apartment.id);
    setShowCompare(false);
  };

  // New apartment
  const newApartment = () => {
    setApartmentName('');
    setAnswers({});
    setNotes({});
    setCurrentApartmentId(null);
  };

  // Delete apartment
  const deleteApartment = (id) => {
    if (confirm('Delete this apartment?')) {
      setSavedApartments(prev => prev.filter(a => a.id !== id));
      if (currentApartmentId === id) {
        newApartment();
      }
    }
  };

  // Export to text
  const exportToText = () => {
    let text = `APARTMENT VIEWING CHECKLIST\n`;
    text += `========================\n\n`;
    text += `Apartment: ${apartmentName || 'Unnamed'}\n`;
    text += `Date: ${new Date().toLocaleDateString()}\n`;
    text += `Progress: ${progress}% (${answeredQuestions}/${totalQuestions} questions)\n\n`;
    
    questionCategories.forEach(category => {
      text += `\n${category.name}\n`;
      text += `-`.repeat(40) + `\n`;
      category.questions.forEach(q => {
        const answer = answers[q.id];
        const note = notes[q.id];
        const status = answer === 'yes' ? '✓ YES' : answer === 'no' ? '✗ NO' : answer === 'na' ? '- N/A' : '○ Not Asked';
        text += `${status} | ${q.text}`;
        if (q.critical) text += ` [CRITICAL]`;
        if (note) text += `\n    Note: ${note}`;
        text += `\n`;
      });
    });
    
    text += `\n\n========================\n`;
    text += `Generated by DibbyTour.com\n`;
    text += `Get a professional apartment inspection: dibbytour.com\n`;
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `apartment-checklist-${apartmentName || 'unnamed'}.txt`;
    a.click();
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  // Toggle FAQ
  const toggleFaq = (index) => {
    const newExpanded = new Set(expandedFaqs);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedFaqs(newExpanded);
  };

  // Toggle compare selection
  const toggleCompareSelection = (apartmentId) => {
    setSelectedForCompare(prev => {
      if (prev.includes(apartmentId)) {
        return prev.filter(id => id !== apartmentId);
      }
      if (prev.length >= 3) {
        alert('You can compare up to 3 apartments at a time');
        return prev;
      }
      return [...prev, apartmentId];
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Use the Apartment Questions Checklist",
            "description": "Use this interactive checklist to ask all the right questions when touring an apartment",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Enter Apartment Name",
                "text": "Enter the address or name of the apartment you're viewing"
              },
              {
                "@type": "HowToStep",
                "name": "Go Through Questions",
                "text": "During your tour, go through each category and mark questions as Yes, No, or N/A"
              },
              {
                "@type": "HowToStep",
                "name": "Add Notes",
                "text": "Add notes to any question to remember important details"
              },
              {
                "@type": "HowToStep",
                "name": "Save and Compare",
                "text": "Save your checklist and compare multiple apartments side-by-side"
              }
            ]
          })
        }}
      />

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md print:hidden">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📋</span>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Questions to Ask When Renting</h1>
                <p className="text-xs text-gray-500">{answeredQuestions}/{totalQuestions} questions answered</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-emerald-600">{progress}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="text-center mb-8 print:mb-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            75+ Questions to Ask When Renting an Apartment
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Never forget to ask the important questions. Use this interactive checklist during your apartment tour. 
            Save and compare multiple apartments!
          </p>
        </div>

        {/* Apartment Name Input & Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 print:shadow-none print:p-2">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apartment Name / Address
              </label>
              <input
                type="text"
                value={apartmentName}
                onChange={(e) => setApartmentName(e.target.value)}
                placeholder="e.g., 123 Main St Apt 4B"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
              />
            </div>
            <div className="flex gap-2 items-end flex-wrap">
              <button
                onClick={saveApartment}
                className="px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all font-medium"
              >
                💾 Save
              </button>
              <button
                onClick={newApartment}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium"
              >
                ➕ New
              </button>
              <button
                onClick={exportToText}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium"
              >
                📥 Export
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium print:hidden"
              >
                🖨️ Print
              </button>
            </div>
          </div>

          {/* Saved Apartments */}
          {savedApartments.length > 0 && (
            <div className="mt-4 pt-4 border-t print:hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Saved Apartments ({savedApartments.length})</span>
                <button
                  onClick={() => setShowCompare(!showCompare)}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  {showCompare ? 'Hide Compare' : '📊 Compare Apartments'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {savedApartments.map(apt => (
                  <div
                    key={apt.id}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all cursor-pointer ${
                      currentApartmentId === apt.id 
                        ? 'border-emerald-500 bg-emerald-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {showCompare && (
                      <input
                        type="checkbox"
                        checked={selectedForCompare.includes(apt.id)}
                        onChange={() => toggleCompareSelection(apt.id)}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                    )}
                    <span 
                      onClick={() => loadApartment(apt)}
                      className="text-sm font-medium"
                    >
                      {apt.name}
                    </span>
                    <span className="text-xs text-gray-500">{apt.progress}%</span>
                    <button
                      onClick={() => deleteApartment(apt.id)}
                      className="text-gray-400 hover:text-red-500 ml-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Compare View */}
        {showCompare && selectedForCompare.length >= 2 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 overflow-x-auto print:hidden">
            <h2 className="text-xl font-bold mb-4">📊 Compare Apartments</h2>
            <table className="w-full min-w-[600px]">
              <thead>
                <tr>
                  <th className="text-left py-2 px-3 bg-gray-50">Question</th>
                  {selectedForCompare.map(id => {
                    const apt = savedApartments.find(a => a.id === id);
                    return (
                      <th key={id} className="text-center py-2 px-3 bg-gray-50 min-w-[120px]">
                        {apt?.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {questionCategories.map(category => (
                  <React.Fragment key={category.id}>
                    <tr>
                      <td colSpan={selectedForCompare.length + 1} className="py-2 px-3 bg-emerald-50 font-semibold">
                        {category.name}
                      </td>
                    </tr>
                    {category.questions.filter(q => q.critical).map(question => (
                      <tr key={question.id} className="border-b">
                        <td className="py-2 px-3 text-sm">{question.text}</td>
                        {selectedForCompare.map(id => {
                          const apt = savedApartments.find(a => a.id === id);
                          const answer = apt?.answers[question.id];
                          return (
                            <td key={id} className="text-center py-2 px-3">
                              {answer === 'yes' ? '✅' : answer === 'no' ? '❌' : answer === 'na' ? '➖' : '○'}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Filters */}
        <div className="flex items-center gap-4 mb-4 print:hidden">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filterCritical}
              onChange={(e) => setFilterCritical(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
            <span className="text-sm font-medium text-gray-700">Show only critical questions</span>
          </label>
          <button
            onClick={() => setExpandedCategories(new Set(questionCategories.map(c => c.id)))}
            className="text-sm text-emerald-600 hover:text-emerald-700"
          >
            Expand All
          </button>
          <button
            onClick={() => setExpandedCategories(new Set())}
            className="text-sm text-gray-600 hover:text-gray-700"
          >
            Collapse All
          </button>
        </div>

        {/* Question Categories */}
        <div className="space-y-4">
          {questionCategories.map(category => {
            const categoryQuestions = filterCritical 
              ? category.questions.filter(q => q.critical)
              : category.questions;
            const categoryAnswered = categoryQuestions.filter(q => answers[q.id]).length;
            const isExpanded = expandedCategories.has(category.id);
            
            if (filterCritical && categoryQuestions.length === 0) return null;
            
            return (
              <div key={category.id} className="bg-white rounded-2xl shadow-lg overflow-hidden print:shadow-none print:border">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all print:bg-emerald-500"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div className="text-left">
                      <h2 className="text-lg font-bold">{category.name}</h2>
                      <p className="text-sm text-emerald-100">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                      {categoryAnswered}/{categoryQuestions.length}
                    </span>
                    <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </div>
                </button>
                
                {/* Questions */}
                {isExpanded && (
                  <div className="p-4 space-y-3">
                    {categoryQuestions.map(question => (
                      <div 
                        key={question.id} 
                        className={`p-4 rounded-xl border-2 transition-all ${
                          answers[question.id] === 'yes' ? 'border-green-300 bg-green-50' :
                          answers[question.id] === 'no' ? 'border-red-300 bg-red-50' :
                          answers[question.id] === 'na' ? 'border-gray-300 bg-gray-50' :
                          'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium text-gray-900">{question.text}</span>
                              {question.critical && (
                                <span className="px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-700 rounded-full">
                                  CRITICAL
                                </span>
                              )}
                            </div>
                            {question.redFlag && (
                              <p className="text-sm text-red-600 mb-2">
                                🚩 {question.redFlag}
                              </p>
                            )}
                            {/* Answer Buttons */}
                            <div className="flex gap-2 mb-2">
                              <button
                                onClick={() => toggleAnswer(question.id, 'yes')}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                  answers[question.id] === 'yes'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-green-100'
                                }`}
                              >
                                ✓ Yes
                              </button>
                              <button
                                onClick={() => toggleAnswer(question.id, 'no')}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                  answers[question.id] === 'no'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-red-100'
                                }`}
                              >
                                ✗ No
                              </button>
                              <button
                                onClick={() => toggleAnswer(question.id, 'na')}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                  answers[question.id] === 'na'
                                    ? 'bg-gray-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                N/A
                              </button>
                            </div>
                            {/* Notes */}
                            <input
                              type="text"
                              placeholder="Add a note..."
                              value={notes[question.id] || ''}
                              onChange={(e) => updateNote(question.id, e.target.value)}
                              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white text-center print:hidden">
          <h2 className="text-2xl font-bold mb-3">Can't Visit the Apartment in Person?</h2>
          <p className="text-emerald-100 mb-6 max-w-xl mx-auto">
            Let us inspect it for you! Our professional inspectors will visit the apartment, 
            ask all the right questions, document everything with photos and video, and send you a detailed report.
          </p>
          <a
            href="/services/apartment-inspection"
            className="inline-block px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-lg"
          >
            Get a Professional Inspection →
          </a>
        </div>

        {/* Related Tools */}
        <div className="mt-8 print:hidden">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Tools</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/tools/first-apartment-checklist" className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
              <span className="text-2xl mb-2 block">🏠</span>
              <h3 className="font-bold text-gray-900">First Apartment Checklist</h3>
              <p className="text-sm text-gray-600">Everything you need for your first apartment</p>
            </a>
            <a href="/tools/security-deposit-calculator" className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
              <span className="text-2xl mb-2 block">💰</span>
              <h3 className="font-bold text-gray-900">Security Deposit Calculator</h3>
              <p className="text-sm text-gray-600">Know your rights and get your deposit back</p>
            </a>
            <a href="/tools/roommate-agreement" className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
              <span className="text-2xl mb-2 block">🤝</span>
              <h3 className="font-bold text-gray-900">Roommate Agreement Generator</h3>
              <p className="text-sm text-gray-600">Create a fair roommate agreement</p>
            </a>
          </div>
        </div>

        {/* Money Saving Tips */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 print:hidden">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Pro Tips for Apartment Hunting</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-emerald-600 mb-2">🕐 Best Time to Look</h3>
              <p className="text-gray-600 text-sm">
                Winter months (Nov-Feb) typically have less competition and landlords may be more willing to negotiate. 
                End of month is also good as landlords want to fill vacancies.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-emerald-600 mb-2">📸 Document Everything</h3>
              <p className="text-gray-600 text-sm">
                Take photos and videos during your tour. Note any existing damage. 
                This protects your security deposit and gives you evidence if issues arise.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-emerald-600 mb-2">🔍 Research the Landlord</h3>
              <p className="text-gray-600 text-sm">
                Google the landlord/management company name + "reviews" or "complaints". 
                Check court records for lawsuits. Ask current tenants about their experience.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-emerald-600 mb-2">⏰ Visit Multiple Times</h3>
              <p className="text-gray-600 text-sm">
                Visit the neighborhood at different times - morning, evening, weekends. 
                Check noise levels, parking availability, and how safe it feels at night.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 print:hidden">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-all"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <span className={`transform transition-transform ${expandedFaqs.has(index) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedFaqs.has(index) && (
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scam Prevention Section */}
        <div className="mt-8 bg-red-50 border-2 border-red-200 rounded-2xl p-6 print:hidden">
          <h2 className="text-2xl font-bold text-red-800 mb-4">🚨 Rental Scam Warning Signs</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-red-500">⚠️</span>
              <p className="text-gray-700 text-sm">Landlord refuses to let you see the apartment in person</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-500">⚠️</span>
              <p className="text-gray-700 text-sm">Rent is significantly below market rate</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-500">⚠️</span>
              <p className="text-gray-700 text-sm">They ask for payment via wire transfer or gift cards</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-500">⚠️</span>
              <p className="text-gray-700 text-sm">High pressure to sign immediately without seeing the lease</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-500">⚠️</span>
              <p className="text-gray-700 text-sm">Landlord claims to be out of the country</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-500">⚠️</span>
              <p className="text-gray-700 text-sm">No formal lease agreement provided</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-red-200">
            <a href="/tools/red-flag-checker" className="text-red-700 font-semibold hover:text-red-800">
              Check Your Listing for Red Flags →
            </a>
          </div>
        </div>

        {/* ========== VERIFICATION CTA ========== */}
        <div className="mt-12 bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-200 rounded-xl p-8 text-center print:hidden">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Can't Visit the Apartment in Person?</h3>
          <p className="text-gray-600 mb-6">Our inspectors physically verify apartments and ask these questions for you.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/services/remote-apartment-inspection" className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-400 transition-all">
              Book Inspection →
            </a>
            <a href="/tools/rent-calculator" className="px-6 py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all">
              Free Rent Calculator
            </a>
          </div>
        </div>

        {/* ========== INTERNAL LINKS SECTION ========== */}
        <div className="mt-12 bg-gray-100 -mx-4 px-4 py-12 print:hidden">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-bold text-gray-700 mb-8 text-center">Explore More Resources</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              <div>
                <h4 className="text-emerald-600 font-medium text-sm mb-3">🔍 Services</h4>
                <ul className="space-y-2">
                  <li><a href="/services/remote-apartment-inspection" className="text-gray-500 hover:text-gray-800 text-sm">Remote Inspection</a></li>
                  <li><a href="/services/sight-unseen-verification" className="text-gray-500 hover:text-gray-800 text-sm">Sight Unseen</a></li>
                  <li><a href="/services/travel-nurse-verification" className="text-gray-500 hover:text-gray-800 text-sm">Travel Nurses</a></li>
                  <li><a href="/services/international-student-verification" className="text-gray-500 hover:text-gray-800 text-sm">Int'l Students</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-emerald-600 font-medium text-sm mb-3">🛠️ Free Tools</h4>
                <ul className="space-y-2">
                  <li><a href="/tools/rent-calculator" className="text-gray-500 hover:text-gray-800 text-sm">Rent Calculator</a></li>
                  <li><a href="/tools/red-flag-checker" className="text-gray-500 hover:text-gray-800 text-sm">Red Flag Checker</a></li>
                  <li><a href="/tools/craigslist-facebook-verification" className="text-gray-500 hover:text-gray-800 text-sm">CL/FB Verifier</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-emerald-600 font-medium text-sm mb-3">📋 Checklists</h4>
                <ul className="space-y-2">
                  <li><a href="/checklists/first-apartment" className="text-gray-500 hover:text-gray-800 text-sm">First Apartment</a></li>
                  <li><a href="/checklists/move-out-cleaning" className="text-gray-500 hover:text-gray-800 text-sm">Move-Out Cleaning</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-emerald-600 font-medium text-sm mb-3">📍 Top Cities</h4>
                <ul className="space-y-2">
                  <li><a href="/cities/nyc-apartment-inspection" className="text-gray-500 hover:text-gray-800 text-sm">New York City</a></li>
                  <li><a href="/cities/la-apartment-inspection" className="text-gray-500 hover:text-gray-800 text-sm">Los Angeles</a></li>
                  <li><a href="/cities/chicago-apartment-inspection" className="text-gray-500 hover:text-gray-800 text-sm">Chicago</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-emerald-600 font-medium text-sm mb-3">👥 For You</h4>
                <ul className="space-y-2">
                  <li><a href="/for/travel-nurses" className="text-gray-500 hover:text-gray-800 text-sm">Travel Nurses</a></li>
                  <li><a href="/for/international-students" className="text-gray-500 hover:text-gray-800 text-sm">Int'l Students</a></li>
                  <li><a href="/for/relocating-professionals" className="text-gray-500 hover:text-gray-800 text-sm">Relocating</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-300 text-center">
              <a href="/guide" className="text-emerald-600 hover:text-emerald-700 font-medium">
                ← Back to Complete Apartment Inspection Guide
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center print:hidden">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} DibbyTour. All rights reserved.
          </p>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            font-size: 12px;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default QuestionsToAskWhenRenting;
