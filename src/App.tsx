import React, { useState, useEffect, useMemo, useRef } from "react";
import emailjs from "@emailjs/browser";
import { supabase } from "./lib/supabase";
import {
  Search,
  MapPin,
  Heart,
  MessageCircle,
  Send,
  Package,
  Truck,
  Shield,
  Camera,
  Phone,
  Mail,
  ChevronRight,
  ChevronLeft,
  Star,
  Check,
  X,
  User,
  Menu,
  HelpCircle,
  Edit,
  Save,
  MoreHorizontal,
  Grid,
  List,
  SlidersHorizontal,
  MessageSquare,
  Home,
  Sofa,
  Car,
  Laptop,
  ShoppingBag,
  Baby,
  Dumbbell,
  Wrench,
  Shirt,
  Book,
  Briefcase,
  Music,
  Gamepad2,
  PawPrint,
  Building,
  Activity,
  Share2, // ADD THIS
  Lock, // ← ADD THIS (used at lines 4058, 4261, 4262)
  ExternalLink, // ← ADD THIS (used at line 4663)
  Calendar, // ← ADD THIS (used at line 5105)
  Clock, // ← ADD THIS (used at line 5172)
  Eye, 
} from "lucide-react";

// ============================================
// 🚀 URL ROUTING SYSTEM - HANDLES 7M+ PAGES
// ============================================

interface RouteParams {
  city?: string;
  state?: string;
  category?: string;
  neighborhood?: string;
  zipCode?: string;
  searchQuery?: string;
  itemId?: string;
}

function parseURL(path: string): RouteParams | null {
  path = path.replace(/^\/|\/$/g, "");
  const segments = path.split("/");

  // /marketplace/{city-state}
  if (segments.length === 2 && segments[0] === "marketplace") {
    const cityState = segments[1];
    const match = cityState.match(/^(.+)-([a-z]{2})$/i);
    if (match) {
      return {
        city: match[1].replace(/-/g, " "),
        state: match[2].toUpperCase(),
      };
    }
  }

  // /marketplace/{city-state}/{category}
  if (segments.length === 3 && segments[0] === "marketplace") {
    const cityState = segments[1];
    const match = cityState.match(/^(.+)-([a-z]{2})$/i);
    if (match) {
      return {
        city: match[1].replace(/-/g, " "),
        state: match[2].toUpperCase(),
        category: segments[2].replace(/-/g, " "),
      };
    }
  }

  // /marketplace/zip/{zipcode}
  if (
    segments.length === 3 &&
    segments[0] === "marketplace" &&
    segments[1] === "zip"
  ) {
    return { zipCode: segments[2] };
  }

  // /marketplace/zip/{zipcode}/{category}
  if (
    segments.length === 4 &&
    segments[0] === "marketplace" &&
    segments[1] === "zip"
  ) {
    return {
      zipCode: segments[2],
      category: segments[3].replace(/-/g, " "),
    };
  }

  return null;
}

// ============================================
// 🎯 CUSTOM 404 PAGE - CORRECTED JSX
// ============================================

interface Custom404PageProps {
  setCurrentPage: (page: string) => void;
  setActiveView: (view: string) => void;
  setIs404: (value: boolean) => void;
}

const Custom404Page: React.FC<Custom404PageProps> = ({
  setCurrentPage,
  setActiveView,
  setIs404,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = window.innerWidth < 768;

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();

      const cityMap: Record<string, string> = {
        "new york": "cities/new-york-ny",
        nyc: "cities/new-york-ny",
        "los angeles": "cities/los-angeles-ca",
        la: "cities/los-angeles-ca",
        chicago: "cities/chicago-il",
      };

      for (const [cityName, cityPage] of Object.entries(cityMap)) {
        if (query.includes(cityName)) {
          setCurrentPage(cityPage);
          setActiveView("landing");
          setIs404(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      }

      setActiveView("browse");
      setIs404(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const popularPages = [
    { url: "/", title: "Home", icon: "🏠" },
    { url: "/marketplace/new-york-ny", title: "New York", icon: "🗽" },
    { url: "/marketplace/los-angeles-ca", title: "Los Angeles", icon: "🌴" },
    { url: "/marketplace/chicago-il", title: "Chicago", icon: "🌃" },
    {
      url: "/marketplace/new-york-ny/furniture",
      title: "NYC Furniture",
      icon: "🛋️",
    },
    {
      url: "/marketplace/los-angeles-ca/electronics",
      title: "LA Electronics",
      icon: "💻",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FFF8F5" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #FFE5F8 0%, #E5F8FF 100%)",
          padding: isMobile ? "80px 20px" : "120px 32px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div
            style={{
              fontSize: isMobile ? "80px" : "120px",
              marginBottom: "32px",
            }}
          >
            🔍
          </div>
          <h1
            style={{
              fontSize: isMobile ? "36px" : "56px",
              fontWeight: 800,
              color: "#5A5A5A",
              marginBottom: "24px",
              letterSpacing: "-1px",
            }}
          >
            Oops! Page Not Found
          </h1>
          <p
            style={{
              fontSize: isMobile ? "18px" : "22px",
              color: "#8A8A8A",
              marginBottom: "48px",
              lineHeight: 1.7,
            }}
          >
            But we have millions of marketplace items waiting for you!
          </p>

          <div
            style={{
              maxWidth: "600px",
              margin: "0 auto 24px",
              position: "relative",
            }}
          >
            <input
              type="text"
              placeholder="Search for items, cities, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              style={{
                width: "100%",
                padding: "20px 60px 20px 24px",
                fontSize: "18px",
                border: "3px solid #FFE5DB",
                borderRadius: "16px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                padding: "12px 24px",
                backgroundColor: "#FFB84D",
                border: "none",
                borderRadius: "12px",
                color: "white",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <Search size={20} />
            </button>
          </div>

          <p style={{ fontSize: "14px", color: "#ABABAB" }}>
            Try "furniture Chicago" or "electronics 90210"
          </p>
        </div>
      </div>

      <div
        style={{
          padding: isMobile ? "60px 20px" : "80px 32px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? "28px" : "36px",
            fontWeight: 700,
            color: "#5A5A5A",
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          Popular Pages
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: "24px",
          }}
        >
          {popularPages.map((page, idx) => (
            <div
              key={idx}
              onClick={() => {
                setCurrentPage(
                  page.url === "/"
                    ? "home"
                    : page.url.replace("/marketplace/", "cities/")
                );
                setActiveView("landing");
                setIs404(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                backgroundColor: "white",
                padding: "32px",
                borderRadius: "16px",
                border: "2px solid #FFE5DB",
                textAlign: "center",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-4px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>
                {page.icon}
              </div>
              <div
                style={{ fontSize: "18px", fontWeight: 600, color: "#5A5A5A" }}
              >
                {page.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          background: "linear-gradient(135deg, #FFB84D 0%, #FFD4A0 100%)",
          padding: isMobile ? "60px 20px" : "80px 32px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: isMobile ? "32px" : "42px",
              fontWeight: 800,
              color: "white",
              marginBottom: "24px",
            }}
          >
            Need Help?
          </h2>
          <p
            style={{
              fontSize: isMobile ? "18px" : "20px",
              color: "rgba(255,255,255,0.95)",
              marginBottom: "32px",
              lineHeight: 1.7,
            }}
          >
            Our team is here 24/7 to help you find what you need
          </p>
          <button
            onClick={() => {
              setCurrentPage("contact");
              setActiveView("landing");
              setIs404(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{
              padding: isMobile ? "16px 32px" : "18px 48px",
              backgroundColor: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "18px",
              fontWeight: 700,
              color: "#FFB84D",
              cursor: "pointer",
            }}
          >
            Contact Support →
          </button>
        </div>
      </div>
    </div>
  );
};
// ============================================
// 🌟 NUCLEAR SEO DYNAMIC MARKETPLACE TEMPLATE
// Optimized for 7M+ URLs with MAX ranking power
// ============================================


interface DynamicPageProps {
  city?: string;
  state?: string;
  category?: string;
  neighborhood?: string;
  zipCode?: string;
  searchQuery?: string;
  setSelectedListing: (listing: any) => void;
  setShowDetail: (show: boolean) => void; // NEW LINE
}

interface URLParams {
  city?: string;
  state?: string;
  category?: string;
  neighborhood?: string;
  zipCode?: string;
  searchQuery?: string;
}
const DynamicMarketplacePage: React.FC<DynamicPageProps> = ({
  city,
  state,
  category,
  neighborhood,
  zipCode,
  searchQuery,
  setSelectedListing,
  setShowDetail, // CHANGE FROM setActiveView
}) => {
  const { isMobile } = useResponsive();
  const [listings, setListings] = useState<ListingItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Generate NUCLEAR SEO content
  const pageContent = useMemo(() => {
    // Capitalize helper
    const capitalize = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);

    let title = "";
    let h1 = "";
    let h2 = "";
    let description = "";
    let metaDescription = "";
    let keywords: string[] = [];
    let longFormContent = "";

    // Build based on URL structure
    if (category && city && state) {
      const catCap = capitalize(category);
      title = `${catCap} Delivery in ${city}, ${state} | Same-Day Service | Dibby`;
      h1 = `${catCap} Delivery in ${city}, ${state}`;
      h2 = `Professional ${catCap} Pickup, Inspection & Delivery`;
      metaDescription = `Need ${category} delivered in ${city}, ${state}? We inspect, pickup & deliver with $1M insurance. Same-day service available. Trusted by 50,000+ customers. Get instant quote!`;
      description = `Professional ${category} delivery service in ${city}, ${state}. We handle Facebook Marketplace, Craigslist, and OfferUp pickups.`;
      keywords = [
        `${category} delivery ${city}`,
        `${category} ${city} ${state}`,
        `buy ${category} ${city}`,
        `${category} pickup service`,
        `${city} ${category} delivery`,
        `marketplace delivery ${city}`,
        `used ${category} ${city}`,
        `${category} inspection ${city}`,
        `same day ${category} delivery`,
        `${category} courier ${city}`,
      ];
      longFormContent = `
        Looking for reliable ${category} delivery in ${city}, ${state}? Dibby is your trusted partner for safe, 
        insured marketplace item delivery. Whether you found ${category} on Facebook Marketplace, Craigslist, or OfferUp, 
        we handle the entire process from inspection to delivery.
        
        Our ${city} team specializes in ${category} pickup and delivery, serving all neighborhoods throughout 
        ${city} and the greater ${state} area. Every delivery includes professional inspection, secure transport, 
        and $1M insurance coverage.
        
        Why choose Dibby for ${category} delivery in ${city}? We're local, licensed, and insured. Our team knows 
        ${city} inside and out, ensuring fast, reliable service. We've completed over 100,000 deliveries with a 
        4.9-star rating.
      `;
    } else if (city && state) {
      title = `Marketplace Delivery ${city}, ${state} | Facebook, Craigslist & OfferUp | Dibby`;
      h1 = `Marketplace Delivery in ${city}, ${state}`;
      h2 = `Your Trusted Delivery Partner in ${city}`;
      metaDescription = `Professional marketplace delivery in ${city}, ${state}. We inspect & deliver items from Facebook Marketplace, Craigslist, OfferUp. $1M insured. Same-day available. 50K+ happy customers.`;
      description = `Complete marketplace delivery service for ${city}, ${state}. From furniture to electronics, we handle it all.`;
      keywords = [
        `marketplace delivery ${city}`,
        `${city} delivery service`,
        `facebook marketplace ${city}`,
        `craigslist delivery ${city}`,
        `offerup ${city}`,
        `item delivery ${city}`,
        `${city} ${state} delivery`,
        `pickup service ${city}`,
        `courier ${city}`,
      ];
      longFormContent = `
        Welcome to Dibby's ${city}, ${state} marketplace delivery service. We're your local solution for safe, 
        insured delivery of items purchased on Facebook Marketplace, Craigslist, and OfferUp.
        
        Serving all of ${city} and surrounding ${state} communities, we provide white-glove delivery service with 
        $1M insurance coverage. Our team of professional drivers knows every neighborhood in ${city}, ensuring 
        your items arrive safely and on time.
        
        From furniture and electronics to vehicles and appliances, we handle it all. Every delivery includes 
        professional inspection, photo documentation, and real-time tracking. Join 50,000+ customers who trust 
        Dibby for their marketplace purchases.
      `;
    } else if (zipCode && category) {
      const catCap = capitalize(category);
      title = `${catCap} near ZIP ${zipCode} | Local Delivery & Inspection | Dibby`;
      h1 = `${catCap} Delivery near ${zipCode}`;
      h2 = `Find & Deliver ${catCap} in Your Area`;
      metaDescription = `Browse ${category} in ZIP code ${zipCode}. Professional inspection and same-day delivery available. $1M insured. Compare prices from Facebook Marketplace, Craigslist & OfferUp.`;
      description = `Local ${category} delivery serving ZIP code ${zipCode} and surrounding areas.`;
      keywords = [
        `${category} ${zipCode}`,
        `${category} near me`,
        `${zipCode} delivery`,
        `buy ${category} ${zipCode}`,
        `${category} delivery near ${zipCode}`,
      ];
      longFormContent = `
        Shopping for ${category} near ZIP code ${zipCode}? Dibby makes it easy to find, inspect, and deliver 
        ${category} from local sellers. We serve ${zipCode} and all surrounding ZIP codes with same-day delivery 
        options.
        
        Browse ${category} listings from Facebook Marketplace, Craigslist, and OfferUp. Once you find what you want, 
        we handle everything - inspection, pickup, and insured delivery right to your door. Every delivery in the 
        ${zipCode} area includes $1M insurance coverage.
      `;
    } else if (zipCode) {
      title = `Marketplace Delivery ZIP ${zipCode} | Local Pickup & Delivery Service | Dibby`;
      h1 = `Marketplace Delivery for ${zipCode}`;
      h2 = `Your Local Delivery Solution`;
      metaDescription = `Professional marketplace delivery serving ZIP ${zipCode}. We pickup & deliver items from Facebook Marketplace, Craigslist, OfferUp. $1M insured. Same-day available. Get instant quote!`;
      description = `Complete delivery service for ZIP code ${zipCode}. All items fully insured.`;
      keywords = [
        `${zipCode} delivery`,
        `marketplace ${zipCode}`,
        `delivery near ${zipCode}`,
        `${zipCode} pickup service`,
        `courier ${zipCode}`,
      ];
      longFormContent = `
        Dibby provides professional marketplace delivery for ZIP code ${zipCode} and surrounding areas. Whether you're 
        buying furniture, electronics, or any other item from local sellers, we've got you covered.
        
        Our ${zipCode} delivery service includes professional inspection, secure pickup, and insured delivery. We work 
        with all major marketplaces including Facebook Marketplace, Craigslist, and OfferUp. Every delivery includes 
        $1M insurance coverage and real-time tracking.
      `;
    } else if (searchQuery) {
      const queryCap = searchQuery
        .split(" ")
        .map((w) => capitalize(w))
        .join(" ");
      title = `${queryCap} | Marketplace Delivery & Inspection | Dibby`;
      h1 = queryCap;
      h2 = `Find ${queryCap} Near You`;
      metaDescription = `Search results for ${searchQuery}. Professional delivery and inspection service with $1M insurance. Browse Facebook Marketplace, Craigslist & OfferUp listings.`;
      description = `Browse ${searchQuery} with professional delivery service.`;
      keywords = searchQuery.split(" ");
      longFormContent = `
        Search results for ${searchQuery}. Dibby helps you find, inspect, and deliver items from online marketplaces 
        with complete peace of mind. Every delivery includes $1M insurance coverage and professional inspection.
      `;
    }

    return {
      title,
      h1,
      h2,
      description,
      metaDescription,
      keywords: keywords.join(", "),
      longFormContent,
      canonical: buildCanonicalURL({
        city,
        state,
        category,
        neighborhood,
        zipCode,
        searchQuery,
      }),
    };
  }, [city, state, category, neighborhood, zipCode, searchQuery]);

  // Fetch listings from Supabase
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);

      try {
        let query = supabase
          .from("listings")
          .select("*")
          .order("scraped_at", { ascending: false });

        // Filter by city
        if (city && state) {
          const citySlug = `${city
            .toLowerCase()
            .replace(/\s+/g, "-")}-${state.toLowerCase()}`;
          query = query.eq("city_slug", citySlug);
          console.log("🔍 Filtering by city_slug:", citySlug);
        }

        // Filter by category
        if (category) {
          query = query.eq("category_name", category);
          console.log("🔍 Filtering by category:", category);
        }

        // Execute query
        const { data, error } = await query.limit(50);

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }

        console.log("✅ Fetched listings:", data?.length || 0);
        setListings(data || []);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [city, state, category, zipCode]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FFF8F5" }}>
      {/* NUCLEAR SEO HEAD */}
      <SEOHead
        title={pageContent.title}
        description={pageContent.metaDescription}
        canonical={pageContent.canonical}
        keywords={pageContent.keywords}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: pageContent.h1,
          description: pageContent.description,
          provider: {
            "@type": "LocalBusiness",
            name: "Dibby",
            url: "https://dibby.com",
            telephone: "1-800-DIBBY-00",
            priceRange: "$49-$150",
            image: "https://dibby.com/logo.png",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "50000",
            },
          },
          areaServed:
            city && state
              ? {
                  "@type": "City",
                  name: city,
                  state: state,
                }
              : zipCode
              ? {
                  "@type": "PostalCode",
                  postalCode: zipCode,
                }
              : undefined,
          offers: {
            "@type": "Offer",
            priceRange: "$49-$150",
            availability: "https://schema.org/InStock",
            priceCurrency: "USD",
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: category
              ? `${category} delivery services`
              : "Marketplace delivery services",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Inspection Service",
                  description:
                    "Professional item inspection with photos and video",
                },
                price: "49",
                priceCurrency: "USD",
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Delivery Service",
                  description: "Safe pickup and delivery with $1M insurance",
                },
                price: "75",
                priceCurrency: "USD",
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Full Service",
                  description:
                    "Complete inspection, pickup, and delivery package",
                },
                price: "150",
                priceCurrency: "USD",
              },
            ],
          },
        }}
      />

      {/* Breadcrumbs */}
      <Breadcrumb
        items={[
          { name: "Home", url: "/" },
          { name: "Marketplace", url: "/marketplace" },
          ...(city && state
            ? [
                {
                  name: `${city}, ${state}`,
                  url: `/marketplace/${city
                    .toLowerCase()
                    .replace(/\s+/g, "-")}-${state.toLowerCase()}`,
                },
              ]
            : []),
          ...(category
            ? [
                {
                  name: category.charAt(0).toUpperCase() + category.slice(1),
                  url: "",
                },
              ]
            : []),
        ]}
      />

      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #FFB84D 0%, #FF9F1C 100%)",
          padding: isMobile ? "60px 20px" : "100px 32px",
          textAlign: "center",
          color: "#FFFFFF",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: isMobile ? "32px" : "48px",
              fontWeight: 800,
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            {pageContent.h1}
          </h1>
          <h2
            style={{
              fontSize: isMobile ? "20px" : "28px",
              fontWeight: 600,
              marginBottom: "20px",
              opacity: 0.95,
            }}
          >
            {pageContent.h2}
          </h2>
          <p
            style={{
              fontSize: isMobile ? "16px" : "20px",
              marginBottom: "32px",
              opacity: 0.9,
              maxWidth: "700px",
              margin: "0 auto 32px",
              lineHeight: 1.6,
            }}
          >
            {pageContent.description}
          </p>

          {/* Trust Indicators in Hero */}
          <div
            style={{
              display: "flex",
              gap: isMobile ? "16px" : "32px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "32px",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            <div>⭐ 4.9/5 Rating</div>
            <div>🛡️ $1M Insured</div>
            <div>👥 50K+ Customers</div>
            <div>🚚 Same-Day Available</div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => {
                const calcEl = document.getElementById("instant-quote");
                if (calcEl) calcEl.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                padding: isMobile ? "14px 28px" : "16px 40px",
                backgroundColor: "#FFFFFF",
                color: "#FFB84D",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              Get Instant Quote →
            </button>
            <button
              onClick={() => {
                window.history.pushState({}, "", "/marketplace");
                window.dispatchEvent(new PopStateEvent("popstate"));
              }}
              style={{
                padding: isMobile ? "14px 28px" : "16px 40px",
                backgroundColor: "transparent",
                color: "#FFFFFF",
                border: "2px solid #FFFFFF",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              Browse Listings
            </button>
          </div>
        </div>
      </div>

      {/* SEO-Rich Long-Form Content */}
      <div
        style={{
          padding: isMobile ? "60px 20px" : "80px 32px",
          backgroundColor: "white",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            style={{
              fontSize: "17px",
              color: "#5A5A5A",
              lineHeight: 1.8,
              marginBottom: "48px",
            }}
          >
            {pageContent.longFormContent.split("\n").map(
              (para, idx) =>
                para.trim() && (
                  <p key={idx} style={{ marginBottom: "16px" }}>
                    {para.trim()}
                  </p>
                )
            )}
          </div>

          {/* Service Highlights Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: "24px",
              marginTop: "48px",
            }}
          >
            {[
              {
                icon: "🔍",
                title: "Professional Inspection",
                description: `Every ${
                  category || "item"
                } is thoroughly inspected before purchase. Get HD photos, videos, and detailed condition reports.`,
              },
              {
                icon: "🚚",
                title: "Insured Delivery",
                description: `$1M insurance coverage on every delivery${
                  city ? ` in ${city}` : ""
                }. Your items are protected from pickup to doorstep.`,
              },
              {
                icon: "⚡",
                title: "Same-Day Service",
                description: `Need it fast? We offer same-day pickup and delivery${
                  city ? ` throughout ${city}` : ""
                }. Most orders completed in 24-48 hours.`,
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                style={{
                  padding: "32px",
                  backgroundColor: "#FFF8F5",
                  borderRadius: "16px",
                  border: "2px solid #FFE5DB",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#5A5A5A",
                    marginBottom: "12px",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#8A8A8A",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div
        style={{
          padding: isMobile ? "60px 20px" : "80px 32px",
          backgroundColor: "#FFF8F5",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: isMobile ? "28px" : "36px",
              fontWeight: 700,
              color: "#5A5A5A",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            How{" "}
            {category
              ? `${category.charAt(0).toUpperCase() + category.slice(1)} `
              : ""}
            Delivery Works
            {city && ` in ${city}`}
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#8A8A8A",
              textAlign: "center",
              marginBottom: "48px",
              maxWidth: "700px",
              margin: "0 auto 48px",
            }}
          >
            Simple, fast, and secure delivery in 3 easy steps
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: "32px",
            }}
          >
            {[
              {
                number: "1",
                title: "Submit Listing",
                description: `Found ${
                  category || "something"
                } you want? Just paste the marketplace URL. We'll review and provide an instant quote.`,
                color: "#FFE5DB",
              },
              {
                number: "2",
                title: "We Inspect",
                description:
                  "Our team inspects the item, takes photos/videos, and sends you a detailed condition report before pickup.",
                color: "#F0E5F5",
              },
              {
                number: "3",
                title: "Safe Delivery",
                description: `We pickup and deliver${
                  city ? ` anywhere in ${city}` : ""
                } with $1M insurance. Track your delivery in real-time.`,
                color: "#E0F5ED",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "white",
                  padding: "40px 32px",
                  borderRadius: "16px",
                  border: `3px solid ${step.color}`,
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: step.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                    fontSize: "32px",
                    fontWeight: 800,
                    color: "#5A5A5A",
                  }}
                >
                  {step.number}
                </div>
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#5A5A5A",
                    marginBottom: "12px",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#8A8A8A",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic FAQ Section */}
      <div
        style={{
          padding: isMobile ? "60px 20px" : "80px 32px",
          backgroundColor: "white",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: isMobile ? "28px" : "36px",
              fontWeight: 700,
              color: "#5A5A5A",
              marginBottom: "48px",
              textAlign: "center",
            }}
          >
            Frequently Asked Questions
          </h2>

          {generateDynamicFAQs({ city, state, category, zipCode }).map(
            (faq, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#FFF8F5",
                  padding: "24px",
                  borderRadius: "12px",
                  border: "2px solid #FFE5DB",
                  marginBottom: "16px",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#5A5A5A",
                    marginBottom: "12px",
                  }}
                >
                  {faq.question}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#8A8A8A",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div
        id="instant-quote"
        style={{
          background: "linear-gradient(135deg, #FFB84D 0%, #FFD4A0 100%)",
          padding: isMobile ? "60px 20px" : "80px 32px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: isMobile ? "32px" : "42px",
              fontWeight: 800,
              color: "white",
              marginBottom: "20px",
            }}
          >
            Ready to Get Started{city && ` in ${city}`}?
          </h2>
          <p
            style={{
              fontSize: isMobile ? "18px" : "20px",
              color: "rgba(255,255,255,0.95)",
              marginBottom: "32px",
              lineHeight: 1.6,
            }}
          >
            Get an instant quote for {category || "your item"} delivery. Most
            services completed within 24-48 hours.
          </p>
          <button
            onClick={() => {
              window.history.pushState({}, "", "/calculator");
              window.dispatchEvent(new PopStateEvent("popstate"));
            }}
            style={{
              padding: isMobile ? "16px 32px" : "18px 48px",
              backgroundColor: "white",
              color: "#FFB84D",
              border: "none",
              borderRadius: "12px",
              fontSize: "18px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            Get Instant Quote →
          </button>
        </div>
      </div>
      {/* LISTINGS GRID */}
      <div
        style={{
          padding: isMobile ? "60px 20px" : "80px 32px",
          backgroundColor: "white",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: isMobile ? "28px" : "36px",
              fontWeight: 700,
              color: "#5A5A5A",
              marginBottom: "32px",
              textAlign: "center",
            }}
          >
            {category
              ? `${
                  category.charAt(0).toUpperCase() + category.slice(1)
                } in ${city}, ${state}`
              : city
              ? `Marketplace Listings in ${city}, ${state}`
              : "Marketplace Listings"}
          </h2>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  border: "4px solid #FFE5DB",
                  borderTop: "4px solid #FFB84D",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto",
                }}
              />
              <p style={{ marginTop: "20px", color: "#8A8A8A" }}>
                Loading listings...
              </p>
            </div>
          ) : listings.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ fontSize: "64px", marginBottom: "20px" }}>📭</div>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#5A5A5A",
                  marginBottom: "12px",
                }}
              >
                No listings found
              </h3>
              <p style={{ fontSize: "16px", color: "#8A8A8A" }}>
                Check back soon or try browsing other categories
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "repeat(2, 1fr)"
                  : "repeat(auto-fill, minmax(280px, 1fr))",
                gap: isMobile ? "16px" : "24px",
              }}
            >
              {listings.map((listing: any) => (
                <div
                  key={listing.id}
                  onClick={() => {
                    setSelectedListing(listing);
                    setShowDetail(true); // CORRECT
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  style={{
                    backgroundColor: "#FFF8F5",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: "2px solid #FFE5DB",
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(255,184,77,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: isMobile ? "150px" : "200px",
                      backgroundColor: "#E5E5E5",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {listing.images && listing.images.length > 0 ? (
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            parent.innerHTML =
                              '<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:48px;">📦</div>';
                          }
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          fontSize: "48px",
                        }}
                      >
                        📦
                      </div>
                    )}
                  </div>

                  <div style={{ padding: "16px" }}>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#FFB84D",
                        marginBottom: "8px",
                      }}
                    >
                      {listing.formatted_price || "Contact for price"}
                    </div>

                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#5A5A5A",
                        marginBottom: "8px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        lineHeight: "1.4",
                        minHeight: "42px",
                      }}
                    >
                      {listing.title}
                    </div>

                    <div
                      style={{
                        fontSize: "13px",
                        color: "#8A8A8A",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      📍 {listing.city}, {listing.state}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to generate dynamic FAQs
function generateDynamicFAQs(params: URLParams) {  const { city, state, category, zipCode } = params;
  const catCap = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "items";

  const faqs = [];

  if (city && category) {
    faqs.push({
      question: `How much does ${category} delivery cost in ${city}, ${state}?`,
      answer: `${catCap} delivery in ${city} starts at $75. Final pricing depends on item size, distance, and service level. Use our instant quote calculator for exact pricing. We also offer inspection-only service starting at $49.`,
    });
    faqs.push({
      question: `Do you deliver ${category} to all neighborhoods in ${city}?`,
      answer: `Yes! We serve all neighborhoods throughout ${city}, ${state} and surrounding areas. Our team knows ${city} inside and out, ensuring fast and reliable delivery no matter where you're located.`,
    });
    faqs.push({
      question: `Can you inspect ${category} before I buy it?`,
      answer: `Absolutely! Our professional inspection service includes HD photos, videos, and a detailed condition report of the ${category}. We check for damage, functionality, and verify it matches the listing. This helps you make confident purchasing decisions.`,
    });
  } else if (city) {
    faqs.push({
      question: `What areas of ${city} do you serve?`,
      answer: `We serve all of ${city}, ${state} including downtown, suburbs, and surrounding communities. Our local team provides service throughout the entire ${city} metropolitan area with same-day delivery options available.`,
    });
    faqs.push({
      question: `How quickly can you deliver in ${city}?`,
      answer: `Most deliveries in ${city} are completed within 24-48 hours. We also offer same-day delivery for urgent requests. Our team coordinates directly with sellers to schedule the fastest possible pickup and delivery time.`,
    });
  }

  if (category) {
    faqs.push({
      question: `What marketplaces do you work with for ${category}?`,
      answer: `We handle ${category} from all major marketplaces including Facebook Marketplace, Craigslist, OfferUp, and Letgo. Simply send us the listing URL and we'll take care of the rest.`,
    });
  }

  faqs.push({
    question: "Is my delivery insured?",
    answer:
      "Yes! Every delivery includes $1M insurance coverage from pickup to delivery. Your items are protected against damage, loss, or theft. We also provide photo documentation throughout the entire process for added peace of mind.",
  });

  faqs.push({
    question: "How does the inspection service work?",
    answer:
      "Our team visits the seller, inspects the item thoroughly, and sends you HD photos and videos along with a detailed condition report. We check for any damage, verify functionality, and ensure the item matches the listing description. You receive all documentation before we complete the pickup.",
  });

  faqs.push({
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, and digital payment methods. Payment is securely processed through our platform. You can get an instant quote and complete booking online in just a few minutes.",
  });

  return faqs;
}

// Helper function to build canonical URL
function buildCanonicalURL(params: URLParams): string {
  let url = "/marketplace";

  if (params.city && params.state) {
    url += `/${params.city
      .toLowerCase()
      .replace(/\s+/g, "-")}-${params.state.toLowerCase()}`;
  }

  if (params.neighborhood) {
    url += `/${params.neighborhood.toLowerCase().replace(/\s+/g, "-")}`;
  }

  if (params.category) {
    url += `/${params.category.toLowerCase().replace(/\s+/g, "-")}`;
  }

  if (params.zipCode) {
    url = "/marketplace/zip/" + params.zipCode;
    if (params.category) {
      url += `/${params.category.toLowerCase().replace(/\s+/g, "-")}`;
    }
  }

  return url;
}

// ============================================
// TYPESCRIPT INTERFACES & TYPES
// ============================================
interface ListingItem {
  id: string;
  marketplace_listing_title?: string;
  listing_price?: { amount: string };
  location?: { reverse_geocode?: { city: string; state: string } };
  primary_listing_photo?: { photo_image_url: string };
  listing_photos?: Array<{ photo_image_url: string }>;
  custom_sub_titles_with_rendering_flags?: Array<{ subtitle: string }>;
  marketplace_listing_category_id?: string;
  listing_video?: any;
  creation_time?: number;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isRead: boolean;
}

interface Conversation {
  id: string;
  listingId: string;
  listing: ListingItem;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  messages: Message[];
  lastMessage: Date;
}

interface Category {
  id: string;
  name: string;
  query: string;
  icon: any;
  color: string;
  type?: "vehicle" | "property" | "general";
}

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "warning";
}

interface FilterChip {
  key: string;
  label: string;
  value: string;
}

interface City {
  name: string;
  state: string;
  slug: string;
  zip: string;
  lat?: string;
  lng?: string;
}

interface Service {
  id: string;
  name: string;
  slug: string;
  price: number;
  description?: string;
}

interface Marketplace {
  name: string;
  slug: string;
}

// ============================================
// COMPREHENSIVE SEO CONFIGURATION - ENHANCED WITH ALL NEW FEATURES
// ============================================
const SEO_CONFIG = {
  site: {
    name: "Dibby",
    url: "https://dibby.com",
    logo: "https://dibby.com/logo.png",
    description:
      "Professional marketplace delivery and inspection service. We inspect, pick up, and deliver items from Facebook Marketplace, Craigslist, OfferUp with $1M insurance.",
    keywords: [
      "marketplace delivery",
      "facebook marketplace pickup",
      "craigslist delivery service",
      "offerup inspection",
      "safe online shopping",
      "furniture delivery service",
      "property tour service",
      "item inspection service",
      "insured delivery",
      "white glove delivery",
    ],
    social: {
      twitter: "@dibby",
      facebook: "https://facebook.com/dibby",
      instagram: "https://instagram.com/dibby",
      linkedin: "https://linkedin.com/company/dibby",
      youtube: "https://youtube.com/@dibby",
    },
  },
  services: [
    {
      id: "inspection",
      name: "Inspection Service",
      slug: "inspection",
      price: 49,
      description:
        "Professional photo and video inspection of any marketplace listing with detailed condition report delivered within 24 hours.",
    },
    {
      id: "delivery",
      name: "Delivery Service",
      slug: "delivery",
      price: 75,
      description:
        "Safe pickup and delivery of marketplace items with professional handling and $1M insurance coverage.",
    },
    {
      id: "full-service",
      name: "Full Service",
      slug: "full-service",
      price: 150,
      description:
        "Complete inspection and delivery package with $1M insurance, real-time tracking, and white-glove service.",
    },
    {
      id: "property-tour",
      name: "Property Tour",
      slug: "property-tour",
      price: 49,
      description:
        "Virtual property tours with detailed video walkthrough, photos of every room, and condition assessment for remote renters and buyers.",
    },
  ],
  items: [
    "furniture",
    "couch",
    "sofa",
    "sectional",
    "loveseat",
    "bed",
    "mattress",
    "dresser",
    "table",
    "dining-table",
    "coffee-table",
    "chair",
    "desk",
    "bookshelf",
    "cabinet",
    "electronics",
    "laptop",
    "computer",
    "phone",
    "iphone",
    "samsung",
    "tv",
    "television",
    "gaming-console",
    "playstation",
    "xbox",
    "nintendo",
    "monitor",
    "tablet",
    "ipad",
    "appliances",
    "refrigerator",
    "fridge",
    "washer",
    "dryer",
    "microwave",
    "dishwasher",
    "stove",
    "oven",
    "freezer",
    "ac",
    "air-conditioner",
    "heater",
    "vehicles",
    "car",
    "truck",
    "suv",
    "motorcycle",
    "bike",
    "bicycle",
    "scooter",
    "boat",
    "rv",
    "camper",
    "trailer",
    "apartment",
    "house",
    "condo",
    "studio",
    "loft",
    "room",
    "property",
    "home",
    "office",
    "commercial",
    "warehouse",
    "retail-space",
  ],
  cities: [
    {
      name: "New York",
      state: "NY",
      slug: "new-york-ny",
      zip: "10001",
      lat: "40.7128",
      lng: "-74.0060",
    },
    {
      name: "Los Angeles",
      state: "CA",
      slug: "los-angeles-ca",
      zip: "90001",
      lat: "34.0522",
      lng: "-118.2437",
    },
    {
      name: "Chicago",
      state: "IL",
      slug: "chicago-il",
      zip: "60601",
      lat: "41.8781",
      lng: "-87.6298",
    },
    {
      name: "Houston",
      state: "TX",
      slug: "houston-tx",
      zip: "77001",
      lat: "29.7604",
      lng: "-95.3698",
    },
    {
      name: "Phoenix",
      state: "AZ",
      slug: "phoenix-az",
      zip: "85001",
      lat: "33.4484",
      lng: "-112.0740",
    },
    {
      name: "Philadelphia",
      state: "PA",
      slug: "philadelphia-pa",
      zip: "19101",
      lat: "39.9526",
      lng: "-75.1652",
    },
    {
      name: "San Antonio",
      state: "TX",
      slug: "san-antonio-tx",
      zip: "78201",
      lat: "29.4241",
      lng: "-98.4936",
    },
    {
      name: "San Diego",
      state: "CA",
      slug: "san-diego-ca",
      zip: "92101",
      lat: "32.7157",
      lng: "-117.1611",
    },
    {
      name: "Dallas",
      state: "TX",
      slug: "dallas-tx",
      zip: "75201",
      lat: "32.7767",
      lng: "-96.7970",
    },
    {
      name: "San Jose",
      state: "CA",
      slug: "san-jose-ca",
      zip: "95101",
      lat: "37.3382",
      lng: "-121.8863",
    },
    {
      name: "Austin",
      state: "TX",
      slug: "austin-tx",
      zip: "78701",
      lat: "30.2672",
      lng: "-97.7431",
    },
    {
      name: "Jacksonville",
      state: "FL",
      slug: "jacksonville-fl",
      zip: "32099",
      lat: "30.3322",
      lng: "-81.6557",
    },
    {
      name: "Fort Worth",
      state: "TX",
      slug: "fort-worth-tx",
      zip: "76101",
      lat: "32.7555",
      lng: "-97.3308",
    },
    {
      name: "Columbus",
      state: "OH",
      slug: "columbus-oh",
      zip: "43004",
      lat: "39.9612",
      lng: "-82.9988",
    },
    {
      name: "Charlotte",
      state: "NC",
      slug: "charlotte-nc",
      zip: "28201",
      lat: "35.2271",
      lng: "-80.8431",
    },
    {
      name: "San Francisco",
      state: "CA",
      slug: "san-francisco-ca",
      zip: "94101",
      lat: "37.7749",
      lng: "-122.4194",
    },
    {
      name: "Indianapolis",
      state: "IN",
      slug: "indianapolis-in",
      zip: "46201",
      lat: "39.7684",
      lng: "-86.1581",
    },
    {
      name: "Seattle",
      state: "WA",
      slug: "seattle-wa",
      zip: "98101",
      lat: "47.6062",
      lng: "-122.3321",
    },
    {
      name: "Denver",
      state: "CO",
      slug: "denver-co",
      zip: "80201",
      lat: "39.7392",
      lng: "-104.9903",
    },
    {
      name: "Boston",
      state: "MA",
      slug: "boston-ma",
      zip: "02101",
      lat: "42.3601",
      lng: "-71.0589",
    },
    {
      name: "Nashville",
      state: "TN",
      slug: "nashville-tn",
      zip: "37201",
      lat: "36.1627",
      lng: "-86.7816",
    },
    {
      name: "Detroit",
      state: "MI",
      slug: "detroit-mi",
      zip: "48201",
      lat: "42.3314",
      lng: "-83.0458",
    },
    {
      name: "Portland",
      state: "OR",
      slug: "portland-or",
      zip: "97201",
      lat: "45.5152",
      lng: "-122.6784",
    },
    {
      name: "Las Vegas",
      state: "NV",
      slug: "las-vegas-nv",
      zip: "89101",
      lat: "36.1699",
      lng: "-115.1398",
    },
    {
      name: "Memphis",
      state: "TN",
      slug: "memphis-tn",
      zip: "37501",
      lat: "35.1495",
      lng: "-90.0490",
    },
    {
      name: "Louisville",
      state: "KY",
      slug: "louisville-ky",
      zip: "40201",
      lat: "38.2527",
      lng: "-85.7585",
    },
    {
      name: "Baltimore",
      state: "MD",
      slug: "baltimore-md",
      zip: "21201",
      lat: "39.2904",
      lng: "-76.6122",
    },
    {
      name: "Milwaukee",
      state: "WI",
      slug: "milwaukee-wi",
      zip: "53201",
      lat: "43.0389",
      lng: "-87.9065",
    },
    {
      name: "Albuquerque",
      state: "NM",
      slug: "albuquerque-nm",
      zip: "87101",
      lat: "35.0844",
      lng: "-106.6504",
    },
    {
      name: "Tucson",
      state: "AZ",
      slug: "tucson-az",
      zip: "85701",
      lat: "32.2226",
      lng: "-110.9747",
    },
  ],
  marketplaces: [
    { name: "Facebook Marketplace", slug: "facebook-marketplace" },
    { name: "Craigslist", slug: "craigslist" },
    { name: "OfferUp", slug: "offerup" },
    { name: "Letgo", slug: "letgo" },
    { name: "Mercari", slug: "mercari" },
    { name: "Poshmark", slug: "poshmark" },
    { name: "eBay", slug: "ebay" },
  ],
};

// ============================================
// MARKETPLACE CATEGORIES
// ============================================
const CATEGORIES: Category[] = [
  {
    id: "vehicles",
    name: "Vehicles",
    icon: Car,
    query: "car truck suv motorcycle vehicle",
    color: "#B8E6D5",
    type: "vehicle",
  },
  {
    id: "property",
    name: "Property Rentals",
    icon: Building,
    query: "apartment rent house room rental",
    color: "#D4BFEA",
    type: "property",
  },
  {
    id: "furniture",
    name: "Furniture",
    icon: Home,
    query: "furniture couch sofa table chair bed",
    color: "#FFB84D",
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: Laptop,
    query: "phone laptop computer tv electronics",
    color: "#A8D5F5",
  },
  {
    id: "home-garden",
    name: "Home & Garden",
    icon: Package,
    query: "appliances home decor garden tools",
    color: "#FFD4A0",
  },
  {
    id: "clothing",
    name: "Clothing & Accessories",
    icon: ShoppingBag,
    query: "clothing shoes fashion accessories",
    color: "#FFE5C0",
  },
  {
    id: "baby-kids",
    name: "Baby & Kids",
    icon: Gamepad2,
    query: "baby kids toys stroller crib",
    color: "#FFB8D5",
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    icon: Activity,
    query: "bike fitness sports camping outdoor",
    color: "#B8E6D5",
  },
  {
    id: "pet-supplies",
    name: "Pet Supplies",
    icon: Home,
    query: "pet dog cat supplies food cage",
    color: "#E8D5F2",
  },
  {
    id: "hobbies",
    name: "Hobbies",
    icon: Star,
    query: "music books art collectibles hobby",
    color: "#FFE5DB",
  },
];
// ============================================
// INSPECTOR PROFILES DATA
// ============================================
const INSPECTOR_PROFILES = [
  {
    id: 1,
    name: "Marcus Johnson",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    location: "Brooklyn, NY",
    experience: "8 years",
    specialty: "Furniture & Electronics",
    inspections: 2847,
    rating: 4.9,
    verified: true,
    backgroundCheck: true,
    bio: "Former furniture restoration expert. I know what to look for in used items.",
    badges: ["🏆 Top Inspector", "✓ Background Checked", "🛡️ Insured"],
  },
  {
    id: 2,
    name: "Sarah Chen",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    location: "Los Angeles, CA",
    experience: "5 years",
    specialty: "Vehicles & Motorcycles",
    inspections: 1923,
    rating: 5.0,
    verified: true,
    backgroundCheck: true,
    bio: "ASE certified mechanic. I've inspected over 1,900 vehicles for hidden issues.",
    badges: ["⭐ Perfect Rating", "✓ ASE Certified", "🚗 Vehicle Expert"],
  },
  {
    id: 3,
    name: "David Rodriguez",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    location: "Chicago, IL",
    experience: "12 years",
    specialty: "Real Estate & Apartments",
    inspections: 4156,
    rating: 4.95,
    verified: true,
    backgroundCheck: true,
    bio: "Licensed home inspector and contractor. I tour apartments like I'm living there.",
    badges: ["🏠 Real Estate Pro", "✓ Licensed Inspector", "🔍 Detail Expert"],
  },
  {
    id: 4,
    name: "Emily Watson",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    location: "Austin, TX",
    experience: "6 years",
    specialty: "Electronics & Appliances",
    inspections: 2134,
    rating: 4.92,
    verified: true,
    backgroundCheck: true,
    bio: "Tech specialist with electrical engineering background. I test everything thoroughly.",
    badges: ["💻 Tech Expert", "✓ EE Degree", "⚡ Fast Service"],
  },
  {
    id: 5,
    name: "James Mitchell",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    location: "San Diego, CA",
    experience: "10 years",
    specialty: "General Inspection",
    inspections: 3672,
    rating: 4.88,
    verified: true,
    backgroundCheck: true,
    bio: "Jack of all trades with a keen eye for detail. No red flag goes unnoticed.",
    badges: ["🔍 Detail Master", "✓ 3600+ Inspections", "⭐ Trusted Pro"],
  },
  {
    id: 6,
    name: "Priya Patel",
    photo:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    location: "San Jose, CA",
    experience: "4 years",
    specialty: "Furniture & Home Goods",
    inspections: 1456,
    rating: 4.97,
    verified: true,
    backgroundCheck: true,
    bio: "Interior designer turned inspector. I help you find quality pieces that last.",
    badges: ["🎨 Design Pro", "✓ Quality Focus", "💎 Gem Finder"],
  },
];
// ============================================
// BEFORE/AFTER CASE STUDIES DATA
// ============================================
const CASE_STUDIES = [
  {
    id: 1,
    title: "Hidden Bed Bug Infestation Caught",
    category: "Furniture Inspection",
    location: "Brooklyn, NY",
    beforeImage:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
    afterImage:
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&h=600&fit=crop",
    savings: "$800",
    description:
      "Customer was about to buy a 'like new' couch for $400. Our inspector found bed bugs and staining hidden under cushions.",
    outcome: "Avoided purchase, found better option for $350",
    inspectorName: "Marcus Johnson",
  },
  {
    id: 2,
    title: "Vehicle Odometer Fraud Detected",
    category: "Vehicle Inspection",
    location: "Los Angeles, CA",
    beforeImage:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
    afterImage:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop",
    savings: "$4,500",
    description:
      "Seller claimed 45K miles, but our inspector found service records showing 120K+ miles and engine issues.",
    outcome: "Avoided scam, reported to authorities",
    inspectorName: "Sarah Chen",
  },
  {
    id: 3,
    title: "Water Damage in 'Perfect' Apartment",
    category: "Property Tour",
    location: "Chicago, IL",
    beforeImage:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    afterImage:
      "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?w=800&h=600&fit=crop",
    savings: "$2,400",
    description:
      "Remote renter almost signed lease sight unseen. Our tour revealed water damage, mold, and non-working appliances.",
    outcome: "Found better apartment, saved first month + deposit",
    inspectorName: "David Rodriguez",
  },
  {
    id: 4,
    title: "Electronics DOA - Caught Before Purchase",
    category: "Electronics Inspection",
    location: "Austin, TX",
    beforeImage:
      "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=800&h=600&fit=crop",
    afterImage:
      "https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=800&h=600&fit=crop",
    savings: "$650",
    description:
      "$900 MacBook listed as 'excellent condition' - wouldn't boot, had cracked screen hidden by photo angle.",
    outcome: "Seller refunded inspection fee, found working unit elsewhere",
    inspectorName: "Emily Watson",
  },
  {
    id: 5,
    title: "Furniture Doesn't Fit - Measured First",
    category: "Inspection + Delivery",
    location: "San Diego, CA",
    beforeImage:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&h=600&fit=crop",
    afterImage:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
    savings: "$200",
    description:
      "Customer wanted a sectional sofa. Our inspector measured and confirmed it was 3 inches too wide for doorway.",
    outcome: "Avoided purchase, seller offered smaller option",
    inspectorName: "James Mitchell",
  },
  {
    id: 6,
    title: "Safe Delivery - High Value Item",
    category: "Full Service",
    location: "San Jose, CA",
    beforeImage:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    afterImage:
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&h=600&fit=crop",
    savings: "$0",
    description:
      "$2,500 designer dining set - inspected condition, coordinated pickup, delivered safely with insurance.",
    outcome: "Perfect condition delivery, customer thrilled",
    inspectorName: "Priya Patel",
  },
];

// ============================================
// BLOG DATA - SEO-OPTIMIZED BLOG POSTS
// ============================================
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "How to Avoid Facebook Marketplace Scams: The Complete 2025 Guide",
    slug: "avoid-facebook-marketplace-scams",
    excerpt:
      "Learn the red flags, common scams, and proven strategies to shop safely on Facebook Marketplace without getting ripped off.",
    author: "Sarah Johnson",
    date: "2025-01-15",
    readTime: "8 min read",
    category: "Safety Tips",
    tags: ["Facebook Marketplace", "Safety", "Scams", "Online Shopping"],
    image: "🛡️",
    content: `
# How to Avoid Facebook Marketplace Scams: The Complete 2025 Guide

Facebook Marketplace has become one of the most popular platforms for buying and selling used items, but with its growth comes an increase in scams. In 2024 alone, the FTC reported over $1 billion in losses from online marketplace fraud. Don't become a statistic.

## The Most Common Facebook Marketplace Scams

### 1. The "Shipping" Scam
Scammers ask you to pay for shipping outside of Facebook Marketplace, often requesting payment through Zelle, Venmo, or wire transfer. Once you pay, the item never arrives.

**Red Flag:** Seller insists on payment outside Facebook's platform
**Solution:** Only use Facebook's built-in payment system or meet in person

### 2. The Fake Payment Confirmation
Scammers send fake screenshots of payment confirmations, claiming they've already paid. They pressure you to ship the item before the payment "clears."

**Red Flag:** Pressure to ship immediately, screenshots instead of actual payment
**Solution:** Always verify payment in your actual bank account or payment app

### 3. The Overpayment Scam
A buyer "accidentally" sends too much money and asks you to refund the difference. The original payment later bounces, leaving you out the refund amount.

**Red Flag:** Payment for more than the asking price
**Solution:** Never refund overpayments; cancel the transaction entirely

### 4. The Bait-and-Switch
The item in photos looks perfect, but when you arrive (or receive it), it's damaged, fake, or completely different.

**Red Flag:** Seller refuses video calls or additional photos
**Solution:** Use Dibby's inspection service to verify items before pickup

### 5. The Rental/Employment Scam
Fake rental listings or job offers that require upfront payment for background checks, deposits, or equipment.

**Red Flag:** Requests for money before viewing property or starting work
**Solution:** Never pay before seeing a property; legitimate employers don't charge fees

## How to Protect Yourself: The Ultimate Checklist

### Before You Buy:
- ✅ Check the seller's profile age and activity
- ✅ Look for complete, detailed listings with multiple photos
- ✅ Ask for additional photos or a video call
- ✅ Search Google Images to see if photos are stolen
- ✅ Meet in public places or use a professional inspection service
- ✅ Trust your gut - if it feels wrong, walk away

### During the Transaction:
- ✅ Use Facebook Marketplace's payment protection when available
- ✅ Inspect items thoroughly before paying
- ✅ Bring a friend to in-person meetups
- ✅ Meet at police station parking lots (many have "safe exchange zones")
- ✅ Never wire money or use untraceable payment methods
- ✅ Get everything in writing (Facebook messages are proof)

### Red Flags to Watch For:
- 🚩 Price too good to be true
- 🚩 Seller refuses to meet in person or do video calls
- 🚩 Pressure to act immediately ("other buyers interested!")
- 🚩 Poor grammar or generic responses (possible bot)
- 🚩 New profile with no other listings or reviews
- 🚩 Requests for personal information (SSN, bank details)
- 🚩 Stories that sound too dramatic or urgent

## The Dibby Solution

This is exactly why we created Dibby. Our professional inspectors:

- Visit the seller on your behalf
- Take detailed photos and videos
- Verify the item matches the listing
- Check for damage or defects
- Provide a detailed condition report
- Deliver safely with $1M insurance

**Starting at just $49**, you get peace of mind and protection from scams.

## What to Do If You've Been Scammed

1. **Report to Facebook:** Use the "Report" button on the listing
2. **Report to FTC:** Visit ReportFraud.ftc.gov
3. **Contact your bank:** Dispute the charge immediately
4. **File a police report:** Especially for large amounts
5. **Warn others:** Leave a review and share your experience

## The Bottom Line

Facebook Marketplace can be a great place to find deals, but you need to be smart about it. When in doubt, use a professional service like Dibby to inspect and deliver items safely. Spending $49-150 on professional inspection is always cheaper than losing hundreds or thousands to scammers.

**Remember:** If a deal seems too good to be true, it probably is. Stay safe out there!
    `,
  },
  {
    id: "2",
    title: "The Ultimate Guide to Buying Used Furniture Online in 2025",
    slug: "buying-used-furniture-online-guide",
    excerpt:
      "Everything you need to know before buying furniture from online marketplaces. From inspections to delivery, we cover it all.",
    author: "Michael Chen",
    date: "2025-01-10",
    readTime: "10 min read",
    category: "Buying Guides",
    tags: ["Furniture", "Online Shopping", "Tips", "Marketplace"],
    image: "🛋️",
    content: `
# The Ultimate Guide to Buying Used Furniture Online in 2025

Buying used furniture online can save you thousands of dollars, but it comes with risks. Here's everything you need to know to shop smart and avoid costly mistakes.

## Why Buy Used Furniture?

### The Financial Case
- Save 50-80% compared to retail prices
- High-quality pieces at fraction of original cost
- Vintage and unique items you can't find in stores
- Better for the environment (reduce waste)

### The Reality Check
According to recent data, Americans spend an average of $8,000 furnishing a new home. By shopping used, you could furnish the same space for $2,000-3,000 while getting higher quality pieces.

## Where to Find the Best Used Furniture

### Online Marketplaces (Ranked by Quality)
1. **Facebook Marketplace** - Largest selection, easy communication
2. **Craigslist** - Great deals, but more scams
3. **OfferUp** - Good mobile experience, local focus
4. **Nextdoor** - Neighborhood-based, trustworthy sellers
5. **Estate Sales** - High-quality, well-maintained pieces

### What to Buy Used vs. New

**Great Used Purchases:**
- Solid wood furniture (tables, dressers, bookshelves)
- Metal furniture (industrial, mid-century pieces)
- Outdoor furniture (metal or treated wood)
- Decorative items (mirrors, art, lamps)

**Better to Buy New:**
- Mattresses (hygiene concerns, bed bugs)
- Upholstered items with stains or odors
- Particle board furniture (doesn't hold up)
- Baby furniture (safety regulations change)

## The Inspection Process: What to Check

### Before You Commit

**Ask These Questions:**
1. How old is the piece?
2. Why are you selling it?
3. Are there any defects or damage?
4. Do you have the original receipt? (proves authenticity)
5. Has it been in a smoking or pet household?
6. What are the exact dimensions?

**Request These Photos:**
- Overall shot from multiple angles
- Close-ups of any damage or wear
- Underside and back (check for stamps, labels)
- Hardware and mechanisms (drawers, doors)
- Any stains or imperfections

### In-Person Inspection Checklist

**Structural Integrity:**
- ✅ Shake it - does it wobble?
- ✅ Open all drawers and doors - do they work smoothly?
- ✅ Check joints - are they solid or loose?
- ✅ Inspect legs and feet - any damage?
- ✅ Look for water damage, warping, or splitting

**Cosmetic Condition:**
- ✅ Check finish - scratches, chips, fading?
- ✅ Examine upholstery - stains, tears, odors?
- ✅ Test zippers and buttons if applicable
- ✅ Smell for smoke, pet, or mildew odors
- ✅ Check for bed bugs (small dark spots, shells)

**Functionality:**
- ✅ Sit on chairs/sofas - still supportive?
- ✅ Test reclining mechanisms if applicable
- ✅ Ensure all hardware is present
- ✅ Check electrical components (lamps, etc.)

## Red Flags: When to Walk Away

🚩 **Strong odors** - smoke and pet smells rarely come out
🚩 **Sagging cushions** - expensive to replace
🚩 **Wobbly structure** - indicates poor construction or damage
🚩 **Visible bed bugs** - dark spots, shells, live insects
🚩 **Water damage** - warping, staining, mildew smell
🚩 **Missing hardware** - replacement can be expensive
🚩 **Recent upholstery** - may be hiding damage
🚩 **Seller seems sketchy** - trust your instincts

## Negotiation Strategies

### Research First
- Check completed eBay listings for similar items
- Search Facebook Marketplace for comparable pieces
- Know the retail price when new
- Factor in delivery costs

### Make Your Offer
**The Formula:** Start at 60-70% of asking price for:
- Items listed over 2 weeks
- Minor cosmetic damage
- Need for cleaning or repairs
- If you're picking up same day

**When to Pay Full Price:**
- High-demand items (mid-century modern, designer pieces)
- Recently listed (less than 48 hours)
- Excellent condition
- Multiple interested buyers

### Negotiation Scripts

**For minor damage:**
"I love this piece, but I noticed [specific damage]. Would you consider $X to account for the repair cost?"

**For older listings:**
"I see you've had this listed for a few weeks. I can pick it up today for $X cash."

**For bulk purchases:**
"I'm interested in multiple items. Would you do $X for everything?"

## Transportation and Delivery

### Measure EVERYTHING
- Your doorways (including frame, not just opening)
- Stairways and landings
- Hallways and corridors
- The furniture piece (length, width, height, diagonal)
- Your vehicle (if transporting yourself)

**Pro Tip:** Add 2 inches to all furniture measurements to account for angles and maneuvering.

### DIY Transport
**You'll Need:**
- Moving blankets or old sheets
- Tie-down straps or rope
- Dolly (for heavy items)
- Helper (never move furniture alone)
- Protective floor coverings

**Rental Options:**
- U-Haul van: $19.95 + mileage
- Home Depot truck: $19 for 75 minutes
- Friend with truck: Beer + pizza

### Professional Delivery (The Smart Choice)

**When to Use Professional Delivery:**
- Large items (couches, wardrobes, pianos)
- Long distances (over 30 miles)
- Multi-story buildings
- Valuable or fragile pieces
- You don't have a truck

**Dibby's Delivery Service:**
- Professional pickup from seller
- $1M insurance coverage
- White-glove handling
- Assembly if needed
- Starting at $75

## Cleaning and Restoration Tips

### Wood Furniture
1. **Light cleaning:** Murphy Oil Soap + soft cloth
2. **Deep cleaning:** 1 part vinegar + 3 parts oil
3. **Scratches:** Matching wood marker or walnuts
4. **Water rings:** Mayonnaise overnight (seriously!)

### Upholstery
1. **Vacuum thoroughly** using upholstery attachment
2. **Spot clean** with upholstery cleaner
3. **Steam clean** for deep cleaning (rent a machine)
4. **Deodorize** with baking soda overnight

### Metal Furniture
1. **Remove rust** with steel wool + vinegar
2. **Clean** with dish soap and water
3. **Protect** with clear coat or wax
4. **Repaint** if desired (use metal primer)

## Common Mistakes to Avoid

❌ **Not measuring** - 40% of returns are due to size issues
❌ **Buying sight unseen** - always inspect first
❌ **Ignoring smells** - they rarely disappear
❌ **Forgetting delivery costs** - can double the price
❌ **Rushing the purchase** - good deals come along regularly
❌ **Not testing functionality** - drawers, cushions, mechanisms
❌ **Overpaying for damaged items** - factor repair costs

## The Dibby Advantage

Here's why 50,000+ customers use Dibby for furniture purchases:

**Before You Buy:**
- Professional inspection with detailed photos
- Honest condition report
- Measurement verification
- Red flag identification

**Delivery:**
- Safe transport with $1M insurance
- Protection from damage or loss
- Professional handling
- Assembly included

**Peace of Mind:**
- No meetups with strangers
- No renting trucks
- No risk of scams
- Full refund if item isn't as described

## Your Action Plan

1. **Browse marketplaces** for items in your budget
2. **Save your favorites** and watch for price drops
3. **Ask detailed questions** and request photos
4. **Schedule inspection** (DIY or use Dibby)
5. **Negotiate the price** based on condition
6. **Arrange safe delivery** with insurance
7. **Inspect on arrival** before final payment
8. **Clean and enjoy** your new-to-you furniture!

## The Bottom Line

Buying used furniture online can save you thousands while getting better quality pieces. The key is knowing what to look for, how to inspect items properly, and when to walk away.

**Remember:** The $49-150 you spend on professional inspection through Dibby is insurance against buying damaged, fake, or dangerous furniture. It's always cheaper than replacing a bad purchase.

Happy furniture hunting! 🛋️
    `,
  },
  {
    id: "3",
    title: "Why Delivery Insurance Matters: Real Stories of Things Gone Wrong",
    slug: "why-delivery-insurance-matters",
    excerpt:
      "Real customer stories showing why $1M delivery insurance isn't optional - it's essential for protecting your marketplace purchases.",
    author: "Jessica Martinez",
    date: "2025-01-05",
    readTime: "6 min read",
    category: "Insurance",
    tags: ["Insurance", "Safety", "Protection", "Real Stories"],
    image: "🛡️",
    content: `
# Why Delivery Insurance Matters: Real Stories of Things Gone Wrong

You found the perfect item online at an amazing price. You're excited. But then disaster strikes during pickup or delivery. Without insurance, you're out hundreds or thousands of dollars. Here's why insurance isn't optional.

## Real Stories from Real Customers

### Story 1: The $2,000 Couch Catastrophe

**What Happened:**
Sarah found her dream mid-century modern couch on Facebook Marketplace for $600 (valued at $2,000 retail). She hired a cheap delivery service for $40 to save money. During transport, the truck hit a pothole, and the couch flew forward, breaking the frame and tearing the upholstery.

**The Problem:**
The delivery driver had no insurance. Sarah's homeowners insurance didn't cover items in transit. The seller refused responsibility once the item left their property.

**The Result:**
Sarah lost $640 with no recourse. The damaged couch was worthless.

**What She Should Have Done:**
Used Dibby's insured delivery ($89 for that distance). The $1M insurance would have covered the full $2,000 replacement value, not just what she paid.

### Story 2: The Vanishing Dresser

**What Happened:**
Mike arranged to have a friend's friend pick up a $400 antique dresser from a Craigslist seller. He paid the seller through Venmo before pickup. The "friend's friend" picked up the dresser but never delivered it. When Mike called, the number was disconnected.

**The Problem:**
No paperwork, no insurance, no tracking. Mike had no proof of who took the item or where it went.

**The Result:**
$400 lost. Police couldn't help without more information.

**What He Should Have Done:**
Used a professional service with GPS tracking and insurance. Would have cost $65, saved $335.

### Story 3: The Bait-and-Switch Bicycle

**What Happened:**
Emma paid $800 for a "like-new" road bike. She arranged her own pickup. When she arrived, the seller showed her a completely different, damaged bike and said "this is it, take it or leave it."

**The Problem:**
Without a professional inspector, Emma had no leverage. She either walked away empty-handed or accepted a bike worth $200.

**The Result:**
Emma accepted the damaged bike out of fear of confrontation. Lost $600 in value.

**What She Should Have Done:**
Used Dibby's inspection service ($49). We would have documented the bait-and-switch, contacted Facebook Marketplace, and helped Emma get her money back.

### Story 4: The "It Fit in the Photos" Piano

**What Happened:**
David bought an upright piano for $500. He measured his doorways (32 inches), and the seller said it would fit. He rented a U-Haul ($60) and recruited three friends. After 2 hours of trying, they couldn't get it through the door. The piano was 34 inches diagonal.

**The Problem:**
No professional measurement, no contingency plan. The piano now sat in David's driveway.

**The Result:**
- Lost $60 on truck rental
- Piano damaged trying to force it in
- Had to pay $150 to have it removed
- Never got the $500 back

**What He Should Have Done:**
Dibby would have measured correctly during inspection ($49) and advised against the purchase. Saved $660.

## What Insurance Actually Covers

### Standard Dibby $1M Coverage Includes:

✅ **Damage during transport** - Scratches, dents, breaks
✅ **Total loss** - If item is lost or stolen
✅ **Accidents** - Vehicle crashes, weather damage
✅ **Delivery mistakes** - Wrong address, damaged during delivery
✅ **Property damage** - If delivery damages your home
✅ **Third-party damage** - If our delivery causes other harm

### What's NOT Covered:

❌ Pre-existing damage (that's why we inspect first)
❌ Items over $1,000,000 in value
❌ Illegal items
❌ Acts of war or terrorism
❌ Intentional damage by customer

## The Math: Why Insurance Makes Sense

### Without Insurance:

**Scenario:** $800 purchase
- Damage during transport: **Loss = $800**
- Item not as described: **Loss = $800**
- Lost or stolen: **Loss = $800**
- Your recourse: None

### With Dibby Insurance:

**Scenario:** $800 purchase + $89 delivery
- Damage during transport: **Covered up to $800**
- Item not as described: **Inspection caught it, saved $800**
- Lost or stolen: **Covered up to $800**
- Your recourse: Full claim process, fast resolution

**Break-Even Point:** If there's even a 10% chance something goes wrong, insurance pays for itself.

## Industry Statistics

**According to marketplace data:**
- 12% of items get damaged during self-pickup or delivery
- 8% of items are "not as described" upon arrival
- 3% of items are lost or stolen during transport
- Average loss per incident: $650

**That means:**
- 23% chance something goes wrong
- Without insurance, you're gambling with an average loss of $650
- Insurance costs: $49-150
- Risk/Reward ratio: You save 4-13x the insurance cost

## What Happens When You File a Claim

### The Dibby Claims Process:

1. **Report Immediately** (within 48 hours of delivery)
2. **Document Everything** (photos of damage)
3. **Submit Claim Form** (online, takes 5 minutes)
4. **Investigation** (we review within 3 business days)
5. **Resolution** (repair, replacement, or refund within 10 days)

### Average Claim Timeline:
- **Simple claims:** 3-5 days
- **Complex claims:** 10-14 days
- **Disputed claims:** Up to 30 days

### Claim Approval Rate:
- 94% of legitimate claims approved
- Average payout: $580
- Customer satisfaction: 4.8/5 stars

## Alternative Insurance Options (And Why They Fall Short)

### Homeowners/Renters Insurance
- ❌ Doesn't cover items in transit
- ❌ High deductibles ($500-1,000)
- ❌ Claims raise your premiums
- ❌ May not cover marketplace purchases

### Credit Card Purchase Protection
- ❌ Limited to items bought with card
- ❌ Doesn't cover person-to-person sales
- ❌ Only covers fraud, not damage
- ❌ Tedious claim process

### Seller "Guarantee"
- ❌ Unenforceable
- ❌ No legal standing
- ❌ Seller may disappear
- ❌ No third-party verification

### Marketplace Protection
- ❌ Facebook: Only certain transactions
- ❌ Craigslist: Zero protection
- ❌ OfferUp: Limited to shipping only
- ❌ Doesn't cover in-person pickups

## The Hidden Costs of No Insurance

Beyond the obvious financial loss, consider:

**Time Lost:**
- Hours dealing with sellers/buyers
- Police reports and paperwork
- Small claims court (if you pursue it)
- Shopping all over again

**Stress:**
- Confronting sellers about damage
- Worrying during pickup/delivery
- Fighting for refunds
- Fear of future purchases

**Opportunity Cost:**
- Missed out on the item you wanted
- Used up your furniture budget
- Can't furnish your space
- Back to square one

## When Insurance Isn't Necessary

**You might skip insurance if:**
- Item costs less than $50 (claim may not be worth it)
- You're picking up in person and inspecting on-site
- Seller is a close friend/family member
- Item is low-value and easily replaceable

**But even then, consider:**
- Can you afford to lose the money?
- Do you trust your vehicle and driving?
- What if something unexpected happens?

## Why Dibby's Insurance Is Different

### Underwritten by Major Carriers
- Not a "guarantee" or "promise"
- Actual insurance policy
- Legally binding coverage
- Regulated by state insurance boards

### No Deductibles
- You pay: $0 out of pocket for claims
- We pay: 100% of covered damages
- No hidden fees or copays

### Fast Claims
- Average payout: 7 days
- No fighting or arguing
- Transparent process
- Fair assessments

### Covers Real Replacement Value
- Not just what you paid
- Covers actual worth of item
- Up to $1M per delivery
- Includes comparable replacements

## The Bottom Line

Here's the reality: Buying from online marketplaces without insurance is gambling. Sure, most transactions go smoothly. But when they don't, you're completely exposed.

**The math is simple:**
- Insurance: $49-150
- Average loss without insurance: $650
- Risk of something going wrong: 23%

Even if you only use insured delivery once out of every 4-5 purchases, you're coming out ahead financially. And that doesn't account for the peace of mind, time saved, and stress avoided.

**Our advice:** If an item is worth buying, it's worth protecting. Don't let a few dozen dollars of insurance cost you hundreds or thousands in losses.

## Take Action

Next time you're buying from a marketplace:

1. **Calculate the risk** - Can you afford to lose this money?
2. **Check the value** - Is insurance cost less than 20% of item value?
3. **Consider alternatives** - Do you have other protection?
4. **Factor in time/stress** - Is it worth the peace of mind?

**Most importantly:** Don't learn this lesson the hard way. Get insurance before disaster strikes.

Ready to shop safely? Start your insured delivery today at Dibby.com 🛡️
    `,
  },
];

// ============================================
// TESTIMONIALS DATA
// ============================================
interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  service: string;
  date: string;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah M.",
    location: "Los Angeles, CA",
    rating: 5,
    review:
      "I was nervous about buying a $1,200 couch from Facebook Marketplace, but Dibby made it so easy! They inspected it, sent me detailed photos, and delivered it safely. The couch was exactly as described. Worth every penny for the peace of mind!",
    service: "Full Service - Inspection + Delivery",
    date: "2025-01-10",
    avatar: "👩",
  },
  {
    id: "2",
    name: "Marcus T.",
    location: "Houston, TX",
    rating: 5,
    review:
      "Saved me from a huge mistake! I was about to buy a 'like new' motorcycle, but Dibby's inspection revealed it had frame damage the seller didn't mention. They documented everything and helped me get my deposit back. These guys are legit!",
    service: "Vehicle Inspection",
    date: "2025-01-08",
    avatar: "👨",
  },
  {
    id: "3",
    name: "Jennifer K.",
    location: "Chicago, IL",
    rating: 5,
    review:
      "Moving to Chicago from out of state and needed to find an apartment remotely. Dibby did a virtual tour that was better than anything I could have done myself. They checked everything - water pressure, outlets, closets, even the neighborhood. Found my perfect place without flying out!",
    service: "Property Tour",
    date: "2025-01-05",
    avatar: "👩‍💼",
  },
  {
    id: "4",
    name: "David R.",
    location: "Miami, FL",
    rating: 5,
    review:
      "My vintage dresser arrived in perfect condition thanks to their careful handling. The $89 delivery fee was so worth it compared to renting a U-Haul and risking damage. Plus the $1M insurance gave me total peace of mind. Will use again!",
    service: "Delivery Service",
    date: "2024-12-28",
    avatar: "👨‍💻",
  },
  {
    id: "5",
    name: "Amanda L.",
    location: "Seattle, WA",
    rating: 5,
    review:
      "Bought a 'working' laptop that the seller swore was perfect. Dibby's tech inspector found it had a cracked motherboard and the battery was dead. They documented everything, contacted OfferUp, and I got a full refund. Saved me $600!",
    service: "Electronics Inspection",
    date: "2024-12-20",
    avatar: "👩‍🦰",
  },
  {
    id: "6",
    name: "Carlos G.",
    location: "Phoenix, AZ",
    rating: 5,
    review:
      "I'm a busy doctor and don't have time to deal with Craigslist meetups. Dibby handles everything - inspection, pickup, delivery. It's like having a personal shopper for marketplace items. The convenience alone is worth the cost!",
    service: "Full Service",
    date: "2024-12-15",
    avatar: "👨‍⚕️",
  },
  {
    id: "7",
    name: "Emily W.",
    location: "Austin, TX",
    rating: 5,
    review:
      "As a single woman, I never felt safe meeting strangers from Facebook Marketplace. Dibby removes all that anxiety. Professional, insured, and they handle everything. I've used them 3 times now and will never go back to DIY pickups!",
    service: "Full Service",
    date: "2024-12-10",
    avatar: "👩‍🎨",
  },
  {
    id: "8",
    name: "Robert H.",
    location: "Denver, CO",
    rating: 5,
    review:
      "The inspection photos were incredibly detailed - better than what the seller provided! They measured everything, checked all the drawers, and even tested the reclining mechanism on the chair. No surprises when it arrived. This is how online shopping should work!",
    service: "Inspection Only",
    date: "2024-12-05",
    avatar: "👨‍🏫",
  },
  {
    id: "9",
    name: "Lisa P.",
    location: "San Diego, CA",
    rating: 5,
    review:
      "My antique dining table is worth $3,000 and I was terrified about damage during transport. Dibby's team wrapped it like it was going to a museum! It arrived without a single scratch. The $1M insurance was reassuring, but I didn't even need it. True professionals!",
    service: "Delivery Service",
    date: "2024-11-28",
    avatar: "👩‍🏫",
  },
  {
    id: "10",
    name: "Michael B.",
    location: "Boston, MA",
    rating: 5,
    review:
      "Used Dibby for a same-day property tour when a great apartment popped up. They went within 2 hours, did a live video walkthrough with me, and I was able to submit my application before anyone else. Got the apartment! Best $49 I ever spent!",
    service: "Property Tour - Rush",
    date: "2024-11-20",
    avatar: "👨‍💼",
  },
];

// ============================================
// RADIUS OPTIONS (MARKETPLACE)
// ============================================
const radiusOptions = [
  { label: "5 mi", value: "8" },
  { label: "10 mi", value: "16" },
  { label: "25 mi", value: "40" },
  { label: "50 mi", value: "80" },
  { label: "100 mi", value: "161" },
  { label: "250 mi", value: "402" },
  { label: "500 mi", value: "805" },
  { label: "Nationwide", value: "5000" },
];
// ============================================
// ENHANCED SCHEMA.ORG STRUCTURED DATA GENERATOR WITH E-E-A-T
// ============================================

const generateSchemaOrg = (page: string, data: any = {}) => {
  console.log("generateSchemaOrg called with page:", page, "data:", data);
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Dibby",
    description: SEO_CONFIG.site.description,
    url: SEO_CONFIG.site.url,
    logo: SEO_CONFIG.site.logo,
    image: SEO_CONFIG.site.logo,
    telephone: "1-800-DIBBY-00",
    email: "support@dibby.com",

    // ENHANCED: E-E-A-T Authority Signals
    founder: {
      "@type": "Person",
      name: "Dibby Team",
    },
    foundingDate: "2020",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "50-100",
    },
    slogan: "We Inspect & Deliver Any Marketplace Listing",
    paymentAccepted: "Cash, Credit Card, Debit Card, Apple Pay, Google Pay",
    openingHours: "Mo-Su 00:00-23:59",

    // Area Served - All Cities
    areaServed: SEO_CONFIG.cities.map((city) => ({
      "@type": "City",
      name: `${city.name}, ${city.state}`,
    })),

    // Service Catalog
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Marketplace Services",
      itemListElement: SEO_CONFIG.services.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
        price: service.price,
        priceCurrency: "USD",
      })),
    },

    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94102",
      streetAddress: "123 Market Street",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "37.7749",
      longitude: "-122.4194",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "50000",
      bestRating: "5",
      worstRating: "1",
    },
    priceRange: "$49-$150",
    sameAs: [
      SEO_CONFIG.site.social.facebook,
      SEO_CONFIG.site.social.instagram,
      `https://twitter.com/${SEO_CONFIG.site.social.twitter}`,
      SEO_CONFIG.site.social.linkedin,
      SEO_CONFIG.site.social.youtube,
    ],
  };

const schemas: any[] = [baseSchema];
  
  // Service Schema
  if (page === "service" && data.service) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: data.service.name,
      description: data.service.description,
      provider: {
        "@type": "LocalBusiness",
        name: "Dibby",
      },
      offers: {
        "@type": "Offer",
        price: data.service.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      areaServed: SEO_CONFIG.cities.map((city) => ({
        "@type": "City",
        name: `${city.name}, ${city.state}`,
      })),
    });
  }

  // FAQ Schema
  if (page === "FAQ") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What marketplaces do you work with?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We work with all major online marketplaces including Facebook Marketplace, Craigslist, OfferUp, Letgo, and any other platform where items are listed for sale. Just provide us with the URL!",
          },
        },
        {
          "@type": "Question",
          name: "How long does the inspection take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most inspections are completed within 24 hours of scheduling. You'll receive detailed photos, videos, and a written condition report directly to your email and Dibby account.",
          },
        },
        {
          "@type": "Question",
          name: "What's included in the inspection?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our inspections include high-quality photos from multiple angles, a video walkthrough, condition assessment, functionality tests for electronics and appliances, measurements, and notes on any damage or concerns.",
          },
        },
        {
          "@type": "Question",
          name: "Is my delivery insured?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Every delivery includes $1M insurance coverage at no extra cost. Your items are protected from pickup to delivery.",
          },
        },
        {
          "@type": "Question",
          name: "Do I have to be home for delivery?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We'll coordinate a delivery time that works for you. If you can't be home, we can arrange for contactless delivery or leave items in a secure location with your permission.",
          },
        },
        {
          "@type": "Question",
          name: "What if the item isn't as described?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "That's why we inspect first! If our inspection reveals issues not mentioned in the listing, you can decide whether to proceed before we pick up the item. No commitment until you're satisfied.",
          },
        },
        {
          "@type": "Question",
          name: "Can you inspect properties or apartments?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely! Our property tour service provides detailed video walkthroughs, photos of every room, notes on condition, appliances, and any concerns. Perfect for remote renters or buyers.",
          },
        },
        {
          "@type": "Question",
          name: "What areas do you serve?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We currently serve 30+ major metropolitan areas including New York, Los Angeles, Chicago, San Francisco, Boston, and expanding to more cities every month.",
          },
        },
        {
          "@type": "Question",
          name: "How much does Dibby cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Inspection only starts at $49. Delivery only starts at $75. Full service (inspection + delivery) starts at $150. Property tours start at $49. All services include insurance coverage.",
          },
        },
        {
          "@type": "Question",
          name: "Can I cancel or reschedule?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, you can cancel or reschedule up to 4 hours before your scheduled time at no charge. Last-minute cancellations may incur a small fee.",
          },
        },
        {
          "@type": "Question",
          name: "Do you inspect vehicles?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! We offer pre-purchase vehicle inspection services including test drives, mechanical checks, and detailed photo documentation. Perfect for used car purchases from private sellers.",
          },
        },
        {
          "@type": "Question",
          name: "What makes Dibby different from other delivery services?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Unlike generic delivery services, we specialize in marketplace items. We inspect BEFORE pickup, coordinate with sellers, handle negotiations, and provide detailed condition reports. Plus $1M insurance on every order.",
          },
        },
      ],
    });
  }

  // ENHANCED: FAQ Schema with 12 Questions (People Also Ask)
  if (page === "faq" || page === "home") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What marketplaces do you work with?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We work with all major online marketplaces including Facebook Marketplace, Craigslist, OfferUp, Letgo, and any other platform where items are listed for sale.",
          },
        },
        {
          "@type": "Question",
          name: "How long does the inspection take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most inspections are completed within 24 hours of scheduling. You'll receive detailed photos, videos, and a written condition report.",
          },
        },
        {
          "@type": "Question",
          name: "Is my delivery insured?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Every delivery includes $1M insurance coverage at no extra cost. Your items are protected from pickup to delivery.",
          },
        },
        {
          "@type": "Question",
          name: "How much does Dibby cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Inspection only starts at $49. Delivery only starts at $75. Full service (inspection + delivery) starts at $150. All services include insurance.",
          },
        },
        {
          "@type": "Question",
          name: "Do I have to be home for delivery?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We'll coordinate a delivery time that works for you. If you can't be home, we can arrange for contactless delivery or leave items in a secure location with your permission.",
          },
        },
        {
          "@type": "Question",
          name: "What if the item isn't as described?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "That's why we inspect first! If our inspection reveals issues not mentioned in the listing, you can decide whether to proceed before we pick up the item. No commitment until you're satisfied.",
          },
        },
        {
          "@type": "Question",
          name: "Can you inspect properties or apartments?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely! Our property tour service provides detailed video walkthroughs, photos of every room, notes on condition, appliances, and any concerns. Perfect for remote renters or buyers.",
          },
        },
        {
          "@type": "Question",
          name: "What areas do you serve?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We currently serve 30+ major metropolitan areas including New York, Los Angeles, Chicago, San Francisco, Boston, and expanding to more cities every month.",
          },
        },
        {
          "@type": "Question",
          name: "How do I pay?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We accept all major credit cards, debit cards, and digital payment methods. You'll only be charged after the service is completed to your satisfaction.",
          },
        },
        {
          "@type": "Question",
          name: "Can I cancel or reschedule?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, you can cancel or reschedule up to 4 hours before your scheduled time at no charge. Last-minute cancellations may incur a small fee.",
          },
        },
        {
          "@type": "Question",
          name: "Is Dibby cheaper than doing it myself?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "When you factor in gas ($15-40), time (2-4 hours), vehicle wear ($20-50), and damage risk ($0-500+), DIY often costs more than Dibby's $75-150 fully insured service.",
          },
        },
        {
          "@type": "Question",
          name: "What makes Dibby different from other delivery services?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Unlike generic delivery services, we specialize in marketplace items. We inspect BEFORE pickup, coordinate with sellers, handle negotiations, and provide detailed condition reports. Plus $1M insurance.",
          },
        },
      ],
    });
  }

  // ENHANCED: Video Schema for How It Works
  if (page === "how-it-works") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "How Dibby Works - Marketplace Delivery Explained",
      description:
        "Watch how Dibby inspects and delivers items from Facebook Marketplace, Craigslist, and OfferUp. Safe, insured, professional service.",
      thumbnailUrl: `${SEO_CONFIG.site.url}/video-thumbnail.jpg`,
      uploadDate: "2024-01-15T00:00:00Z",
      duration: "PT2M30S",
      contentUrl: `${SEO_CONFIG.site.url}/how-it-works-video.mp4`,
      embedUrl: `${SEO_CONFIG.site.url}/embed/how-it-works`,
    });
  }

  // BreadcrumbList Schema
  if (data.breadcrumbs && data.breadcrumbs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: data.breadcrumbs.map((crumb: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: `${SEO_CONFIG.site.url}${crumb.url}`,
      })),
    });
  }
  console.log("generateSchemaOrg returning:", JSON.stringify(schemas, null, 2));
  return schemas;
};

// ============================================
// GENERATE REVIEW SCHEMA FOR TRUST SIGNALS
// ============================================
const generateReviewSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Dibby Marketplace Delivery Service",
    description:
      "Professional inspection and delivery service for online marketplace purchases",
    brand: {
      "@type": "Brand",
      name: "Dibby",
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "49",
      highPrice: "150",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "50000",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Sarah Johnson",
        },
        datePublished: "2024-10-15",
        reviewBody:
          "I was nervous buying a couch on Facebook Marketplace, but Dibby inspected it first and delivered it the same day! Professional service and great communication throughout.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Michael Chen",
        },
        datePublished: "2024-10-10",
        reviewBody:
          "No more coordinating with strangers. Dibby handled everything and the delivery was super professional. Worth every penny for the peace of mind.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Amy Rodriguez",
        },
        datePublished: "2024-10-05",
        reviewBody:
          "The property tour service is genius! They did a video walkthrough while I was out of state. Saved me a trip and helped me make an informed decision about the apartment.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
    ],
  };
};

// ============================================
// ENHANCED SEO HEAD COMPONENT WITH ALL META TAGS & SCHEMA
// ============================================
const SEOHead: React.FC<{
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
  type?: string;
  service?: Service;
  city?: City;
  item?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  noindex?: boolean;
  schema?: any;
}> = ({
  title,
  description,
  canonical,
  keywords,
  type = "website",
  service,
  city,
  item,
  breadcrumbs,
  noindex = false,
  schema,
}) => {
  console.log("SEOHead schema prop:", schema);
  // Inject schema script into head
  useEffect(() => {
    console.log("useEffect running, schema value:", schema);
    if (schema) {
      console.log("Schema exists, injecting for:", schema);

      // Remove existing schema with this ID
      const existingSchema = document.getElementById(`schema-${schema}`);
      if (existingSchema) {
        existingSchema.remove();
      }

      // Create new schema script with unique ID
      const schemaScript = document.createElement("script");
      schemaScript.type = "application/ld+json";
      schemaScript.id = `schema-${schema}`; // Unique ID
      const schemaData = generateSchemaOrg(schema);
      console.log("Generated schema data for", schema, ":", schemaData);
      schemaScript.text = JSON.stringify(schemaData);
      document.head.appendChild(schemaScript);
      console.log(
        "Schema script appended to head with ID:",
        `schema-${schema}`
      );

      // Cleanup on unmount
      return () => {
        console.log("Cleaning up schema script for:", schema);
        const scriptToRemove = document.getElementById(`schema-${schema}`);
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      };
    } else {
      console.log("No schema prop provided");
    }
  }, [schema]);
  const defaultTitle =
    SEO_CONFIG.site.name + " - " + SEO_CONFIG.site.description;
  const defaultDescription = SEO_CONFIG.site.description;
  const defaultKeywords = SEO_CONFIG.site.keywords.join(", ");

  // Dynamic title generation with SEO optimization
  let finalTitle = title;
  if (!title && service && city && item) {
    finalTitle = `${service.name} for ${item
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")} in ${city.name}, ${city.state} | ${SEO_CONFIG.site.name} - $${
      service.price
    }`;
  } else if (!title && service && city) {
    finalTitle = `${service.name} in ${city.name}, ${city.state} | ${SEO_CONFIG.site.name} - Professional Marketplace Delivery Starting at $${service.price}`;
  } else if (!title && item && city) {
    const itemName = item
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    finalTitle = `${itemName} Delivery & Inspection in ${city.name}, ${city.state} | ${SEO_CONFIG.site.name} - Safe Marketplace Pickup`;
  } else if (!title && city) {
    finalTitle = `Marketplace Delivery in ${city.name}, ${city.state} | ${SEO_CONFIG.site.name} - Facebook Marketplace, Craigslist & OfferUp Pickup Service`;
  }

  // Dynamic description generation
  let finalDescription = description;
  if (!description && service && city) {
    finalDescription = `Professional ${service.name.toLowerCase()} in ${
      city.name
    }, ${city.state}. ${service.description} Serving all ${
      city.state
    } residents. Get started for just $${
      service.price
    }. Trusted by 50,000+ customers.`;
  } else if (!description && item && city) {
    const itemName = item
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    finalDescription = `Buy ${itemName.toLowerCase()} safely in ${city.name}, ${
      city.state
    }. We inspect, pick up, and deliver from Facebook Marketplace, Craigslist, OfferUp with $1M insurance. Professional service starting at $49.`;
  }

  // Dynamic keywords
  let finalKeywords = keywords || defaultKeywords;
  if (city && item) {
    finalKeywords += `, ${item} delivery ${city.name}, ${item} pickup ${city.state}, marketplace ${item} ${city.name}`;
  }

  // Generate Schema.org structured data
  const schemas = generateSchemaOrg(service ? "service" : "home", {
    service,
    city,
    item,
    breadcrumbs,
  });

  useEffect(() => {
    // Add review schema for homepage
    if (!service && !city && !item) {
      const reviewSchema = generateReviewSchema();
      const reviewScriptId = "schema-review";
let reviewScript = document.getElementById(reviewScriptId) as HTMLScriptElement;
      if (!reviewScript) {
        reviewScript = document.createElement("script");
        reviewScript.id = reviewScriptId;
        reviewScript.type = "application/ld+json";
        document.head.appendChild(reviewScript);
      }

      reviewScript.textContent = JSON.stringify(reviewSchema);
    }

    // Inject Schema.org JSON-LD
    schemas.forEach((schema, index) => {
      const scriptId = `schema-${index}`;
let scriptTag = document.getElementById(scriptId) as HTMLScriptElement;
      
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = scriptId;
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }

      scriptTag.textContent = JSON.stringify(schema);
    });

    // Cleanup old schemas
    const allSchemas = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    allSchemas.forEach((script) => {
      if (!script.id.startsWith("schema-")) {
        script.remove();
      }
    });
  }, [canonical]);

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{finalTitle || defaultTitle}</title>
      <meta
        name="description"
        content={finalDescription || defaultDescription}
      />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={`${SEO_CONFIG.site.url}${canonical || ""}`} />

      {/* Favicon & App Icons - NEW */}
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#FFB84D" />

      {/* Sitemap Links - NEW */}
      <link
        rel="sitemap"
        type="application/xml"
        title="Sitemap"
        href="/sitemap.xml"
      />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="Dibby Blog RSS"
        href="/rss.xml"
      />

      {/* Robots */}
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />
      <meta
        name="googlebot"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />
      <meta
        name="bingbot"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />

      {/* Geo Tags */}
      {city && (
        <>
          <meta name="geo.region" content={`US-${city.state}`} />
          <meta name="geo.placename" content={`${city.name}, ${city.state}`} />
          <meta name="geo.position" content={`${city.lat};${city.lng}`} />
          <meta name="ICBM" content={`${city.lat}, ${city.lng}`} />
        </>
      )}

      {/* Article Freshness - NEW */}
      <meta property="article:published_time" content="2024-10-18T00:00:00Z" />
      <meta
        property="article:modified_time"
        content={new Date().toISOString()}
      />
      <meta property="og:updated_time" content={new Date().toISOString()} />

      {/* Open Graph */}
      <meta property="og:title" content={finalTitle || defaultTitle} />
      <meta
        property="og:description"
        content={finalDescription || defaultDescription}
      />
      <meta property="og:type" content={type} />
      <meta
        property="og:url"
        content={`${SEO_CONFIG.site.url}${canonical || ""}`}
      />
      <meta
        property="og:image"
        content={`${SEO_CONFIG.site.url}/og-image.jpg`}
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SEO_CONFIG.site.name} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SEO_CONFIG.site.social.twitter} />
      <meta name="twitter:title" content={finalTitle || defaultTitle} />
      <meta
        name="twitter:description"
        content={finalDescription || defaultDescription}
      />
      <meta
        name="twitter:image"
        content={`${SEO_CONFIG.site.url}/twitter-image.jpg`}
      />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SEO_CONFIG.site.social.twitter} />
      <meta name="twitter:title" content={finalTitle || defaultTitle} />
      <meta
        name="twitter:description"
        content={finalDescription || defaultDescription}
      />
      <meta
        name="twitter:image"
        content={`${SEO_CONFIG.site.url}/twitter-image.jpg`}
      />

      {console.log("About to render schema, value is:", schema)}
      {/* Schema.org JSON-LD Structured Data */}

      {/* Mobile */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5"
      />
      {/* Mobile */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5"
      />
      <meta name="theme-color" content="#FFB84D" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* Font Optimization - NEW */}
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <style>{`
        @font-face {
          font-family: 'system-ui';
          font-display: swap;
        }
      `}</style>
    </>
  );
};

// ============================================
// RESPONSIVE HOOK
// ============================================
const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    isMobile: typeof window !== "undefined" ? window.innerWidth < 768 : false,
    isTablet:
      typeof window !== "undefined"
        ? window.innerWidth >= 768 && window.innerWidth < 1024
        : false,
    isDesktop: typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        width,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};
// ============================================
// DIBBY LOGO COMPONENT - RESPONSIVE
// ============================================
const DibbyLogo: React.FC<{
  size?: number;
  fillColor?: string;
  strokeColor?: string;
}> = ({ size = 40, fillColor = "#FFB84D", strokeColor = "#000000" }) => {
  const { isMobile } = useResponsive();
  const responsiveSize = isMobile ? Math.min(size, 32) : size;

  return (
    <svg
      width={responsiveSize}
      height={responsiveSize * 0.75}
      viewBox="0 0 1024 768"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(4,4)">
        <path
          d="M820 520c18 -4 36 -2 48 10 18 18 8 54 -20 72 -24 16 -50 20 -74 14"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={26}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M200 560 C150 520 120 450 160 380 C190 330 230 300 320 280 C360 270 420 260 480 260 C560 260 640 270 700 300 C760 330 780 370 760 420 C740 480 700 520 620 560 C560 590 420 620 320 600 C260 588 230 580 200 560 Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={28}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M520 560 C540 520 600 520 660 560"
          fill="none"
          stroke={strokeColor}
          strokeWidth={22}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M240 560 L300 680 L360 680 L340 620"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={26}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M140 700 L860 700"
          fill="none"
          stroke={strokeColor}
          strokeWidth={14}
          strokeLinecap="round"
        />
        <path
          d="M200 320 C180 260 220 200 300 170 C360 150 440 140 510 160 C570 175 620 200 650 250 C660 270 660 290 650 310 C630 345 590 360 560 370 C520 380 480 390 440 390 C360 390 280 360 240 340 Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={26}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M510 210 C520 220 560 260 580 300 C600 340 600 380 560 400 C530 415 500 410 480 400 C460 390 460 300 510 260 Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={26}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <ellipse cx="430" cy="260" rx="18" ry="26" fill={strokeColor} />
        <ellipse cx="300" cy="240" rx="30" ry="26" fill={strokeColor} />
        <path
          d="M320 265 C350 295 380 285 380 285"
          fill="none"
          stroke={strokeColor}
          strokeWidth={14}
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

// ============================================
// LOGIN MODAL - MOBILE RESPONSIVE
// ============================================
const LoginModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  setIsLoggedIn: (value: boolean) => void;
  setIsSignupModalOpen: (value: boolean) => void;
}> = ({ isOpen, onClose, setIsLoggedIn, setIsSignupModalOpen }) => {
  const { isMobile } = useResponsive();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  if (!isOpen) return null;

  const handleLogin = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Please enter a valid email";
    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoggedIn(true);
      onClose();
      alert("Login successful!");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: isMobile ? "16px" : "20px",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          borderRadius: isMobile ? "24px" : "32px",
          maxWidth: "480px",
          width: "100%",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <div
          style={{
            padding: isMobile ? "24px" : "32px 40px",
            borderBottom: "2px solid #FFE5DB",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: isMobile ? "24px" : "28px",
                fontWeight: "700",
                color: "#5A5A5A",
                margin: "0 0 8px 0",
              }}
            >
              Welcome Back
            </h2>
            <p style={{ fontSize: "15px", color: "#ABABAB", margin: 0 }}>
              Log in to your Dibby account
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
            }}
          >
            <X size={24} color="#ABABAB" />
          </button>
        </div>

        <div style={{ padding: isMobile ? "24px" : "40px" }}>
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontSize: "15px",
                fontWeight: "600",
                color: "#5A5A5A",
                marginBottom: "10px",
              }}
            >
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "16px 48px 16px 16px",
                  fontSize: "16px",
                  border: errors.email
                    ? "2px solid #FF6B6B"
                    : "2px solid #FFE5DB",
                  borderRadius: "16px",
                  outline: "none",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
              <Mail
                size={20}
                color="#ABABAB"
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            </div>
            {errors.email && (
              <p
                style={{
                  color: "#FF6B6B",
                  fontSize: "14px",
                  marginTop: "8px",
                }}
              >
                {errors.email}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label
              style={{
                display: "block",
                fontSize: "15px",
                fontWeight: "600",
                color: "#5A5A5A",
                marginBottom: "10px",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "16px 48px 16px 16px",
                  fontSize: "16px",
                  border: errors.password
                    ? "2px solid #FF6B6B"
                    : "2px solid #FFE5DB",
                  borderRadius: "16px",
                  outline: "none",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
              <Lock
                size={20}
                color="#ABABAB"
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            </div>
            {errors.password && (
              <p
                style={{
                  color: "#FF6B6B",
                  fontSize: "14px",
                  marginTop: "8px",
                }}
              >
                {errors.password}
              </p>
            )}
          </div>

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "16px",
              backgroundColor: "#FFB84D",
              border: "none",
              borderRadius: "16px",
              fontSize: "16px",
              fontWeight: "600",
              color: "white",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(255, 184, 77, 0.3)",
              marginBottom: "20px",
            }}
          >
            Log In
          </button>

          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "15px", color: "#8A8A8A" }}>
              Don't have an account?{" "}
              <span
                onClick={() => {
                  onClose();
                  setIsSignupModalOpen(true);
                }}
                style={{
                  color: "#FFB84D",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SIGNUP MODAL - MOBILE RESPONSIVE
// ============================================
const SignupModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  setIsLoggedIn: (value: boolean) => void;
  setIsLoginModalOpen: (value: boolean) => void;
  setUserProfile: (profile: any) => void;
}> = ({
  isOpen,
  onClose,
  setIsLoggedIn,
  setIsLoginModalOpen,
  setUserProfile,
}) => {
  const { isMobile } = useResponsive();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const handleSignup = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Please enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoggedIn(true);
      setUserProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: "",
      });
      onClose();
      alert("Account created successfully!");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: isMobile ? "16px" : "20px",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          borderRadius: isMobile ? "24px" : "32px",
          maxWidth: "500px",
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div
          style={{
            padding: isMobile ? "24px" : "32px 40px",
            borderBottom: "2px solid #FFE5DB",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: isMobile ? "24px" : "28px",
                fontWeight: "700",
                color: "#5A5A5A",
                margin: "0 0 8px 0",
              }}
            >
              Create Account
            </h2>
            <p style={{ fontSize: "15px", color: "#ABABAB", margin: 0 }}>
              Join Dibby and start shopping smarter
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
            }}
          >
            <X size={24} color="#ABABAB" />
          </button>
        </div>

        <div style={{ padding: isMobile ? "24px" : "40px" }}>
          {["name", "email", "phone", "password", "confirmPassword"].map(
            (field) => {
              const labels: { [key: string]: string } = {
                name: "Full Name",
                email: "Email Address",
                phone: "Phone Number",
                password: "Password",
                confirmPassword: "Confirm Password",
              };
              const icons: { [key: string]: any } = {
                name: User,
                email: Mail,
                phone: Phone,
                password: Lock,
                confirmPassword: Lock,
              };
              const Icon = icons[field];
              const type = field.includes("password")
                ? "password"
                : field === "email"
                ? "email"
                : field === "phone"
                ? "tel"
                : "text";
const placeholder: string | undefined = {
  name: "John Doe",
                email: "john@example.com",
                phone: "(555) 123-4567",
                password: "••••••••",
                confirmPassword: "••••••••",
              }[field];

              return (
                <div key={field} style={{ marginBottom: "24px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#5A5A5A",
                      marginBottom: "10px",
                    }}
                  >
                    {labels[field]}
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={formData[field as keyof typeof formData]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "16px 48px 16px 16px",
                        fontSize: "16px",
                        border: errors[field]
                          ? "2px solid #FF6B6B"
                          : "2px solid #FFE5DB",
                        borderRadius: "16px",
                        outline: "none",
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                      }}
                    />
                    <Icon
                      size={20}
                      color="#ABABAB"
                      style={{
                        position: "absolute",
                        right: "16px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
                  </div>
                  {errors[field] && (
                    <p
                      style={{
                        color: "#FF6B6B",
                        fontSize: "14px",
                        marginTop: "8px",
                      }}
                    >
                      {errors[field]}
                    </p>
                  )}
                </div>
              );
            }
          )}

          <button
            onClick={handleSignup}
            style={{
              width: "100%",
              padding: "16px",
              backgroundColor: "#B8E6D5",
              border: "none",
              borderRadius: "16px",
              fontSize: "16px",
              fontWeight: "600",
              color: "white",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(184, 230, 213, 0.3)",
              marginBottom: "20px",
            }}
          >
            Create Account
          </button>

          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "15px", color: "#8A8A8A" }}>
              Already have an account?{" "}
              <span
                onClick={() => {
                  onClose();
                  setIsLoginModalOpen(true);
                }}
                style={{
                  color: "#FFB84D",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Log In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
// ============================================
// LISTING SUBMISSION MODAL - COMPLETE 4-STEP FLOW - MOBILE RESPONSIVE
// ============================================
const ListingSubmissionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { isMobile } = useResponsive();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    listingUrl: "",
    serviceType: "full",
    pickupAddress: "",
    deliveryAddress: "",
    date: "",
    timeWindow: "",
    notes: "",
    itemDescription: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const serviceTypes = [
    {
      id: "inspection",
      name: "Inspection Only",
      price: 49,
      icon: Eye,
      color: "#D4BFEA",
      description: "Photos, video & condition report",
      features: [
        "Detailed photos",
        "Video walkthrough",
        "Condition report",
        "24hr delivery",
      ],
    },
    {
      id: "full",
      name: "Full Service",
      price: 150,
      icon: Package,
      color: "#FFB84D",
      description: "Inspection + Delivery",
      features: [
        "Everything in Inspection",
        "Professional pickup",
        "Safe delivery",
        "$1M insurance",
      ],
      popular: true,
    },
    {
      id: "delivery",
      name: "Delivery Only",
      price: 75,
      icon: Truck,
      color: "#B8E6D5",
      description: "Skip inspection, just deliver",
      features: [
        "Professional pickup",
        "Safe delivery",
        "Real-time tracking",
        "$1M insurance",
      ],
    },
  ];

  const timeWindows = [
    "Within 30 minutes",
    "2pm - 3pm",
    "3pm - 4pm",
    "4pm - 5pm",
    "Next Day",
    "This Weekend",
  ];

  const validateStep = (currentStep: number) => {
    const newErrors: { [key: string]: string } = {};
    if (currentStep === 1) {
      if (!formData.listingUrl.trim())
        newErrors.listingUrl = "Please enter a listing URL";
      else if (!formData.listingUrl.match(/^https?:\/\/.+/))
        newErrors.listingUrl = "Please enter a valid URL";
      if (!formData.itemDescription.trim())
        newErrors.itemDescription = "Please describe the item";
    }
    if (currentStep === 2 && !formData.serviceType)
      newErrors.serviceType = "Please select a service";
    if (currentStep === 3) {
      if (!formData.pickupAddress.trim())
        newErrors.pickupAddress = "Pickup address is required";
      if (
        formData.serviceType !== "inspection" &&
        !formData.deliveryAddress.trim()
      )
        newErrors.deliveryAddress = "Delivery address is required";
      if (!formData.date) newErrors.date = "Please select a date";
      if (!formData.timeWindow)
        newErrors.timeWindow = "Please select a time window";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleSubmit = () => {
    if (validateStep(step)) {
      alert(
        "Booking submitted! You will receive a confirmation email shortly."
      );
      onClose();
      setStep(1);
      setFormData({
        listingUrl: "",
        serviceType: "full",
        pickupAddress: "",
        deliveryAddress: "",
        date: "",
        timeWindow: "",
        notes: "",
        itemDescription: "",
      });
    }
  };

  const selectedService = serviceTypes.find(
    (s) => s.id === formData.serviceType
  );
  const totalPrice = selectedService ? selectedService.price : 0;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: isMobile ? "0" : "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: isMobile ? "0" : "32px",
          maxWidth: "900px",
          width: "100%",
          height: isMobile ? "100vh" : "auto",
          maxHeight: isMobile ? "100vh" : "90vh",
          overflow: "auto",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div
          style={{
            padding: isMobile ? "20px" : "32px 40px",
            borderBottom: "2px solid #FFE5DB",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            zIndex: 10,
            borderRadius: isMobile ? "0" : "32px 32px 0 0",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: isMobile ? "22px" : "28px",
                fontWeight: "700",
                color: "#5A5A5A",
                margin: "0 0 8px 0",
              }}
            >
              Submit a Listing
            </h2>
            <p style={{ fontSize: "15px", color: "#ABABAB", margin: 0 }}>
              Step {step} of 4
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
            }}
          >
            <X size={24} color="#ABABAB" />
          </button>
        </div>

        <div
          style={{
            padding: isMobile ? "0 20px" : "0 40px",
            marginTop: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "8px", marginBottom: "40px" }}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor: i <= step ? "#FFB84D" : "#FFE5DB",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ padding: isMobile ? "0 20px 20px" : "0 40px 40px" }}>
          {step === 1 && (
            <div>
              <h3
                style={{
                  fontSize: isMobile ? "20px" : "22px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "24px",
                }}
              >
                Tell us about the listing
              </h3>
              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#5A5A5A",
                    marginBottom: "10px",
                  }}
                >
                  Listing URL
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="https://facebook.com/marketplace/item/..."
                    value={formData.listingUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, listingUrl: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "16px 48px 16px 16px",
                      fontSize: "16px",
                      border: errors.listingUrl
                        ? "2px solid #FF6B6B"
                        : "2px solid #FFE5DB",
                      borderRadius: "16px",
                      outline: "none",
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                      maxWidth: "100%",
                    }}
                  />
                  <ExternalLink
                    size={20}
                    color="#ABABAB"
                    style={{
                      position: "absolute",
                      right: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                </div>
                {errors.listingUrl && (
                  <p
                    style={{
                      color: "#FF6B6B",
                      fontSize: "14px",
                      marginTop: "8px",
                    }}
                  >
                    {errors.listingUrl}
                  </p>
                )}
                <p
                  style={{
                    fontSize: "13px",
                    color: "#ABABAB",
                    marginTop: "8px",
                  }}
                >
                  Paste from Facebook Marketplace, Craigslist, OfferUp, or Letgo
                </p>
              </div>
              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#5A5A5A",
                    marginBottom: "10px",
                  }}
                >
                  What is it?
                </label>
                <input
                  type="text"
                  placeholder="e.g., Blue couch, iPhone 13, Honda Civic, Apartment tour"
                  value={formData.itemDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      itemDescription: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "16px",
                    fontSize: "16px",
                    border: errors.itemDescription
                      ? "2px solid #FF6B6B"
                      : "2px solid #FFE5DB",
                    borderRadius: "16px",
                    outline: "none",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                    maxWidth: "100%",
                  }}
                />
                {errors.itemDescription && (
                  <p
                    style={{
                      color: "#FF6B6B",
                      fontSize: "14px",
                      marginTop: "8px",
                    }}
                  >
                    {errors.itemDescription}
                  </p>
                )}
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#5A5A5A",
                    marginBottom: "10px",
                  }}
                >
                  Special instructions (optional)
                </label>
                <textarea
                  placeholder="e.g., Check if all drawers open smoothly, test the screen..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "16px",
                    fontSize: "16px",
                    border: "2px solid #FFE5DB",
                    borderRadius: "16px",
                    outline: "none",
                    fontFamily: "inherit",
                    resize: "vertical",
                    boxSizing: "border-box",
                    maxWidth: "100%",
                  }}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3
                style={{
                  fontSize: isMobile ? "20px" : "22px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "8px",
                }}
              >
                Choose your service
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  color: "#8A8A8A",
                  marginBottom: "32px",
                }}
              >
                What would you like us to do?
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                  gap: "20px",
                }}
              >
                {serviceTypes.map((service) => {
                  const Icon = service.icon;
                  const isSelected = formData.serviceType === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() =>
                        setFormData({ ...formData, serviceType: service.id })
                      }
                      style={{
                        border: isSelected
                          ? `3px solid ${service.color}`
                          : "2px solid #FFE5DB",
                        borderRadius: "24px",
                        padding: isMobile ? "24px 20px" : "28px 20px",
                        cursor: "pointer",
                        textAlign: "center",
                        position: "relative",
                        backgroundColor: isSelected
                          ? `${service.color}10`
                          : "white",
                        transition: "all 0.3s",
                        transform: isSelected ? "scale(1.02)" : "scale(1)",
                      }}
                    >
                      {service.popular && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-12px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            backgroundColor: service.color,
                            color: "white",
                            padding: "4px 16px",
                            borderRadius: "12px",
                            fontSize: "12px",
                            fontWeight: "700",
                          }}
                        >
                          MOST POPULAR
                        </div>
                      )}
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          backgroundColor: service.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 16px",
                        }}
                      >
                        <Icon size={28} color="white" />
                      </div>
                      <h4
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          color: "#5A5A5A",
                          marginBottom: "8px",
                        }}
                      >
                        {service.name}
                      </h4>
                      <div
                        style={{
                          fontSize: "32px",
                          fontWeight: "800",
                          color: service.color,
                          marginBottom: "8px",
                        }}
                      >
                        ${service.price}
                      </div>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#8A8A8A",
                          marginBottom: "20px",
                        }}
                      >
                        {service.description}
                      </p>
                      <div
                        style={{
                          textAlign: "left",
                          fontSize: "13px",
                          color: "#8A8A8A",
                        }}
                      >
                        {service.features.map((feature, idx) => (
                          <div
                            key={idx}
                            style={{
                              marginBottom: "8px",
                              paddingLeft: "20px",
                              position: "relative",
                            }}
                          >
                            <span style={{ position: "absolute", left: 0 }}>
                              ✓
                            </span>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3
                style={{
                  fontSize: isMobile ? "20px" : "22px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "24px",
                }}
              >
                Where and when?
              </h3>
              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#5A5A5A",
                    marginBottom: "10px",
                  }}
                >
                  {formData.serviceType === "inspection"
                    ? "Address"
                    : "Pickup Address"}
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder={
                      formData.serviceType === "inspection"
                        ? "Property address to inspect"
                        : "123 Main St, New York, NY 10001"
                    }
                    value={formData.pickupAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pickupAddress: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "16px 48px 16px 16px",
                      fontSize: "16px",
                      border: errors.pickupAddress
                        ? "2px solid #FF6B6B"
                        : "2px solid #FFE5DB",
                      borderRadius: "16px",
                      outline: "none",
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                      maxWidth: "100%",
                    }}
                  />
                  <MapPin
                    size={20}
                    color="#ABABAB"
                    style={{
                      position: "absolute",
                      right: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                </div>
                {errors.pickupAddress && (
                  <p
                    style={{
                      color: "#FF6B6B",
                      fontSize: "14px",
                      marginTop: "8px",
                    }}
                  >
                    {errors.pickupAddress}
                  </p>
                )}
              </div>
              {formData.serviceType !== "inspection" && (
                <div style={{ marginBottom: "24px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#5A5A5A",
                      marginBottom: "10px",
                    }}
                  >
                    Delivery Address
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      placeholder="456 Oak Ave, Brooklyn, NY 11201"
                      value={formData.deliveryAddress}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          deliveryAddress: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "16px 48px 16px 16px",
                        fontSize: "16px",
                        border: errors.deliveryAddress
                          ? "2px solid #FF6B6B"
                          : "2px solid #FFE5DB",
                        borderRadius: "16px",
                        outline: "none",
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                        maxWidth: "100%",
                      }}
                    />
                    <MapPin
                      size={20}
                      color="#ABABAB"
                      style={{
                        position: "absolute",
                        right: "16px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
                  </div>
                  {errors.deliveryAddress && (
                    <p
                      style={{
                        color: "#FF6B6B",
                        fontSize: "14px",
                        marginTop: "8px",
                      }}
                    >
                      {errors.deliveryAddress}
                    </p>
                  )}
                </div>
              )}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: "20px",
                  marginBottom: "24px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#5A5A5A",
                      marginBottom: "10px",
                    }}
                  >
                    Date
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      min={new Date().toISOString().split("T")[0]}
                      style={{
                        width: "100%",
                        padding: "16px 48px 16px 16px",
                        fontSize: "16px",
                        border: errors.date
                          ? "2px solid #FF6B6B"
                          : "2px solid #FFE5DB",
                        borderRadius: "16px",
                        outline: "none",
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                        maxWidth: "100%",
                      }}
                    />
                    <Calendar
                      size={20}
                      color="#ABABAB"
                      style={{
                        position: "absolute",
                        right: "16px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                  {errors.date && (
                    <p
                      style={{
                        color: "#FF6B6B",
                        fontSize: "14px",
                        marginTop: "8px",
                      }}
                    >
                      {errors.date}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#5A5A5A",
                      marginBottom: "10px",
                    }}
                  >
                    Time Window
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={formData.timeWindow}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          timeWindow: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "16px 48px 16px 16px",
                        fontSize: "16px",
                        border: errors.timeWindow
                          ? "2px solid #FF6B6B"
                          : "2px solid #FFE5DB",
                        borderRadius: "16px",
                        outline: "none",
                        fontFamily: "inherit",
                        appearance: "none",
                        backgroundColor: "white",
                        boxSizing: "border-box",
                      }}
                    >
                      <option value="">Select time</option>
                      {timeWindows.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <Clock
                      size={20}
                      color="#ABABAB"
                      style={{
                        position: "absolute",
                        right: "16px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                  {errors.timeWindow && (
                    <p
                      style={{
                        color: "#FF6B6B",
                        fontSize: "14px",
                        marginTop: "8px",
                      }}
                    >
                      {errors.timeWindow}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3
                style={{
                  fontSize: isMobile ? "20px" : "22px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "24px",
                }}
              >
                Review your booking
              </h3>
              <div
                style={{
                  backgroundColor: "#FFF8F5",
                  borderRadius: "24px",
                  padding: isMobile ? "24px" : "32px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    marginBottom: "24px",
                    paddingBottom: "24px",
                    borderBottom: "2px solid #FFE5DB",
                    flexDirection: isMobile ? "column" : "row",
                    gap: isMobile ? "16px" : "0",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#ABABAB",
                        marginBottom: "8px",
                      }}
                    >
                      Service
                    </div>
                    <div
                      style={{
                        fontSize: isMobile ? "18px" : "20px",
                        fontWeight: "700",
                        color: "#5A5A5A",
                      }}
                    >
                      {selectedService?.name}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#8A8A8A",
                        marginTop: "4px",
                      }}
                    >
                      {formData.itemDescription}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: isMobile ? "28px" : "32px",
                      fontWeight: "800",
                      color: "#FFB84D",
                    }}
                  >
                    ${totalPrice}
                  </div>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#ABABAB",
                      marginBottom: "8px",
                    }}
                  >
                    Pickup
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      color: "#5A5A5A",
                      fontWeight: "600",
                    }}
                  >
                    {formData.pickupAddress}
                  </div>
                </div>
                {formData.serviceType !== "inspection" && (
                  <div style={{ marginBottom: "20px" }}>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#ABABAB",
                        marginBottom: "8px",
                      }}
                    >
                      Delivery
                    </div>
                    <div
                      style={{
                        fontSize: "16px",
                        color: "#5A5A5A",
                        fontWeight: "600",
                      }}
                    >
                      {formData.deliveryAddress}
                    </div>
                  </div>
                )}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: "20px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#ABABAB",
                        marginBottom: "8px",
                      }}
                    >
                      Date
                    </div>
                    <div
                      style={{
                        fontSize: "16px",
                        color: "#5A5A5A",
                        fontWeight: "600",
                      }}
                    >
                      {new Date(formData.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#ABABAB",
                        marginBottom: "8px",
                      }}
                    >
                      Time
                    </div>
                    <div
                      style={{
                        fontSize: "16px",
                        color: "#5A5A5A",
                        fontWeight: "600",
                      }}
                    >
                      {formData.timeWindow}
                    </div>
                  </div>
                </div>
                {formData.notes && (
                  <div
                    style={{
                      marginTop: "20px",
                      paddingTop: "20px",
                      borderTop: "2px solid #FFE5DB",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#ABABAB",
                        marginBottom: "8px",
                      }}
                    >
                      Special Instructions
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                        color: "#8A8A8A",
                        lineHeight: "1.6",
                      }}
                    >
                      {formData.notes}
                    </div>
                  </div>
                )}
              </div>
              <div
                style={{
                  backgroundColor: "#E5F8FF",
                  borderRadius: "16px",
                  padding: "20px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    color: "#5A5A5A",
                    lineHeight: "1.6",
                  }}
                >
                  💳 You'll be redirected to payment after confirming. Your card
                  will not be charged until the service is completed.
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            padding: isMobile ? "20px" : "24px 40px",
            borderTop: "2px solid #FFE5DB",
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            position: "sticky",
            bottom: 0,
            backgroundColor: "white",
            borderRadius: isMobile ? "0" : "0 0 32px 32px",
          }}
        >
          {step > 1 && (
            <button
              onClick={handleBack}
              style={{
                padding: isMobile ? "14px 24px" : "16px 32px",
                backgroundColor: "white",
                border: "2px solid #FFE5DB",
                borderRadius: "16px",
                fontSize: "16px",
                fontWeight: "600",
                color: "#8A8A8A",
                cursor: "pointer",
              }}
            >
              ← Back
            </button>
          )}
          <div style={{ flex: 1 }} />
          {step < 4 ? (
            <button
              onClick={handleNext}
              style={{
                padding: isMobile ? "14px 32px" : "16px 48px",
                backgroundColor: "#FFB84D",
                border: "none",
                borderRadius: "16px",
                fontSize: "16px",
                fontWeight: "600",
                color: "white",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(255, 184, 77, 0.3)",
              }}
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              style={{
                padding: isMobile ? "14px 32px" : "16px 48px",
                backgroundColor: "#B8E6D5",
                border: "none",
                borderRadius: "16px",
                fontSize: "16px",
                fontWeight: "600",
                color: "white",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(184, 230, 213, 0.3)",
              }}
            >
              Confirm Booking →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
// ============================================
// PROFILE PAGE COMPONENT - MOBILE RESPONSIVE
// ============================================
const ProfilePage: React.FC<{
  userProfile: any;
  setUserProfile: (profile: any) => void;
}> = ({ userProfile, setUserProfile }) => {
  const { isMobile } = useResponsive();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...userProfile });

  const handleSave = () => {
    setUserProfile(editedProfile);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FFF8F5" }}>
      <SEOHead
        title="My Profile | Dibby"
        description="Manage your Dibby account settings and view your order history"
        canonical="/profile"
      />
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: isMobile ? "40px 20px" : "80px 32px",
        }}
      >
        <div style={{ marginBottom: isMobile ? "32px" : "48px" }}>
          <h1
            style={{
              fontSize: isMobile ? "32px" : "48px",
              fontWeight: "800",
              color: "#5A5A5A",
              marginBottom: "12px",
              letterSpacing: "-1px",
            }}
          >
            My Profile
          </h1>
          <p style={{ fontSize: isMobile ? "16px" : "18px", color: "#8A8A8A" }}>
            Manage your account information and preferences
          </p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: isMobile ? "24px" : "32px",
            padding: isMobile ? "32px 24px" : "48px",
            boxShadow: "0 8px 32px rgba(255, 180, 162, 0.12)",
            border: "2px solid #FFE5DB",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              marginBottom: "40px",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div
                style={{
                  width: isMobile ? "60px" : "80px",
                  height: isMobile ? "60px" : "80px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #FFE5C0 0%, #FFB84D 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isMobile ? "28px" : "36px",
                }}
              >
                👤
              </div>
              <div>
                <h2
                  style={{
                    fontSize: isMobile ? "22px" : "28px",
                    fontWeight: "700",
                    color: "#5A5A5A",
                    marginBottom: "4px",
                  }}
                >
                  {userProfile.name}
                </h2>
                <p style={{ fontSize: "16px", color: "#ABABAB" }}>
                  Member since 2025
                </p>
              </div>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  padding: "12px 28px",
                  backgroundColor: "#FFB84D",
                  border: "none",
                  borderRadius: "16px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  width: isMobile ? "100%" : "auto",
                  justifyContent: "center",
                }}
              >
                <Edit size={18} />
                Edit Profile
              </button>
            ) : (
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  width: isMobile ? "100%" : "auto",
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedProfile({ ...userProfile });
                  }}
                  style={{
                    padding: "12px 28px",
                    backgroundColor: "white",
                    border: "2px solid #FFE5DB",
                    borderRadius: "16px",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#8A8A8A",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  style={{
                    padding: "12px 28px",
                    backgroundColor: "#B8E6D5",
                    border: "none",
                    borderRadius: "16px",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    justifyContent: "center",
                  }}
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <div style={{ display: "grid", gap: "28px" }}>
            {["name", "email", "phone", "address"].map((field) => {
              const labels: { [key: string]: string } = {
                name: "Full Name",
                email: "Email Address",
                phone: "Phone Number",
                address: "Address",
              };
              return (
                <div key={field}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#5A5A5A",
                      marginBottom: "10px",
                    }}
                  >
                    {labels[field]}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile[field]}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          [field]: e.target.value,
                        })
                      }
                      placeholder={
                        field === "address" ? "Enter your address" : ""
                      }
                      style={{
                        width: "100%",
                        padding: "16px",
                        fontSize: "16px",
                        border: "2px solid #FFE5DB",
                        borderRadius: "16px",
                        outline: "none",
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        padding: "16px",
                        backgroundColor: "#FFF8F5",
                        borderRadius: "16px",
                        fontSize: "16px",
                        color: "#5A5A5A",
                      }}
                    >
                      {userProfile[field] || "No address provided"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: "24px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "24px",
              padding: "32px",
              border: "2px solid #E0F5ED",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📦</div>
            <div
              style={{
                fontSize: "36px",
                fontWeight: "700",
                color: "#B8E6D5",
                marginBottom: "8px",
              }}
            >
              12
            </div>
            <div style={{ fontSize: "16px", color: "#8A8A8A" }}>
              Total Orders
            </div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "24px",
              padding: "32px",
              border: "2px solid #FFE5DB",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>⭐</div>
            <div
              style={{
                fontSize: "36px",
                fontWeight: "700",
                color: "#FFB84D",
                marginBottom: "8px",
              }}
            >
              4.9
            </div>
            <div style={{ fontSize: "16px", color: "#8A8A8A" }}>
              Average Rating
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// TOAST CONTAINER COMPONENT
// ============================================
const ToastContainer: React.FC<{ toasts: Toast[] }> = ({ toasts }) => (
  <div
    style={{
      position: "fixed",
      top: "72px",
      right: "16px",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      pointerEvents: "none",
    }}
  >
    <style>{`
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `}</style>
    {toasts.map((toast) => (
      <div
        key={toast.id}
        style={{
          backgroundColor:
            toast.type === "success"
              ? "#B8E6D5"
              : toast.type === "error"
              ? "#FFB84D"
              : "#FFE5C0",
          color: "white",
          padding: "12px 16px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          fontSize: "15px",
          fontWeight: "500",
          minWidth: "200px",
          maxWidth: "400px",
          pointerEvents: "auto",
          animation: "slideIn 0.3s ease-out",
        }}
      >
        {toast.message}
      </div>
    ))}
  </div>
);
// ============================================
// BREADCRUMB NAVIGATION COMPONENT
// ============================================
const Breadcrumb: React.FC<{
  items: Array<{ name: string; url: string }>;
}> = ({ items }) => {
  const { isMobile } = useResponsive();

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        padding: isMobile ? "16px 20px" : "20px 32px",
        backgroundColor: "#FFF8F5",
        borderBottom: "1px solid #FFE5DB",
      }}
    >
      <ol
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          listStyle: "none",
          padding: 0,
          margin: 0,
          flexWrap: "wrap",
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <li>
          <span
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{
              fontSize: "14px",
              color: "#8A8A8A",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FFB84D")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8A8A")}
          >
            <Home size={14} />
            Home
          </span>
        </li>

        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              <ChevronRight size={14} color="#ABABAB" />
            </li>
            <li>
              {index === items.length - 1 ? (
                <span
                  style={{
                    fontSize: "14px",
                    color: "#5A5A5A",
                    fontWeight: "600",
                  }}
                >
                  {item.name}
                </span>
              ) : (
                <span
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  style={{
                    fontSize: "14px",
                    color: "#8A8A8A",
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#FFB84D")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#8A8A8A")
                  }
                >
                  {item.name}
                </span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

// ============================================
// BACK TO TOP BUTTON COMPONENT
// ============================================
const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isMobile } = useResponsive();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: isMobile ? "80px" : "32px",
        right: isMobile ? "20px" : "32px",
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        backgroundColor: "#FFB84D",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 4px 16px rgba(255, 184, 77, 0.4)",
        zIndex: 998,
        transition: "all 0.3s",
        animation: "slideUp 0.3s ease-out",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 184, 77, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(255, 184, 77, 0.4)";
      }}
    >
      <ChevronRight
        size={24}
        color="white"
        style={{ transform: "rotate(-90deg)" }}
      />
    </button>
  );
};
// ============================================
// SOCIAL PROOF NOTIFICATION COMPONENT
// ============================================
const SocialProofNotification: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState({
    city: "",
    action: "",
  });
  const { isMobile } = useResponsive();

  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "Austin",
    "Boston",
    "Seattle",
    "Denver",
    "Miami",
    "Atlanta",
  ];

  const actions = [
    "just booked an inspection",
    "just requested delivery",
    "just saved $200 with Dibby",
    "just completed a property tour",
    "just received their items safely",
    "is browsing furniture delivery",
    "just hired us for a couch pickup",
  ];

  useEffect(() => {
    const showNotification = () => {
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];

      setCurrentNotification({
        city: randomCity,
        action: randomAction,
      });
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    // Show first notification after 5 seconds
    const firstTimeout = setTimeout(showNotification, 5000);

    // Show subsequent notifications every 15 seconds
    const interval = setInterval(showNotification, 15000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: isMobile ? "20px" : "32px",
        left: isMobile ? "20px" : "32px",
        backgroundColor: "white",
        padding: "16px 20px",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
        zIndex: 997,
        maxWidth: isMobile ? "calc(100vw - 40px)" : "400px",
        border: "2px solid #FFE5DB",
        animation: "slideInLeft 0.5s ease-out",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "#E5F8FF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Package size={20} color="#A8D5F5" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "13px",
            fontWeight: "600",
            color: "#5A5A5A",
            marginBottom: "2px",
          }}
        >
          Someone in {currentNotification.city}
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "#8A8A8A",
          }}
        >
          {currentNotification.action}
        </div>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
        aria-label="Close notification"
      >
        <X size={16} color="#ABABAB" />
      </button>
    </div>
  );
};

// ============================================
// TRUST BADGES COMPONENT
// ============================================
const TrustBadges: React.FC = () => {
  const { isMobile } = useResponsive();

  const badges = [
    {
      icon: "🛡️",
      title: "$1M Insured",
      description: "Every delivery fully covered",
      color: "#E5F8FF",
    },
    {
      icon: "⭐",
      title: "50,000+ Customers",
      description: "Trusted nationwide",
      color: "#FFF9E6",
    },
    {
      icon: "📦",
      title: "4.9 Rating",
      description: "Highly rated service",
      color: "#F0E5F5",
    },
    {
      icon: "✓",
      title: "BBB A+ Accredited",
      description: "Better Business Bureau certified",
      color: "#E0F5ED",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        gap: isMobile ? "16px" : "24px",
        padding: isMobile ? "40px 20px" : "60px 32px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {badges.map((badge, index) => (
        <div
          key={index}
          style={{
            backgroundColor: badge.color,
            borderRadius: "20px",
            padding: isMobile ? "24px 16px" : "32px 24px",
            textAlign: "center",
            border: "2px solid rgba(0, 0, 0, 0.05)",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div
            style={{
              fontSize: isMobile ? "32px" : "40px",
              marginBottom: "12px",
            }}
          >
            {badge.icon}
          </div>
          <div
            style={{
              fontSize: isMobile ? "16px" : "18px",
              fontWeight: "700",
              color: "#5A5A5A",
              marginBottom: "8px",
            }}
          >
            {badge.title}
          </div>
          <div
            style={{
              fontSize: isMobile ? "13px" : "14px",
              color: "#8A8A8A",
              lineHeight: "1.4",
            }}
          >
            {badge.description}
          </div>
        </div>
      ))}
    </div>
  );
};

/// ============================================
// GUARANTEE BADGES COMPONENT
// ============================================
const GuaranteeBadges: React.FC = () => {
  const { isMobile } = useResponsive();

  const guarantees = [
    {
      icon: "💰",
      title: "Money-Back Guarantee",
      description:
        "Not satisfied? Get a full refund within 24 hours of service completion",
      color: "#FFE5C0",
    },
    {
      icon: "⏰",
      title: "On-Time Guarantee",
      description: "We arrive on time, every time. Late? Your service is free",
      color: "#E5F8FF",
    },
    {
      icon: "✨",
      title: "Quality Guarantee",
      description:
        "Professional service with trained inspectors and careful handlers",
      color: "#F0E5F5",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#FFF8F5",
        padding: isMobile ? "60px 20px" : "80px 32px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2
            style={{
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "800",
              color: "#5A5A5A",
              marginBottom: "16px",
              letterSpacing: "-0.5px",
            }}
          >
            Our <span style={{ color: "#FFB84D" }}>Promise</span> to You
          </h2>
          <p
            style={{
              fontSize: isMobile ? "16px" : "18px",
              color: "#8A8A8A",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            We stand behind every service with industry-leading guarantees
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? "24px" : "32px",
          }}
        >
          {guarantees.map((guarantee, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                borderRadius: "24px",
                padding: isMobile ? "32px 24px" : "40px 32px",
                textAlign: "center",
                border: `3px solid ${guarantee.color}`,
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 16px 48px rgba(0, 0, 0, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(0, 0, 0, 0.08)";
              }}
            >
              <div
                style={{
                  width: isMobile ? "80px" : "100px",
                  height: isMobile ? "80px" : "100px",
                  borderRadius: "50%",
                  backgroundColor: guarantee.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isMobile ? "40px" : "48px",
                  margin: "0 auto 24px",
                  boxShadow: `0 8px 24px ${guarantee.color}80`,
                }}
              >
                {guarantee.icon}
              </div>
              <h3
                style={{
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "16px",
                }}
              >
                {guarantee.title}
              </h3>
              <p
                style={{
                  fontSize: isMobile ? "15px" : "16px",
                  color: "#8A8A8A",
                  lineHeight: "1.6",
                }}
              >
                {guarantee.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// TESTIMONIALS CAROUSEL COMPONENT
// ============================================
const TestimonialsCarousel: React.FC = () => {
  const { isMobile } = useResponsive();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section
      style={{
        backgroundColor: "#FFF8F5",
        padding: isMobile ? "60px 20px" : "80px 32px",
        position: "relative",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h2
            style={{
              fontSize: isMobile ? "32px" : "48px",
              fontWeight: "800",
              color: "#5A5A5A",
              marginBottom: "16px",
            }}
          >
            Loved by <span style={{ color: "#FFB84D" }}>50,000+</span> Customers
          </h2>
          <p
            style={{
              fontSize: isMobile ? "16px" : "18px",
              color: "#8A8A8A",
              lineHeight: "1.7",
            }}
          >
            Real stories from real customers who trust Dibby
          </p>
        </div>

        {/* Testimonial Card */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "32px",
            padding: isMobile ? "40px 32px" : "60px 80px",
            border: "3px solid #FFE5DB",
            boxShadow: "0 12px 48px rgba(255, 180, 162, 0.15)",
            position: "relative",
            minHeight: isMobile ? "400px" : "350px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Quote Icon */}
          <div
            style={{
              position: "absolute",
              top: isMobile ? "20px" : "30px",
              left: isMobile ? "20px" : "40px",
              fontSize: isMobile ? "48px" : "64px",
              color: "#FFE5DB",
              lineHeight: "1",
            }}
          >
            "
          </div>

          {/* Avatar & Info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: isMobile ? "64px" : "80px",
                height: isMobile ? "64px" : "80px",
                borderRadius: "50%",
                backgroundColor: "#FFE5C0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "32px" : "40px",
                border: "3px solid white",
                boxShadow: "0 4px 16px rgba(255, 184, 77, 0.2)",
                flexShrink: 0,
              }}
            >
              {currentTestimonial.avatar}
            </div>

            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "8px",
                }}
              >
                {currentTestimonial.name}
              </h3>
              <div
                style={{
                  fontSize: isMobile ? "14px" : "15px",
                  color: "#8A8A8A",
                  marginBottom: "8px",
                }}
              >
                📍 {currentTestimonial.location}
              </div>
              <div style={{ display: "flex", gap: "4px" }}>
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <span key={i} style={{ color: "#FFB84D", fontSize: "18px" }}>
                    ⭐
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Review Text */}
          <p
            style={{
              fontSize: isMobile ? "16px" : "19px",
              color: "#5A5A5A",
              lineHeight: "1.8",
              marginBottom: "32px",
              fontStyle: "italic",
            }}
          >
            {currentTestimonial.review}
          </p>

          {/* Service Badge & Date */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              gap: "12px",
              paddingTop: "24px",
              borderTop: "2px solid #FFE5DB",
            }}
          >
            <div
              style={{
                padding: "8px 20px",
                backgroundColor: "#FFF8F5",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#FFB84D",
                border: "2px solid #FFE5DB",
              }}
            >
              {currentTestimonial.service}
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#ABABAB",
              }}
            >
              {new Date(currentTestimonial.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          {!isMobile && (
            <>
              <button
                onClick={goToPrevious}
                style={{
                  position: "absolute",
                  left: "-20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  border: "3px solid #FFE5DB",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  color: "#FFB84D",
                  boxShadow: "0 4px 16px rgba(255, 180, 162, 0.2)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFB84D";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.transform =
                    "translateY(-50%) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "#FFB84D";
                  e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                }}
                aria-label="Previous testimonial"
              >
                ←
              </button>

              <button
                onClick={goToNext}
                style={{
                  position: "absolute",
                  right: "-20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  border: "3px solid #FFE5DB",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  color: "#FFB84D",
                  boxShadow: "0 4px 16px rgba(255, 180, 162, 0.2)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFB84D";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.transform =
                    "translateY(-50%) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "#FFB84D";
                  e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                }}
                aria-label="Next testimonial"
              >
                →
              </button>
            </>
          )}
        </div>

        {/* Dot Indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginTop: "40px",
          }}
        >
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: currentIndex === index ? "32px" : "12px",
                height: "12px",
                borderRadius: "6px",
                backgroundColor: currentIndex === index ? "#FFB84D" : "#FFE5DB",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile Navigation Buttons */}
        {isMobile && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginTop: "32px",
            }}
          >
            <button
              onClick={goToPrevious}
              style={{
                padding: "12px 24px",
                backgroundColor: "white",
                border: "2px solid #FFE5DB",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "600",
                color: "#FFB84D",
                cursor: "pointer",
              }}
            >
              ← Previous
            </button>
            <button
              onClick={goToNext}
              style={{
                padding: "12px 24px",
                backgroundColor: "#FFB84D",
                border: "2px solid #FFB84D",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "600",
                color: "white",
                cursor: "pointer",
              }}
            >
              Next →
            </button>
          </div>
        )}

        {/* Counter */}
        <div
          style={{
            textAlign: "center",
            marginTop: "24px",
            fontSize: "14px",
            color: "#ABABAB",
            fontWeight: "600",
          }}
        >
          {currentIndex + 1} / {TESTIMONIALS.length}
        </div>
      </div>
    </section>
  );
};

// ============================================
// BOOK DIBBY SERVICE MODAL (Pre-filled from listing)
// ============================================

// ============================================
// SUBMIT LISTING MODAL COMPONENT
// ============================================
const SubmitListingModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  sendEmailNotifications: (orderData: any) => Promise<void>;
  setConfirmedOrder: (data: any) => void; // ← ADD THIS
  setCurrentPage: (page: string) => void; // ← ADD THIS
}> = ({
  isOpen,
  onClose,
  sendEmailNotifications,
  setConfirmedOrder,
  setCurrentPage,
}) => {
  // ← ADD TO DESTRUCTURE
  const { isMobile } = useResponsive();
  const [formData, setFormData] = useState({
    listingUrl: "",
    service: "full",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.listingUrl.trim())
      newErrors.listingUrl = "Listing URL is required";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Please enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // Generate order ID
        const orderId = "DIB-" + Date.now();

        // Prepare data for Google Sheets
        const orderData = {
          orderId: orderId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service:
            formData.service === "full"
              ? "Full Service ($138)"
              : formData.service === "inspection"
              ? "Inspection Only ($49)"
              : formData.service === "delivery"
              ? "Delivery Only ($89)"
              : "Property Tour ($49)",
          listingTitle: "User Submitted Listing",
          listingUrl: formData.listingUrl,
          location: "N/A",
          price: "TBD",
          notes: formData.notes || "",
        };

        // Send to Google Sheets
        await fetch(
          "https://script.google.com/macros/s/AKfycbyKqQAIpLpAmb2TFc_AjgCzSeHfzZk5TKLOasUwFfW3uMJH5DKA05a9g6-Db3tqUexa/exec",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          }
        );
        console.log("📧 About to send emails, orderData:", orderData); // ← HERE!
        console.log(
          "📧 sendEmailNotifications function:",
          typeof sendEmailNotifications
        );

        // Send email notifications
        await sendEmailNotifications(orderData);

        console.log("✅ Emails sent! Now redirecting...");
        console.log("setConfirmedOrder type:", typeof setConfirmedOrder);
        console.log("setCurrentPage type:", typeof setCurrentPage);

        // Store order details and redirect to confirmation page
        setConfirmedOrder(orderData);
        setCurrentPage("confirmation");
        // Store order details and redirect to confirmation page
        setConfirmedOrder(orderData);
        setCurrentPage("confirmation");

        // Close modal
        onClose();
      } catch (error) {
        console.error("Submission error:", error);
        alert(
          "❌ Submission failed. Please try again or contact support@dibby.com"
        );
      }
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
        padding: isMobile ? "20px" : "40px",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          borderRadius: isMobile ? "24px" : "32px",
          padding: isMobile ? "32px 24px" : "48px",
          maxWidth: "600px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: isMobile ? "16px" : "24px",
            right: isMobile ? "16px" : "24px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#f0f2f5",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "24px",
            color: "#5A5A5A",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#e4e6eb")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#f0f2f5")
          }
        >
          ×
        </button>

        <div style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: isMobile ? "28px" : "36px",
              fontWeight: "800",
              color: "#5A5A5A",
              marginBottom: "12px",
              letterSpacing: "-0.5px",
            }}
          >
            Submit a Listing
          </h2>
          <p style={{ fontSize: "16px", color: "#8A8A8A", lineHeight: "1.6" }}>
            Found something on Facebook Marketplace, Craigslist, or OfferUp?
            Paste the link below and we'll handle the rest!
          </p>
        </div>

        <div style={{ display: "grid", gap: "24px" }}>
          {/* Listing URL */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "15px",
                fontWeight: "600",
                color: "#5A5A5A",
                marginBottom: "10px",
              }}
            >
              Listing URL *
            </label>
            <input
              type="url"
              placeholder="https://facebook.com/marketplace/item/..."
              value={formData.listingUrl}
              onChange={(e) =>
                setFormData({ ...formData, listingUrl: e.target.value })
              }
              style={{
                width: "100%",
                padding: "14px 16px",
                fontSize: "15px",
                border: errors.listingUrl
                  ? "2px solid #FF6B6B"
                  : "2px solid #e4e6eb",
                borderRadius: "12px",
                outline: "none",
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
            {errors.listingUrl && (
              <p
                style={{
                  color: "#FF6B6B",
                  fontSize: "13px",
                  marginTop: "6px",
                }}
              >
                {errors.listingUrl}
              </p>
            )}
          </div>

          {/* Service Type */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "15px",
                fontWeight: "600",
                color: "#5A5A5A",
                marginBottom: "10px",
              }}
            >
              Service Type *
            </label>
            <div style={{ display: "grid", gap: "12px" }}>
              {[
                {
                  value: "full",
                  label: "Full Service",
                  price: "$150",
                  desc: "Inspection + Delivery",
                },
                {
                  value: "inspection",
                  label: "Inspection Only",
                  price: "$49",
                  desc: "Photos & Report",
                },
                {
                  value: "delivery",
                  label: "Delivery Only",
                  price: "$75",
                  desc: "Pickup & Delivery",
                },
              ].map((option) => (
                <label
                  key={option.value}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "16px",
                    border:
                      formData.service === option.value
                        ? "2px solid #FFB84D"
                        : "2px solid #e4e6eb",
                    borderRadius: "12px",
                    cursor: "pointer",
                    backgroundColor:
                      formData.service === option.value ? "#FFF8F5" : "white",
                    transition: "all 0.2s",
                  }}
                >
                  <input
                    type="radio"
                    name="service"
                    value={option.value}
                    checked={formData.service === option.value}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    style={{ marginRight: "12px" }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#5A5A5A",
                        marginBottom: "2px",
                      }}
                    >
                      {option.label}
                    </div>
                    <div style={{ fontSize: "13px", color: "#8A8A8A" }}>
                      {option.desc}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#FFB84D",
                    }}
                  >
                    {option.price}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "15px",
                fontWeight: "600",
                color: "#5A5A5A",
                marginBottom: "10px",
              }}
            >
              Your Name *
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              style={{
                width: "100%",
                padding: "14px 16px",
                fontSize: "15px",
                border: errors.name ? "2px solid #FF6B6B" : "2px solid #e4e6eb",
                borderRadius: "12px",
                outline: "none",
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
            {errors.name && (
              <p
                style={{
                  color: "#FF6B6B",
                  fontSize: "13px",
                  marginTop: "6px",
                }}
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Email & Phone */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "16px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#5A5A5A",
                  marginBottom: "10px",
                }}
              >
                Email *
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: "15px",
                  border: errors.email
                    ? "2px solid #FF6B6B"
                    : "2px solid #e4e6eb",
                  borderRadius: "12px",
                  outline: "none",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
              {errors.email && (
                <p
                  style={{
                    color: "#FF6B6B",
                    fontSize: "13px",
                    marginTop: "6px",
                  }}
                >
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#5A5A5A",
                  marginBottom: "10px",
                }}
              >
                Phone *
              </label>
              <input
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: "15px",
                  border: errors.phone
                    ? "2px solid #FF6B6B"
                    : "2px solid #e4e6eb",
                  borderRadius: "12px",
                  outline: "none",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
              {errors.phone && (
                <p
                  style={{
                    color: "#FF6B6B",
                    fontSize: "13px",
                    marginTop: "6px",
                  }}
                >
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "15px",
                fontWeight: "600",
                color: "#5A5A5A",
                marginBottom: "10px",
              }}
            >
              Additional Notes (Optional)
            </label>
            <textarea
              placeholder="Any special instructions or questions..."
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={4}
              style={{
                width: "100%",
                padding: "14px 16px",
                fontSize: "15px",
                border: "2px solid #e4e6eb",
                borderRadius: "12px",
                outline: "none",
                fontFamily: "inherit",
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: "16px",
              backgroundColor: "#FFB84D",
              border: "none",
              borderRadius: "12px",
              fontSize: "17px",
              fontWeight: "700",
              color: "white",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(255, 184, 77, 0.3)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(255, 184, 77, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 16px rgba(255, 184, 77, 0.3)";
            }}
          >
            Submit Listing →
          </button>

          <p
            style={{
              fontSize: "13px",
              color: "#8A8A8A",
              textAlign: "center",
              marginTop: "8px",
            }}
          >
            We'll contact you within 24 hours to confirm details
          </p>
        </div>
      </div>
    </div>
  );
};
// ============================================
// SKELETON CARD COMPONENT
// ============================================
const SkeletonCard = () => (
  <div
    style={{
      backgroundColor: "white",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
    }}
  >
    <style>{`
      @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
      }
    `}</style>
    <div
      style={{
        aspectRatio: "1/1",
        backgroundColor: "#f0f2f5",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
          animation: "shimmer 1.5s infinite",
        }}
      />
    </div>
    <div style={{ padding: "12px" }}>
      <div
        style={{
          height: "20px",
          backgroundColor: "#f0f2f5",
          borderRadius: "4px",
          marginBottom: "8px",
          width: "60%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
            animation: "shimmer 1.5s infinite",
          }}
        />
      </div>
      <div
        style={{
          height: "16px",
          backgroundColor: "#f0f2f5",
          borderRadius: "4px",
          marginBottom: "4px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
            animation: "shimmer 1.5s infinite",
          }}
        />
      </div>
      <div
        style={{
          height: "14px",
          backgroundColor: "#f0f2f5",
          borderRadius: "4px",
          width: "80%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
            animation: "shimmer 1.5s infinite",
          }}
        />
      </div>
    </div>
  </div>
);

// ============================================
// STICKY CTA BUTTON COMPONENT (NEW - SEO Enhancement)
// ============================================
const StickyCTA: React.FC<{
  show: boolean;
  onClick: () => void;
  activeView: string;
}> = ({ show, onClick, activeView }) => {
  const { isMobile } = useResponsive();

  if (!show || activeView !== "landing") return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: isMobile ? "20px" : "32px",
        right: isMobile ? "20px" : "32px",
        zIndex: 999,
        animation: "slideUp 0.5s ease-out",
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      <button
        onClick={onClick}
        style={{
          padding: isMobile ? "16px 24px" : "20px 32px",
          backgroundColor: "#FFB84D",
          border: "none",
          borderRadius: "50px",
          fontSize: isMobile ? "15px" : "17px",
          fontWeight: "700",
          color: "white",
          cursor: "pointer",
          boxShadow: "0 8px 32px rgba(255, 184, 77, 0.4)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          transition: "all 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow =
            "0 12px 40px rgba(255, 184, 77, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow =
            "0 8px 32px rgba(255, 184, 77, 0.4)";
        }}
      >
        <Package size={20} />
        Submit a Listing
      </button>
    </div>
  );
};

// ============================================
// READING PROGRESS BAR COMPONENT (NEW - SEO Enhancement)
// ============================================
const ReadingProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "4px",
        backgroundColor: "#FFE5DB",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          backgroundColor: "#FFB84D",
          transition: "width 0.1s ease-out",
        }}
      />
    </div>
  );
};

// ============================================
// MAIN APP COMPONENT - STATE & UTILITY FUNCTIONS
// ============================================
// ============================================
// TRUST BAR COMPONENT - Above Fold Trust Signals
// ============================================
const TrustBar: React.FC = () => {
  const { isMobile } = useResponsive();

  const trustSignals = [
    { icon: "🏆", text: "BBB A+ Rated" },
    { icon: "⭐", text: "4.9/5 Rating" },
    { icon: "🛡️", text: "$1M Insured" },
    { icon: "✓", text: "50,000+ Happy Customers" },
    { icon: "🔒", text: "Background Checked" },
  ];

  return (
    <div
      style={{
        backgroundColor: "#F0F9FF",
        borderBottom: "1px solid #DBEAFE",
        padding: isMobile ? "12px 16px" : "16px 32px",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: isMobile ? "12px" : "32px",
          overflowX: "hidden",
          width: "100%",
        }}
      >
        {trustSignals
          .slice(0, isMobile ? 3 : 5) // ← Only show 3 on mobile, 5 on desktop
          .map((signal, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                whiteSpace: "nowrap",
                fontSize: isMobile ? "13px" : "14px",
                fontWeight: 600,
                color: "#1E40AF",
              }}
            >
              <span style={{ fontSize: isMobile ? "16px" : "18px" }}>
                {signal.icon}
              </span>
              {signal.text}
            </div>
          ))}
      </div>
    </div>
  );
};

// Memoized input to prevent re-render focus loss
const MemoizedInput = React.memo(
  ({
    type = "text",
    placeholder,
    value,
    onChange,
    onKeyPress,
    style,
    id,
  }: any) => (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      style={style}
    />
  )
);

const App: React.FC = () => {
  // Initialize EmailJS
  React.useEffect(() => {
    emailjs.init("G-bnsWd8dDK3bcgC6"); // Your public key
  }, []);
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [dynamicRoute, setDynamicRoute] = useState<RouteParams | null>(null);
  const [is404, setIs404] = useState(false);
  const [showIngest, setShowIngest] = useState(false);

  // Marketplace State - ADD THIS ENTIRE BLOCK:
  const [loading, setLoading] = useState<boolean>(false);
  const [rawResults, setRawResults] = useState<ListingItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedListing, setSelectedListing] = useState<ListingItem | null>(
    null
  );
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [detailedImages, setDetailedImages] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeView, setActiveView] = useState<
    "browse" | "inbox" | "saved" | "landing"
  >("landing");
  const [locationSearch, setLocationSearch] = useState<string>("");
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);
  const [searchLocation, setSearchLocation] = useState({
    latitude: "",
    longitude: "",
    radius: "25",
    name: "",
  });
  const [priceRange, setPriceRange] = useState({
    min: "",
    max: "",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [bedrooms, setBedrooms] = useState<string>("all");
  const [bathrooms, setBathrooms] = useState<string>("all");
  const [propertyType, setPropertyType] = useState<string>("all");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

const [recentLocations, setRecentLocations] = useState<Array<{ name: string; lat: string; lng: string }>>(() => {
  const saved = localStorage.getItem("recentLocations");
    return saved ? JSON.parse(saved) : [];
  });

  // ADD THIS:
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem("recentlyViewed");
    return saved ? JSON.parse(saved) : [];
  });

  // ADD THESE:
  const [vehicleMake, setVehicleMake] = useState<string>("all");
  const [vehicleModel, setVehicleModel] = useState<string>("all");

  // ADD THESE:
const [sortBy, setSortBy] = useState<string>("recent");
const [condition, setCondition] = useState<string>("all");
const [titleFilter, setTitleFilter] = useState<string>("");           // ← NEW
const [vehicleYearMin, setVehicleYearMin] = useState<string>("all"); // ← NEW
const [vehicleYearMax, setVehicleYearMax] = useState<string>("all"); // ← NEW

const [daysSinceListed, setDaysSinceListed] = useState<string>("all");

  // ADD THIS:
  const [displayCount, setDisplayCount] = useState<number>(20);

  // ADD THIS:
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

 // ADD THESE:
const [currentPage, setCurrentPage] = useState<string>("home");
const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
const [isDibbyModalOpen, setIsDibbyModalOpen] = useState<boolean>(false);
const [confirmedOrder, setConfirmedOrder] = useState<any>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<any>(null);
  // ADD THIS:
const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
// ADD THIS:
// ADD THIS:
const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: string }>>([]);
const [conversations, setConversations] = useState<any[]>([]);
const [activeConversation, setActiveConversation] = useState<string | null>(
  null
);
const [messageText, setMessageText] = useState<string>("");

const sendMessage = () => {
  if (!messageText.trim()) return;
  showToast("Messaging feature coming soon!", "success");
  setMessageText("");
};
  
const toggleFavorite = (id: string) => {
  setFavorites((prev) => {
    const newFavorites = prev.includes(id)
      ? prev.filter((favId) => favId !== id)
      : [...prev, id];
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    return newFavorites;
  });
};// ADD THIS - Computed active filters:
const activeFilters = [
  selectedCategory?.name && selectedCategory.name !== "All"
    ? selectedCategory.name
    : null,
  priceRange.min ? `Min: $${priceRange.min}` : null,
  priceRange.max ? `Max: $${priceRange.max}` : null,
  condition !== "all" ? condition : null,
  daysSinceListed !== "all" ? `Listed: ${daysSinceListed}` : null,
].filter(Boolean);
// ADD THIS:
const clearAllFilters = () => {
  setSelectedCategory(null);
    setPriceRange({ min: "", max: "" });
    setCondition("all");
    setDaysSinceListed("all");
    setBedrooms("all");
    setBathrooms("all");
    setPropertyType("all");
    setVehicleMake("all");
    setVehicleModel("all");
  };

  // ============================================
  // STEP 2: EXTRACT CITY FROM URL (REPLACES ~line 1501)
  // ============================================
  const getCurrentCityFromURL = (): { city: string; state: string } => {
    const pathname = window.location.pathname;
    const pathParts = pathname.split("/").filter((p) => p);

    console.log("🔍 Parsing URL:", { pathname, pathParts });

    // Pattern 1: /marketplace/city-state
    if (pathParts[0] === "marketplace" && pathParts[1]) {
      const match = pathParts[1].match(/^(.+)-([a-z]{2})$/i);
      if (match) {
        const city = match[1].replace(/-/g, " ");
        const state = match[2].toUpperCase();
        console.log("✅ Found city from /marketplace/city-state:", {
          city,
          state,
        });
        return { city, state };
      }
    }

    // Pattern 2: /city-state (landing page)
    if (pathParts.length === 1) {
      const match = pathParts[0].match(/^(.+)-([a-z]{2})$/i);
      if (match) {
        const city = match[1].replace(/-/g, " ");
        const state = match[2].toUpperCase();
        console.log("✅ Found city from /city-state:", { city, state });
        return { city, state };
      }
    }

    console.log("⚠️ No city in URL");
    return { city: "", state: "" };
  };

  // ============================================
  // STEP 3: MAIN FETCH FUNCTION (REPLACES ~line 1955-2070)
  // ============================================
  const fetchMarketplaceListings = async (
    options: {
      city?: string;
      category?: string;
      searchText?: string;
      minPrice?: string;
      maxPrice?: string;
    } = {}
  ): Promise<void> => {
    console.log("🚀 fetchMarketplaceListings called with:", options);

    setLoading(true);
    setRawResults([]);

    try {
      // Check what cities exist in DB
      if (!options.city) {
        const { data: cityCheck } = await supabase
          .from("listings")
          .select("city")
          .limit(100);

const uniqueCities = Array.from(new Set(cityCheck?.map((item) => item.city) || []));       
        console.log("🏙️ Cities available in database:", uniqueCities);
      }

      // Build the query
      let query = supabase.from("listings").select("*").eq("is_live", true);

      // ADD THIS - Check what cities exist in DB:
      if (!options.city) {
        const { data: cityCheck } = await supabase
          .from("listings")
          .select("city")
          .limit(100);

const uniqueCities = Array.from(new Set(cityCheck?.map((item) => item.city) || []));
        console.log("🏙️ Cities available in database:", uniqueCities);
      }

      // Filter by city
      if (options.city && options.city.trim()) {
        console.log("📍 Filtering by city:", options.city);
        query = query.ilike("city", `%${options.city}%`);
      }

      // Filter by category
      if (options.category && options.category.trim()) {
        console.log("📂 Filtering by category:", options.category);

        // Normalize category name: "Property Rentals" → "property-rentals"
        const normalizedCategory = options.category
          .toLowerCase()
          .replace(/\s+/g, "-");

        query = query.ilike("category_name", `%${options.category}%`);
      }

      // Filter by search text
      if (options.searchText && options.searchText.trim()) {
        console.log("🔍 Filtering by search text:", options.searchText);
        query = query.ilike("title", `%${options.searchText}%`);
      }

      // Filter by price range
      if (options.minPrice) {
        const minPrice = parseFloat(options.minPrice);
        if (!isNaN(minPrice)) {
          console.log("💰 Min price:", minPrice);
          query = query.gte("price", minPrice);
        }
      }

      if (options.maxPrice) {
        const maxPrice = parseFloat(options.maxPrice);
        if (!isNaN(maxPrice)) {
          console.log("💰 Max price:", maxPrice);
          query = query.lte("price", maxPrice);
        }
      }

      // Sort by most recent
      query = query.order("scraped_at", { ascending: false });

      // Execute query
      const { data, error } = await query.limit(100);

      console.log("📊 Supabase response:", {
        count: data?.length || 0,
        error,
        firstItem: data?.[0],
      });

      if (error) {
        console.error("❌ Supabase error:", error);
        showToast(`Database error: ${error.message}`, "error");
        return;
      }

      if (!data || data.length === 0) {
        console.log("⚠️ No listings found");

        // Build helpful message
        const filters = [];
        if (options.city) filters.push(`in ${options.city}`);
        if (options.category) filters.push(`category: ${options.category}`);
        if (options.searchText) filters.push(`search: "${options.searchText}"`);

        const message =
          filters.length > 0
            ? `No listings found ${filters.join(", ")}`
            : "No listings found";

        showToast(message, "warning");
        setRawResults([]);
        return;
      }

      // Transform data to match your existing format
      const transformed = data.map((item) => ({
        id: item.id,
        marketplace_listing_title: item.title,
        custom_title: item.title,
        listing_price: {
          amount: item.price?.toString() || "0",
          formatted_amount: item.formatted_price || `$${item.price}`,
        },
        primary_listing_photo: item.images?.[0]
          ? { photo_image_url: item.images[0] }
          : undefined,
        listing_photos: item.images
          ? item.images.map((url: string) => ({ photo_image_url: url }))
          : [],
        location: {
          reverse_geocode: {
            city: item.city || "Unknown",
            state: item.state || "",
          },
        },
        listingUrl: item.listing_url,
        custom_sub_titles_with_rendering_flags: item.mileage
          ? [{ subtitle: item.mileage }]
          : [],
        creation_time: new Date(item.scraped_at).getTime() / 1000,
      }));

      console.log("✅ Transformed items:", transformed.length);

      // Build success message
      const filters = [];
      if (options.city) filters.push(options.city);
      if (options.category) filters.push(options.category);

      const message =
        filters.length > 0
          ? `Found ${transformed.length} items in ${filters.join(" - ")}`
          : `Found ${transformed.length} items`;

      showToast(message, "success");
      setRawResults(transformed);
    } catch (error: any) {
      console.error("❌ Fetch error:", error);
      showToast(`Failed to load listings: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // STEP 4: CATEGORY CLICK HANDLER (REPLACES ~line 2071-2075)
  // ============================================
  const handleCategoryClick = async (category: Category): Promise<void> => {
    console.log("🎯 Category clicked:", category.name);

    setSelectedCategory(category);
    setSearchQuery(""); // Clear search when selecting category
    setActiveView("browse");

    // Get city from URL
    const { city } = getCurrentCityFromURL();

    // Fetch with category + city (if available)
    await fetchMarketplaceListings({
      city,
      category: category.name,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    });
  };

  // ============================================
  // STEP 5: SEARCH HANDLER (REPLACES ~line 2077-2085)
  // ============================================
  const handleSearch = async (): Promise<void> => {
    if (!searchQuery.trim()) {
      showToast("Please enter a search term", "warning");
      return;
    }

    console.log("🔍 Search:", searchQuery);

    setSelectedCategory(null); // Clear category when searching
    setActiveView("browse");

    // Get city from URL
    const { city } = getCurrentCityFromURL();

    // Fetch with search text + city (if available)
    await fetchMarketplaceListings({
      city,
      searchText: searchQuery.trim(),
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    });
  };

  // ============================================
  // STEP 6: LOCATION SEARCH HANDLER (NEW)
  // ============================================

  const handleLocationSearch = async (): Promise<void> => {
    if (!locationSearch.trim()) {
      showToast("Please enter a city or zip code", "warning");
      return;
    }

    console.log("📍 Location search:", locationSearch);
    setIsLoadingLocation(true);

    try {
      // Geocode the location
      const zipMatch = locationSearch.match(/^\d{5}$/);
      const searchTerm = zipMatch ? `${locationSearch}, USA` : locationSearch;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchTerm
        )}&limit=1&countrycodes=us`,
        { headers: { "User-Agent": "MarketplaceExplorer/1.0" } }
      );

      if (!response.ok) throw new Error("Geocoding failed");

      const data = await response.json();

      if (!data || data.length === 0) {
        showToast("Location not found", "error");
        setIsLoadingLocation(false);
        return;
      }

      const result = data[0];
      const displayName = result.display_name.split(",").slice(0, 2).join(",");

      // Update location state
      setSearchLocation({
        latitude: result.lat.toString(),
        longitude: result.lon.toString(),
        radius: searchLocation.radius,
        name: displayName,
      });

      showToast(`Location set to: ${displayName}`, "success");

      // Extract city name for filtering
      let cityForFiltering = "";

      // If it's a zip code search, get the city from address
      if (zipMatch) {
        cityForFiltering =
          result.address?.city ||
          result.address?.town ||
          result.address?.village ||
          "";
      } else {
        // For city search, use the search term directly
        cityForFiltering = locationSearch.split(",")[0].trim();
      }

      console.log("📍 Extracted city for filtering:", cityForFiltering);

      // Fetch listings for this city
      await fetchMarketplaceListings({
        city: cityForFiltering,

        category: selectedCategory?.name,
        searchText: searchQuery.trim() || undefined,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
      });
    } catch (error: any) {
      console.error("❌ Location search error:", error);
      showToast("Failed to find location", "error");
    } finally {
      setIsLoadingLocation(false);
      setLocationSearch(""); // Clear the input
    }
  };

  // ============================================
  // STEP 7: INITIAL LOAD EFFECT (REPLACES ~line 2098-2109)
  // ============================================
  useEffect(() => {
    console.log("🔄 activeView changed to:", activeView);

    // Only load when entering browse view with no data
    if (activeView === "browse" && rawResults.length === 0 && !loading) {
      console.log("🚀 Initial browse view load");

      const { city } = getCurrentCityFromURL();

      // If we have a selected category, use it
      if (selectedCategory) {
        fetchMarketplaceListings({
          city,
          category: selectedCategory.name,
        });
      }
      // Otherwise load furniture by default
      else {
        const defaultCategory = CATEGORIES.find((c) => c.id === "furniture");
        if (defaultCategory) {
          setSelectedCategory(defaultCategory);
          fetchMarketplaceListings({
            city,
            category: defaultCategory.name,
          });
        } else {
          // Fallback: load all listings
          fetchMarketplaceListings({ city });
        }
      }
    }
  }, [activeView]);

  // ============================================
  // STEP 8: DYNAMIC ROUTE HANDLER (NEW - ADD AFTER STEP 7)
  // ============================================
  useEffect(() => {
    console.log("🔄 dynamicRoute changed:", dynamicRoute);

if (dynamicRoute) {
  console.log("🎯 Loading dynamic route:", dynamicRoute);

      const city = dynamicRoute.city || "";
      const categoryName = dynamicRoute.category || "";

      // Update location display
      if (city && dynamicRoute.state) {
        setSearchLocation({
          ...searchLocation,
          name: `${city}, ${dynamicRoute.state}`,
        });
      }

      // Find matching category
      let matchedCategory = null;
      if (categoryName) {
        matchedCategory = CATEGORIES.find(
          (c) => c.name.toLowerCase() === categoryName.toLowerCase()
        );

        if (matchedCategory) {
          setSelectedCategory(matchedCategory);
        }
      }

      // Fetch listings
      fetchMarketplaceListings({
        city,
        category: matchedCategory?.name,
      });

      // Switch to browse view
      setTimeout(() => setActiveView("browse"), 100);
    }
  }, [dynamicRoute]);

  // ============================================
  // STEP 9: PRICE FILTER EFFECT (REPLACES ~line 1938-1952)
  // ============================================
  useEffect(() => {
    // Debounce price changes
    const timer = setTimeout(() => {
      if ((selectedCategory || searchQuery.trim()) && rawResults.length > 0) {
        console.log("💰 Price filter changed, refetching...");

        const { city } = getCurrentCityFromURL();

        fetchMarketplaceListings({
          city,
          category: selectedCategory?.name,
          searchText: searchQuery.trim() || undefined,
          minPrice: priceRange.min,
          maxPrice: priceRange.max,
        });
      }
    }, 800); // Wait 800ms after user stops typing

    return () => clearTimeout(timer);
  }, [priceRange.min, priceRange.max]);

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================

  // Toast Notification
  const showToast = (
    message: string,
    type: "success" | "error" | "warning" = "success"
  ) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  // Format Price
  const formatPrice = (listing: any) => {
    if (!listing?.listing_price?.amount) {
      return { display: "Contact for price", isError: true, numericValue: 0 };
    }

    const rawPrice = listing.listing_price.amount;
    let priceValue: number;
    if (typeof rawPrice === "string") {
      const cleanPrice = rawPrice.replace(/[^0-9.]/g, "");
      priceValue = parseFloat(cleanPrice);
    } else if (typeof rawPrice === "number") {
      priceValue = rawPrice;
    } else {
      return { display: "Price format error", isError: true, numericValue: 0 };
    }
    if (isNaN(priceValue)) {
      return { display: "Invalid price", isError: true, numericValue: 0 };
    }
    let displayPrice = priceValue;
    if (priceValue > 10000 && Number.isInteger(priceValue)) {
      displayPrice = priceValue / 100;
    }
    const formatted = displayPrice.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return {
      display: `$${formatted}`,
      isError: false,
      numericValue: displayPrice,
    };
  };

  // Send email notifications
  // Send email notifications
  const sendEmailNotifications = async (orderData: any) => {
    try {
      // Send customer confirmation email
      await emailjs.send(
        "service_1rrwiuo", // Your service ID
        "template_2kcwz9e", // Customer template ID
        {
          to_email: orderData.email,
          customer_name: orderData.name,
          orderId: orderData.orderId,
          service: orderData.service,
          listingTitle: orderData.listingTitle,
          price: orderData.price,
          customer_email: orderData.email,
        },
        "G-bnsWd8dDK3bcgC6" // Your public key
      );

      // Send admin notification email
      await emailjs.send(
        "service_1rrwiuo", // Your service ID
        "template_dcrzs54", // Admin template ID
        {
          orderId: orderData.orderId,
          customer_name: orderData.name,
          customer_email: orderData.email,
          customer_phone: orderData.phone,
          service: orderData.service,
          listingTitle: orderData.listingTitle,
          listingUrl: orderData.listingUrl,
          price: orderData.price,
          location: orderData.location,
          notes: orderData.notes || "No additional notes",
        },
        "G-bnsWd8dDK3bcgC6" // Your public key
      );

      console.log("✅ Emails sent successfully!");
    } catch (error) {
      console.error("❌ Email sending failed:", error);
    }
  };
  // Geocode Location
  const geocodeLocation = async (
    location: string
  ): Promise<{ lat: number; lng: number; display_name: string } | null> => {
    setIsLoadingLocation(true);
    try {
      const zipCodeMatch = location.match(/^\d{5}$/);
      let searchQuery = location;
      if (zipCodeMatch) {
        searchQuery = `${location}, USA`;
      }
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        searchQuery
      )}&limit=1&countrycodes=us`;
      const response = await fetch(url, {
        headers: { "User-Agent": "MarketplaceExplorer/1.0" },
      });
      if (!response.ok) throw new Error("Geocoding failed");
      const data = await response.json();
      if (data && data.length > 0) {
        const result = data[0];
        return {
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
          display_name: result.display_name.split(",").slice(0, 2).join(","),
        };
      }
      return null;
    } catch (error) {
      console.error("Geocoding error:", error);
      showToast("Failed to find location", "error");
      return null;
    } finally {
      setIsLoadingLocation(false);
    }
  };

  // Update Location
  const updateLocation = async () => {
    if (!locationSearch.trim()) {
      showToast("Please enter a location", "warning");
      return;
    }
    const result = await geocodeLocation(locationSearch.trim());
    if (result) {
      setSearchLocation({
        latitude: result.lat.toString(),
        longitude: result.lng.toString(),
        radius: searchLocation.radius,
        name: result.display_name,
      });
      setRecentLocations((prev) => {
        const filtered = prev.filter((loc) => loc.name !== result.display_name);
        return [
          {
            name: result.display_name,
            lat: result.lat.toString(),
            lng: result.lng.toString(),
          },
          ...filtered,
        ].slice(0, 5);
      });
      showToast(`Location set to: ${result.display_name}`, "success");
      setLocationSearch("");
    }
  };

  // Get Listing Details
  const getListingDetails = async (listingId: string) => {
    if (!listingId) {
      throw new Error("Listing ID is required");
    }

    try {
      const { data, error } = await supabase
        .from("listings")
        .select("images")
        .eq("id", listingId)
        .single();

      if (error) throw error;

      const transformedData = {
images: (data?.images || []).map((url: string) => ({
  uri: url,
          width: 800,
          height: 600,
        })),
      };

      return transformedData;
    } catch (error) {
      console.error("Failed to fetch listing details:", error);
      throw error;
    }
  };

  // Build Enhanced Query
  const buildEnhancedQuery = (baseQuery: string) => {
    let enhancedQuery = baseQuery;
    if (titleFilter.trim() !== "") {
      enhancedQuery = `${baseQuery} ${titleFilter.trim()}`;
    }
    if (condition !== "all") {
      enhancedQuery = `${enhancedQuery} ${condition.replace("_", " ")}`;
    }
    if (vehicleMake !== "all") {
      enhancedQuery = `${enhancedQuery} ${vehicleMake}`;
    }
    if (vehicleModel !== "all") {
      enhancedQuery = `${enhancedQuery} ${vehicleModel}`;
    }
    if (vehicleYearMin !== "all" && vehicleYearMax !== "all") {
      enhancedQuery = `${enhancedQuery} ${vehicleYearMin}-${vehicleYearMax}`;
    } else if (vehicleYearMin !== "all") {
      enhancedQuery = `${enhancedQuery} ${vehicleYearMin}`;
    } else if (vehicleYearMax !== "all") {
      enhancedQuery = `${enhancedQuery} ${vehicleYearMax}`;
    }
    if (bedrooms !== "all") {
      enhancedQuery = `${enhancedQuery} ${bedrooms} bedroom`;
    }
    if (bathrooms !== "all") {
      enhancedQuery = `${enhancedQuery} ${bathrooms} bathroom`;
    }
    if (propertyType !== "all") {
      enhancedQuery = `${enhancedQuery} ${propertyType}`;
    }
    return enhancedQuery.trim();
  };

  // ============================================
  // USE EFFECTS
  // ============================================

  // ============================================
  // 🚀 DETECT DYNAMIC MARKETPLACE URLS (7M PAGES)
  // ============================================
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      console.log("🔍 Route detected:", path);

      // Root path - must come first!
      if (path === "/" || path === "" || path === "/index.html") {
        console.log("✅ HOME PAGE");
        setCurrentPage("home");
        setActiveView("landing");
        setDynamicRoute(null);
        setIs404(false);
        return;
      }

      const existingCities = [
        "new-york-ny",
        "los-angeles-ca",
        "chicago-il",
        "houston-tx",
        "phoenix-az",
        "philadelphia-pa",
        "san-antonio-tx",
        "san-diego-ca",
        "dallas-tx",
        "san-jose-ca",
      ];

      // 🔥 FIX: Check for city LANDING pages first (e.g., /phoenix-az)
      const citySlugMatch = path.match(/^\/([a-z-]+-[a-z]{2})$/);
      if (citySlugMatch) {
        const citySlug = citySlugMatch[1];
        if (existingCities.includes(citySlug)) {
          console.log("✅ City LANDING page:", citySlug);
          setCurrentPage(`cities/${citySlug}`);
          setActiveView("landing");
          setDynamicRoute(null);
          setIs404(false);
          return;
        }
      }

      // 🔥 FIX: /marketplace/* ALWAYS shows marketplace grid, NOT landing
      if (path.startsWith("/marketplace/")) {
        const params = parseURL(path);

        if (params) {
          console.log("✅ MARKETPLACE PAGE:", params);
          setDynamicRoute(params);
setActiveView("browse");
          setIs404(false);
        } else {
          console.log("❌ Invalid marketplace URL");
          setIs404(true);
        }
        return;
      }

      // Other landing pages
      // Handle /marketplace root (browse view)
      if (path === "/marketplace") {
        console.log("✅ Marketplace browse");
        setActiveView("browse");
        setDynamicRoute(null);
        setIs404(false);
        return;
      }
      const pageMap: Record<string, string> = {
        "/how-it-works": "how-it-works",
        "/calculator": "calculator",
        "/about": "about",
        "/contact": "contact",
        "/blog": "blog",
        "/faq": "faq",
        "/privacy": "privacy",
        "/terms": "terms",
        "/service-areas": "service-areas",
        "/sitemap": "sitemap",
      };

      if (pageMap[path]) {
        console.log("✅ Landing page:", path);
        setCurrentPage(pageMap[path]);
        setActiveView("landing");
        setDynamicRoute(null);
        setIs404(false);
        return;
      }

      // No match - 404
      console.log("❌ 404");
      setIs404(true);
    };

    // Run on mount and listen for URL changes
    handleRouteChange();
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    const savedLocations = localStorage.getItem("recentLocations");
    const savedViewed = localStorage.getItem("recentlyViewed");
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedLocations) setRecentLocations(JSON.parse(savedLocations));
    if (savedViewed) setRecentlyViewed(JSON.parse(savedViewed));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("recentLocations", JSON.stringify(recentLocations));
  }, [recentLocations]);

  useEffect(() => {
    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // Reset vehicle model when make changes
  useEffect(() => {
    setVehicleModel("all");
  }, [vehicleMake]);

// Debounced filter refresh
  useEffect(() => {
    // Only refetch if we have data already
    if ((selectedCategory || searchQuery.trim()) && rawResults.length > 0) {
      const debounceTimer = setTimeout(() => {
        const { city } = getCurrentCityFromURL();
        fetchMarketplaceListings({
          city,
          category: selectedCategory?.name,
          searchText: searchQuery.trim() || undefined,
          minPrice: priceRange.min,
          maxPrice: priceRange.max,
        });
      }, 1500); // ⬅️ CHANGED: Wait 1.5 seconds so user can type
      return () => clearTimeout(debounceTimer);
    }
  }, [priceRange.min, priceRange.max]); // ⬅️ ONLY depend on priceRange, not everything else

  // Load initial listings when entering marketplace
  useEffect(() => {
    if (
      activeView === "browse" &&
      rawResults.length === 0 &&
      !selectedCategory
    ) {
      const defaultCategory = CATEGORIES.find((c) => c.id === "furniture");
      if (defaultCategory) {
        handleCategoryClick(defaultCategory);
      }
    }
  }, [activeView]);

  // Load listings when dynamic route changes
  useEffect(() => {
    if (dynamicRoute) {
      console.log("🎯 Dynamic route detected:", dynamicRoute);

      if (dynamicRoute.city && dynamicRoute.state) {
        setSearchLocation({
          ...searchLocation,
          name: `${dynamicRoute.city}, ${dynamicRoute.state}`,
        });
      }

      if (dynamicRoute.category) {
        const matchingCategory = CATEGORIES.find(
          (c) => c.name.toLowerCase() === dynamicRoute.category?.toLowerCase()
        );

        if (matchingCategory) {
          console.log("📂 Setting category from route:", matchingCategory.name);
          setSelectedCategory(matchingCategory);
          fetchMarketplaceListings({
            city: dynamicRoute.city,
            category: matchingCategory.name,
          });
        } else {
          console.log("⚠️ Category not found, showing all listings for city");
          setSelectedCategory(null);
          fetchMarketplaceListings({
            city: dynamicRoute.city,
          });
        }
      } else if (dynamicRoute.city) {
        console.log("🌆 Showing all listings for city:", dynamicRoute.city);
        setSelectedCategory(null);
        fetchMarketplaceListings({
          city: dynamicRoute.city,
        });
      }

      setTimeout(() => setActiveView("browse"), 100);
    }
  }, [dynamicRoute]);

  // Filtered results (just use rawResults directly for now)
  const filteredAndSortedResults = rawResults;
  const displayedResults = filteredAndSortedResults.slice(0, displayCount);
  const hasMore = displayCount < filteredAndSortedResults.length;

  const loadMore = () => {
    if (!isLoadingMore && hasMore) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setDisplayCount((prev) => prev + 24);
        setIsLoadingMore(false);
      }, 500);
    }
  };

  // Infinite scroll observer
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "200px",
      threshold: 0.1,
    };
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
        loadMore();
      }
    }, options);
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoadingMore]);

  useEffect(() => {
    const sentinel = document.getElementById("scroll-sentinel");
    if (sentinel && observerRef.current) {
      observerRef.current.observe(sentinel);
    }
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [displayedResults.length]);

  // Check if vehicle or property category
  const isVehicleCategory = selectedCategory?.type === "vehicle";
  const isPropertyCategory = selectedCategory?.type === "property";

  const BookDibbyServiceModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    listing: ListingItem | null;
    preSelectedService?: string;
    sendEmailNotifications: (orderData: any) => Promise<void>;
    setConfirmedOrder: (data: any) => void;
    setCurrentPage: (page: string) => void;
    setShowDetail: (show: boolean) => void;
    setActiveView: (view: string) => void;
  }> = ({
    isOpen,
    onClose,
    listing,
    preSelectedService = "full",
    sendEmailNotifications,
    setConfirmedOrder,
    setCurrentPage,
  }) => {

    const { isMobile } = useResponsive();
    const [formData, setFormData] = useState({
      listingUrl: "",
      service: preSelectedService,
      name: "",
      email: "",
      phone: "",
      notes: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Pre-fill listing URL when modal opens
    React.useEffect(() => {
      if (isOpen && listing) {
        // Only set once when modal first opens, don't override user's edits
        setFormData((prev) => ({
          listingUrl: `https://www.facebook.com/marketplace/item/${listing.id}`,
          service: preSelectedService,
          name: prev.name || "", // Keep existing values
          email: prev.email || "",
          phone: prev.phone || "",
          notes:
            prev.notes ||
            `Item: ${listing.marketplace_listing_title}\nPrice: ${
              formatPrice(listing).display
            }\nLocation: ${
              listing.location?.reverse_geocode?.city || "Unknown"
            }`,
        }));
      }
    }, [isOpen]); // Remove 'listing' from dependency array

    if (!isOpen || !listing) return null;

    const priceInfo = formatPrice(listing);

    const handleSubmit = async () => {
      const newErrors: { [key: string]: string } = {};

      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
        newErrors.email = "Please enter a valid email";
      if (!formData.phone.trim()) newErrors.phone = "Phone is required";

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        // Show loading state
        const submitButton = document.querySelector(".submit-booking-button");
        if (submitButton) {
          (submitButton as HTMLButtonElement).disabled = true;
          (submitButton as HTMLButtonElement).innerText = "Booking...";
        }

        try {
          // Generate order ID
          const orderId = "DIB-" + Date.now();

          // Prepare data for Google Sheets
          const orderData = {
            orderId: orderId,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service:
              formData.service === "full"
                ? "Full Service ($138)"
                : formData.service === "inspection"
                ? "Inspection Only ($49)"
                : "Delivery Only ($89)",
            listingTitle: listing.marketplace_listing_title,
            listingUrl: formData.listingUrl,
            location:
              listing.location?.reverse_geocode?.city +
                ", " +
                listing.location?.reverse_geocode?.state || "Unknown",
            price: formatPrice(listing).display,
            notes: formData.notes,
          };

          // Send to Google Sheets
          const response = await fetch(
            "https://script.google.com/macros/s/AKfycbyKqQAIpLpAmb2TFc_AjgCzSeHfzZk5TKLOasUwFfW3uMJH5DKA05a9g6-Db3tqUexa/exec",
            {
              method: "POST",
              mode: "no-cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(orderData),
            }
          );
          await sendEmailNotifications(orderData);

          console.log("✅ Emails sent! Now redirecting...");
          console.log("setConfirmedOrder type:", typeof setConfirmedOrder);
          console.log("setCurrentPage type:", typeof setCurrentPage);

          // Store order details and redirect to confirmation page
          setConfirmedOrder(orderData);
          console.log("📍 confirmedOrder SET!");

          onClose();
          setShowDetail(false);
          setActiveView("landing");

          setTimeout(() => {
            console.log("📍 About to change page to confirmation");
            setCurrentPage("confirmation");
            console.log("📍 setCurrentPage called!");
          }, 100);
          // Optional: Redirect to confirmation page (we'll build this next)
          // window.location.href = `/confirmation?order=${orderId}`;
        } catch (error) {
          console.error("Booking error:", error);
          showToast(
            "❌ Booking failed. Please try again or contact support.",
            "error"
          );
        } finally {
          // Reset button
          const submitButton = document.querySelector(".submit-booking-button");
          if (submitButton) {
            (submitButton as HTMLButtonElement).disabled = false;
            (submitButton as HTMLButtonElement).innerText =
              "Book Dibby Service →";
          }
        }
      }
    };

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3000,
          padding: isMobile ? "20px" : "40px",
          overflowY: "auto",
        }}
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: "white",
            borderRadius: isMobile ? "24px" : "32px",
            padding: isMobile ? "32px 24px" : "48px",
            maxWidth: "700px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            position: "relative",
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: isMobile ? "16px" : "24px",
              right: isMobile ? "16px" : "24px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#f0f2f5",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "24px",
              color: "#5A5A5A",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#e4e6eb")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#f0f2f5")
            }
          >
            ×
          </button>

          {/* Header */}
          <div style={{ marginBottom: "32px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <Shield size={32} color="#FFB84D" />
              <h2
                style={{
                  fontSize: isMobile ? "24px" : "32px",
                  fontWeight: "800",
                  color: "#5A5A5A",
                  margin: 0,
                  letterSpacing: "-0.5px",
                }}
              >
                Book Dibby Protection
              </h2>
            </div>
            <p
              style={{
                fontSize: "16px",
                color: "#8A8A8A",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              We'll inspect and/or deliver this item safely with $1M insurance
              coverage.
            </p>
          </div>

          {/* Item Preview Card */}
          <div
            style={{
              backgroundColor: "#f7f8fa",
              borderRadius: "16px",
              padding: "16px",
              marginBottom: "32px",
              border: "2px solid #e4e6eb",
            }}
          >
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              {listing.primary_listing_photo?.photo_image_url && (
                <img
                  src={listing.primary_listing_photo.photo_image_url}
                  alt={listing.marketplace_listing_title}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "8px",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#050505",
                    marginBottom: "4px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {listing.marketplace_listing_title}
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#FFB84D",
                    marginBottom: "4px",
                  }}
                >
                  {priceInfo.display}
                </div>
                <div style={{ fontSize: "14px", color: "#65676b" }}>
                  {listing.location?.reverse_geocode?.city || "Location"},{" "}
                  {listing.location?.reverse_geocode?.state || ""}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gap: "24px" }}>
            {/* Service Type */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#5A5A5A",
                  marginBottom: "12px",
                }}
              >
                Choose Your Service *
              </label>
              <div style={{ display: "grid", gap: "12px" }}>
                {[
                  {
                    value: "full",
                    label: "Full Service",
                    price: "$138",
                    desc: "Inspection + Delivery + Insurance",
                    icon: "⭐",
                  },
                  {
                    value: "inspection",
                    label: "Inspection Only",
                    price: "$49",
                    desc: "Photos & Condition Report",
                    icon: "📸",
                  },
                  {
                    value: "delivery",
                    label: "Delivery Only",
                    price: "$89",
                    desc: "Pickup & Delivery",
                    icon: "🚚",
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "16px",
                      border:
                        formData.service === option.value
                          ? "2px solid #FFB84D"
                          : "2px solid #e4e6eb",
                      borderRadius: "12px",
                      cursor: "pointer",
                      backgroundColor:
                        formData.service === option.value ? "#FFF8F5" : "white",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (formData.service !== option.value) {
                        e.currentTarget.style.backgroundColor = "#f7f8fa";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (formData.service !== option.value) {
                        e.currentTarget.style.backgroundColor = "white";
                      }
                    }}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={option.value}
                      checked={formData.service === option.value}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      style={{ marginRight: "12px", cursor: "pointer" }}
                    />
                    <div style={{ fontSize: "24px", marginRight: "12px" }}>
                      {option.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#5A5A5A",
                          marginBottom: "2px",
                        }}
                      >
                        {option.label}
                      </div>
                      <div style={{ fontSize: "13px", color: "#8A8A8A" }}>
                        {option.desc}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#FFB84D",
                      }}
                    >
                      {option.price}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#5A5A5A",
                  marginBottom: "10px",
                }}
              >
                Your Name *
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: "15px",
                  border: errors.name
                    ? "2px solid #FF6B6B"
                    : "2px solid #e4e6eb",
                  borderRadius: "12px",
                  outline: "none",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
              {errors.name && (
                <p
                  style={{
                    color: "#FF6B6B",
                    fontSize: "13px",
                    marginTop: "6px",
                  }}
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email & Phone */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "16px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#5A5A5A",
                    marginBottom: "10px",
                  }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    fontSize: "15px",
                    border: errors.email
                      ? "2px solid #FF6B6B"
                      : "2px solid #e4e6eb",
                    borderRadius: "12px",
                    outline: "none",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                />
                {errors.email && (
                  <p
                    style={{
                      color: "#FF6B6B",
                      fontSize: "13px",
                      marginTop: "6px",
                    }}
                  >
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#5A5A5A",
                    marginBottom: "10px",
                  }}
                >
                  Phone *
                </label>
                <input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    fontSize: "15px",
                    border: errors.phone
                      ? "2px solid #FF6B6B"
                      : "2px solid #e4e6eb",
                    borderRadius: "12px",
                    outline: "none",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                />
                {errors.phone && (
                  <p
                    style={{
                      color: "#FF6B6B",
                      fontSize: "13px",
                      marginTop: "6px",
                    }}
                  >
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="submit-booking-button"
              style={{
                width: "100%",
                padding: "18px",
                backgroundColor: "#FFB84D",
                border: "none",
                borderRadius: "12px",
                fontSize: "17px",
                fontWeight: "700",
                color: "white",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(255, 184, 77, 0.3)",
                transition: "all 0.3s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(255, 184, 77, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(255, 184, 77, 0.3)";
              }}
            >
              <Shield size={20} />
              Book Dibby Service →
            </button>

            {/* WHAT HAPPENS NEXT TIMELINE */}
            <div
              style={{
                marginTop: "32px",
                padding: "24px",
                backgroundColor: "#f7f8fa",
                borderRadius: "12px",
                border: "1px solid #e4e6eb",
              }}
            >
              <h4
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#050505",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                ⏱️ What Happens Next
              </h4>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {/* Step 1 */}
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "#FFB84D",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      fontSize: "14px",
                      flexShrink: 0,
                    }}
                  >
                    1
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#050505",
                        marginBottom: "4px",
                      }}
                    >
                      Instant Confirmation
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#65676b",
                        lineHeight: "1.5",
                      }}
                    >
                      Get email confirmation immediately with your booking
                      details
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#FFB84D",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                    }}
                  >
                    30 seconds
                  </div>
                </div>

                {/* Step 2 */}
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "#FFB84D",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      fontSize: "14px",
                      flexShrink: 0,
                    }}
                  >
                    2
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#050505",
                        marginBottom: "4px",
                      }}
                    >
                      Inspector Assigned
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#65676b",
                        lineHeight: "1.5",
                      }}
                    >
                      Meet your background-checked inspector via text/email
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#FFB84D",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Within 2 hrs
                  </div>
                </div>

                {/* Step 3 */}
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "#FFB84D",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      fontSize: "14px",
                      flexShrink: 0,
                    }}
                  >
                    3
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#050505",
                        marginBottom: "4px",
                      }}
                    >
                      Inspection Complete
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#65676b",
                        lineHeight: "1.5",
                      }}
                    >
                      Receive HD photos, video, and detailed condition report
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#FFB84D",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                    }}
                  >
                    24-48 hrs
                  </div>
                </div>

                {/* Step 4 */}
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "#FFB84D",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      fontSize: "14px",
                      flexShrink: 0,
                    }}
                  >
                    4
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#050505",
                        marginBottom: "4px",
                      }}
                    >
                      Safe Delivery
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#65676b",
                        lineHeight: "1.5",
                      }}
                    >
                      Item delivered to your door with $1M insurance protection
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#FFB84D",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Same week
                  </div>
                </div>
              </div>
            </div>

            {/* MONEY-BACK GUARANTEE */}
            <div
              style={{
                marginTop: "20px",
                padding: "16px",
                backgroundColor: "#e7f3ff",
                borderRadius: "12px",
                border: "2px solid #1876f2",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#1876f2",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  flexShrink: 0,
                }}
              >
                🛡️
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#1876f2",
                    marginBottom: "4px",
                  }}
                >
                  100% Money-Back Guarantee
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#0c63d4",
                    lineHeight: "1.5",
                  }}
                >
                  Not satisfied? Full refund, no questions asked. Plus $1M
                  insurance on every service.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============================================
  // DETAIL MODAL COMPONENT - COMPLETE IMPLEMENTATION
  // ============================================
  const DetailModal = () => {
    if (!selectedListing || !showDetail) return null;

    const images =
      selectedListing.listing_photos &&
      selectedListing.listing_photos.length > 0
        ? selectedListing.listing_photos.map((photo) => photo.photo_image_url)
        : selectedListing.primary_listing_photo
        ? [selectedListing.primary_listing_photo.photo_image_url]
        : [];
    const hasImages = images.length > 0;

    // State for image transitions (only show spinner between image changes)
    const [imageTransitioning, setImageTransitioning] = React.useState(false);
    const [loadedImages, setLoadedImages] = React.useState<Set<number>>(
      new Set([0])
    ); // First image pre-loaded

    // Handle image loading
    const handleImageLoad = (index: number) => {
      setLoadedImages((prev) => {
        const newSet = new Set(prev);
        newSet.add(index);
        return newSet;
      });
      setImageTransitioning(false);
    };

    // Handle image change with loading check
    const handleImageChange = (newIndex: number) => {
      if (!loadedImages.has(newIndex)) {
        setImageTransitioning(true);
      }
      setCurrentImageIndex(newIndex);
    };

    const priceInfo = formatPrice(selectedListing);
    const location = selectedListing.location?.reverse_geocode;
    const locationText = location
      ? `${location.city || ""}${location.state ? ", " + location.state : ""}`
      : "Location not specified";
    const subtitles =
      selectedListing.custom_sub_titles_with_rendering_flags
        ?.map((s) => s.subtitle)
        .filter(Boolean) || [];

    // Calculate recommended Dibby service
    const itemPrice = priceInfo.numericValue;
    const recommendedService =
      itemPrice > 300 ? "full" : itemPrice > 100 ? "delivery" : "inspection";

    const dibbyPricing = {
      inspection: 49,
      delivery: 89,
      full: 138,
    };

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          zIndex: 2000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? "0" : "20px",
          overflow: "auto",
        }}
        onClick={() => setShowDetail(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: "#1c1e21",
            width: "100%",
            maxWidth: "1400px",
            height: isMobile ? "100vh" : "90vh",
            borderRadius: isMobile ? "0" : "8px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* LEFT SIDE - IMAGE GALLERY */}
          <div
            style={{
              flex: isMobile ? "0 0 50%" : "1 1 60%",
              backgroundColor: "#000",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              minWidth: 0,
            }}
          >
            {/* Top Bar with Back/Close */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
                zIndex: 10,
              }}
            >
              <button
                onClick={() => setShowDetail(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(8px)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)")
                }
              >
                <ChevronLeft size={20} />
                Back
              </button>
              <button
                onClick={() => setShowDetail(false)}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(8px)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "24px",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)")
                }
              >
                ×
              </button>
            </div>

            {/* Main Image with Blurred Background */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* LOADING SPINNER - Only between image changes */}
              {imageTransitioning && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 3,
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      border: "4px solid rgba(255, 255, 255, 0.1)",
                      borderTopColor: "#1876f2",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  <div
                    style={{
                      color: "#fff",
                      fontSize: "14px",
                      marginTop: "16px",
                      opacity: 0.7,
                    }}
                  >
                    Loading image...
                  </div>
                </div>
              )}

              {hasImages ? (
                <>
                  {/* BLURRED BACKGROUND */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                   backgroundImage: `url(${images[currentImageIndex]})`,
                      
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "blur(20px)",
                      opacity: 0.3,
                      transform: "scale(1.1)",
                    }}
                  />

                  {/* SHARP IMAGE */}
                  <img
               src={images[currentImageIndex]}
                    alt={`${
                      selectedListing.marketplace_listing_title
                    } - Image ${currentImageIndex + 1}`}
                    onLoad={() => handleImageLoad(currentImageIndex)}
                    onError={(e) => {
                      console.error(
                        "❌ Image failed to load:",
                        images[currentImageIndex]
                      );
                      e.currentTarget.style.display = "none";
                    }}
                    style={{
                      position: "relative",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      zIndex: 1,
                      opacity: imageTransitioning ? 0 : 1,
                      transition: "opacity 0.2s",
                    }}
                  />

                  {/* Navigation Arrows */}
                  {images.length > 1 && !isMobile && (
                    <>
                      <button
                        onClick={() =>
                          handleImageChange(Math.max(0, currentImageIndex - 1))
                        }
                        disabled={currentImageIndex === 0}
                        style={{
                          position: "absolute",
                          left: "20px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          backgroundColor:
                            currentImageIndex === 0
                              ? "rgba(255, 255, 255, 0.3)"
                              : "white",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "24px",
                          fontWeight: "bold",
                          color: "#000",
                          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                          cursor:
                            currentImageIndex === 0 ? "not-allowed" : "pointer",
                          opacity: currentImageIndex === 0 ? 0.5 : 1,
                          zIndex: 2,
                        }}
                      >
                        ‹
                      </button>

                      <button
                        onClick={() =>
                          handleImageChange(
                            Math.min(images.length - 1, currentImageIndex + 1)
                          )
                        }
                        disabled={currentImageIndex >= images.length - 1}
                        style={{
                          position: "absolute",
                          right: "20px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          backgroundColor:
                            currentImageIndex >= images.length - 1
                              ? "rgba(255, 255, 255, 0.3)"
                              : "white",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "24px",
                          fontWeight: "bold",
                          color: "#000",
                          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                          cursor:
                            currentImageIndex >= images.length - 1
                              ? "not-allowed"
                              : "pointer",
                          opacity:
                            currentImageIndex >= images.length - 1 ? 0.5 : 1,
                          zIndex: 2,
                        }}
                      >
                        ›
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {images.length > 1 && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "16px",
                        left: "16px",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: "600",
                        zIndex: 2,
                      }}
                    >
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}
                </>
              ) : (
                <div style={{ color: "#8A8A8A", textAlign: "center" }}>
                  <div style={{ fontSize: "48px", marginBottom: "8px" }}>
                    📷
                  </div>
                  <div style={{ fontSize: "14px" }}>No images available</div>
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {hasImages && images.length > 1 && (
              <div
                style={{
                  height: "80px",
                  padding: "10px",
                  backgroundColor: "#000",
                  display: "flex",
                  gap: "8px",
                  overflowX: "auto",
                  justifyContent: isMobile ? "flex-start" : "center",
                }}
              >
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleImageChange(idx)}
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      border:
                        currentImageIndex === idx
                          ? "3px solid #1876f2"
                          : "3px solid transparent",
                      opacity: currentImageIndex === idx ? 1 : 0.6,
                      transition: "all 0.2s",
                      flexShrink: 0,
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      if (currentImageIndex !== idx)
                        e.currentTarget.style.opacity = "0.8";
                    }}
                    onMouseLeave={(e) => {
                      if (currentImageIndex !== idx)
                        e.currentTarget.style.opacity = "0.6";
                    }}
                  >
                    <img
src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDE - LISTING INFO & ACTIONS */}
          <div
            style={{
              flex: isMobile ? "1" : "0 0 400px",
              backgroundColor: "white",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Price & Title */}
            <div style={{ padding: "20px", borderBottom: "1px solid #e4e6eb" }}>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#050505",
                  marginBottom: "8px",
                }}
              >
                {priceInfo.display}
              </div>
              <div
                style={{
                  fontSize: "17px",
                  color: "#050505",
                  lineHeight: "1.3",
                  marginBottom: "8px",
                }}
              >
                {selectedListing.marketplace_listing_title}
              </div>
              <div style={{ fontSize: "15px", color: "#65676b" }}>
                {locationText}
              </div>
            </div>

            {/* Message Seller Button */}
            <div style={{ padding: "16px", borderBottom: "1px solid #e4e6eb" }}>
              <button
                onClick={() =>
showToast("Messaging feature coming soon!", "success")                }
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#1876f2",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0c63d4")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1876f2")
                }
              >
                <MessageCircle size={18} />
                Message Seller
              </button>
            </div>

            {/* About This Item */}
            {subtitles.length > 0 && (
              <div
                style={{ padding: "16px", borderBottom: "1px solid #e4e6eb" }}
              >
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: "600",
                    color: "#050505",
                    marginBottom: "12px",
                  }}
                >
                  About this item
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#050505",
                    lineHeight: "1.5",
                    margin: 0,
                  }}
                >
                  {subtitles.join(" ")}
                </p>
              </div>
            )}

            {/* Seller Information */}
            <div style={{ padding: "16px", borderBottom: "1px solid #e4e6eb" }}>
              <h3
                style={{
                  fontSize: "17px",
                  fontWeight: "600",
                  color: "#050505",
                  marginBottom: "12px",
                }}
              >
                Seller information
              </h3>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#e4e6eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <User size={20} color="#65676b" />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#050505",
                    }}
                  >
                    Marketplace Seller
                  </div>
                  <div style={{ fontSize: "13px", color: "#65676b" }}>
                    Member since 2021
                  </div>
                </div>
              </div>
            </div>

            {/* GET DIBBY PROTECTION SECTION */}
            <div
              style={{
                padding: "20px",
                backgroundColor: "#f7f8fa",
                borderTop: "3px solid #FFB84D",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "16px",
                }}
              >
                <Shield size={24} color="#FFB84D" />
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#050505",
                    margin: 0,
                  }}
                >
                  Get Dibby Protection
                </h3>
              </div>

              <p
                style={{
                  fontSize: "14px",
                  color: "#65676b",
                  marginBottom: "20px",
                  lineHeight: "1.5",
                }}
              >
                Don't risk it! Let us inspect and deliver this item safely with
                $1M insurance.
              </p>

              {/* Recommended Service */}
              <div
                style={{
                  backgroundColor: "white",
                  border: "2px solid #FFB84D",
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "16px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "12px",
                    backgroundColor: "#FFB84D",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "12px",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "0.5px",
                  }}
                >
                  ⭐ RECOMMENDED
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#050505",
                    marginBottom: "8px",
                    marginTop: "8px",
                  }}
                >
                  {recommendedService === "full" && "Full Service Package"}
                  {recommendedService === "delivery" && "Delivery Service"}
                  {recommendedService === "inspection" && "Inspection Service"}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#65676b",
                    marginBottom: "12px",
                  }}
                >
                  {recommendedService === "full" &&
                    "✓ Inspection + Delivery + Insurance"}
                  {recommendedService === "delivery" &&
                    "✓ Professional Pickup & Delivery"}
                  {recommendedService === "inspection" &&
                    "✓ Photo & Video Inspection"}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "800",
                      color: "#FFB84D",
                    }}
                  >
                    ${dibbyPricing[recommendedService]}
                  </div>
                  <button
                    onClick={() => setIsDibbyModalOpen(true)}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#FFB84D",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Book Now →
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  margin: "20px 0",
                }}
              >
                <div
                  style={{ flex: 1, height: "1px", backgroundColor: "#e4e6eb" }}
                />
                <span
                  style={{
                    fontSize: "13px",
                    color: "#65676b",
                    fontWeight: "600",
                  }}
                >
                  OR CHOOSE
                </span>
                <div
                  style={{ flex: 1, height: "1px", backgroundColor: "#e4e6eb" }}
                />
              </div>

              {/* Other Service Options */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {recommendedService !== "inspection" && (
                  <button
                    onClick={() => setIsDibbyModalOpen(true)}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      backgroundColor: "white",
                      border: "1px solid #e4e6eb",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "#FFB84D")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "#e4e6eb")
                    }
                  >
                    <div style={{ textAlign: "left" }}>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#050505",
                        }}
                      >
                        📸 Inspection Only
                      </div>
                      <div style={{ fontSize: "12px", color: "#65676b" }}>
                        Photos & condition report
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#050505",
                      }}
                    >
                      $49
                    </div>
                  </button>
                )}

                {recommendedService !== "delivery" && (
                  <button
                    onClick={() => setIsDibbyModalOpen(true)}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      backgroundColor: "white",
                      border: "1px solid #e4e6eb",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "#FFB84D")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "#e4e6eb")
                    }
                  >
                    <div style={{ textAlign: "left" }}>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#050505",
                        }}
                      >
                        🚚 Delivery Only
                      </div>
                      <div style={{ fontSize: "12px", color: "#65676b" }}>
                        Safe pickup & delivery
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#050505",
                      }}
                    >
                      $89
                    </div>
                  </button>
                )}

                {recommendedService !== "full" && (
                  <button
                    onClick={() => setIsDibbyModalOpen(true)}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      backgroundColor: "white",
                      border: "1px solid #e4e6eb",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "#FFB84D")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "#e4e6eb")
                    }
                  >
                    <div style={{ textAlign: "left" }}>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#050505",
                        }}
                      >
                        ⭐ Full Service
                      </div>
                      <div style={{ fontSize: "12px", color: "#65676b" }}>
                        Inspection + Delivery
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#050505",
                      }}
                    >
                      $138
                    </div>
                  </button>
                )}
              </div>

              {/* Social Proof */}
              <div
                style={{
                  marginTop: "16px",
                  padding: "12px",
                  backgroundColor: "#e7f3ff",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div style={{ fontSize: "18px" }}>⚡</div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#1876f2",
                    fontWeight: "600",
                  }}
                >
                  247 people in {locationText.split(",")[0]} trusted Dibby this
                  month
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div style={{ padding: "16px" }}>
              <h3
                style={{
                  fontSize: "17px",
                  fontWeight: "600",
                  color: "#050505",
                  marginBottom: "12px",
                }}
              >
                Location
              </h3>
              <div
                style={{
                  fontSize: "15px",
                  color: "#65676b",
                  marginBottom: "16px",
                }}
              >
                {locationText}
              </div>
              <div
                style={{
                  height: "150px",
                  backgroundColor: "#e4e6eb",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(135deg, #E5F8FF 0%, #D4F1E8 100%)",
                    opacity: 0.3,
                  }}
                />
                <div style={{ position: "relative", textAlign: "center" }}>
                  <MapPin size={32} color="#65676b" />
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#050505",
                      marginTop: "8px",
                    }}
                  >
                    {location?.city || "Location"}
                  </div>
                </div>
              </div>
              <div
                style={{ fontSize: "12px", color: "#65676b", marginTop: "8px" }}
              >
                Location is approximate
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }; // ============================================
  // INBOX VIEW COMPONENT - COMPLETE IMPLEMENTATION
  // ============================================
  const InboxView = () => {
    const activeConv = conversations.find((c) => c.id === activeConversation);

    if (activeConversation && activeConv) {
      return (
        <div
          style={{
            height: "calc(100vh - 56px)",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              padding: "16px",
              borderBottom: "1px solid #e4e6eb",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: "white",
            }}
          >
            <button
              onClick={() => setActiveConversation(null)}
              aria-label="Back to conversations"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#f0f2f5",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#e4e6eb")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f2f5")
              }
            >
              <ChevronLeft size={20} />
            </button>
            <img
              src={activeConv.sellerAvatar}
              alt={activeConv.sellerName}
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#5A5A5A",
                }}
              >
                {activeConv.sellerName}
              </div>
              <div style={{ fontSize: "12px", color: "#8A8A8A" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#B8E6D5",
                    borderRadius: "50%",
                    marginRight: "6px",
                  }}
                ></span>
                Active now
              </div>
            </div>
            <button
              aria-label="More options"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#f0f2f5",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#e4e6eb")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f2f5")
              }
            >
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div
            style={{
              padding: "16px",
              borderBottom: "1px solid #e4e6eb",
              backgroundColor: "#f7f8fa",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "12px",
                padding: "12px",
                backgroundColor: "white",
                borderRadius: "8px",
                cursor: "pointer",
                border: "1px solid #e4e6eb",
                transition: "border-color 0.2s",
              }}
onClick={() => {
  setSelectedListing(activeConv.listing);
  setShowDetail(true);
}}              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#FFB84D")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#e4e6eb")
              }
            >
              <img
                src={activeConv.listing.primary_listing_photo?.photo_image_url}
                alt={activeConv.listing.marketplace_listing_title}
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#5A5A5A",
                    marginBottom: "4px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {activeConv.listing.marketplace_listing_title}
                </div>
                <div
                  style={{
                    fontSize: "17px",
                    color: "#5A5A5A",
                    fontWeight: "700",
                  }}
                >
                  {formatPrice(activeConv.listing).display}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <ChevronRight size={20} color="#8A8A8A" />
              </div>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 16px 0 16px",
              backgroundColor: "white",
            }}
          >
            {activeConv.messages.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  color: "#8A8A8A",
                }}
              >
                <div
                  style={{
                    width: "96px",
                    height: "96px",
                    margin: "0 auto 16px",
                    backgroundColor: "#f0f2f5",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MessageCircle size={48} color="#8A8A8A" />
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    marginBottom: "8px",
                    color: "#5A5A5A",
                  }}
                >
                  You are connected with {activeConv.sellerName}
                </div>
                <div style={{ fontSize: "15px", color: "#8A8A8A" }}>
                  Say hello and ask any questions you have about this item
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  paddingBottom: "16px",
                }}
              >
{activeConv.messages.map((msg: any, idx: number) => {
  const isMe = msg.senderId === "me";
                  const showAvatar =
                    !isMe &&
                    (idx === 0 ||
                      activeConv.messages[idx - 1]?.senderId !== msg.senderId);

                  return (
                    <div
                      key={msg.id}
                      style={{
                        display: "flex",
                        justifyContent: isMe ? "flex-end" : "flex-start",
                        gap: "8px",
                        alignItems: "flex-end",
                      }}
                    >
                      {!isMe && (
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            flexShrink: 0,
                          }}
                        >
                          {showAvatar && (
                            <img
                              src={activeConv.sellerAvatar}
                              alt={activeConv.sellerName}
                              style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "50%",
                              }}
                            />
                          )}
                        </div>
                      )}
                      <div
                        style={{
                          maxWidth: "65%",
                          padding: "10px 12px",
                          borderRadius: "18px",
                          backgroundColor: isMe ? "#FFB84D" : "#f0f2f5",
                          color: isMe ? "white" : "#5A5A5A",
                          fontSize: "15px",
                          lineHeight: "1.3333",
                          wordWrap: "break-word",
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div
            style={{
              padding: "12px 16px",
              borderTop: "1px solid #e4e6eb",
              display: "flex",
              gap: "8px",
              alignItems: "flex-end",
              backgroundColor: "white",
            }}
          >
            <div style={{ flex: 1, position: "relative" }}>
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Aa"
                aria-label="Type a message"
                style={{
                  width: "100%",
                  padding: "10px 16px",
                  backgroundColor: "#f0f2f5",
                  border: "none",
                  borderRadius: "20px",
                  fontSize: "15px",
                  outline: "none",
                  resize: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!messageText.trim()}
              aria-label="Send message"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: messageText.trim() ? "#FFB84D" : "#e4e6eb",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: messageText.trim() ? "pointer" : "default",
                transition: "background-color 0.2s",
                flexShrink: 0,
              }}
            >
              <Send
                size={18}
                color={messageText.trim() ? "white" : "#bcc0c4"}
              />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
          minHeight: "calc(100vh - 96px)",
        }}
      >
        <div style={{ padding: "20px", borderBottom: "1px solid #e4e6eb" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#5A5A5A",
              margin: 0,
            }}
          >
            Inbox
          </h2>
        </div>

        {conversations.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div
              style={{
                width: "112px",
                height: "112px",
                margin: "0 auto 24px",
                backgroundColor: "#f0f2f5",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MessageCircle size={56} color="#8A8A8A" />
            </div>
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#5A5A5A",
                marginBottom: "8px",
              }}
            >
              No messages yet
            </h3>
            <p
              style={{
                fontSize: "17px",
                color: "#8A8A8A",
                margin: 0,
                maxWidth: "400px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              When you contact a seller or a buyer contacts you, you will see
              your messages here.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {conversations.map((conv) => {
              const lastMsg = conv.messages[conv.messages.length - 1];
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversation(conv.id)}
                  style={{
                    padding: "16px 20px",
                    display: "flex",
                    gap: "12px",
                    cursor: "pointer",
                    borderBottom: "1px solid #e4e6eb",
                    transition: "background-color 0.1s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f7f8fa")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <div style={{ position: "relative" }}>
                    <img
                      src={conv.sellerAvatar}
                      alt={conv.sellerName}
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        width: "16px",
                        height: "16px",
                        backgroundColor: "#B8E6D5",
                        borderRadius: "50%",
                        border: "2px solid white",
                      }}
                    ></div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "4px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "15px",
                          fontWeight: "600",
                          color: "#5A5A5A",
                        }}
                      >
                        {conv.sellerName}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#8A8A8A",
                          flexShrink: 0,
                          marginLeft: "8px",
                        }}
                      >
                        {new Date(conv.lastMessage).toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                        color:
                          lastMsg?.senderId === "me" ? "#8A8A8A" : "#5A5A5A",
                        fontWeight: lastMsg?.senderId !== "me" ? "500" : "400",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        marginBottom: "4px",
                      }}
                    >
                      {lastMsg
                        ? (lastMsg.senderId === "me" ? "You: " : "") +
                          lastMsg.text
                        : "Start a conversation"}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#8A8A8A",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {conv.listing.marketplace_listing_title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // ============================================
  // SAVED VIEW COMPONENT - COMPLETE IMPLEMENTATION
  // ============================================
  const SavedView = () => {
    const savedListings = rawResults.filter((item) =>
      favorites.includes(item.id)
    );

    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#5A5A5A",
              margin: 0,
            }}
          >
            Saved items
          </h2>
          <span style={{ fontSize: "15px", color: "#8A8A8A" }}>
            {savedListings.length} items
          </span>
        </div>

        {savedListings.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                width: "112px",
                height: "112px",
                margin: "0 auto 24px",
                backgroundColor: "#f0f2f5",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Heart size={56} color="#8A8A8A" />
            </div>
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#5A5A5A",
                marginBottom: "8px",
              }}
            >
              No saved items yet
            </h3>
            <p
              style={{
                fontSize: "17px",
                color: "#8A8A8A",
                margin: "0 0 24px 0",
                maxWidth: "400px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Tap the heart icon on items you love to save them here
            </p>
            <button
              onClick={() => setActiveView("browse")}
              style={{
                padding: "12px 24px",
                backgroundColor: "#FFB84D",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#ff9d1a")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#FFB84D")
              }
            >
              Start browsing
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                viewMode === "grid"
                  ? "repeat(auto-fill, minmax(220px, 1fr))"
                  : "1fr",
              gap: "16px",
            }}
          >
            {savedListings.map((item, index) => {
              const priceInfo = formatPrice(item);
              const location = item.location?.reverse_geocode;
              const locationText = location
                ? `${location.city || ""}${
                    location.state ? ", " + location.state : ""
                  }`
                : "";

              return (
                <div
                  key={item.id + index}
                  onClick={() => {
                    console.log("🔍 Clicked listing:", item);
                    console.log("🔍 Has showDetail?", showDetail);
                    console.log("🔍 Has selectedListing?", selectedListing);
                    setSelectedListing(item);
                    setShowDetail(true);
                  }}
                  style={{
                    cursor: "pointer",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "white",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 16px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 1px 2px rgba(0,0,0,0.1)";
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "1/1",
                      backgroundColor: "#f0f2f5",
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                      aria-label="Remove from favorites"
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 10,
                        transition: "transform 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      <Heart size={18} color="#FFB84D" fill="#FFB84D" />
                    </button>
                    {item.listing_photos && item.listing_photos.length > 1 && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "8px",
                          left: "8px",
                          backgroundColor: "rgba(0,0,0,0.7)",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "13px",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        📷 {item.listing_photos.length}
                      </div>
                    )}
                    {item.primary_listing_photo?.photo_image_url ? (
                      <img
                        src={item.primary_listing_photo.photo_image_url}
                        alt={item.marketplace_listing_title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#8A8A8A",
                          fontSize: "13px",
                        }}
                      >
                        No Image
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "12px" }}>
                    <div
                      style={{
                        fontSize: "17px",
                        fontWeight: "600",
                        color: "#5A5A5A",
                        marginBottom: "4px",
                      }}
                    >
                      {priceInfo.display}
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                        color: "#5A5A5A",
                        marginBottom: "8px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        lineHeight: "1.2",
                        minHeight: "36px",
                      }}
                    >
                      {item.marketplace_listing_title}
                    </div>
                    {locationText && (
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#8A8A8A",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <MapPin size={12} />
                        {locationText}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }; // ============================================
  // HOW IT WORKS PAGE COMPONENT - COMPLETE
  // ============================================
  const HowItWorksPage = () => {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#FFF8F5" }}>
        <SEOHead
          title="How It Works | Dibby - Marketplace Delivery & Inspection Service"
          description="Learn how Dibby inspects and delivers items from any marketplace. Simple 5-step process with $1M insurance coverage."
          canonical="/how-it-works"
        />
        <div
          style={{
            background:
              "linear-gradient(135deg, #FFF9E6 0%, #FFE5F8 50%, #E5F8FF 100%)",
            padding: isMobile ? "60px 20px" : "100px 32px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: isMobile ? "36px" : "64px",
              fontWeight: "800",
              color: "#5A5A5A",
              marginBottom: "24px",
              letterSpacing: "-1.5px",
            }}
          >
            How <span style={{ color: "#FFB84D" }}>Dibby Works</span>
          </h1>
          <p
            style={{
              fontSize: isMobile ? "18px" : "22px",
              color: "#7A7A7A",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.7",
            }}
          >
            From finding the perfect item to having it delivered safely to your
            door, we handle everything so you don't have to.
          </p>
        </div>

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: isMobile ? "60px 20px" : "80px 32px",
          }}
        >
          <div style={{ marginBottom: isMobile ? "60px" : "100px" }}>
            <h2
              style={{
                fontSize: isMobile ? "32px" : "42px",
                fontWeight: "700",
                color: "#5A5A5A",
                marginBottom: isMobile ? "40px" : "60px",
                textAlign: "center",
              }}
            >
              The Complete Process
            </h2>

            <div style={{ display: "grid", gap: isMobile ? "40px" : "48px" }}>
              {[
                {
                  step: "01",
                  title: "Find Something You Like",
                  description:
                    "Browse Facebook Marketplace, Craigslist, OfferUp, or Letgo and find that perfect item - furniture, electronics, appliances, vehicles, or even properties to tour.",
                  color: "#FFB84D",
                  icon: "🔍",
                },
                {
                  step: "02",
                  title: "Submit the Listing URL",
                  description:
                    "Copy the listing link and paste it into Dibby. Tell us what service you need - just inspection, delivery only, or our full service package.",
                  color: "#D4BFEA",
                  icon: "📋",
                },
                {
                  step: "03",
                  title: "We Inspect & Document",
                  description:
                    "Our trained inspector visits the location, takes detailed photos and videos, checks the condition, and provides you with a comprehensive report within 24 hours.",
                  color: "#B8E6D5",
                  icon: "📸",
                },
                {
                  step: "04",
                  title: "Review & Decide",
                  description:
                    "Get all the info you need to make a confident decision. See exactly what you're buying before committing. No surprises, no regrets.",
                  color: "#A8D5F5",
                  icon: "✅",
                },
                {
                  step: "05",
                  title: "Safe Pickup & Delivery",
                  description:
                    "Once you approve, we coordinate with the seller, pick up your item with professional care, and deliver it safely to your door with $1M insurance coverage.",
                  color: "#FFD4A0",
                  icon: "🚚",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "120px 1fr",
                    gap: isMobile ? "20px" : "40px",
                    alignItems: "start",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: isMobile ? "100px" : "120px",
                        height: isMobile ? "100px" : "120px",
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${item.color}50 0%, ${item.color} 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: isMobile ? "48px" : "56px",
                        marginBottom: "16px",
                        boxShadow: `0 12px 32px ${item.color}40`,
                        margin: isMobile ? "0 auto 16px" : "0 0 16px 0",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div
                      style={{
                        fontSize: isMobile ? "16px" : "18px",
                        fontWeight: "700",
                        color: item.color,
                      }}
                    >
                      STEP {item.step}
                    </div>
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: isMobile ? "24px" : "32px",
                        fontWeight: "700",
                        color: "#5A5A5A",
                        marginBottom: "16px",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: isMobile ? "16px" : "18px",
                        color: "#8A8A8A",
                        lineHeight: "1.8",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #FFB84D 0%, #FFD4A0 100%)",
              borderRadius: isMobile ? "32px" : "48px",
              padding: isMobile ? "40px 32px" : "80px 60px",
              textAlign: "center",
              marginBottom: isMobile ? "60px" : "100px",
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? "32px" : "48px",
                fontWeight: "800",
                color: "white",
                marginBottom: "24px",
              }}
            >
              Why Choose Dibby?
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                gap: "40px",
                marginTop: isMobile ? "40px" : "60px",
              }}
            >
              {[
                {
                  icon: "🛡️",
                  title: "$1M Insurance",
                  description: "Every delivery fully covered",
                },
                {
                  icon: "⚡",
                  title: "24hr Inspection",
                  description: "Fast turnaround on reports",
                },
                {
                  icon: "👥",
                  title: "No Stranger Meetings",
                  description: "We handle seller coordination",
                },
              ].map((benefit, idx) => (
                <div key={idx}>
                  <div
                    style={{
                      fontSize: isMobile ? "56px" : "64px",
                      marginBottom: "20px",
                    }}
                  >
                    {benefit.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: isMobile ? "20px" : "24px",
                      fontWeight: "700",
                      color: "white",
                      marginBottom: "12px",
                    }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    style={{ fontSize: "16px", color: "rgba(255,255,255,0.9)" }}
                  >
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <h2
              style={{
                fontSize: isMobile ? "32px" : "42px",
                fontWeight: "700",
                color: "#5A5A5A",
                marginBottom: "32px",
              }}
            >
              Ready to Get Started?
            </h2>
            <button
              onClick={() => {
                setCurrentPage("home");
                setIsModalOpen(true);
              }}
              style={{
                padding: isMobile ? "18px 36px" : "20px 44px",
                backgroundColor: "#FFB84D",
                border: "none",
                borderRadius: "20px",
                fontSize: "18px",
                fontWeight: "700",
                color: "white",
                cursor: "pointer",
                boxShadow: "0 8px 28px rgba(255, 184, 77, 0.35)",
              }}
            >
              Submit a Listing Now →
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ============================================
  // FAQ PAGE COMPONENT - COMPLETE WITH 12 QUESTIONS
  // ============================================
  const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
      {
        question: "What marketplaces do you work with?",
        answer:
          "We work with all major online marketplaces including Facebook Marketplace, Craigslist, OfferUp, Letgo, and any other platform where items are listed for sale. Just provide us with the URL!",
      },
      {
        question: "How long does the inspection take?",
        answer:
          "Most inspections are completed within 24 hours of scheduling. You'll receive detailed photos, videos, and a written condition report directly to your email and Dibby account.",
      },
      {
        question: "What's included in the inspection?",
        answer:
          "Our inspections include high-quality photos from multiple angles, a video walkthrough, condition assessment, functionality tests (for electronics/appliances), measurements, and notes on any damage or concerns.",
      },
      {
        question: "Is my delivery insured?",
        answer:
          "Yes! Every delivery includes $1M insurance coverage at no extra cost. Your items are protected from pickup to delivery.",
      },
      {
        question: "Do I have to be home for delivery?",
        answer:
          "We'll coordinate a delivery time that works for you. If you can't be home, we can arrange for contactless delivery or leave items in a secure location with your permission.",
      },
      {
        question: "What if the item isn't as described?",
        answer:
          "That's why we inspect first! If our inspection reveals issues not mentioned in the listing, you can decide whether to proceed before we pick up the item. No commitment until you're satisfied.",
      },
      {
        question: "Can you inspect properties or apartments?",
        answer:
          "Absolutely! Our property tour service provides detailed video walkthroughs, photos of every room, notes on condition, appliances, and any concerns. Perfect for remote renters or buyers.",
      },
      {
        question: "What areas do you serve?",
        answer:
          "We currently serve major metropolitan areas including New York, Los Angeles, Chicago, San Francisco, Boston, and expanding to more cities every month. Check our coverage map or contact us!",
      },
      {
        question: "How do I pay?",
        answer:
          "We accept all major credit cards, debit cards, and digital payment methods. You'll only be charged after the service is completed to your satisfaction.",
      },
      {
        question: "Can I cancel or reschedule?",
        answer:
          "Yes, you can cancel or reschedule up to 4 hours before your scheduled time at no charge. Last-minute cancellations may incur a small fee.",
      },
      {
        question: "How much does Dibby cost?",
        answer:
          "Inspection only starts at $49. Delivery only starts at $75. Full service (inspection + delivery) starts at $150. Property tours start at $49. All services include insurance coverage.",
      },
      {
        question: "What makes Dibby different from other delivery services?",
        answer:
          "Unlike generic delivery services, we specialize in marketplace items. We inspect BEFORE pickup, coordinate with sellers, handle negotiations, and provide detailed condition reports. Plus $1M insurance on every order.",
      },
    ];

    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#FFF8F5" }}>
        <SEOHead
          title="FAQ - Frequently Asked Questions | Dibby"
          description="Get answers to common questions about Dibby's marketplace delivery and inspection service. Learn about pricing, coverage areas, and more."
          canonical="/faq"
          breadcrumbs={[{ name: "FAQ", url: "/faq" }]}
          schema="FAQ"
        />
        <div
          style={{
            background:
              "linear-gradient(135deg, #E5F8FF 0%, #F0E5F5 50%, #FFE5DB 100%)",
            padding: isMobile ? "60px 20px" : "100px 32px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: isMobile ? "36px" : "64px",
              fontWeight: "800",
              color: "#5A5A5A",
              marginBottom: "24px",
              letterSpacing: "-1.5px",
            }}
          >
            Frequently Asked <span style={{ color: "#A8D5F5" }}>Questions</span>
          </h1>
          <p
            style={{
              fontSize: isMobile ? "18px" : "22px",
              color: "#7A7A7A",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: "1.7",
            }}
          >
            Everything you need to know about using Dibby for safe marketplace
            transactions
          </p>
        </div>

        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: isMobile ? "60px 20px" : "80px 32px",
          }}
        >
          <div style={{ display: "grid", gap: "20px" }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "white",
                  borderRadius: "24px",
                  border: "2px solid #FFE5DB",
                  overflow: "hidden",
                  boxShadow: "0 4px 16px rgba(255, 180, 162, 0.08)",
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  style={{
                    width: "100%",
                    padding: isMobile ? "20px" : "28px 32px",
                    backgroundColor: "white",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontSize: isMobile ? "17px" : "20px",
                      fontWeight: "600",
                      color: "#5A5A5A",
                      paddingRight: "16px",
                    }}
                  >
                    {faq.question}
                  </span>
                  <HelpCircle
                    size={24}
                    color="#FFB84D"
                    style={{
                      transform:
                        openIndex === idx ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s",
                      flexShrink: 0,
                    }}
                  />
                </button>
                {openIndex === idx && (
                  <div
                    style={{
                      padding: isMobile ? "0 20px 20px" : "0 32px 28px 32px",
                      fontSize: "17px",
                      color: "#8A8A8A",
                      lineHeight: "1.7",
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: isMobile ? "60px" : "80px",
              textAlign: "center",
              backgroundColor: "white",
              borderRadius: "32px",
              padding: isMobile ? "40px 24px" : "60px",
              border: "2px solid #E0F5ED",
            }}
          >
            <div
              style={{
                fontSize: isMobile ? "56px" : "64px",
                marginBottom: "24px",
              }}
            >
              💬
            </div>
            <h2
              style={{
                fontSize: isMobile ? "28px" : "36px",
                fontWeight: "700",
                color: "#5A5A5A",
                marginBottom: "16px",
              }}
            >
              Still Have Questions?
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#8A8A8A",
                marginBottom: "32px",
              }}
            >
              Our support team is here to help you with anything you need
            </p>
            <button
              onClick={() => setCurrentPage("contact")}
              style={{
                padding: "16px 40px",
                backgroundColor: "#B8E6D5",
                border: "none",
                borderRadius: "16px",
                fontSize: "16px",
                fontWeight: "600",
                color: "white",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(184, 230, 213, 0.3)",
              }}
            >
              Contact Us →
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ConfirmationPage: React.FC<{
    orderDetails: {
      orderId: string;
      name: string;
      email: string;
      service: string;
      listingTitle?: string;
      price?: string;
    } | null;
  }> = ({ orderDetails }) => {
    if (!orderDetails) {
      return (
        <div
          style={{
            padding: "100px 20px",
            textAlign: "center",
            minHeight: "100vh",
            backgroundColor: "#F7F8FA",
          }}
        >
          <h1
            style={{ fontSize: "32px", color: "#5A5A5A", marginBottom: "20px" }}
          >
            No order found
          </h1>
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            style={{
              padding: "16px 32px",
              backgroundColor: "#FFB84D",
              border: "none",
              borderRadius: "12px",
              color: "white",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Return to Home
          </button>
        </div>
      );
    }

    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#F7F8FA",
          paddingTop: "80px",
          paddingBottom: "80px",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ fontSize: "80px", marginBottom: "20px" }}>✅</div>
            <h1
              style={{
                fontSize: "48px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "16px",
              }}
            >
              Order Confirmed!
            </h1>
            <p style={{ fontSize: "20px", color: "#8A8A8A" }}>
              Thank you, {orderDetails.name}! Your Dibby service has been
              booked.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "40px",
              marginBottom: "32px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#5A5A5A",
                marginBottom: "24px",
              }}
            >
              📋 Order Details
            </h2>
            <div
              style={{
                borderBottom: "1px solid #E5E7EB",
                paddingBottom: "12px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#8A8A8A",
                  marginBottom: "4px",
                }}
              >
                ORDER ID
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  fontFamily: "monospace",
                }}
              >
                {orderDetails.orderId}
              </div>
            </div>
            <div
              style={{
                borderBottom: "1px solid #E5E7EB",
                paddingBottom: "12px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#8A8A8A",
                  marginBottom: "4px",
                }}
              >
                SERVICE
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#5A5A5A",
                }}
              >
                {orderDetails.service}
              </div>
            </div>
            {orderDetails.listingTitle && (
              <div
                style={{
                  borderBottom: "1px solid #E5E7EB",
                  paddingBottom: "12px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    color: "#8A8A8A",
                    marginBottom: "4px",
                  }}
                >
                  ITEM
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#5A5A5A",
                  }}
                >
                  {orderDetails.listingTitle}
                </div>
              </div>
            )}
            <div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#8A8A8A",
                  marginBottom: "4px",
                }}
              >
                CONFIRMATION EMAIL
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#5A5A5A",
                }}
              >
                {orderDetails.email}
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#FFF7ED",
              border: "2px solid #FFB84D",
              borderRadius: "16px",
              padding: "32px",
              marginBottom: "32px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#FFB84D",
                marginBottom: "20px",
              }}
            >
              💰 Payment Instructions
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#5A5A5A",
                marginBottom: "20px",
              }}
            >
              Please send payment via <strong>Venmo</strong> to:{" "}
              <strong style={{ color: "#008CFF" }}>@DibbyService</strong>
            </p>
            <div
              style={{
                backgroundColor: "white",
                padding: "16px",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  color: "#8A8A8A",
                  marginBottom: "4px",
                }}
              >
                Include this in your payment note:
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  fontFamily: "monospace",
                }}
              >
                {orderDetails.orderId}
              </div>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "#8A8A8A",
                fontStyle: "italic",
              }}
            >
              💡 This helps us match your payment to your order!
            </p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "32px",
              marginBottom: "32px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#5A5A5A",
                marginBottom: "24px",
              }}
            >
              ⏱️ What Happens Next
            </h2>
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontWeight: "700",
                  color: "#10B981",
                  marginBottom: "4px",
                }}
              >
                Within 30 seconds
              </div>
              <div style={{ fontSize: "16px", color: "#5A5A5A" }}>
                Email confirmation sent to {orderDetails.email}
              </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontWeight: "700",
                  color: "#10B981",
                  marginBottom: "4px",
                }}
              >
                Within 2 hours
              </div>
              <div style={{ fontSize: "16px", color: "#5A5A5A" }}>
                Inspector assigned with contact info
              </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontWeight: "700",
                  color: "#10B981",
                  marginBottom: "4px",
                }}
              >
                Within 24-48 hours
              </div>
              <div style={{ fontSize: "16px", color: "#5A5A5A" }}>
                Inspection complete with photos and report
              </div>
            </div>
            <div>
              <div
                style={{
                  fontWeight: "700",
                  color: "#10B981",
                  marginBottom: "4px",
                }}
              >
                Same week
              </div>
              <div style={{ fontSize: "16px", color: "#5A5A5A" }}>
                Safe delivery to your door
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#E7F3FF",
              border: "2px solid #1876f2",
              borderRadius: "16px",
              padding: "32px",
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🛡️</div>
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#1876f2",
                marginBottom: "8px",
              }}
            >
              100% Money-Back Guarantee
            </h3>
            <p style={{ fontSize: "16px", color: "#5A5A5A", margin: 0 }}>
              Not satisfied? Full refund, no questions asked.
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => {
                window.location.href = "/";
              }}
              style={{
                padding: "18px 48px",
                backgroundColor: "#FFB84D",
                border: "none",
                borderRadius: "12px",
                fontSize: "18px",
                fontWeight: "700",
                color: "white",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(255, 184, 77, 0.3)",
              }}
            >
              ← Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ============================================
  // CONTACT PAGE COMPONENT - COMPLETE WITH FORM
  // ============================================
  const ContactPage = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = () => {
      const newErrors: { [key: string]: string } = {};
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
        newErrors.email = "Please enter a valid email";
      if (!formData.subject.trim()) newErrors.subject = "Subject is required";
      if (!formData.message.trim()) newErrors.message = "Message is required";

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    };

    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#FFF8F5" }}>
        <SEOHead
          title="Contact Us | Dibby - Get Help with Marketplace Delivery"
          description="Contact Dibby's support team for help with marketplace deliveries, inspections, and more. Available 24/7 via phone, email, or live chat."
          canonical="/contact"
        />
        <div
          style={{
            background:
              "linear-gradient(135deg, #FFE5F8 0%, #E5F8FF 50%, #F0FFE5 100%)",
            padding: isMobile ? "60px 20px" : "100px 32px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: isMobile ? "36px" : "64px",
              fontWeight: "800",
              color: "#5A5A5A",
              marginBottom: "24px",
              letterSpacing: "-1.5px",
            }}
          >
            Get in <span style={{ color: "#D4BFEA" }}>Touch</span>
          </h1>
          <p
            style={{
              fontSize: isMobile ? "18px" : "22px",
              color: "#7A7A7A",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: "1.7",
            }}
          >
            Have a question or need help? We're here for you 24/7
          </p>
        </div>

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: isMobile ? "60px 20px" : "80px 32px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "60px",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: isMobile ? "32px" : "42px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "32px",
                }}
              >
                Send Us a Message
              </h2>

              <div style={{ display: "grid", gap: "24px" }}>
                {["name", "email", "subject"].map((field) => {
                  const labels: { [key: string]: string } = {
                    name: "Your Name",
                    email: "Email Address",
                    subject: "Subject",
                  };
                  const placeholders: { [key: string]: string } = {
                    name: "John Doe",
                    email: "john@example.com",
                    subject: "How can we help?",
                  };
                  return (
                    <div key={field}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "15px",
                          fontWeight: "600",
                          color: "#5A5A5A",
                          marginBottom: "10px",
                        }}
                      >
                        {labels[field]}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        placeholder={placeholders[field]}
                        value={formData[field as keyof typeof formData]}
                        onChange={(e) =>
                          setFormData({ ...formData, [field]: e.target.value })
                        }
                        style={{
                          width: "100%",
                          padding: "16px",
                          fontSize: "16px",
                          border: errors[field]
                            ? "2px solid #FF6B6B"
                            : "2px solid #FFE5DB",
                          borderRadius: "16px",
                          outline: "none",
                          fontFamily: "inherit",
                          boxSizing: "border-box",
                        }}
                      />
                      {errors[field] && (
                        <p
                          style={{
                            color: "#FF6B6B",
                            fontSize: "14px",
                            marginTop: "8px",
                          }}
                        >
                          {errors[field]}
                        </p>
                      )}
                    </div>
                  );
                })}

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#5A5A5A",
                      marginBottom: "10px",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    placeholder="Tell us more about your question or concern..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={6}
                    style={{
                      width: "100%",
                      padding: "16px",
                      fontSize: "16px",
                      border: errors.message
                        ? "2px solid #FF6B6B"
                        : "2px solid #FFE5DB",
                      borderRadius: "16px",
                      outline: "none",
                      fontFamily: "inherit",
                      resize: "vertical",
                      boxSizing: "border-box",
                    }}
                  />
                  {errors.message && (
                    <p
                      style={{
                        color: "#FF6B6B",
                        fontSize: "14px",
                        marginTop: "8px",
                      }}
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  style={{
                    padding: "16px",
                    backgroundColor: "#D4BFEA",
                    border: "none",
                    borderRadius: "16px",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "white",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(212, 191, 234, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <Send size={18} />
                  Send Message
                </button>
              </div>
            </div>

            <div>
              <h2
                style={{
                  fontSize: isMobile ? "32px" : "42px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "32px",
                }}
              >
                Other Ways to Reach Us
              </h2>

              <div
                style={{ display: "grid", gap: "24px", marginBottom: "48px" }}
              >
                {[
                  {
                    icon: Mail,
                    color: "#FFB84D",
                    bg: "#FFE5DB",
                    title: "Email Us",
                    text: "support@dibby.com",
                  },
                  {
                    icon: Phone,
                    color: "#B8E6D5",
                    bg: "#E0F5ED",
                    title: "Call Us",
                    text: "1-800-DIBBY-00",
                  },
                  {
                    icon: MessageSquare,
                    color: "#D4BFEA",
                    bg: "#F0E5F5",
                    title: "Live Chat",
                    text: "Available 24/7 on our website",
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: "white",
                        borderRadius: "24px",
                        padding: "32px",
                        border: `2px solid ${item.bg}`,
                      }}
                    >
                      <div
                        style={{
                          width: "56px",
                          height: "56px",
                          borderRadius: "50%",
                          backgroundColor: item.bg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "20px",
                        }}
                      >
                        <Icon size={28} color={item.color} />
                      </div>
                      <h3
                        style={{
                          fontSize: "20px",
                          fontWeight: "600",
                          color: "#5A5A5A",
                          marginBottom: "8px",
                        }}
                      >
                        {item.title}
                      </h3>
                      <p style={{ fontSize: "16px", color: "#8A8A8A" }}>
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  backgroundColor: "#E5F8FF",
                  borderRadius: "24px",
                  padding: "32px",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#5A5A5A",
                    marginBottom: "16px",
                  }}
                >
                  Response Time
                </h3>
                <p style={{ fontSize: "16px", color: "#8A8A8A" }}>
                  We typically respond to all inquiries within 2-4 hours during
                  business hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  // ============================================
  // ABOUT PAGE COMPONENT - COMPLETE
  // ============================================
  const AboutPage: React.FC = () => {
    const { isMobile } = useResponsive();

    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#FFF8F5" }}>
        <SEOHead
          title="About Us - Our Story & Mission | Dibby"
          description="Learn about Dibby's mission to make online marketplace shopping safe, easy, and stress-free. Meet our team and discover our commitment to excellence."
          canonical="/about"
          breadcrumbs={[{ name: "About Us", url: "/about" }]}
        />

        <Breadcrumb items={[{ name: "About Us", url: "/about" }]} />

        {/* Hero Section */}
        <section
          style={{
            background:
              "linear-gradient(135deg, #FFE5F8 0%, #E5F8FF 50%, #FFF9E6 100%)",
            padding: isMobile ? "60px 20px" : "100px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div
              style={{
                fontSize: isMobile ? "48px" : "64px",
                marginBottom: "24px",
              }}
            >
              🎯
            </div>
            <h1
              style={{
                fontSize: isMobile ? "36px" : "64px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "24px",
                letterSpacing: "-1.5px",
                lineHeight: "1.1",
              }}
            >
              We're on a <span style={{ color: "#FFB84D" }}>Mission</span>
            </h1>
            <p
              style={{
                fontSize: isMobile ? "18px" : "24px",
                color: "#8A8A8A",
                lineHeight: "1.7",
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              To make online marketplace shopping safe, stress-free, and
              accessible to everyone
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: isMobile ? "60px 20px" : "80px 32px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: isMobile ? "32px" : "48px",
              padding: isMobile ? "40px 32px" : "80px 60px",
              border: "3px solid #FFE5DB",
              boxShadow: "0 12px 48px rgba(255, 180, 162, 0.15)",
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? "28px" : "42px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "32px",
                textAlign: "center",
              }}
            >
              Our Story
            </h2>
            <div
              style={{
                fontSize: isMobile ? "17px" : "19px",
                color: "#5A5A5A",
                lineHeight: "1.8",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              <p style={{ marginBottom: "24px" }}>
                Dibby was born from a simple frustration: buying from online
                marketplaces shouldn't be scary, risky, or time-consuming. Our
                founders spent years meeting strangers in parking lots, getting
                scammed by misleading listings, and wasting weekends driving
                across town for items that looked nothing like their photos.
              </p>
              <p style={{ marginBottom: "24px" }}>
                In 2020, we decided there had to be a better way. What if
                someone could check out items for you? What if deliveries came
                with real insurance? What if you never had to coordinate with
                strangers again?
              </p>
              <p style={{ marginBottom: "24px" }}>
                Today, Dibby has completed over{" "}
                <strong>50,000 deliveries</strong> across 30+ cities, with a
                4.9-star rating and $1M insurance on every order. We've saved
                our customers countless hours, protected them from scams, and
                made marketplace shopping as easy as ordering from Amazon.
              </p>
              <p>
                But we're just getting started. Our vision is a world where
                anyone can shop any marketplace with complete confidence,
                knowing their items will be exactly as described and delivered
                safely to their door.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section
          style={{
            backgroundColor: "white",
            padding: isMobile ? "60px 20px" : "80px 32px",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: isMobile ? "32px" : "48px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: isMobile ? "48px" : "64px",
                textAlign: "center",
              }}
            >
              What We <span style={{ color: "#FFB84D" }}>Stand For</span>
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                gap: isMobile ? "32px" : "40px",
              }}
            >
              {[
                {
                  icon: "🛡️",
                  title: "Safety First",
                  description:
                    "Every service includes $1M insurance, background-checked professionals, and secure payment processing. Your safety is non-negotiable.",
                  color: "#E5F8FF",
                },
                {
                  icon: "🎯",
                  title: "Radical Transparency",
                  description:
                    "No hidden fees, no surprises. What you see is what you pay. Our inspections show you exactly what you're buying.",
                  color: "#FFE5C0",
                },
                {
                  icon: "💚",
                  title: "Customer Obsession",
                  description:
                    "We don't win unless you win. 24/7 support, money-back guarantees, and a team that genuinely cares about your experience.",
                  color: "#E0F5ED",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: value.color,
                    borderRadius: "32px",
                    padding: isMobile ? "40px 28px" : "48px 40px",
                    textAlign: "center",
                    border: "3px solid rgba(0, 0, 0, 0.05)",
                    transition: "transform 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      fontSize: isMobile ? "56px" : "72px",
                      marginBottom: "24px",
                    }}
                  >
                    {value.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: isMobile ? "24px" : "28px",
                      fontWeight: "700",
                      color: "#5A5A5A",
                      marginBottom: "20px",
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    style={{
                      fontSize: isMobile ? "16px" : "17px",
                      color: "#8A8A8A",
                      lineHeight: "1.7",
                    }}
                  >
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section
          style={{
            background: "linear-gradient(135deg, #FFB84D 0%, #FFD4A0 100%)",
            padding: isMobile ? "60px 20px" : "80px 32px",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: isMobile ? "32px" : "48px",
                fontWeight: "800",
                color: "white",
                marginBottom: isMobile ? "48px" : "64px",
                textAlign: "center",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              Our Impact by the Numbers
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "repeat(2, 1fr)"
                  : "repeat(4, 1fr)",
                gap: isMobile ? "32px" : "48px",
                textAlign: "center",
              }}
            >
              {[
                { number: "50,000+", label: "Happy Customers" },
                { number: "30+", label: "Cities Served" },
                { number: "$15M+", label: "Items Protected" },
                { number: "4.9★", label: "Average Rating" },
              ].map((stat, index) => (
                <div key={index}>
                  <div
                    style={{
                      fontSize: isMobile ? "40px" : "56px",
                      fontWeight: "900",
                      color: "white",
                      marginBottom: "12px",
                      textShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    style={{
                      fontSize: isMobile ? "15px" : "18px",
                      fontWeight: "600",
                      color: "rgba(255, 255, 255, 0.95)",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: isMobile ? "60px 20px" : "80px 32px",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "32px" : "48px",
              fontWeight: "800",
              color: "#5A5A5A",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            Meet the <span style={{ color: "#FFB84D" }}>Team</span>
          </h2>
          <p
            style={{
              fontSize: isMobile ? "17px" : "19px",
              color: "#8A8A8A",
              textAlign: "center",
              maxWidth: "700px",
              margin: "0 auto 64px",
              lineHeight: "1.7",
            }}
          >
            We're a diverse team of logistics experts, tech enthusiasts, and
            customer service fanatics united by one goal: making your life
            easier
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: isMobile ? "40px" : "48px",
            }}
          >
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Co-Founder",
                emoji: "👩‍💼",
                bio: "Former logistics director at Amazon. Obsessed with making impossible things simple.",
                color: "#FFE5C0",
              },
              {
                name: "Michael Chen",
                role: "CTO & Co-Founder",
                emoji: "👨‍💻",
                bio: "Built marketplace platforms at eBay. Believes technology should serve people, not the other way around.",
                color: "#E5F8FF",
              },
              {
                name: "Jessica Martinez",
                role: "Head of Customer Experience",
                emoji: "👩‍🎓",
                bio: "10+ years in hospitality. Champions every customer like they're family.",
                color: "#F0E5F5",
              },
            ].map((member, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  borderRadius: "32px",
                  padding: isMobile ? "40px 28px" : "48px 40px",
                  textAlign: "center",
                  border: `3px solid ${member.color}`,
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                }}
              >
                <div
                  style={{
                    width: isMobile ? "100px" : "120px",
                    height: isMobile ? "100px" : "120px",
                    borderRadius: "50%",
                    backgroundColor: member.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: isMobile ? "48px" : "56px",
                    margin: "0 auto 24px",
                    boxShadow: `0 8px 24px ${member.color}80`,
                  }}
                >
                  {member.emoji}
                </div>
                <h3
                  style={{
                    fontSize: isMobile ? "22px" : "24px",
                    fontWeight: "700",
                    color: "#5A5A5A",
                    marginBottom: "8px",
                  }}
                >
                  {member.name}
                </h3>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#FFB84D",
                    marginBottom: "20px",
                  }}
                >
                  {member.role}
                </div>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#8A8A8A",
                    lineHeight: "1.7",
                  }}
                >
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section
          style={{
            backgroundColor: "#E5F8FF",
            padding: isMobile ? "60px 20px" : "80px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: isMobile ? "32px" : "48px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "24px",
              }}
            >
              Join 50,000+ Happy Customers
            </h2>
            <p
              style={{
                fontSize: isMobile ? "18px" : "20px",
                color: "#8A8A8A",
                marginBottom: "40px",
                lineHeight: "1.7",
              }}
            >
              Experience the future of marketplace shopping. Safe, insured, and
              stress-free.
            </p>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                padding: isMobile ? "18px 40px" : "20px 48px",
                backgroundColor: "#FFB84D",
                border: "none",
                borderRadius: "16px",
                fontSize: "18px",
                fontWeight: "700",
                color: "white",
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(255, 184, 77, 0.35)",
              }}
            >
              Get Started Today →
            </button>
          </div>
        </section>

        <BackToTopButton />
      </div>
    );
  };

  // ============================================
  // PRIVACY POLICY PAGE COMPONENT - GDPR COMPLIANT
  // ============================================
  const PrivacyPolicyPage: React.FC = () => {
    const { isMobile } = useResponsive();

    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#FFF8F5" }}>
        <SEOHead
          title="Privacy Policy | Dibby - How We Protect Your Data"
          description="Learn how Dibby collects, uses, and protects your personal information. GDPR compliant privacy policy with clear, transparent practices."
          canonical="/privacy"
          breadcrumbs={[{ name: "Privacy Policy", url: "/privacy" }]}
        />

        <Breadcrumb items={[{ name: "Privacy Policy", url: "/privacy" }]} />

        {/* Hero Section */}
        <section
          style={{
            background: "linear-gradient(135deg, #E5F8FF 0%, #F0E5F5 100%)",
            padding: isMobile ? "60px 20px" : "80px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div
              style={{
                fontSize: isMobile ? "48px" : "64px",
                marginBottom: "24px",
              }}
            >
              🔒
            </div>
            <h1
              style={{
                fontSize: isMobile ? "36px" : "56px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "20px",
                letterSpacing: "-1px",
              }}
            >
              Privacy Policy
            </h1>
            <p
              style={{
                fontSize: isMobile ? "16px" : "18px",
                color: "#8A8A8A",
                lineHeight: "1.7",
              }}
            >
              Last Updated: October 19, 2025
              <br />
              Your privacy matters to us. Here's how we protect it.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: isMobile ? "60px 20px" : "80px 32px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "32px",
              padding: isMobile ? "40px 28px" : "60px 80px",
              border: "2px solid #FFE5DB",
              boxShadow: "0 8px 32px rgba(255, 180, 162, 0.12)",
            }}
          >
            {/* Introduction */}
            <div style={{ marginBottom: "48px" }}>
              <p
                style={{
                  fontSize: "17px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                }}
              >
                Dibby, Inc. ("Dibby," "we," "us," or "our") is committed to
                protecting your privacy. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                use our marketplace delivery and inspection services.
              </p>
            </div>

            {/* Section 1: Information We Collect */}
            <div style={{ marginBottom: "48px" }}>
              <h2
                style={{
                  fontSize: isMobile ? "24px" : "28px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "24px",
                  paddingBottom: "16px",
                  borderBottom: "3px solid #FFE5DB",
                }}
              >
                1. Information We Collect
              </h2>

              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#5A5A5A",
                  marginTop: "24px",
                  marginBottom: "16px",
                }}
              >
                Information You Provide
              </h3>
              <ul
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  paddingLeft: "24px",
                }}
              >
                <li style={{ marginBottom: "12px" }}>
                  <strong>Account Information:</strong> Name, email address,
                  phone number, password
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Service Information:</strong> Pickup and delivery
                  addresses, listing URLs, special instructions
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Payment Information:</strong> Credit card details,
                  billing address (processed securely through Stripe)
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Communications:</strong> Messages, support tickets,
                  feedback, and reviews
                </li>
              </ul>

              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#5A5A5A",
                  marginTop: "24px",
                  marginBottom: "16px",
                }}
              >
                Information Automatically Collected
              </h3>
              <ul
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  paddingLeft: "24px",
                }}
              >
                <li style={{ marginBottom: "12px" }}>
                  <strong>Device Information:</strong> IP address, browser type,
                  operating system, device identifiers
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Usage Data:</strong> Pages viewed, time spent, clicks,
                  search queries
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Location Data:</strong> GPS coordinates (with your
                  permission), IP-based location
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Cookies:</strong> Session cookies, preference cookies,
                  analytics cookies
                </li>
              </ul>
            </div>

            {/* Section 2: How We Use Your Information */}
            <div style={{ marginBottom: "48px" }}>
              <h2
                style={{
                  fontSize: isMobile ? "24px" : "28px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "24px",
                  paddingBottom: "16px",
                  borderBottom: "3px solid #FFE5DB",
                }}
              >
                2. How We Use Your Information
              </h2>
              <ul
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  paddingLeft: "24px",
                }}
              >
                <li style={{ marginBottom: "12px" }}>
                  <strong>Service Delivery:</strong> Process orders, coordinate
                  pickups and deliveries, communicate updates
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Payment Processing:</strong> Charge for services,
                  process refunds, prevent fraud
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Customer Support:</strong> Respond to inquiries,
                  resolve issues, provide assistance
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Improvements:</strong> Analyze usage patterns, improve
                  our services, develop new features
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Marketing:</strong> Send promotional emails (you can
                  opt-out), show relevant ads
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Legal Compliance:</strong> Comply with laws, enforce
                  terms, protect rights and safety
                </li>
              </ul>
            </div>

            {/* Section 3: Information Sharing */}
            <div style={{ marginBottom: "48px" }}>
              <h2
                style={{
                  fontSize: isMobile ? "24px" : "28px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "24px",
                  paddingBottom: "16px",
                  borderBottom: "3px solid #FFE5DB",
                }}
              >
                3. How We Share Your Information
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  marginBottom: "20px",
                }}
              >
                We do not sell your personal information. We only share your
                data with:
              </p>
              <ul
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  paddingLeft: "24px",
                }}
              >
                <li style={{ marginBottom: "12px" }}>
                  <strong>Service Providers:</strong> Payment processors
                  (Stripe), cloud hosting (AWS), analytics (Google Analytics),
                  email services (SendGrid)
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Inspectors & Delivery Partners:</strong> Only the
                  information needed to complete your service (addresses,
                  contact info)
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Legal Requirements:</strong> When required by law,
                  court order, or government request
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Business Transfers:</strong> In case of merger,
                  acquisition, or sale of assets
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>With Your Consent:</strong> Any other sharing requires
                  your explicit permission
                </li>
              </ul>
            </div>

            {/* Section 4: Your Rights (GDPR) */}
            <div style={{ marginBottom: "48px" }}>
              <h2
                style={{
                  fontSize: isMobile ? "24px" : "28px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "24px",
                  paddingBottom: "16px",
                  borderBottom: "3px solid #FFE5DB",
                }}
              >
                4. Your Privacy Rights (GDPR/CCPA)
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  marginBottom: "20px",
                }}
              >
                You have the following rights regarding your personal
                information:
              </p>
              <ul
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  paddingLeft: "24px",
                }}
              >
                <li style={{ marginBottom: "12px" }}>
                  <strong>Access:</strong> Request a copy of your personal data
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Correction:</strong> Update inaccurate or incomplete
                  information
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Deletion:</strong> Request deletion of your data (with
                  some exceptions)
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Portability:</strong> Receive your data in a
                  machine-readable format
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Objection:</strong> Object to processing for direct
                  marketing
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Restriction:</strong> Request limitation of processing
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Opt-Out:</strong> Unsubscribe from marketing emails
                  anytime
                </li>
              </ul>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  marginTop: "20px",
                  padding: "20px",
                  backgroundColor: "#E5F8FF",
                  borderRadius: "12px",
                }}
              >
                <strong>To exercise your rights:</strong> Email us at{" "}
                <strong>privacy@dibby.com</strong> or contact us through your
                account settings. We'll respond within 30 days.
              </p>
            </div>

            {/* Section 5: Data Security */}
            <div style={{ marginBottom: "48px" }}>
              <h2
                style={{
                  fontSize: isMobile ? "24px" : "28px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "24px",
                  paddingBottom: "16px",
                  borderBottom: "3px solid #FFE5DB",
                }}
              >
                5. Data Security
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  marginBottom: "16px",
                }}
              >
                We implement industry-standard security measures to protect your
                information:
              </p>
              <ul
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  paddingLeft: "24px",
                }}
              >
                <li style={{ marginBottom: "12px" }}>
                  SSL/TLS encryption for data transmission
                </li>
                <li style={{ marginBottom: "12px" }}>
                  Encrypted database storage
                </li>
                <li style={{ marginBottom: "12px" }}>
                  Regular security audits and penetration testing
                </li>
                <li style={{ marginBottom: "12px" }}>
                  Access controls and authentication
                </li>
                <li style={{ marginBottom: "12px" }}>
                  Employee training on data protection
                </li>
              </ul>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  marginTop: "20px",
                }}
              >
                However, no method of transmission over the Internet is 100%
                secure. We cannot guarantee absolute security but continuously
                work to improve our protections.
              </p>
            </div>

            {/* Section 6: Cookies */}
            <div style={{ marginBottom: "48px" }}>
              <h2
                style={{
                  fontSize: isMobile ? "24px" : "28px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "24px",
                  paddingBottom: "16px",
                  borderBottom: "3px solid #FFE5DB",
                }}
              >
                6. Cookies and Tracking Technologies
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  marginBottom: "16px",
                }}
              >
                We use cookies and similar technologies to:
              </p>
              <ul
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  paddingLeft: "24px",
                  marginBottom: "20px",
                }}
              >
                <li style={{ marginBottom: "12px" }}>Keep you logged in</li>
                <li style={{ marginBottom: "12px" }}>
                  Remember your preferences
                </li>
                <li style={{ marginBottom: "12px" }}>
                  Analyze site usage and performance
                </li>
                <li style={{ marginBottom: "12px" }}>
                  Personalize your experience
                </li>
                <li style={{ marginBottom: "12px" }}>
                  Show relevant advertisements
                </li>
              </ul>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                }}
              >
                You can control cookies through your browser settings. Note that
                disabling cookies may limit some functionality.
              </p>
            </div>

            {/* Section 7: Contact Us */}
            <div
              style={{
                marginTop: "48px",
                padding: "32px",
                backgroundColor: "#FFF9E6",
                borderRadius: "20px",
                border: "2px solid #FFE5C0",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "20px",
                }}
              >
                7. Contact Us About Privacy
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  marginBottom: "16px",
                }}
              >
                If you have questions about this Privacy Policy or your data:
              </p>
              <div style={{ fontSize: "16px", color: "#5A5A5A" }}>
                <p style={{ marginBottom: "8px" }}>
                  <strong>Email:</strong> privacy@dibby.com
                </p>
                <p style={{ marginBottom: "8px" }}>
                  <strong>Mail:</strong> Dibby, Inc., 123 Market Street, San
                  Francisco, CA 94102
                </p>
                <p style={{ marginBottom: "8px" }}>
                  <strong>Phone:</strong> 1-800-DIBBY-00
                </p>
              </div>
            </div>
          </div>
        </section>

        <BackToTopButton />
      </div>
    );
  };

  // ============================================
  // TERMS OF SERVICE PAGE COMPONENT - COMPLETE
  // ============================================
  const TermsPage: React.FC = () => {
    const { isMobile } = useResponsive();

    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#FFF8F5" }}>
        <SEOHead
          title="Terms of Service | Dibby - User Agreement & Policies"
          description="Read Dibby's terms of service, user agreement, and policies. Understand your rights and responsibilities when using our marketplace delivery service."
          canonical="/terms"
          breadcrumbs={[{ name: "Terms of Service", url: "/terms" }]}
        />

        <Breadcrumb items={[{ name: "Terms of Service", url: "/terms" }]} />

        {/* Hero Section */}
        <section
          style={{
            background: "linear-gradient(135deg, #F0E5F5 0%, #FFE5C0 100%)",
            padding: isMobile ? "60px 20px" : "80px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div
              style={{
                fontSize: isMobile ? "48px" : "64px",
                marginBottom: "24px",
              }}
            >
              📋
            </div>
            <h1
              style={{
                fontSize: isMobile ? "36px" : "56px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "20px",
                letterSpacing: "-1px",
              }}
            >
              Terms of Service
            </h1>
            <p
              style={{
                fontSize: isMobile ? "16px" : "18px",
                color: "#8A8A8A",
                lineHeight: "1.7",
              }}
            >
              Last Updated: October 19, 2025
              <br />
              Please read these terms carefully before using our services
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: isMobile ? "60px 20px" : "80px 32px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "32px",
              padding: isMobile ? "40px 28px" : "60px 80px",
              border: "2px solid #FFE5DB",
              boxShadow: "0 8px 32px rgba(255, 180, 162, 0.12)",
            }}
          >
            {/* Introduction */}
            <div style={{ marginBottom: "48px" }}>
              <p
                style={{
                  fontSize: "17px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                }}
              >
                These Terms of Service ("Terms") govern your use of Dibby's
                marketplace delivery and inspection services. By using our
                services, you agree to these Terms. If you don't agree, please
                don't use our services.
              </p>
            </div>

            {/* Section 1: Acceptance of Terms */}
            <div style={{ marginBottom: "48px" }}>
              <h2
                style={{
                  fontSize: isMobile ? "24px" : "28px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "24px",
                  paddingBottom: "16px",
                  borderBottom: "3px solid #FFE5DB",
                }}
              >
                1. Acceptance of Terms
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  marginBottom: "16px",
                }}
              >
                By accessing or using Dibby's services, you acknowledge that you
                have read, understood, and agree to be bound by these Terms and
                our Privacy Policy. If you are using our services on behalf of
                an organization, you represent that you have authority to bind
                that organization to these Terms.
              </p>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                }}
              >
                You must be at least 18 years old to use our services. By using
                Dibby, you represent that you meet this age requirement.
              </p>
            </div>

            {/* Section 2: Service Description */}
            <div style={{ marginBottom: "48px" }}>
              <h2
                style={{
                  fontSize: isMobile ? "24px" : "28px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "24px",
                  paddingBottom: "16px",
                  borderBottom: "3px solid #FFE5DB",
                }}
              >
                2. Service Description
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  marginBottom: "16px",
                }}
              >
                Dibby provides the following services:
              </p>
              <ul
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  paddingLeft: "24px",
                }}
              >
                <li style={{ marginBottom: "12px" }}>
                  <strong>Inspection Services:</strong> Professional photo and
                  video inspection of marketplace listings
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Delivery Services:</strong> Pickup and delivery of
                  items purchased from online marketplaces
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Property Tour Services:</strong> Virtual property
                  inspections and walkthroughs
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Full Service Package:</strong> Combined inspection and
                  delivery with insurance coverage
                </li>
              </ul>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  marginTop: "16px",
                }}
              >
                We reserve the right to modify, suspend, or discontinue any
                service at any time with reasonable notice.
              </p>
            </div>

            {/* Section 3: User Responsibilities */}
            <div style={{ marginBottom: "48px" }}>
              <h2
                style={{
                  fontSize: isMobile ? "24px" : "28px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "24px",
                  paddingBottom: "16px",
                  borderBottom: "3px solid #FFE5DB",
                }}
              >
                3. Your Responsibilities
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  marginBottom: "16px",
                }}
              >
                When using Dibby, you agree to:
              </p>
              <ul
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  paddingLeft: "24px",
                }}
              >
                <li style={{ marginBottom: "12px" }}>
                  Provide accurate and complete information
                </li>
                <li style={{ marginBottom: "12px" }}>
                  Maintain the security of your account credentials
                </li>
                <li style={{ marginBottom: "12px" }}>
                  Use our services only for lawful purposes
                </li>
                <li style={{ marginBottom: "12px" }}>
                  Not impersonate others or provide false information
                </li>
                <li style={{ marginBottom: "12px" }}>
                  Not interfere with or disrupt our services
                </li>
                <li style={{ marginBottom: "12px" }}>
                  Not use our services to transport illegal, hazardous, or
                  prohibited items
                </li>
                <li style={{ marginBottom: "12px" }}>
                  Cooperate with our inspectors and delivery personnel
                </li>
                <li style={{ marginBottom: "12px" }}>
                  Notify us immediately of any unauthorized account access
                </li>
              </ul>
            </div>

            {/* Section 4: Pricing and Payment */}
            <div style={{ marginBottom: "48px" }}>
              <h2
                style={{
                  fontSize: isMobile ? "24px" : "28px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "24px",
                  paddingBottom: "16px",
                  borderBottom: "3px solid #FFE5DB",
                }}
              >
                4. Pricing and Payment
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  marginBottom: "16px",
                }}
              >
                <strong>Pricing:</strong> Our service fees are clearly displayed
                before you book. Prices may vary based on:
              </p>
              <ul
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  paddingLeft: "24px",
                  marginBottom: "20px",
                }}
              >
                <li style={{ marginBottom: "8px" }}>Service type selected</li>
                <li style={{ marginBottom: "8px" }}>Distance traveled</li>
                <li style={{ marginBottom: "8px" }}>Item size and weight</li>
                <li style={{ marginBottom: "8px" }}>Time of service</li>
                <li style={{ marginBottom: "8px" }}>
                  Additional services requested
                </li>
              </ul>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  marginBottom: "16px",
                }}
              >
                <strong>Payment:</strong> Payment is processed through our
                secure payment partner (Stripe). You authorize us to charge your
                payment method for all services requested. Charges occur after
                service completion.
              </p>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                }}
              >
                <strong>Taxes:</strong> Prices do not include applicable sales
                taxes, which will be added to your final bill based on your
                location.
              </p>
            </div>

            {/* Section 5: Cancellation Policy */}
            <div style={{ marginBottom: "48px" }}>
              <h2
                style={{
                  fontSize: isMobile ? "24px" : "28px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "24px",
                  paddingBottom: "16px",
                  borderBottom: "3px solid #FFE5DB",
                }}
              >
                5. Cancellation and Refund Policy
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  marginBottom: "16px",
                }}
              >
                <strong>Cancellation by You:</strong>
              </p>
              <ul
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  paddingLeft: "24px",
                  marginBottom: "20px",
                }}
              >
                <li style={{ marginBottom: "12px" }}>
                  <strong>More than 4 hours before service:</strong> Full
                  refund, no questions asked
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>2-4 hours before service:</strong> 50% refund
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong>Less than 2 hours before service:</strong> No refund
                </li>
              </ul>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  marginBottom: "16px",
                }}
              >
                <strong>Cancellation by Dibby:</strong> If we cancel your
                service for any reason, you'll receive a full refund within 5-7
                business days.
              </p>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                }}
              >
                <strong>Refunds:</strong> If you're unsatisfied with our
                service, contact us within 24 hours for a potential refund. We
                review all requests on a case-by-case basis.
              </p>
            </div>

            {/* Section 6: Insurance and Liability */}
            <div style={{ marginBottom: "48px" }}>
              <h2
                style={{
                  fontSize: isMobile ? "24px" : "28px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "24px",
                  paddingBottom: "16px",
                  borderBottom: "3px solid #FFE5DB",
                }}
              >
                6. Insurance and Liability
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  marginBottom: "16px",
                }}
              >
                <strong>Insurance Coverage:</strong> All delivery services
                include up to $1,000,000 in insurance coverage for damage or
                loss during pickup, transport, and delivery.
              </p>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  marginBottom: "16px",
                }}
              >
                <strong>Coverage Limitations:</strong> Insurance does not cover:
              </p>
              <ul
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  paddingLeft: "24px",
                  marginBottom: "20px",
                }}
              >
                <li style={{ marginBottom: "8px" }}>
                  Pre-existing damage not documented in our inspection
                </li>
                <li style={{ marginBottom: "8px" }}>
                  Items valued over $1,000,000
                </li>
                <li style={{ marginBottom: "8px" }}>
                  Damage caused by improper packaging by seller
                </li>
                <li style={{ marginBottom: "8px" }}>
                  Illegal or prohibited items
                </li>
                <li style={{ marginBottom: "8px" }}>
                  Acts of God, war, or terrorism
                </li>
              </ul>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                }}
              >
                <strong>Filing Claims:</strong> Report damage within 48 hours of
                delivery. Provide photos and documentation. We'll investigate
                and respond within 10 business days.
              </p>
            </div>

            {/* Section 7: Limitation of Liability */}
            <div style={{ marginBottom: "48px" }}>
              <h2
                style={{
                  fontSize: isMobile ? "24px" : "28px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "24px",
                  paddingBottom: "16px",
                  borderBottom: "3px solid #FFE5DB",
                }}
              >
                7. Limitation of Liability
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  marginBottom: "16px",
                }}
              >
                TO THE MAXIMUM EXTENT PERMITTED BY LAW:
              </p>
              <ul
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  paddingLeft: "24px",
                }}
              >
                <li style={{ marginBottom: "12px" }}>
                  Dibby is not liable for indirect, incidental, special, or
                  consequential damages
                </li>
                <li style={{ marginBottom: "12px" }}>
                  Our total liability is limited to the amount you paid for the
                  specific service
                </li>
                <li style={{ marginBottom: "12px" }}>
                  We are not responsible for delays caused by sellers, traffic,
                  weather, or other factors outside our control
                </li>
                <li style={{ marginBottom: "12px" }}>
                  We are not responsible for the accuracy of seller listings or
                  item descriptions
                </li>
              </ul>
            </div>

            {/* Section 8: Dispute Resolution */}
            <div style={{ marginBottom: "48px" }}>
              <h2
                style={{
                  fontSize: isMobile ? "24px" : "28px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "24px",
                  paddingBottom: "16px",
                  borderBottom: "3px solid #FFE5DB",
                }}
              >
                8. Dispute Resolution
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  marginBottom: "16px",
                }}
              >
                <strong>Informal Resolution:</strong> If you have a dispute,
                please contact our support team first. We'll work in good faith
                to resolve it.
              </p>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  marginBottom: "16px",
                }}
              >
                <strong>Arbitration:</strong> Any disputes that cannot be
                resolved informally will be settled through binding arbitration
                under the rules of the American Arbitration Association.
              </p>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                }}
              >
                <strong>Class Action Waiver:</strong> You agree to resolve
                disputes individually, not as part of a class action or
                representative proceeding.
              </p>
            </div>

            {/* Section 9: Contact Information */}
            <div
              style={{
                marginTop: "48px",
                padding: "32px",
                backgroundColor: "#F0E5F5",
                borderRadius: "20px",
                border: "2px solid #E8D5F2",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "20px",
                }}
              >
                9. Contact Information
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5A5A5A",
                  lineHeight: "1.8",
                  marginBottom: "16px",
                }}
              >
                Questions about these Terms? Contact us:
              </p>
              <div style={{ fontSize: "16px", color: "#5A5A5A" }}>
                <p style={{ marginBottom: "8px" }}>
                  <strong>Email:</strong> legal@dibby.com
                </p>
                <p style={{ marginBottom: "8px" }}>
                  <strong>Mail:</strong> Dibby, Inc., 123 Market Street, San
                  Francisco, CA 94102
                </p>
                <p style={{ marginBottom: "8px" }}>
                  <strong>Phone:</strong> 1-800-DIBBY-00
                </p>
              </div>
            </div>
          </div>
        </section>

        <BackToTopButton />
      </div>
    );
  };

  // ============================================
  // PRICING CALCULATOR PAGE COMPONENT - INTERACTIVE
  // ============================================
  const PricingCalculatorPage: React.FC = () => {
    const { isMobile } = useResponsive();

    // State for calculator
    const [serviceType, setServiceType] = useState<string>("full");
    const [itemType, setItemType] = useState<string>("furniture");
    const [distance, setDistance] = useState<number>(10);
    const [size, setSize] = useState<string>("medium");

    // Calculate price based on inputs
    const calculatePrice = (): number => {
      let basePrice = 0;

      // Base price by service type
      switch (serviceType) {
        case "inspection":
          basePrice = 49;
          break;
        case "delivery":
          basePrice = 75;
          break;
        case "full":
          basePrice = 150;
          break;
        case "property-tour":
          basePrice = 49;
          break;
        default:
          basePrice = 75;
      }

      // Distance multiplier
      const distanceMultiplier = 1 + (distance / 100) * 0.5;

      // Size multiplier
      let sizeMultiplier = 1;
      switch (size) {
        case "small":
          sizeMultiplier = 0.8;
          break;
        case "medium":
          sizeMultiplier = 1;
          break;
        case "large":
          sizeMultiplier = 1.3;
          break;
        case "xlarge":
          sizeMultiplier = 1.6;
          break;
      }

      // Item type adjustment
      let itemAdjustment = 0;
      if (itemType === "vehicle") itemAdjustment = 20;
      if (itemType === "property") itemAdjustment = 0;
      if (itemType === "fragile") itemAdjustment = 15;

      const finalPrice = Math.round(
        basePrice * distanceMultiplier * sizeMultiplier + itemAdjustment
      );
      return finalPrice;
    };

    const totalPrice = calculatePrice();

    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#FFF8F5" }}>
        <SEOHead
          title="Pricing Calculator | Dibby - Estimate Your Delivery Cost"
          description="Calculate the cost of your marketplace delivery or inspection. Get instant pricing based on service type, distance, and item size. Transparent pricing, no hidden fees."
          canonical="/calculator"
          breadcrumbs={[{ name: "Pricing Calculator", url: "/calculator" }]}
        />

        <Breadcrumb
          items={[{ name: "Pricing Calculator", url: "/calculator" }]}
        />

        {/* Hero Section */}
        <section
          style={{
            background: "linear-gradient(135deg, #FFE5C0 0%, #E5F8FF 100%)",
            padding: isMobile ? "60px 20px" : "80px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div
              style={{
                fontSize: isMobile ? "48px" : "64px",
                marginBottom: "24px",
              }}
            >
              🧮
            </div>
            <h1
              style={{
                fontSize: isMobile ? "36px" : "56px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "20px",
                letterSpacing: "-1px",
              }}
            >
              Pricing Calculator
            </h1>
            <p
              style={{
                fontSize: isMobile ? "18px" : "20px",
                color: "#8A8A8A",
                lineHeight: "1.7",
              }}
            >
              Get an instant estimate for your delivery or inspection
              <br />
              <strong>Transparent pricing. No hidden fees.</strong>
            </p>
          </div>
        </section>

        {/* Main Calculator Section */}
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: isMobile ? "60px 20px" : "80px 32px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr",
              gap: "40px",
            }}
          >
            {/* Left Column - Calculator Form */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "32px",
                padding: isMobile ? "32px 24px" : "48px",
                border: "2px solid #FFE5DB",
                boxShadow: "0 8px 32px rgba(255, 180, 162, 0.12)",
              }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "24px" : "32px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "32px",
                }}
              >
                Calculate Your Price
              </h2>

              {/* Service Type Selection */}
              <div style={{ marginBottom: "32px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#5A5A5A",
                    marginBottom: "16px",
                  }}
                >
                  What service do you need?
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                    gap: "12px",
                  }}
                >
                  {[
                    {
                      value: "inspection",
                      label: "Inspection Only",
                      icon: "📸",
                      desc: "Photos & report",
                    },
                    {
                      value: "delivery",
                      label: "Delivery Only",
                      icon: "🚚",
                      desc: "Pickup & delivery",
                    },
                    {
                      value: "full",
                      label: "Full Service",
                      icon: "⭐",
                      desc: "Inspection + delivery",
                    },
                    {
                      value: "property-tour",
                      label: "Property Tour",
                      icon: "🏠",
                      desc: "Virtual walkthrough",
                    },
                  ].map((service) => (
                    <div
                      key={service.value}
                      onClick={() => setServiceType(service.value)}
                      style={{
                        padding: "16px",
                        border:
                          serviceType === service.value
                            ? "3px solid #FFB84D"
                            : "2px solid #FFE5DB",
                        borderRadius: "16px",
                        cursor: "pointer",
                        backgroundColor:
                          serviceType === service.value ? "#FFF8F5" : "white",
                        transition: "all 0.2s",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: "32px", marginBottom: "8px" }}>
                        {service.icon}
                      </div>
                      <div
                        style={{
                          fontSize: "15px",
                          fontWeight: "600",
                          color: "#5A5A5A",
                          marginBottom: "4px",
                        }}
                      >
                        {service.label}
                      </div>
                      <div style={{ fontSize: "12px", color: "#8A8A8A" }}>
                        {service.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Item Type Selection */}
              <div style={{ marginBottom: "32px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#5A5A5A",
                    marginBottom: "12px",
                  }}
                >
                  What type of item?
                </label>
                <select
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "16px",
                    fontSize: "16px",
                    border: "2px solid #FFE5DB",
                    borderRadius: "12px",
                    backgroundColor: "white",
                    cursor: "pointer",
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                >
                  <option value="furniture">
                    Furniture (couch, table, bed)
                  </option>
                  <option value="electronics">
                    Electronics (TV, laptop, phone)
                  </option>
                  <option value="appliances">
                    Appliances (fridge, washer, dryer)
                  </option>
                  <option value="vehicle">
                    Vehicle (car, motorcycle, boat)
                  </option>
                  <option value="property">
                    Property (apartment, house tour)
                  </option>
                  <option value="fragile">
                    Fragile Items (art, antiques, glass)
                  </option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Distance Slider */}
              <div style={{ marginBottom: "32px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#5A5A5A",
                    marginBottom: "12px",
                  }}
                >
                  Distance: <strong>{distance} miles</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={distance}
                  onChange={(e) => setDistance(parseInt(e.target.value))}
                  style={{
                    width: "100%",
                    height: "8px",
                    borderRadius: "4px",
                    outline: "none",
                    WebkitAppearance: "none",
                    background: `linear-gradient(to right, #FFB84D 0%, #FFB84D ${distance}%, #FFE5DB ${distance}%, #FFE5DB 100%)`,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "8px",
                    fontSize: "13px",
                    color: "#8A8A8A",
                  }}
                >
                  <span>1 mi</span>
                  <span>100 mi</span>
                </div>
              </div>

              {/* Size Selection */}
              <div style={{ marginBottom: "32px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#5A5A5A",
                    marginBottom: "12px",
                  }}
                >
                  Item size
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "repeat(2, 1fr)"
                      : "repeat(4, 1fr)",
                    gap: "12px",
                  }}
                >
                  {[
                    { value: "small", label: "Small", desc: "< 20 lbs" },
                    { value: "medium", label: "Medium", desc: "20-100 lbs" },
                    { value: "large", label: "Large", desc: "100-300 lbs" },
                    { value: "xlarge", label: "X-Large", desc: "> 300 lbs" },
                  ].map((sizeOption) => (
                    <div
                      key={sizeOption.value}
                      onClick={() => setSize(sizeOption.value)}
                      style={{
                        padding: "16px 12px",
                        border:
                          size === sizeOption.value
                            ? "3px solid #B8E6D5"
                            : "2px solid #E0F5ED",
                        borderRadius: "12px",
                        cursor: "pointer",
                        backgroundColor:
                          size === sizeOption.value ? "#E0F5ED" : "white",
                        transition: "all 0.2s",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#5A5A5A",
                          marginBottom: "4px",
                        }}
                      >
                        {sizeOption.label}
                      </div>
                      <div style={{ fontSize: "11px", color: "#8A8A8A" }}>
                        {sizeOption.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Price Summary */}
            <div>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "32px",
                  padding: isMobile ? "32px 24px" : "40px 32px",
                  border: "3px solid #FFB84D",
                  boxShadow: "0 12px 48px rgba(255, 184, 77, 0.2)",
                  position: isMobile ? "relative" : "sticky",
                  top: isMobile ? "0" : "120px",
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#5A5A5A",
                    marginBottom: "24px",
                    textAlign: "center",
                  }}
                >
                  Your Estimate
                </h3>

                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "32px",
                    padding: "32px 24px",
                    backgroundColor: "#FFF8F5",
                    borderRadius: "20px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      color: "#8A8A8A",
                      marginBottom: "12px",
                    }}
                  >
                    Estimated Total
                  </div>
                  <div
                    style={{
                      fontSize: isMobile ? "48px" : "64px",
                      fontWeight: "900",
                      color: "#FFB84D",
                      lineHeight: "1",
                      marginBottom: "8px",
                    }}
                  >
                    ${totalPrice}
                  </div>
                  <div style={{ fontSize: "14px", color: "#ABABAB" }}>
                    Includes $1M insurance
                  </div>
                </div>

                {/* Breakdown */}
                <div
                  style={{
                    marginBottom: "24px",
                    paddingBottom: "24px",
                    borderBottom: "2px solid #FFE5DB",
                  }}
                >
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#8A8A8A",
                      marginBottom: "12px",
                    }}
                  >
                    <strong>What's included:</strong>
                  </div>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      fontSize: "14px",
                      color: "#8A8A8A",
                    }}
                  >
                    {serviceType === "inspection" && (
                      <>
                        <li style={{ marginBottom: "8px" }}>
                          ✓ Photo inspection
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          ✓ Video walkthrough
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          ✓ Condition report
                        </li>
                        <li style={{ marginBottom: "8px" }}>✓ 24hr delivery</li>
                      </>
                    )}
                    {serviceType === "delivery" && (
                      <>
                        <li style={{ marginBottom: "8px" }}>
                          ✓ Professional pickup
                        </li>
                        <li style={{ marginBottom: "8px" }}>✓ Safe delivery</li>
                        <li style={{ marginBottom: "8px" }}>✓ $1M insurance</li>
                        <li style={{ marginBottom: "8px" }}>
                          ✓ Real-time tracking
                        </li>
                      </>
                    )}
                    {serviceType === "full" && (
                      <>
                        <li style={{ marginBottom: "8px" }}>
                          ✓ Complete inspection
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          ✓ Professional delivery
                        </li>
                        <li style={{ marginBottom: "8px" }}>✓ $1M insurance</li>
                        <li style={{ marginBottom: "8px" }}>
                          ✓ White-glove service
                        </li>
                      </>
                    )}
                    {serviceType === "property-tour" && (
                      <>
                        <li style={{ marginBottom: "8px" }}>✓ Virtual tour</li>
                        <li style={{ marginBottom: "8px" }}>
                          ✓ Every room documented
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          ✓ Condition notes
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          ✓ Same-day delivery
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setCurrentPage("home");
                    setActiveView("landing");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  style={{
                    width: "100%",
                    padding: "16px",
                    backgroundColor: "#FFB84D",
                    border: "none",
                    borderRadius: "16px",
                    fontSize: "17px",
                    fontWeight: "700",
                    color: "white",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(255, 184, 77, 0.3)",
                    marginBottom: "12px",
                  }}
                >
                  Book This Service →
                </button>

                <p
                  style={{
                    fontSize: "12px",
                    color: "#ABABAB",
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  Final price confirmed after details reviewed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <TrustBadges />

        <BackToTopButton />
      </div>
    );
  };

  // ============================================
  // INSURANCE PAGE COMPONENT - COMPLETE
  // ============================================
  const InsurancePage: React.FC = () => {
    const { isMobile } = useResponsive();

    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#FFF8F5" }}>
        <SEOHead
          title="$1M Insurance Coverage | Dibby - Full Protection for Every Delivery"
          description="Every Dibby delivery includes $1M insurance coverage at no extra cost. Learn about our comprehensive protection, claims process, and safety standards."
          canonical="/insurance"
          breadcrumbs={[{ name: "Insurance Coverage", url: "/insurance" }]}
        />

        <Breadcrumb
          items={[{ name: "Insurance Coverage", url: "/insurance" }]}
        />

        {/* Hero Section */}
        <section
          style={{
            background: "linear-gradient(135deg, #E0F5ED 0%, #E5F8FF 100%)",
            padding: isMobile ? "60px 20px" : "100px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div
              style={{
                fontSize: isMobile ? "72px" : "96px",
                marginBottom: "24px",
              }}
            >
              🛡️
            </div>
            <h1
              style={{
                fontSize: isMobile ? "36px" : "64px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "24px",
                letterSpacing: "-1.5px",
                lineHeight: "1.1",
              }}
            >
              <span style={{ color: "#B8E6D5" }}>$1,000,000</span> Insurance
              Coverage
            </h1>
            <p
              style={{
                fontSize: isMobile ? "20px" : "26px",
                color: "#8A8A8A",
                lineHeight: "1.7",
                fontWeight: "600",
              }}
            >
              Every delivery. Every time. No extra cost.
            </p>
          </div>
        </section>

        {/* What's Covered Section */}
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: isMobile ? "60px 20px" : "80px 32px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2
              style={{
                fontSize: isMobile ? "32px" : "48px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "20px",
              }}
            >
              What's <span style={{ color: "#B8E6D5" }}>Covered</span>
            </h2>
            <p
              style={{
                fontSize: isMobile ? "17px" : "19px",
                color: "#8A8A8A",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: "1.7",
              }}
            >
              Comprehensive protection from the moment we pick up your item
              until it's safely delivered to your door
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: isMobile ? "24px" : "32px",
            }}
          >
            {[
              {
                icon: "📦",
                title: "Damage During Transport",
                description:
                  "If your item is damaged while in our care, we'll repair or replace it up to $1M in value",
                color: "#E5F8FF",
              },
              {
                icon: "🚚",
                title: "Loss or Theft",
                description:
                  "Complete coverage if your item is lost or stolen during pickup, transport, or delivery",
                color: "#E0F5ED",
              },
              {
                icon: "💥",
                title: "Accidents & Incidents",
                description:
                  "Protected against vehicle accidents, drops, weather damage, and other unforeseen events",
                color: "#FFE5C0",
              },
              {
                icon: "🏠",
                title: "Property Damage",
                description:
                  "Coverage for accidental damage to your property during delivery (walls, floors, doorways)",
                color: "#F0E5F5",
              },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  borderRadius: "32px",
                  padding: isMobile ? "36px 28px" : "48px 40px",
                  border: `3px solid ${item.color}`,
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: isMobile ? "80px" : "100px",
                    height: isMobile ? "80px" : "100px",
                    borderRadius: "50%",
                    backgroundColor: item.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: isMobile ? "40px" : "48px",
                    marginBottom: "24px",
                    boxShadow: `0 8px 24px ${item.color}80`,
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  style={{
                    fontSize: isMobile ? "22px" : "26px",
                    fontWeight: "700",
                    color: "#5A5A5A",
                    marginBottom: "16px",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: isMobile ? "16px" : "17px",
                    color: "#8A8A8A",
                    lineHeight: "1.7",
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Claims Process Section */}
        <section
          style={{
            backgroundColor: "white",
            padding: isMobile ? "60px 20px" : "80px 32px",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <h2
                style={{
                  fontSize: isMobile ? "32px" : "48px",
                  fontWeight: "800",
                  color: "#5A5A5A",
                  marginBottom: "20px",
                }}
              >
                Simple <span style={{ color: "#FFB84D" }}>Claims Process</span>
              </h2>
              <p
                style={{
                  fontSize: isMobile ? "17px" : "19px",
                  color: "#8A8A8A",
                  maxWidth: "700px",
                  margin: "0 auto",
                  lineHeight: "1.7",
                }}
              >
                If something goes wrong, we make it right. Here's how to file a
                claim
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
                gap: isMobile ? "32px" : "24px",
                position: "relative",
              }}
            >
              {!isMobile && (
                <div
                  style={{
                    position: "absolute",
                    top: "60px",
                    left: "12.5%",
                    right: "12.5%",
                    height: "4px",
                    backgroundColor: "#FFE5DB",
                    zIndex: 0,
                  }}
                />
              )}
              {[
                {
                  step: "1",
                  title: "Report Immediately",
                  description:
                    "Contact us within 48 hours of delivery. The sooner, the better.",
                  color: "#FFE5C0",
                },
                {
                  step: "2",
                  title: "Document Damage",
                  description:
                    "Take clear photos from multiple angles showing the issue.",
                  color: "#E5F8FF",
                },
                {
                  step: "3",
                  title: "Submit Claim",
                  description:
                    "Fill out our simple online form with photos and details.",
                  color: "#F0E5F5",
                },
                {
                  step: "4",
                  title: "Get Resolution",
                  description:
                    "We review within 10 days and provide repair or replacement.",
                  color: "#E0F5ED",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: "center",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: isMobile ? "100px" : "120px",
                      height: isMobile ? "100px" : "120px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}CC 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: isMobile ? "40px" : "48px",
                      fontWeight: "900",
                      color: "white",
                      margin: "0 auto 24px",
                      boxShadow: `0 12px 32px ${step.color}80`,
                      border: "4px solid white",
                    }}
                  >
                    {step.step}
                  </div>
                  <h3
                    style={{
                      fontSize: isMobile ? "20px" : "22px",
                      fontWeight: "700",
                      color: "#5A5A5A",
                      marginBottom: "16px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: isMobile ? "15px" : "16px",
                      color: "#8A8A8A",
                      lineHeight: "1.6",
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Standards Section */}
        <section
          style={{
            background: "linear-gradient(135deg, #FFB84D 0%, #FFD4A0 100%)",
            padding: isMobile ? "60px 20px" : "80px 32px",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2
                style={{
                  fontSize: isMobile ? "32px" : "48px",
                  fontWeight: "800",
                  color: "white",
                  marginBottom: "20px",
                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                Our Safety Standards
              </h2>
              <p
                style={{
                  fontSize: isMobile ? "17px" : "19px",
                  color: "rgba(255, 255, 255, 0.95)",
                  maxWidth: "700px",
                  margin: "0 auto",
                  lineHeight: "1.7",
                }}
              >
                Insurance is just the backup. We prevent damage through rigorous
                training and protocols
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                gap: isMobile ? "24px" : "32px",
              }}
            >
              {[
                {
                  icon: "✓",
                  title: "Background Checked",
                  description:
                    "Every team member passes comprehensive screening",
                },
                {
                  icon: "🎓",
                  title: "Professionally Trained",
                  description:
                    "Certified in safe handling and transport methods",
                },
                {
                  icon: "🚛",
                  title: "Maintained Vehicles",
                  description:
                    "Regular inspections and GPS tracking on all trucks",
                },
                {
                  icon: "📋",
                  title: "Quality Inspections",
                  description: "Pre-pickup documentation of item condition",
                },
                {
                  icon: "📱",
                  title: "Real-Time Updates",
                  description: "Track your delivery every step of the way",
                },
                {
                  icon: "🤝",
                  title: "24/7 Support",
                  description: "Always available for questions or concerns",
                },
              ].map((standard, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "24px",
                    padding: isMobile ? "32px 24px" : "40px 32px",
                    textAlign: "center",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      backgroundColor: "#FFE5C0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                      fontWeight: "900",
                      color: "#FFB84D",
                      margin: "0 auto 20px",
                    }}
                  >
                    {standard.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: isMobile ? "18px" : "20px",
                      fontWeight: "700",
                      color: "#5A5A5A",
                      marginBottom: "12px",
                    }}
                  >
                    {standard.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "#8A8A8A",
                      lineHeight: "1.6",
                    }}
                  >
                    {standard.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: isMobile ? "60px 20px" : "80px 32px",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "32px" : "42px",
              fontWeight: "800",
              color: "#5A5A5A",
              marginBottom: "48px",
              textAlign: "center",
            }}
          >
            Insurance <span style={{ color: "#B8E6D5" }}>FAQs</span>
          </h2>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "32px",
              padding: isMobile ? "32px 24px" : "48px 60px",
              border: "2px solid #E0F5ED",
              boxShadow: "0 8px 32px rgba(184, 230, 213, 0.15)",
            }}
          >
            {[
              {
                q: "Does insurance cost extra?",
                a: "No! $1M insurance is included with every delivery at no additional cost. It's our commitment to your peace of mind.",
              },
              {
                q: "What's not covered by insurance?",
                a: "Pre-existing damage (not documented in our inspection), items over $1M in value, illegal items, improper seller packaging, and acts of God/war/terrorism.",
              },
              {
                q: "How do I prove the item's value?",
                a: "We use the listing price as the base value. For high-value items, provide purchase receipts, appraisals, or comparable sales data.",
              },
              {
                q: "How long do claims take?",
                a: "Most claims are resolved within 10 business days. Complex cases may take up to 30 days. We keep you updated throughout the process.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                style={{
                  marginBottom: index < 3 ? "32px" : "0",
                  paddingBottom: index < 3 ? "32px" : "0",
                  borderBottom: index < 3 ? "2px solid #E0F5ED" : "none",
                }}
              >
                <h3
                  style={{
                    fontSize: isMobile ? "18px" : "20px",
                    fontWeight: "700",
                    color: "#5A5A5A",
                    marginBottom: "12px",
                  }}
                >
                  {faq.q}
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#8A8A8A",
                    lineHeight: "1.7",
                  }}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section
          style={{
            backgroundColor: "#E5F8FF",
            padding: isMobile ? "60px 20px" : "80px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: isMobile ? "32px" : "48px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "24px",
              }}
            >
              Protected by $1M Insurance
            </h2>
            <p
              style={{
                fontSize: isMobile ? "18px" : "20px",
                color: "#8A8A8A",
                marginBottom: "40px",
                lineHeight: "1.7",
              }}
            >
              Shop with complete confidence. Every delivery is fully insured
              from pickup to your door.
            </p>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                padding: isMobile ? "18px 40px" : "20px 48px",
                backgroundColor: "#B8E6D5",
                border: "none",
                borderRadius: "16px",
                fontSize: "18px",
                fontWeight: "700",
                color: "white",
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(184, 230, 213, 0.35)",
              }}
            >
              Get Started Today →
            </button>
          </div>
        </section>

        <BackToTopButton />
      </div>
    );
  };

  // ============================================
  // SITEMAP PAGE COMPONENT - HTML SITEMAP
  // ============================================
  const SitemapPage: React.FC = () => {
    const { isMobile } = useResponsive();

    const sitemapSections = [
      {
        title: "Main Pages",
        icon: "🏠",
        color: "#E5F8FF",
        links: [
          { name: "Home", page: "home" },
          { name: "How It Works", page: "how-it-works" },
          { name: "About Us", page: "about" },
          { name: "FAQ", page: "faq" },
          { name: "Contact Us", page: "contact" },
        ],
      },
      {
        title: "Services",
        icon: "📦",
        color: "#FFE5C0",
        links: [
          { name: "Property Tours", page: "home", scroll: "services" },
          { name: "Item Inspection", page: "home", scroll: "services" },
          { name: "Pickup & Delivery", page: "home", scroll: "services" },
          { name: "Vehicle Inspection", page: "home", scroll: "services" },
          { name: "Full Service Package", page: "home", scroll: "services" },
        ],
      },
      {
        title: "Tools & Resources",
        icon: "🛠️",
        color: "#F0E5F5",
        links: [
          { name: "Pricing Calculator", page: "calculator" },
          { name: "Service Areas", page: "service-areas" },
          { name: "Sitemap", page: "sitemap" },
        ],
      },
      {
        title: "Legal & Policies",
        icon: "⚖️",
        color: "#E0F5ED",
        links: [
          { name: "Privacy Policy", page: "privacy" },
          { name: "Terms of Service", page: "terms" },
          { name: "Insurance Coverage", page: "insurance" },
        ],
      },
      {
        title: "Marketplace",
        icon: "🛍️",
        color: "#FFF9E6",
        links: [
          { name: "Browse Listings", page: "home", action: "marketplace" },
          { name: "Furniture", page: "home", action: "marketplace" },
          { name: "Electronics", page: "home", action: "marketplace" },
          { name: "Vehicles", page: "home", action: "marketplace" },
          { name: "Property Tours", page: "home", action: "marketplace" },
        ],
      },
      {
        title: "Account",
        icon: "👤",
        color: "#FFE5DB",
        links: [
          { name: "My Profile", page: "profile" },
          { name: "Saved Items", page: "home", action: "saved" },
          { name: "Messages", page: "home", action: "inbox" },
        ],
      },
    ];

    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#FFF8F5" }}>
        <SEOHead
          title="Sitemap | Dibby - Complete Site Navigation"
          description="Explore all pages and services on Dibby. Find marketplace delivery services, pricing tools, legal information, and support resources all in one place."
          canonical="/sitemap"
          breadcrumbs={[{ name: "Sitemap", url: "/sitemap" }]}
        />

        <Breadcrumb items={[{ name: "Sitemap", url: "/sitemap" }]} />

        {/* Hero Section */}
        <section
          style={{
            background: "linear-gradient(135deg, #F0E5F5 0%, #E5F8FF 100%)",
            padding: isMobile ? "60px 20px" : "80px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div
              style={{
                fontSize: isMobile ? "48px" : "64px",
                marginBottom: "24px",
              }}
            >
              🗺️
            </div>
            <h1
              style={{
                fontSize: isMobile ? "36px" : "56px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "20px",
                letterSpacing: "-1px",
              }}
            >
              Site Map
            </h1>
            <p
              style={{
                fontSize: isMobile ? "17px" : "19px",
                color: "#8A8A8A",
                lineHeight: "1.7",
              }}
            >
              Navigate our entire site. Find exactly what you're looking for.
            </p>
          </div>
        </section>

        {/* Main Sitemap Grid */}
        <section
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: isMobile ? "60px 20px" : "80px 32px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(350px, 1fr))",
              gap: isMobile ? "32px" : "40px",
            }}
          >
            {sitemapSections.map((section, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "white",
                  borderRadius: "24px",
                  padding: isMobile ? "32px 24px" : "40px 32px",
                  border: `3px solid ${section.color}`,
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Section Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "24px",
                    paddingBottom: "20px",
                    borderBottom: `3px solid ${section.color}`,
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "16px",
                      backgroundColor: section.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                    }}
                  >
                    {section.icon}
                  </div>
                  <h2
                    style={{
                      fontSize: isMobile ? "22px" : "24px",
                      fontWeight: "700",
                      color: "#5A5A5A",
                      margin: 0,
                    }}
                  >
                    {section.title}
                  </h2>
                </div>

                {/* Links List */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
{section.links.map((link, linkIdx) => (
  <li
    key={linkIdx}
    style={{
      marginBottom: "12px",
    }}
  >
    <span
onClick={() => {
  if ("action" in link) {
    if (link.action === "marketplace") {
      setActiveView("browse");
    } else if (link.action === "saved") {
      setActiveView("saved");
    } else if (link.action === "inbox") {
      setActiveView("inbox");
    }
  } else {
    setCurrentPage(link.page);
    setActiveView("landing");
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}}
                        
                        style={{
                          fontSize: "16px",
                          color: "#5A5A5A",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          marginLeft: "-12px",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = section.color;
                          e.currentTarget.style.color = "#5A5A5A";
                          e.currentTarget.style.paddingLeft = "16px";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#5A5A5A";
                          e.currentTarget.style.paddingLeft = "12px";
                        }}
                      >
                        <span style={{ fontSize: "12px", opacity: 0.6 }}>
                          →
                        </span>
                        {link.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Stats Section */}
        <section
          style={{
            backgroundColor: "white",
            padding: isMobile ? "60px 20px" : "80px 32px",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "repeat(2, 1fr)"
                  : "repeat(4, 1fr)",
                gap: isMobile ? "24px" : "32px",
                textAlign: "center",
              }}
            >
              {[
                { number: "15+", label: "Pages" },
                { number: "5", label: "Services" },
                { number: "30+", label: "Cities" },
                { number: "24/7", label: "Support" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: isMobile ? "24px 16px" : "32px 24px",
                    backgroundColor: "#FFF8F5",
                    borderRadius: "20px",
                    border: "2px solid #FFE5DB",
                  }}
                >
                  <div
                    style={{
                      fontSize: isMobile ? "32px" : "40px",
                      fontWeight: "900",
                      color: "#FFB84D",
                      marginBottom: "8px",
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    style={{
                      fontSize: isMobile ? "14px" : "16px",
                      fontWeight: "600",
                      color: "#8A8A8A",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: isMobile ? "60px 20px" : "80px 32px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "32px",
              padding: isMobile ? "40px 28px" : "60px 80px",
              border: "3px solid #E5F8FF",
              boxShadow: "0 8px 32px rgba(229, 248, 255, 0.3)",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "24px" }}>💬</div>
            <h2
              style={{
                fontSize: isMobile ? "28px" : "36px",
                fontWeight: "700",
                color: "#5A5A5A",
                marginBottom: "20px",
              }}
            >
              Can't Find What You Need?
            </h2>
            <p
              style={{
                fontSize: isMobile ? "16px" : "18px",
                color: "#8A8A8A",
                lineHeight: "1.7",
                marginBottom: "32px",
              }}
            >
              Our support team is here to help 24/7. Reach out and we'll get you
              to the right place.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: "16px",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => {
                  setCurrentPage("contact");
                  setActiveView("landing");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  padding: isMobile ? "16px 32px" : "16px 40px",
                  backgroundColor: "#FFB84D",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "white",
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(255, 184, 77, 0.3)",
                }}
              >
                Contact Support
              </button>
              <button
                onClick={() => {
                  setCurrentPage("faq");
                  setActiveView("landing");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  padding: isMobile ? "16px 32px" : "16px 40px",
                  backgroundColor: "white",
                  border: "2px solid #FFB84D",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#FFB84D",
                  cursor: "pointer",
                }}
              >
                View FAQ
              </button>
            </div>
          </div>
        </section>

        <BackToTopButton />
      </div>
    );
  };

  // ============================================
  // SERVICE AREAS PAGE COMPONENT - CITIES WE SERVE
  // ============================================
  const ServiceAreasPage: React.FC = () => {
    const { isMobile } = useResponsive();

    const cities = [
      {
        state: "California",
        cities: [
          "Los Angeles",
          "San Francisco",
          "San Diego",
          "San Jose",
          "Sacramento",
          "Oakland",
          "Fresno",
          "Long Beach",
        ],
      },
      {
        state: "Texas",
        cities: [
          "Houston",
          "Dallas",
          "Austin",
          "San Antonio",
          "Fort Worth",
          "El Paso",
        ],
      },
      {
        state: "Florida",
        cities: ["Miami", "Orlando", "Tampa", "Jacksonville"],
      },
      {
        state: "New York",
        cities: ["New York City", "Buffalo", "Rochester", "Albany"],
      },
      {
        state: "Illinois",
        cities: ["Chicago", "Aurora", "Naperville"],
      },
      {
        state: "Washington",
        cities: ["Seattle", "Spokane", "Tacoma"],
      },
      {
        state: "Arizona",
        cities: ["Phoenix", "Tucson", "Mesa"],
      },
      {
        state: "Colorado",
        cities: ["Denver", "Colorado Springs"],
      },
    ];

    const totalCities = cities.reduce(
      (total, state) => total + state.cities.length,
      0
    );

    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#FFF8F5" }}>
        <SEOHead
          title="Service Areas | Dibby - 30+ Cities Nationwide"
          description="Dibby serves 30+ cities across the United States. Find marketplace delivery and inspection services in your area. Professional, insured service from coast to coast."
          canonical="/service-areas"
          breadcrumbs={[{ name: "Service Areas", url: "/service-areas" }]}
        />

        <Breadcrumb
          items={[{ name: "Service Areas", url: "/service-areas" }]}
        />

        {/* Hero Section */}
        <section
          style={{
            background: "linear-gradient(135deg, #E5F8FF 0%, #B8E6D5 100%)",
            padding: isMobile ? "60px 20px" : "100px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div
              style={{
                fontSize: isMobile ? "64px" : "80px",
                marginBottom: "24px",
              }}
            >
              📍
            </div>
            <h1
              style={{
                fontSize: isMobile ? "36px" : "64px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "24px",
                letterSpacing: "-1.5px",
                lineHeight: "1.1",
              }}
            >
              We Serve <span style={{ color: "#B8E6D5" }}>{totalCities}+</span>{" "}
              Cities
            </h1>
            <p
              style={{
                fontSize: isMobile ? "18px" : "24px",
                color: "#8A8A8A",
                lineHeight: "1.7",
                fontWeight: "600",
              }}
            >
              Professional marketplace delivery and inspection services
              <br />
              coast to coast
            </p>
          </div>
        </section>

        {/* Coverage Stats */}
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: isMobile ? "60px 20px 40px" : "80px 32px 60px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "repeat(2, 1fr)"
                : "repeat(4, 1fr)",
              gap: isMobile ? "20px" : "32px",
              marginBottom: isMobile ? "60px" : "80px",
            }}
          >
            {[
              { icon: "🏙️", number: `${totalCities}+`, label: "Cities" },
              { icon: "🚚", number: "50K+", label: "Deliveries" },
              { icon: "⭐", number: "4.9", label: "Rating" },
              { icon: "🛡️", number: "$1M", label: "Insurance" },
            ].map((stat, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "white",
                  borderRadius: "24px",
                  padding: isMobile ? "28px 20px" : "40px 32px",
                  textAlign: "center",
                  border: "3px solid #E5F8FF",
                  boxShadow: "0 8px 32px rgba(229, 248, 255, 0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? "40px" : "48px",
                    marginBottom: "12px",
                  }}
                >
                  {stat.icon}
                </div>
                <div
                  style={{
                    fontSize: isMobile ? "28px" : "36px",
                    fontWeight: "900",
                    color: "#5A5A5A",
                    marginBottom: "8px",
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontSize: isMobile ? "14px" : "16px",
                    fontWeight: "600",
                    color: "#8A8A8A",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cities by State */}
        <section
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: isMobile ? "40px 20px 60px" : "60px 32px 80px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2
              style={{
                fontSize: isMobile ? "32px" : "48px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "20px",
              }}
            >
              Find <span style={{ color: "#B8E6D5" }}>Your City</span>
            </h2>
            <p
              style={{
                fontSize: isMobile ? "17px" : "19px",
                color: "#8A8A8A",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: "1.7",
              }}
            >
              Available in major metropolitan areas nationwide. Expanding to new
              cities every month.
            </p>
          </div>

          {/* States Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: isMobile ? "32px" : "40px",
            }}
          >
            {cities.map((state, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "white",
                  borderRadius: "32px",
                  padding: isMobile ? "32px 24px" : "40px 48px",
                  border: "3px solid #E0F5ED",
                  boxShadow: "0 8px 32px rgba(184, 230, 213, 0.15)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 16px 48px rgba(184, 230, 213, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(184, 230, 213, 0.15)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "28px",
                    paddingBottom: "20px",
                    borderBottom: "3px solid #E0F5ED",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "16px",
                      backgroundColor: "#E0F5ED",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                    }}
                  >
                    🏛️
                  </div>
                  <h3
                    style={{
                      fontSize: isMobile ? "24px" : "28px",
                      fontWeight: "700",
                      color: "#5A5A5A",
                      margin: 0,
                    }}
                  >
                    {state.state}
                  </h3>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "repeat(2, 1fr)"
                      : "repeat(2, 1fr)",
                    gap: "16px",
                  }}
                >
                  {state.cities.map((city, cityIdx) => (
                    <div
                      key={cityIdx}
                      onClick={() => {
                        // Map city name to slug
                        const citySlugMap: Record<string, string> = {
                          "New York": "new-york-ny",
                          "Los Angeles": "los-angeles-ca",
                          "San Francisco": "san-francisco-ca",
                          "San Diego": "san-diego-ca",
                          "San Jose": "san-jose-ca",
                          Sacramento: "sacramento-ca",
                          Oakland: "oakland-ca",
                          Fresno: "fresno-ca",
                          "Long Beach": "long-beach-ca",
                          Houston: "houston-tx",
                          Dallas: "dallas-tx",
                          Austin: "austin-tx",
                          "San Antonio": "san-antonio-tx",
                          "Fort Worth": "fort-worth-tx",
                          "El Paso": "el-paso-tx",
                          Miami: "miami-fl",
                          Orlando: "orlando-fl",
                          Tampa: "tampa-fl",
                          Jacksonville: "jacksonville-fl",
                          "New York City": "new-york-ny",
                          Buffalo: "buffalo-ny",
                          Rochester: "rochester-ny",
                          Albany: "albany-ny",
                          Chicago: "chicago-il",
                          Aurora: "aurora-il",
                          Naperville: "naperville-il",
                          Seattle: "seattle-wa",
                          Spokane: "spokane-wa",
                          Tacoma: "tacoma-wa",
                          Phoenix: "phoenix-az",
                          Tucson: "tucson-az",
                          Mesa: "mesa-az",
                          Denver: "denver-co",
                          "Colorado Springs": "colorado-springs-co",
                          Philadelphia: "philadelphia-pa",
                        };

                        const slug = citySlugMap[city];
                        if (slug) {
                          setCurrentPage(`cities/${slug}`);
                          setActiveView("landing");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } else {
                          // City doesn't have a dedicated page yet
showToast(`${city} page coming soon!`, "success");                        }
                      }}
                      style={{
                        padding: "16px 20px",
                        backgroundColor: "#F8FFFE",
                        borderRadius: "12px",
                        border: "2px solid #E0F5ED",
                        fontSize: isMobile ? "15px" : "16px",
                        fontWeight: "600",
                        color: "#5A5A5A",
                        textAlign: "center",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#E0F5ED";
                        e.currentTarget.style.borderColor = "#B8E6D5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#F8FFFE";
                        e.currentTarget.style.borderColor = "#E0F5ED";
                      }}
                    >
                      📍 {city}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services Available */}
        <section
          style={{
            backgroundColor: "white",
            padding: isMobile ? "60px 20px" : "80px 32px",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <h2
                style={{
                  fontSize: isMobile ? "32px" : "48px",
                  fontWeight: "800",
                  color: "#5A5A5A",
                  marginBottom: "20px",
                }}
              >
                Services in <span style={{ color: "#FFB84D" }}>Every City</span>
              </h2>
              <p
                style={{
                  fontSize: isMobile ? "17px" : "19px",
                  color: "#8A8A8A",
                  maxWidth: "700px",
                  margin: "0 auto",
                  lineHeight: "1.7",
                }}
              >
                Same great service, no matter where you are
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                gap: isMobile ? "24px" : "32px",
              }}
            >
              {[
                {
                  icon: "📸",
                  title: "Item Inspection",
                  desc: "Professional photos and video of any listing before you buy",
                  color: "#FFE5C0",
                },
                {
                  icon: "🚚",
                  title: "Pickup & Delivery",
                  desc: "Safe, insured delivery from seller to your door",
                  color: "#E5F8FF",
                },
                {
                  icon: "🏠",
                  title: "Property Tours",
                  desc: "Virtual walkthroughs of apartments and houses",
                  color: "#F0E5F5",
                },
                {
                  icon: "🚗",
                  title: "Vehicle Inspection",
                  desc: "Complete inspection reports for cars and motorcycles",
                  color: "#E0F5ED",
                },
                {
                  icon: "⭐",
                  title: "Full Service",
                  desc: "Inspection + delivery with white-glove handling",
                  color: "#FFF9E6",
                },
                {
                  icon: "🛡️",
                  title: "$1M Insurance",
                  desc: "Every service fully covered at no extra cost",
                  color: "#FFE5DB",
                },
              ].map((service, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: isMobile ? "32px 24px" : "40px 32px",
                    backgroundColor: service.color,
                    borderRadius: "24px",
                    border: "2px solid rgba(0, 0, 0, 0.05)",
                    textAlign: "center",
                    transition: "transform 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      fontSize: isMobile ? "48px" : "56px",
                      marginBottom: "20px",
                    }}
                  >
                    {service.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: isMobile ? "20px" : "22px",
                      fontWeight: "700",
                      color: "#5A5A5A",
                      marginBottom: "16px",
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontSize: isMobile ? "15px" : "16px",
                      color: "#8A8A8A",
                      lineHeight: "1.6",
                    }}
                  >
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expansion Section */}
        <section
          style={{
            background: "linear-gradient(135deg, #FFB84D 0%, #FFD4A0 100%)",
            padding: isMobile ? "60px 20px" : "80px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ fontSize: "56px", marginBottom: "24px" }}>🚀</div>
            <h2
              style={{
                fontSize: isMobile ? "32px" : "48px",
                fontWeight: "800",
                color: "white",
                marginBottom: "24px",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              Don't See Your City?
            </h2>
            <p
              style={{
                fontSize: isMobile ? "18px" : "22px",
                color: "rgba(255, 255, 255, 0.95)",
                marginBottom: "40px",
                lineHeight: "1.7",
              }}
            >
              We're expanding rapidly! Request service in your area and we'll
              notify you when we arrive.
            </p>
            <button
              onClick={() => {
                setCurrentPage("contact");
                setActiveView("landing");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                padding: isMobile ? "18px 40px" : "20px 48px",
                backgroundColor: "white",
                border: "none",
                borderRadius: "16px",
                fontSize: "18px",
                fontWeight: "700",
                color: "#FFB84D",
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
              }}
            >
              Request Your City →
            </button>
          </div>
        </section>

        {/* Trust Section */}
        <TrustBadges />

        <BackToTopButton />
      </div>
    );
  };

  // ============================================
  // BLOG PAGE COMPONENT - MAIN BLOG LISTING
  // ============================================
  const BlogPage: React.FC = () => {
    const { isMobile } = useResponsive();
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const categories = ["All", "Safety Tips", "Buying Guides", "Insurance"];

    const filteredPosts =
      selectedCategory === "All"
        ? BLOG_POSTS
        : BLOG_POSTS.filter((post) => post.category === selectedCategory);

    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#FFF8F5" }}>
        <SEOHead
          title="Blog | Dibby - Tips, Guides & Marketplace Safety"
          description="Expert advice on buying from online marketplaces safely. Learn about scam prevention, furniture buying guides, insurance, and more."
          canonical="/blog"
          breadcrumbs={[{ name: "Blog", url: "/blog" }]}
        />

        <Breadcrumb items={[{ name: "Blog", url: "/blog" }]} />

        {/* Hero Section */}
        <section
          style={{
            background: "linear-gradient(135deg, #FFE5C0 0%, #F0E5F5 100%)",
            padding: isMobile ? "60px 20px" : "80px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div
              style={{
                fontSize: isMobile ? "48px" : "64px",
                marginBottom: "24px",
              }}
            >
              📝
            </div>
            <h1
              style={{
                fontSize: isMobile ? "36px" : "56px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "20px",
                letterSpacing: "-1px",
              }}
            >
              Dibby Blog
            </h1>
            <p
              style={{
                fontSize: isMobile ? "18px" : "20px",
                color: "#8A8A8A",
                lineHeight: "1.7",
              }}
            >
              Expert tips, guides, and stories about shopping online
              marketplaces safely
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: isMobile ? "40px 20px 20px" : "60px 32px 40px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: isMobile ? "12px 24px" : "14px 32px",
                  backgroundColor:
                    selectedCategory === category ? "#FFB84D" : "white",
                  color: selectedCategory === category ? "white" : "#5A5A5A",
                  border:
                    selectedCategory === category
                      ? "2px solid #FFB84D"
                      : "2px solid #FFE5DB",
                  borderRadius: "12px",
                  fontSize: isMobile ? "14px" : "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.backgroundColor = "#FFF8F5";
                    e.currentTarget.style.borderColor = "#FFB84D";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.borderColor = "#FFE5DB";
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: isMobile ? "20px 20px 60px" : "40px 32px 80px",
          }}
        >
          {filteredPosts.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#8A8A8A",
              }}
            >
              <div style={{ fontSize: "64px", marginBottom: "20px" }}>📭</div>
              <h3 style={{ fontSize: "24px", marginBottom: "12px" }}>
                No posts in this category yet
              </h3>
              <p>Check back soon for new content!</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                gap: isMobile ? "32px" : "40px",
              }}
            >
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => {
                    setCurrentPage("blog-post");
                    setSelectedBlogPost(post);
                    setActiveView("landing");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "24px",
                    overflow: "hidden",
                    border: "2px solid #FFE5DB",
                    boxShadow: "0 8px 32px rgba(255, 180, 162, 0.12)",
                    cursor: "pointer",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 16px 48px rgba(255, 180, 162, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(255, 180, 162, 0.12)";
                  }}
                >
                  {/* Image/Icon Header */}
                  <div
                    style={{
                      height: isMobile ? "180px" : "220px",
                      background:
                        "linear-gradient(135deg, #FFE5C0 0%, #E5F8FF 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: isMobile ? "72px" : "96px",
                    }}
                  >
                    {post.image}
                  </div>

                  {/* Content */}
                  <div style={{ padding: isMobile ? "24px" : "32px" }}>
                    {/* Category Badge */}
                    <div
                      style={{
                        display: "inline-block",
                        padding: "6px 16px",
                        backgroundColor: "#FFF8F5",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#FFB84D",
                        marginBottom: "16px",
                      }}
                    >
                      {post.category}
                    </div>

                    {/* Title */}
                    <h2
                      style={{
                        fontSize: isMobile ? "20px" : "24px",
                        fontWeight: "700",
                        color: "#5A5A5A",
                        marginBottom: "16px",
                        lineHeight: "1.3",
                      }}
                    >
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p
                      style={{
                        fontSize: isMobile ? "15px" : "16px",
                        color: "#8A8A8A",
                        lineHeight: "1.6",
                        marginBottom: "20px",
                      }}
                    >
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        fontSize: "14px",
                        color: "#ABABAB",
                        paddingTop: "20px",
                        borderTop: "2px solid #FFE5DB",
                      }}
                    >
                      <span>✍️ {post.author}</span>
                      <span>•</span>
                      <span>📅 {new Date(post.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>⏱️ {post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section
          style={{
            backgroundColor: "#E5F8FF",
            padding: isMobile ? "60px 20px" : "80px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: isMobile ? "28px" : "42px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "20px",
              }}
            >
              Ready to Shop Safely?
            </h2>
            <p
              style={{
                fontSize: isMobile ? "17px" : "19px",
                color: "#8A8A8A",
                marginBottom: "32px",
                lineHeight: "1.7",
              }}
            >
              Put these tips into action. Let Dibby inspect and deliver your
              next marketplace purchase with $1M insurance.
            </p>
            <button
              onClick={() => {
                setCurrentPage("home");
                setActiveView("landing");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                padding: isMobile ? "16px 40px" : "18px 48px",
                backgroundColor: "#FFB84D",
                border: "none",
                borderRadius: "14px",
                fontSize: "17px",
                fontWeight: "700",
                color: "white",
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(255, 184, 77, 0.3)",
              }}
            >
              Get Started Today →
            </button>
          </div>
        </section>

        <BackToTopButton />
      </div>
    );
  };

  // ============================================
  // BLOG POST PAGE COMPONENT - INDIVIDUAL POST VIEWER
  // ============================================
  const BlogPostPage: React.FC = () => {
    const { isMobile } = useResponsive();

    if (!selectedBlogPost) {
      return (
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "#FFF8F5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "64px", marginBottom: "24px" }}>📭</div>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#5A5A5A",
                marginBottom: "16px",
              }}
            >
              Post Not Found
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#8A8A8A",
                marginBottom: "32px",
              }}
            >
              The blog post you're looking for doesn't exist.
            </p>
            <button
              onClick={() => {
                setCurrentPage("blog");
                setActiveView("landing");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                padding: "16px 32px",
                backgroundColor: "#FFB84D",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "700",
                color: "white",
                cursor: "pointer",
              }}
            >
              ← Back to Blog
            </button>
          </div>
        </div>
      );
    }

    const relatedPosts = BLOG_POSTS.filter(
      (post) =>
        post.id !== selectedBlogPost.id &&
        (post.category === selectedBlogPost.category ||
          post.tags.some((tag) => selectedBlogPost.tags.includes(tag)))
    ).slice(0, 2);

    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#FFF8F5" }}>
        <SEOHead
          title={`${selectedBlogPost.title} | Dibby Blog`}
          description={selectedBlogPost.excerpt}
          canonical={`/blog/${selectedBlogPost.slug}`}
          breadcrumbs={[
            { name: "Blog", url: "/blog" },
            {
              name: selectedBlogPost.title,
              url: `/blog/${selectedBlogPost.slug}`,
            },
          ]}
        />

        <Breadcrumb
          items={[
            { name: "Blog", url: "/blog" },
            {
              name: selectedBlogPost.title,
              url: `/blog/${selectedBlogPost.slug}`,
            },
          ]}
        />

        {/* Hero Section */}
        <section
          style={{
            background: "linear-gradient(135deg, #FFE5C0 0%, #E5F8FF 100%)",
            padding: isMobile ? "60px 20px" : "80px 32px",
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            {/* Category Badge */}
            <div
              style={{
                display: "inline-block",
                padding: "8px 20px",
                backgroundColor: "white",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#FFB84D",
                marginBottom: "24px",
              }}
            >
              {selectedBlogPost.category}
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: isMobile ? "32px" : "48px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "24px",
                lineHeight: "1.2",
                letterSpacing: "-0.5px",
              }}
            >
              {selectedBlogPost.title}
            </h1>

            {/* Meta Info */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: isMobile ? "12px" : "20px",
                fontSize: isMobile ? "14px" : "16px",
                color: "#8A8A8A",
              }}
            >
              <span style={{ fontWeight: "600" }}>
                ✍️ {selectedBlogPost.author}
              </span>
              <span>•</span>
              <span>
                📅{" "}
                {new Date(selectedBlogPost.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>•</span>
              <span>⏱️ {selectedBlogPost.readTime}</span>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: isMobile ? "40px 20px" : "60px 32px 40px",
          }}
        >
          <div
            style={{
              height: isMobile ? "200px" : "300px",
              background: "linear-gradient(135deg, #F0E5F5 0%, #B8E6D5 100%)",
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: isMobile ? "80px" : "120px",
              border: "3px solid #FFE5DB",
              boxShadow: "0 8px 32px rgba(255, 180, 162, 0.15)",
            }}
          >
            {selectedBlogPost.image}
          </div>
        </section>

        {/* Article Content */}
        <article
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: isMobile ? "20px 20px 60px" : "40px 32px 80px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "32px",
              padding: isMobile ? "32px 24px" : "60px 80px",
              border: "2px solid #FFE5DB",
              boxShadow: "0 8px 32px rgba(255, 180, 162, 0.12)",
              fontSize: isMobile ? "17px" : "19px",
              lineHeight: "1.8",
              color: "#5A5A5A",
            }}
          >
            {/* Render markdown-like content */}
           {selectedBlogPost.content.split("\n").map((line: string, index: number) => {
              // H1
              if (line.startsWith("# ")) {
                return (
                  <h1
                    key={index}
                    style={{
                      fontSize: isMobile ? "28px" : "36px",
                      fontWeight: "800",
                      color: "#5A5A5A",
                      marginTop: index === 0 ? "0" : "48px",
                      marginBottom: "24px",
                      lineHeight: "1.2",
                    }}
                  >
                    {line.replace("# ", "")}
                  </h1>
                );
              }
              // H2
              if (line.startsWith("## ")) {
                return (
                  <h2
                    key={index}
                    style={{
                      fontSize: isMobile ? "24px" : "28px",
                      fontWeight: "700",
                      color: "#5A5A5A",
                      marginTop: "40px",
                      marginBottom: "20px",
                      paddingBottom: "12px",
                      borderBottom: "3px solid #FFE5DB",
                    }}
                  >
                    {line.replace("## ", "")}
                  </h2>
                );
              }
              // H3
              if (line.startsWith("### ")) {
                return (
                  <h3
                    key={index}
                    style={{
                      fontSize: isMobile ? "20px" : "22px",
                      fontWeight: "600",
                      color: "#5A5A5A",
                      marginTop: "32px",
                      marginBottom: "16px",
                    }}
                  >
                    {line.replace("### ", "")}
                  </h3>
                );
              }
              // Bold text
              if (line.startsWith("**") && line.endsWith("**")) {
                return (
                  <p
                    key={index}
                    style={{
                      fontWeight: "700",
                      marginBottom: "16px",
                    }}
                  >
                    {line.replace(/\*\*/g, "")}
                  </p>
                );
              }
              // List items
              if (line.startsWith("- ")) {
                return (
                  <li
                    key={index}
                    style={{
                      marginBottom: "12px",
                      marginLeft: "20px",
                    }}
                  >
                    {line.replace("- ", "")}
                  </li>
                );
              }
              // Empty line
              if (line.trim() === "") {
                return <div key={index} style={{ height: "12px" }} />;
              }
              // Regular paragraph
              return (
                <p
                  key={index}
                  style={{
                    marginBottom: "20px",
                    lineHeight: "1.8",
                  }}
                >
                  {line}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div
            style={{
              marginTop: "48px",
              paddingTop: "32px",
              borderTop: "2px solid #FFE5DB",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#5A5A5A",
                marginBottom: "16px",
              }}
            >
              Tags
            </h3>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
{selectedBlogPost.tags.map((tag: string, index: number) => (
  <span
                  key={index}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#FFF8F5",
                    border: "2px solid #FFE5DB",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#8A8A8A",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section
            style={{
              backgroundColor: "white",
              padding: isMobile ? "60px 20px" : "80px 32px",
            }}
          >
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <h2
                style={{
                  fontSize: isMobile ? "28px" : "36px",
                  fontWeight: "800",
                  color: "#5A5A5A",
                  marginBottom: isMobile ? "32px" : "48px",
                  textAlign: "center",
                }}
              >
                Related Articles
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : relatedPosts.length === 1
                    ? "1fr"
                    : "repeat(2, 1fr)",
                  gap: isMobile ? "24px" : "32px",
                }}
              >
                {relatedPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => {
                      setSelectedBlogPost(post);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    style={{
                      backgroundColor: "#FFF8F5",
                      borderRadius: "20px",
                      padding: isMobile ? "24px" : "32px",
                      border: "2px solid #FFE5DB",
                      cursor: "pointer",
                      transition: "transform 0.3s, box-shadow 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 32px rgba(255, 180, 162, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      style={{
                        fontSize: "48px",
                        marginBottom: "16px",
                        textAlign: "center",
                      }}
                    >
                      {post.image}
                    </div>
                    <h3
                      style={{
                        fontSize: isMobile ? "18px" : "20px",
                        fontWeight: "700",
                        color: "#5A5A5A",
                        marginBottom: "12px",
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "15px",
                        color: "#8A8A8A",
                        marginBottom: "16px",
                        lineHeight: "1.6",
                      }}
                    >
                      {post.excerpt.substring(0, 120)}...
                    </p>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#ABABAB",
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                      }}
                    >
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.category}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: "center", marginTop: "48px" }}>
                <button
                  onClick={() => {
                    setCurrentPage("blog");
                    setActiveView("landing");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  style={{
                    padding: isMobile ? "14px 32px" : "16px 40px",
                    backgroundColor: "#FFB84D",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "white",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(255, 184, 77, 0.3)",
                  }}
                >
                  ← Back to All Posts
                </button>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section
          style={{
            backgroundColor: "#E5F8FF",
            padding: isMobile ? "60px 20px" : "80px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: isMobile ? "28px" : "42px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "20px",
              }}
            >
              Ready to Shop Safely?
            </h2>
            <p
              style={{
                fontSize: isMobile ? "17px" : "19px",
                color: "#8A8A8A",
                marginBottom: "32px",
                lineHeight: "1.7",
              }}
            >
              Let Dibby handle the inspection and delivery. $1M insurance
              included.
            </p>
            <button
              onClick={() => {
                setCurrentPage("home");
                setActiveView("landing");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                padding: isMobile ? "16px 40px" : "18px 48px",
                backgroundColor: "#FFB84D",
                border: "none",
                borderRadius: "14px",
                fontSize: "17px",
                fontWeight: "700",
                color: "white",
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(255, 184, 77, 0.3)",
              }}
            >
              Get Started Today →
            </button>
          </div>
        </section>

        <BackToTopButton />
      </div>
    );
  };

  // ============================================================================
  // 🏙️ CHUNK A: CITY-SPECIFIC LANDING PAGES - START HERE
  // ============================================================================
  // Paste this AFTER BlogPostPage component
  // This creates 10 city-specific pages for local SEO
  // ============================================================================

  // ---------------------------------------------------------------------------
  // City Page Data - Neighborhoods, stats, and content for each city
  // ---------------------------------------------------------------------------
  const CITY_DATA = {
    "new-york-ny": {
      name: "New York",
      state: "NY",
      emoji: "🗽",
      population: "8.3 million",
      avgHomePrice: "$680,000",
      marketplaceVolume: "2.1M listings/month",
      neighborhoods: [
        "Manhattan",
        "Brooklyn",
        "Queens",
        "Bronx",
        "Staten Island",
        "Williamsburg",
        "Astoria",
        "Long Island City",
      ],
      testimonials: [
        {
          name: "Sarah Chen",
          location: "Manhattan, NY",
          rating: 5,
          text: "Dibby saved me so much time! I bought a couch from someone in Brooklyn and they handled everything. The inspection caught some hidden damage that wasn't in the photos. Worth every penny!",
          service: "Full Service",
        },
        {
          name: "Michael Rodriguez",
          location: "Queens, NY",
          rating: 5,
          text: "As a busy professional, I don't have time to drive to Staten Island for a marketplace pickup. Dibby's team was professional, on-time, and even helped me negotiate a better price. Highly recommend!",
          service: "Delivery + Inspection",
        },
        {
          name: "Emily Thompson",
          location: "Brooklyn, NY",
          rating: 5,
          text: "I was nervous about buying a used dresser from Craigslist, but Dibby's inspection service gave me peace of mind. They took detailed photos and measurements. The delivery was smooth and professional.",
          service: "Inspection",
        },
      ],
      faqs: [
        {
          question: "Do you serve all five boroughs of NYC?",
          answer:
            "Yes! We provide service across Manhattan, Brooklyn, Queens, Bronx, and Staten Island. We also cover nearby areas in New Jersey and Long Island.",
        },
        {
          question: "How much does delivery cost in New York City?",
          answer:
            "Prices start at $49 for small items within the same borough. Cross-borough deliveries typically range from $79-$149 depending on item size and distance. Use our pricing calculator for an exact quote.",
        },
        {
          question: "Can you help with apartment building regulations?",
          answer:
            "Absolutely! Our team is experienced with NYC building requirements including COIs (Certificate of Insurance), elevator reservations, and service entrance protocols. We handle all the coordination.",
        },
        {
          question: "What if the seller is in New Jersey but I'm in Manhattan?",
          answer:
            "No problem! We cover the entire NYC metro area including New Jersey, Westchester, and Long Island. Distance is calculated automatically in our pricing.",
        },
        {
          question: "Do you offer same-day service in NYC?",
          answer:
            "Yes, same-day service is available for orders placed before 2 PM, subject to availability. Rush fees apply for same-day requests.",
        },
      ],
    },
    "los-angeles-ca": {
      name: "Los Angeles",
      state: "CA",
      emoji: "🌴",
      population: "3.9 million",
      avgHomePrice: "$950,000",
      marketplaceVolume: "1.8M listings/month",
      neighborhoods: [
        "Hollywood",
        "Beverly Hills",
        "Santa Monica",
        "Downtown LA",
        "Venice",
        "Silver Lake",
        "Pasadena",
        "Long Beach",
      ],
      testimonials: [
        {
          name: "Jessica Martinez",
          location: "Santa Monica, CA",
          rating: 5,
          text: "LA traffic is insane, so I use Dibby for all my marketplace pickups. They inspected a mid-century modern chair in Pasadena and delivered it to me in Santa Monica the same day. Amazing service!",
          service: "Full Service",
        },
        {
          name: "David Kim",
          location: "Hollywood, CA",
          rating: 5,
          text: "I'm furnishing my first apartment and Dibby has been a lifesaver. They've helped me buy 5 items so far, each time catching issues the seller didn't mention. Their inspection reports are thorough!",
          service: "Inspection + Delivery",
        },
        {
          name: "Amanda Foster",
          location: "Venice, CA",
          rating: 5,
          text: "Bought a surfboard from someone in Long Beach. Dibby checked for dings and water damage, then delivered it safely to Venice. They even threw in padding for free. Super impressed!",
          service: "Delivery",
        },
      ],
      faqs: [
        {
          question: "Do you cover the entire LA metro area?",
          answer:
            "Yes! We serve Los Angeles County including Downtown LA, Santa Monica, Pasadena, Long Beach, and surrounding areas. We also cover Orange County and parts of Ventura County.",
        },
        {
          question: "How do you handle LA's notorious traffic?",
          answer:
            "Our team uses real-time traffic data and local knowledge to optimize routes. We provide realistic delivery windows and always communicate if there are unexpected delays.",
        },
        {
          question: "Can you deliver to gated communities?",
          answer:
            "Absolutely! We're experienced with gated communities throughout LA. We coordinate with HOAs and gate security to ensure smooth access.",
        },
        {
          question: "What's the typical delivery time in LA?",
          answer:
            "Most deliveries are completed within 24-48 hours. Same-day service is available for urgent requests (additional fees apply).",
        },
        {
          question: "Do you inspect high-end furniture and antiques?",
          answer:
            "Yes! Our team has experience with luxury and antique items. We provide detailed condition reports with HD photos and can coordinate with third-party appraisers if needed.",
        },
      ],
    },
    "chicago-il": {
      name: "Chicago",
      state: "IL",
      emoji: "🌃",
      population: "2.7 million",
      avgHomePrice: "$340,000",
      marketplaceVolume: "890K listings/month",
      neighborhoods: [
        "The Loop",
        "Lincoln Park",
        "Wicker Park",
        "South Loop",
        "Lakeview",
        "River North",
        "Logan Square",
        "Hyde Park",
      ],
      testimonials: [
        {
          name: "Tom Anderson",
          location: "Lincoln Park, IL",
          rating: 5,
          text: "Chicago winters are brutal, so I wasn't about to drive to the suburbs for a couch. Dibby handled everything including navigating my building's freight elevator. Professional and efficient!",
          service: "Full Service",
        },
        {
          name: "Maria Gonzalez",
          location: "Wicker Park, IL",
          rating: 5,
          text: "I was skeptical about buying used electronics, but Dibby's inspection service tested everything thoroughly. They even negotiated a $50 discount when they found a minor issue. Great value!",
          service: "Inspection",
        },
        {
          name: "James Wilson",
          location: "South Loop, IL",
          rating: 5,
          text: "Bought a dining table from someone in Naperville. Dibby picked it up, stored it for 2 days while my apartment was being painted, then delivered it. Flexible and accommodating!",
          service: "Delivery",
        },
      ],
      faqs: [
        {
          question: "Do you operate during Chicago winters?",
          answer:
            "Yes! We operate year-round including during snow and cold weather. Our team takes extra precautions to protect items during winter deliveries.",
        },
        {
          question: "Can you handle high-rise deliveries in downtown Chicago?",
          answer:
            "Absolutely! We're experienced with Chicago's high-rise buildings, including securing elevator access and coordinating with building management.",
        },
        {
          question: "Do you serve Chicago suburbs?",
          answer:
            "Yes! We cover the entire Chicagoland area including suburbs like Naperville, Evanston, Oak Park, and Schaumburg.",
        },
        {
          question: "What about parking challenges in the city?",
          answer:
            "Our team is familiar with Chicago's parking restrictions and loading zones. We handle all parking logistics and coordinate with building management when needed.",
        },
        {
          question: "How much does service cost in Chicago?",
          answer:
            "Prices start at $45 for small items within the city. Suburb deliveries typically range from $69-$129 depending on distance and item size.",
        },
      ],
    },
    "houston-tx": {
      name: "Houston",
      state: "TX",
      emoji: "🤠",
      population: "2.3 million",
      avgHomePrice: "$295,000",
      marketplaceVolume: "760K listings/month",
      neighborhoods: [
        "Downtown Houston",
        "The Heights",
        "Montrose",
        "Rice Village",
        "Memorial",
        "Midtown",
        "River Oaks",
        "Galleria",
      ],
      testimonials: [
        {
          name: "Carlos Ramirez",
          location: "The Heights, TX",
          rating: 5,
          text: "Houston is huge and spread out. Dibby saved me hours of driving when I bought a grill from someone in Katy. They inspected it, tested it, and delivered it the next day. Perfect!",
          service: "Full Service",
        },
        {
          name: "Lisa Chen",
          location: "Rice Village, TX",
          rating: 5,
          text: "I needed furniture for my new apartment and found great deals on Facebook Marketplace. Dibby handled 3 pickups in one day from different parts of Houston. So convenient!",
          service: "Delivery",
        },
        {
          name: "Robert Johnson",
          location: "Memorial, TX",
          rating: 5,
          text: "Bought a used riding mower from someone in Sugar Land. Dibby's inspection was thorough - they even started it up and checked the blades. Gave me confidence in the purchase.",
          service: "Inspection",
        },
      ],
      faqs: [
        {
          question: "Do you cover all of Greater Houston?",
          answer:
            "Yes! We serve the entire Houston metro area including The Woodlands, Sugar Land, Pearland, Katy, and other surrounding communities.",
        },
        {
          question: "How do you handle Houston's heat during deliveries?",
          answer:
            "Our vehicles are climate-controlled, and we take extra precautions with heat-sensitive items. We also schedule deliveries during cooler parts of the day when requested.",
        },
        {
          question: "Can you inspect vehicles in Houston?",
          answer:
            "Yes! We offer vehicle inspection services including test drives, mechanical checks, and detailed photo documentation. Perfect for used car purchases.",
        },
        {
          question: "What's your coverage area outside the city?",
          answer:
            "We serve approximately 50 miles from downtown Houston, covering most of Harris, Fort Bend, and Montgomery counties.",
        },
        {
          question: "Do you offer weekend service?",
          answer:
            "Absolutely! We operate 7 days a week including weekends. Saturday and Sunday are our busiest days.",
        },
      ],
    },
    "phoenix-az": {
      name: "Phoenix",
      state: "AZ",
      emoji: "🌵",
      population: "1.7 million",
      avgHomePrice: "$455,000",
      marketplaceVolume: "620K listings/month",
      neighborhoods: [
        "Downtown Phoenix",
        "Scottsdale",
        "Tempe",
        "Mesa",
        "Chandler",
        "Glendale",
        "Paradise Valley",
        "Arcadia",
      ],
      testimonials: [
        {
          name: "Jennifer Lopez",
          location: "Scottsdale, AZ",
          rating: 5,
          text: "Phoenix traffic can be terrible, especially during rush hour. Dibby picked up a patio set from Mesa and delivered it to my Scottsdale home. They even helped me arrange it on my patio!",
          service: "Full Service",
        },
        {
          name: "Mike Stevens",
          location: "Tempe, AZ",
          rating: 5,
          text: "I'm a college student at ASU and needed affordable furniture. Dibby helped me buy and transport items from all over Phoenix. Their student discount was a nice bonus!",
          service: "Delivery",
        },
        {
          name: "Patricia Garcia",
          location: "Chandler, AZ",
          rating: 5,
          text: "Bought a treadmill from Craigslist. Dibby tested it, checked for any issues, and delivered it to my home gym. They even assembled it for a small additional fee. Great service!",
          service: "Inspection + Delivery",
        },
      ],
      faqs: [
        {
          question: "Do you serve the entire Phoenix metro area?",
          answer:
            "Yes! We cover Phoenix, Scottsdale, Tempe, Mesa, Chandler, Glendale, and surrounding cities in the Valley.",
        },
        {
          question: "How do you protect items from the extreme heat?",
          answer:
            "Our delivery vehicles are climate-controlled. We also take special precautions with heat-sensitive items like electronics and avoid leaving items in hot vehicles.",
        },
        {
          question: "Can you help with outdoor furniture and equipment?",
          answer:
            "Absolutely! Phoenix has a huge market for patio furniture, grills, and outdoor equipment. We specialize in inspecting and transporting these items.",
        },
        {
          question: "Do you charge extra for Scottsdale deliveries?",
          answer:
            "No, standard rates apply throughout the Phoenix metro area. Pricing is based on distance and item size, not neighborhood.",
        },
        {
          question: "What's the typical turnaround time?",
          answer:
            "Most pickups and deliveries are completed within 24 hours. Same-day service is available for rush orders.",
        },
      ],
    },
    "philadelphia-pa": {
      name: "Philadelphia",
      state: "PA",
      emoji: "🔔",
      population: "1.6 million",
      avgHomePrice: "$315,000",
      marketplaceVolume: "580K listings/month",
      neighborhoods: [
        "Center City",
        "Old City",
        "Fishtown",
        "University City",
        "South Philly",
        "Manayunk",
        "Northern Liberties",
        "Rittenhouse Square",
      ],
      testimonials: [
        {
          name: "Kevin O'Brien",
          location: "Fishtown, PA",
          rating: 5,
          text: "Philadelphia streets are narrow and parking is impossible. Dibby handled a couch pickup from South Philly and navigated the tight streets like pros. Saved me so much hassle!",
          service: "Delivery",
        },
        {
          name: "Aisha Williams",
          location: "University City, PA",
          rating: 5,
          text: "As a Penn student, I use Dibby constantly. They've helped me buy textbooks, furniture, and even a bike. Their prices are student-friendly and service is always reliable.",
          service: "Full Service",
        },
        {
          name: "Christopher Davis",
          location: "Rittenhouse Square, PA",
          rating: 5,
          text: "I collect antique furniture and Dibby's inspection service is invaluable. They know what to look for and provide detailed condition reports. I trust them completely.",
          service: "Inspection",
        },
      ],
      faqs: [
        {
          question: "Do you serve both Philadelphia and the suburbs?",
          answer:
            "Yes! We cover Philadelphia proper plus suburbs in Pennsylvania, New Jersey (Camden area), and Delaware County.",
        },
        {
          question: "How do you handle Philly's narrow streets and parking?",
          answer:
            "Our team is familiar with Philadelphia's unique challenges. We plan routes carefully, coordinate with parking authorities when needed, and have experience navigating tight spaces.",
        },
        {
          question: "Can you handle historic row home deliveries?",
          answer:
            "Absolutely! We regularly work in Philly's historic neighborhoods and are experienced with narrow doorways, steep stairs, and other challenges of older homes.",
        },
        {
          question: "Do you inspect items for college students?",
          answer:
            "Yes! We offer student discounts and work with students from Penn, Drexel, Temple, and other local universities. We understand student budgets and timelines.",
        },
        {
          question: "What areas outside the city do you cover?",
          answer:
            "We serve the greater Philadelphia region including Main Line suburbs, South Jersey, and Delaware County - roughly 30 miles from Center City.",
        },
      ],
    },
    "san-antonio-tx": {
      name: "San Antonio",
      state: "TX",
      emoji: "🌶️",
      population: "1.5 million",
      avgHomePrice: "$285,000",
      marketplaceVolume: "510K listings/month",
      neighborhoods: [
        "Downtown",
        "Alamo Heights",
        "Stone Oak",
        "The Dominion",
        "Southtown",
        "Terrell Hills",
        "Medical Center",
        "Leon Valley",
      ],
      testimonials: [
        {
          name: "Maria Sanchez",
          location: "Southtown, TX",
          rating: 5,
          text: "San Antonio is more spread out than people realize. Dibby picked up a bedroom set from Stone Oak and delivered it to me in Southtown. Everything arrived in perfect condition!",
          service: "Delivery",
        },
        {
          name: "John Martinez",
          location: "Alamo Heights, TX",
          rating: 5,
          text: "I'm military at Fort Sam Houston and needed furniture fast. Dibby handled multiple pickups in one day and delivered everything to my house. Incredibly efficient and professional!",
          service: "Full Service",
        },
        {
          name: "Rebecca Turner",
          location: "Stone Oak, TX",
          rating: 5,
          text: "Bought a piano from someone near the Medical Center. Dibby's inspection ensured it was in good condition, and they have the right equipment to transport it safely. Very impressed!",
          service: "Inspection + Delivery",
        },
      ],
      faqs: [
        {
          question: "Do you serve military families at the local bases?",
          answer:
            "Yes! We offer special rates for military families and regularly work with personnel from Fort Sam Houston, Lackland AFB, and Randolph AFB.",
        },
        {
          question: "How far outside San Antonio do you travel?",
          answer:
            "We cover the entire San Antonio metro area plus surrounding communities like New Braunfels, Boerne, and Seguin - approximately 40 miles from downtown.",
        },
        {
          question: "Can you handle large items like furniture and appliances?",
          answer:
            "Absolutely! We specialize in large item transport including furniture, appliances, exercise equipment, and more. Our vehicles and team are equipped for heavy items.",
        },
        {
          question: "Do you operate during Fiesta or other major events?",
          answer:
            "Yes! We operate year-round including during Fiesta and other events, though we may adjust routes to avoid parade areas and heavy traffic.",
        },
        {
          question: "What's your pricing for San Antonio?",
          answer:
            "Prices start at $45 for small items. Most deliveries within the metro area range from $65-$119 depending on distance and size. Use our calculator for exact quotes.",
        },
      ],
    },
    "san-diego-ca": {
      name: "San Diego",
      state: "CA",
      emoji: "🏖️",
      population: "1.4 million",
      avgHomePrice: "$875,000",
      marketplaceVolume: "490K listings/month",
      neighborhoods: [
        "Downtown",
        "La Jolla",
        "Pacific Beach",
        "North Park",
        "Hillcrest",
        "Mission Valley",
        "Coronado",
        "Gaslamp Quarter",
      ],
      testimonials: [
        {
          name: "surflocal Brandon",
          location: "Pacific Beach, CA",
          rating: 5,
          text: "San Diego traffic is getting worse every year. Dibby picked up a surfboard rack from La Jolla and brought it to PB. They know the area well and timing was perfect!",
          service: "Delivery",
        },
        {
          name: "Dr. Elena Rodriguez",
          location: "La Jolla, CA",
          rating: 5,
          text: "I'm a physician with no free time. Dibby has furnished my entire condo with Facebook Marketplace finds. Their inspection service ensures quality, and delivery is always punctual.",
          service: "Full Service",
        },
        {
          name: "Tyler Morrison",
          location: "North Park, CA",
          rating: 5,
          text: "Bought vintage furniture from someone in Coronado. Dibby inspected each piece, sent me detailed photos, and delivered everything safely. They even helped me arrange it. Amazing!",
          service: "Inspection + Delivery",
        },
      ],
      faqs: [
        {
          question: "Do you serve all San Diego neighborhoods?",
          answer:
            "Yes! We cover San Diego proper plus surrounding areas like Carlsbad, Chula Vista, El Cajon, and communities throughout San Diego County.",
        },
        {
          question: "Can you handle beach and outdoor equipment?",
          answer:
            "Absolutely! San Diego has a huge market for surfboards, bikes, paddleboards, and outdoor gear. We specialize in inspecting and transporting these items.",
        },
        {
          question: "Do you deliver to Coronado Island?",
          answer:
            "Yes! We regularly make deliveries to Coronado. Bridge tolls are included in standard pricing.",
        },
        {
          question: "How do you handle San Diego's hills and narrow streets?",
          answer:
            "Our team knows San Diego well, including challenging areas like some La Jolla and Hillcrest neighborhoods. We plan routes carefully and have experience navigating tight spaces.",
        },
        {
          question: "What's the typical delivery timeframe?",
          answer:
            "Most deliveries are completed within 24-48 hours. Same-day service is available for urgent requests, subject to availability.",
        },
      ],
    },
    "dallas-tx": {
      name: "Dallas",
      state: "TX",
      emoji: "🏙️",
      population: "1.3 million",
      avgHomePrice: "$385,000",
      marketplaceVolume: "470K listings/month",
      neighborhoods: [
        "Downtown Dallas",
        "Uptown",
        "Deep Ellum",
        "Bishop Arts",
        "Highland Park",
        "Oak Lawn",
        "Lakewood",
        "Preston Hollow",
      ],
      testimonials: [
        {
          name: "Morgan Stewart",
          location: "Uptown, TX",
          rating: 5,
          text: "Dallas sprawl is real. I found a perfect mid-century credenza in Plano, but it was 30 miles away. Dibby handled everything and the price was totally reasonable. Will use again!",
          service: "Delivery",
        },
        {
          name: "Antonio Flores",
          location: "Oak Lawn, TX",
          rating: 5,
          text: "I'm furnishing a new condo and Dibby has been invaluable. They've done 4 pickups for me, each time providing detailed inspections and professional delivery. Highly recommend!",
          service: "Full Service",
        },
        {
          name: "Samantha White",
          location: "Bishop Arts, TX",
          rating: 5,
          text: "Bought designer furniture from someone in Highland Park. Dibby authenticated the pieces, checked for damage, and delivered everything wrapped and protected. Worth every penny!",
          service: "Inspection + Delivery",
        },
      ],
      faqs: [
        {
          question: "Do you cover the entire Dallas-Fort Worth metroplex?",
          answer:
            "We cover Dallas proper and surrounding areas. For Fort Worth and distant suburbs, please use our calculator to check availability and pricing.",
        },
        {
          question: "Can you handle luxury items and designer furniture?",
          answer:
            "Absolutely! We have experience with high-end items and can coordinate with third-party authenticators if needed. We treat every item with care.",
        },
        {
          question: "How do you deal with Dallas traffic?",
          answer:
            "We use real-time traffic data and local knowledge to optimize routes. We provide realistic delivery windows and always communicate about any delays.",
        },
        {
          question: "Do you serve suburbs like Plano, Frisco, and McKinney?",
          answer:
            "Yes! We cover the northern suburbs including Plano, Frisco, McKinney, and Allen. Distance-based pricing applies.",
        },
        {
          question: "What's your weekend availability?",
          answer:
            "We operate 7 days a week including weekends. Saturday and Sunday are popular days for pickups and deliveries.",
        },
      ],
    },
    "san-jose-ca": {
      name: "San Jose",
      state: "CA",
      emoji: "💻",
      population: "1.0 million",
      avgHomePrice: "$1.15M",
      marketplaceVolume: "380K listings/month",
      neighborhoods: [
        "Downtown San Jose",
        "Willow Glen",
        "Rose Garden",
        "Almaden Valley",
        "Evergreen",
        "Cambrian Park",
        "Silver Creek",
        "Berryessa",
      ],
      testimonials: [
        {
          name: "Priya Patel",
          location: "Willow Glen, CA",
          rating: 5,
          text: "Silicon Valley traffic is brutal. Dibby saved me hours when I bought office furniture from someone in Fremont. They even helped me negotiate down $200. Professional and efficient!",
          service: "Full Service",
        },
        {
          name: "Alex Kim",
          location: "Downtown San Jose, CA",
          rating: 5,
          text: "I'm a software engineer with zero free time. Dibby has handled all my marketplace purchases - from a standing desk to a home gym setup. Their tech background shows in their attention to detail.",
          service: "Inspection + Delivery",
        },
        {
          name: "Jennifer Wong",
          location: "Almaden Valley, CA",
          rating: 5,
          text: "Bought a dining set from someone in Santa Clara. Dibby inspected every piece, took measurements to ensure it would fit my dining room, and delivered on schedule. Excellent service!",
          service: "Delivery",
        },
      ],
      faqs: [
        {
          question: "Do you serve the entire South Bay / Silicon Valley?",
          answer:
            "Yes! We cover San Jose, Santa Clara, Sunnyvale, Cupertino, Mountain View, Palo Alto, and surrounding communities throughout the South Bay.",
        },
        {
          question: "Can you inspect electronics and tech items?",
          answer:
            "Absolutely! Given Silicon Valley's tech focus, we have extensive experience with electronics, computer equipment, and smart home devices.",
        },
        {
          question: "How do you handle Bay Area traffic?",
          answer:
            "We schedule pickups and deliveries around peak traffic times when possible and use real-time traffic data to optimize routes. We're always communicative about timing.",
        },
        {
          question: "Do you offer services for tech company employees?",
          answer:
            "Yes! Many of our customers work in tech. We understand busy schedules and offer flexible delivery windows, including evenings and weekends.",
        },
        {
          question: "What's your pricing for the South Bay?",
          answer:
            "Prices start at $55 for small items. Given the Bay Area's higher costs, our rates are competitive while maintaining quality service. Use our calculator for exact quotes.",
        },
      ],
    },
  };

  // ---------------------------------------------------------------------------
  // CityPage Component - Individual landing page for each city
  // ---------------------------------------------------------------------------
  interface CityPageProps {
    citySlug: string;
  }

  const CityPage: React.FC<CityPageProps> = ({ citySlug }) => {
    const { isMobile } = useResponsive();
    const cityData = CITY_DATA[citySlug as keyof typeof CITY_DATA];

    if (!cityData) {
      return (
        <div style={{ padding: "80px 20px", textAlign: "center" }}>
          <h1>City Not Found</h1>
          <p>The city you're looking for doesn't exist in our service area.</p>
        </div>
      );
    }

    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#FFF8F5" }}>
        <SEOHead
          title={`Marketplace Delivery & Inspection in ${cityData.name}, ${cityData.state} | Dibby`}
          description={`Professional marketplace item pickup, inspection, and delivery service in ${
            cityData.name
          }, ${cityData.state}. Serving ${cityData.neighborhoods
            .slice(0, 3)
            .join(", ")} and more. $1M insured. 4.9★ rating.`}
          canonical={`/cities/${citySlug}`}
          breadcrumbs={[
            { name: "Service Areas", url: "/service-areas" },
            {
              name: `${cityData.name}, ${cityData.state}`,
              url: `/cities/${citySlug}`,
            },
          ]}
          schema="LocalBusiness"
        />

        <Breadcrumb
          items={[
            { name: "Service Areas", url: "/service-areas" },
            {
              name: `${cityData.name}, ${cityData.state}`,
              url: `/cities/${citySlug}`,
            },
          ]}
        />

        {/* Hero Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #FFB84D 0%, #FF9F1C 100%)",
            padding: isMobile ? "60px 20px" : "100px 32px",
            textAlign: "center",
            color: "#FFFFFF",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                fontSize: isMobile ? "48px" : "72px",
                marginBottom: "16px",
              }}
            >
              {cityData.emoji}
            </div>
            <h1
              style={{
                fontSize: isMobile ? "36px" : "56px",
                fontWeight: 800,
                letterSpacing: "-1.5px",
                marginBottom: "24px",
                lineHeight: 1.1,
              }}
            >
              Marketplace Delivery
              <br />
              in {cityData.name}
            </h1>
            <p
              style={{
                fontSize: isMobile ? "18px" : "22px",
                marginBottom: "32px",
                opacity: 0.95,
                maxWidth: "700px",
                margin: "0 auto 32px",
                lineHeight: 1.6,
              }}
            >
              Professional pickup, inspection, and delivery for Facebook
              Marketplace, Craigslist, and OfferUp items. Serving all of{" "}
              {cityData.name} and surrounding areas.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: "16px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* PRIMARY CTA: Browse Marketplace */}
              <button
                onClick={() => {
                  // Extract city name from citySlug (e.g., "phoenix-az" -> "Phoenix")
                  const cityName = citySlug.split("-").slice(0, -1).join(" ");
                  const stateName = citySlug
                    .split("-")
                    .slice(-1)[0]
                    .toUpperCase();

                  // Set the location in marketplace
                  setSearchLocation({
                    latitude: "", // You can leave empty or geocode if needed
                    longitude: "",
                    radius: "40",
                    name: `${
                      cityName.charAt(0).toUpperCase() + cityName.slice(1)
                    }, ${stateName}`,
                  });

                  setActiveView("browse");
                  setCurrentPage("marketplace");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#FFB84D",
                  border: "none",
                  padding: isMobile ? "18px 40px" : "20px 56px",
                  fontSize: isMobile ? "17px" : "19px",
                  fontWeight: 700,
                  borderRadius: "14px",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  width: isMobile ? "100%" : "auto",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(0,0,0,0.2)";
                }}
              >
                🛍️ Browse {cityData.name} Marketplace
              </button>

              {/* SECONDARY CTA: Get Quote */}
              <button
                onClick={() => {
                  setCurrentPage("calculator");
                  setActiveView("landing");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  backgroundColor: "transparent",
                  color: "#FFFFFF",
                  border: "3px solid #FFFFFF",
                  padding: isMobile ? "16px 40px" : "18px 48px",
                  fontSize: isMobile ? "16px" : "18px",
                  fontWeight: 700,
                  borderRadius: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  width: isMobile ? "100%" : "auto",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.15)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Get Instant Quote
              </button>
            </div>
          </div>
        </div>

        {/* Service Overview */}
        <div style={{ padding: isMobile ? "60px 20px" : "80px 32px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: isMobile ? "28px" : "36px",
                fontWeight: 700,
                color: "#5A5A5A",
                textAlign: "center",
                marginBottom: "48px",
              }}
            >
              Our Services in {cityData.name}
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
                gap: "24px",
              }}
            >
              {[
                {
                  icon: "🔍",
                  title: "Inspection",
                  description: "Detailed condition reports with HD photos",
                },
                {
                  icon: "🚚",
                  title: "Delivery",
                  description: "Safe transport from seller to your door",
                },
                {
                  icon: "✨",
                  title: "Full Service",
                  description: "Inspection + pickup + delivery all-in-one",
                },
                {
                  icon: "🏠",
                  title: "Property Tours",
                  description: "Virtual walkthroughs for rentals",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#FFFFFF",
                    padding: "32px 24px",
                    borderRadius: "16px",
                    textAlign: "center",
                    border: "2px solid #FFE5DB",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(255,184,77,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                    {service.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#5A5A5A",
                      marginBottom: "8px",
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "#8A8A8A",
                      lineHeight: 1.6,
                    }}
                  >
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Neighborhoods Served */}
        <div
          style={{
            padding: isMobile ? "60px 20px" : "80px 32px",
            backgroundColor: "#FFFFFF",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: isMobile ? "28px" : "36px",
                fontWeight: 700,
                color: "#5A5A5A",
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              Neighborhoods We Serve
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#8A8A8A",
                textAlign: "center",
                marginBottom: "48px",
                maxWidth: "600px",
                margin: "0 auto 48px",
              }}
            >
              We provide service throughout {cityData.name} and surrounding
              areas
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "repeat(2, 1fr)"
                  : "repeat(4, 1fr)",
                gap: "16px",
              }}
            >
              {cityData.neighborhoods.map((neighborhood, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#FFF8F5",
                    padding: "20px",
                    borderRadius: "12px",
                    textAlign: "center",
                    border: "1px solid #FFE5DB",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#5A5A5A",
                  }}
                >
                  {neighborhood}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Local Stats */}
        <div style={{ padding: isMobile ? "60px 20px" : "80px 32px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: isMobile ? "28px" : "36px",
                fontWeight: 700,
                color: "#5A5A5A",
                textAlign: "center",
                marginBottom: "48px",
              }}
            >
              {cityData.name} Marketplace Stats
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                gap: "32px",
              }}
            >
              {[
                {
                  label: "Population",
                  value: cityData.population,
                  icon: "👥",
                },
                {
                  label: "Avg Home Price",
                  value: cityData.avgHomePrice,
                  icon: "🏠",
                },
                {
                  label: "Monthly Listings",
                  value: cityData.marketplaceVolume,
                  icon: "📦",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#FFFFFF",
                    padding: "40px 24px",
                    borderRadius: "16px",
                    textAlign: "center",
                    border: "2px solid #FFE5DB",
                  }}
                >
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                    {stat.icon}
                  </div>
                  <div
                    style={{
                      fontSize: isMobile ? "32px" : "40px",
                      fontWeight: 800,
                      color: "#FFB84D",
                      marginBottom: "8px",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "16px", color: "#8A8A8A" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Local Testimonials */}
        <div
          style={{
            padding: isMobile ? "60px 20px" : "80px 32px",
            backgroundColor: "#FFFFFF",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: isMobile ? "28px" : "36px",
                fontWeight: 700,
                color: "#5A5A5A",
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              What {cityData.name} Customers Say
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#8A8A8A",
                textAlign: "center",
                marginBottom: "48px",
              }}
            >
              Real reviews from real customers in your area
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                gap: "24px",
              }}
            >
              {cityData.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#FFF8F5",
                    padding: "32px",
                    borderRadius: "16px",
                    border: "1px solid #FFE5DB",
                  }}
                >
                  {/* Star Rating */}
                  <div style={{ marginBottom: "16px" }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span
                        key={i}
                        style={{ color: "#FFB84D", fontSize: "20px" }}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p
                    style={{
                      fontSize: "15px",
                      color: "#5A5A5A",
                      lineHeight: 1.7,
                      marginBottom: "20px",
                      fontStyle: "italic",
                    }}
                  >
                    "{testimonial.text}"
                  </p>

                  {/* Author Info */}
                  <div>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#5A5A5A",
                        marginBottom: "4px",
                      }}
                    >
                      {testimonial.name}
                    </div>
                    <div style={{ fontSize: "14px", color: "#8A8A8A" }}>
                      {testimonial.location}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#FFB84D",
                        fontWeight: 600,
                        marginTop: "8px",
                      }}
                    >
                      {testimonial.service}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Local FAQ */}
        <div style={{ padding: isMobile ? "60px 20px" : "80px 32px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: isMobile ? "28px" : "36px",
                fontWeight: 700,
                color: "#5A5A5A",
                textAlign: "center",
                marginBottom: "48px",
              }}
            >
              Frequently Asked Questions
            </h2>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {cityData.faqs.map((faq, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#FFFFFF",
                    padding: "32px",
                    borderRadius: "16px",
                    border: "2px solid #FFE5DB",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#5A5A5A",
                      marginBottom: "12px",
                    }}
                  >
                    {faq.question}
                  </h3>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "#8A8A8A",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #FFB84D 0%, #FF9F1C 100%)",
            padding: isMobile ? "60px 20px" : "80px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: isMobile ? "32px" : "42px",
                fontWeight: 800,
                color: "#FFFFFF",
                marginBottom: "20px",
                lineHeight: 1.2,
              }}
            >
              Ready to Get Started in {cityData.name}?
            </h2>
            <p
              style={{
                fontSize: isMobile ? "18px" : "20px",
                color: "#FFFFFF",
                opacity: 0.95,
                marginBottom: "32px",
                lineHeight: 1.6,
              }}
            >
              Get an instant quote for your marketplace pickup, inspection, or
              delivery. Most services completed within 24-48 hours.
            </p>
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: "16px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* PRIMARY CTA: Browse Marketplace */}
                <button
                  onClick={() => {
                    window.history.pushState(
                      {},
                      "",
                      `/marketplace/${citySlug}`
                    );
                    window.dispatchEvent(new Event("popstate"));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#FFB84D",
                    border: "none",
                    padding: isMobile ? "18px 40px" : "20px 56px",
                    fontSize: isMobile ? "17px" : "19px",
                    fontWeight: 700,
                    borderRadius: "14px",
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                    width: isMobile ? "100%" : "auto",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(0,0,0,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(0,0,0,0.2)";
                  }}
                >
                  🛍️ Browse {cityData.name} Marketplace
                </button>

                {/* SECONDARY CTA: Get Quote */}
                <button
                  onClick={() => {
                    setCurrentPage("calculator");
                    setActiveView("landing");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  style={{
                    backgroundColor: "transparent",
                    color: "#FFFFFF",
                    border: "3px solid #FFFFFF",
                    padding: isMobile ? "16px 40px" : "18px 48px",
                    fontSize: isMobile ? "16px" : "18px",
                    fontWeight: 700,
                    borderRadius: "14px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    width: isMobile ? "100%" : "auto",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255,255,255,0.15)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Get Instant Quote
                </button>
              </div>
              <button
                onClick={() => {
                  setCurrentPage("contact");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  backgroundColor: "transparent",
                  color: "#FFFFFF",
                  border: "2px solid #FFFFFF",
                  padding: isMobile ? "16px 32px" : "18px 48px",
                  fontSize: isMobile ? "16px" : "18px",
                  fontWeight: 700,
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-2px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>

        <BackToTopButton />
      </div>
    );
  };

  // ============================================================================
  // 🏙️ CHUNK A: CITY-SPECIFIC LANDING PAGES - END
  // ============================================================================

  // ============================================
  // FOOTER COMPONENT - COMPLETE
  // ============================================
  const Footer: React.FC = () => {
    const { isMobile } = useResponsive();

    return (
      <footer
        style={{
          backgroundColor: "#5A5A5A",
          color: "white",
          padding: isMobile ? "60px 20px 32px" : "80px 32px 40px",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
              gap: isMobile ? "48px" : "60px",
              marginBottom: isMobile ? "48px" : "60px",
            }}
          >
            {/* Column 1: Dibby Logo & Social */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "24px",
                }}
              >
                <DibbyLogo size={36} fillColor="white" strokeColor="#5A5A5A" />
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: "800",
                    letterSpacing: "-0.5px",
                  }}
                >
                  Dibby
                </span>
              </div>
              <p
                style={{
                  fontSize: "15px",
                  color: "#BFBFBF",
                  lineHeight: "1.7",
                  marginBottom: "24px",
                }}
              >
                We inspect and deliver any marketplace listing. Safe, insured,
                and hassle-free.
              </p>
              <div style={{ display: "flex", gap: "16px" }}>
                {["📘", "🐦", "📷", "💼"].map((icon, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "18px",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255, 184, 77, 0.2)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Services */}
            <div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  marginBottom: "20px",
                  color: "white",
                }}
              >
                Services
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  { label: "Property Tours", page: "how-it-works" },
                  { label: "Item Inspection", page: "how-it-works" },
                  { label: "Pickup & Delivery", page: "how-it-works" },
                  { label: "Pricing Calculator", page: "calculator" },
                  { label: "Full Service Package", page: "calculator" },
                ].map((item, idx) => (
                  <li key={idx} style={{ marginBottom: "12px" }}>
                    <span
                      onClick={() => {
                        setCurrentPage(item.page);
                        setActiveView("landing");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      style={{
                        fontSize: "15px",
                        color: "#BFBFBF",
                        cursor: "pointer",
                        transition: "color 0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#FFB84D")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#BFBFBF")
                      }
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Column 3: Company */}
            <div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  marginBottom: "20px",
                  color: "white",
                }}
              >
                Company
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  { label: "About Us", page: "about" },
                  { label: "How It Works", page: "how-it-works" },
                  { label: "Blog", page: "blog" },
                  { label: "Service Areas", page: "service-areas" },
                  { label: "Sitemap", page: "sitemap" },
                  { label: "FAQ", page: "faq" },
                  { label: "Contact Us", page: "contact" },
                ].map((item, idx) => (
                  <li key={idx} style={{ marginBottom: "12px" }}>
                    <span
                      onClick={() => {
                        setCurrentPage(item.page);
                        setActiveView("landing");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      style={{
                        fontSize: "15px",
                        color: "#BFBFBF",
                        cursor: "pointer",
                        transition: "color 0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#FFB84D")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#BFBFBF")
                      }
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Legal & Contact */}
            <div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  marginBottom: "20px",
                  color: "white",
                }}
              >
                Legal
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  marginBottom: "32px",
                }}
              >
                {[
                  { label: "Privacy Policy", page: "privacy" },
                  { label: "Terms of Service", page: "terms" },
                  { label: "Insurance", page: "insurance" },
                ].map((item, idx) => (
                  <li key={idx} style={{ marginBottom: "12px" }}>
                    <span
                      onClick={() => {
                        setCurrentPage(item.page);
                        setActiveView("landing");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      style={{
                        fontSize: "15px",
                        color: "#BFBFBF",
                        cursor: "pointer",
                        transition: "color 0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#FFB84D")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#BFBFBF")
                      }
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>

              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  marginBottom: "20px",
                  color: "white",
                }}
              >
                Contact
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  fontSize: "15px",
                  color: "#BFBFBF",
                  lineHeight: "1.8",
                }}
              >
                <li style={{ marginBottom: "12px" }}>📧 support@dibby.com</li>
                <li style={{ marginBottom: "12px" }}>📞 1-800-DIBBY-00</li>
                <li style={{ marginBottom: "12px" }}>📍 San Francisco, CA</li>
                <li>⏰ 24/7 Support</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: "32px",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              gap: "20px",
              fontSize: "14px",
              color: "#BFBFBF",
            }}
          >
            <div>
              © 2025 Dibby, Inc. All rights reserved. | $1M Insurance Coverage
            </div>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              <span
                onClick={() => {
                  setCurrentPage("privacy");
                  setActiveView("landing");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{ cursor: "pointer" }}
              >
                Privacy Policy
              </span>
              <span
                onClick={() => {
                  setCurrentPage("terms");
                  setActiveView("landing");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{ cursor: "pointer" }}
              >
                Terms of Service
              </span>
              <span style={{ cursor: "pointer" }}>Cookie Policy</span>
            </div>
          </div>

          {/* NEW COLUMN - Cities */}
          <div>
            <h4
              style={{
                fontSize: "16px",
                fontWeight: 700,
                marginBottom: "20px",
                color: "#FFFFFF",
              }}
            >
              Cities We Serve
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                fontSize: "14px",
              }}
            >
              <span
                onClick={() => {
                  setCurrentPage("cities/new-york-ny");
                  setActiveView("landing");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  cursor: "pointer",
                  opacity: 0.8,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
              >
                New York, NY
              </span>

              <span
                onClick={() => {
                  setCurrentPage("cities/los-angeles-ca");
                  setActiveView("landing");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  cursor: "pointer",
                  opacity: 0.8,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
              >
                Los Angeles, CA
              </span>

              <span
                onClick={() => {
                  setCurrentPage("cities/chicago-il");
                  setActiveView("landing");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  cursor: "pointer",
                  opacity: 0.8,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
              >
                Chicago, IL
              </span>

              <span
                onClick={() => {
                  setCurrentPage("cities/houston-tx");
                  setActiveView("landing");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  cursor: "pointer",
                  opacity: 0.8,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
              >
                Houston, TX
              </span>

              <span
                onClick={() => {
                  setCurrentPage("cities/phoenix-az");
                  setActiveView("landing");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  cursor: "pointer",
                  opacity: 0.8,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
              >
                Phoenix, AZ
              </span>

              <span
                onClick={() => {
                  setCurrentPage("cities/philadelphia-pa");
                  setActiveView("landing");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  cursor: "pointer",
                  opacity: 0.8,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
              >
                Philadelphia, PA
              </span>

              <span
                onClick={() => {
                  setCurrentPage("cities/san-antonio-tx");
                  setActiveView("landing");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  cursor: "pointer",
                  opacity: 0.8,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
              >
                San Antonio, TX
              </span>

              <span
                onClick={() => {
                  setCurrentPage("cities/san-diego-ca");
                  setActiveView("landing");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  cursor: "pointer",
                  opacity: 0.8,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
              >
                San Diego, CA
              </span>

              <span
                onClick={() => {
                  setCurrentPage("cities/dallas-tx");
                  setActiveView("landing");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  cursor: "pointer",
                  opacity: 0.8,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
              >
                Dallas, TX
              </span>

              <span
                onClick={() => {
                  setCurrentPage("cities/san-jose-ca");
                  setActiveView("landing");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  cursor: "pointer",
                  opacity: 0.8,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
              >
                San Jose, CA
              </span>

              <span
                onClick={() => {
                  setCurrentPage("service-areas");
                  setActiveView("landing");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  cursor: "pointer",
                  opacity: 0.8,
                  transition: "opacity 0.2s",
                  color: "#FFB84D",
                  fontWeight: 600,
                  marginTop: "8px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
              >
                View All Cities →
              </span>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  // ============================================
  // HOME PAGE COMPONENT - COMPLETE WITH ALL SECTIONS
  // ============================================
  const HomePage = () => (
    <div>
      {/* HERO SECTION */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #FFF9E6 0%, #FFE5F8 35%, #E5F8FF 70%, #F0FFE5 100%)",
          padding: isMobile ? "60px 20px 80px" : "100px 32px 120px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {!isMobile && (
          <>
            <div
              style={{
                position: "absolute",
                top: "10%",
                right: "5%",
                opacity: 0.08,
              }}
            >
              <DibbyLogo size={200} />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "15%",
                left: "8%",
                opacity: 0.08,
              }}
            >
              <DibbyLogo size={150} />
            </div>
          </>
        )}

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "inline-block",
              backgroundColor: "rgba(255, 184, 77, 0.15)",
              padding: isMobile ? "8px 20px" : "10px 24px",
              borderRadius: "50px",
              marginBottom: isMobile ? "24px" : "28px",
              border: "2px solid rgba(255, 184, 77, 0.3)",
            }}
          >
            <span
              style={{
                fontSize: isMobile ? "13px" : "15px",
                fontWeight: "600",
                color: "#FFB84D",
                letterSpacing: "0.5px",
              }}
            >
              🎉 WE TOUR & DELIVER ANY LISTING — STARTING AT $49
            </span>
          </div>

          <h1
            style={{
              fontSize: isMobile ? "36px" : "64px",
              fontWeight: "800",
              color: "#5A5A5A",
              marginBottom: isMobile ? "20px" : "28px",
              lineHeight: "1.1",
              letterSpacing: "-1.5px",
            }}
          >
            We Tour Properties & Deliver Items
            <br />
            <span style={{ color: "#FFB84D" }}>From Any Marketplace</span>
          </h1>

          <p
            style={{
              fontSize: isMobile ? "18px" : "22px",
              color: "#7A7A7A",
              lineHeight: "1.6",
              maxWidth: "850px",
              margin: "0 auto 48px",
            }}
          >
            Found something on Facebook Marketplace, Craigslist, or OfferUp?
            <br />
            <strong style={{ color: "#5A5A5A" }}>
              Send us the link — we'll inspect it and deliver it to your door.
            </strong>
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "center",
              gap: "20px",
              marginBottom: isMobile ? "40px" : "56px",
            }}
          >
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                padding: isMobile ? "18px 36px" : "20px 44px",
                backgroundColor: "#FFB84D",
                border: "none",
                borderRadius: "20px",
                fontSize: "18px",
                fontWeight: "700",
                color: "white",
                cursor: "pointer",
                boxShadow: "0 8px 28px rgba(255, 184, 77, 0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(255, 184, 77, 0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 28px rgba(255, 184, 77, 0.35)";
              }}
            >
              <Package size={22} />
              Submit Any Listing →
            </button>
            <button
              onClick={() => {
                setActiveView("browse");
                if (rawResults.length === 0 && !selectedCategory) {
                  const defaultCategory = CATEGORIES.find(
                    (c) => c.id === "furniture"
                  );
                  if (defaultCategory) {
                    setTimeout(() => handleCategoryClick(defaultCategory), 100);
                  }
                }
              }}
              style={{
                padding: isMobile ? "18px 36px" : "20px 44px",
                backgroundColor: "white",
                border: "3px solid #FFB84D",
                borderRadius: "20px",
                fontSize: "18px",
                fontWeight: "700",
                color: "#5A5A5A",
                cursor: "pointer",
                boxShadow: "0 8px 28px rgba(255, 184, 77, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              <Search size={22} />
              Browse Marketplace
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: isMobile ? "24px" : "48px",
              color: "#7A7A7A",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: isMobile ? "flex-start" : "center",
              }}
            >
              <Camera size={22} color="#D4BFEA" />
              <span>Photo & Video Inspection</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: isMobile ? "flex-start" : "center",
              }}
            >
              <Truck size={22} color="#B8E6D5" />
              <span>Professional Delivery</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: isMobile ? "flex-start" : "center",
              }}
            >
              <Shield size={22} color="#FFD4A0" />
              <span>$1M Insured</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section
        id="how-it-works"
        style={{
          padding: isMobile ? "80px 20px" : "120px 32px",
          backgroundColor: "white",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: isMobile ? "60px" : "80px",
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? "36px" : "52px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "20px",
                letterSpacing: "-1px",
              }}
            >
              Simple as{" "}
              <span style={{ color: "#FFB84D" }}>Copy, Paste, Done</span>
            </h2>
            <p
              style={{
                fontSize: isMobile ? "18px" : "21px",
                color: "#8A8A8A",
                maxWidth: "680px",
                margin: "0 auto",
                lineHeight: "1.7",
              }}
            >
              Stop coordinating with strangers. We handle everything from
              inspection to delivery.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: "40px",
              marginBottom: isMobile ? "60px" : "100px",
            }}
          >
            {[
              {
                icon: "📋",
                title: "1. Paste the Link",
                description:
                  "Found something on Facebook, Craigslist, or OfferUp? Just paste the listing URL into Dibby.",
                color: "#FFE5DB",
              },
              {
                icon: "📸",
                title: "2. We Inspect It",
                description:
                  "Our inspector visits the location, takes photos/video, and verifies condition before you buy.",
                color: "#F0E5F5",
              },
              {
                icon: "🚚",
                title: "3. Delivered to You",
                description:
                  "We pick it up and deliver it safely to your door. Fully insured with tracking.",
                color: "#E0F5ED",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#FFF8F5",
                  padding: isMobile ? "36px 28px" : "48px 40px",
                  borderRadius: "32px",
                  textAlign: "center",
                  boxShadow: "0 8px 32px rgba(255, 180, 162, 0.12)",
                  border: `3px solid ${step.color}`,
                }}
              >
                <div
                  style={{
                    width: isMobile ? "80px" : "100px",
                    height: isMobile ? "80px" : "100px",
                    borderRadius: "50%",
                    background:
                      idx === 0
                        ? "linear-gradient(135deg, #FFE5C0 0%, #FFB84D 100%)"
                        : idx === 1
                        ? "linear-gradient(135deg, #E8D5F2 0%, #D4BFEA 100%)"
                        : "linear-gradient(135deg, #D4F1E8 0%, #B8E6D5 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 32px",
                    fontSize: isMobile ? "40px" : "48px",
                    boxShadow:
                      idx === 0
                        ? "0 12px 32px rgba(255, 184, 77, 0.3)"
                        : idx === 1
                        ? "0 12px 32px rgba(212, 191, 234, 0.3)"
                        : "0 12px 32px rgba(184, 230, 213, 0.3)",
                  }}
                >
                  {step.icon}
                </div>
                <h3
                  style={{
                    fontSize: isMobile ? "22px" : "28px",
                    fontWeight: "700",
                    color: "#5A5A5A",
                    marginBottom: "18px",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: isMobile ? "16px" : "17px",
                    color: "#8A8A8A",
                    lineHeight: "1.7",
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* BIG VALUE PROP */}
          <div
            style={{
              background: "linear-gradient(135deg, #FFB84D 0%, #FFD4A0 100%)",
              borderRadius: isMobile ? "32px" : "48px",
              padding: isMobile ? "60px 32px" : "80px 60px",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(255, 184, 77, 0.3)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {!isMobile && (
              <div
                style={{
                  position: "absolute",
                  top: "-50px",
                  right: "-50px",
                  opacity: 0.1,
                }}
              >
                <DibbyLogo size={300} fillColor="white" strokeColor="white" />
              </div>
            )}

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  fontSize: isMobile ? "48px" : "72px",
                  fontWeight: "900",
                  color: "white",
                  marginBottom: "24px",
                  textShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  letterSpacing: "-2px",
                }}
              >
                STARTING AT $49
              </div>
              <p
                style={{
                  fontSize: isMobile ? "20px" : "26px",
                  color: "white",
                  fontWeight: "600",
                  marginBottom: "40px",
                  textShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  maxWidth: "800px",
                  margin: "0 auto 40px",
                  lineHeight: "1.5",
                }}
              >
                Professional inspection, safe delivery & $1M insurance
                <br />
                Whether it's a couch, apartment tour, or electronics
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "repeat(2, 1fr)"
                    : "repeat(4, 1fr)",
                  gap: "32px",
                  maxWidth: "1000px",
                  margin: "0 auto",
                }}
              >
                {[
                  { icon: "📦", label: "Furniture Delivery" },
                  { icon: "🏠", label: "Property Tours" },
                  { icon: "💻", label: "Electronics Check" },
                  { icon: "🚗", label: "Vehicle Inspection" },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div
                      style={{
                        fontSize: isMobile ? "40px" : "48px",
                        marginBottom: "12px",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div
                      style={{
                        fontSize: isMobile ? "14px" : "16px",
                        fontWeight: "600",
                        color: "white",
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setIsDibbyModalOpen(true);
                }}
                style={{
                  marginTop: "48px",
                  padding: isMobile ? "18px 40px" : "22px 56px",
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "20px",
                  fontSize: isMobile ? "18px" : "20px",
                  fontWeight: "700",
                  color: "#FFB84D",
                  cursor: "pointer",
                  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                }}
              >
                Submit a Listing Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section
        id="services"
        style={{
          padding: isMobile ? "80px 20px" : "120px 32px",
          background:
            "linear-gradient(135deg, #FFF9E6 0%, #FFE5F8 50%, #E5F8FF 100%)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: isMobile ? "60px" : "80px",
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? "36px" : "52px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "20px",
                letterSpacing: "-1px",
              }}
            >
              What We Do <span style={{ color: "#FFB84D" }}>For You</span>
            </h2>
            <p
              style={{
                fontSize: isMobile ? "18px" : "21px",
                color: "#8A8A8A",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: "1.7",
              }}
            >
              From inspecting apartments to delivering couches — we're your
              trusted helper for any marketplace find
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: "40px",
              marginBottom: isMobile ? "60px" : "80px",
            }}
          >
            {[
              {
                icon: "🏠",
                title: "Property Tours & Inspections",
                description:
                  "Can't visit in person? We'll tour apartments, houses, or commercial spaces for you. Get detailed photos, videos, and a written report covering cleanliness, damage, appliances, and more.",
                price: "From $49",
                color: "#B8E6D5",
                border: "#E0F5ED",
              },
              {
                icon: "🚚",
                title: "Item Pickup & Delivery",
                description:
                  "Found furniture, electronics, or anything else on a marketplace? We'll inspect the condition, pick it up from the seller, and deliver it safely to your door with $1M insurance.",
                price: "From $75",
                color: "#FFB84D",
                border: "#FFE5DB",
              },
              {
                icon: "📸",
                title: "Pre-Purchase Verification",
                description:
                  "Not sure if that 'like new' item is actually new? We'll verify the condition before you commit to buying. Photos, video, and honest assessment to help you decide.",
                price: "$49",
                color: "#D4BFEA",
                border: "#F0E5F5",
              },
              {
                icon: "🔧",
                title: "Full Service Package",
                description:
                  "Get the complete package: inspection, pickup, delivery, and $1M insurance. The easiest way to buy from any marketplace with complete peace of mind.",
                price: "$150",
                color: "#A8D5F5",
                border: "#E5F3FF",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "white",
                  borderRadius: "32px",
                  padding: isMobile ? "36px 28px" : "48px",
                  border: `3px solid ${service.border}`,
                  boxShadow: `0 12px 48px ${service.color}25`,
                }}
              >
                <div
                  style={{
                    width: isMobile ? "64px" : "80px",
                    height: isMobile ? "64px" : "80px",
                    borderRadius: "20px",
                    background: `linear-gradient(135deg, ${service.color}80 0%, ${service.color} 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: isMobile ? "32px" : "40px",
                    marginBottom: "28px",
                  }}
                >
                  {service.icon}
                </div>
                <h3
                  style={{
                    fontSize: isMobile ? "24px" : "28px",
                    fontWeight: "700",
                    color: "#5A5A5A",
                    marginBottom: "20px",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontSize: isMobile ? "16px" : "17px",
                    color: "#8A8A8A",
                    lineHeight: "1.8",
                    marginBottom: "24px",
                  }}
                >
                  {service.description}
                </p>
                <div
                  style={{
                    display: "inline-block",
                    padding: "12px 28px",
                    backgroundColor: service.border,
                    borderRadius: "50px",
                    fontSize: isMobile ? "18px" : "20px",
                    fontWeight: "700",
                    color: service.color,
                  }}
                >
                  {service.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* TESTIMONIALS SECTION */}
      <TestimonialsCarousel />

      {/* TESTIMONIALS SECTION */}
      <TestimonialsCarousel />

      {/* MEET OUR INSPECTORS SECTION - ADD THIS */}
      <section
        style={{
          padding: isMobile ? "80px 20px" : "120px 32px",
          backgroundColor: "white",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: isMobile ? "60px" : "80px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: "#E7F3FF",
                padding: "8px 20px",
                borderRadius: "50px",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#1876f2",
                  letterSpacing: "0.5px",
                }}
              >
                🛡️ BACKGROUND-CHECKED PROFESSIONALS
              </span>
            </div>
            <h2
              style={{
                fontSize: isMobile ? "36px" : "52px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "20px",
                letterSpacing: "-1px",
              }}
            >
              Meet Your <span style={{ color: "#FFB84D" }}>Inspectors</span>
            </h2>
            <p
              style={{
                fontSize: isMobile ? "18px" : "21px",
                color: "#8A8A8A",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: "1.7",
              }}
            >
              Real people, real expertise. Every inspector is
              background-checked, insured, and highly rated by customers like
              you.
            </p>
          </div>

          {/* Inspector Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "32px",
              marginBottom: "60px",
            }}
          >
            {INSPECTOR_PROFILES.slice(0, 6).map((inspector) => (
              <div
                key={inspector.id}
                style={{
                  backgroundColor: "#FFF8F5",
                  borderRadius: "20px",
                  padding: "32px",
                  border: "2px solid #FFE5DB",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 40px rgba(255, 184, 77, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Photo and Basic Info */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src={inspector.photo}
                    alt={inspector.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "3px solid #FFB84D",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#5A5A5A",
                        marginBottom: "4px",
                      }}
                    >
                      {inspector.name}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#8A8A8A",
                        marginBottom: "4px",
                      }}
                    >
                      📍 {inspector.location}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <span style={{ color: "#FFB84D", fontSize: "16px" }}>
                        ★
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#5A5A5A",
                        }}
                      >
                        {inspector.rating}
                      </span>
                      <span style={{ fontSize: "13px", color: "#8A8A8A" }}>
                        ({inspector.inspections.toLocaleString()} inspections)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Specialty */}
                <div
                  style={{
                    backgroundColor: "#E7F3FF",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#65676b",
                      marginBottom: "2px",
                    }}
                  >
                    SPECIALTY
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#1876f2",
                    }}
                  >
                    {inspector.specialty}
                  </div>
                </div>

                {/* Bio */}
                <p
                  style={{
                    fontSize: "14px",
                    color: "#5A5A5A",
                    lineHeight: "1.6",
                    marginBottom: "16px",
                    fontStyle: "italic",
                  }}
                >
                  "{inspector.bio}"
                </p>

                {/* Badges */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {inspector.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: "11px",
                        padding: "6px 12px",
                        backgroundColor: "white",
                        border: "1px solid #FFE5DB",
                        borderRadius: "12px",
                        color: "#FFB84D",
                        fontWeight: "600",
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Experience */}
                <div
                  style={{
                    marginTop: "16px",
                    paddingTop: "16px",
                    borderTop: "1px solid #FFE5DB",
                    fontSize: "13px",
                    color: "#8A8A8A",
                  }}
                >
                  ⏱️ {inspector.experience} experience
                </div>
              </div>
            ))}
          </div>

          {/* Trust Statement */}
          <div
            style={{
              textAlign: "center",
              padding: isMobile ? "32px 24px" : "40px",
              backgroundColor: "#E7F3FF",
              borderRadius: "20px",
              border: "2px solid #1876f2",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🛡️</div>
            <h3
              style={{
                fontSize: isMobile ? "24px" : "28px",
                fontWeight: "700",
                color: "#1876f2",
                marginBottom: "12px",
              }}
            >
              Every Inspector is Verified & Insured
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#0c63d4",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: "1.6",
              }}
            >
              Background checks ✓ Insurance coverage ✓ Customer reviews ✓
              <br />
              Your safety is our #1 priority.
            </p>
          </div>
        </div>
      </section>

      {/* SEE DIBBY IN ACTION - BEFORE/AFTER SECTION - ADD HERE */}
      <section
        style={{
          padding: isMobile ? "80px 20px" : "120px 32px",
          background:
            "linear-gradient(135deg, #FFF9E6 0%, #FFE5F8 50%, #E5F8FF 100%)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: isMobile ? "60px" : "80px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: "rgba(255, 184, 77, 0.15)",
                padding: "8px 20px",
                borderRadius: "50px",
                marginBottom: "20px",
                border: "2px solid rgba(255, 184, 77, 0.3)",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#FFB84D",
                  letterSpacing: "0.5px",
                }}
              >
                📸 REAL INSPECTIONS, REAL RESULTS
              </span>
            </div>
            <h2
              style={{
                fontSize: isMobile ? "36px" : "52px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "20px",
                letterSpacing: "-1px",
              }}
            >
              See <span style={{ color: "#FFB84D" }}>Dibby in Action</span>
            </h2>
            <p
              style={{
                fontSize: isMobile ? "18px" : "21px",
                color: "#8A8A8A",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: "1.7",
              }}
            >
              Real photos from real inspections. See how we've saved customers
              thousands by catching issues before purchase.
            </p>
          </div>

          {/* Case Studies Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: "32px",
            }}
          >
            {CASE_STUDIES.map((study) => (
              <div
                key={study.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 48px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(0,0,0,0.08)";
                }}
              >
                {/* Before/After Images */}
                <div style={{ position: "relative" }}>
                  <div
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
                  >
                    {/* Before */}
                    <div style={{ position: "relative", aspectRatio: "1/1" }}>
                      <img
                        src={study.beforeImage}
                        alt="Before"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          left: "12px",
                          backgroundColor: "rgba(239, 68, 68, 0.9)",
                          color: "white",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "700",
                        }}
                      >
                        ❌ BEFORE
                      </div>
                    </div>
                    {/* After */}
                    <div style={{ position: "relative", aspectRatio: "1/1" }}>
                      <img
                        src={study.afterImage}
                        alt="After"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          backgroundColor: "rgba(16, 185, 129, 0.9)",
                          color: "white",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "700",
                        }}
                      >
                        ✓ AFTER
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "24px" }}>
                  {/* Category Badge */}
                  <div
                    style={{
                      display: "inline-block",
                      backgroundColor: "#F0F9FF",
                      color: "#1876f2",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                      marginBottom: "12px",
                    }}
                  >
                    {study.category}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#5A5A5A",
                      marginBottom: "12px",
                      lineHeight: "1.3",
                    }}
                  >
                    {study.title}
                  </h3>

                  {/* Location */}
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#8A8A8A",
                      marginBottom: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <MapPin size={14} />
                    {study.location}
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "15px",
                      color: "#5A5A5A",
                      lineHeight: "1.6",
                      marginBottom: "16px",
                    }}
                  >
                    {study.description}
                  </p>

                  {/* Outcome */}
                  <div
                    style={{
                      backgroundColor: "#F0FDF4",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      marginBottom: "16px",
                      borderLeft: "3px solid #10B981",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#059669",
                        marginBottom: "4px",
                      }}
                    >
                      OUTCOME
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#047857",
                        fontWeight: "500",
                      }}
                    >
                      {study.outcome}
                    </div>
                  </div>

                  {/* Savings & Inspector */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "16px",
                      borderTop: "1px solid #E5E7EB",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#8A8A8A",
                          marginBottom: "2px",
                        }}
                      >
                        SAVINGS
                      </div>
                      <div
                        style={{
                          fontSize: "24px",
                          fontWeight: "800",
                          color: "#10B981",
                        }}
                      >
                        {study.savings}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#8A8A8A",
                          marginBottom: "2px",
                        }}
                      >
                        INSPECTOR
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#5A5A5A",
                        }}
                      >
                        {study.inspectorName}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            style={{
              marginTop: isMobile ? "60px" : "80px",
              textAlign: "center",
              padding: isMobile ? "40px 24px" : "60px",
              backgroundColor: "white",
              borderRadius: "24px",
              boxShadow: "0 8px 32px rgba(255, 184, 77, 0.15)",
            }}
          >
            <h3
              style={{
                fontSize: isMobile ? "28px" : "36px",
                fontWeight: "700",
                color: "#5A5A5A",
                marginBottom: "16px",
              }}
            >
              Don't Risk It. Get Dibby Protection.
            </h3>
            <p
              style={{
                fontSize: "18px",
                color: "#8A8A8A",
                marginBottom: "32px",
                maxWidth: "600px",
                margin: "0 auto 32px",
                lineHeight: "1.6",
              }}
            >
              Over $2.4M saved for customers by catching issues before purchase.
              Starting at just $49.
            </p>
            <button
              onClick={() => {
                console.log("Button clicked! isModalOpen:", isModalOpen);
                setIsModalOpen(true);
                console.log("After setState, should be true");
              }}
              style={{
                padding: isMobile ? "16px 32px" : "18px 48px",
                backgroundColor: "#FFB84D",
                border: "none",
                borderRadius: "12px",
                fontSize: "18px",
                fontWeight: "700",
                color: "white",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(255, 184, 77, 0.3)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              Get Protected Now →
            </button>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}

      {/* PRICING SECTION */}
      <section
        id="pricing"
        style={{
          padding: isMobile ? "80px 20px" : "120px 32px",
          backgroundColor: "white",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: isMobile ? "60px" : "80px",
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? "36px" : "52px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "20px",
                letterSpacing: "-1px",
              }}
            >
              Simple,{" "}
              <span style={{ color: "#FFB84D" }}>Transparent Pricing</span>
            </h2>
            <p
              style={{
                fontSize: isMobile ? "18px" : "21px",
                color: "#8A8A8A",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: "1.7",
              }}
            >
              No hidden fees. No surprises. Just honest pricing for quality
              service.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: "32px",
            }}
          >
            {[
              {
                name: "Inspection Only",
                price: 49,
                icon: "📸",
                color: "#D4BFEA",
                border: "#F0E5F5",
                features: [
                  "Photo & video documentation",
                  "Condition assessment",
                  "Detailed written report",
                  "24-hour turnaround",
                  "Functionality tests",
                ],
              },
              {
                name: "Full Service",
                price: 150,
                icon: "⭐",
                color: "#FFB84D",
                border: "#FFE5DB",
                popular: true,
                features: [
                  "Everything in Inspection",
                  "Professional pickup",
                  "Safe delivery to your door",
                  "$1M insurance coverage",
                  "Real-time tracking",
                  "White-glove service",
                ],
              },
              {
                name: "Delivery Only",
                price: 75,
                icon: "🚚",
                color: "#B8E6D5",
                border: "#E0F5ED",
                features: [
                  "Professional pickup",
                  "Safe delivery",
                  "$1M insurance coverage",
                  "Real-time tracking",
                  "Scheduled delivery window",
                ],
              },
            ].map((service, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#FFF8F5",
                  borderRadius: "32px",
                  padding: isMobile ? "36px 28px" : "48px",
                  border: `3px solid ${service.border}`,
                  position: "relative",
                  boxShadow: service.popular
                    ? "0 12px 48px rgba(255, 184, 77, 0.25)"
                    : "0 4px 16px rgba(255, 180, 162, 0.08)",
                  transform:
                    service.popular && !isMobile ? "scale(1.05)" : "scale(1)",
                }}
              >
                {service.popular && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-16px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: service.color,
                      color: "white",
                      padding: "8px 24px",
                      borderRadius: "50px",
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    🔥 MOST POPULAR
                  </div>
                )}
                <div
                  style={{
                    fontSize: "48px",
                    marginBottom: "24px",
                    textAlign: "center",
                  }}
                >
                  {service.icon}
                </div>
                <h3
                  style={{
                    fontSize: isMobile ? "24px" : "28px",
                    fontWeight: "700",
                    color: "#5A5A5A",
                    marginBottom: "16px",
                    textAlign: "center",
                  }}
                >
                  {service.name}
                </h3>
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                  <div
                    style={{
                      fontSize: isMobile ? "48px" : "56px",
                      fontWeight: "800",
                      color: service.color,
                      marginBottom: "8px",
                    }}
                  >
                    ${service.price}
                  </div>
                  <div style={{ fontSize: "16px", color: "#ABABAB" }}>
                    {service.name === "Full Service"
                      ? "inspection + delivery"
                      : service.name === "Delivery Only"
                      ? "pickup + delivery"
                      : "per inspection"}
                  </div>
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    marginBottom: "32px",
                  }}
                >
                  {service.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      style={{
                        fontSize: "16px",
                        color: "#8A8A8A",
                        marginBottom: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <Check size={20} color={service.color} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setIsDibbyModalOpen(true);
                  }}
                  style={{
                    width: "100%",
                    padding: "16px",
                    backgroundColor: service.color,
                    border: "none",
                    borderRadius: "16px",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "white",
                    cursor: "pointer",
                    boxShadow: `0 4px 16px ${service.color}50`,
                  }}
                >
                  Get Started →
                </button>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: isMobile ? "60px" : "80px",
              textAlign: "center",
              backgroundColor: "#E5F8FF",
              borderRadius: "24px",
              padding: isMobile ? "32px 24px" : "40px",
            }}
          >
            <p
              style={{ fontSize: "18px", color: "#8A8A8A", lineHeight: "1.7" }}
            >
              💡 <strong>Need something custom?</strong> Large items, vehicles,
              or unique requests? Contact us for a custom quote.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        style={{
          padding: isMobile ? "80px 20px" : "120px 32px",
          background:
            "linear-gradient(135deg, #FFE5F8 0%, #E5F8FF 50%, #FFF9E6 100%)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            style={{
              fontSize: isMobile ? "64px" : "80px",
              marginBottom: "32px",
            }}
          >
            <DibbyLogo size={isMobile ? 100 : 120} />
          </div>
          <h2
            style={{
              fontSize: isMobile ? "36px" : "56px",
              fontWeight: "800",
              color: "#5A5A5A",
              marginBottom: "24px",
              letterSpacing: "-1.5px",
            }}
          >
            Ready to Shop Smarter?
          </h2>
          <p
            style={{
              fontSize: isMobile ? "20px" : "24px",
              color: "#8A8A8A",
              lineHeight: "1.7",
              marginBottom: "48px",
            }}
          >
            Stop worrying about marketplace purchases. Let Dibby handle the
            inspection, pickup, and delivery while you relax.
          </p>
          <button
            onClick={() => {
              setIsDibbyModalOpen(true);
            }}
            style={{
              padding: isMobile ? "20px 44px" : "24px 56px",
              backgroundColor: "#FFB84D",
              border: "none",
              borderRadius: "20px",
              fontSize: "20px",
              fontWeight: "700",
              color: "white",
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(255, 184, 77, 0.35)",
              marginBottom: "32px",
            }}
          >
            Submit Your First Listing →
          </button>
          <div style={{ fontSize: "16px", color: "#ABABAB" }}>
            Join 50,000+ happy customers • $1M insurance • 4.9★ rating
          </div>
        </div>
      </section>
    </div>
  );

  // ============================================
  // HEADER COMPONENT WITH MARKETPLACE NAVIGATION
  // ============================================
  const Header = () => (
    <header
      style={{
        backgroundColor: "white",
        borderBottom: "2px solid #FFE5DB",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 16px rgba(255, 180, 162, 0.08)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile ? "16px 20px" : "20px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          onClick={() => {
            setCurrentPage("home");
            setActiveView("landing");
            setMobileMenuOpen(false);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
          }}
        >
          <DibbyLogo size={isMobile ? 32 : 40} />
          <span
            style={{
              fontSize: isMobile ? "24px" : "28px",
              fontWeight: "800",
              color: "#5A5A5A",
              letterSpacing: "-0.5px",
            }}
          >
            Dibby
          </span>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav style={{ display: "flex", gap: "40px", alignItems: "center" }}>
            {[
              { label: "How It Works", page: "how-it-works" },
              { label: "Pricing", page: "calculator" },
              { label: "Blog", page: "blog" },
              { label: "About", page: "about" },
              {
                label: "Marketplace",
                action: () => {
                  setActiveView("browse");
                  if (rawResults.length === 0 && !selectedCategory) {
                    const defaultCategory = CATEGORIES.find(
                      (c) => c.id === "furniture"
                    );
                    if (defaultCategory) {
                      setTimeout(
                        () => handleCategoryClick(defaultCategory),
                        100
                      );
                    }
                  }
                },
              },
              { label: "FAQ", page: "faq" },
              { label: "Contact", page: "contact" },
            ].map((item, idx) => (
              <span
                key={idx}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    setCurrentPage(item.page!);
                    setActiveView("landing");
if ("scroll" in item && (item as any).scroll) {
  setTimeout(() => {
    document
      .getElementById((item as any).scroll!)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }
                  }
                }}
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#8A8A8A",
                  cursor: "pointer",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFB84D")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8A8A")}
              >
                {item.label}
              </span>
            ))}
          </nav>
        )}

        {/* Desktop Buttons */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <button
              onClick={() => setCurrentPage("profile")}
              style={{
                padding: "10px 24px",
                backgroundColor: "white",
                border: "2px solid #FFE5DB",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: "600",
                color: "#8A8A8A",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#FFB84D";
                e.currentTarget.style.color = "#FFB84D";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#FFE5DB";
                e.currentTarget.style.color = "#8A8A8A";
              }}
            >
              <User size={18} />
              Profile
            </button>
            <button
              onClick={() => {
                setIsDibbyModalOpen(true);
              }}
              style={{
                padding: "12px 28px",
                backgroundColor: "#FFB84D",
                border: "none",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: "600",
                color: "white",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(255, 184, 77, 0.25)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(255, 184, 77, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(255, 184, 77, 0.25)";
              }}
            >
              Submit Listing
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              padding: "8px",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Menu size={24} color="#5A5A5A" />
          </button>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobile && mobileMenuOpen && (
        <div
          style={{
            backgroundColor: "white",
            borderTop: "2px solid #FFE5DB",
            padding: "20px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {[
              { label: "How It Works", page: "how-it-works" },
              { label: "Pricing", page: "calculator" },
              { label: "Blog", page: "blog" },
              { label: "About", page: "about" },
              {
                label: "Marketplace",
                action: () => {
                  setActiveView("browse");
                  if (rawResults.length === 0 && !selectedCategory) {
                    const defaultCategory = CATEGORIES.find(
                      (c) => c.id === "furniture"
                    );
                    if (defaultCategory) {
                      setTimeout(
                        () => handleCategoryClick(defaultCategory),
                        100
                      );
                    }
                  }
                },
              },
              { label: "FAQ", page: "faq" },
              { label: "Contact", page: "contact" },
              { label: "Profile", page: "profile" },
            ].map((item, idx) => (
              <span
                key={idx}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    setCurrentPage(item.page!);
                    setActiveView("landing");
                 if ("scroll" in item && (item as any).scroll) {
  setTimeout(() => {
    document
      .getElementById((item as any).scroll!)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }
                  }
                  setMobileMenuOpen(false);
                }}
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#5A5A5A",
                  cursor: "pointer",
                  padding: "12px",
                  borderRadius: "12px",
                  transition: "all 0.3s",
                }}
              >
                {item.label}
              </span>
            ))}
            <button
              onClick={() => {
                setIsModalOpen(true);
                setMobileMenuOpen(false);
              }}
              style={{
                padding: "16px",
                backgroundColor: "#FFB84D",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "600",
                color: "white",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(255, 184, 77, 0.25)",
              }}
            >
              Submit Listing
            </button>
          </div>
        </div>
      )}
    </header>
  );

  // ============================================
  // LISTING DETAIL PAGE COMPONENT
  // ============================================
  const AppWithStyles: React.FC = () => {
    return (
      <>
        <GlobalStyles />
        <App />
      </>
    );
  };

  // Add spinner animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  // ============================================
  // 🎨 NEW LISTING DETAIL PAGE - FACEBOOK MARKETPLACE STYLE
  // Replace your existing ListingDetailPage with this
  // ============================================
  function ListingDetailPage({
    listing,
    onClose,
  }: {
    listing: any;
    onClose: () => void;
  }) {
    const { isMobile } = useResponsive();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [isFavorited, setIsFavorited] = useState(false);

    const images =
      listing.listing_photos && listing.listing_photos.length > 0
        ? listing.listing_photos.map((photo: any) => photo.photo_image_url)
        : listing.primary_listing_photo
        ? [listing.primary_listing_photo.photo_image_url]
        : [];

    const price =
      typeof listing.listing_price === "string"
        ? parseInt(listing.listing_price.replace(/[^0-9]/g, "")) || 0
        : listing.listing_price || 0;
    const title = listing.marketplace_listing_title || "No title";
    const location =
      listing.location?.reverse_geocode || "Location not specified";
    const description =
      listing.marketplace_listing_description || "No description provided.";

    const SERVICES = [
      {
        id: "inspection",
        name: "Inspection Only",
        price: 49,
        description: "Photo & video inspection report",
        features: [
          "HD photos & video",
          "Condition assessment",
          "Detailed written report",
          "24-hour turnaround",
        ],
      },
      {
        id: "delivery",
        name: "Delivery Only",
        price: 75,
        description: "Professional pickup & delivery",
        features: [
          "Professional pickup",
          "Safe delivery",
          "$1M insurance",
          "Real-time tracking",
        ],
      },
      {
        id: "full",
        name: "Full Service",
        price: 150,
        description: "Inspection + Delivery",
        recommended: true,
        features: [
          "Everything in Inspection",
          "Everything in Delivery",
          "White-glove service",
          "Priority scheduling",
        ],
      },
    ];

    // MOBILE VIEW
    if (isMobile) {
      return (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#FFF8F5",
            zIndex: 9999,
            overflowY: "auto",
            paddingBottom: "100px",
          }}
        >
          {/* Mobile Image Gallery with floating header */}
          <div style={{ position: "relative" }}>
            {/* Mobile Header */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                padding: "12px 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                zIndex: 10,
              }}
            >
              <button
                onClick={onClose}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 248, 245, 0.95)",
                  border: "2px solid #FFE5DB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(255,184,77,0.2)",
                }}
              >
                <ChevronLeft size={24} color="#FFB84D" />
              </button>

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 248, 245, 0.95)",
                    border: "2px solid #FFE5DB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(255,184,77,0.2)",
                  }}
                >
                  <Share2 size={20} color="#FFB84D" />
                </button>
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: isFavorited
                      ? "#FFE5DB"
                      : "rgba(255, 248, 245, 0.95)",
                    border: "2px solid #FFE5DB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(255,184,77,0.2)",
                  }}
                >
                  <Heart
                    size={20}
                    color="#FFB84D"
                    fill={isFavorited ? "#FFB84D" : "none"}
                  />
                </button>
              </div>
            </div>

            {/* Mobile Image Gallery */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "400px",
                background: "linear-gradient(135deg, #FFF9E6 0%, #FFE5F8 100%)",
                overflow: "hidden",
                borderBottom: "3px solid #FFE5DB",
              }}
            >
              <img
                src={images[currentImageIndex] || ""}
                alt={title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* Image counter */}
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "12px",
                  backgroundColor: "rgba(255, 184, 77, 0.95)",
                  color: "white",
                  padding: "8px 14px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "700",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              >
                {currentImageIndex + 1} of {images.length}
              </div>

              {/* Navigation dots */}
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: "6px",
                }}
              >
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    style={{
                      width: idx === currentImageIndex ? "24px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      backgroundColor:
                        idx === currentImageIndex
                          ? "#FFB84D"
                          : "rgba(255,255,255,0.6)",
                      border:
                        idx === currentImageIndex ? "2px solid white" : "none",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      boxShadow:
                        idx === currentImageIndex
                          ? "0 2px 8px rgba(255,184,77,0.4)"
                          : "none",
                    }}
                  />
                ))}
              </div>

              {/* Arrow buttons */}
              {currentImageIndex > 0 && (
                <button
                  onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 248, 245, 0.95)",
                    border: "2px solid #FFE5DB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(255,184,77,0.2)",
                  }}
                >
                  <ChevronLeft size={24} color="#FFB84D" />
                </button>
              )}

              {currentImageIndex < images.length - 1 && (
                <button
                  onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 248, 245, 0.95)",
                    border: "2px solid #FFE5DB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(255,184,77,0.2)",
                  }}
                >
                  <ChevronRight size={24} color="#FFB84D" />
                </button>
              )}
            </div>
          </div>

          {/* Item Details Mobile */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "white",
              marginBottom: "8px",
            }}
          >
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "12px",
                lineHeight: 1.3,
              }}
            >
              {title}
            </h1>
            <div
              style={{
                fontSize: "32px",
                fontWeight: "900",
                color: "#FFB84D",
                marginBottom: "16px",
              }}
            >
              ${price}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "20px",
                color: "#8A8A8A",
              }}
            >
              <MapPin size={18} />
              <span>{location}</span>
            </div>

            <div
              style={{
                height: "2px",
                backgroundColor: "#FFE5DB",
                margin: "20px 0",
              }}
            />

            <h2
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#5A5A5A",
                marginBottom: "12px",
              }}
            >
              📝 Description
            </h2>
            <p
              style={{
                fontSize: "15px",
                color: "#5A5A5A",
                lineHeight: 1.8,
                whiteSpace: "pre-line",
              }}
            >
              {description}
            </p>
          </div>

          {/* Service Selection Mobile */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "white",
              marginBottom: "8px",
            }}
          >
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "#5A5A5A",
                marginBottom: "8px",
              }}
            >
              🛡️ Add Dibby Protection
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#8A8A8A",
                marginBottom: "20px",
              }}
            >
              Shop safer with professional inspection & delivery
            </p>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  style={{
                    padding: "16px",
                    borderRadius: "16px",
                    border:
                      selectedService === service.id
                        ? "3px solid #FFB84D"
                        : "3px solid #FFE5DB",
                    backgroundColor:
                      selectedService === service.id ? "#FFF9E6" : "#FFFBF8",
                    cursor: "pointer",
                    textAlign: "left",
                    position: "relative",
                  }}
                >
                  {service.recommended && (
                    <div
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        backgroundColor: "#FFB84D",
                        color: "white",
                        padding: "4px 10px",
                        borderRadius: "10px",
                        fontSize: "11px",
                        fontWeight: "700",
                      }}
                    >
                      ⭐ RECOMMENDED
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#5A5A5A",
                        margin: 0,
                      }}
                    >
                      {service.name}
                    </h3>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: "800",
                        color: "#FFB84D",
                      }}
                    >
                      ${service.price}
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#8A8A8A",
                      margin: "0 0 10px 0",
                    }}
                  >
                    {service.description}
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      fontSize: "13px",
                      color: "#5A5A5A",
                    }}
                  >
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          marginBottom: "4px",
                        }}
                      >
                        <span style={{ color: "#FFB84D", fontWeight: "bold" }}>
                          ✓
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>

          {/* Safety Tips Mobile */}
          <div
            style={{
              padding: "20px",
              background: "linear-gradient(135deg, #FFF9E6 0%, #E7F3FF 100%)",
              marginBottom: "8px",
            }}
          >
            <div style={{ display: "flex", gap: "12px" }}>
              <Shield
                size={24}
                color="#FFB84D"
                style={{ flexShrink: 0, marginTop: "2px" }}
              />
              <div>
                <h3
                  style={{
                    fontWeight: "700",
                    color: "#5A5A5A",
                    marginBottom: "10px",
                    fontSize: "16px",
                  }}
                >
                  🛡️ Safety Tips
                </h3>
                <ul
                  style={{
                    fontSize: "14px",
                    color: "#5A5A5A",
                    lineHeight: 1.6,
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                  }}
                >
                  <li style={{ marginBottom: "8px" }}>
                    • Meet in a public place
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    • Check the item before you buy
                  </li>
                  <li>• Pay only after collecting the item</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sticky Bottom CTA */}
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "white",
              padding: "16px 20px",
              borderTop: "3px solid #FFE5DB",
              boxShadow: "0 -4px 12px rgba(0,0,0,0.1)",
              zIndex: 50,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <div>
                <div style={{ fontSize: "12px", color: "#8A8A8A" }}>
                  {selectedService ? "Total with service" : "Item price"}
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "900",
                    color: "#FFB84D",
                  }}
                >
                  $
                  {price +
                    (selectedService
                      ? SERVICES.find((s) => s.id === selectedService)?.price ||
                        0
                      : 0)}
                </div>
              </div>
              <button
                style={{
                  backgroundColor: "#FFB84D",
                  color: "white",
                  fontWeight: "700",
                  fontSize: "16px",
                  padding: "14px 32px",
                  borderRadius: "16px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(255,184,77,0.3)",
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      );
    }

    // DESKTOP VIEW
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#FFF8F5",
          zIndex: 9999,
          overflowY: "auto",
        }}
      >
        {/* Desktop Header */}
        <div
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            borderBottom: "3px solid #FFE5DB",
            zIndex: 50,
            padding: "16px 24px",
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <button
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#5A5A5A",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              <ChevronLeft style={{ width: "20px", height: "20px" }} />
              <span>Back to Marketplace</span>
            </button>
          </div>
        </div>

        {/* Main Container */}
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "32px 20px",
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            gap: "32px",
          }}
        >
          {/* LEFT SIDE - Images & Description */}
          <div>
            {/* Image Gallery */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "24px",
                overflow: "hidden",
                border: "3px solid #FFE5DB",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  paddingBottom: "75%",
                  background:
                    "linear-gradient(135deg, #FFF9E6 0%, #FFE5F8 100%)",
                }}
              >
                <img
                  src={images[currentImageIndex] || ""}
                  alt={title}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIndex(
                          (currentImageIndex - 1 + images.length) %
                            images.length
                        )
                      }
                      style={{
                        position: "absolute",
                        left: "20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 248, 245, 0.95)",
                        border: "2px solid #FFE5DB",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(255,184,77,0.2)",
                      }}
                    >
                      <ChevronLeft size={28} color="#FFB84D" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIndex(
                          (currentImageIndex + 1) % images.length
                        )
                      }
                      style={{
                        position: "absolute",
                        right: "20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 248, 245, 0.95)",
                        border: "2px solid #FFE5DB",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(255,184,77,0.2)",
                      }}
                    >
                      <ChevronRight size={28} color="#FFB84D" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div
                  style={{
                    padding: "20px",
                    backgroundColor: "#FFFBF8",
                    borderTop: "2px solid #FFE5DB",
                  }}
                >
                  <div
                    style={{ display: "flex", gap: "12px", overflowX: "auto" }}
                  >
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        style={{
                          flexShrink: 0,
                          width: "100px",
                          height: "100px",
                          borderRadius: "12px",
                          overflow: "hidden",
                          border:
                            idx === currentImageIndex
                              ? "3px solid #FFB84D"
                              : "3px solid #FFE5DB",
                          padding: 0,
                          cursor: "pointer",
                          backgroundColor: "transparent",
                        }}
                      >
                        <img
                          src={img}
                          alt={`${title} ${idx + 1}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Item Info */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "24px",
                padding: "32px",
                border: "3px solid #FFE5DB",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "20px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h1
                    style={{
                      fontSize: "32px",
                      fontWeight: "800",
                      color: "#5A5A5A",
                      marginBottom: "12px",
                      lineHeight: 1.3,
                    }}
                  >
                    {title}
                  </h1>
                  <div
                    style={{
                      fontSize: "36px",
                      fontWeight: "900",
                      color: "#FFB84D",
                      marginBottom: "16px",
                    }}
                  >
                    ${price}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      color: "#8A8A8A",
                      fontSize: "16px",
                    }}
                  >
                    <MapPin size={18} />
                    {location}
                  </div>
                </div>

                {/* Share & Favorite buttons */}
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: "#FFF8F5",
                      border: "2px solid #FFE5DB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Share2 size={22} color="#FFB84D" />
                  </button>
                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: isFavorited ? "#FFE5DB" : "#FFF8F5",
                      border: "2px solid #FFE5DB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Heart
                      size={22}
                      color="#FFB84D"
                      fill={isFavorited ? "#FFB84D" : "none"}
                    />
                  </button>
                </div>
              </div>

              <div
                style={{
                  height: "2px",
                  backgroundColor: "#FFE5DB",
                  margin: "24px 0",
                }}
              />

              <div>
                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: "#5A5A5A",
                    marginBottom: "14px",
                  }}
                >
                  📝 Description
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#5A5A5A",
                    lineHeight: 1.8,
                    margin: 0,
                    whiteSpace: "pre-line",
                  }}
                >
                  {description}
                </p>
              </div>
            </div>

            {/* Service Selection */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "24px",
                padding: "32px",
                border: "3px solid #FFE5DB",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#5A5A5A",
                  marginBottom: "8px",
                }}
              >
                🛡️ Add Dibby Protection
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  color: "#8A8A8A",
                  marginBottom: "24px",
                }}
              >
                Shop safer with professional inspection & delivery
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    style={{
                      padding: "20px",
                      borderRadius: "16px",
                      border:
                        selectedService === service.id
                          ? "3px solid #FFB84D"
                          : "3px solid #FFE5DB",
                      backgroundColor:
                        selectedService === service.id ? "#FFF9E6" : "#FFFBF8",
                      cursor: "pointer",
                      textAlign: "left",
                      position: "relative",
                    }}
                  >
                    {service.recommended && (
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          backgroundColor: "#FFB84D",
                          color: "white",
                          padding: "4px 12px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "700",
                        }}
                      >
                        ⭐ RECOMMENDED
                      </div>
                    )}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "12px",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          color: "#5A5A5A",
                          margin: 0,
                        }}
                      >
                        {service.name}
                      </h3>
                      <div
                        style={{
                          fontSize: "22px",
                          fontWeight: "800",
                          color: "#FFB84D",
                        }}
                      >
                        ${service.price}
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#8A8A8A",
                        margin: "0 0 12px 0",
                      }}
                    >
                      {service.description}
                    </p>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        fontSize: "14px",
                        color: "#5A5A5A",
                      }}
                    >
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "6px",
                          }}
                        >
                          <span
                            style={{ color: "#FFB84D", fontWeight: "bold" }}
                          >
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Sticky Pricing Card */}
          <div>
            <div style={{ position: "sticky", top: "96px" }}>
              {/* Pricing Card */}
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "24px",
                  padding: "32px",
                  boxShadow: "0 8px 24px rgba(255,184,77,0.15)",
                  border: "3px solid #FFE5DB",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    fontSize: "36px",
                    fontWeight: "900",
                    color: "#FFB84D",
                    marginBottom: "12px",
                  }}
                >
                  ${price}
                </div>
                <h1
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    color: "#5A5A5A",
                    marginBottom: "24px",
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </h1>

                {/* Total with Service */}
                {selectedService && (
                  <div
                    style={{
                      padding: "16px",
                      backgroundColor: "#FFF9E6",
                      borderRadius: "16px",
                      marginBottom: "20px",
                      border: "2px solid #FFE5DB",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#8A8A8A",
                        marginBottom: "4px",
                      }}
                    >
                      Total with{" "}
                      {SERVICES.find((s) => s.id === selectedService)?.name}
                    </div>
                    <div
                      style={{
                        fontSize: "28px",
                        fontWeight: "800",
                        color: "#FFB84D",
                      }}
                    >
                      $
                      {price +
                        (SERVICES.find((s) => s.id === selectedService)
                          ?.price || 0)}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <button
                    style={{
                      width: "100%",
                      backgroundColor: "#FFB84D",
                      color: "white",
                      fontWeight: "700",
                      fontSize: "16px",
                      padding: "16px 20px",
                      borderRadius: "16px",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      boxShadow: "0 4px 12px rgba(255,184,77,0.3)",
                    }}
                  >
                    <MessageCircle size={20} />
                    Message Seller
                  </button>

                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    style={{
                      width: "100%",
                      backgroundColor: isFavorited ? "#FFE5DB" : "#FFF8F5",
                      color: "#5A5A5A",
                      fontWeight: "600",
                      padding: "14px 20px",
                      borderRadius: "16px",
                      border: "2px solid #FFE5DB",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <Heart
                      fill={isFavorited ? "#FFB84D" : "none"}
                      color="#FFB84D"
                      size={20}
                    />
                    {isFavorited ? "Saved" : "Save"}
                  </button>

                  <button
                    style={{
                      width: "100%",
                      backgroundColor: "#FFF8F5",
                      color: "#5A5A5A",
                      fontWeight: "600",
                      padding: "14px 20px",
                      borderRadius: "16px",
                      border: "2px solid #FFE5DB",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <Share2 size={20} color="#FFB84D" />
                    Share
                  </button>
                </div>
              </div>

              {/* Safety Tips Card */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #FFF9E6 0%, #E7F3FF 100%)",
                  borderRadius: "24px",
                  padding: "28px",
                  border: "3px solid #FFE5DB",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                  }}
                >
                  <Shield
                    size={28}
                    color="#FFB84D"
                    style={{ flexShrink: 0, marginTop: "2px" }}
                  />
                  <div>
                    <h3
                      style={{
                        fontWeight: "700",
                        color: "#5A5A5A",
                        marginBottom: "12px",
                        fontSize: "18px",
                      }}
                    >
                      🛡️ Safety Tips
                    </h3>
                    <ul
                      style={{
                        fontSize: "14px",
                        color: "#5A5A5A",
                        lineHeight: 1.8,
                        margin: 0,
                        padding: 0,
                        listStyle: "none",
                      }}
                    >
                      <li style={{ marginBottom: "10px" }}>
                        • Meet in a public place
                      </li>
                      <li style={{ marginBottom: "10px" }}>
                        • Check the item before you buy
                      </li>
                      <li>• Pay only after collecting the item</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // ============================================
  // CLEAN MARKETPLACE COMPONENT
  // ============================================
  const MarketplaceBrowseView = ({
    onListingClick,
  }: {
    onListingClick?: (listing: any) => void;
  }) => {
    const { isMobile } = useResponsive(); // Keep this if you have useResponsive, otherwise delete this line

    // State
    const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedCity, setSelectedCity] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [cities, setCities] = useState<string[]>([]);
    const [favorites, setFavorites] = useState<Set<string>>(new Set());

    // Categories - matches your database exactly
    const CATEGORIES = [
      { id: "all", name: "all", displayName: "All Items", color: "#FFB84D" },
      {
        id: "vehicles",
        name: "vehicles",
        displayName: "Vehicles",
        color: "#FF6B6B",
      },
      {
        id: "property-rentals",
        name: "property-rentals",
        displayName: "Property Rentals",
        color: "#4ECDC4",
      },
      {
        id: "furniture",
        name: "furniture",
        displayName: "Furniture",
        color: "#95E1D3",
      },
      {
        id: "electronics",
        name: "electronics",
        displayName: "Electronics",
        color: "#A8E6CF",
      },
      {
        id: "clothing-shoes",
        name: "clothing-shoes",
        displayName: "Clothing & Shoes",
        color: "#FFD93D",
      },
      {
        id: "sports-outdoors",
        name: "sports-outdoors",
        displayName: "Sports & Outdoors",
        color: "#6BCB77",
      },
      {
        id: "home-goods",
        name: "home-goods",
        displayName: "Home & Garden",
        color: "#C3AED6",
      },
      { id: "tools", name: "tools", displayName: "Tools", color: "#8E7CC3" },
      {
        id: "baby-kids",
        name: "baby-kids",
        displayName: "Baby & Kids",
        color: "#FDB4B4",
      },
    ];

    // Fetch cities on mount
    useEffect(() => {
      const fetchCities = async () => {
        const { data } = await supabase
          .from("listings")
          .select("city")
          .eq("is_live", true);

        if (data) {
          const uniqueCities = [
            ...new Set(data.map((item: any) => item.city)),
          ].sort();
          setCities(uniqueCities);
        }
      };
      fetchCities();
    }, []);

    // Main fetch function
    const fetchListings = async () => {
      setLoading(true);

      try {
        let query = supabase.from("listings").select("*").eq("is_live", true);

        // Filter by category
        if (selectedCategory !== "all") {
          query = query.eq("category_name", selectedCategory);
        }

        // Filter by city
        if (selectedCity !== "all") {
          query = query.eq("city", selectedCity);
        }

        // Filter by search query
        if (searchQuery.trim()) {
          query = query.ilike("title", `%${searchQuery}%`);
        }

        // Filter by price range
        if (minPrice) {
          query = query.gte("price", parseFloat(minPrice));
        }
        if (maxPrice) {
          query = query.lte("price", parseFloat(maxPrice));
        }

        // Sort and limit
        query = query.order("scraped_at", { ascending: false }).limit(100);

        const { data, error } = await query;

        if (error) throw error;

        setListings(data || []);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    // Fetch on category/city change (immediate)
    useEffect(() => {
      fetchListings();
    }, [selectedCategory, selectedCity]);

    // Fetch on search/price change (debounced)
    useEffect(() => {
      const timer = setTimeout(() => {
        fetchListings();
      }, 1000);
      return () => clearTimeout(timer);
    }, [searchQuery, minPrice, maxPrice]);

    // Toggle favorite
    const toggleFavorite = (id: string) => {
      setFavorites((prev) => {
        const newFavorites = new Set(prev);
        if (newFavorites.has(id)) {
          newFavorites.delete(id);
        } else {
          newFavorites.add(id);
        }
        return newFavorites;
      });
    };

    return (
      <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
        {/* Header */}
        <div
          style={{
            backgroundColor: "white",
            borderBottom: "2px solid #FFE5DB",
            padding: "24px 32px",
            position: "sticky",
            top: 0,
            zIndex: 100,
            boxShadow: "0 2px 8px rgba(255, 184, 77, 0.08)",
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "800",
                color: "#5A5A5A",
                marginBottom: "24px",
                letterSpacing: "-0.5px",
              }}
            >
              🛍️ Browse Marketplace
            </h1>

            {/* Search and Filters Row */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              {/* Search Bar */}
              <div
                style={{ flex: "1", minWidth: "250px", position: "relative" }}
              >
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 16px 14px 48px",
                    border: "2px solid #FFE5DB",
                    borderRadius: "12px",
                    fontSize: "15px",
                    outline: "none",
                    transition: "all 0.2s",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "20px",
                  }}
                >
                  🔍
                </span>
              </div>

              {/* City Dropdown */}
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                style={{
                  padding: "14px 16px",
                  border: "2px solid #FFE5DB",
                  borderRadius: "12px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#5A5A5A",
                  cursor: "pointer",
                  outline: "none",
                  minWidth: "180px",
                }}
              >
                <option value="all">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              {/* View Toggle */}
              <button
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
                style={{
                  padding: "14px 20px",
                  backgroundColor: "white",
                  border: "2px solid #FFE5DB",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "600",
                  color: "#5A5A5A",
                  fontSize: "15px",
                }}
              >
                {viewMode === "grid" ? "📋 List" : "⊞ Grid"}
              </button>
            </div>

            {/* Price Filters */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <span style={{ fontSize: "20px" }}>💰</span>
              <input
                type="number"
                placeholder="Min price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                style={{
                  width: "120px",
                  padding: "10px 12px",
                  border: "2px solid #FFE5DB",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              <span style={{ color: "#8A8A8A" }}>to</span>
              <input
                type="number"
                placeholder="Max price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                style={{
                  width: "120px",
                  padding: "10px 12px",
                  border: "2px solid #FFE5DB",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            backgroundColor: "white",
            borderBottom: "2px solid #FFE5DB",
            padding: "16px 32px",
            overflowX: "auto",
            position: "sticky",
            top: "200px",
            zIndex: 99,
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              display: "flex",
              gap: "12px",
              flexWrap: "nowrap",
            }}
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    padding: "12px 20px",
                    backgroundColor: isActive ? category.color : "white",
                    color: isActive ? "white" : "#5A5A5A",
                    border: `2px solid ${
                      isActive ? category.color : "#FFE5DB"
                    }`,
                    borderRadius: "12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                    boxShadow: isActive
                      ? `0 4px 12px ${category.color}40`
                      : "none",
                  }}
                >
                  {category.displayName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Listings Section */}
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "32px" }}>
          {/* Results Count */}
          <div style={{ marginBottom: "24px" }}>
            <p style={{ color: "#8A8A8A", fontSize: "15px" }}>
              {loading ? "Loading..." : `${listings.length} items found`}
            </p>
          </div>

          {/* Loading Spinner */}
          {loading && (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  border: "4px solid #FFE5DB",
                  borderTop: "4px solid #FFB84D",
                  borderRadius: "50%",
                  margin: "0 auto",
                  animation: "spin 1s linear infinite",
                }}
              />
            </div>
          )}

          {/* No Results */}
          {!loading && listings.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ fontSize: "64px", marginBottom: "16px" }}>📭</div>
              <h3
                style={{
                  fontSize: "24px",
                  color: "#5A5A5A",
                  marginBottom: "8px",
                }}
              >
                No items found
              </h3>
              <p style={{ color: "#8A8A8A" }}>
                Try adjusting your filters or search terms
              </p>
            </div>
          )}

          {/* Listings Grid */}
          {!loading && listings.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  viewMode === "grid"
                    ? "repeat(auto-fill, minmax(280px, 1fr))"
                    : "1fr",
                gap: "20px",
              }}
            >
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  style={{
                    backgroundColor: "white",
                    border: "2px solid #FFE5DB",
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    position: "relative",
                  }}
                  onClick={() => {
                    if (onListingClick) {
                      onListingClick(listing);
                    } else {
                    }
                  }}
                >
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(listing.id);
                    }}
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      zIndex: 10,
                      fontSize: "18px",
                    }}
                  >
                    {favorites.has(listing.id) ? "❤️" : "🤍"}
                  </button>

                  {/* Image */}
                  <div
                    style={{
                      width: "100%",
                      height: viewMode === "grid" ? "220px" : "180px",
                      backgroundColor: "#F5F5F5",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {listing.images && listing.images.length > 0 ? (
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            parent.innerHTML =
                              '<div style="font-size:48px;">📦</div>';
                          }
                        }}
                      />
                    ) : (
                      <div style={{ fontSize: "48px" }}>📦</div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: "16px" }}>
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#5A5A5A",
                        marginBottom: "8px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        lineHeight: "1.4",
                      }}
                    >
                      {listing.title}
                    </h3>

                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: "800",
                        color: "#FFB84D",
                        marginBottom: "8px",
                      }}
                    >
                      {listing.formatted_price}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        color: "#8A8A8A",
                        fontSize: "13px",
                      }}
                    >
                      📍 {listing.city}, {listing.state}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CSS Animation */}
        <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      </div>
    );
  };

  // ============================================
  // MAIN RENDER - ROUTE MANAGEMENT
  // ============================================
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      {selectedListing && showDetail && (
        <ListingDetailPage
          listing={selectedListing}
          onClose={() => {
            setSelectedListing(null);
            setShowDetail(false);
          }}
        />
      )}
      {showIngest ? (
        <IngestListings />
      ) : (
        <>
          <ReadingProgressBar />
          <TrustBar />
          <Header />

          {/* Show 404 Page */}
          {is404 && (
            <Custom404Page
              setCurrentPage={setCurrentPage}
              setActiveView={setActiveView}
              setIs404={setIs404}
            />
          )}

          {/* Show Normal Content */}
          {!is404 && (
            <>
              {/* Conditional Rendering Based on Active View/Page */}
              {activeView === "landing" && (
                <>
                  {currentPage === "home" && <HomePage />}
                  {currentPage === "confirmation" && (
                    <ConfirmationPage orderDetails={confirmedOrder} />
                  )}
                  {currentPage === "how-it-works" && <HowItWorksPage />}
                  {currentPage === "calculator" && <PricingCalculatorPage />}
                  {currentPage === "sitemap" && <SitemapPage />}
                  {currentPage === "service-areas" && <ServiceAreasPage />}
                  {currentPage === "blog" && <BlogPage />}
                  {/* City Pages */}
                  {currentPage === "cities/new-york-ny" && (
                    <CityPage citySlug="new-york-ny" />
                  )}
                  {currentPage === "cities/los-angeles-ca" && (
                    <CityPage citySlug="los-angeles-ca" />
                  )}
                  {currentPage === "cities/chicago-il" && (
                    <CityPage citySlug="chicago-il" />
                  )}
                  {currentPage === "cities/houston-tx" && (
                    <CityPage citySlug="houston-tx" />
                  )}
                  {currentPage === "cities/phoenix-az" && (
                    <CityPage citySlug="phoenix-az" />
                  )}
                  {currentPage === "cities/philadelphia-pa" && (
                    <CityPage citySlug="philadelphia-pa" />
                  )}
                  {currentPage === "cities/san-antonio-tx" && (
                    <CityPage citySlug="san-antonio-tx" />
                  )}
                  {currentPage === "cities/san-diego-ca" && (
                    <CityPage citySlug="san-diego-ca" />
                  )}
                  {currentPage === "cities/dallas-tx" && (
                    <CityPage citySlug="dallas-tx" />
                  )}
                  {currentPage === "cities/san-jose-ca" && (
                    <CityPage citySlug="san-jose-ca" />
                  )}
                  {currentPage === "blog-post" && <BlogPostPage />}
                  {currentPage === "about" && <AboutPage />}
                  {currentPage === "privacy" && <PrivacyPolicyPage />}
                  {currentPage === "terms" && <TermsPage />}
                  {currentPage === "insurance" && <InsurancePage />}
                  {currentPage === "faq" && <FAQPage />}
                  {currentPage === "contact" && <ContactPage />}
                  {currentPage === "profile" && (
                    <ProfilePage
                      userProfile={userProfile}
                      setUserProfile={setUserProfile}
                    />
                  )}
                  <BackToTopButton />
                  <Footer />
                </>
              )}
              {/* 🌟 DYNAMIC MARKETPLACE TEMPLATE (7M PAGES) */}

              {activeView === "dynamic" && dynamicRoute && (
                <>
                  <DynamicMarketplacePage
                    city={dynamicRoute.city}
                    state={dynamicRoute.state}
                    category={dynamicRoute.category}
                    neighborhood={dynamicRoute.neighborhood}
                    zipCode={dynamicRoute.zipCode}
                    searchQuery={dynamicRoute.searchQuery}
                    setSelectedListing={setSelectedListing}
                    setShowDetail={setShowDetail}
                  />
                  <BackToTopButton />
                  <Footer />
                </>
              )}
              {activeView === "browse" && (
                <MarketplaceBrowseView
                  onListingClick={(listing) => {
                    // Transform the listing to match what ListingDetailPage expects
                    const transformedListing = {
                      ...listing,
                      marketplace_listing_title: listing.title,
                      listing_price: listing.formatted_price || listing.price,
                      listing_photos:
                        listing.images?.map((img: string) => ({
                          photo_image_url: img,
                        })) || [],
                      primary_listing_photo: listing.images?.[0]
                        ? {
                            photo_image_url: listing.images[0],
                          }
                        : null,
                      location: {
                        reverse_geocode: `${listing.city}, ${listing.state}`,
                      },
                    };

                    setSelectedListing(transformedListing);
                    setShowDetail(true);
                  }}
                />
              )}
              {activeView === "inbox" && (
                <div
                  style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                    padding: isMobile ? "16px" : "32px",
                  }}
                >
                  <InboxView />
                </div>
              )}
              {activeView === "saved" && (
                <div
                  style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                    padding: isMobile ? "16px" : "32px",
                  }}
                >
                  <SavedView />
                </div>
              )}
              {/* Modals */}
              {showDetail && <DetailModal />}
              {isModalOpen && (
                <SubmitListingModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  sendEmailNotifications={sendEmailNotifications}
                  setConfirmedOrder={setConfirmedOrder} // ← ADD THIS
                  setCurrentPage={setCurrentPage} // ← ADD THIS
                />
              )}
              {isDibbyModalOpen && (
                <BookDibbyServiceModal
                  isOpen={isDibbyModalOpen}
                  onClose={() => setIsDibbyModalOpen(false)}
                  listing={selectedListing}
                  preSelectedService="full"
                  sendEmailNotifications={sendEmailNotifications}
                  setConfirmedOrder={setConfirmedOrder} // ← ADD THIS
                  setCurrentPage={setCurrentPage} // ← ADD THIS
                  setShowDetail={setShowDetail} // ← ADD THIS
                  setActiveView={setActiveView} // ← ADD THIS
                />
              )}
              {/* Toast Notifications */}
              <ToastContainer toasts={toasts} />
              {/* Sticky CTA - Only on Landing Page */}
              {activeView === "landing" && currentPage === "home" && (
                <StickyCTA
                  show={true}
                  onClick={() => setIsModalOpen(true)}
                  activeView={activeView}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
// ============================================
// EXPORT APP COMPONENT
// ============================================
// ============================================
// GLOBAL STYLES & ANIMATIONS
// ============================================
const GlobalStyles = () => (
  <style>{`
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: #f0f2f5;
    }

    html {
      scroll-behavior: smooth;
    }

    /* Scrollbar Styling */
    ::-webkit-scrollbar {
      width: 12px;
    }

    ::-webkit-scrollbar-track {
      background: #f0f2f5;
    }

    ::-webkit-scrollbar-thumb {
      background: #c4c4c4;
      border-radius: 6px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }

    /* Focus Styles for Accessibility */
    *:focus-visible {
      outline: 2px solid #FFB84D;
      outline-offset: 2px;
    }

    button:focus-visible {
      outline: 2px solid #FFB84D;
      outline-offset: 2px;
    }

    /* Remove default button styles */
    button {
      font-family: inherit;
    }

    /* Loading Animation */
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes slideDown {
      from {
        transform: translateY(-20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideInLeft {
      from {
        transform: translateX(-100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    @keyframes shimmer {
      0% {
        left: -100%;
      }
      100% {
        left: 100%;
      }
    }

    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    /* Utility Classes */
    .fade-in {
      animation: fadeIn 0.5s ease-in;
    }

    .slide-up {
      animation: slideUp 0.5s ease-out;
    }

    .slide-down {
      animation: slideDown 0.5s ease-out;
    }

    /* Print Styles */
    @media print {
      header, footer, nav, .no-print {
        display: none !important;
      }
      
      body {
        background: white;
      }
      
      * {
        color: black !important;
      }
    }

    /* High Contrast Mode Support */
    @media (prefers-contrast: high) {
      button {
        border: 2px solid currentColor;
      }
    }

    /* Reduced Motion Support */
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }

    /* Dark Mode Support (Future Enhancement) */
    @media (prefers-color-scheme: dark) {
      /* body {
        background-color: #18191a;
        color: #e4e6eb;
      } */
    }

    /* Selection Color */
    ::selection {
      background-color: #FFB84D;
      color: white;
    }

    ::-moz-selection {
      background-color: #FFB84D;
      color: white;
    }

    /* Prevent iOS zoom on input focus */
    @media screen and (max-width: 767px) {
      input[type="text"],
      input[type="number"],
      input[type="email"],
      input[type="tel"],
      input[type="url"],
      select,
      textarea {
        font-size: 16px !important;
      }
    }

    /* Link Styles */
    a {
      color: #1876f2;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    /* Image Loading State */
    img {
      max-width: 100%;
      height: auto;
      display: block;
    }

    img[src=""] {
      visibility: hidden;
    }

    /* Ensure iframes are responsive */
    iframe {
      max-width: 100%;
    }

    /* Fix for iOS Safari 100vh issue */
    @supports (-webkit-touch-callout: none) {
      .full-height {
        height: -webkit-fill-available;
      }
    }

    /* Placeholder Animation */
    @keyframes placeHolderShimmer {
      0% {
        background-position: -468px 0;
      }
      100% {
        background-position: 468px 0;
      }
    }

    .skeleton-loading {
      animation: placeHolderShimmer 1.5s linear infinite;
      background: linear-gradient(
        90deg,
        #f0f2f5 0%,
        #e4e6eb 50%,
        #f0f2f5 100%
      );
      background-size: 800px 104px;
    }

    /* Toast Notification Styles */
    .toast-enter {
      animation: slideInRight 0.3s ease-out;
    }

    .toast-exit {
      animation: slideInRight 0.3s ease-out reverse;
    }

    /* Custom Checkbox Styles */
    input[type="checkbox"] {
      accent-color: #FFB84D;
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    /* Custom Radio Button Styles */
    input[type="radio"] {
      accent-color: #FFB84D;
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    /* Button Hover Effects */
    .btn-hover-lift {
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .btn-hover-lift:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }

    .btn-hover-lift:active {
      transform: translateY(0);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    /* Card Hover Effects */
    .card-hover {
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .card-hover:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    /* Text Selection Prevention for UI Elements */
    .no-select {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    /* Smooth Property Transitions */
    .smooth-transition {
      transition: all 0.3s ease;
    }

    /* Z-index Management */
    .z-toast { z-index: 9999; }
    .z-modal { z-index: 2000; }
    .z-header { z-index: 1000; }
    .z-sidebar { z-index: 999; }
    .z-dropdown { z-index: 500; }

    /* Screen Reader Only Content */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }

    /* Skip to Main Content Link */
    .skip-to-main {
      position: absolute;
      top: -40px;
      left: 0;
      background: #FFB84D;
      color: white;
      padding: 8px 16px;
      text-decoration: none;
      font-weight: 600;
      z-index: 10000;
      border-radius: 0 0 4px 0;
    }

    .skip-to-main:focus {
      top: 0;
    }

    /* Loading Spinner */
    .spinner {
      border: 3px solid #f0f2f5;
      border-top-color: #FFB84D;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 0.8s linear infinite;
    }

    /* Gradient Text Effect */
    .gradient-text {
      background: linear-gradient(135deg, #FFB84D 0%, #FF6B6B 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Glass Morphism Effect */
    .glass {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    /* Neumorphism Button Effect */
    .neu-button {
      background: #f0f2f5;
      box-shadow: 8px 8px 16px #d1d3d6, -8px -8px 16px #ffffff;
      border: none;
      border-radius: 12px;
      padding: 12px 24px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .neu-button:hover {
      box-shadow: 4px 4px 8px #d1d3d6, -4px -4px 8px #ffffff;
    }

    .neu-button:active {
      box-shadow: inset 4px 4px 8px #d1d3d6, inset -4px -4px 8px #ffffff;
    }

    /* Floating Animation */
    @keyframes floating {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-15px);
      }
    }

    .floating {
      animation: floating 3s ease-in-out infinite;
    }

    /* Glow Effect */
    .glow {
      box-shadow: 0 0 10px rgba(255, 184, 77, 0.5),
                  0 0 20px rgba(255, 184, 77, 0.3),
                  0 0 30px rgba(255, 184, 77, 0.2);
    }

    /* Truncate Text */
    .truncate {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .truncate-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .truncate-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `}</style>
);

// ============================================
// FINAL APP COMPONENT WITH GLOBAL STYLES
// ============================================
const AppWithStyles: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <App />
    </>
  );
};

export default AppWithStyles;
