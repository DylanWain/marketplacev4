import type { VercelRequest, VercelResponse } from '@vercel/node';

const BASE_URL = 'https://www.dibbytour.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { type } = req.query;

  try {
    if (type === 'index') {
      // Return sitemap index
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=cities</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-1</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-2</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-3</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-4</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-5</loc></sitemap>
</sitemapindex>`;
      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Cache-Control', 's-maxage=86400');
      return res.status(200).send(xml);
    }

    // Dynamic import of supabase only when needed
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );

    let urls: string[] = [];

    if (type === 'cities') {
      const { data: cities } = await supabase.from('us_cities').select('slug');
      const { data: categories } = await supabase.from('seo_categories').select('slug');
      
      if (cities) {
        // City pages
        for (const city of cities) {
          urls.push(`${BASE_URL}/marketplace/${city.slug}`);
          // City + category pages
          if (categories) {
            for (const cat of categories) {
              urls.push(`${BASE_URL}/marketplace/${city.slug}/${cat.slug}`);
            }
          }
        }
      }
    }

    if (type?.toString().startsWith('zips-')) {
      const pageNum = parseInt(type.toString().split('-')[1]) || 1;
      const limit = 10000;
      const offset = (pageNum - 1) * limit;

      const { data: zips } = await supabase
        .from('us_zipcodes')
        .select('zipcode')
        .range(offset, offset + limit - 1);

      if (zips) {
        for (const zip of zips) {
          urls.push(`${BASE_URL}/marketplace/zip/${zip.zipcode}`);
        }
      }
    }

    // Generate XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    for (const url of urls) {
      xml += `  <url><loc>${url}</loc></url>\n`;
    }
    xml += '</urlset>';

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 's-maxage=86400');
    return res.status(200).send(xml);

  } catch (error) {
    console.error('Sitemap error:', error);
    return res.status(500).send('Error: ' + (error as Error).message);
  }
}
