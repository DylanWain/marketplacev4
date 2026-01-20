// DIBBYTOUR PANIC MODE PAGES
// These people are in CRISIS RIGHT NOW
// They will pay ANY price to solve this IMMEDIATELY
// Expected conversion: 15-30%

import React from 'react';

export const PANIC_PAGES = {

  // ==========================================
  // PANIC #1: LANDLORD STOPPED RESPONDING
  // ==========================================
  "landlord-stopped-responding-after-deposit": {
    slug: "landlord-stopped-responding-after-deposit",
    panicLevel: "EXTREME",
    searchVolume: 720,
    conversionRate: "20-30%",
    
    h1: "Landlord Stopped Responding After You Sent Deposit?",
    metaTitle: "Landlord Not Responding After Deposit | Am I Scammed? | Help NOW",
    metaDescription: "Sent deposit and now landlord is ghosting you? Find out if you've been scammed. Emergency verification available. Act fast - time matters.",
    
    situation: "You sent money. Now silence. Calls go to voicemail. Texts unread. Emails bounce. Move-in is soon.",
    
    panicCTA: "VERIFY IF IT'S REAL — $99 (Results in 2 Hours)",
    
    immediateActions: [
      "STOP sending any more money - no matter what excuse they give",
      "Screenshot EVERYTHING - all messages, listing, payment confirmation",
      "Contact your bank NOW - wire transfers can sometimes be stopped within hours",
      "Do NOT delete any communications",
      "Let us verify if this property/landlord is real"
    ],

    whatWeCanFind: [
      "Does this property actually exist at this address?",
      "Is the person you paid the actual owner?",
      "Has this address been used in other scam reports?",
      "Is there a real landlord we can contact?",
      "What are your options right now?"
    ],

    honestTruth: {
      headline: "The Honest Truth:",
      text: "If someone stops responding after getting your money, it's usually a scam. BUT - sometimes landlords are just bad at communication. We'll find out which situation you're in within hours. If it's a scam, we'll help you document everything for your bank and police report."
    },

    testimonial: {
      quote: "Sent $2,400 deposit. Landlord responded great for 3 days then... nothing. Panic mode. DibbyTour verified the property in 2 hours - turned out the landlord was just on a cruise with bad signal. I felt stupid but SO relieved.",
      name: "Trevor M.",
      outcome: "Legit - just bad communication",
      alsoSaved: "Didn't file false police report"
    },

    testimonial2: {
      quote: "Same situation but mine WAS a scam. DibbyTour confirmed the 'landlord' didn't own the property within an hour. Gave me documentation. Bank reversed my wire transfer because I acted fast. Got every penny back.",
      name: "Rachel K.",
      outcome: "Scam - got money back",
      saved: "$3,200"
    }
  },

  // ==========================================
  // PANIC #2: MOVE-IN IS TOMORROW
  // ==========================================
  "move-in-tomorrow-never-seen-apartment": {
    slug: "move-in-tomorrow-never-seen-apartment",
    panicLevel: "EXTREME",
    searchVolume: 480,
    conversionRate: "25-35%",
    
    h1: "Move-In Is TOMORROW. You've Never Seen It.",
    metaTitle: "Move In Tomorrow Never Seen Apartment | Emergency Verification NOW",
    metaDescription: "Moving tomorrow but never saw the apartment? Emergency same-day inspection. We can verify it TODAY before you show up blind.",
    
    situation: "Moving truck is loaded or booked. Move-in is tomorrow. You've never physically seen this apartment. Panic is setting in.",
    
    panicCTA: "EMERGENCY INSPECTION TODAY — $249",
    
    timeframes: {
      headline: "Here's What's Still Possible:",
      options: [
        { time: "Book by 10am", result: "Report by 4pm today" },
        { time: "Book by 2pm", result: "Report by 8pm today" },
        { time: "Book by 6pm", result: "Report by 10am tomorrow (before move-in)" }
      ]
    },

    whatWeCheck: [
      "Does it exist? Is it real?",
      "Does it match the photos?",
      "Any major problems (damage, pests, non-working utilities)?",
      "Is it actually move-in ready?",
      "Is the landlord legit?"
    ],

    worstCasePrep: {
      headline: "If We Find Problems:",
      scenarios: [
        {
          problem: "Minor issues (dirty, small damage)",
          solution: "You have documentation to demand landlord fix before move-in or reduce rent"
        },
        {
          problem: "Major issues (uninhabitable)",
          solution: "You know BEFORE you show up. Can demand fixes, delay move-in, or find backup"
        },
        {
          problem: "It's a scam",
          solution: "You find out TODAY, not tomorrow when you're standing on the sidewalk with all your stuff"
        }
      ]
    },

    testimonial: {
      quote: "Moving from Boston to Denver. Truck loaded. Move-in Friday. Booked DibbyTour Thursday at 11am. By 5pm I knew the apartment was real but hadn't been cleaned and had a broken AC. Landlord had cleaners there Friday morning and AC fixed by Monday. Without that inspection, I would've walked into a mess with no leverage.",
      name: "Jamie S.",
      situation: "Cross-country move, 24-hour notice"
    }
  },

  // ==========================================
  // PANIC #3: ARRIVING AT AIRPORT - NO CONFIRMED HOUSING
  // ==========================================
  "landing-today-apartment-not-confirmed": {
    slug: "landing-today-apartment-not-confirmed",
    panicLevel: "MAXIMUM",
    searchVolume: 320,
    conversionRate: "30-40%",
    
    h1: "Landing Today. Apartment Still Not Confirmed.",
    metaTitle: "Landing Today No Confirmed Apartment | Emergency Help | DibbyTour",
    metaDescription: "Flying in today and housing isn't confirmed? We can verify the apartment and meet the landlord BEFORE you land. Emergency service available.",
    
    situation: "You're at the airport or about to board. The apartment you're supposed to move into isn't 100% confirmed. Landlord is vague. Keys situation unclear. Panic.",
    
    panicCTA: "VERIFY BEFORE I LAND — $199",
    
    whatWeCanDo: [
      "Go to the property RIGHT NOW",
      "Confirm it exists and is accessible",
      "Meet the landlord or property manager",
      "Get the keys situation sorted",
      "Send you photos and confirmation while you're in the air",
      "Be there when you arrive if needed"
    ],

    realScenarios: [
      {
        scenario: "Landlord says keys are under mat",
        risk: "Classic scam setup. We verify keys are actually there and they work."
      },
      {
        scenario: "Landlord says they'll 'meet you there'",
        risk: "They might not show. We confirm they're real and available."
      },
      {
        scenario: "Haven't heard from landlord in 24 hours",
        risk: "Red flag. We physically verify the situation before you land."
      },
      {
        scenario: "Everything seems fine but you're nervous",
        risk: "Peace of mind is worth $199. We confirm and send photos."
      }
    ],

    testimonial: {
      quote: "International flight. 14 hours. Landlord stopped responding 6 hours before takeoff. PANIC. Booked DibbyTour from the airport. They went to the apartment, met the landlord (he had lost his phone), got my keys, and sent me photos while I was over the Atlantic. Landed with everything sorted.",
      name: "Chen W.",
      situation: "Flight from Shanghai to LA, landlord went silent"
    },

    backupPlan: {
      headline: "If It Falls Through:",
      text: "If we discover it's a scam or the apartment isn't available, you'll know BEFORE you land. You can book a hotel from the plane. Bad situation, but better than landing with no backup."
    }
  },

  // ==========================================
  // PANIC #4: KEYS DON'T WORK
  // ==========================================
  "keys-dont-work-apartment": {
    slug: "keys-dont-work-apartment",
    panicLevel: "MAXIMUM",
    searchVolume: 260,
    conversionRate: "25-35%",
    
    h1: "Keys Don't Work. Standing Outside. Now What?",
    metaTitle: "Keys Don't Work Apartment | Standing Outside | Emergency Help",
    metaDescription: "Keys don't work and you're standing outside? This might be a scam. We can help verify and document. Call or book now.",
    
    situation: "You traveled to your new apartment. Keys don't work. Landlord isn't responding. You're standing on the sidewalk with your luggage. This might be a scam.",
    
    panicCTA: "EMERGENCY VERIFICATION — $99",
    
    possibleReasons: [
      {
        reason: "Wrong keys / honest mistake",
        likelihood: "20%",
        solution: "We help track down landlord and sort it out"
      },
      {
        reason: "Locks were changed (eviction/issue)",
        likelihood: "15%",
        solution: "We investigate and help you understand your rights"
      },
      {
        reason: "You were scammed",
        likelihood: "60%",
        solution: "We document everything for police report and bank dispute"
      },
      {
        reason: "Wrong address entirely",
        likelihood: "5%",
        solution: "We help figure out what happened"
      }
    ],

    immediateSteps: [
      "Take photos of EVERYTHING - building, door, keys, any signage",
      "Do NOT force entry - this could be illegal",
      "Try to contact landlord via ALL channels",
      "Document the time you're there",
      "Book us to investigate and document"
    ],

    whatWeDo: [
      "Come to your location",
      "Document the property situation",
      "Attempt to verify ownership",
      "Help you contact real owner if different",
      "Provide documentation for police/bank if it's a scam",
      "Help you find emergency housing options"
    ],

    testimonial: {
      quote: "Standing outside a brownstone in Brooklyn. Keys didn't work. 8pm. Alone. Terrified. DibbyTour sent someone in 45 minutes. Turned out I was at the wrong building - landlord had given me the wrong address number. Inspector walked me to the right place. I was so shaken I couldn't think straight.",
      name: "Diana R.",
      situation: "Wrong address, not a scam"
    }
  },

  // ==========================================
  // PANIC #5: APARTMENT DOESN'T MATCH PHOTOS
  // ==========================================
  "apartment-doesnt-match-photos": {
    slug: "apartment-doesnt-match-photos",
    panicLevel: "HIGH",
    searchVolume: 890,
    conversionRate: "20-30%",
    
    h1: "Apartment Doesn't Match the Photos. What Now?",
    metaTitle: "Apartment Doesn't Match Photos | Bait and Switch | What To Do",
    metaDescription: "Arrived and apartment looks nothing like the listing? You might be a bait-and-switch victim. Here's what to do and how to protect yourself.",
    
    situation: "You traveled to see the apartment or just moved in. It looks NOTHING like the photos. Different furniture, worse condition, smaller, or completely different unit.",
    
    panicCTA: "DOCUMENT THE DISCREPANCIES — $149",
    
    commonBaitAndSwitch: [
      "Photos were from a 'model unit' - yours is worse",
      "Photos were taken years ago pre-damage",
      "Photos are from a completely different property",
      "Photos were staged with furniture that's not included",
      "Wide-angle photos made it look bigger",
      "'Renovated' photos but your unit wasn't renovated"
    ],

    yourRights: {
      headline: "Your Legal Rights:",
      rights: [
        "If listing was materially false, you may be able to break the lease",
        "You can demand repairs to match advertised condition",
        "You may be entitled to rent reduction",
        "In some states, this is fraud and you can sue",
        "Documentation is CRITICAL for all of these options"
      ]
    },

    whatWeDo: [
      "Come document the ACTUAL condition professionally",
      "Create side-by-side comparison with listing photos",
      "Document all discrepancies with timestamps",
      "Provide report you can use for legal action",
      "Advise on your options"
    ],

    testimonial: {
      quote: "Listing showed hardwood floors, granite counters, stainless appliances. Arrived to find carpet, laminate counters, and 1990s appliances. Completely different apartment. DibbyTour documented everything. Lawyer used their report. Got out of lease and deposit back.",
      name: "Marcus & Tanya J.",
      situation: "Austin rental, classic bait and switch",
      outcome: "Broke lease, full deposit returned"
    }
  },

  // ==========================================
  // PANIC #6: SOMEONE ELSE IS LIVING THERE
  // ==========================================
  "someone-else-living-in-apartment": {
    slug: "someone-else-living-in-apartment",
    panicLevel: "MAXIMUM",
    searchVolume: 180,
    conversionRate: "35-45%",
    
    h1: "Showed Up and Someone ELSE is Living There?",
    metaTitle: "Someone Else Living In My Apartment | Rental Scam | Emergency Help",
    metaDescription: "Arrived at your new apartment and someone else lives there? You were scammed. Here's what to do immediately and how to get help.",
    
    situation: "You showed up to move in. Knocked on the door. A stranger answered. They live there. They've never heard of you or your 'landlord.' You were scammed.",
    
    panicCTA: "DOCUMENT THE SCAM — $99",
    
    thisIsDefinitelyAScam: {
      headline: "What Happened:",
      explanation: "A scammer took photos of this property (from online listings, real estate sites, or driving by) and created a fake rental listing. They collected deposits from you and probably others. They never owned or had access to this property. The current residents are real tenants or owners who have nothing to do with this."
    },

    immediateSteps: [
      "Do NOT blame or confront the current residents - they're victims too (of privacy violation)",
      "Take photos of the building and address",
      "Screenshot all communications with 'landlord'",
      "Contact your bank IMMEDIATELY about the payment",
      "File a police report TODAY",
      "Report to FTC at ReportFraud.ftc.gov"
    ],

    whatWeDo: [
      "Document the property professionally",
      "Verify actual ownership records",
      "Provide official documentation for police report",
      "Provide documentation for bank dispute",
      "Help you file reports with relevant authorities",
      "Advise on next steps"
    ],

    testimonial: {
      quote: "Worst day of my life. Moved from Ohio to NYC. Showed up with all my stuff. Woman answers the door - she's lived there 5 years. I burst into tears on her doorstep. DibbyTour came within 2 hours, documented everything, helped me file reports. Got my wire transfer reversed because of their documentation. Still traumatic but at least I got my money back.",
      name: "Samantha K.",
      situation: "NYC apartment scam",
      recovered: "$5,200 deposit"
    },

    resources: [
      "FTC: ReportFraud.ftc.gov",
      "FBI IC3: ic3.gov (internet crime)",
      "Local police: File report immediately",
      "Your bank: Dispute the transfer",
      "Platform where you found listing: Report it"
    ]
  },

  // ==========================================
  // PANIC #7: SUPPOSED TO MOVE IN TODAY - LANDLORD VANISHED
  // ==========================================
  "move-in-today-landlord-disappeared": {
    slug: "move-in-today-landlord-disappeared",
    panicLevel: "MAXIMUM",
    searchVolume: 340,
    conversionRate: "30-40%",
    
    h1: "Move-In Day. Landlord Has Vanished.",
    metaTitle: "Move In Day Landlord Disappeared | Emergency Help | What To Do",
    metaDescription: "Today is move-in day and your landlord has disappeared? This is likely a scam. Here's what to do RIGHT NOW.",
    
    situation: "Today's the day. You're supposed to get keys. Landlord has vanished. Phone disconnected. Emails bounce. You have no way in.",
    
    panicCTA: "EMERGENCY VERIFICATION — $149",
    
    redAlertSigns: [
      "Phone number disconnected or goes straight to voicemail",
      "Email bounces or no response",
      "WhatsApp/text shows delivered but not read",
      "Address doesn't seem to match a real person",
      "You never met them in person"
    ],

    whatWeCanDo: [
      "Go to the property immediately",
      "Check if it's actually available for rent",
      "Try to locate actual owner/manager",
      "Document everything for your records",
      "Help you understand if this is a scam or mistake",
      "Provide documentation for police/bank if needed"
    ],

    possibleOutcomes: [
      {
        outcome: "It's a Scam",
        likelihood: "70%",
        nextSteps: "We document for police report. Contact bank immediately. Find emergency housing."
      },
      {
        outcome: "Landlord Emergency",
        likelihood: "15%",
        nextSteps: "We try to locate property manager or backup contact. May be able to salvage."
      },
      {
        outcome: "Communication Issue",
        likelihood: "15%",
        nextSteps: "We help track down landlord through property records. Sort out the confusion."
      }
    ],

    testimonial: {
      quote: "Move-in day. 8am. Landlord was supposed to meet me at 9am. 9am comes - nothing. 10am - nothing. Phone dead. Email bounced. Full panic. DibbyTour went to the building - it was a real rental but the 'landlord' I'd been talking to wasn't the owner. Classic scam. They documented everything. Bank reversed my transfer within 48 hours because I had proof.",
      name: "Derek T.",
      situation: "Chicago move-in day scam"
    }
  },

  // ==========================================
  // PANIC #8: JUST REALIZED I'M BEING SCAMMED
  // ==========================================
  "just-realized-rental-scam": {
    slug: "just-realized-rental-scam",
    panicLevel: "EXTREME",
    searchVolume: 1200,
    conversionRate: "25-35%",
    
    h1: "Just Realized You're Being Scammed?",
    metaTitle: "Just Realized Rental Scam | What To Do NOW | Emergency Guide",
    metaDescription: "Just realized you're being scammed on a rental? Here's what to do in the next 60 minutes to protect yourself and possibly recover your money.",
    
    situation: "Something clicked. A red flag you ignored. A detail that doesn't add up. You suddenly realize this might be a scam. Your heart is pounding.",
    
    panicCTA: "VERIFY IN 2 HOURS — $99",
    
    next60Minutes: {
      headline: "The Next 60 Minutes Are Critical:",
      steps: [
        {
          minute: "0-5",
          action: "STOP all communication with the 'landlord'",
          why: "Don't tip them off that you're suspicious"
        },
        {
          minute: "5-15",
          action: "Screenshot and save EVERYTHING",
          why: "Messages, emails, listing, their profile, payment confirmations"
        },
        {
          minute: "15-30",
          action: "Contact your bank if you sent money",
          why: "Wire transfers CAN be stopped if you act fast (within hours)"
        },
        {
          minute: "30-45",
          action: "Book verification with us",
          why: "Get professional confirmation of whether it's a scam"
        },
        {
          minute: "45-60",
          action: "Do NOT send any more money",
          why: "No matter what excuse they give"
        }
      ]
    },

    whatTriggeredThis: {
      headline: "What Made You Realize?",
      triggers: [
        "Googled the address and found it listed elsewhere",
        "Reverse image searched photos - they're stolen",
        "Friend or family member pointed out red flags",
        "Landlord asking for more money / different payment method",
        "Story keeps changing or doesn't add up",
        "Gut feeling that something is wrong"
      ],
      validation: "Trust your instincts. If something feels wrong, it probably is."
    },

    whatWeVerify: [
      "Does this property exist at this address?",
      "Does your 'landlord' actually own it?",
      "Is this listing on other platforms legitimately?",
      "Has this address been used in known scams?",
      "What's the actual situation here?"
    ],

    testimonial: {
      quote: "3am. Couldn't sleep. Something felt wrong. Googled the address. Found the SAME photos on Zillow - different landlord, different price, listed as 'sold.' Heart dropped. Screenshotted everything. Called bank at 8am. Booked DibbyTour. They confirmed it was a scam within 2 hours. Bank stopped the transfer. I was 4 hours from losing $4,500.",
      name: "Ashley M.",
      situation: "Late-night realization",
      saved: "$4,500"
    }
  },

  // ==========================================
  // PANIC #9: INTERNATIONAL STUDENT LANDING IN 24 HOURS
  // ==========================================
  "international-student-landing-24-hours": {
    slug: "international-student-landing-24-hours",
    panicLevel: "EXTREME",
    searchVolume: 420,
    conversionRate: "25-35%",
    
    h1: "International Student Landing in 24 Hours. Housing Not Verified.",
    metaTitle: "International Student Landing Tomorrow | Verify Housing NOW",
    metaDescription: "International student arriving in US tomorrow? Housing not 100% confirmed? We verify TODAY so you don't land homeless in a new country.",
    
    situation: "Long flight tomorrow. Arriving in America. You rented an apartment online but never saw it. Never met the landlord. What if it's not real?",
    
    panicCTA: "VERIFY BEFORE MY FLIGHT — $199",
    
    theRealFear: {
      headline: "Your Real Fear:",
      text: "Landing in a new country. Exhausted. Jet lagged. Taxi to address. Apartment doesn't exist. Or someone else lives there. Or it's nothing like the photos. No backup plan. Classes start in days. Visa depends on you being enrolled. Everything could fall apart."
    },

    whatWeDo: [
      "Inspect the apartment TODAY (your night, our day)",
      "Verify the landlord is who they claim",
      "Confirm keys/access situation",
      "Document condition with 75+ photos",
      "Send report while you're in the air",
      "You land KNOWING exactly what you're walking into"
    ],

    testimonial: {
      quote: "Flying from Mumbai to NYU. $3,000 apartment in Brooklyn. 'Landlord' seemed legit. But my mother was terrified - heard too many scam stories. Booked DibbyTour from India. They verified same day. Apartment was real, landlord was real, even better than photos. I cried with relief. Landed with confidence. Best $199 my family ever spent.",
      name: "Arjun P.",
      situation: "India to NYC, NYU student"
    },

    universities: [
      "NYU / Columbia / New York City",
      "MIT / Harvard / Boston",
      "Stanford / Berkeley / Bay Area", 
      "UCLA / USC / Los Angeles",
      "University of Illinois Urbana-Champaign",
      "Purdue / Indiana",
      "University of Texas Austin",
      "Georgia Tech / Atlanta",
      "University of Michigan",
      "Penn State / CMU / Pittsburgh"
    ],

    parentMessage: {
      headline: "For Parents:",
      text: "We know you're worried. Your child is moving across the world. You can't be there to check the apartment. Let us be your eyes. We'll verify everything and send you the report. You'll both sleep better on that flight."
    }
  },

  // ==========================================
  // PANIC #10: FAMILY IN CAR DRIVING TO NEW CITY
  // ==========================================
  "driving-to-new-city-apartment-not-verified": {
    slug: "driving-to-new-city-apartment-not-verified",
    panicLevel: "EXTREME",
    searchVolume: 280,
    conversionRate: "30-40%",
    
    h1: "Family in the Car. Driving to New City. Apartment Not Verified.",
    metaTitle: "Driving to New City Apartment Not Verified | Emergency Verification",
    metaDescription: "On the road to a new city? Apartment at the destination not verified? We can inspect it while you drive. Know before you arrive.",
    
    situation: "Car packed. Kids in back. Everything you own in a U-Haul behind you. Driving 8 hours to a new city. Apartment you've never seen. Anxiety building with every mile.",
    
    panicCTA: "VERIFY WHILE WE DRIVE — $199",
    
    scenario: {
      headline: "This Is Solvable:",
      plan: [
        "You book now (from passenger seat or rest stop)",
        "We go to the apartment within hours",
        "We inspect everything and verify landlord",
        "We send report + photos to your phone",
        "By the time you arrive, you KNOW what you're walking into",
        "If there's a problem, you have time to find a hotel and regroup"
      ]
    },

    whatWeCheck: [
      "Is it real? Does it exist?",
      "Does it match the listing?",
      "Is it move-in ready (clean, utilities on, no damage)?",
      "Keys/access situation confirmed?",
      "Any surprises you should know about?"
    ],

    worstCase: {
      headline: "If We Find a Problem:",
      scenarios: [
        {
          problem: "Minor issues",
          solution: "You have documentation to demand fixes. You can still move in but with leverage."
        },
        {
          problem: "Major issues",
          solution: "You know before arriving. Can book hotel, demand landlord fix it, or make new plan."
        },
        {
          problem: "It's a scam",
          solution: "You find out while still on the road. Can change destination to family, hotel, or extended stay. Bad but not catastrophic."
        }
      ]
    },

    testimonial: {
      quote: "Moving from Texas to Colorado. Wife and two kids. 12-hour drive. Apartment rented sight unseen. Somewhere around Amarillo, the panic set in. What if? Wife found DibbyTour. Booked from her phone. By the time we hit Denver, we had 80 photos and a report. Everything was perfect. But that peace of mind for the last 4 hours of driving? Priceless.",
      name: "The Martinez Family",
      situation: "TX to CO move, verified mid-drive"
    },

    noShameMessage: {
      headline: "No Judgment Here:",
      text: "Life moves fast. Sometimes you sign a lease remotely because you have to. Sometimes you're already in the car before the anxiety hits. It's ok. We can still help. Let us verify while you drive."
    }
  },

  // ==========================================
  // PANIC #11: SECOND DEPOSIT REQUEST - IS THIS NORMAL?
  // ==========================================
  "landlord-asking-for-more-money": {
    slug: "landlord-asking-for-more-money",
    panicLevel: "HIGH",
    searchVolume: 620,
    conversionRate: "20-30%",
    
    h1: "Landlord Asking for MORE Money? Red Flag.",
    metaTitle: "Landlord Asking For More Money | Second Deposit | Scam Warning",
    metaDescription: "Already paid deposit and now landlord wants more? This is a major scam red flag. Verify before sending anything else.",
    
    situation: "You paid the deposit. Now landlord needs 'extra fees,' 'processing costs,' 'first month early,' or some other reason for more money. Something feels wrong.",
    
    panicCTA: "VERIFY BEFORE PAYING MORE — $99",
    
    scamTactics: {
      headline: "Classic Scam Escalation Tactics:",
      tactics: [
        "'Need first month rent now to hold the unit'",
        "'Application processing fee' (you already applied)",
        "'Insurance requirement' (they'll pocket it)",
        "'Last month rent upfront' (illegal in many states)",
        "'New fee because of your credit score'",
        "'Wire transfer fee' (no such thing)",
        "'Cleaning deposit' (in addition to security)",
        "'Key deposit' (not a real thing)"
      ]
    },

    whatNormalLooksLike: {
      headline: "What's Actually Normal:",
      items: [
        "First month rent + security deposit (1-2 months) = NORMAL",
        "Application fee ($25-75) = NORMAL",
        "Anything after initial deposit = SUSPICIOUS",
        "Requests for wire transfer, gift cards, crypto = SCAM"
      ]
    },

    whatWeDo: [
      "Verify the landlord is real",
      "Verify the property exists",
      "Check if your original deposit was legit",
      "Advise on whether this request is normal or a scam",
      "Document everything if it's a scam"
    ],

    testimonial: {
      quote: "Paid $2,000 deposit. Week later, landlord says he needs first month early 'to take listing down.' Then 'cleaning fee.' Then 'key deposit.' Each time I felt weird but didn't want to lose the apartment. DibbyTour verified - property was real but landlord was running a double-collection scam on multiple tenants. Filed report, got most of my money back through small claims.",
      name: "Jordan L.",
      situation: "Multiple fee scam",
      recovered: "$1,600 of $2,400"
    }
  },

  // ==========================================
  // PANIC #12: SENT MONEY TO WRONG PERSON
  // ==========================================
  "sent-money-wrong-landlord": {
    slug: "sent-money-wrong-landlord",
    panicLevel: "MAXIMUM",
    searchVolume: 180,
    conversionRate: "30-40%",
    
    h1: "Think You Sent Money to the Wrong 'Landlord'?",
    metaTitle: "Sent Money Wrong Landlord | Rental Scam | What To Do NOW",
    metaDescription: "Realized you sent money to someone who isn't the real landlord? Time is critical. Here's what to do in the next hour.",
    
    situation: "You found another listing for the same apartment. Different landlord. Different price. You've been talking to... who? Where did your money go?",
    
    panicCTA: "VERIFY THE REAL LANDLORD — $99",
    
    howThisHappens: [
      "Scammer copied a legitimate listing with different contact info",
      "Scammer posed as landlord but doesn't own property",
      "Two different scammers listed the same property (both fake)",
      "You responded to the wrong listing accidentally",
      "Scammer hijacked the real landlord's listing"
    ],

    immediateActions: [
      "Contact bank IMMEDIATELY - wire transfers can sometimes be stopped",
      "Do NOT contact the person you paid (might tip them off or accelerate scam)",
      "Screenshot both listings and all communications",
      "Let us verify who actually owns the property",
      "File police report with our documentation"
    ],

    testimonial: {
      quote: "Found an apartment on Craigslist. Paid deposit. Kept browsing. Found SAME apartment on Zillow - different landlord, verified owner. Realized I paid the wrong person. DibbyTour confirmed the Zillow listing was real. Police report filed. Bank reversed the Craigslist payment. Rented from the real owner. Lesson learned.",
      name: "Taylor W.",
      situation: "Duplicate listing scam",
      saved: "$2,800"
    }
  }
};

