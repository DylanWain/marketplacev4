'use client';

import React, { useState, useEffect } from 'react';

export const metadata = {
  title: 'Move-Out Cleaning Checklist | Get Your Security Deposit Back',
  description: 'Free interactive move-out cleaning checklist with 100+ tasks. Room-by-room guide to get your full security deposit back. Time estimates, pro tips, and printable checklist.',
  keywords: 'move out cleaning checklist, apartment cleaning checklist, end of lease cleaning, security deposit cleaning, rental move out checklist, deep cleaning checklist',
};

const MoveOutCleaningChecklist = () => {
  // Cleaning tasks organized by room
  const cleaningCategories = [
    {
      id: 'kitchen',
      name: '🍳 Kitchen',
      icon: '🍳',
      timeEstimate: '2-3 hours',
      description: 'The most scrutinized room - make it spotless',
      tasks: [
        { id: 1, text: 'Clean inside refrigerator (all shelves, drawers, walls)', priority: 'high', time: 30 },
        { id: 2, text: 'Clean outside and top of refrigerator', priority: 'medium', time: 10 },
        { id: 3, text: 'Clean under refrigerator', priority: 'medium', time: 10 },
        { id: 4, text: 'Defrost and clean freezer', priority: 'high', time: 20 },
        { id: 5, text: 'Clean oven interior (use oven cleaner)', priority: 'high', time: 30 },
        { id: 6, text: 'Clean oven racks', priority: 'high', time: 15 },
        { id: 7, text: 'Clean stovetop and burners', priority: 'high', time: 15 },
        { id: 8, text: 'Clean range hood and filter', priority: 'medium', time: 15 },
        { id: 9, text: 'Clean microwave inside and out', priority: 'high', time: 10 },
        { id: 10, text: 'Clean dishwasher interior and filter', priority: 'medium', time: 15 },
        { id: 11, text: 'Run empty dishwasher cycle with cleaner', priority: 'low', time: 5 },
        { id: 12, text: 'Clean all cabinet fronts', priority: 'medium', time: 15 },
        { id: 13, text: 'Clean inside all cabinets', priority: 'high', time: 20 },
        { id: 14, text: 'Clean all drawers inside and out', priority: 'medium', time: 15 },
        { id: 15, text: 'Clean countertops thoroughly', priority: 'high', time: 10 },
        { id: 16, text: 'Clean backsplash', priority: 'medium', time: 10 },
        { id: 17, text: 'Clean sink and faucet (remove limescale)', priority: 'high', time: 15 },
        { id: 18, text: 'Clean garbage disposal (ice + baking soda)', priority: 'medium', time: 5 },
        { id: 19, text: 'Clean under sink area', priority: 'medium', time: 10 },
        { id: 20, text: 'Clean light fixtures', priority: 'medium', time: 10 },
        { id: 21, text: 'Clean windows and window sills', priority: 'medium', time: 15 },
        { id: 22, text: 'Wipe down walls (spot clean marks)', priority: 'medium', time: 15 },
        { id: 23, text: 'Clean baseboards', priority: 'medium', time: 10 },
        { id: 24, text: 'Clean switch plates and outlets', priority: 'low', time: 5 },
        { id: 25, text: 'Sweep and mop floor thoroughly', priority: 'high', time: 20 },
        { id: 26, text: 'Clean floor corners and edges', priority: 'medium', time: 10 },
        { id: 27, text: 'Remove all trash and food items', priority: 'high', time: 5 },
      ]
    },
    {
      id: 'bathroom',
      name: '🚿 Bathroom(s)',
      icon: '🚿',
      timeEstimate: '1-2 hours each',
      description: 'Sanitize everything - landlords check closely',
      tasks: [
        { id: 28, text: 'Clean toilet inside, outside, and behind', priority: 'high', time: 15 },
        { id: 29, text: 'Remove toilet seat and clean hinges', priority: 'medium', time: 10 },
        { id: 30, text: 'Clean bathtub/shower thoroughly', priority: 'high', time: 20 },
        { id: 31, text: 'Remove soap scum and hard water stains', priority: 'high', time: 15 },
        { id: 32, text: 'Clean shower door/curtain rod', priority: 'medium', time: 10 },
        { id: 33, text: 'Clean shower head (soak in vinegar)', priority: 'medium', time: 5 },
        { id: 34, text: 'Clean tile grout (use grout cleaner)', priority: 'high', time: 20 },
        { id: 35, text: 'Clean sink and faucet', priority: 'high', time: 10 },
        { id: 36, text: 'Clean under sink/vanity', priority: 'medium', time: 10 },
        { id: 37, text: 'Clean mirror (streak-free)', priority: 'high', time: 5 },
        { id: 38, text: 'Clean medicine cabinet inside and out', priority: 'medium', time: 10 },
        { id: 39, text: 'Clean all cabinets and drawers', priority: 'medium', time: 15 },
        { id: 40, text: 'Clean countertops', priority: 'high', time: 5 },
        { id: 41, text: 'Clean exhaust fan (remove cover)', priority: 'medium', time: 15 },
        { id: 42, text: 'Clean light fixtures', priority: 'medium', time: 10 },
        { id: 43, text: 'Clean towel bars and toilet paper holder', priority: 'low', time: 5 },
        { id: 44, text: 'Clean windows and window sills', priority: 'medium', time: 10 },
        { id: 45, text: 'Wipe down walls (remove any mold)', priority: 'high', time: 15 },
        { id: 46, text: 'Clean baseboards', priority: 'medium', time: 10 },
        { id: 47, text: 'Clean switch plates and outlets', priority: 'low', time: 5 },
        { id: 48, text: 'Clean door and door handle', priority: 'low', time: 5 },
        { id: 49, text: 'Sweep and mop floor', priority: 'high', time: 15 },
        { id: 50, text: 'Clean floor around toilet base', priority: 'high', time: 5 },
        { id: 51, text: 'Check for and treat any mold/mildew', priority: 'high', time: 15 },
      ]
    },
    {
      id: 'bedroom',
      name: '🛏️ Bedroom(s)',
      icon: '🛏️',
      timeEstimate: '45 min - 1 hour each',
      description: 'Don\'t forget closets and under furniture areas',
      tasks: [
        { id: 52, text: 'Clean closet shelves and rods', priority: 'high', time: 15 },
        { id: 53, text: 'Vacuum/clean closet floor', priority: 'high', time: 10 },
        { id: 54, text: 'Wipe down closet walls', priority: 'medium', time: 10 },
        { id: 55, text: 'Clean all windows inside and out', priority: 'medium', time: 15 },
        { id: 56, text: 'Clean window sills and tracks', priority: 'medium', time: 10 },
        { id: 57, text: 'Clean window blinds/shades', priority: 'medium', time: 15 },
        { id: 58, text: 'Clean ceiling fan and blades', priority: 'medium', time: 10 },
        { id: 59, text: 'Clean light fixtures', priority: 'medium', time: 10 },
        { id: 60, text: 'Clean switch plates and outlets', priority: 'low', time: 5 },
        { id: 61, text: 'Wipe down walls (fill nail holes)', priority: 'high', time: 20 },
        { id: 62, text: 'Clean baseboards', priority: 'medium', time: 10 },
        { id: 63, text: 'Clean door and door frame', priority: 'low', time: 5 },
        { id: 64, text: 'Clean door hinges and handle', priority: 'low', time: 5 },
        { id: 65, text: 'Vacuum carpet thoroughly', priority: 'high', time: 15 },
        { id: 66, text: 'Vacuum under where furniture was', priority: 'high', time: 10 },
        { id: 67, text: 'Spot clean carpet stains', priority: 'high', time: 15 },
        { id: 68, text: 'Clean/mop hardwood floors', priority: 'high', time: 15 },
        { id: 69, text: 'Clean HVAC vents and registers', priority: 'medium', time: 10 },
      ]
    },
    {
      id: 'living-room',
      name: '🛋️ Living Room',
      icon: '🛋️',
      timeEstimate: '1-1.5 hours',
      description: 'High traffic area - clean walls and floors thoroughly',
      tasks: [
        { id: 70, text: 'Clean all windows inside and out', priority: 'medium', time: 15 },
        { id: 71, text: 'Clean window sills and tracks', priority: 'medium', time: 10 },
        { id: 72, text: 'Clean window blinds/curtains', priority: 'medium', time: 15 },
        { id: 73, text: 'Clean ceiling fan and blades', priority: 'medium', time: 10 },
        { id: 74, text: 'Clean all light fixtures', priority: 'medium', time: 15 },
        { id: 75, text: 'Clean switch plates and outlets', priority: 'low', time: 5 },
        { id: 76, text: 'Wipe down all walls', priority: 'medium', time: 20 },
        { id: 77, text: 'Fill nail holes with spackle', priority: 'high', time: 15 },
        { id: 78, text: 'Touch up paint if needed', priority: 'medium', time: 20 },
        { id: 79, text: 'Clean baseboards', priority: 'medium', time: 15 },
        { id: 80, text: 'Clean doors and door frames', priority: 'low', time: 10 },
        { id: 81, text: 'Clean fireplace (if applicable)', priority: 'medium', time: 20 },
        { id: 82, text: 'Vacuum carpet thoroughly', priority: 'high', time: 20 },
        { id: 83, text: 'Vacuum edges and corners', priority: 'high', time: 10 },
        { id: 84, text: 'Spot clean carpet stains', priority: 'high', time: 15 },
        { id: 85, text: 'Clean/mop hardwood floors', priority: 'high', time: 20 },
        { id: 86, text: 'Clean HVAC vents and registers', priority: 'medium', time: 10 },
        { id: 87, text: 'Clean patio door/sliding glass door', priority: 'medium', time: 15 },
      ]
    },
    {
      id: 'laundry',
      name: '🧺 Laundry Area',
      icon: '🧺',
      timeEstimate: '30-45 min',
      description: 'Clean appliances inside and out',
      tasks: [
        { id: 88, text: 'Clean washing machine drum and door seal', priority: 'high', time: 15 },
        { id: 89, text: 'Run empty hot cycle with cleaner', priority: 'medium', time: 5 },
        { id: 90, text: 'Clean detergent dispenser', priority: 'medium', time: 10 },
        { id: 91, text: 'Clean outside of washer', priority: 'medium', time: 5 },
        { id: 92, text: 'Clean dryer lint trap thoroughly', priority: 'high', time: 5 },
        { id: 93, text: 'Clean dryer drum', priority: 'medium', time: 10 },
        { id: 94, text: 'Clean outside of dryer', priority: 'medium', time: 5 },
        { id: 95, text: 'Clean behind and under washer/dryer', priority: 'medium', time: 15 },
        { id: 96, text: 'Clean laundry sink if applicable', priority: 'medium', time: 10 },
        { id: 97, text: 'Clean shelves and cabinets', priority: 'medium', time: 10 },
        { id: 98, text: 'Sweep and mop floor', priority: 'high', time: 10 },
      ]
    },
    {
      id: 'entry-hallways',
      name: '🚪 Entry & Hallways',
      icon: '🚪',
      timeEstimate: '30-45 min',
      description: 'First impression areas',
      tasks: [
        { id: 99, text: 'Clean front door inside and out', priority: 'medium', time: 10 },
        { id: 100, text: 'Clean door handle and lock', priority: 'medium', time: 5 },
        { id: 101, text: 'Clean doorbell if applicable', priority: 'low', time: 5 },
        { id: 102, text: 'Clean light fixtures', priority: 'medium', time: 10 },
        { id: 103, text: 'Wipe down walls', priority: 'medium', time: 15 },
        { id: 104, text: 'Fill nail holes', priority: 'high', time: 10 },
        { id: 105, text: 'Clean baseboards', priority: 'medium', time: 10 },
        { id: 106, text: 'Clean closet (coat closet)', priority: 'medium', time: 15 },
        { id: 107, text: 'Vacuum/mop floors', priority: 'high', time: 15 },
        { id: 108, text: 'Clean any mirrors', priority: 'medium', time: 5 },
        { id: 109, text: 'Clean thermostat', priority: 'low', time: 5 },
        { id: 110, text: 'Clean smoke/CO detectors', priority: 'medium', time: 5 },
      ]
    },
    {
      id: 'outdoor',
      name: '🏡 Outdoor/Balcony',
      icon: '🏡',
      timeEstimate: '30 min - 1 hour',
      description: 'If applicable to your unit',
      tasks: [
        { id: 111, text: 'Sweep balcony/patio', priority: 'high', time: 15 },
        { id: 112, text: 'Clean balcony railing', priority: 'medium', time: 10 },
        { id: 113, text: 'Clean sliding door tracks', priority: 'medium', time: 10 },
        { id: 114, text: 'Remove all items/plants', priority: 'high', time: 15 },
        { id: 115, text: 'Clean any outdoor light fixtures', priority: 'low', time: 10 },
        { id: 116, text: 'Clean garage floor if applicable', priority: 'medium', time: 20 },
        { id: 117, text: 'Remove oil stains from parking spot', priority: 'medium', time: 15 },
      ]
    },
    {
      id: 'final-touches',
      name: '✨ Final Touches',
      icon: '✨',
      timeEstimate: '30 min',
      description: 'Don\'t forget these often-missed items',
      tasks: [
        { id: 118, text: 'Replace burnt out light bulbs', priority: 'high', time: 15 },
        { id: 119, text: 'Replace HVAC filter', priority: 'medium', time: 10 },
        { id: 120, text: 'Test smoke and CO detectors', priority: 'high', time: 5 },
        { id: 121, text: 'Replace detector batteries if needed', priority: 'high', time: 10 },
        { id: 122, text: 'Remove all personal items', priority: 'high', time: 15 },
        { id: 123, text: 'Check all closets are empty', priority: 'high', time: 10 },
        { id: 124, text: 'Check all cabinets are empty', priority: 'high', time: 10 },
        { id: 125, text: 'Remove all trash from property', priority: 'high', time: 10 },
        { id: 126, text: 'Return all keys, fobs, remotes', priority: 'high', time: 5 },
        { id: 127, text: 'Take final photos of everything', priority: 'high', time: 20 },
        { id: 128, text: 'Do final walk-through', priority: 'high', time: 15 },
      ]
    },
  ];

  // FAQ data
  const faqData = [
    {
      question: "How clean does my apartment need to be when I move out?",
      answer: "Your apartment should be returned in the same condition as when you moved in, minus normal wear and tear. This typically means a thorough deep clean of all rooms, appliances, and fixtures. Most landlords expect 'broom clean' at minimum, but a deeper clean increases your chances of getting your full security deposit back."
    },
    {
      question: "What is considered 'normal wear and tear'?",
      answer: "Normal wear and tear includes minor scuffs on walls, small nail holes, faded paint, worn carpet in high-traffic areas, and minor scratches on hardwood floors. It does NOT include large holes, stains, burns, pet damage, broken fixtures, or excessive dirt and grime."
    },
    {
      question: "Can my landlord charge me for cleaning?",
      answer: "Yes, if you leave the apartment dirty, your landlord can deduct professional cleaning costs from your security deposit. However, they cannot charge for cleaning that addresses normal wear and tear. Always take photos before you leave to document the apartment's condition."
    },
    {
      question: "Should I hire professional cleaners for move-out?",
      answer: "It depends on your situation. Professional move-out cleaning typically costs $150-$400 depending on apartment size. If your deposit is substantial and you're short on time, it may be worth it. However, doing it yourself with a thorough checklist can save money and still get you your deposit back."
    },
    {
      question: "How long does move-out cleaning take?",
      answer: "For a typical 1-bedroom apartment, expect 4-6 hours of cleaning. A 2-bedroom takes 6-8 hours, and a 3-bedroom can take 8-12 hours. This assumes moderate dirt levels. If the apartment is very dirty or you're deep cleaning appliances, add more time."
    },
    {
      question: "What cleaning supplies do I need for move-out cleaning?",
      answer: "Essential supplies: all-purpose cleaner, glass cleaner, bathroom cleaner, oven cleaner, toilet bowl cleaner, baking soda, white vinegar, microfiber cloths, scrub brushes, sponges, mop, bucket, vacuum, broom, dustpan, rubber gloves, and trash bags. Magic erasers are great for wall marks."
    },
    {
      question: "What's the most important thing to clean for my deposit?",
      answer: "The kitchen and bathrooms are most scrutinized. Focus especially on: inside the oven, inside the refrigerator, toilet, bathtub/shower, and all floors. These areas accumulate the most grime and are the first things landlords check during inspections."
    },
    {
      question: "Do I need to fill nail holes when moving out?",
      answer: "Generally yes, especially if there are many holes or they're larger than typical picture hanging holes. Use lightweight spackle, let it dry, sand smooth, and touch up with matching paint if possible. Small pin holes from standard picture hanging are often considered normal wear and tear."
    },
    {
      question: "Should I clean the carpets professionally?",
      answer: "Check your lease - some require professional carpet cleaning upon move-out. Even if not required, professional cleaning ($75-150 per room) can remove stains and odors that regular vacuuming can't. Keep the receipt to show your landlord."
    },
    {
      question: "What should I do about pet odors or stains?",
      answer: "Pet damage typically isn't covered by normal wear and tear. For odors, use enzyme-based cleaners specifically for pet odors. For carpet stains, consider professional cleaning or replacement if severe. For hardwood scratches, minor buffing may help but deep scratches may require deductions."
    },
    {
      question: "When should I start cleaning before move-out?",
      answer: "Start 1-2 weeks before your move-out date. Begin with areas you use less (spare bedroom, storage areas) and work toward high-use areas. Clean the kitchen and bathrooms last, ideally after all furniture is removed. Schedule your final clean for the day of or day before your walkthrough."
    },
    {
      question: "Should I be present during the move-out inspection?",
      answer: "Absolutely! Always attend the move-out inspection. This allows you to discuss any issues, point out pre-existing damage (reference your move-in photos), and potentially fix minor issues on the spot. Get a copy of the inspection report and any deductions in writing."
    },
    {
      question: "How do I document the apartment's condition?",
      answer: "Take photos and video of every room, including inside appliances, closets, and cabinets. Document the date with a timestamp. Email these to yourself and your landlord. Focus on areas that were already damaged when you moved in. This protects you if there are deposit disputes."
    },
    {
      question: "What if my landlord is being unfair about cleaning?",
      answer: "First, review your lease and your state's security deposit laws. Request an itemized list of deductions. Compare to your move-in and move-out documentation. If deductions seem unfair, dispute them in writing. Many states have specific procedures for deposit disputes, and landlords may face penalties for improper deductions."
    },
    {
      question: "Can I paint the apartment back to the original color?",
      answer: "If you painted the walls during your tenancy without permission, you may be required to repaint them the original color. Even with permission, some landlords expect repainting. If repainting, use quality paint and apply evenly. Poorly done paint jobs can result in deductions."
    },
    {
      question: "What should I clean inside the refrigerator?",
      answer: "Remove all shelves and drawers and wash them with warm soapy water. Wipe down all interior walls, including the top and under any crisper drawers. Clean the door seals (gaskets) where mold can grow. Don't forget the top of the fridge and the coils in back if accessible."
    },
    {
      question: "How do I clean oven without harsh chemicals?",
      answer: "For a natural approach: make a paste of baking soda and water, spread it inside the oven, let it sit overnight, then spray with vinegar and wipe clean. For tough grease, commercial oven cleaners work faster but require good ventilation. Don't forget to clean the racks separately."
    },
    {
      question: "What's the best way to clean bathroom grout?",
      answer: "Make a paste of baking soda and hydrogen peroxide, apply to grout, let sit 10-15 minutes, then scrub with a stiff brush. For mold, use a bleach solution (1 part bleach to 10 parts water). Commercial grout cleaners also work well. Rinse thoroughly after cleaning."
    },
    {
      question: "Should I clean window screens?",
      answer: "Yes, if they're dirty. Remove screens and wash with mild soap and water, rinse with a hose, and let dry completely before reinstalling. If screens are damaged, you may need to replace them or expect a deduction. Clean windows inside and out for best results."
    },
    {
      question: "How do I remove hard water stains?",
      answer: "White vinegar is your best friend. For faucets and fixtures, soak paper towels in vinegar and wrap around the fixture for 30 minutes, then scrub. For shower doors, spray undiluted vinegar, let sit, then scrub. For stubborn stains, use CLR or Bar Keeper's Friend."
    },
    {
      question: "What areas do landlords commonly check during inspection?",
      answer: "Landlords typically check: inside oven and refrigerator, behind and under appliances, toilet and bathtub, cabinet interiors, closet floors and shelves, window sills and blinds, baseboards, carpet condition, walls for holes/marks, and light fixtures. Document these areas especially well."
    },
  ];

  // State
  const [completed, setCompleted] = useState({});
  const [expandedCategories, setExpandedCategories] = useState(new Set(['kitchen']));
  const [filterPriority, setFilterPriority] = useState('all');
  const [expandedFaqs, setExpandedFaqs] = useState(new Set());

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dibbytour-moveout-cleaning');
    if (saved) {
      setCompleted(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('dibbytour-moveout-cleaning', JSON.stringify(completed));
  }, [completed]);

  // Calculate progress
  const totalTasks = cleaningCategories.reduce((sum, cat) => sum + cat.tasks.length, 0);
  const completedTasks = Object.values(completed).filter(Boolean).length;
  const progress = Math.round((completedTasks / totalTasks) * 100);

  // Calculate total time
  const totalTime = cleaningCategories.reduce((sum, cat) => 
    cat.tasks.reduce((s, t) => s + t.time, sum), 0);
  const completedTime = cleaningCategories.reduce((sum, cat) => 
    cat.tasks.reduce((s, t) => completed[t.id] ? s + t.time : s, sum), 0);
  const remainingTime = totalTime - completedTime;

  // Format time
  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  // Toggle task
  const toggleTask = (taskId) => {
    setCompleted(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  // Toggle category
  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
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

  // Reset all
  const resetAll = () => {
    if (confirm('Reset all progress? This cannot be undone.')) {
      setCompleted({});
    }
  };

  // Export to text
  const exportToText = () => {
    let text = `MOVE-OUT CLEANING CHECKLIST\n`;
    text += `========================\n\n`;
    text += `Date: ${new Date().toLocaleDateString()}\n`;
    text += `Progress: ${progress}% (${completedTasks}/${totalTasks} tasks)\n`;
    text += `Estimated Time Remaining: ${formatTime(remainingTime)}\n\n`;
    
    cleaningCategories.forEach(category => {
      text += `\n${category.name}\n`;
      text += `-`.repeat(40) + `\n`;
      category.tasks.forEach(task => {
        const status = completed[task.id] ? '✓' : '○';
        text += `${status} ${task.text}`;
        if (task.priority === 'high') text += ` [HIGH PRIORITY]`;
        text += ` (${task.time} min)\n`;
      });
    });
    
    text += `\n\n========================\n`;
    text += `Generated by DibbyTour.com\n`;
    text += `Calculate your security deposit: dibbytour.com/tools/security-deposit-calculator\n`;
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `move-out-cleaning-checklist.txt`;
    a.click();
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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
            "name": "How to Clean Your Apartment Before Moving Out",
            "description": "Complete guide to move-out cleaning to get your security deposit back",
            "totalTime": `PT${Math.ceil(totalTime/60)}H`,
            "step": cleaningCategories.map(cat => ({
              "@type": "HowToStep",
              "name": cat.name.replace(/[^\w\s]/g, ''),
              "text": cat.tasks.map(t => t.text).join(', ')
            }))
          })
        }}
      />

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md print:hidden">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🧹</span>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Move-Out Cleaning Checklist</h1>
                <p className="text-xs text-gray-500">
                  {completedTasks}/{totalTasks} tasks • {formatTime(remainingTime)} remaining
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-blue-600">{progress}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="text-center mb-8 print:mb-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Move-Out Cleaning Checklist
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get your full security deposit back! 128 tasks organized by room with time estimates.
            Check off tasks as you clean - progress saves automatically.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 print:shadow-none">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{progress}%</div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">{completedTasks}/{totalTasks}</div>
              <div className="text-sm text-gray-500">Tasks Done</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{formatTime(completedTime)}</div>
              <div className="text-sm text-gray-500">Time Spent</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">{formatTime(remainingTime)}</div>
              <div className="text-sm text-gray-500">Remaining</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mb-4 print:hidden">
          <button
            onClick={exportToText}
            className="px-4 py-2 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium shadow"
          >
            📥 Export
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium shadow"
          >
            🖨️ Print
          </button>
          <button
            onClick={resetAll}
            className="px-4 py-2 bg-white text-red-600 rounded-xl hover:bg-red-50 transition-all font-medium shadow"
          >
            🔄 Reset
          </button>
          <div className="flex-1" />
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority Only</option>
            <option value="medium">Medium & High</option>
          </select>
        </div>

        {/* Quick Expand/Collapse */}
        <div className="flex gap-2 mb-4 print:hidden">
          <button
            onClick={() => setExpandedCategories(new Set(cleaningCategories.map(c => c.id)))}
            className="text-sm text-blue-600 hover:text-blue-700"
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

        {/* Cleaning Categories */}
        <div className="space-y-4">
          {cleaningCategories.map(category => {
            const filteredTasks = category.tasks.filter(task => {
              if (filterPriority === 'all') return true;
              if (filterPriority === 'high') return task.priority === 'high';
              if (filterPriority === 'medium') return task.priority === 'high' || task.priority === 'medium';
              return true;
            });
            
            const categoryCompleted = filteredTasks.filter(t => completed[t.id]).length;
            const isExpanded = expandedCategories.has(category.id);
            const categoryProgress = Math.round((categoryCompleted / filteredTasks.length) * 100) || 0;
            
            if (filteredTasks.length === 0) return null;
            
            return (
              <div key={category.id} className="bg-white rounded-2xl shadow-lg overflow-hidden print:shadow-none print:border">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full px-6 py-4 flex items-center justify-between transition-all ${
                    categoryProgress === 100 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div className="text-left">
                      <h2 className="text-lg font-bold">{category.name}</h2>
                      <p className="text-sm text-blue-100">{category.timeEstimate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-semibold">{categoryCompleted}/{filteredTasks.length}</div>
                      <div className="w-20 bg-white/30 rounded-full h-2">
                        <div 
                          className="bg-white h-2 rounded-full transition-all"
                          style={{ width: `${categoryProgress}%` }}
                        />
                      </div>
                    </div>
                    <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </div>
                </button>
                
                {/* Tasks */}
                {isExpanded && (
                  <div className="p-4 space-y-2">
                    <p className="text-sm text-gray-500 mb-3">{category.description}</p>
                    {filteredTasks.map(task => (
                      <label 
                        key={task.id} 
                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                          completed[task.id] 
                            ? 'bg-green-50 border-2 border-green-200' 
                            : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={completed[task.id] || false}
                          onChange={() => toggleTask(task.id)}
                          className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                        />
                        <span className={`flex-1 ${completed[task.id] ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                          {task.text}
                        </span>
                        <div className="flex items-center gap-2">
                          {task.priority === 'high' && (
                            <span className="px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-700 rounded-full">
                              HIGH
                            </span>
                          )}
                          <span className="text-xs text-gray-400">{task.time}m</span>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Deposit CTA */}
        <div className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center print:hidden">
          <h2 className="text-2xl font-bold mb-3">Calculate Your Security Deposit</h2>
          <p className="text-green-100 mb-6 max-w-xl mx-auto">
            Know your rights! Use our security deposit calculator to understand what deductions 
            are legal in your state and how much you should get back.
          </p>
          <a
            href="/tools/security-deposit-calculator"
            className="inline-block px-8 py-4 bg-white text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all shadow-lg"
          >
            Calculate My Deposit →
          </a>
        </div>

        {/* Supplies Checklist */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 print:hidden">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🧴 Cleaning Supplies Checklist</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Basic Supplies</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>☐ All-purpose cleaner</li>
                <li>☐ Glass cleaner</li>
                <li>☐ Bathroom cleaner</li>
                <li>☐ Toilet bowl cleaner</li>
                <li>☐ Oven cleaner</li>
                <li>☐ Dish soap</li>
                <li>☐ Baking soda</li>
                <li>☐ White vinegar</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Tools</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>☐ Microfiber cloths</li>
                <li>☐ Scrub brushes</li>
                <li>☐ Sponges</li>
                <li>☐ Mop and bucket</li>
                <li>☐ Vacuum cleaner</li>
                <li>☐ Broom and dustpan</li>
                <li>☐ Rubber gloves</li>
                <li>☐ Magic eraser</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 print:hidden">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Pro Tips for Getting Your Deposit Back</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-blue-600 mb-2">📸 Document Everything</h3>
              <p className="text-gray-600 text-sm">
                Take photos and video of every room before AND after cleaning. 
                Include timestamps. This is your proof if there's a dispute.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-blue-600 mb-2">📋 Attend the Walkthrough</h3>
              <p className="text-gray-600 text-sm">
                Always be present for the move-out inspection. You can address issues 
                on the spot and negotiate before deductions are finalized.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-blue-600 mb-2">🔍 Compare to Move-In</h3>
              <p className="text-gray-600 text-sm">
                Reference your move-in inspection photos. You shouldn't be charged 
                for damage that existed before you moved in.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-blue-600 mb-2">📝 Get It In Writing</h3>
              <p className="text-gray-600 text-sm">
                Request an itemized list of any deductions. Landlords must provide this 
                in most states. Dispute anything that seems unfair.
              </p>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-8 print:hidden">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Tools</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/tools/security-deposit-calculator" className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
              <span className="text-2xl mb-2 block">💰</span>
              <h3 className="font-bold text-gray-900">Security Deposit Calculator</h3>
              <p className="text-sm text-gray-600">Know your rights and max deposit</p>
            </a>
            <a href="/tools/questions-to-ask-when-renting" className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
              <span className="text-2xl mb-2 block">📋</span>
              <h3 className="font-bold text-gray-900">Apartment Questions Checklist</h3>
              <p className="text-sm text-gray-600">75+ questions to ask before renting</p>
            </a>
            <a href="/tools/first-apartment-checklist" className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
              <span className="text-2xl mb-2 block">🏠</span>
              <h3 className="font-bold text-gray-900">First Apartment Checklist</h3>
              <p className="text-sm text-gray-600">Everything for your new place</p>
            </a>
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

        {/* Inspection CTA */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center print:hidden">
          <h2 className="text-2xl font-bold mb-3">Need a Move-In Inspection for Your New Place?</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Don't make the same mistake twice! Get a professional move-in inspection to document 
            everything before you sign. Protect your next security deposit from day one.
          </p>
          <a
            href="/services/remote-apartment-inspection"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg"
          >
            Book Apartment Inspection →
          </a>
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
                  <li><a href="/checklists/questions-to-ask" className="text-gray-500 hover:text-gray-800 text-sm">Questions to Ask</a></li>
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
          <p className="text-gray-500 text-sm">
            Created by DibbyTour - Your apartment inspection partner
          </p>
          <p className="text-gray-400 text-xs mt-2">
            © {new Date().getFullYear()} DibbyTour. All rights reserved.
          </p>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body { font-size: 10px; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default MoveOutCleaningChecklist;
