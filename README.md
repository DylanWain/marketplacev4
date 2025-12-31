# DibbyTour - Complete Package

## 🎯 Overview

Complete DibbyTour application with:
- **500,690 programmatic SEO pages** (SoCal + NYC only)
- Full booking system with email notifications
- All marketing/landing pages
- Property images and inspection video
- Pre-generated sitemaps ready to submit

## 📊 SEO Stats

```
📍 Locations: 768 (SoCal: 366, NYC: 402)
📄 Total URLs: 500,690
🗂️ Sitemaps: 12 files (45,000 URLs each)
```

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📋 Submit to Google

```
https://dibbytour.com/sitemap-index.xml
```

## 📁 Structure

```
dibbytour-full/
├── app/
│   ├── page.js                    # Homepage
│   ├── book/                      # Booking flow
│   ├── confirmation/              # Order confirmation
│   ├── [...slug]/                 # 500K dynamic pages
│   ├── [service]/                 # Service landing pages
│   ├── for/                       # Persona pages
│   ├── cities/                    # City directory
│   ├── los-angeles-apartment-inspection/
│   ├── nyc-apartment-inspection/
│   ├── chicago-apartment-inspection/
│   ├── austin-apartment-inspection/
│   ├── miami-apartment-inspection/
│   ├── scams/                     # Scam info pages
│   ├── tools/                     # Scam calculator, etc.
│   ├── guides/                    # Help guides
│   ├── blog/                      # Blog
│   ├── glossary/                  # Rental glossary
│   └── university/                # University pages
├── components/
│   ├── Header.js
│   └── Footer.js
├── lib/
│   ├── supabase.js               # Supabase client
│   ├── seo-data.js               # SEO configuration
│   ├── blog-posts.js             # Blog content
│   └── programmatic-seo.js       # SEO helpers
├── data/
│   ├── sitemap-generator.js      # Generates 500K URLs
│   ├── location-generator.js     # Location data
│   └── locations-socal.js        # SoCal locations
├── public/
│   ├── sitemap-index.xml         # SUBMIT THIS
│   ├── sitemap-1.xml ... -12.xml # All 500K URLs
│   ├── robots.txt
│   ├── images/
│   │   ├── customers/            # Customer photos
│   │   ├── property/             # Property photos
│   │   └── *.jpg/png             # Service images
│   └── videos/
│       └── inspection-tour.mp4   # Marketing video
├── scripts/
│   └── generate-sitemaps.js      # Regenerate sitemaps
└── seo-pages/                    # Static SEO content
```

## 🔧 Scripts

```bash
npm run dev              # Development
npm run build            # Production build
npm run generate-sitemaps # Regenerate all sitemaps
```

## 📧 Email Setup

Using EmailJS for notifications:
- Service ID: service_1rrwiuo
- Customer Template: template_2kcwz9e
- Admin Template: template_dcrzs54

## 🗄️ Database

Supabase for order storage.

## ✅ Features

- [x] Homepage with hero, testimonials, services
- [x] Multi-step booking flow
- [x] Email confirmations
- [x] 500K programmatic SEO pages
- [x] City-specific landing pages
- [x] Persona-specific pages (travel nurses, students, etc.)
- [x] Scam calculator tool
- [x] Blog
- [x] Glossary
- [x] All sitemaps pre-generated
