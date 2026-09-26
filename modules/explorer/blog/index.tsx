import { prisma } from '@/lib/prisma'
import { Tag } from '@/components/ui'
import { PostCategory } from '@/app/generated/prisma/client'
import Link from 'next/link'
import BlogCard from './components/blog-card'

const categoryFilters = ['All', 'FOOD', 'NIGHTLIFE', 'TRAVEL', 'CULTURE', 'GUIDES', 'EVENTS', 'LIFESTYLE']

const BlogIndex = async ({
  searchParams,
}: {
  searchParams: { category?: string; tag?: string }
}) => {

  const posts = await prisma.post.findMany({
    where: {
      isPublished: true,
      ...(searchParams.category && searchParams.category !== 'All' && {
        category: searchParams.category as PostCategory,
      }),
      ...(searchParams.tag && {
        tags: { some: { slug: searchParams.tag } },
      }),
    },
    include: { author: true, tags: true },
    orderBy: [{ isFeatured: 'desc' }, { publishedAt: 'desc' }],
  })

  const featured = posts.find(p => p.isFeatured)
  const rest = posts.filter(p => p.id !== featured?.id)

  return (
    <main className="box py-12">
      {/* Header */}
      <div className="mb-10">
        <Tag text="Outsyde Blog" />
        <h1 className="pt-3 text-4xl lg:text-7xl font-display font-medium tracking-tight text-brand-night">
          Stories, guides<br className="hidden lg:block" /> & Lagos life
        </h1>
        <p className="mt-3 text-brand-night/50 max-w-xl">
          The best places to eat, drink, and experience in Lagos — written by people who actually live here.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        {categoryFilters.map(cat => (
          <Link
            key={cat}
            href={cat === 'All' ? '/blog' : `/blog?category=${cat}`}
            className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all ${
              (searchParams.category === cat) || (!searchParams.category && cat === 'All')
                ? 'bg-brand-night text-white border-brand-night'
                : 'bg-white text-brand-night/60 border-brand-night/15 hover:border-brand-night/30'
            }`}
          >
            {cat === 'All' ? 'All posts' : cat.charAt(0) + cat.slice(1).toLowerCase()}
          </Link>
        ))}
      </div>

      {/* Featured post */}
      {featured && (
        <div className="mb-6">
          <BlogCard post={featured} featured />
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rest.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20 text-brand-night/40">
          <p className="text-lg font-medium">No posts yet</p>
          <p className="text-sm mt-1">Check back soon.</p>
        </div>
      )}
    </main>
  )
}

export default BlogIndex