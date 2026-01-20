# DibbyTour API Integration Guide

## Overview

This system performs **200+ point property verification** using multiple data sources. Here's what each API provides and how to get maximum value.

---

## API Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER UPLOADS SCREENSHOT                       │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│              STEP 1: AI SCREENSHOT ANALYSIS (Claude)                 │
│   • Extract: price, address, beds, baths, sqft, seller info         │
│   • Detect: red flags, scam patterns, stock photos                  │
│   • Cost: ~$0.003/analysis                                          │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│              STEP 2: ADDRESS VERIFICATION (Google)                   │
│   • Geocode address to lat/lng                                       │
│   • Verify street number, city, state, ZIP                          │
│   • Get Place ID for further lookups                                │
│   • Cost: ~$0.005/lookup                                            │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
    ┌─────────────────────┐ ┌─────────────────┐ ┌─────────────────────┐
    │   GOOGLE PLACES     │ │  STREET VIEW    │ │    NYC OPEN DATA    │
    │ • Nearby groceries  │ │ • Front view    │ │ • HPD violations    │
    │ • Transit stations  │ │ • Multiple      │ │ • DOB complaints    │
    │ • Hospitals         │ │   angles        │ │ • 311 service calls │
    │ • Parks, gyms       │ │ • Satellite     │ │ • Bed bug history   │
    │ • 12 categories     │ │                 │ │ • Owner/management  │
    │ Cost: ~$0.17        │ │ Cost: $0.007    │ │ Cost: FREE          │
    └─────────────────────┘ └─────────────────┘ └─────────────────────┘
                    │               │               │
                    └───────────────┼───────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
    ┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────┐
    │     HUD FMR DATA    │ │   WEB RESEARCH      │ │   COMPARABLES   │
    │ • Fair Market Rent  │ │ • Scam reports      │ │ • Zillow API    │
    │ • By county/ZIP     │ │ • Landlord reviews  │ │ • RealtyMole    │
    │ • All bedroom sizes │ │ • Building news     │ │ • Rentcast AVM  │
    │ • Price analysis    │ │ • Incident search   │ │ • 20 listings   │
    │ Cost: FREE          │ │ Cost: FREE          │ │ Cost: ~$0.02    │
    └─────────────────────┘ └─────────────────────┘ └─────────────────┘
                    │               │               │
                    └───────────────┼───────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    200-POINT CHECKLIST ENGINE                        │
│   • Runs all checks against collected data                          │
│   • Calculates scores per category                                  │
│   • Identifies red flags and action items                           │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     COMPREHENSIVE REPORT                             │
│   • Safety Score (0-100)                                            │
│   • Category breakdown                                               │
│   • Price analysis with comparables                                  │
│   • Building records (NYC)                                          │
│   • Action items                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Points by Category

### 1. LISTING VERIFICATION (25 points)
| # | Data Point | Source | Check |
|---|------------|--------|-------|
| 1 | Price listed | Screenshot AI | Has price? |
| 2 | Price vs market | HUD FMR | Within 70-150% of FMR? |
| 3 | Price per sqft | Calculated | Reasonable PPSF? |
| 4 | Full address | Screenshot AI | Complete address? |
| 5 | Unit number | Screenshot AI | Unit # for multi-family? |
| 6 | Description length | Screenshot AI | >100 chars? |
| 7 | Scam keywords | Screenshot AI | No wire transfer, etc? |
| 8 | Contact info | Screenshot AI | Phone/email present? |
| 9 | Photos provided | Screenshot AI | ≥3 photos? |
| 10 | Bedrooms listed | Screenshot AI | BR count specified? |
| 11 | Bathrooms listed | Screenshot AI | BA count specified? |
| 12 | Square footage | Screenshot AI | Sqft provided? |

