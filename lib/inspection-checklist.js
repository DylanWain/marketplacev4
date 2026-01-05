// 150+ Point Vehicle Inspection Checklist
// Based on Lemon Squad, Carfax, and professional pre-purchase inspection standards

export const CAR_INSPECTION_CHECKLIST = {
  title: "150-Point Used Car Inspection",
  description: "Professional-grade checklist based on industry standards",
  
  sections: [
    {
      id: "exterior",
      title: "Exterior Body & Paint",
      icon: "🚗",
      items: [
        { id: "ex1", text: "Check all body panels for dents, dings, or damage", critical: false },
        { id: "ex2", text: "Look for paint bubbling or peeling (indicates rust underneath)", critical: true },
        { id: "ex3", text: "Check for mismatched paint colors between panels", critical: true },
        { id: "ex4", text: "Look for orange peel texture differences (indicates repaint)", critical: true },
        { id: "ex5", text: "Inspect panel gaps - should be uniform on all sides", critical: true },
        { id: "ex6", text: "Check for overspray on rubber seals, trim, or glass", critical: true },
        { id: "ex7", text: "Look under hood and trunk for paint overspray", critical: true },
        { id: "ex8", text: "Check door jambs for color match and overspray", critical: true },
        { id: "ex9", text: "Inspect bumpers for cracks, scuffs, or repainting", critical: false },
        { id: "ex10", text: "Check all chrome/trim pieces are present and undamaged", critical: false },
        { id: "ex11", text: "Look for rust on wheel wells, rocker panels, and door bottoms", critical: true },
        { id: "ex12", text: "Check windshield for chips, cracks, or pitting", critical: false },
        { id: "ex13", text: "Inspect all other glass for damage", critical: false },
        { id: "ex14", text: "Check mirrors for damage and adjustment function", critical: false },
        { id: "ex15", text: "Verify antenna condition (if applicable)", critical: false },
      ]
    },
    {
      id: "tires",
      title: "Tires & Wheels",
      icon: "🛞",
      items: [
        { id: "ti1", text: "Check tire tread depth (use penny test - 2/32\" minimum)", critical: true },
        { id: "ti2", text: "Look for uneven tire wear (indicates alignment issues)", critical: true },
        { id: "ti3", text: "Check for bulges, cracks, or sidewall damage", critical: true },
        { id: "ti4", text: "Verify all 4 tires are same brand and size", critical: false },
        { id: "ti5", text: "Check tire age (DOT code - older than 6 years = replace)", critical: true },
        { id: "ti6", text: "Inspect spare tire condition and presence", critical: false },
        { id: "ti7", text: "Check wheels for curb damage, bends, or cracks", critical: false },
        { id: "ti8", text: "Verify all lug nuts present and properly torqued", critical: true },
        { id: "ti9", text: "Check wheel bearing noise (grab tire at 12/6, rock back and forth)", critical: true },
        { id: "ti10", text: "Inspect tire pressure monitoring system (TPMS) functionality", critical: false },
      ]
    },
    {
      id: "engine",
      title: "Engine Compartment",
      icon: "⚙️",
      items: [
        { id: "en1", text: "Check oil level and condition (dark = old, milky = head gasket)", critical: true },
        { id: "en2", text: "Check coolant level and condition (should be clean, proper color)", critical: true },
        { id: "en3", text: "Check brake fluid level and color (should be clear, not dark)", critical: true },
        { id: "en4", text: "Check power steering fluid level", critical: false },
        { id: "en5", text: "Check transmission fluid (if dipstick available)", critical: true },
        { id: "en6", text: "Look for any fluid leaks on engine or ground", critical: true },
        { id: "en7", text: "Inspect belts for cracks, fraying, or glazing", critical: true },
        { id: "en8", text: "Check hoses for bulges, cracks, or soft spots", critical: true },
        { id: "en9", text: "Look for corrosion on battery terminals", critical: false },
        { id: "en10", text: "Check battery age (3-5 years typical lifespan)", critical: false },
        { id: "en11", text: "Inspect air filter condition", critical: false },
        { id: "en12", text: "Look for aftermarket modifications or missing parts", critical: false },
        { id: "en13", text: "Check for oil residue on engine (indicates leaks)", critical: true },
        { id: "en14", text: "Inspect wiring for damage or rodent chewing", critical: false },
        { id: "en15", text: "Look at engine mounts for cracks or deterioration", critical: false },
      ]
    },
    {
      id: "undercarriage",
      title: "Undercarriage & Frame",
      icon: "🔧",
      items: [
        { id: "un1", text: "Check frame rails for rust, damage, or repair welds", critical: true },
        { id: "un2", text: "Look for fresh undercoating (may hide damage)", critical: true },
        { id: "un3", text: "Inspect exhaust system for rust holes or damage", critical: false },
        { id: "un4", text: "Check for fluid leaks from underneath", critical: true },
        { id: "un5", text: "Inspect CV boots/axle boots for tears", critical: true },
        { id: "un6", text: "Check suspension components for damage or wear", critical: true },
        { id: "un7", text: "Look for accident damage or bent components", critical: true },
        { id: "un8", text: "Check fuel tank and lines for damage", critical: true },
        { id: "un9", text: "Inspect brake lines for rust or damage", critical: true },
        { id: "un10", text: "Look for flood damage (mud/debris in hidden areas)", critical: true },
      ]
    },
    {
      id: "interior",
      title: "Interior Condition",
      icon: "💺",
      items: [
        { id: "in1", text: "Check seats for wear, tears, or stains", critical: false },
        { id: "in2", text: "Inspect carpet and floor mats (pull up to check for moisture)", critical: true },
        { id: "in3", text: "Check headliner condition", critical: false },
        { id: "in4", text: "Look for water stains or mold smell (flood damage)", critical: true },
        { id: "in5", text: "Check door panels for damage", critical: false },
        { id: "in6", text: "Inspect dashboard for cracks or damage", critical: false },
        { id: "in7", text: "Check steering wheel condition and adjustment", critical: false },
        { id: "in8", text: "Test all seat adjustments (manual and power)", critical: false },
        { id: "in9", text: "Check seatbelts for wear and retraction", critical: true },
        { id: "in10", text: "Inspect pedal wear (should match mileage)", critical: false },
        { id: "in11", text: "Check trunk/cargo area condition", critical: false },
        { id: "in12", text: "Look for rust or moisture in spare tire well", critical: true },
        { id: "in13", text: "Verify jack and tools present", critical: false },
        { id: "in14", text: "Check sun visors and vanity mirrors", critical: false },
        { id: "in15", text: "Smell for smoke, mold, or pet odors", critical: false },
      ]
    },
    {
      id: "electrical",
      title: "Electrical Systems",
      icon: "⚡",
      items: [
        { id: "el1", text: "Test all exterior lights (headlights, high beams, fogs)", critical: true },
        { id: "el2", text: "Test brake lights and turn signals", critical: true },
        { id: "el3", text: "Test hazard lights", critical: true },
        { id: "el4", text: "Test reverse lights", critical: false },
        { id: "el5", text: "Test interior lights and dome lights", critical: false },
        { id: "el6", text: "Test dashboard lights (all should light on start)", critical: true },
        { id: "el7", text: "Check for warning lights that stay on", critical: true },
        { id: "el8", text: "Test horn", critical: false },
        { id: "el9", text: "Test windshield wipers (all speeds)", critical: false },
        { id: "el10", text: "Test windshield washer", critical: false },
        { id: "el11", text: "Test power windows (all should operate)", critical: false },
        { id: "el12", text: "Test power locks", critical: false },
        { id: "el13", text: "Test power mirrors", critical: false },
        { id: "el14", text: "Test radio/infotainment system", critical: false },
        { id: "el15", text: "Test backup camera (if equipped)", critical: false },
        { id: "el16", text: "Test USB/aux ports", critical: false },
        { id: "el17", text: "Test sunroof/moonroof (if equipped)", critical: false },
        { id: "el18", text: "Test heated/cooled seats (if equipped)", critical: false },
      ]
    },
    {
      id: "hvac",
      title: "Climate Control",
      icon: "❄️",
      items: [
        { id: "hv1", text: "Test A/C - should blow cold within 2 minutes", critical: true },
        { id: "hv2", text: "Test heater - should blow hot", critical: false },
        { id: "hv3", text: "Test all fan speeds", critical: false },
        { id: "hv4", text: "Test defrost (front and rear)", critical: false },
        { id: "hv5", text: "Check for musty smell (indicates mold in system)", critical: false },
        { id: "hv6", text: "Test temperature controls (hot/cold blend)", critical: false },
        { id: "hv7", text: "Check cabin air filter if accessible", critical: false },
      ]
    },
    {
      id: "brakes",
      title: "Braking System",
      icon: "🛑",
      items: [
        { id: "br1", text: "Check brake pedal feel (should be firm, not spongy)", critical: true },
        { id: "br2", text: "Listen for squealing or grinding when braking", critical: true },
        { id: "br3", text: "Check if car pulls to one side when braking", critical: true },
        { id: "br4", text: "Test parking/emergency brake", critical: true },
        { id: "br5", text: "Look at brake rotors through wheels (check for grooves)", critical: true },
        { id: "br6", text: "Check brake pad thickness if visible", critical: true },
        { id: "br7", text: "Test ABS - should pulse when triggered", critical: false },
        { id: "br8", text: "Check brake fluid color (should be clear, not dark)", critical: true },
      ]
    },
    {
      id: "steering",
      title: "Steering & Suspension",
      icon: "🎯",
      items: [
        { id: "st1", text: "Check power steering - should be smooth and quiet", critical: true },
        { id: "st2", text: "Check for excessive play in steering wheel", critical: true },
        { id: "st3", text: "Listen for clunks or knocks when turning", critical: true },
        { id: "st4", text: "Check if car pulls to one side when driving straight", critical: true },
        { id: "st5", text: "Test over bumps - listen for clunks or rattles", critical: true },
        { id: "st6", text: "Check shocks - car should not bounce more than twice", critical: true },
        { id: "st7", text: "Look for leaking shocks/struts", critical: true },
        { id: "st8", text: "Check for uneven tire wear (indicates alignment issue)", critical: true },
      ]
    },
    {
      id: "transmission",
      title: "Transmission & Drivetrain",
      icon: "🔄",
      items: [
        { id: "tr1", text: "Automatic: Check for smooth shifts (no jerking or hesitation)", critical: true },
        { id: "tr2", text: "Automatic: Test all gears including reverse", critical: true },
        { id: "tr3", text: "Manual: Check clutch engagement point and feel", critical: true },
        { id: "tr4", text: "Manual: Test all gears - should shift smoothly", critical: true },
        { id: "tr5", text: "Listen for whining or grinding from transmission", critical: true },
        { id: "tr6", text: "Check for transmission fluid leaks", critical: true },
        { id: "tr7", text: "AWD/4WD: Test engagement if possible", critical: false },
        { id: "tr8", text: "Check CV joints - listen for clicking when turning", critical: true },
      ]
    },
    {
      id: "startup",
      title: "Cold Start Test",
      icon: "🚀",
      items: [
        { id: "cs1", text: "Engine should start immediately without extended cranking", critical: true },
        { id: "cs2", text: "Check for rough idle when cold", critical: true },
        { id: "cs3", text: "Watch for excessive exhaust smoke on startup", critical: true },
        { id: "cs4", text: "Blue smoke = burning oil", critical: true },
        { id: "cs5", text: "White smoke (thick) = coolant leak / head gasket", critical: true },
        { id: "cs6", text: "Black smoke = running rich (fuel issue)", critical: true },
        { id: "cs7", text: "Listen for unusual engine noises (ticking, knocking)", critical: true },
        { id: "cs8", text: "Check all warning lights clear after startup", critical: true },
      ]
    },
    {
      id: "roadtest",
      title: "Road Test (15+ min drive)",
      icon: "🛣️",
      items: [
        { id: "rt1", text: "Accelerate firmly - check for hesitation or misfires", critical: true },
        { id: "rt2", text: "Test highway speeds if possible", critical: true },
        { id: "rt3", text: "Check for vibrations at various speeds", critical: true },
        { id: "rt4", text: "Listen for wind noise (indicates poor seals)", critical: false },
        { id: "rt5", text: "Test brakes at speed - should stop straight", critical: true },
        { id: "rt6", text: "Test over railroad tracks or bumps", critical: false },
        { id: "rt7", text: "Check temperature gauge stays normal", critical: true },
        { id: "rt8", text: "Park on hill - test parking brake holds", critical: true },
        { id: "rt9", text: "After drive, check for new leaks under car", critical: true },
        { id: "rt10", text: "Smell for burning oil or coolant after drive", critical: true },
      ]
    },
    {
      id: "documents",
      title: "Documentation & History",
      icon: "📋",
      items: [
        { id: "dc1", text: "Verify VIN matches title, registration, and dashboard", critical: true },
        { id: "dc2", text: "Check title for salvage, rebuilt, or flood branding", critical: true },
        { id: "dc3", text: "Verify odometer reading matches title", critical: true },
        { id: "dc4", text: "Run Carfax or AutoCheck report", critical: true },
        { id: "dc5", text: "Ask for service records", critical: false },
        { id: "dc6", text: "Verify seller name matches title", critical: true },
        { id: "dc7", text: "Check for liens on title", critical: true },
        { id: "dc8", text: "Verify registration is current", critical: false },
        { id: "dc9", text: "Check for open recalls", critical: true },
        { id: "dc10", text: "Get seller's ID and contact information", critical: true },
      ]
    },
    {
      id: "scam",
      title: "Scam Red Flags",
      icon: "🚨",
      items: [
        { id: "sc1", text: "Price too good to be true", critical: true },
        { id: "sc2", text: "Seller refuses to meet in person", critical: true },
        { id: "sc3", text: "Seller wants payment before you see the car", critical: true },
        { id: "sc4", text: "Seller wants wire transfer, gift cards, or crypto", critical: true },
        { id: "sc5", text: "Story about being out of town, military, etc.", critical: true },
        { id: "sc6", text: "Won't allow pre-purchase inspection", critical: true },
        { id: "sc7", text: "Pressuring for quick decision", critical: true },
        { id: "sc8", text: "VIN doesn't match listing details", critical: true },
        { id: "sc9", text: "Reverse image search shows photos used elsewhere", critical: true },
        { id: "sc10", text: "Listing appears on multiple platforms with different prices", critical: true },
      ]
    },
  ]
};

