# DibbyTour SEO Pages

## Folder Structure

```
seo-pages/
├── crisis/          # 10 urgent situation pages (12-18% conv)
├── panic/           # 12 maximum panic pages (25-35% conv)
├── micro-moments/   # 25+ exact panic search pages (15-25% conv)
├── cities/          # 100 city pages
├── travel-nurse/    # 10 travel nurse city pages
├── bofu/            # 8 bottom-of-funnel service pages
├── guides/          # Problem-aware content & checklists
└── tools/           # Interactive calculators & checkers
```

## High-Intent Pages (Hair on Fire)

### crisis/ - People in Urgent Situations
- `CRISIS-HAIR-ON-FIRE-PAGES.jsx` - 10 pages
- Examples: "signing lease without seeing apartment", "job starts monday"

### panic/ - Maximum Panic Mode
- `PANIC-MODE-ULTRA-HIGH-INTENT.jsx` - 12 pages
- Examples: "landlord stopped responding after deposit", "keys don't work"

### micro-moments/ - Exact Panic Searches
- `MICRO-MOMENT-EXACT-SEARCHES.jsx` - 25+ pages
- Examples: "is zillow rental safe", "landlord only accepts wire transfer"

## Programmatic Pages

### cities/ - 100 US Cities
- `city-pages-generator.jsx` - Complete data for 100 cities
- Each page has: rent data, scam stats, neighborhoods, hospitals, testimonials

### travel-nurse/ - Travel Nurse Markets
- `travel-nurse-pages-generator.jsx` - 10 top markets
- Each page has: hospitals, stipends, neighborhoods, scam warnings

### bofu/ - Bottom of Funnel
- `bofu-pages-generator.jsx` - 8 high-intent service pages
- Examples: "hire someone to view apartment", "remote inspection service"

## Interactive Tools

### tools/ - Calculators & Checkers
- `apartment-red-flag-checker.jsx` - Check listing for scam signs
- `is-this-rent-legit-calculator.jsx` - Compare rent to market rate
- `craigslist-facebook-rental-verification.jsx` - Platform-specific checks

## Implementation

See `/docs/seo-strategy/` for full implementation guides:
- `ULTRA-HIGH-INTENT-SUMMARY.md` - Overview of high-intent pages
- `PROGRAMMATIC-SEO-IMPLEMENTATION-SUMMARY.md` - Full deployment guide
- `NEXTJS-IMPLEMENTATION-GUIDE.md` - Next.js specific setup

## Expected Conversion Rates

| Page Type | Conv Rate | Monthly Volume |
|-----------|-----------|----------------|
| Panic | 25-35% | Low but gold |
| Crisis | 12-18% | Medium |
| BOFU | 4-8% | Medium |
| Cities | 2-4% | High |
| Guides | 1-2% | Very High |
