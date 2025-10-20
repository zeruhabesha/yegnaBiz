import { Metadata } from 'next'
import { notFound } from 'next/navigation'
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
  titleAm: string
  content: string
  contentAm: string
  excerpt: string
  excerptAm: string
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
    titleAm: 'የኢትዮጵያ የንግድ ሁኔታ በ2024',
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
    contentAm: `ኢትዮጵያ በአፍሪካ ካሉት በጣም በፍጥነት እያደጉ ያሉት ኢኮኖሚዎች አንዷ ሆናለች፣ ከግብርና እና ኢሽቅድምድም የመሰሉ ባህላዊ ዘርፎች እስከ አዲስ የቴክኖሎጂ እና አገልግሎት ኢንዱስትሪዎች ድረስ የተለያየ የንግድ ሁኔታ አላት።

የአገሪቱ ስልታዊ አቀማመጥ፣ እያደገ ያለ ህዝብ እና የመንግስት ተነሳሽነቶች ለአካባቢያዊ እና አለምአቀፍ ባለሀብቶች ብዙ እድሎችን ፈጥረዋል። ከፍተኛ እድገት የሚያሳዩ ቁልፍ ዘርፎች የሚከተሉትን ያካትታሉ፡-

**ግብርና እና የግብርና ንግድ**
ኢትዮጵያ በዋናነት ግብርናዊ ናት፣ ቡና፣ ሻይ እና አበቦች ዋና የወጪ ምርቶች ናቸው። መንግስት በግብርና ልምዶች እና የዋጋ ተጨማሪ ዘመናዊነት ላይ እጅግ ኢንቨስት እያደረገ ነው።

**ኢሽቅድምድም**
የኢሽቅድምድም ዘርፍ በፍጥነት እያደገ ነው፣ በተለይም በጨርቃ ጨርቅ፣ የቆዳ ዕቃዎች እና የምግብ ማቀነባበሪያ። ልዩ የኢኮኖሚ ዞኖች እና የኢንዱስትሪ ፓርኮች የውጭ ቀጥተኛ ኢንቨስትመንት እያገኙ ነው።

**ቴክኖሎጂ እና ፈጠራ**
አዲስ አበባ በምስራቅ አፍሪካ የቴክኖሎጂ ማዕከል እየሆነች ነው፣ በፊናንስ ቴክኖሎጂ፣ ኢ-ኮሜርስ እና የሶፍትዌር ልማት ውስጥ እያደጉ ያሉ አዲስ ድርጅቶች ቁጥር እየጨመረ ነው።

**ቱሪዝም እና እንግዳ ተቀባይነት**
የኢትዮጵያ የበለፀገ የባህል ቅርስ እና የተፈጥሮ መስህቦች በቱሪዝም ዘርፍ እድገትን እያስነሱ ነው፣ የአለም አቀፍ ጎብኚዎች ቁጥር እየጨመረ ነው።

**ፈተናዎች እና እድሎች**
ምንም እንኳን የንግድ አካባቢው የመሠረተ ልማት ክፍተቶች እና የቁጥጥር እንቅፋቶች የመሰሉ ፈተናዎችን ቢያቀርብም፣ የመንግስት የማሻሻያ እርምጃ እና ወጣት የተማረ የሰው ኃይል ለእድገት ከፍተኛ እድሎችን ይፈጥራሉ።

ወደ 2024 በመመልከት፣ ዲጂታል ለውጥን ማስተካከል እና የኢትዮጵያን በሆርን ኦፍ አፍሪካ ውስጥ ልዩ አቀማመጥ የሚጠቀሙ ንግዶች ለስኬት በጥሩ ሁኔታ የተቀመጡ ይሆናሉ።`,
    excerpt: 'Exploring the current state of Ethiopian businesses and emerging opportunities in various sectors.',
    excerptAm: 'በተለያዩ ዘርፎች ውስጥ ያሉትን የኢትዮጵያ ንግዶች የአሁን ሁኔታ እና ብቅ ያሉ እድሎችን በመመርመር ላይ።',
    author: 'ዶክተር መላኩ ተክለ',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Business Trends',
    image: '/blog/business-landscape.jpg',
    slug: 'ethiopian-business-landscape-2024'
  },
  'digital-transformation-ethiopian-smes': {
    id: '2',
    title: 'Digital Transformation for Ethiopian SMEs',
    titleAm: 'ለኢትዮጵያ ትናንሽ እና መካከለኛ ድርጅቶች ዲጂታል ለውጥ',
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
    contentAm: `ዲጂታል ለውጥ ለኢትዮጵያ ትናንሽ እና መካከለኛ ድርጅቶች (ትናንሽ እና መካከለኛ ድርጅቶች) የቅንጦት ነገር አይደለም - በዛሬው ተወዳዳሪ ገበያ ውስጥ ለመትረፍ እና ለማደግ አስፈላጊ ነው።

**ዲጂታል ለውጥ ለምን አስፈላጊ ነው**
ኢትዮጵያዊ ትናንሽ እና መካከለኛ ድርጅቶች የገበያ መዳረሻ ውስንነት፣ ከፍተኛ የአሠራር ወጪዎች እና ከትላልቅ ተጫዋቾች የሚመጣ ውድድር ጨምሮ ልዩ ፈተናዎች ያጋጥሟቸዋል። ዲጂታል ቴክኖሎጂዎች ለእነዚህ ፈተናዎች መፍትሄ ይሰጣሉ፡-

1. **የገበያ ማካለል ማስፋፊያ**: የመስመር ላይ መድረኮች ትናንሽ እና መካከለኛ ድርጅቶች ከቀጥታ ጂኦግራፊያዊ አካባቢያቸው በላይ ደንበኞችን እንዲደርሱ ያስችላሉ
2. **ውጤታማነት ማሻሻል**: ዲጂታል መሳሪያዎች ስራዎችን ያቀላጥፋሉ እና ወጪዎችን ይቀንሳሉ
3. **የደንበኛ ልምድ ማሳደግ**: የሞባይል መተግበሪያዎች እና የመስመር ላይ አገልግሎቶች ዘመናዊ የደንበኞች እውነታዎችን ያሟላሉ

**ለዲጂታል ኢንቨስትመንት ቁልፍ ቦታዎች**
**የኢ-ኮሜርስ መድረኮች**: በድር ጣቢያዎች እና የሞባይል መተግበሪያዎች በኩል የመስመር ላይ መገኘት ማቋቋም
**ዲጂታል የክፍያ ስርዓቶች**: የሞባይል ገንዘብ እና የመስመር ላይ ክፍያዎችን መቀበል
**የደንበኛ ግንኙነት አስተዳደር**: የደንበኛ ውሂብ እና ግንኙነቶችን ለማስተዳደር መሳሪያዎች
**የአቅርቦት ሰንሰለት አስተዳደር**: ለክምችት እና ሎጂስቲክስ ክትትል ሶፍትዌር

**የመንግስት ድጋፍ እና ተነሳሽነቶች**
የኢትዮጵያ መንግስት የዲጂታል ለውጥ አስፈላጊነት ይገነዘባል እና የዲጂታል ኢትዮጵያ 2025 ስልት እና ለቴክኖሎጂ አዲስ ድርጅቶች ድጋፍን ጨምሮ በርካታ ተነሳሽነቶችን ጀምሯል።

**የስኬት ታሪኮች**
በርካታ ኢትዮጵያዊ ትናንሽ እና መካከለኛ ድርጅቶች በዲጂታል መንገድ በስኬት ተለውጠዋል፣ እነዚህም የሚከተሉትን ያካትታሉ፡-
- አካባቢያዊ ቸርቻሪዎች በኢ-ኮሜርስ በኩል ማስፋፊያ
- የአገልግሎት ሰጪዎች የመስመር ላይ ቦታ ማስያዝ በመስጠት
- የግብርና ንግዶች ለገበያ መረጃ መተግበሪያዎችን በመጠቀም

**መጀመር**
ትናንሽ እና መካከለኛ ድርጅቶች በዲጂታል ዝግጁነት ግምገማ መጀመር አለባቸው፣ ከዚያም ከፍተኛ የኢንቨስትመንት ተመላሽ የሚሰጡ ቴክኖሎጂዎችን ቅድሚያ መስጠት አለባቸው። ለስኬታማ ተግባራዊነት ስልጠና እና አቅም ግንባታ ወሳኝ ናቸው።

ዲጂታል ለውጥ ስለ ቴክኖሎጂ ብቻ አይደለም - በዲጂታል ዘመን ንግዶች እንዴት እንደሚሠሩ እንደገና ማሰብ ነው።`,
    excerpt: 'How Ethiopian small and medium enterprises can leverage digital technologies for growth.',
    excerptAm: 'ኢትዮጵያዊ ትናንሽ እና መካከለኛ ድርጅቶች ለእድገት ዲጂታል ቴክኖሎጂዎችን እንዴት መጠቀም እንደሚችሉ።',
    author: 'አበበ ገብረማርያም',
    date: '2024-01-10',
    readTime: '7 min read',
    category: 'Technology',
    image: '/blog/digital-transformation.jpg',
    slug: 'digital-transformation-ethiopian-smes'
  },
  'sustainable-business-practices-ethiopia': {
    id: '3',
    title: 'Sustainable Business Practices in Ethiopia',
    titleAm: 'በኢትዮጵያ ዘላቂ የንግድ ልምምዶች',
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
    contentAm: `ዘላቂነት በዓለም ዙሪያ ላሉ ንግዶች ወሳኝ ምክንያት ሆኗል፣ እና ኢትዮጵያም ከዚህ የተለየች አይደለችም። አገሪቱ ፈጣን የኢኮኖሚ እድገቷን ስትቀጥል፣ ዘላቂ የንግድ ልምምዶችን ተግባራዊ ማድረግ ለረጅም ጊዜ ስኬት እና የአካባቢ ጥበቃ አስፈላጊ ነው።

**በኢትዮጵያ ዘላቂነት ለምን አስፈላጊ ነው**
የኢትዮጵያ ልዩ የተፈጥሮ ልዩነት፣ የውሃ ሀብቶች እና የባህል ቅርስ ዘላቂነት በተለይ አስፈላጊ ያደርገዋል። ዘላቂነትን ቅድሚያ የሚሰጡ ንግዶች የአካባቢ ጥበቃ ላይ ብቻ አይደለም አስተዋፅኦ የሚያደርጉት እንዲያም በኩልም፡-

1. **የቁጥጥር ተገዢነት**: የመንግስት የአካባቢ ደረጃዎችን ማሟላት
2. **ወጪ ቁጠባ**: የኃይል ቅልጥፍና እና የቆሻሻ ቅነሳ
3. **የገበያ መዳረሻ**: ዘላቂነት ማረጋገጫ የሚያስፈልጋቸውን ዓለም አቀፍ ገበያዎች መዳረሻ
4. **የምርት ስም ማወቂያ**: ለአካባቢ ጠንቃቃ ደንበኞች ማራኪነት

**ለዘላቂ የንግድ ልምምዶች ቁልፍ ቦታዎች**
**የአካባቢ አስተዳደር**
- የቆሻሻ ቅነሳ እና የመልሶ ጥቅም ላይ ማዋል ፕሮግራሞች
- የኃይል ቅልጥፍና ስራዎች
- የውሃ ጥበቃ ተነሳሽነቶች
- የቁሳቁሶች ዘላቂ ምንጭ

**ማህበራዊ ተጠያቂነት**
- ፍትሃዊ የሰራተኛ ልምምዶች እና የሰራተኛ ደህንነት
- የማህበረሰብ ልማት ፕሮግራሞች
- ለአካባቢያዊ አቅራቢዎች ድጋፍ
- የባህል ቅርስ ጥበቃ

**የኢኮኖሚ ዘላቂነት**
- ረዥም ጊዜ የፋይናንስ እቅድ
- በሰራተኛ ስልጠና ላይ ኢንቨስትመንት
- ለዘላቂ ምርቶች ፈጠራ
- የገቢ ምንጮች ልዩነት

**የመንግስት ድጋፍ እና ደንቦች**
የኢትዮጵያ መንግስት ለዘላቂ የንግድ ልምምዶች በርካታ ፖሊሲዎችን እና ማበረታቻዎችን ተግባራዊ አድርጓል፣ እነዚህም ለአረንጓዴ ኢንቨስትመንቶች የግብር ቅናሽ እና ለታዳሽ ኃይል ፕሮጀክቶች ድጋፍን ያካትታሉ።

**ፈተናዎች እና መፍትሄዎች**
ምንም እንኳን ዘላቂ ልምምዶችን ተግባራዊ ማድረግ የመጀመሪያ ኢንቨስትመንት ወጪዎች እና የቴክኒክ ልምድ መስፈርቶች የመሰሉ ፈተናዎችን ቢያቀርብም፣ ንግዶች እነዚህን በሚከተሉት መንገዶች ማሸነፍ ይችላሉ፡-

- የመንግስት ማበረታቻዎች እና ማበረታቻዎች
- ከኤንጂኦዎች እና የልማት ድርጅቶች ጋር አጋርነት
- የስልጠና ፕሮግራሞች እና አቅም ግንባታ
- ወደ አረንጓዴ ፋይናንስ መዳረሻ

**ስኬት መለካት**
ንግዶች ግልጽ የዘላቂነት መለኪያዎችን ማቋቋም እና የአካባቢ እና ማህበራዊ ተጽእኖን በመደበኛነት መገምገም አለባቸው። በሪፖርት ማቅረብ ውስጥ ግልጽነት ከባለድርሻ አካላት እና ደንበኞች ጋር እምነት ይገንባል።

ዘላቂ የንግድ ልምምዶች ለአካባቢው ጥሩ ብቻ አይደሉም - ለንግድም ጥሩ ናቸው። ዛሬ ዘላቂነትን የሚቀበሉ ኢትዮጵያዊ ኩባንያዎች ለነገው ዓለም አቀፍ ገበያ በጥሩ ሁኔታ የተቀመጡ ይሆናሉ።`,
    excerpt: 'Implementing environmentally friendly and socially responsible business strategies.',
    excerptAm: 'አካባቢያዊ ተስማሚ እና ማህበራዊ ተጠያቂ የንግድ ስልቶችን ተግባራዊ ማድረግ።',
    author: 'ሳራ አበበ',
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
                  <h2 className="text-lg font-semibold text-foreground">አማርኛ ዝርዝር</h2>
                  <p className="text-sm text-muted-foreground">የዚህ ጽሑፍ አማርኛ ቅጂ በቅርቡ ይጨመር።</p>
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
