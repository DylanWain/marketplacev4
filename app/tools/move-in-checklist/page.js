'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { Check, Download, Printer, Camera, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const defaultRooms = [
  {
    name: 'Living Room',
    items: [
      { name: 'Walls', conditions: ['Good', 'Scuff marks', 'Holes', 'Cracks', 'Water damage', 'Peeling paint'] },
      { name: 'Ceiling', conditions: ['Good', 'Stains', 'Cracks', 'Water damage', 'Peeling'] },
      { name: 'Flooring', conditions: ['Good', 'Scratches', 'Stains', 'Damage', 'Worn areas'] },
      { name: 'Windows', conditions: ['Good', 'Cracked', 'Won\'t open', 'Won\'t close', 'Broken lock', 'Screen damage'] },
      { name: 'Window Treatments', conditions: ['Good', 'Missing', 'Broken', 'Stained'] },
      { name: 'Light Fixtures', conditions: ['Good', 'Not working', 'Missing bulbs', 'Damaged'] },
      { name: 'Electrical Outlets', conditions: ['Good', 'Not working', 'Loose', 'Missing covers'] },
      { name: 'Light Switches', conditions: ['Good', 'Not working', 'Loose'] },
      { name: 'Doors', conditions: ['Good', 'Won\'t close', 'Damaged', 'Missing hardware'] },
      { name: 'Closet', conditions: ['Good', 'Door damage', 'Shelf damage', 'Rod missing'] },
      { name: 'Smoke Detector', conditions: ['Good', 'Missing', 'Not working', 'Needs battery'] },
      { name: 'Thermostat', conditions: ['Good', 'Not working', 'Missing'] },
    ]
  },
  {
    name: 'Kitchen',
    items: [
      { name: 'Walls', conditions: ['Good', 'Scuff marks', 'Holes', 'Grease stains', 'Water damage'] },
      { name: 'Ceiling', conditions: ['Good', 'Stains', 'Cracks', 'Water damage'] },
      { name: 'Flooring', conditions: ['Good', 'Scratches', 'Stains', 'Damage', 'Worn areas'] },
      { name: 'Countertops', conditions: ['Good', 'Scratches', 'Burns', 'Chips', 'Stains'] },
      { name: 'Cabinets', conditions: ['Good', 'Door damage', 'Missing hardware', 'Shelves broken'] },
      { name: 'Drawers', conditions: ['Good', 'Won\'t open', 'Won\'t close', 'Off track'] },
      { name: 'Sink', conditions: ['Good', 'Stained', 'Chips', 'Slow drain', 'Leaking'] },
      { name: 'Faucet', conditions: ['Good', 'Leaking', 'Low pressure', 'Not working'] },
      { name: 'Garbage Disposal', conditions: ['Good', 'Not working', 'Jammed', 'N/A'] },
      { name: 'Dishwasher', conditions: ['Good', 'Not working', 'Leaking', 'N/A'] },
      { name: 'Refrigerator', conditions: ['Good', 'Not cooling', 'Ice maker broken', 'Dents', 'Shelves broken'] },
      { name: 'Freezer', conditions: ['Good', 'Not freezing', 'Ice buildup', 'Door seal worn'] },
      { name: 'Stove/Range', conditions: ['Good', 'Burners not working', 'Oven not working', 'Knobs missing'] },
      { name: 'Range Hood/Vent', conditions: ['Good', 'Not working', 'Light out', 'Dirty'] },
      { name: 'Microwave', conditions: ['Good', 'Not working', 'Light out', 'N/A'] },
      { name: 'Windows', conditions: ['Good', 'Cracked', 'Won\'t open', 'Won\'t close'] },
      { name: 'Light Fixtures', conditions: ['Good', 'Not working', 'Missing bulbs'] },
      { name: 'Electrical Outlets', conditions: ['Good', 'Not working', 'GFCI not working'] },
    ]
  },
  {
    name: 'Bathroom',
    items: [
      { name: 'Walls', conditions: ['Good', 'Holes', 'Mold/Mildew', 'Peeling paint', 'Water damage'] },
      { name: 'Ceiling', conditions: ['Good', 'Mold/Mildew', 'Peeling', 'Water damage'] },
      { name: 'Flooring', conditions: ['Good', 'Stains', 'Cracked tiles', 'Water damage', 'Grout issues'] },
      { name: 'Toilet', conditions: ['Good', 'Runs constantly', 'Won\'t flush', 'Leaking', 'Loose', 'Seat damaged'] },
      { name: 'Sink', conditions: ['Good', 'Stained', 'Chips', 'Slow drain', 'Leaking'] },
      { name: 'Sink Faucet', conditions: ['Good', 'Leaking', 'Low pressure', 'Not working'] },
      { name: 'Bathtub/Shower', conditions: ['Good', 'Stained', 'Chips', 'Slow drain', 'Mold'] },
      { name: 'Shower Faucet', conditions: ['Good', 'Leaking', 'Low pressure', 'Not working'] },
      { name: 'Showerhead', conditions: ['Good', 'Leaking', 'Low pressure', 'Missing'] },
      { name: 'Shower Door/Curtain Rod', conditions: ['Good', 'Damaged', 'Missing', 'Off track'] },
      { name: 'Tub/Shower Caulking', conditions: ['Good', 'Cracked', 'Missing', 'Moldy'] },
      { name: 'Medicine Cabinet/Mirror', conditions: ['Good', 'Cracked', 'Door won\'t close', 'Missing'] },
      { name: 'Towel Bars/Hooks', conditions: ['Good', 'Loose', 'Missing'] },
      { name: 'Toilet Paper Holder', conditions: ['Good', 'Loose', 'Missing'] },
      { name: 'Exhaust Fan', conditions: ['Good', 'Not working', 'Noisy', 'Missing'] },
      { name: 'Light Fixtures', conditions: ['Good', 'Not working', 'Missing bulbs'] },
      { name: 'Electrical Outlets', conditions: ['Good', 'Not working', 'GFCI not working'] },
      { name: 'Door', conditions: ['Good', 'Won\'t close', 'Lock broken'] },
    ]
  },
  {
    name: 'Bedroom',
    items: [
      { name: 'Walls', conditions: ['Good', 'Scuff marks', 'Holes', 'Cracks', 'Water damage'] },
      { name: 'Ceiling', conditions: ['Good', 'Stains', 'Cracks', 'Water damage'] },
      { name: 'Flooring', conditions: ['Good', 'Scratches', 'Stains', 'Damage', 'Worn'] },
      { name: 'Windows', conditions: ['Good', 'Cracked', 'Won\'t open', 'Won\'t close', 'Lock broken'] },
      { name: 'Window Treatments', conditions: ['Good', 'Missing', 'Broken', 'Stained'] },
      { name: 'Closet Door', conditions: ['Good', 'Off track', 'Won\'t close', 'Missing'] },
      { name: 'Closet Interior', conditions: ['Good', 'Shelf damage', 'Rod missing', 'Light out'] },
      { name: 'Light Fixtures', conditions: ['Good', 'Not working', 'Missing bulbs'] },
      { name: 'Ceiling Fan', conditions: ['Good', 'Not working', 'Noisy', 'Wobbles', 'N/A'] },
      { name: 'Electrical Outlets', conditions: ['Good', 'Not working', 'Loose'] },
      { name: 'Light Switches', conditions: ['Good', 'Not working'] },
      { name: 'Door', conditions: ['Good', 'Won\'t close', 'Lock broken', 'Damage'] },
      { name: 'Smoke Detector', conditions: ['Good', 'Missing', 'Not working'] },
    ]
  },
  {
    name: 'Entry/Hallway',
    items: [
      { name: 'Front Door', conditions: ['Good', 'Won\'t lock', 'Damage', 'Weather stripping worn'] },
      { name: 'Deadbolt', conditions: ['Good', 'Not working', 'Missing'] },
      { name: 'Door Knob/Handle', conditions: ['Good', 'Loose', 'Not working'] },
      { name: 'Peephole', conditions: ['Good', 'Missing', 'Blocked'] },
      { name: 'Walls', conditions: ['Good', 'Scuff marks', 'Holes'] },
      { name: 'Flooring', conditions: ['Good', 'Scratches', 'Stains', 'Damage'] },
      { name: 'Light Fixtures', conditions: ['Good', 'Not working', 'Missing bulbs'] },
      { name: 'Coat Closet', conditions: ['Good', 'Door damage', 'Rod missing', 'N/A'] },
      { name: 'Doorbell/Intercom', conditions: ['Good', 'Not working', 'N/A'] },
    ]
  },
  {
    name: 'Laundry/Utility',
    items: [
      { name: 'Washer', conditions: ['Good', 'Not working', 'Leaking', 'Noisy', 'N/A'] },
      { name: 'Dryer', conditions: ['Good', 'Not working', 'Not heating', 'Noisy', 'N/A'] },
      { name: 'Washer/Dryer Hookups', conditions: ['Good', 'Leaking', 'N/A'] },
      { name: 'Water Heater', conditions: ['Good', 'Leaking', 'Rusty', 'N/A'] },
      { name: 'HVAC Unit', conditions: ['Good', 'Not working', 'Noisy', 'N/A'] },
      { name: 'Air Filter', conditions: ['Good', 'Dirty', 'Missing'] },
      { name: 'Dryer Vent', conditions: ['Good', 'Clogged', 'Disconnected'] },
    ]
  },
  {
    name: 'Exterior/Other',
    items: [
      { name: 'Patio/Balcony', conditions: ['Good', 'Damage', 'Railing loose', 'N/A'] },
      { name: 'Patio Door', conditions: ['Good', 'Won\'t lock', 'Off track', 'N/A'] },
      { name: 'Garage', conditions: ['Good', 'Door not working', 'Opener broken', 'N/A'] },
      { name: 'Parking Space', conditions: ['Good', 'Cracked', 'Stained', 'N/A'] },
      { name: 'Storage Unit', conditions: ['Good', 'Lock broken', 'N/A'] },
      { name: 'Mailbox', conditions: ['Good', 'Missing key', 'Lock broken'] },
      { name: 'Keys Received', conditions: ['All received', 'Missing keys'] },
    ]
  }
];

