import Link from 'next/link';
import { Clock, ArrowRight, Tag } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog-posts';

export const metadata = {
  title: 'Rental Safety Blog | Scam Prevention, Apartment Hunting Tips | DibbyTour',
  description: 'Expert guides on avoiding rental scams, apartment hunting tips, used car buying advice, and marketplace safety. Protect yourself with our free resources.',
  keywords: 'rental scam blog, apartment hunting tips, how to avoid scams, used car buying guide, marketplace safety',
};

const pillars = [
  { id: 'rental-scams', name: 'Rental Scams', color: 'red', description: 'Protect yourself from fraud' },
  { id: 'apartment-hunting', name: 'Apartment Hunting', color: 'blue', description: 'Find your perfect place' },
  { id: 'used-cars', name: 'Used Cars', color: 'green', description: 'Buy smart, avoid lemons' },
  { id: 'marketplace', name: 'Marketplace Safety', color: 'purple', description: 'Safe buying & selling' },
];

export default function BlogPage() {
  const posts = Object.entries(BLOG_POSTS).map(([slug, post]) => ({ slug, ...post }));
  const featuredPosts = posts.slice(0, 3);
  
  const postsByPillar = pillars.map(pillar => ({
    ...pillar,
    posts: posts.filter(p => p.pillar === pillar.id).slice(0, 4)
  }));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center font-bold text-sm">D</div>
            <span className="font-bold text-lg">DibbyTour</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/tools" className="text-zinc-400 hover:text-white">Tools</Link>
            <Link href="/blog" className="text-orange-500">Blog</Link>
            <Link href="/cities" className="text-zinc-400 hover:text-white">Cities</Link>
            <Link href="/book" className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600">Book Inspection</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Rental Safety & Smart Buying Blog
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Expert guides to help you avoid scams, find the perfect apartment, 
            and make smart purchases on marketplaces.
          </p>
        </div>

        {/* Featured Posts */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredPosts.map(post => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all"
              >
                <div className="h-40 bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                  <span className="text-4xl">📰</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
                    <span className={`px-2 py-0.5 rounded bg-${pillars.find(p => p.id === post.pillar)?.color || 'zinc'}-500/20 text-${pillars.find(p => p.id === post.pillar)?.color || 'zinc'}-400`}>
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-zinc-400 line-clamp-2">{post.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Posts by Category */}
        {postsByPillar.map(pillar => (
          <section key={pillar.id} className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">{pillar.name}</h2>
                <p className="text-zinc-500">{pillar.description}</p>
              </div>
              <Link href={`/blog/category/${pillar.id}`} className="text-orange-500 hover:underline text-sm flex items-center gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {pillar.posts.map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                  <h3 className="font-medium group-hover:text-orange-500 transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-zinc-500 line-clamp-2">{post.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Newsletter CTA */}
        <section className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Safe Out There</h2>
          <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
            Get our latest scam alerts and safety tips delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="you@email.com"
              className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-orange-500"
            />
            <button className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600">
              Subscribe
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-20 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-zinc-500 text-sm">
          <p>© 2025 DibbyTour • Rental Safety Blog</p>
        </div>
      </footer>
    </div>
  );
}
