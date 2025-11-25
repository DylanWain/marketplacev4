import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const BASE_URL = 'https://www.dibbytour.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { type, page } = req.query;
  const pageNum = parseInt(page as string) || 1;
  const limit = 50000;
  const offset = (pageNum - 1) * limit;

  let urls: string[] = [];

  try {
    switch (type) {
      case 'index': {
        // Return sitemap index pointing to all sub-sitemaps
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=cities</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=cities-categories</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips&amp;page=1</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips&amp;page=2</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-categories&amp;page=1</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-categories&amp;page=2</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-categories&amp;page=3</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-categories&amp;page=4</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-categories&amp;page=5</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-categories&amp;page=6</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-categories&amp;page=7</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-categories&amp;page=8</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-categories&amp;page=9</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-categories&amp;page=10</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-categories&amp;page=11</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-categories&amp;page=12</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-categories&amp;page=13</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-categories&amp;page=14</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-categories&amp;page=15</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-categories&amp;page=16</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-categories&amp;page=17</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-categories&amp;page=18</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-categories&amp;page=19</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=zips-categories&amp;page=20</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-cities&amp;page=1</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-cities&amp;page=2</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=1</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=2</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=3</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=4</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=5</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=6</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=7</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=8</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=9</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=10</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=11</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=12</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=13</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=14</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=15</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=16</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=17</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=18</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=19</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=20</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=21</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=22</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=23</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=24</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=25</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=26</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=27</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=28</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=29</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=30</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=31</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=32</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=33</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=34</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=35</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=36</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=37</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=38</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=39</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=40</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=41</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=42</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=43</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=44</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=45</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=46</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=47</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=48</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=49</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=50</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=51</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=52</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=53</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=54</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=55</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=56</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=57</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=58</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=59</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=60</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=61</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=62</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=63</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=64</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=65</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=66</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=67</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=68</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=69</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=70</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=71</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=72</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=73</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=74</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=75</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=76</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=77</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=78</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=79</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=80</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=81</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=82</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=83</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=84</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=85</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=86</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=87</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=88</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=89</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=90</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=91</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=92</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=93</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=94</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=95</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=96</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=97</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=98</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=99</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=100</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=101</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=102</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=103</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=104</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=105</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=106</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=107</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=108</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=109</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=110</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=111</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=112</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=113</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=114</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=115</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=116</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=117</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=118</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=119</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=120</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=121</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=122</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=123</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=124</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=125</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=126</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=127</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=128</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=129</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=130</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=131</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=132</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=133</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=134</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=135</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=136</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=137</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=138</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=139</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=140</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=141</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=142</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=143</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=144</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=145</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=146</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=147</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=148</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=149</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=150</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=151</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=152</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=153</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=154</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=155</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=156</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=157</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=158</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=159</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=160</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=161</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=162</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=163</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=164</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=vehicles-zips&amp;page=165</loc></sitemap>
  <sitemap><loc>${BASE_URL}/api/generate-sitemap?type=neighborhoods</loc></sitemap>
</sitemapindex>`;
        res.setHeader('Content-Type', 'application/xml');
        res.setHeader('Cache-Control', 's-maxage=86400');
        return res.status(200).send(xml);
      }

      case 'cities': {
        const { data: cities } = await supabase.from('us_cities').select('slug');
        if (cities) {
          urls = cities.map(c => `${BASE_URL}/marketplace/${c.slug}`);
        }
        break;
      }

      case 'cities-categories': {
        const { data: cities } = await supabase.from('us_cities').select('slug');
        const { data: categories } = await supabase.from('seo_categories').select('slug').eq('is_active', true);
        if (cities && categories) {
          for (const city of cities) {
            for (const cat of categories) {
              urls.push(`${BASE_URL}/marketplace/${city.slug}/${cat.slug}`);
            }
          }
        }
        break;
      }

      case 'zips': {
        const { data: zips } = await supabase
          .from('us_zipcodes')
          .select('zipcode')
          .range(offset, offset + limit - 1);
        if (zips) {
          urls = zips.map(z => `${BASE_URL}/marketplace/zip/${z.zipcode}`);
        }
        break;
      }

      case 'zips-categories': {
        const { data: categories } = await supabase.from('seo_categories').select('slug').eq('is_active', true);
        const catsPerPage = 2;
        const catOffset = (pageNum - 1) * catsPerPage;
        const pageCats = categories?.slice(catOffset, catOffset + catsPerPage) || [];
        
        const { data: zips } = await supabase.from('us_zipcodes').select('zipcode');
        if (zips && pageCats.length > 0) {
          for (const zip of zips) {
            for (const cat of pageCats) {
              urls.push(`${BASE_URL}/marketplace/zip/${zip.zipcode}/${cat.slug}`);
            }
          }
        }
        break;
      }

      case 'vehicles-cities': {
        const { data: vehicles } = await supabase.from('seo_vehicles').select('slug');
        const { data: cities } = await supabase
          .from('us_cities')
          .select('slug')
          .range(offset, offset + limit - 1);
        if (vehicles && cities) {
          for (const vehicle of vehicles) {
            for (const city of cities) {
              urls.push(`${BASE_URL}/marketplace/vehicles/${vehicle.slug}/${city.slug}`);
            }
          }
        }
        break;
      }

      case 'vehicles-zips': {
        const { data: vehicles } = await supabase.from('seo_vehicles').select('slug');
        const zipsPerVehiclePage = 300;
        const zipOffset = (pageNum - 1) * zipsPerVehiclePage;
        
        const { data: zips } = await supabase
          .from('us_zipcodes')
          .select('zipcode')
          .range(zipOffset, zipOffset + zipsPerVehiclePage - 1);
        
        if (vehicles && zips) {
          for (const vehicle of vehicles) {
            for (const zip of zips) {
              urls.push(`${BASE_URL}/marketplace/vehicles/${vehicle.slug}/zip/${zip.zipcode}`);
            }
          }
        }
        break;
      }

      case 'neighborhoods': {
        const { data: neighborhoods } = await supabase.from('us_neighborhoods').select('slug, city_slug');
        const { data: categories } = await supabase.from('seo_categories').select('slug').eq('is_active', true);
        if (neighborhoods) {
          for (const n of neighborhoods) {
            urls.push(`${BASE_URL}/marketplace/${n.city_slug}/${n.slug}`);
            if (categories) {
              for (const cat of categories) {
                urls.push(`${BASE_URL}/marketplace/${n.city_slug}/${n.slug}/${cat.slug}`);
              }
            }
          }
        }
        break;
      }

      default:
        return res.status(400).send('Invalid sitemap type');
    }

    // Generate XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    for (const url of urls) {
      xml += `  <url><loc>${url}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>\n`;
    }
    xml += '</urlset>';

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 's-maxage=86400');
    res.status(200).send(xml);

  } catch (error) {
    console.error('Sitemap error:', error);
    res.status(500).send('Error generating sitemap');
  }
}