export const APARTMENT_INSPECTION_CHECKLIST = {
  title: "Apartment Safety Inspection",
  description: "Comprehensive rental verification checklist",
  
  sections: [
    {
      id: "landlord",
      title: "Landlord Verification",
      icon: "👤",
      items: [
        { id: "ll1", text: "Verify landlord owns the property (county records)", critical: true },
        { id: "ll2", text: "Search landlord name + 'scam' or 'complaints'", critical: true },
        { id: "ll3", text: "Check if landlord's phone number is legitimate", critical: true },
        { id: "ll4", text: "Verify landlord's email domain (not free email for management co)", critical: false },
        { id: "ll5", text: "Ask for landlord's ID when signing lease", critical: true },
        { id: "ll6", text: "Check Better Business Bureau for property manager", critical: false },
      ]
    },
    {
      id: "listing",
      title: "Listing Verification",
      icon: "📝",
      items: [
        { id: "ls1", text: "Reverse image search listing photos", critical: true },
        { id: "ls2", text: "Compare price to similar rentals in area", critical: true },
        { id: "ls3", text: "Search address on Google Maps (Street View)", critical: true },
        { id: "ls4", text: "Check if property is listed elsewhere at different price", critical: true },
        { id: "ls5", text: "Verify address exists and matches photos", critical: true },
        { id: "ls6", text: "Look for watermarks or stock photo indicators", critical: true },
      ]
    },
    {
      id: "property",
      title: "Property Condition",
      icon: "🏠",
      items: [
        { id: "pr1", text: "Check all faucets for water pressure and hot water", critical: true },
        { id: "pr2", text: "Flush all toilets - check for leaks", critical: true },
        { id: "pr3", text: "Test all electrical outlets", critical: true },
        { id: "pr4", text: "Check for signs of water damage (stains, bubbling paint)", critical: true },
        { id: "pr5", text: "Look for mold in bathroom and under sinks", critical: true },
        { id: "pr6", text: "Test all windows open and close properly", critical: false },
        { id: "pr7", text: "Check window locks work", critical: true },
        { id: "pr8", text: "Inspect door locks and deadbolts", critical: true },
        { id: "pr9", text: "Test smoke and CO detectors", critical: true },
        { id: "pr10", text: "Check HVAC works (heat and cooling)", critical: true },
        { id: "pr11", text: "Look for pest evidence (droppings, damage)", critical: true },
        { id: "pr12", text: "Check appliances function (stove, fridge, dishwasher)", critical: true },
        { id: "pr13", text: "Test garbage disposal if present", critical: false },
        { id: "pr14", text: "Check washer/dryer connections if applicable", critical: false },
        { id: "pr15", text: "Look at condition of floors (damage, stains)", critical: false },
      ]
    },
    {
      id: "safety",
      title: "Safety & Security",
      icon: "🔒",
      items: [
        { id: "sf1", text: "Check building entry security", critical: true },
        { id: "sf2", text: "Look for security cameras in common areas", critical: false },
        { id: "sf3", text: "Check fire escape access and condition", critical: true },
        { id: "sf4", text: "Verify fire extinguisher present and current", critical: true },
        { id: "sf5", text: "Check parking area lighting", critical: false },
        { id: "sf6", text: "Research neighborhood crime rates", critical: true },
        { id: "sf7", text: "Check for adequate exterior lighting", critical: false },
        { id: "sf8", text: "Verify mail security", critical: false },
      ]
    },
    {
      id: "scam",
      title: "Rental Scam Red Flags",
      icon: "🚨",
      items: [
        { id: "rs1", text: "Landlord won't meet in person or show property", critical: true },
        { id: "rs2", text: "Asked to pay deposit before seeing inside", critical: true },
        { id: "rs3", text: "Asked to wire money or pay with gift cards", critical: true },
        { id: "rs4", text: "Price significantly below market rate", critical: true },
        { id: "rs5", text: "Landlord claims to be out of town/country", critical: true },
        { id: "rs6", text: "Pressure to sign immediately", critical: true },
        { id: "rs7", text: "Refuses to provide lease before payment", critical: true },
        { id: "rs8", text: "Asking for unusual personal information", critical: true },
        { id: "rs9", text: "Keys sent before meeting or payment clears", critical: true },
        { id: "rs10", text: "Property appears vacant/abandoned", critical: true },
      ]
    },
  ]
};

// Calculate score based on checked items
export function calculateScore(checklist, checkedItems) {
  let total = 0;
  let criticalTotal = 0;
  let criticalPassed = 0;
  let passed = 0;
  
  checklist.sections.forEach(section => {
    section.items.forEach(item => {
      total++;
      if (item.critical) criticalTotal++;
      
      if (checkedItems[item.id]) {
        passed++;
        if (item.critical) criticalPassed++;
      }
    });
  });
  
  // Weight critical items more heavily
  const criticalWeight = 0.7;
  const regularWeight = 0.3;
  
  const criticalScore = criticalTotal > 0 ? (criticalPassed / criticalTotal) * 100 : 100;
  const regularScore = total > 0 ? (passed / total) * 100 : 100;
  
  const finalScore = Math.round(criticalScore * criticalWeight + regularScore * regularWeight);
  
  return {
    score: finalScore,
    passed,
    total,
    criticalPassed,
    criticalTotal,
    verdict: finalScore >= 80 ? 'LIKELY SAFE' : finalScore >= 50 ? 'PROCEED WITH CAUTION' : 'HIGH RISK',
  };
}