export default function MoveInChecklist() {
  const [rooms, setRooms] = useState(defaultRooms.map(room => ({
    ...room,
    expanded: false,
    items: room.items.map(item => ({
      ...item,
      selectedCondition: '',
      notes: '',
      photos: 0
    }))
  })));
  const [propertyAddress, setPropertyAddress] = useState('');
  const [moveInDate, setMoveInDate] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [landlordName, setLandlordName] = useState('');
  const printRef = useRef();

  const toggleRoom = (roomIndex) => {
    setRooms(prev => prev.map((room, i) => 
      i === roomIndex ? { ...room, expanded: !room.expanded } : room
    ));
  };

  const updateItem = (roomIndex, itemIndex, field, value) => {
    setRooms(prev => prev.map((room, ri) => 
      ri === roomIndex 
        ? {
            ...room,
            items: room.items.map((item, ii) => 
              ii === itemIndex ? { ...item, [field]: value } : item
            )
          }
        : room
    ));
  };

  const getCompletionStats = () => {
    let total = 0;
    let completed = 0;
    let issues = 0;
    
    rooms.forEach(room => {
      room.items.forEach(item => {
        total++;
        if (item.selectedCondition) {
          completed++;
          if (item.selectedCondition !== 'Good' && item.selectedCondition !== 'N/A') {
            issues++;
          }
        }
      });
    });
    
    return { total, completed, issues, percentage: Math.round((completed / total) * 100) };
  };

  const stats = getCompletionStats();

  const handlePrint = () => {
    window.print();
  };

  const generatePDF = () => {
    // In a real implementation, this would generate a PDF
    alert('PDF generation would be implemented here. For now, use the Print button and save as PDF.');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 print:hidden">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center font-bold text-sm">D</div>
            <span className="font-bold text-lg">DibbyTour</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/tools" className="text-zinc-400 hover:text-white text-sm">All Tools</Link>
            <Link href="/book" className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 text-sm">Book Inspection</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12 print:mb-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 print:text-2xl">
            Move-In Inspection Checklist
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto print:text-sm print:text-black">
            Document your apartment's condition at move-in. Protect your security deposit 
            by creating a thorough record of existing issues.
          </p>
        </div>

        {/* Property Info */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8 print:bg-white print:border-black">
          <h2 className="text-lg font-semibold mb-4 print:text-black">Property Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1 print:text-black">Property Address</label>
              <input
                type="text"
                value={propertyAddress}
                onChange={(e) => setPropertyAddress(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg print:bg-white print:border-black print:text-black"
                placeholder="123 Main St, Apt 4B"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1 print:text-black">Move-In Date</label>
              <input
                type="date"
                value={moveInDate}
                onChange={(e) => setMoveInDate(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg print:bg-white print:border-black print:text-black"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1 print:text-black">Tenant Name</label>
              <input
                type="text"
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg print:bg-white print:border-black print:text-black"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1 print:text-black">Landlord/Manager Name</label>
              <input
                type="text"
                value={landlordName}
                onChange={(e) => setLandlordName(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg print:bg-white print:border-black print:text-black"
                placeholder="Landlord or property manager"
              />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8 print:hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Completion Progress</span>
            <span className="text-orange-500 font-bold">{stats.percentage}%</span>
          </div>
          <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300"
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-sm text-zinc-400">
            <span>{stats.completed} of {stats.total} items checked</span>
            <span className="text-red-400">{stats.issues} issues found</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700"
          >
            <Printer className="w-4 h-4" />
            Print Checklist
          </button>
          <button
            onClick={generatePDF}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>

        {/* Room Checklists */}
        <div className="space-y-4" ref={printRef}>
          {rooms.map((room, roomIndex) => (
            <div key={room.name} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden print:bg-white print:border-black print:mb-4">
              <button
                onClick={() => toggleRoom(roomIndex)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-zinc-800/50 print:hover:bg-white"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl font-semibold print:text-black">{room.name}</span>
                  <span className="text-sm text-zinc-400 print:text-gray-600">
                    {room.items.filter(i => i.selectedCondition).length}/{room.items.length} checked
                  </span>
                </div>
                {room.expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              
              {(room.expanded || true) && ( // Always show in print
                <div className={`border-t border-zinc-800 print:border-black ${room.expanded ? '' : 'hidden print:block'}`}>
                  {room.items.map((item, itemIndex) => (
                    <div 
                      key={item.name} 
                      className="px-6 py-3 border-b border-zinc-800/50 last:border-b-0 print:border-gray-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <span className="font-medium w-48 print:text-black">{item.name}</span>
                        
                        <select
                          value={item.selectedCondition}
                          onChange={(e) => updateItem(roomIndex, itemIndex, 'selectedCondition', e.target.value)}
                          className={`px-3 py-1.5 rounded-lg text-sm print:border print:border-black ${
                            !item.selectedCondition ? 'bg-zinc-800 text-zinc-400' :
                            item.selectedCondition === 'Good' ? 'bg-green-500/20 text-green-400 print:bg-white print:text-black' :
                            item.selectedCondition === 'N/A' ? 'bg-zinc-700 text-zinc-300 print:bg-white print:text-black' :
                            'bg-red-500/20 text-red-400 print:bg-white print:text-black'
                          }`}
                        >
                          <option value="">Select condition</option>
                          {item.conditions.map(condition => (
                            <option key={condition} value={condition}>{condition}</option>
                          ))}
                        </select>
                        
                        <input
                          type="text"
                          value={item.notes}
                          onChange={(e) => updateItem(roomIndex, itemIndex, 'notes', e.target.value)}
                          placeholder="Notes..."
                          className="flex-1 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm print:bg-white print:border-black print:text-black"
                        />
                        
                        <div className="flex items-center gap-2 print:hidden">
                          <Camera className="w-4 h-4 text-zinc-500" />
                          <input
                            type="number"
                            min="0"
                            value={item.photos || ''}
                            onChange={(e) => updateItem(roomIndex, itemIndex, 'photos', parseInt(e.target.value) || 0)}
                            placeholder="0"
                            className="w-16 px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-sm text-center"
                          />
                          <span className="text-xs text-zinc-500">photos</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Signature Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mt-8 print:bg-white print:border-black">
          <h2 className="text-lg font-semibold mb-4 print:text-black">Signatures</h2>
          <p className="text-sm text-zinc-400 mb-6 print:text-gray-600">
            Both parties should sign and date this checklist. Each party keeps a copy.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-zinc-400 mb-2 print:text-black">Tenant Signature:</p>
              <div className="h-16 border-b-2 border-zinc-700 print:border-black"></div>
              <p className="text-sm text-zinc-500 mt-2 print:text-gray-600">Date: ________________</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-2 print:text-black">Landlord/Manager Signature:</p>
              <div className="h-16 border-b-2 border-zinc-700 print:border-black"></div>
              <p className="text-sm text-zinc-500 mt-2 print:text-gray-600">Date: ________________</p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <section className="mt-12 print:hidden">
          <h2 className="text-2xl font-bold mb-6">Move-In Inspection Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="font-semibold mb-2">📸 Take Photos of Everything</h3>
              <p className="text-sm text-zinc-400">Document every issue with timestamped photos. Email them to yourself and your landlord for proof.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="font-semibold mb-2">🔦 Check in Good Lighting</h3>
              <p className="text-sm text-zinc-400">Do your inspection during daylight. Bring a flashlight for closets and under-sink areas.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="font-semibold mb-2">💧 Test All Fixtures</h3>
              <p className="text-sm text-zinc-400">Run every faucet, flush every toilet, test every outlet. Don't assume anything works.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="font-semibold mb-2">📝 Get Everything in Writing</h3>
              <p className="text-sm text-zinc-400">Submit your checklist in writing within 3-7 days. Keep copies of everything.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-8 print:hidden">
          <h2 className="text-2xl font-bold mb-4">Can't Do the Inspection Yourself?</h2>
          <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
            Let a professional DibbyTour inspector document your apartment before you move in. 
            We'll create a comprehensive report with 50+ photos you can use to protect your deposit.
          </p>
          <Link href="/book" className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600">
            Book Move-In Inspection →
          </Link>
        </section>
      </main>
    </div>
  );
}

