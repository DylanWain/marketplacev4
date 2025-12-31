// app/sitemap.js
// Generates sitemap index for DibbyTour SEO pages

let SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dibbytour.com";
if (!SITE_URL.startsWith("http")) {
  SITE_URL = `https://${SITE_URL}`;
}

export default function sitemap() {
  const sitemaps = [];

  // Core pages (homepage, book, confirmation, etc.)
  sitemaps.push({
    url: `${SITE_URL}/sitemaps/core.xml`,
    lastModified: new Date(),
  });

  // City pages (/cities/*)
  sitemaps.push({
    url: `${SITE_URL}/sitemaps/cities.xml`,
    lastModified: new Date(),
  });

  // Free tools (12+ tools)
  sitemaps.push({
    url: `${SITE_URL}/sitemaps/tools.xml`,
    lastModified: new Date(),
  });

  // Blog posts (50+ posts)
  sitemaps.push({
    url: `${SITE_URL}/sitemaps/blog.xml`,
    lastModified: new Date(),
  });

  // Service + City pages (/apartment-inspection/los-angeles)
  // Split into multiple sitemaps due to volume
  for (let i = 0; i < 10; i++) {
    sitemaps.push({
      url: `${SITE_URL}/sitemaps/service-city-${i}.xml`,
      lastModified: new Date(),
    });
  }

  // University pages (/university/ucla, /university/usc, etc.)
  sitemaps.push({
    url: `${SITE_URL}/sitemaps/universities.xml`,
    lastModified: new Date(),
  });

  // Item + City inspection pages (/inspect/car/los-angeles)
  for (let i = 0; i < 20; i++) {
    sitemaps.push({
      url: `${SITE_URL}/sitemaps/inspect-${i}.xml`,
      lastModified: new Date(),
    });
  }

  // Industry/persona landing pages (/for/students, /for/military, etc.)
  sitemaps.push({
    url: `${SITE_URL}/sitemaps/for.xml`,
    lastModified: new Date(),
  });

  // Guides/pillar pages
  sitemaps.push({
    url: `${SITE_URL}/sitemaps/guides.xml`,
    lastModified: new Date(),
  });

  // Glossary pages
  sitemaps.push({
    url: `${SITE_URL}/sitemaps/glossary.xml`,
    lastModified: new Date(),
  });

  // Checklists
  sitemaps.push({
    url: `${SITE_URL}/sitemaps/checklists.xml`,
    lastModified: new Date(),
  });

  return sitemaps;
}
