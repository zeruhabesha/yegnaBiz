import { CompaniesPageClient } from "@/components/companies-page-client"

interface CompaniesPageProps {
  searchParams?: Record<string, string | string[] | undefined>
}

export default function CompaniesPage({ searchParams }: CompaniesPageProps) {
  const query = typeof searchParams?.q === "string" ? searchParams.q : ""
  const location = typeof searchParams?.location === "string" ? searchParams.location : ""
  const category = typeof searchParams?.category === "string" ? searchParams.category : ""

  return (
    <CompaniesPageClient
      initialQuery={query}
      initialLocation={location}
      initialCategory={category}
    />
  )
}
