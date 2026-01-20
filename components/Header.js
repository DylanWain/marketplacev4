// SHARED HEADER COMPONENT
// Site-wide navigation with SEO-friendly links

import Link from 'next/link';
import { SERVICES, CITIES, PERSONAS } from '@/data/seo-master-data';

export default function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🐕</span>
            <span className="font-bold text-xl text-gray-900">DibbyTour</span>
          </Link>
          
          {/* Main Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900 font-medium">
                Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {SERVICES.map(service => (
                  <Link
                    key={service.slug}
                    href={`/${service.slug}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    {service.name}
                    <span className="text-gray-400 text-sm ml-2">${service.price}</span>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Cities Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900 font-medium">
                Cities
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {CITIES.slice(0, 8).map(city => (
                  <Link
                    key={city.slug}
                    href={`/cities/${city.state}/${city.slug}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    {city.name}
                  </Link>
                ))}
                <Link
                  href="/cities"
                  className="block px-4 py-2 text-blue-600 hover:bg-gray-50 border-t mt-2"
                >
                  View all cities →
                </Link>
              </div>
            </div>
            
            {/* For Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900 font-medium">
                For You
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {PERSONAS.map(persona => (
                  <Link
                    key={persona.slug}
                    href={`/for/${persona.slug}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    {persona.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Tools */}
            <Link href="/tools" className="text-gray-700 hover:text-gray-900 font-medium">
              Free Tools
            </Link>
            
            {/* Guides */}
            <Link href="/guides" className="text-gray-700 hover:text-gray-900 font-medium">
              Guides
            </Link>
          </nav>
          
          {/* CTA */}
          <div className="flex items-center gap-4">
            <Link
              href="/book"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Book Inspection
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
