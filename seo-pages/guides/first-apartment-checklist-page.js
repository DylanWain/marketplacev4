'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

// Complete checklist data - 150+ items with prices
const checklistData = {
  kitchen: {
    name: 'Kitchen & Dining',
    icon: '🍳',
    items: [
      // Cookware
      { id: 'k1', name: 'Pots and Pans Set', essential: true, lowPrice: 40, midPrice: 80, highPrice: 150 },
      { id: 'k2', name: 'Non-Stick Skillet', essential: true, lowPrice: 15, midPrice: 30, highPrice: 60 },
      { id: 'k3', name: 'Baking Sheet', essential: true, lowPrice: 10, midPrice: 20, highPrice: 40 },
      { id: 'k4', name: 'Casserole Dish', essential: false, lowPrice: 15, midPrice: 30, highPrice: 50 },
      { id: 'k5', name: 'Mixing Bowls Set', essential: true, lowPrice: 12, midPrice: 25, highPrice: 45 },
      { id: 'k6', name: 'Colander/Strainer', essential: true, lowPrice: 8, midPrice: 15, highPrice: 25 },
      { id: 'k7', name: 'Cutting Boards (2-3)', essential: true, lowPrice: 10, midPrice: 20, highPrice: 40 },
      // Utensils
      { id: 'k8', name: 'Knife Set', essential: true, lowPrice: 20, midPrice: 50, highPrice: 120 },
      { id: 'k9', name: 'Cooking Utensil Set', essential: true, lowPrice: 15, midPrice: 30, highPrice: 50 },
      { id: 'k10', name: 'Measuring Cups & Spoons', essential: true, lowPrice: 8, midPrice: 15, highPrice: 25 },
      { id: 'k11', name: 'Can Opener', essential: true, lowPrice: 5, midPrice: 12, highPrice: 20 },
      { id: 'k12', name: 'Bottle/Wine Opener', essential: false, lowPrice: 5, midPrice: 15, highPrice: 30 },
      { id: 'k13', name: 'Kitchen Scissors', essential: false, lowPrice: 5, midPrice: 12, highPrice: 25 },
      { id: 'k14', name: 'Vegetable Peeler', essential: false, lowPrice: 3, midPrice: 8, highPrice: 15 },
      { id: 'k15', name: 'Grater', essential: false, lowPrice: 5, midPrice: 12, highPrice: 25 },
      { id: 'k16', name: 'Whisk', essential: false, lowPrice: 4, midPrice: 10, highPrice: 18 },
      { id: 'k17', name: 'Tongs', essential: true, lowPrice: 5, midPrice: 12, highPrice: 20 },
      // Dinnerware
      { id: 'k18', name: 'Plates Set (4)', essential: true, lowPrice: 15, midPrice: 35, highPrice: 80 },
      { id: 'k19', name: 'Bowls Set (4)', essential: true, lowPrice: 12, midPrice: 25, highPrice: 60 },
      { id: 'k20', name: 'Glasses Set (4)', essential: true, lowPrice: 10, midPrice: 20, highPrice: 45 },
      { id: 'k21', name: 'Mugs (4)', essential: true, lowPrice: 12, midPrice: 25, highPrice: 50 },
      { id: 'k22', name: 'Flatware Set', essential: true, lowPrice: 15, midPrice: 35, highPrice: 70 },
      { id: 'k23', name: 'Wine Glasses (4)', essential: false, lowPrice: 12, midPrice: 25, highPrice: 60 },
      // Storage & Organization
      { id: 'k24', name: 'Food Storage Containers', essential: true, lowPrice: 15, midPrice: 30, highPrice: 60 },
      { id: 'k25', name: 'Trash Can', essential: true, lowPrice: 15, midPrice: 35, highPrice: 70 },
      { id: 'k26', name: 'Trash Bags', essential: true, lowPrice: 8, midPrice: 15, highPrice: 25 },
      { id: 'k27', name: 'Paper Towel Holder', essential: false, lowPrice: 8, midPrice: 18, highPrice: 35 },
      { id: 'k28', name: 'Dish Drying Rack', essential: true, lowPrice: 12, midPrice: 25, highPrice: 50 },
      { id: 'k29', name: 'Utensil Holder/Crock', essential: false, lowPrice: 8, midPrice: 18, highPrice: 35 },
      // Appliances
      { id: 'k30', name: 'Coffee Maker', essential: false, lowPrice: 20, midPrice: 50, highPrice: 150 },
      { id: 'k31', name: 'Toaster', essential: false, lowPrice: 15, midPrice: 30, highPrice: 60 },
      { id: 'k32', name: 'Microwave (if not included)', essential: true, lowPrice: 50, midPrice: 100, highPrice: 200 },
      { id: 'k33', name: 'Blender', essential: false, lowPrice: 20, midPrice: 50, highPrice: 150 },
      { id: 'k34', name: 'Electric Kettle', essential: false, lowPrice: 15, midPrice: 30, highPrice: 60 },
      { id: 'k35', name: 'Air Fryer', essential: false, lowPrice: 40, midPrice: 80, highPrice: 150 },
      // Cleaning
      { id: 'k36', name: 'Dish Soap', essential: true, lowPrice: 3, midPrice: 6, highPrice: 10 },
      { id: 'k37', name: 'Sponges', essential: true, lowPrice: 3, midPrice: 8, highPrice: 15 },
      { id: 'k38', name: 'Dish Towels (3-5)', essential: true, lowPrice: 8, midPrice: 18, highPrice: 35 },
      { id: 'k39', name: 'Oven Mitts', essential: true, lowPrice: 6, midPrice: 15, highPrice: 30 },
      { id: 'k40', name: 'Pot Holders', essential: true, lowPrice: 5, midPrice: 12, highPrice: 25 },
      // Misc
      { id: 'k41', name: 'Water Filter Pitcher', essential: false, lowPrice: 20, midPrice: 35, highPrice: 50 },
      { id: 'k42', name: 'Ice Cube Trays', essential: false, lowPrice: 5, midPrice: 12, highPrice: 20 },
      { id: 'k43', name: 'Chip Clips/Bag Clips', essential: false, lowPrice: 5, midPrice: 10, highPrice: 18 },
      { id: 'k44', name: 'Aluminum Foil', essential: true, lowPrice: 4, midPrice: 8, highPrice: 12 },
      { id: 'k45', name: 'Plastic Wrap', essential: false, lowPrice: 3, midPrice: 6, highPrice: 10 },
    ]
  },
  bedroom: {
    name: 'Bedroom',
    icon: '🛏️',
    items: [
      // Furniture
      { id: 'b1', name: 'Bed Frame', essential: true, lowPrice: 100, midPrice: 250, highPrice: 600 },
      { id: 'b2', name: 'Mattress', essential: true, lowPrice: 150, midPrice: 400, highPrice: 1000 },
      { id: 'b3', name: 'Nightstand', essential: false, lowPrice: 30, midPrice: 80, highPrice: 200 },
      { id: 'b4', name: 'Dresser', essential: false, lowPrice: 80, midPrice: 200, highPrice: 500 },
      { id: 'b5', name: 'Desk', essential: false, lowPrice: 50, midPrice: 150, highPrice: 350 },
      { id: 'b6', name: 'Desk Chair', essential: false, lowPrice: 40, midPrice: 120, highPrice: 300 },
      { id: 'b7', name: 'Full-Length Mirror', essential: false, lowPrice: 25, midPrice: 60, highPrice: 150 },
      // Bedding
      { id: 'b8', name: 'Sheet Set', essential: true, lowPrice: 25, midPrice: 50, highPrice: 120 },
      { id: 'b9', name: 'Pillows (2)', essential: true, lowPrice: 20, midPrice: 50, highPrice: 120 },
      { id: 'b10', name: 'Pillowcases', essential: true, lowPrice: 10, midPrice: 25, highPrice: 50 },
      { id: 'b11', name: 'Comforter/Duvet', essential: true, lowPrice: 40, midPrice: 100, highPrice: 250 },
      { id: 'b12', name: 'Duvet Cover', essential: false, lowPrice: 30, midPrice: 70, highPrice: 150 },
      { id: 'b13', name: 'Mattress Protector', essential: true, lowPrice: 20, midPrice: 45, highPrice: 100 },
      { id: 'b14', name: 'Extra Blanket', essential: false, lowPrice: 20, midPrice: 50, highPrice: 120 },
      // Storage & Organization
      { id: 'b15', name: 'Hangers (20+)', essential: true, lowPrice: 8, midPrice: 20, highPrice: 45 },
      { id: 'b16', name: 'Closet Organizer', essential: false, lowPrice: 20, midPrice: 50, highPrice: 120 },
      { id: 'b17', name: 'Under-Bed Storage', essential: false, lowPrice: 15, midPrice: 35, highPrice: 70 },
      { id: 'b18', name: 'Laundry Hamper', essential: true, lowPrice: 12, midPrice: 30, highPrice: 60 },
      { id: 'b19', name: 'Shoe Rack', essential: false, lowPrice: 15, midPrice: 35, highPrice: 80 },
      // Decor & Lighting
      { id: 'b20', name: 'Bedside Lamp', essential: true, lowPrice: 15, midPrice: 40, highPrice: 100 },
      { id: 'b21', name: 'Curtains/Blinds', essential: true, lowPrice: 20, midPrice: 50, highPrice: 120 },
      { id: 'b22', name: 'Curtain Rod', essential: true, lowPrice: 10, midPrice: 25, highPrice: 60 },
      { id: 'b23', name: 'Alarm Clock', essential: false, lowPrice: 10, midPrice: 25, highPrice: 60 },
      { id: 'b24', name: 'Area Rug', essential: false, lowPrice: 30, midPrice: 80, highPrice: 200 },
      { id: 'b25', name: 'Wall Art/Decor', essential: false, lowPrice: 15, midPrice: 50, highPrice: 150 },
    ]
  },
  bathroom: {
    name: 'Bathroom',
    icon: '🚿',
    items: [
      // Essentials
      { id: 'ba1', name: 'Shower Curtain', essential: true, lowPrice: 10, midPrice: 25, highPrice: 60 },
      { id: 'ba2', name: 'Shower Curtain Rings', essential: true, lowPrice: 5, midPrice: 12, highPrice: 25 },
      { id: 'ba3', name: 'Shower Curtain Liner', essential: true, lowPrice: 8, midPrice: 15, highPrice: 30 },
      { id: 'ba4', name: 'Bath Towels (4)', essential: true, lowPrice: 20, midPrice: 45, highPrice: 100 },
      { id: 'ba5', name: 'Hand Towels (4)', essential: true, lowPrice: 12, midPrice: 25, highPrice: 50 },
      { id: 'ba6', name: 'Washcloths (4)', essential: true, lowPrice: 8, midPrice: 18, highPrice: 35 },
      { id: 'ba7', name: 'Bath Mat', essential: true, lowPrice: 10, midPrice: 25, highPrice: 50 },
      // Toiletries
      { id: 'ba8', name: 'Toilet Paper', essential: true, lowPrice: 8, midPrice: 15, highPrice: 25 },
      { id: 'ba9', name: 'Hand Soap', essential: true, lowPrice: 3, midPrice: 8, highPrice: 15 },
      { id: 'ba10', name: 'Toothbrush Holder', essential: false, lowPrice: 5, midPrice: 15, highPrice: 30 },
      { id: 'ba11', name: 'Soap Dish/Dispenser', essential: false, lowPrice: 5, midPrice: 15, highPrice: 35 },
      // Cleaning
      { id: 'ba12', name: 'Toilet Brush & Holder', essential: true, lowPrice: 8, midPrice: 18, highPrice: 35 },
      { id: 'ba13', name: 'Plunger', essential: true, lowPrice: 8, midPrice: 15, highPrice: 25 },
      { id: 'ba14', name: 'Toilet Bowl Cleaner', essential: true, lowPrice: 4, midPrice: 8, highPrice: 15 },
      { id: 'ba15', name: 'Bathroom Cleaner', essential: true, lowPrice: 4, midPrice: 8, highPrice: 15 },
      // Storage
      { id: 'ba16', name: 'Small Trash Can', essential: true, lowPrice: 8, midPrice: 18, highPrice: 35 },
      { id: 'ba17', name: 'Over-Toilet Storage', essential: false, lowPrice: 25, midPrice: 60, highPrice: 120 },
      { id: 'ba18', name: 'Shower Caddy', essential: false, lowPrice: 10, midPrice: 25, highPrice: 50 },
      { id: 'ba19', name: 'Medicine Cabinet Organizer', essential: false, lowPrice: 10, midPrice: 25, highPrice: 50 },
      // Extras
      { id: 'ba20', name: 'Hair Dryer', essential: false, lowPrice: 15, midPrice: 35, highPrice: 80 },
      { id: 'ba21', name: 'Scale', essential: false, lowPrice: 15, midPrice: 35, highPrice: 80 },
      { id: 'ba22', name: 'Towel Hooks/Bar', essential: false, lowPrice: 10, midPrice: 25, highPrice: 50 },
    ]
  },
  livingRoom: {
    name: 'Living Room',
    icon: '🛋️',
    items: [
      // Furniture
      { id: 'l1', name: 'Sofa/Couch', essential: true, lowPrice: 200, midPrice: 600, highPrice: 1500 },
      { id: 'l2', name: 'Coffee Table', essential: false, lowPrice: 40, midPrice: 120, highPrice: 300 },
      { id: 'l3', name: 'End Table(s)', essential: false, lowPrice: 25, midPrice: 70, highPrice: 180 },
      { id: 'l4', name: 'TV Stand/Entertainment Center', essential: false, lowPrice: 50, midPrice: 150, highPrice: 400 },
      { id: 'l5', name: 'Bookshelf', essential: false, lowPrice: 30, midPrice: 80, highPrice: 200 },
      { id: 'l6', name: 'Accent Chair', essential: false, lowPrice: 80, midPrice: 200, highPrice: 500 },
      // Electronics
      { id: 'l7', name: 'TV', essential: false, lowPrice: 150, midPrice: 400, highPrice: 1000 },
      { id: 'l8', name: 'TV Mount', essential: false, lowPrice: 20, midPrice: 50, highPrice: 120 },
      { id: 'l9', name: 'Streaming Device', essential: false, lowPrice: 30, midPrice: 50, highPrice: 150 },
      { id: 'l10', name: 'Speakers/Soundbar', essential: false, lowPrice: 30, midPrice: 100, highPrice: 300 },
      // Decor
      { id: 'l11', name: 'Area Rug', essential: false, lowPrice: 40, midPrice: 120, highPrice: 350 },
      { id: 'l12', name: 'Curtains', essential: false, lowPrice: 25, midPrice: 60, highPrice: 150 },
      { id: 'l13', name: 'Curtain Rods', essential: false, lowPrice: 15, midPrice: 35, highPrice: 80 },
      { id: 'l14', name: 'Throw Pillows', essential: false, lowPrice: 15, midPrice: 40, highPrice: 100 },
      { id: 'l15', name: 'Throw Blanket', essential: false, lowPrice: 15, midPrice: 40, highPrice: 100 },
      { id: 'l16', name: 'Wall Art', essential: false, lowPrice: 20, midPrice: 60, highPrice: 200 },
      { id: 'l17', name: 'Plants/Planters', essential: false, lowPrice: 15, midPrice: 40, highPrice: 100 },
      // Lighting
      { id: 'l18', name: 'Floor Lamp', essential: true, lowPrice: 25, midPrice: 60, highPrice: 150 },
      { id: 'l19', name: 'Table Lamp', essential: false, lowPrice: 20, midPrice: 45, highPrice: 100 },
      { id: 'l20', name: 'Smart Bulbs', essential: false, lowPrice: 15, midPrice: 40, highPrice: 80 },
      // Misc
      { id: 'l21', name: 'Coasters', essential: false, lowPrice: 8, midPrice: 18, highPrice: 40 },
      { id: 'l22', name: 'Candles', essential: false, lowPrice: 10, midPrice: 25, highPrice: 60 },
    ]
  },
  cleaning: {
    name: 'Cleaning Supplies',
    icon: '🧹',
    items: [
      // Equipment
      { id: 'c1', name: 'Vacuum Cleaner', essential: true, lowPrice: 50, midPrice: 150, highPrice: 400 },
      { id: 'c2', name: 'Broom & Dustpan', essential: true, lowPrice: 10, midPrice: 25, highPrice: 50 },
      { id: 'c3', name: 'Mop & Bucket', essential: true, lowPrice: 15, midPrice: 35, highPrice: 80 },
      { id: 'c4', name: 'Duster', essential: true, lowPrice: 5, midPrice: 15, highPrice: 30 },
      { id: 'c5', name: 'Spray Bottles', essential: false, lowPrice: 3, midPrice: 8, highPrice: 15 },
      // Cleaning Products
      { id: 'c6', name: 'All-Purpose Cleaner', essential: true, lowPrice: 4, midPrice: 8, highPrice: 15 },
      { id: 'c7', name: 'Glass Cleaner', essential: true, lowPrice: 4, midPrice: 8, highPrice: 15 },
      { id: 'c8', name: 'Disinfectant Spray', essential: true, lowPrice: 4, midPrice: 8, highPrice: 15 },
      { id: 'c9', name: 'Floor Cleaner', essential: false, lowPrice: 5, midPrice: 10, highPrice: 20 },
      { id: 'c10', name: 'Stain Remover', essential: false, lowPrice: 5, midPrice: 12, highPrice: 20 },
      // Supplies
      { id: 'c11', name: 'Paper Towels', essential: true, lowPrice: 8, midPrice: 15, highPrice: 25 },
      { id: 'c12', name: 'Cleaning Cloths/Rags', essential: true, lowPrice: 8, midPrice: 18, highPrice: 35 },
      { id: 'c13', name: 'Rubber Gloves', essential: true, lowPrice: 4, midPrice: 10, highPrice: 20 },
      { id: 'c14', name: 'Scrub Brush', essential: false, lowPrice: 4, midPrice: 10, highPrice: 20 },
      // Laundry
      { id: 'c15', name: 'Laundry Detergent', essential: true, lowPrice: 8, midPrice: 18, highPrice: 35 },
      { id: 'c16', name: 'Fabric Softener', essential: false, lowPrice: 5, midPrice: 12, highPrice: 25 },
      { id: 'c17', name: 'Dryer Sheets', essential: false, lowPrice: 4, midPrice: 10, highPrice: 18 },
      { id: 'c18', name: 'Iron/Steamer', essential: false, lowPrice: 20, midPrice: 50, highPrice: 120 },
      { id: 'c19', name: 'Ironing Board', essential: false, lowPrice: 20, midPrice: 45, highPrice: 100 },
    ]
  },
  safety: {
    name: 'Safety & Emergency',
    icon: '🔒',
    items: [
      { id: 's1', name: 'First Aid Kit', essential: true, lowPrice: 15, midPrice: 30, highPrice: 60 },
      { id: 's2', name: 'Smoke Detector (if not provided)', essential: true, lowPrice: 10, midPrice: 25, highPrice: 50 },
      { id: 's3', name: 'Carbon Monoxide Detector', essential: true, lowPrice: 15, midPrice: 35, highPrice: 70 },
      { id: 's4', name: 'Fire Extinguisher', essential: true, lowPrice: 20, midPrice: 40, highPrice: 80 },
      { id: 's5', name: 'Flashlight', essential: true, lowPrice: 8, midPrice: 20, highPrice: 45 },
      { id: 's6', name: 'Extra Batteries', essential: true, lowPrice: 8, midPrice: 18, highPrice: 35 },
      { id: 's7', name: 'Door Security Bar/Lock', essential: false, lowPrice: 15, midPrice: 35, highPrice: 70 },
      { id: 's8', name: 'Window Locks', essential: false, lowPrice: 10, midPrice: 25, highPrice: 50 },
      { id: 's9', name: 'Safe/Lockbox', essential: false, lowPrice: 25, midPrice: 60, highPrice: 150 },
      { id: 's10', name: 'Surge Protector', essential: true, lowPrice: 10, midPrice: 25, highPrice: 50 },
      { id: 's11', name: 'Light Bulbs (Various)', essential: true, lowPrice: 10, midPrice: 25, highPrice: 50 },
    ]
  },
  tools: {
    name: 'Tools & Hardware',
    icon: '🔧',
    items: [
      { id: 't1', name: 'Basic Tool Kit', essential: true, lowPrice: 20, midPrice: 50, highPrice: 120 },
      { id: 't2', name: 'Screwdriver Set', essential: true, lowPrice: 10, midPrice: 25, highPrice: 50 },
      { id: 't3', name: 'Hammer', essential: true, lowPrice: 8, midPrice: 18, highPrice: 40 },
      { id: 't4', name: 'Tape Measure', essential: true, lowPrice: 5, midPrice: 12, highPrice: 25 },
      { id: 't5', name: 'Level', essential: false, lowPrice: 8, midPrice: 18, highPrice: 40 },
      { id: 't6', name: 'Pliers', essential: false, lowPrice: 8, midPrice: 18, highPrice: 40 },
      { id: 't7', name: 'Adjustable Wrench', essential: false, lowPrice: 8, midPrice: 18, highPrice: 40 },
      { id: 't8', name: 'Duct Tape', essential: true, lowPrice: 5, midPrice: 10, highPrice: 20 },
      { id: 't9', name: 'Scissors', essential: true, lowPrice: 5, midPrice: 12, highPrice: 25 },
      { id: 't10', name: 'Box Cutter/Utility Knife', essential: true, lowPrice: 5, midPrice: 12, highPrice: 25 },
      { id: 't11', name: 'Nails & Screws Assortment', essential: false, lowPrice: 8, midPrice: 18, highPrice: 35 },
      { id: 't12', name: 'Picture Hanging Kit', essential: false, lowPrice: 8, midPrice: 18, highPrice: 35 },
      { id: 't13', name: 'Command Strips/Hooks', essential: true, lowPrice: 8, midPrice: 18, highPrice: 35 },
      { id: 't14', name: 'Step Stool/Ladder', essential: false, lowPrice: 20, midPrice: 50, highPrice: 120 },
    ]
  },
  tech: {
    name: 'Tech & Office',
    icon: '💻',
    items: [
      { id: 'te1', name: 'WiFi Router (if not provided)', essential: true, lowPrice: 30, midPrice: 80, highPrice: 200 },
      { id: 'te2', name: 'Power Strip', essential: true, lowPrice: 10, midPrice: 25, highPrice: 50 },
      { id: 'te3', name: 'Extension Cords', essential: true, lowPrice: 8, midPrice: 18, highPrice: 40 },
      { id: 'te4', name: 'Phone Charger', essential: true, lowPrice: 10, midPrice: 25, highPrice: 50 },
      { id: 'te5', name: 'Laptop/Computer', essential: false, lowPrice: 300, midPrice: 800, highPrice: 2000 },
      { id: 'te6', name: 'Printer', essential: false, lowPrice: 50, midPrice: 120, highPrice: 300 },
      { id: 'te7', name: 'Desk Lamp', essential: false, lowPrice: 15, midPrice: 35, highPrice: 80 },
      { id: 'te8', name: 'Desk Organizer', essential: false, lowPrice: 10, midPrice: 25, highPrice: 50 },
      { id: 'te9', name: 'Filing Cabinet/Box', essential: false, lowPrice: 20, midPrice: 50, highPrice: 150 },
      { id: 'te10', name: 'Paper/Notebooks', essential: false, lowPrice: 5, midPrice: 15, highPrice: 30 },
      { id: 'te11', name: 'Pens/Pencils', essential: true, lowPrice: 5, midPrice: 12, highPrice: 25 },
      { id: 'te12', name: 'Tape/Stapler', essential: false, lowPrice: 8, midPrice: 18, highPrice: 35 },
    ]
  },
  entryway: {
    name: 'Entryway & Misc',
    icon: '🚪',
    items: [
      { id: 'e1', name: 'Door Mat (Outside)', essential: true, lowPrice: 10, midPrice: 25, highPrice: 60 },
      { id: 'e2', name: 'Door Mat (Inside)', essential: false, lowPrice: 10, midPrice: 25, highPrice: 60 },
      { id: 'e3', name: 'Key Hooks/Bowl', essential: false, lowPrice: 8, midPrice: 20, highPrice: 45 },
      { id: 'e4', name: 'Coat Rack/Hooks', essential: false, lowPrice: 15, midPrice: 40, highPrice: 100 },
      { id: 'e5', name: 'Umbrella Stand', essential: false, lowPrice: 15, midPrice: 35, highPrice: 80 },
      { id: 'e6', name: 'Shoe Storage', essential: false, lowPrice: 20, midPrice: 50, highPrice: 120 },
      { id: 'e7', name: 'Wall Calendar', essential: false, lowPrice: 8, midPrice: 18, highPrice: 40 },
      { id: 'e8', name: 'Clock', essential: false, lowPrice: 10, midPrice: 30, highPrice: 80 },
      { id: 'e9', name: 'Fan (Portable)', essential: false, lowPrice: 20, midPrice: 50, highPrice: 120 },
      { id: 'e10', name: 'Space Heater', essential: false, lowPrice: 25, midPrice: 60, highPrice: 150 },
    ]
  }
};

