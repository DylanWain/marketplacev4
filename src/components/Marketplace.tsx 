import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Listing {
  id: string;
  title: string;
  price: number;
  formatted_price: string;
  images: string[];
  city: string;
  state: string;
  category_name: string;
  listing_url: string;
}

const Marketplace: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');

  // Fetch listings from Supabase
  const fetchListings = async () => {
    setLoading(true);
    
    let query = supabase
      .from('listings')
      .select('*')
      .eq('is_live', true)
      .order('scraped_at', { ascending: false });

    if (category !== 'all') {
      query = query.eq('category_name', category);
    }

    if (searchQuery) {
      query = query.ilike('title', `%${searchQuery}%`);
    }

    const { data, error } = await query.limit(50);

    if (error) {
      console.error('Error fetching listings:', error);
    } else {
      setListings(data || []);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchListings();
  }, [category, searchQuery]);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Facebook Marketplace Listings</h1>

      {/* Search & Filter */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Search listings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
        />
        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        >
          <option value="all">All Categories</option>
          <option value="vehicles">Vehicles</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
          <option value="appliances">Appliances</option>
          <option value="home-goods">Home Goods</option>
        </select>
      </div>

      {/* Loading */}
      {loading && <p>Loading listings...</p>}

      {/* Listings Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        {listings.map((listing) => (
          
            key={listing.id}
            href={listing.listing_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {/* Image */}
            {listing.images && listing.images.length > 0 && (
              <img
                src={listing.images[0]}
                alt={listing.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }}
              />
            )}

            {/* Content */}
            <div style={{ padding: '15px' }}>
              <h3 style={{ 
                margin: '0 0 10px 0', 
                fontSize: '16px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {listing.title}
              </h3>
              
              <p style={{ 
                margin: '0 0 5px 0', 
                fontSize: '20px', 
                fontWeight: 'bold',
                color: '#2ecc71'
              }}>
                {listing.formatted_price}
              </p>
              
              <p style={{ 
                margin: 0, 
                fontSize: '14px',
                color: '#666'
              }}>
                {listing.city}, {listing.state}
              </p>
              
              <p style={{ 
                margin: '5px 0 0 0', 
                fontSize: '12px',
                color: '#999',
                textTransform: 'capitalize'
              }}>
                {listing.category_name.replace('-', ' ')}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* No results */}
      {!loading && listings.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>
          No listings found. Try a different search or category.
        </p>
      )}
    </div>
  );
};

export default Marketplace;