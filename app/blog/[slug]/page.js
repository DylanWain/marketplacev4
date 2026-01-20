import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, ArrowLeft, Share2, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog-posts';

export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = BLOG_POSTS[params.slug];
  if (!post) return {};
  
  return {
    title: `${post.title} | DibbyTour Blog`,
    description: post.description,
    keywords: post.title.toLowerCase().split(' ').join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedDate,
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = BLOG_POSTS[params.slug];
  
  if (!post) {
    notFound();
  }

  // Get related posts from same pillar
  const relatedPosts = Object.entries(BLOG_POSTS)
    .filter(([slug, p]) => slug !== params.slug && p.pillar === post.pillar)
    .slice(0, 3)
    .map(([slug, p]) => ({ slug, ...p }));

  // Convert markdown-style content to HTML (simplified)
  const formatContent = (content) => {
    if (!content) return '';
    
    return content
      .split('\n\n')
      .map((paragraph, i) => {
        // Headers
        if (paragraph.startsWith('## ')) {
          return `<h2 class="text-2xl font-bold mt-10 mb-4">${paragraph.replace('## ', '')}</h2>`;
        }
        if (paragraph.startsWith('### ')) {
          return `<h3 class="text-xl font-semibold mt-8 mb-3">${paragraph.replace('### ', '')}</h3>`;
        }
        if (paragraph.startsWith('#### ')) {
          return `<h4 class="text-lg font-medium mt-6 mb-2">${paragraph.replace('#### ', '')}</h4>`;
        }
        // Regular paragraph
        return `<p class="text-zinc-300 leading-relaxed mb-4">${paragraph}</p>`;
      })
      .join('');
  };

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
            <Link href="/book" className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600">Book Inspection</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link href="/blog" className="hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Blog
          </Link>
          <span>/</span>
          <span className="text-zinc-400">{post.category}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 text-sm text-zinc-500 mb-4">
            <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime} read
            </span>
            <span>•</span>
            <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-zinc-400 leading-relaxed">
            {post.description}
          </p>
        </header>

        {/* Table of Contents (auto-generated from headers) */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-10">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-orange-500" />
            In This Article
          </h2>
          <ul className="space-y-2 text-sm">
            {post.content?.match(/## .+/g)?.slice(0, 8).map((header, i) => (
              <li key={i}>
                <a href={`#${header.replace('## ', '').toLowerCase().replace(/\s+/g, '-')}`} className="text-zinc-400 hover:text-orange-500">
                  {header.replace('## ', '')}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Content */}
        <article 
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
        />

        {/* CTA Box */}
        <div className="my-12 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-3">Need a Professional Inspection?</h3>
          <p className="text-zinc-300 mb-4">
            Can't verify a listing yourself? Our local inspectors provide comprehensive 
            reports with 50+ photos, video tours, and condition assessments.
          </p>
          <Link href="/book" className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600">
            Book Inspection - $100 →
          </Link>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedPosts.map(related => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors"
                >
                  <div className="text-xs text-zinc-500 mb-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {related.readTime}
                  </div>
                  <h3 className="font-medium group-hover:text-orange-500 transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex items-center justify-between">
          <Link href="/blog" className="text-zinc-400 hover:text-white flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <button className="flex items-center gap-2 text-zinc-400 hover:text-white">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-20 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-zinc-500 text-sm">
          <p>© 2025 DibbyTour</p>
        </div>
      </footer>
    </div>
  );
}