// FAQ Data
const faqData = [
  {
    question: "How much does it cost to furnish a first apartment?",
    answer: "The total cost varies based on your choices, but expect to spend: Budget ($1,500-$3,000), Mid-range ($3,000-$6,000), or Comfortable ($6,000-$12,000+). Our calculator helps you estimate costs based on your specific selections. Focus on essentials first - you can always add items later."
  },
  {
    question: "What should I buy first for my first apartment?",
    answer: "Prioritize items you need on Day 1: a bed/mattress and bedding, bathroom essentials (toilet paper, towels, shower curtain), basic kitchen items (pot, pan, dishes), and cleaning supplies. Our checklist marks 'Essential' items to help you prioritize."
  },
  {
    question: "What apartment essentials do people forget?",
    answer: "Commonly forgotten items include: toilet plunger, trash cans for each room, shower curtain liner, light bulbs, basic tools (screwdriver, hammer), first aid kit, toilet brush, and power strips. Our comprehensive checklist ensures you don't miss anything."
  },
  {
    question: "Should I buy everything before moving in?",
    answer: "No! Buy essentials first (bed, bathroom basics, cleaning supplies), then add items over time. This spreads out costs and lets you see what you actually need. Many people overbuy and end up with unused items."
  },
  {
    question: "Where can I save money on apartment essentials?",
    answer: "Save money by: shopping at dollar stores for basics, buying used furniture on Facebook Marketplace, waiting for sales (especially Black Friday), asking family for hand-me-downs, and starting with cheaper versions you can upgrade later."
  },
  {
    question: "What kitchen items do I need for a first apartment?",
    answer: "Essential kitchen items: pots and pans set, one good knife, cutting board, cooking utensils, plates/bowls/glasses (4 each), flatware, can opener, measuring cups, food storage containers, dish soap, and sponges."
  },
  {
    question: "Do I need a bed frame for my first apartment?",
    answer: "Not immediately - you can put your mattress on the floor temporarily. However, a bed frame improves air circulation (preventing mold), makes getting in/out easier, and adds storage space underneath. It's worth getting eventually."
  },
  {
    question: "What cleaning supplies do I need for a first apartment?",
    answer: "Essential cleaning supplies: vacuum or broom, mop, all-purpose cleaner, glass cleaner, toilet bowl cleaner, dish soap, sponges, paper towels, trash bags, and laundry detergent. These cover 90% of cleaning needs."
  },
  {
    question: "How many towels do I need for my first apartment?",
    answer: "Start with at least 2-4 bath towels, 2-4 hand towels, and 2-4 washcloths per person. This allows for one set in use and one in the wash. Add more if you have frequent guests."
  },
  {
    question: "What bedroom essentials do I need?",
    answer: "Must-haves: mattress, sheets, pillows, comforter/blanket, and hangers. Nice-to-haves: bed frame, nightstand, dresser, curtains, and bedside lamp. Prioritize good sleep over aesthetics initially."
  },
  {
    question: "Do I need renters insurance for my first apartment?",
    answer: "Yes! Renters insurance is very affordable ($15-30/month) and protects your belongings from theft, fire, and water damage. Many landlords require it, and it's essential for protecting your new purchases."
  },
  {
    question: "What safety items should I have in my apartment?",
    answer: "Essential safety items: smoke detector (check if provided), carbon monoxide detector, fire extinguisher, first aid kit, flashlight with extra batteries, and surge protectors for electronics."
  },
  {
    question: "How do I furnish an apartment on a tight budget?",
    answer: "Budget tips: buy essentials only first, shop secondhand (Facebook Marketplace, thrift stores), ask family for hand-me-downs, wait for sales, use dollar stores for basics, and DIY where possible. Our 'Essential' filter helps you prioritize."
  },
  {
    question: "What tools do I need for a first apartment?",
    answer: "Basic tools: screwdriver set (flathead and Phillips), hammer, tape measure, pliers, duct tape, scissors, and picture hanging supplies. A basic toolkit covers most apartment needs."
  },
  {
    question: "Should I buy a couch for my first apartment?",
    answer: "A couch is nice but not essential Day 1. You can use floor cushions or chairs temporarily. When ready, consider apartment-sized options, and check measurements carefully - oversized furniture is a common mistake."
  },
  {
    question: "What bathroom items do I need on move-in day?",
    answer: "Day 1 bathroom essentials: toilet paper, shower curtain with rings, bath towel, hand soap, toilet brush, plunger, and bath mat. These ensure your bathroom is functional immediately."
  },
  {
    question: "How do I create a first apartment budget?",
    answer: "Follow the 50/30/20 rule: 50% of income on needs (rent, utilities), 30% on wants, 20% on savings. For furnishing, set a total budget, prioritize essentials, and spread purchases over 2-3 months."
  },
  {
    question: "What's the difference between essential and nice-to-have items?",
    answer: "Essential items are needed for daily function (bed, toilet paper, basic cookware). Nice-to-haves improve comfort or aesthetics but aren't urgent (TV, accent pillows, art). Buy essentials first, add others over time."
  },
  {
    question: "Do I need a dining table for my first apartment?",
    answer: "Not necessarily - especially in small apartments. Alternatives include bar stools at a counter, a coffee table for casual dining, or a small desk that doubles as dining space. Assess your space first."
  },
  {
    question: "What should I do before moving into my first apartment?",
    answer: "Before move-in: measure rooms and doorways, set up utilities, get renters insurance, do a walkthrough to document existing damage, deep clean if needed, and pack an 'open first' box with Day 1 essentials."
  },
  {
    question: "How do I avoid overspending on apartment essentials?",
    answer: "Avoid overspending by: making a list before shopping, setting a firm budget, buying essentials first, waiting 24 hours before impulse purchases, comparing prices online, and asking 'do I really need this now?'"
  },
  {
    question: "What living room items do I need?",
    answer: "Living room essentials depend on your lifestyle. Most people prioritize: seating (couch or chairs), lamp/lighting, and possibly a TV. Rugs, tables, and decor can wait until you know how you use the space."
  },
  {
    question: "Should I buy new or used furniture?",
    answer: "Mix both! Buy new: mattress (for hygiene), linens, toilet brush. Buy used: couches, tables, dressers, desks, chairs. Inspect used items for bed bugs, structural damage, and excessive wear."
  },
  {
    question: "What's the best way to organize my first apartment checklist?",
    answer: "Organize by: 1) Urgency (Day 1 vs. Later), 2) Room (kitchen, bedroom, etc.), and 3) Budget priority. Our interactive checklist lets you filter all three ways and track your progress."
  },
  {
    question: "How many sets of sheets do I need?",
    answer: "At minimum, 2 sets of sheets - one on the bed and one clean set ready. This allows you to change sheets while washing the dirty set. Add more sets if you prefer weekly changes or have guests."
  },
  {
    question: "What kitchen appliances are essential vs optional?",
    answer: "Essential (if not provided): microwave. Semi-essential: coffee maker (if you drink coffee), toaster. Optional: blender, air fryer, instant pot. Start minimal and add based on your cooking habits."
  },
  {
    question: "Do I need curtains in every room?",
    answer: "Prioritize bedroom curtains for sleep quality and privacy. Living room curtains are optional depending on your windows and neighbors. Bathrooms usually have frosted glass or small windows that don't need curtains."
  },
  {
    question: "What items can I borrow instead of buying?",
    answer: "Borrow from family/friends: specialty kitchen tools, ladder, power drill, steam cleaner, and items you'll use once (moving dollies). This saves money and storage space."
  },
  {
    question: "How do I make my first apartment feel like home?",
    answer: "Quick home touches: add plants (even fake ones), put up photos or art, use good lighting (lamps over overhead), add textiles (throw blankets, rugs), and keep it clean. Personality comes over time."
  },
  {
    question: "What should I inspect during the move-in walkthrough?",
    answer: "Document everything: existing damage (photos), working appliances, water pressure, outlets working, locks functioning, smoke detectors, and cleanliness. Use a move-in inspection checklist and keep copies."
  }
];