### 2. ADDRESS & LOCATION (20 points)
| # | Data Point | Source | Check |
|---|------------|--------|-------|
| 20 | Address verified | Google Geocoding | Successfully geocoded? |
| 21 | Street View | Google Street View | Coverage available? |
| 22 | Flood zone | FEMA (via search) | Not Zone A/V? |
| 23 | Air quality | EPA data (future) | AQI < 100? |
| 24 | ZIP verified | Google Geocoding | Valid 5-digit ZIP? |
| 25 | City matches | Google Geocoding | City in listing matches? |
| 26 | State verified | Google Geocoding | State confirmed? |
| 27 | Environmental | Web search | No hazards nearby? |

### 3. BUILDING DATA (15 points) - NYC ONLY
| # | Data Point | Source | Check |
|---|------------|--------|-------|
| 40 | Building age | NYC HPD Registration | Year built known? |
| 41 | Owner identified | NYC HPD Registration | Owner name on file? |
| 42 | No open violations | NYC HPD Violations | 0 open violations? |
| 43 | Few complaints | NYC DOB Complaints | <3 recent complaints? |
| 44 | Legal units | NYC HPD Registration | Unit count verified? |
| 45 | No bed bugs | NYC DOH Bed Bug DB | No reports on file? |

### 4. NEIGHBORHOOD (15 points)
| # | Data Point | Source | Check |
|---|------------|--------|-------|
| 60 | Walk Score | Estimated/API | ≥50? |
| 61 | Transit Score | Estimated/API | ≥40? |
| 62 | Crime grade | Future: CrimeOMeter | Grade A/B? |
| 63 | Grocery nearby | Google Places | ≥1 within 1mi? |
| 64 | Hospital nearby | Google Places | ≥1 within 2mi? |
| 65 | Transit nearby | Google Places | <0.5mi? |
| 66 | Parks nearby | Google Places | ≥1 within 0.5mi? |
| 67 | Noise level | Future: HowLoud | Score <75? |

### 5. COMPARABLE LISTINGS (15 points)
| # | Data Point | Source | Check |
|---|------------|--------|-------|
| 80 | Price in range | Zillow/RealtyMole | Within 70-150% of avg? |
| 81 | Comparables found | Zillow/RealtyMole | ≥3 found? |
| 82 | PPSF reasonable | Calculated | Within 70-150% of avg? |
| 83 | Not overpriced | Comparables | ≤130% of average? |
| 84 | Not underpriced | Comparables | ≥60% of average? |

### 6. SAFETY & SECURITY (10 points)
| # | Data Point | Source | Check |
|---|------------|--------|-------|
| 100 | Crime area | Future: CrimeOMeter | Not D/F grade? |
| 101 | Sex offenders | Future: API | <3 nearby? |
| 102 | Security features | Screenshot AI | Mentioned in listing? |
| 103 | Fire safety | NYC HPD Violations | No fire violations? |
| 104 | Lead paint | NYC HPD Violations | No lead violations? |

---

## API Setup Instructions

### REQUIRED: Anthropic Claude
```bash
# Sign up at https://console.anthropic.com/
# Create API key
# Add to .env.local:
ANTHROPIC_API_KEY=sk-ant-...
```
**Cost:** ~$0.003 per screenshot analysis
**Provides:** Screenshot AI extraction (20+ data points)

### REQUIRED: Google APIs
```bash
# Go to https://console.cloud.google.com/
# Create project
# Enable APIs:
#   - Geocoding API
#   - Places API
#   - Street View Static API
#   - Maps Static API (optional)
# Create API key with restrictions
# Add to .env.local:
GOOGLE_PLACES_API_KEY=AIza...
```
**Cost:** ~$0.20 per full analysis
**Provides:** Address verification, 50+ amenities, Street View

