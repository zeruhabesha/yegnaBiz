import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Users, ChevronLeft } from '@/components/icons'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/page-hero'
import { PageSection } from '@/components/page-section'

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
  slug: string
}

const blogPosts: Record<string, BlogPost> = {
  'ethiopian-business-landscape-2024': {
    id: '1',
    title: 'Ethiopian Business Landscape in 2024',
    content: `Ethiopia has emerged as one of Africa's fastest-growing economies, with a diverse business landscape that spans traditional sectors like agriculture and manufacturing to emerging tech and service industries.

The country's strategic location, growing population, and government initiatives have created numerous opportunities for both local and international investors. Key sectors showing significant growth include:

**Agriculture and Agribusiness**
Ethiopia remains predominantly agricultural, with coffee, tea, and flowers being major export commodities. The government is investing heavily in modernizing agricultural practices and value addition.

**Manufacturing**
The manufacturing sector is expanding rapidly, particularly in textiles, leather goods, and food processing. Special economic zones and industrial parks are attracting foreign direct investment.

**Technology and Innovation**
Addis Ababa is becoming a tech hub in East Africa, with a growing number of startups in fintech, e-commerce, and software development.

**Tourism and Hospitality**
Ethiopia's rich cultural heritage and natural attractions are driving growth in the tourism sector, with increasing numbers of international visitors.

**Challenges and Opportunities**
While the business environment presents challenges such as infrastructure gaps and regulatory hurdles, the government's reform agenda and young, educated workforce create significant opportunities for growth.

Looking ahead to 2024, businesses that can adapt to the digital transformation and leverage Ethiopia's unique position in the Horn of Africa will be well-positioned for success.`,
    excerpt: 'Exploring the current state of Ethiopian businesses and emerging opportunities in various sectors.',
    author: 'Dr. Melaku Tekle',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Business Trends',
    image: '/blog/business-landscape.jpg',
    slug: 'ethiopian-business-landscape-2024'
  },
  'digital-transformation-ethiopian-smes': {
    id: '2',
    title: 'Digital Transformation for Ethiopian SMEs',
    content: `Digital transformation is no longer a luxury for Ethiopian small and medium enterprises (SMEs) - it's a necessity for survival and growth in today's competitive market.

**Why Digital Transformation Matters**
Ethiopian SMEs face unique challenges including limited access to markets, high operational costs, and competition from larger players. Digital technologies offer solutions to these challenges by:

1. **Expanding Market Reach**: Online platforms allow SMEs to reach customers beyond their immediate geographic area
2. **Improving Efficiency**: Digital tools streamline operations and reduce costs
3. **Enhancing Customer Experience**: Mobile apps and online services meet modern customer expectations

**Key Areas for Digital Investment**
**E-commerce Platforms**: Establishing online presence through websites and mobile apps
**Digital Payment Systems**: Accepting mobile money and online payments
**Customer Relationship Management**: Tools to manage customer data and communications
**Supply Chain Management**: Software for inventory and logistics tracking

**Government Support and Initiatives**
The Ethiopian government recognizes the importance of digital transformation and has launched several initiatives including the Digital Ethiopia 2025 strategy and support for tech startups.

**Success Stories**
Several Ethiopian SMEs have successfully transformed digitally, including:
- Local retailers expanding through e-commerce
- Service providers offering online booking
- Agricultural businesses using apps for market information

**Getting Started**
SMEs should start with a digital readiness assessment, then prioritize technologies that offer the highest return on investment. Training and capacity building are crucial for successful implementation.

Digital transformation is not just about technology - it's about reimagining how businesses operate in the digital age.`,
    excerpt: 'How Ethiopian small and medium enterprises can leverage digital technologies for growth.',
    author: 'Abebe Gebremariam',
    date: '2024-01-10',
    readTime: '7 min read',
    category: 'Technology',
    image: '/blog/digital-transformation.jpg',
    slug: 'digital-transformation-ethiopian-smes'
  },
  'sustainable-business-practices-ethiopia': {
    id: '3',
    title: 'Sustainable Business Practices in Ethiopia',
    content: `Sustainability has become a critical factor for businesses worldwide, and Ethiopia is no exception. As the country continues its rapid economic growth, implementing sustainable business practices is essential for long-term success and environmental protection.

**Why Sustainability Matters in Ethiopia**
Ethiopia's unique biodiversity, water resources, and cultural heritage make sustainability particularly important. Businesses that prioritize sustainability not only contribute to environmental protection but also gain competitive advantages through:

1. **Regulatory Compliance**: Meeting government environmental standards
2. **Cost Savings**: Energy efficiency and waste reduction
3. **Market Access**: Access to international markets requiring sustainability certifications
4. **Brand Reputation**: Appeal to environmentally conscious consumers

**Key Areas for Sustainable Business Practices**
**Environmental Management**
- Waste reduction and recycling programs
- Energy-efficient operations
- Water conservation initiatives
- Sustainable sourcing of materials

**Social Responsibility**
- Fair labor practices and employee welfare
- Community development programs
- Support for local suppliers
- Cultural heritage preservation

**Economic Sustainability**
- Long-term financial planning
- Investment in employee training
- Innovation for sustainable products
- Diversification of revenue streams

**Government Support and Regulations**
The Ethiopian government has implemented various policies and incentives for sustainable business practices, including tax breaks for green investments and support for renewable energy projects.

**Challenges and Solutions**
While implementing sustainable practices presents challenges such as initial investment costs and technical expertise requirements, businesses can overcome these through:

- Government subsidies and incentives
- Partnerships with NGOs and development organizations
- Training programs and capacity building
- Access to green financing

**Measuring Success**
Businesses should establish clear sustainability metrics and regularly assess their environmental and social impact. Transparency in reporting builds trust with stakeholders and consumers.

Sustainable business practices are not just good for the environment - they're good for business. Ethiopian companies that embrace sustainability today will be better positioned for success in the global marketplace of tomorrow.`,
    excerpt: 'Implementing environmentally friendly and socially responsible business strategies.',
    author: 'Sara Abebe',
    date: '2024-01-05',
    readTime: '6 min read',
    category: 'Sustainability',
    image: '/blog/sustainable-business.jpg',
    slug: 'sustainable-business-practices-ethiopia'
  }
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]

  if (!post) {
    return {
      title: 'Post Not Found - YegnaBiz Blog',
    }
  }

  return {
    title: `${post.title} - YegnaBiz Blog`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The requested blog post could not be found.</p>
          <Link href="/blog">
            <Button>← Back to Blog</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <PageHero
          align="start"
          eyebrow={post.category}
          title={post.title}
          description={post.excerpt}
          actions={
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/blog">
                <Button variant="outline" className="rounded-full border-white/30 text-white">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blog
                </Button>
              </Link>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> {new Date(post.date).toLocaleDateString()}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" /> {post.readTime}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4" /> {post.author}
                </span>
              </div>
            </div>
          }
        />

        <PageSection tone="default" className="py-12">
          <article className="mx-auto max-w-4xl space-y-12">
            <Card className="border-white/10 bg-background/70">
              <CardContent className="prose prose-lg max-w-none pt-8 text-muted-foreground">
                <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-background/70">
              <CardContent className="flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Amharic edition</h2>
                  <p className="text-sm text-muted-foreground">An Amharic translation of this article is coming soon. Stay tuned!</p>
                </div>
                <Badge variant="secondary" className="self-start">Coming Soon</Badge>
              </CardContent>
            </Card>
          </article>
        </PageSection>
      </main>

      <Footer />
    </div>
  )
}
