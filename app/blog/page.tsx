import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Users } from '@/components/icons'
import Link from 'next/link'

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
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                YegnaBiz
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Blog
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Insights, trends, and stories about Ethiopian businesses and entrepreneurship
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <Card key={post.id} className="group card-hover animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-t-xl overflow-hidden">
                      <div className="w-full h-full bg-muted/20 flex items-center justify-center">
                        <span className="text-muted-foreground">Blog Image</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                    >
                      Read More →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
