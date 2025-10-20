import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Users } from '@/components/icons'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'
import { PageSection } from '@/components/page-section'

export const metadata: Metadata = {
  title: 'Blog - YegnaBiz',
  description: 'Latest news, insights, and updates about Ethiopian businesses and entrepreneurship',
}

interface BlogPost {
  id: string
  title: string
  titleAm: string
  excerpt: string
  excerptAm: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
  slug: string
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Ethiopian Business Landscape in 2024',
    titleAm: 'የኢትዮጵያ የንግድ ሁኔታ በ2024',
    excerpt: 'Exploring the current state of Ethiopian businesses and emerging opportunities in various sectors.',
    excerptAm: 'በተለያዩ ዘርፎች ውስጥ ያሉትን የኢትዮጵያ ንግዶች የአሁን ሁኔታ እና ብቅ ያሉ እድሎችን በመመርመር ላይ።',
    author: 'ዶክተር መላኩ ተክለ',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Business Trends',
    image: '/blog/business-landscape.jpg',
    slug: 'ethiopian-business-landscape-2024'
  },
  {
    id: '2',
    title: 'Digital Transformation for Ethiopian SMEs',
    titleAm: 'ለኢትዮጵያ ትናንሽ እና መካከለኛ ድርጅቶች ዲጂታል ለውጥ',
    excerpt: 'How Ethiopian small and medium enterprises can leverage digital technologies for growth.',
    excerptAm: 'ኢትዮጵያዊ ትናንሽ እና መካከለኛ ድርጅቶች ለእድገት ዲጂታል ቴክኖሎጂዎችን እንዴት መጠቀም እንደሚችሉ።',
    author: 'አበበ ገብረማርያም',
    date: '2024-01-10',
    readTime: '7 min read',
    category: 'Technology',
    image: '/blog/digital-transformation.jpg',
    slug: 'digital-transformation-ethiopian-smes'
  },
  {
    id: '3',
    title: 'Sustainable Business Practices in Ethiopia',
    titleAm: 'በኢትዮጵያ ዘላቂ የንግድ ልምምዶች',
    excerpt: 'Implementing environmentally friendly and socially responsible business strategies.',
    excerptAm: 'አካባቢያዊ ተስማሚ እና ማህበራዊ ተጠያቂ የንግድ ስልቶችን ተግባራዊ ማድረግ።',
    author: 'ሳራ አበበ',
    date: '2024-01-05',
    readTime: '6 min read',
    category: 'Sustainability',
    image: '/blog/sustainable-business.jpg',
    slug: 'sustainable-business-practices-ethiopia'
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <PageHero
          eyebrow="Insights"
          title={
            <>
              YegnaBiz <span className="block">Blog</span>
            </>
          }
          description="Stories, data, and expert perspectives shaping Ethiopia's business landscape."
        />

        <PageSection tone="default">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <Card key={post.id} className="group card-hover animate-fade-in" style={{ animationDelay: `${index * 120}ms` }}>
                <CardHeader className="p-0">
                  <div className="aspect-video overflow-hidden rounded-t-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
                    <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                      Featured Insight
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary hover:text-primary/80"
                  >
                    Read More →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageSection>
      </main>

      <Footer />
    </div>
  )
}
