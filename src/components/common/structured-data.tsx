import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://metermate-prepaid-meter-token-formatter.vercel.app'

interface StructuredDataProps {
  path: string
  breadcrumbs?: { name: string; path: string }[]
}

export function WebAppStructuredData({ path: _path, breadcrumbs }: StructuredDataProps) {
  const webApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'MeterMate',
    url: BASE_URL,
    description:
      'Prepaid meter token formatter for Bangladesh. Automatically detects provider (BPDB, BREB, DESCO, DPDC, NESCO, WZPDCL), extracts 20-digit tokens from SMS, and formats them into readable 4-digit groups.',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'MeterMate',
    },
  }

  const breadcrumb = breadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: crumb.name,
          item: `${BASE_URL}${crumb.path}`,
        })),
      }
    : null

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumb ? [webApp, breadcrumb] : webApp)}
      </script>
    </Helmet>
  )
}