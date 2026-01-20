# 🚀 DIBBYTOUR SEO - NEXT.JS IMPLEMENTATION GUIDE

## 📁 Recommended App Router Structure

```
app/
├── page.jsx                                    # Homepage
├── guide/
│   └── page.jsx                               # Pillar page (pillar-page-guide.jsx)
├── services/
│   ├── remote-apartment-inspection/
│   │   └── page.jsx                           # Main service
│   ├── sight-unseen-verification/
│   │   └── page.jsx
│   ├── travel-nurse-verification/
│   │   └── page.jsx
│   └── international-student-verification/
│       └── page.jsx
├── tools/
│   ├── rent-calculator/
│   │   └── page.jsx                           # Is This Rent Legit
│   ├── red-flag-checker/
│   │   └── page.jsx
│   └── craigslist-facebook-verification/
│       └── page.jsx
├── checklists/
│   ├── first-apartment/
│   │   └── page.jsx
│   ├── questions-to-ask/
│   │   └── page.jsx
│   └── move-out-cleaning/
│       └── page.jsx
├── cities/
│   ├── nyc-apartment-inspection/
│   │   └── page.jsx
│   ├── la-apartment-inspection/
│   │   └── page.jsx
│   └── [city]/
│       └── page.jsx                           # Dynamic city pages
├── for/
│   ├── travel-nurses/
│   │   └── page.jsx
│   ├── international-students/
│   │   └── page.jsx
│   ├── relocating-professionals/
│   │   └── page.jsx
│   └── military-families/
│       └── page.jsx
├── layout.jsx                                  # Root layout with footer
├── sitemap.xml                                # Use route handler
└── robots.txt                                 # Use route handler
```

---

## 🔧 FILE TO ROUTE MAPPING

| File | Route | Page Type |
|------|-------|-----------|
| `pillar-page-guide.jsx` | `/guide` | Pillar |
| `remote-apartment-inspection-service.jsx` | `/services/remote-apartment-inspection` | Service |
| `sight-unseen-rental-verification.jsx` | `/services/sight-unseen-verification` | Service |
| `travel-nurse-apartment-verification.jsx` | `/services/travel-nurse-verification` | Service |
| `international-student-apartment-verification.jsx` | `/services/international-student-verification` | Service |
| `is-this-rent-legit-calculator.jsx` | `/tools/rent-calculator` | Tool |
| `apartment-red-flag-checker.jsx` | `/tools/red-flag-checker` | Tool |
| `craigslist-facebook-rental-verification.jsx` | `/tools/craigslist-facebook-verification` | Tool |
| `first-apartment-checklist-page.js` | `/checklists/first-apartment` | Checklist |
| `questions-to-ask-when-renting-page.js` | `/checklists/questions-to-ask` | Checklist |
| `move-out-cleaning-checklist-page.js` | `/checklists/move-out-cleaning` | Checklist |
| `nyc-apartment-inspection-page.js` | `/cities/nyc-apartment-inspection` | City |
| `la-apartment-inspection-page.js` | `/cities/la-apartment-inspection` | City |

---

## 📝 EXAMPLE PAGE IMPLEMENTATION

### app/services/remote-apartment-inspection/page.jsx

```jsx
import { generatePageMetadata } from '@/lib/seo-config';
import RemoteApartmentInspectionService from '@/components/pages/remote-apartment-inspection-service';

// Generate metadata for SEO
export const metadata = generatePageMetadata('remoteInspection');

export default function RemoteInspectionPage() {
  return <RemoteApartmentInspectionService />;
}
```

### app/tools/rent-calculator/page.jsx

```jsx
import { generatePageMetadata } from '@/lib/seo-config';
import RentLegitChecker from '@/components/pages/is-this-rent-legit-calculator';

export const metadata = generatePageMetadata('rentCalculator');

export default function RentCalculatorPage() {
  return <RentLegitChecker />;
}
```

---

## 🗺️ SITEMAP ROUTE HANDLER

### app/sitemap.xml/route.js

```javascript
export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dibbytour.com/guide</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Add all other URLs -->
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
```

---

## 🤖 ROBOTS.TXT ROUTE HANDLER

### app/robots.txt/route.js

```javascript
export async function GET() {
  const robots = `User-agent: *
Allow: /
Sitemap: https://dibbytour.com/sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard/`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
```

---

## 📊 GOOGLE SEARCH CONSOLE SETUP

1. **Verify domain ownership**
   - Add TXT record or HTML file

2. **Submit sitemap**
   - Go to Sitemaps section
   - Submit: `https://dibbytour.com/sitemap.xml`

3. **Request indexing for priority pages**
   - `/guide` (pillar)
   - `/services/remote-apartment-inspection`
   - `/tools/red-flag-checker`
   - `/tools/rent-calculator`
   - `/checklists/first-apartment`

4. **Monitor performance**
   - Track impressions, clicks, CTR
   - Monitor for crawl errors
   - Check mobile usability

---

## 🔗 INTERNAL LINK VERIFICATION CHECKLIST

### Every page should have:

- [ ] Link to pillar page (`/guide`)
- [ ] Link to main service (`/services/remote-apartment-inspection`)
- [ ] Links to free tools (at least 2)
- [ ] Links to related pages in same cluster
- [ ] Footer with all major pages
- [ ] Breadcrumb navigation

### Test internal links:

```bash
# Use a link checker tool
npx broken-link-checker https://dibbytour.com --recursive

# Or manually verify in browser
# Check: Console → Network → Filter by 404
```

---

## 📈 TRACKING & ANALYTICS

### Add to layout.jsx:

```jsx
// Google Analytics 4
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
```

### Track conversions:

```javascript
// Track tool usage
gtag('event', 'tool_use', {
  tool_name: 'red_flag_checker',
  result: score,
});

// Track service page views
gtag('event', 'view_service', {
  service_name: 'remote_inspection',
});

// Track CTA clicks
gtag('event', 'cta_click', {
  cta_location: 'hero',
  destination: '/book',
});
```

---

## 🚀 DEPLOYMENT CHECKLIST

### Pre-launch:
- [ ] All pages render correctly
- [ ] All internal links work (no 404s)
- [ ] Mobile responsive
- [ ] Page speed > 90 on Lighthouse
- [ ] Schema markup validates (schema.org validator)
- [ ] Meta tags present on all pages
- [ ] Images have alt tags
- [ ] Sitemap accessible at /sitemap.xml
- [ ] Robots.txt accessible at /robots.txt

### Post-launch:
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Request indexing for priority pages
- [ ] Set up Google Analytics
- [ ] Monitor for crawl errors
- [ ] Check Core Web Vitals

---

## 📅 MAINTENANCE SCHEDULE

### Weekly:
- Check Search Console for errors
- Monitor rankings for target keywords
- Review analytics for traffic patterns

### Monthly:
- Update sitemap lastmod dates
- Add new content/pages
- Refresh old content
- Build backlinks

### Quarterly:
- Full SEO audit
- Competitor analysis
- Update keyword targets
- Content gap analysis

---

*Implementation guide complete. Follow this structure for optimal SEO performance.*