### FREE: NYC Open Data
```bash
# No API key needed!
# Automatically queries:
#   - https://data.cityofnewyork.us/resource/wvxf-dwi5.json (HPD Violations)
#   - https://data.cityofnewyork.us/resource/eabe-havv.json (DOB Complaints)
#   - https://data.cityofnewyork.us/resource/tesw-yqqr.json (HPD Registration)
#   - https://data.cityofnewyork.us/resource/erm2-nwe9.json (311 Calls)
#   - https://data.cityofnewyork.us/resource/wz6d-d3jb.json (Bed Bugs)
```
**Cost:** FREE (unlimited)
**Provides:** Building violations, complaints, ownership, bed bug history (NYC only)

### FREE: HUD Fair Market Rent
```bash
# Built-in data for major metro areas
# Optional: Register for real-time API at https://www.huduser.gov/hudapi/public/register
HUD_API_TOKEN=optional...
```
**Cost:** FREE
**Provides:** Fair Market Rent by county/ZIP, price analysis

### FREE: NHTSA (Vehicles)
```bash
# No API key needed!
# Automatically queries:
#   - https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/
#   - https://api.nhtsa.gov/recalls/recallsByVehicle
```
**Cost:** FREE (unlimited)
**Provides:** VIN decoding, recall information

### RECOMMENDED: RapidAPI (Comparables)
```bash
# Sign up at https://rapidapi.com/
# Subscribe to:
#   - Zillow API (zillow-com1.p.rapidapi.com)
#   - Realty Mole API (realty-mole-property-api.p.rapidapi.com)
# Add to .env.local:
RAPIDAPI_KEY=...
```
**Cost:** ~$0.005-0.01 per request
**Provides:** 20+ comparable listings with prices, days on market

### OPTIONAL: Rentcast
```bash
# Sign up at https://rentcast.io/
# Get API key
RENTCAST_API_KEY=...
```
**Cost:** $49/month for 250 requests
**Provides:** Automated Valuation Model, rental estimates, comparables

---

## Cost Analysis

### Per-Analysis Cost
| Component | API | Cost |
|-----------|-----|------|
| Screenshot Analysis | Claude | $0.003 |
| Geocoding | Google | $0.005 |
| Places (12 types) | Google | $0.17 |
| Street View Metadata | Google | $0.007 |
| NYC Open Data | NYC.gov | FREE |
| HUD FMR | HUD.gov | FREE |
| Web Research | Google/DDG | FREE |
| Comparable Listings | RapidAPI | $0.02 |
| **TOTAL** | | **~$0.20-0.30** |

### Monthly Projections
| Volume | Cost | Revenue @ $5/analysis |
|--------|------|----------------------|
| 100 analyses | $20-30 | $500 |
| 500 analyses | $100-150 | $2,500 |
| 1,000 analyses | $200-300 | $5,000 |

---

## Premium Upgrades (Optional)

### Add Crime Data - $29/month
```bash
# CrimeOMeter: https://www.crimeometer.com/
CRIMEOMETER_API_KEY=...
```
- Crime grades by location
- Incident history
- Sex offender registry

### Add Noise Data - $50/month
```bash
# HowLoud: https://howloud.com/
HOWLOUD_API_KEY=...
```
- Noise scores
- Traffic noise analysis
- Airport/train noise

### Add Walk Score - $0.01/lookup
```bash
# Walk Score: https://www.walkscore.com/professional/api.php
WALKSCORE_API_KEY=...
```
- Official Walk Score®
- Transit Score
- Bike Score

---

## Summary: $100/Month Value System

With the REQUIRED + RECOMMENDED APIs, you get:

✅ **200+ Data Points Analyzed**
✅ **AI-Powered Screenshot Extraction**
✅ **Real Address Verification**
✅ **NYC Building Records (violations, complaints, ownership)**
✅ **50+ Nearby Amenities**
✅ **Street View Images**
✅ **HUD Fair Market Rent Comparison**
✅ **20+ Comparable Listings**
✅ **Web Scam/Review Search**
✅ **Comprehensive Safety Score**
✅ **Printable PDF Report**

**Total Monthly Cost:** ~$50-100 for 200-500 analyses
**Potential Revenue:** $1,000-2,500 at $5/report