export default function FirstApartmentChecklist() {
  // State management
  const [checkedItems, setCheckedItems] = useState({});
  const [ownedItems, setOwnedItems] = useState({});
  const [priceLevel, setPriceLevel] = useState('mid'); // 'low', 'mid', 'high'
  const [filter, setFilter] = useState('all'); // 'all', 'essential', 'nice'
  const [roomFilter, setRoomFilter] = useState('all');
  const [expandedRooms, setExpandedRooms] = useState(Object.keys(checklistData));
  const [openFaq, setOpenFaq] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedChecked = localStorage.getItem('apartmentChecklist');
    const savedOwned = localStorage.getItem('apartmentOwned');
    if (savedChecked) setCheckedItems(JSON.parse(savedChecked));
    if (savedOwned) setOwnedItems(JSON.parse(savedOwned));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('apartmentChecklist', JSON.stringify(checkedItems));
  }, [checkedItems]);

  useEffect(() => {
    localStorage.setItem('apartmentOwned', JSON.stringify(ownedItems));
  }, [ownedItems]);

  // Calculate statistics
  const stats = useMemo(() => {
    let totalItems = 0;
    let essentialItems = 0;
    let checkedCount = 0;
    let ownedCount = 0;
    let totalCost = 0;
    let checkedCost = 0;
    let remainingCost = 0;

    Object.entries(checklistData).forEach(([roomKey, room]) => {
      room.items.forEach(item => {
        if (ownedItems[item.id]) {
          ownedCount++;
          return;
        }
        
        totalItems++;
        if (item.essential) essentialItems++;
        
        const price = priceLevel === 'low' ? item.lowPrice : 
                     priceLevel === 'high' ? item.highPrice : item.midPrice;
        totalCost += price;
        
        if (checkedItems[item.id]) {
          checkedCount++;
          checkedCost += price;
        } else {
          remainingCost += price;
        }
      });
    });

    return {
      totalItems,
      essentialItems,
      checkedCount,
      ownedCount,
      totalCost,
      checkedCost,
      remainingCost,
      progress: totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0
    };
  }, [checkedItems, ownedItems, priceLevel]);

  // Filter items
  const getFilteredItems = (items) => {
    return items.filter(item => {
      if (ownedItems[item.id]) return false;
      if (filter === 'essential' && !item.essential) return false;
      if (filter === 'nice' && item.essential) return false;
      return true;
    });
  };

  // Toggle functions
  const toggleCheck = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleOwned = (id) => {
    setOwnedItems(prev => ({ ...prev, [id]: !prev[id] }));
    // Remove from checked if marking as owned
    if (!ownedItems[id]) {
      setCheckedItems(prev => {
        const newChecked = { ...prev };
        delete newChecked[id];
        return newChecked;
      });
    }
  };

  const toggleRoom = (roomKey) => {
    setExpandedRooms(prev => 
      prev.includes(roomKey) 
        ? prev.filter(r => r !== roomKey)
        : [...prev, roomKey]
    );
  };

  // Reset all
  const resetAll = () => {
    if (confirm('Are you sure you want to reset your entire checklist?')) {
      setCheckedItems({});
      setOwnedItems({});
      localStorage.removeItem('apartmentChecklist');
      localStorage.removeItem('apartmentOwned');
    }
  };

  // Export functions
  const exportToPrint = () => {
    window.print();
  };

  const exportToText = () => {
    let text = "FIRST APARTMENT CHECKLIST\n";
    text += "========================\n\n";
    text += `Budget Level: ${priceLevel.charAt(0).toUpperCase() + priceLevel.slice(1)}\n`;
    text += `Estimated Total: $${stats.totalCost.toLocaleString()}\n\n`;

    Object.entries(checklistData).forEach(([roomKey, room]) => {
      const filteredItems = getFilteredItems(room.items);
      if (filteredItems.length === 0) return;

      text += `\n${room.icon} ${room.name}\n`;
      text += "-".repeat(30) + "\n";

      filteredItems.forEach(item => {
        const price = priceLevel === 'low' ? item.lowPrice : 
                     priceLevel === 'high' ? item.highPrice : item.midPrice;
        const checked = checkedItems[item.id] ? "✓" : "☐";
        const essential = item.essential ? " [ESSENTIAL]" : "";
        text += `${checked} ${item.name}${essential} - $${price}\n`;
      });
    });

    text += "\n\nGenerated by DibbyTour.com/tools/first-apartment-checklist";

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'first-apartment-checklist.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Schema markup
  const schemaData = {
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
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Use the First Apartment Checklist",
    "description": "A step-by-step guide to furnishing your first apartment with our interactive checklist tool.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Set Your Budget",
        "text": "Choose Low, Medium, or High price estimates to match your budget."
      },
      {
        "@type": "HowToStep",
        "name": "Mark Items You Own",
        "text": "Click 'Already Own' on items you're bringing from home or receiving as gifts."
      },
      {
        "@type": "HowToStep",
        "name": "Filter by Priority",
        "text": "Use 'Essential Only' to see must-have items for move-in day."
      },
      {
        "@type": "HowToStep",
        "name": "Check Off Purchases",
        "text": "Check items as you buy them to track your progress and spending."
      },
      {
        "@type": "HowToStep",
        "name": "Export Your List",
        "text": "Download or print your personalized checklist to take shopping."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex items-center gap-2 text-orange-200 text-sm mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/tools" className="hover:text-white">Tools</Link>
              <span>/</span>
              <span className="text-white">First Apartment Checklist</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🏠 First Apartment Essentials Checklist
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl">
              The ultimate interactive checklist with 150+ items, budget calculator, and progress tracking. 
              Never forget an essential item again!
            </p>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">{stats.progress}%</div>
                <div className="text-sm text-orange-200">Complete</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">{stats.checkedCount}</div>
                <div className="text-sm text-orange-200">Items Bought</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">${stats.checkedCost.toLocaleString()}</div>
                <div className="text-sm text-orange-200">Spent</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">${stats.remainingCost.toLocaleString()}</div>
                <div className="text-sm text-orange-200">Remaining</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="sticky top-0 z-40 bg-white shadow-md">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Shopping Progress: {stats.checkedCount} of {stats.totalItems} items
              </span>
              <span className="text-sm font-bold text-orange-600">
                {stats.progress}% Complete
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500"
                style={{ width: `${stats.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Controls */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Budget Level */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  💰 Budget Level
                </label>
                <div className="flex rounded-lg overflow-hidden border border-gray-300">
                  {['low', 'mid', 'high'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setPriceLevel(level)}
                      className={`flex-1 py-2 px-3 text-sm font-medium transition-colors ${
                        priceLevel === level
                          ? 'bg-orange-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-orange-50'
                      }`}
                    >
                      {level === 'low' ? '$ Budget' : level === 'mid' ? '$$ Mid-Range' : '$$$ Quality'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🎯 Filter Items
                </label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">All Items</option>
                  <option value="essential">Essential Only (Day 1)</option>
                  <option value="nice">Nice-to-Have Only</option>
                </select>
              </div>

              {/* Room Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🚪 Filter by Room
                </label>
                <select
                  value={roomFilter}
                  onChange={(e) => setRoomFilter(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">All Rooms</option>
                  {Object.entries(checklistData).map(([key, room]) => (
                    <option key={key} value={key}>{room.icon} {room.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowExportModal(true)}
                className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                📥 Export List
              </button>
              <button
                onClick={() => setExpandedRooms(Object.keys(checklistData))}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                ➕ Expand All
              </button>
              <button
                onClick={() => setExpandedRooms([])}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                ➖ Collapse All
              </button>
              <button
                onClick={resetAll}
                className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors ml-auto"
              >
                🔄 Reset All
              </button>
            </div>
          </div>

          {/* Budget Summary Card */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">📊 Budget Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-green-200 text-sm">Total Estimate</div>
                <div className="text-2xl font-bold">${stats.totalCost.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-green-200 text-sm">Already Bought</div>
                <div className="text-2xl font-bold">${stats.checkedCost.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-green-200 text-sm">Still Need</div>
                <div className="text-2xl font-bold">${stats.remainingCost.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-green-200 text-sm">Already Own</div>
                <div className="text-2xl font-bold">{stats.ownedCount} items</div>
              </div>
            </div>
          </div>

          {/* Checklist Sections */}
          <div className="space-y-4">
            {Object.entries(checklistData)
              .filter(([key]) => roomFilter === 'all' || roomFilter === key)
              .map(([roomKey, room]) => {
                const filteredItems = getFilteredItems(room.items);
                const roomChecked = filteredItems.filter(i => checkedItems[i.id]).length;
                const roomTotal = filteredItems.length;

                if (roomTotal === 0) return null;

                return (
                  <div key={roomKey} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Room Header */}
                    <button
                      onClick={() => toggleRoom(roomKey)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{room.icon}</span>
                        <span className="text-lg font-semibold text-gray-800">{room.name}</span>
                        <span className="bg-orange-100 text-orange-700 text-sm px-2 py-1 rounded-full">
                          {roomChecked}/{roomTotal}
                        </span>
                      </div>
                      <span className="text-2xl text-gray-400">
                        {expandedRooms.includes(roomKey) ? '−' : '+'}
                      </span>
                    </button>

                    {/* Room Items */}
                    {expandedRooms.includes(roomKey) && (
                      <div className="p-4">
                        <div className="space-y-2">
                          {filteredItems.map(item => {
                            const price = priceLevel === 'low' ? item.lowPrice : 
                                         priceLevel === 'high' ? item.highPrice : item.midPrice;
                            const isChecked = checkedItems[item.id];

                            return (
                              <div
                                key={item.id}
                                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                                  isChecked 
                                    ? 'bg-green-50 border-green-200' 
                                    : 'bg-gray-50 border-gray-200 hover:border-orange-300'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() => toggleCheck(item.id)}
                                    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                                      isChecked
                                        ? 'bg-green-500 border-green-500 text-white'
                                        : 'border-gray-300 hover:border-orange-500'
                                    }`}
                                  >
                                    {isChecked && '✓'}
                                  </button>
                                  <div>
                                    <span className={`font-medium ${isChecked ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                      {item.name}
                                    </span>
                                    {item.essential && (
                                      <span className="ml-2 bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">
                                        ESSENTIAL
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className={`font-semibold ${isChecked ? 'text-gray-400' : 'text-gray-700'}`}>
                                    ${price}
                                  </span>
                                  <button
                                    onClick={() => toggleOwned(item.id)}
                                    className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-600 px-2 py-1 rounded transition-colors"
                                  >
                                    Already Own
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          {/* How to Use Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📖 How to Use This Checklist</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Set Your Budget</h3>
                  <p className="text-gray-600 text-sm">Choose Low ($), Mid ($$), or High ($$$) price estimates to match your budget.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Mark Items You Own</h3>
                  <p className="text-gray-600 text-sm">Click "Already Own" on items you're bringing or receiving as gifts.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Filter by Priority</h3>
                  <p className="text-gray-600 text-sm">Use "Essential Only" to see must-have items for move-in day.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Check Off Purchases</h3>
                  <p className="text-gray-600 text-sm">Check items as you buy them to track progress and spending.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold shrink-0">5</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Export Your List</h3>
                  <p className="text-gray-600 text-sm">Download or print your personalized checklist to take shopping.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold shrink-0">6</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Your Progress Saves</h3>
                  <p className="text-gray-600 text-sm">Come back anytime - your checklist saves automatically!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Money Saving Tips */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold mb-6">💡 Money-Saving Tips for First Apartments</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-xl p-4">
                <h3 className="font-semibold text-lg mb-2">🛒 Shop Smart</h3>
                <ul className="space-y-2 text-blue-100">
                  <li>• Wait for sales (Black Friday, Labor Day)</li>
                  <li>• Compare prices across Amazon, Target, Walmart</li>
                  <li>• Check dollar stores for basics</li>
                  <li>• Use student discounts if eligible</li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <h3 className="font-semibold text-lg mb-2">🔄 Buy Used</h3>
                <ul className="space-y-2 text-blue-100">
                  <li>• Facebook Marketplace for furniture</li>
                  <li>• Thrift stores for kitchenware</li>
                  <li>• Ask family for hand-me-downs</li>
                  <li>• Check college move-out sales</li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <h3 className="font-semibold text-lg mb-2">⏰ Time It Right</h3>
                <ul className="space-y-2 text-blue-100">
                  <li>• Buy essentials first, add later</li>
                  <li>• Spread purchases over 2-3 months</li>
                  <li>• Live in space before buying decor</li>
                  <li>• Avoid impulse purchases</li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <h3 className="font-semibold text-lg mb-2">📦 Skip These Initially</h3>
                <ul className="space-y-2 text-blue-100">
                  <li>• Specialty kitchen appliances</li>
                  <li>• Excessive decor and art</li>
                  <li>• Premium versions of basics</li>
                  <li>• Items you can borrow</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🔧 Related Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/security-deposit-calculator" className="block p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors">
                <div className="text-2xl mb-2">💰</div>
                <h3 className="font-semibold text-gray-800">Security Deposit Calculator</h3>
                <p className="text-sm text-gray-600">Calculate your security deposit by state</p>
              </Link>
              <Link href="/tools/roommate-agreement-generator" className="block p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors">
                <div className="text-2xl mb-2">📝</div>
                <h3 className="font-semibold text-gray-800">Roommate Agreement Generator</h3>
                <p className="text-sm text-gray-600">Create a custom roommate contract</p>
              </Link>
              <Link href="/checklist" className="block p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors">
                <div className="text-2xl mb-2">✅</div>
                <h3 className="font-semibold text-gray-800">Move-In Inspection Checklist</h3>
                <p className="text-sm text-gray-600">Document your apartment's condition</p>
              </Link>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">❓ Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqData.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-800 pr-4">{faq.question}</span>
                    <span className="text-xl text-gray-400 shrink-0">
                      {openFaq === index ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl shadow-lg p-8 mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">🏡 Moving Into a New Place?</h2>
            <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
              Protect yourself from scams and ensure your new apartment is in perfect condition. 
              Our professional move-in inspection service documents everything before you sign.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/"
                className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors"
              >
                Get Move-In Inspection
              </Link>
              <Link 
                href="/scams/facebook-marketplace-scams"
                className="bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors"
              >
                Read: Avoid Rental Scams
              </Link>
            </div>
          </div>
        </div>

        {/* Export Modal */}
        {showExportModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📥 Export Your Checklist</h3>
              <p className="text-gray-600 mb-6">Choose how you'd like to export your personalized checklist:</p>
              <div className="space-y-3">
                <button
                  onClick={() => { exportToPrint(); setShowExportModal(false); }}
                  className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <span className="text-2xl">🖨️</span>
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">Print Checklist</div>
                    <div className="text-sm text-gray-600">Print-friendly version</div>
                  </div>
                </button>
                <button
                  onClick={() => { exportToText(); setShowExportModal(false); }}
                  className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <span className="text-2xl">📄</span>
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">Download as Text</div>
                    <div className="text-sm text-gray-600">.txt file with all items</div>
                  </div>
                </button>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="w-full mt-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ========== VERIFICATION CTA ========== */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-y border-emerald-500/30 py-12 mt-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Moving to a New City?</h3>
            <p className="text-gray-600 mb-6">Can't visit your apartment in person? Our inspectors physically verify apartments before you sign.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/services/remote-apartment-inspection" className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-400 transition-all">
                Book Inspection →
              </a>
              <a href="/tools/red-flag-checker" className="px-6 py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all">
                Free Red Flag Check
              </a>
            </div>
          </div>
        </div>

        {/* ========== INTERNAL LINKS SECTION ========== */}
        <div className="bg-gray-100 py-12">
          <div className="max-w-6xl mx-auto px-4">
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
                  <li><a href="/checklists/questions-to-ask" className="text-gray-500 hover:text-gray-800 text-sm">Questions to Ask</a></li>
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
        <footer className="bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-5 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">DibbyTour</div>
                <p className="text-gray-400 text-sm">Your trusted resource for apartment hunting. Professional inspections and free tools to help you rent confidently.</p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Services</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/services/remote-apartment-inspection" className="text-gray-400 hover:text-white">Remote Inspection</a></li>
                  <li><a href="/services/sight-unseen-verification" className="text-gray-400 hover:text-white">Sight Unseen</a></li>
                  <li><a href="/services/travel-nurse-verification" className="text-gray-400 hover:text-white">Travel Nurses</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Free Tools</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/tools/rent-calculator" className="text-gray-400 hover:text-white">Rent Calculator</a></li>
                  <li><a href="/tools/red-flag-checker" className="text-gray-400 hover:text-white">Red Flag Checker</a></li>
                  <li><a href="/tools/craigslist-facebook-verification" className="text-gray-400 hover:text-white">CL/FB Verifier</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/checklists/first-apartment" className="text-gray-400 hover:text-white">First Apartment</a></li>
                  <li><a href="/checklists/questions-to-ask" className="text-gray-400 hover:text-white">Questions to Ask</a></li>
                  <li><a href="/guide" className="text-gray-400 hover:text-white">Complete Guide</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
              <p>© {new Date().getFullYear()} DibbyTour. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Print Styles */}
        <style jsx global>{`
          @media print {
            .sticky, footer, button, .no-print {
              display: none !important;
            }
            .bg-gradient-to-r, .bg-gradient-to-br {
              background: white !important;
              color: black !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}