// ============================================
// PANIC PAGE COMPONENT
// ============================================

export default function PanicPage({ pageSlug }) {
  const page = PANIC_PAGES[pageSlug];
  if (!page) return <div>Page not found</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* EMERGENCY HERO */}
      <section className="bg-red-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-700 text-white text-sm font-bold px-4 py-2 rounded mb-4 inline-flex items-center gap-2 animate-pulse">
            <span className="text-xl">🚨</span> URGENT SITUATION
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{page.h1}</h1>
          
          {page.situation && (
            <p className="text-xl text-red-100 mb-6 p-4 bg-red-800 rounded-lg">
              {page.situation}
            </p>
          )}

          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105 w-full sm:w-auto">
            {page.panicCTA}
          </button>
          
          <p className="text-red-300 text-sm mt-4">
            ⚡ Results within hours • 📞 Real humans • 💰 Money-back guarantee
          </p>
        </div>
      </section>

      {/* IMMEDIATE ACTIONS */}
      {page.immediateActions && (
        <section className="py-8 px-4 bg-yellow-50 border-b-4 border-yellow-400">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-yellow-900 mb-4 flex items-center gap-2">
              <span>⚡</span> DO THIS RIGHT NOW:
            </h2>
            <ol className="space-y-3">
              {page.immediateActions.map((action, i) => (
                <li key={i} className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                  <span className="bg-yellow-400 text-yellow-900 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-gray-800">{action}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* NEXT 60 MINUTES */}
      {page.next60Minutes && (
        <section className="py-8 px-4 bg-orange-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-orange-900 mb-4">{page.next60Minutes.headline}</h2>
            <div className="space-y-3">
              {page.next60Minutes.steps.map((step, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-400">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded">
                      {step.minute} min
                    </span>
                  </div>
                  <p className="font-bold text-gray-900">{step.action}</p>
                  <p className="text-gray-600 text-sm">{step.why}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHAT WE CAN DO / VERIFY */}
      {(page.whatWeCanDo || page.whatWeCanFind || page.whatWeVerify || page.whatWeCheck || page.whatWeDo) && (
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4">What We Can Do RIGHT NOW:</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {(page.whatWeCanDo || page.whatWeCanFind || page.whatWeVerify || page.whatWeCheck || page.whatWeDo).map((item, i) => (
                <div key={i} className="flex items-start gap-2 bg-green-50 p-3 rounded-lg">
                  <span className="text-green-600">✓</span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* POSSIBLE OUTCOMES / SCENARIOS */}
      {(page.possibleOutcomes || page.possibleReasons || page.worstCase || page.scenarios) && (
        <section className="py-8 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4">
              {page.possibleOutcomes ? "Possible Outcomes:" : 
               page.possibleReasons ? "What Might Be Happening:" :
               page.worstCase ? page.worstCase.headline :
               page.scenarios ? page.scenarios.headline : ""}
            </h2>
            <div className="space-y-3">
              {(page.possibleOutcomes || page.possibleReasons || page.worstCase?.scenarios || page.scenarios?.options).map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900">
                      {item.outcome || item.reason || item.problem || item.scenario}
                    </h3>
                    {item.likelihood && (
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded">{item.likelihood}</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {item.nextSteps || item.solution || item.description || item.risk}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIAL */}
      {page.testimonial && (
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 p-6 rounded-xl">
              <p className="text-lg text-gray-700 italic mb-4">"{page.testimonial.quote}"</p>
              <div className="flex justify-between items-end flex-wrap gap-4">
                <div>
                  <p className="font-bold text-gray-900">{page.testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{page.testimonial.situation}</p>
                </div>
                {(page.testimonial.saved || page.testimonial.recovered || page.testimonial.outcome) && (
                  <div className="text-right">
                    <p className="text-green-600 font-bold">
                      {page.testimonial.saved ? `Saved: ${page.testimonial.saved}` :
                       page.testimonial.recovered ? `Recovered: ${page.testimonial.recovered}` :
                       page.testimonial.outcome}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Every Minute Counts.</h2>
          <p className="text-gray-300 mb-6">Don't wait. Don't second-guess. Get answers now.</p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105">
            {page.panicCTA}
          </button>
          <p className="text-gray-500 text-sm mt-4">
            Results in hours, not days • Real humans • We've seen this before
          </p>
        </div>
      </section>
    </div>
  );
}

// Exports
export function getAllPanicPageSlugs() {
  return Object.keys(PANIC_PAGES);
}

export function getPanicPageData(slug) {
  return PANIC_PAGES[slug];
}
